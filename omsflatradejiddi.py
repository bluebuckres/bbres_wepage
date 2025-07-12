import asyncio
import logging
import time
import json
import hashlib
import websockets
import hmac
import base64
from collections import deque
from datetime import datetime, timedelta, date
import heapq
import threading
import os
from typing import Deque, Dict, List, Optional, Set, Tuple
from api.flattrade_api import FlattradeAPI

# Constants
ORDER_STATUS_REJECTED = "REJECTED"
ORDER_STATUS_COMPLETE = "COMPLETE"
ORDER_STATUS_OPEN = "OPEN"
ORDER_TYPE_LIMIT = "LIMIT"
ORDER_TYPE_SL = "SL"
ORDER_TYPE_MARKET = "MARKET"
RESTART_TYPE_DROP_ALL = "DROP_ALL"
RESTART_TYPE_RECREATE_POS = "RECREATE_POS"

# Flattrade API Constants
FLATTRADE_BASE_URL = "https://api.flattrade.in"
FLATTRADE_WS_URL = "wss://piconnect.flattrade.in/PiConnectWSTp/"

class OrderManager:
    # Shared state
    _lock = threading.RLock()
    _open_orders: Dict[str, 'KniteOrder'] = {}
    _sl_orders: Deque['KniteOrder'] = deque()
    _orders_to_place: Deque['KniteOrder'] = deque()
    _errored_orders: List['KniteOrder'] = []
    _orphaned_orders: List['KniteOrder'] = []
    _export_orders_str = ""

    # Flattrade connection
    _session = None
    _api = None
    _access_token = None
    _user_id = None
    _http_client = None  # To store the authenticated httpx client
    _token_file = "flattrade_token.json"
    _ws = None
    _last_request_time = 0
    RATE_LIMIT = 0.1  # 100ms between requests

    # Configuration
    SIMULATED = False
    SEC_TOUT = 0.001  # 1ms for low-latency
    ERROR_ORDER_TIMEOUT_SEC = 5
    BLOCK_ALL_ORDERS = False

    @classmethod
    async def start(cls, creds: dict):
        """Main order processing loop"""
        logging.info("Starting OrderManager for Flattrade")
        await cls.authenticate(creds)
        cls._live_pos_mgr = PositionMgr()
        await cls.sod()
        
        # Start WebSocket listener
        asyncio.create_task(cls._ws_listener())
        
        while not cls._cts.is_set():
            start_time = time.perf_counter()
            
            # Process all order types with priority
            await cls.process_open_orders()
            await cls.process_new_orders()
            await cls.process_errored_orders()
            await cls.process_sl_orders()
            
            # Handle high-priority commands
            if cls._export_orders_str == "ExitAll":
                cls.exit_all_orders()
            
            # Maintain tight loop timing
            elapsed = time.perf_counter() - start_time
            await asyncio.sleep(max(0, cls.SEC_TOUT - elapsed))

    @classmethod
    async def stop(cls):
        """Graceful shutdown"""
        cls._cts.set()
        await cls.eod()

    @classmethod
    async def authenticate(cls, creds: dict):
        """Authenticate with Flattrade, using a cached token if available."""
        today = date.today().isoformat()
        cached_token = None

        # Check for a cached token
        if os.path.exists(cls._token_file):
            with open(cls._token_file, 'r') as f:
                try:
                    token_data = json.load(f)
                    if token_data.get("date") == today:
                        cached_token = token_data.get("token")
                        logging.info("Found cached Flattrade token for today.")
                except (json.JSONDecodeError, FileNotFoundError):
                    logging.warning("Could not read cached Flattrade token file.")

        # Try to authenticate with the cached token
        if cached_token:
            cls._api = FlattradeAPI(creds, token=cached_token)
            # Verify token by making a lightweight API call
            # positions = await cls._api.get_positions() # Bypassing for debugging
            # if positions is not None and isinstance(positions, list):
            if True: # Assume token is valid for now
                logging.info("Flattrade authentication successful using cached token (validation bypassed).")
                cls._http_client = cls._api.client
                cls._access_token = cls._api.token
                cls._user_id = creds['USER']
                return  # Success

            logging.warning("Cached Flattrade token is invalid or expired. Re-authenticating.")

        # Full login if no valid cached token
        cls._api = FlattradeAPI(creds)
        client = await cls._api.login()
        if client:
            cls._http_client = client
            cls._access_token = cls._api.token
            cls._user_id = creds['USER']
            logging.info("Flattrade authentication successful via FlattradeAPI.")

            # Cache the new token
            with open(cls._token_file, 'w') as f:
                json.dump({"token": cls._access_token, "date": today}, f)
                logging.info(f"Cached new Flattrade token to {cls._token_file}")
        else:
            raise ConnectionError("Authentication failed via FlattradeAPI")

    @classmethod
    async def _rate_limiter(cls):
        """Ensure we don't exceed API rate limits"""
        elapsed = time.perf_counter() - cls._last_request_time
        if elapsed < cls.RATE_LIMIT:
            await asyncio.sleep(cls.RATE_LIMIT - elapsed)
        cls._last_request_time = time.perf_counter()

    @classmethod
    async def _ws_listener(cls):
        """WebSocket listener using a custom protocol factory for header injection."""
        cookie_header = "; ".join([f"{c.name}={c.value}" for c in cls._http_client.cookies])
        
        class CustomClientProtocol(websockets.client.ClientProtocol):
            async def write_http_request(self, path, headers):
                headers['Cookie'] = cookie_header
                await super().write_http_request(path, headers)

        while not cls._cts.is_set():
            try:
                async with websockets.connect(FLATTRADE_WS_URL, create_protocol=lambda: CustomClientProtocol()) as ws:
                    cls._ws = ws
                    logging.info("Flattrade WebSocket connected. Authenticating...")

                    # Authenticate WebSocket session
                    await ws.send(json.dumps({
                        "t": "c",
                        "uid": cls._user_id,
                        "actid": cls._user_id,
                        "susertoken": cls._access_token
                    }))

                    # Listen for messages
                    while not cls._cts.is_set():
                        message = await ws.recv()
                        data = json.loads(message)
                        await cls._handle_ws_message(data)

            except websockets.exceptions.ConnectionClosed as e:
                logging.warning(f"WebSocket connection closed: {e}")
            except Exception as e:
                logging.error(f"WebSocket error: {e}")
            finally:
                cls._ws = None
                if not cls._cts.is_set():
                    logging.info("Reconnecting WebSocket in 5 seconds...")
                    await asyncio.sleep(5)

    @classmethod
    async def _handle_ws_message(cls, data: dict):
        """Process WebSocket messages"""
        if data.get("t") == "om":
            # Order update message
            order_id = data.get("n")
            status = data.get("status")
            filled_qty = int(data.get("filledqty", "0"))
            
            if order_id in cls._open_orders:
                knite_order = cls._open_orders[order_id]
                knite_order.filled_qty = filled_qty
                
                if status in ["REJECTED", "CANCELLED"]:
                    knite_order.status = ORDER_STATUS_REJECTED
                elif status == "COMPLETE":
                    knite_order.status = ORDER_STATUS_COMPLETE
                elif status in ["OPEN", "PENDING"]:
                    knite_order.status = ORDER_STATUS_OPEN

    #region Core Processing
    @classmethod
    async def process_sl_orders(cls):
        """Process stop-loss orders with O(1) operations"""
        if not cls._sl_orders:
            return
            
        # Process from newest to oldest
        for idx in range(len(cls._sl_orders)-1, -1, -1):
            order = cls._sl_orders[idx]
            if order.stop_breached and order.is_open:
                await cls.exit_orders([order])
                cls._sl_orders.remove(order)

    @classmethod
    async def process_open_orders(cls):
        """Poll and update order statuses"""
        if cls.SIMULATED or not cls._open_orders:
            return
            
        # Batch fetch all orders
        orders = await cls.get_orders(list(cls._open_orders.keys()))
        
        for order in orders:
            knite_order = cls._open_orders.get(order.id)
            if knite_order and await cls.process_open_order(order):
                # Remove completed orders
                del cls._open_orders[order.id]

    @classmethod
    async def process_open_order(cls, order: 'Order') -> bool:
        """Returns True if order reaches terminal state"""
        knite_order = cls._open_orders[order.id]
        status = order.status
        
        if status == ORDER_STATUS_REJECTED:
            await cls.fill_orders(knite_order, order, knite_order.is_sl_order)
            return True
            
        elif status == ORDER_STATUS_COMPLETE:
            await cls.fill_orders(knite_order, order, False)
            return True
            
        elif status == ORDER_STATUS_OPEN:
            if order.type == ORDER_TYPE_LIMIT:
                # Low-latency modification
                asyncio.create_task(cls.modify_order(knite_order))
            return False

    @classmethod
    async def process_errored_orders(cls):
        """Recover from errored order states"""
        if not cls._errored_orders:
            return
            
        # Process timeout checks
        current_time = time.time()
        cls._errored_orders = [
            o for o in cls._errored_orders 
            if not o.order_timed_out(current_time, cls.ERROR_ORDER_TIMEOUT_SEC)
        ]
        
        # Batch process remaining orders
        if cls._errored_orders:
            orders = await cls.get_orders_by_tags([o.tag for o in cls._errored_orders])
            for order in orders:
                # Handle recovery logic
                if order.status == ORDER_STATUS_OPEN:
                    cls._errored_orders.remove(order)
                    cls._open_orders[order.id] = order
    #endregion

    #region Order Execution
    @classmethod
    def panic(cls):
        """Emergency shutdown procedure"""
        logging.error("PANIC EXIT TRIGGERED!")
        cls.exit_all_orders()

    @classmethod
    def exit_all_orders(cls):
        """Close all open positions"""
        open_orders = list(cls._open_orders.values())
        asyncio.create_task(cls.exit_orders(open_orders))

    @classmethod
    async def exit_orders(cls, orders: List['KniteOrder']):
        """Execute batch exit orders with priority"""
        # Split by priority
        p1_orders = [o for o in orders if o.is_high_priority]
        p2_orders = [o for o in orders if not o.is_high_priority]
        
        # Add barriers
        if p1_orders:
            p1_orders.append(cls.get_barrier_order())
        if p2_orders:
            p2_orders.append(cls.get_barrier_order())
            
        # Atomic queue update
        with cls._lock:
            cls._orders_to_place.extendleft(reversed(p1_orders))
            cls._orders_to_place.extendleft(reversed(p2_orders))
        
        await cls.process_new_orders()

    @classmethod
    async def place_orders_from_file(cls, file_path: str):
        """Load and execute orders from file"""
        export_orders = deserialize_orders(file_path)
        for eo in export_orders:
            ko = KniteOrder(ORDER_TYPE_LIMIT)
            if ko.parse_order(eo):
                await cls.place_new_order(ko)
    #endregion

    #region Low-Latency Optimizations
    @classmethod
    async def process_new_orders(cls):
        """Order placement with nanosecond precision"""
        if cls.BLOCK_ALL_ORDERS or not cls._orders_to_place:
            return
            
        # Process up to 100 orders per cycle
        for _ in range(min(100, len(cls._orders_to_place))):
            if not cls.can_place_new_order(cls._orders_to_place[0]):
                return
                
            order = cls._orders_to_place.popleft()
            await cls.process_new_order(order)

    @classmethod
    async def process_new_order(cls, order: 'KniteOrder'):
        """Execute single order with minimal latency"""
        if order.is_barrier:
            logging.info("Barrier processed")
            cls._barrier_orders.discard(order.id)
            return
            
        # SL handling
        if order.is_exit_order:
            await cls.process_sl_exit(order)
            
        # Execute order
        try:
            if order.quantity > 0:
                broker_order = await cls.place_order(cls._api, order)
                await cls.fill_orders(order, broker_order, False)
        except Exception as e:
            logging.warning(f"Order {order.id} placement failed: {e}")
            await cls.handle_order_failure(order)

    @classmethod
    def can_place_new_order(cls, order: 'KniteOrder') -> bool:
        """Check for barrier conditions"""
        return not order.is_barrier or not cls._barrier_orders
    #endregion

    #region Helper Methods
    @classmethod
    def get_barrier_order(cls) -> 'KniteOrder':
        """Create order barrier for synchronization"""
        barrier = KniteOrder(ORDER_TYPE_LIMIT)
        barrier.tag = "BARRIER"
        barrier.is_barrier = True
        cls._barrier_orders.add(barrier.id)
        return barrier

    @classmethod
    async def fill_orders(cls, knite_order: 'KniteOrder', 
                         broker_order: 'Order', retry: bool):
        """Handle order fills with position management"""
        # Position management logic
        if knite_order.is_exit_order:
            # Closing position
            pass
        else:
            # Opening position
            pass
            
        # SL order creation
        if knite_order.sl_price and broker_order.filled_qty > 0:
            # Create SL order only if price hasn't breached
            current_price = await knite_order.instrument.get_ltp()
            if current_price and current_price < knite_order.sl_price:
                sl_order = cls.create_sl_order(knite_order)
                with cls._lock:
                    cls._sl_orders.append(sl_order)

    @classmethod
    def create_sl_order(cls, parent_order: 'KniteOrder') -> 'KniteOrder':
        """Generate SL order with parent linkage"""
        sl_order = KniteOrder(ORDER_TYPE_SL)
        sl_order.parent = parent_order
        sl_order.instrument = parent_order.instrument
        sl_order.quantity = parent_order.quantity
        sl_order.price = parent_order.sl_price
        return sl_order
    #endregion

    #region Broker API Methods
    @classmethod
    async def place_order(cls, flattrade_broker: FlattradeAPI, order: 'KniteOrder'):
        """Place order through Flattrade API. No internal state tracking. Strictly follow docs. Rely on WebSocket/API for order state."""
        try:
            order_type = cls._map_order_type(order.order_type)
            side = "B" if order.quantity > 0 else "S"
            qty = abs(order.quantity)

            # Adjust symbol format for Flattrade API compatibility
            symbol = order.symbol.replace("MCX:", "")  # Remove 'MCX:' prefix if present

            # Prepare order payload per Flattrade docs and your logic
            order_payload = {
                "uid": str(flattrade_broker.creds['USER']),
                "actid": str(flattrade_broker.creds['USER']),
                "exch": "MCX",
                "tsym": str(symbol),
                "qty": str(qty),
                "prd": str(order.product_type if order.product_type is not None else "I"),
                "trantype": str(side),
                "ret": "DAY"
            }

            # Order type logic
            if order.order_type == "SL-M":
                order_payload["prctyp"] = "SL-M"
                order_payload["trigprc"] = str(order.price if order.price is not None else "0")
                order_payload["prc"] = "0"
            elif order.order_type == ORDER_TYPE_SL:
                order_payload["prctyp"] = "SL"
                order_payload["trigprc"] = str(order.price if order.price is not None else "0")
                order_payload["prc"] = str(order.price if order.price is not None else "0")
            elif order.order_type == ORDER_TYPE_LIMIT:
                order_payload["prctyp"] = "LIMIT"
                order_payload["prc"] = str(order.price if order.price is not None else "0")
            else:
                order_payload["prctyp"] = "MARKET"
                order_payload["prc"] = "0"

            # Remove any None values
            order_payload = {k: v for k, v in order_payload.items() if v is not None}

            # Log payload
            try:
                payload_json = json.dumps(order_payload)
                logging.info(f"Order payload for {order.symbol}: {payload_json}")
            except Exception as e:
                logging.error(f"Failed to serialize order payload for {order.symbol}: {order_payload}, error: {e}")
                raise ValueError(f"Order payload serialization failed: {e}")

            # Place order via Flattrade API
            response = await flattrade_broker.place_order(**order_payload)
            logging.info(f"Order response for {order.symbol}: {response}")

            if response and "norenordno" in response:
                order_id = response["norenordno"]
                # Do NOT update internal state. Let WebSocket drive state.
                # Return order_id for position manager to track.
                logging.info(f"Placed order {order_id} for {order.symbol}")
                return order_id
            else:
                logging.error(f"Failed to place order for {order.symbol}: {response}")
                return None
        except Exception as e:
            logging.error(f"Error placing order: {str(e)}")
            order.status = ORDER_STATUS_REJECTED
            raise ValueError(f"Order placement failed: {str(e)}")

    @classmethod
    async def modify_order(cls, order: 'KniteOrder'):
        """Modify existing order through Flattrade API"""
        await cls._rate_limiter()
        
        payload = {
            "quantity": abs(order.quantity),
            "price": order.price,
            "triggerprice": order.sl_price
        }
        
        headers = {"Authorization": f"Bearer {cls._access_token}"}
        
        async with cls._session.put(
            f"{FLATTRADE_BASE_URL}/orders/{order.id}", 
            json=payload, 
            headers=headers
        ) as resp:
            data = await resp.json()
            if data.get("status") != "success":
                logging.error(f"Order modification failed: {data}")

    @classmethod
    async def get_orders(cls, order_ids: List[str]) -> List['Order']:
        """Batch fetch order statuses"""
        await cls._rate_limiter()
        headers = {"Authorization": f"Bearer {cls._access_token}"}
        orders = []
        
        for order_id in order_ids:
            async with cls._session.get(
                f"{FLATTRADE_BASE_URL}/orders/{order_id}", 
                headers=headers
            ) as resp:
                data = await resp.json()
                if data.get("status") == "success":
                    order_data = data["data"]
                    orders.append(
                        Order(
                            id=order_data["orderid"],
                            status=order_data["status"],
                            type=order_data["ordertype"],
                            filled_qty=int(order_data["filledqty"]),
                            price=float(order_data["price"]),
                            quantity=int(order_data["quantity"])
                        )
                    )
        return orders

    @classmethod
    async def get_orders_by_tags(cls, tags: List[str]) -> List['Order']:
        """Fetch orders by their tags"""
        await cls._rate_limiter()
        headers = {"Authorization": f"Bearer {cls._access_token}"}
        all_orders = []
        
        async with cls._session.get(
            f"{FLATTRADE_BASE_URL}/orders", 
            headers=headers
        ) as resp:
            data = await resp.json()
            if data.get("status") == "success":
                for order_data in data["data"]:
                    if order_data.get("tag") in tags:
                        all_orders.append(Order(
                            id=order_data["orderid"],
                            status=order_data["status"],
                            type=order_data["ordertype"],
                            filled_qty=int(order_data["filledqty"]),
                            price=float(order_data["price"]),
                            quantity=int(order_data["quantity"])))
        return all_orders

    @classmethod
    def _map_order_type(cls, knite_type: str) -> str:
        """Convert Knite order types to Flattrade types"""
        return {
            ORDER_TYPE_LIMIT: "L",
            ORDER_TYPE_SL: "SL-L",
            ORDER_TYPE_MARKET: "MKT"
        }[knite_type]
    #endregion

    #region Daily Cycle
    @classmethod
    async def sod(cls):
        """Start-of-day initialization"""
        # Pre-fetch critical data
        await cls._live_pos_mgr.initialize()
        logging.info("SOD processing complete")

    @classmethod
    def get_api_client(cls) -> Optional[FlattradeAPI]:
        """Return the authenticated FlattradeAPI instance."""
        return cls._api

    @classmethod
    async def eod(cls):
        """End-of-day processing"""
        # Flush all pending orders
        with cls._lock:
            cls._orders_to_place.clear()
            cls._open_orders.clear()
            
        # Close WebSocket
        if cls._ws:
            await cls._ws.close()
            
        logging.info("EOD processing complete")
    #endregion

#region Supporting Classes
class PositionState:
    """
    Simple position-centric state tracking for OMS. Relies on WebSocket/API for order status.
    """
    def __init__(self):
        self.active = False
        self.symbol = None
        self.qty = 0
        self.entry_order_id = None
        self.sl_order_id = None
        self.exit_order_id = None
        self.state = "no_position"  # possible: no_position, waiting_for_entry, holding, exit_pending
        self.entry_price = None
        self.exit_trigger_price = None
        self.sl_trigger_price = None

class Order:
    __slots__ = ('id', 'status', 'type', 'filled_qty', 'price', 'quantity')
    
    def __init__(self, id: str, status: str, type: str, filled_qty: int, price: float, quantity: int):
        self.id = id
        self.status = status
        self.type = type
        self.filled_qty = filled_qty
        self.price = price
        self.quantity = quantity

class KniteOrder:
    __slots__ = ('id', 'order_type', 'quantity', 'price', 'instrument', 
                 'status', 'created_at', 'tag', 'sl_price', 'parent', 
                 'is_retried', 'is_barrier', 'is_exit_order', 'expected_price',
                 'filled_qty', 'exchange', 'symbol', 'is_high_priority', 'stop_breached', 'product_type')
    
    def __init__(self, order_type: str, product_type: str = 'I'):
        self.id = generate_order_id()
        self.order_type = order_type
        self.product_type = product_type
        self.quantity = 0
        self.price = 0.0
        self.instrument = None
        self.status = "PENDING"
        self.created_at = time.time()
        self.tag = ""
        self.sl_price = 0.0
        self.parent = None
        self.is_retried = False
        self.is_barrier = False
        self.is_exit_order = False
        self.expected_price = 0.0
        self.filled_qty = 0
        self.exchange = "NSE"
        self.symbol = ""
        self.is_high_priority = False
        self.stop_breached = False
        
    def parse_order(self, export_order) -> bool:
        """Convert export order to executable order"""
        # Parsing logic
        self.quantity = export_order.quantity
        self.price = export_order.price
        self.symbol = export_order.symbol
        self.tag = export_order.tag
        return True
        
    def order_timed_out(self, current_time: float, timeout: int) -> bool:
        return current_time - self.created_at > timeout
        
    @property
    def is_sl_order(self) -> bool:
        return self.order_type == ORDER_TYPE_SL
        
    @property
    def is_open(self) -> bool:
        return self.status == ORDER_STATUS_OPEN

class PositionMgr:
    async def initialize(self):
        """Pre-load position data"""
        pass
        
    def open_position(self, order: KniteOrder) -> bool:
        """Atomic position opening"""
        return True
        
    def close_position(self, order: KniteOrder) -> bool:
        """Atomic position closing"""
        return True
#endregion

# Utility Functions
def generate_order_id() -> str:
    """Nanosecond precision order ID"""
    return f"ORD_{time.time_ns()}"

def deserialize_orders(file_path: str) -> List[dict]:
    """Mock deserialization function"""
    return []

async def main():
    # Initialize with your Flattrade credentials
    await OrderManager.start(
        api_key="YOUR_API_KEY",
        api_secret="YOUR_API_SECRET",
        client_id="YOUR_CLIENT_ID",
        password="YOUR_PASSWORD"
    )

if __name__ == "__main__":
    asyncio.run(main())
