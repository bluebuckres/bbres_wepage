"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const stats = [
  { name: "Transaction", value: "₹470 Cr+" },
  { name: "Institutional Investors", value: "6+" },
  { name: "Trades", value: "3900K+" },
  { name: "Years Active", value: "3+" },
  { name: "Custom Automation Completed", value: "260+" },
];

function Counter({ value }: { value: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref);
  
  // Extract number from string (e.g., "₹470 Cr+" -> 470)
  const numberMatch = value.match(/\d+/);
  const targetNumber = numberMatch ? parseInt(numberMatch[0]) : 0;
  
  // Extract prefix and suffix (e.g., "₹470 Cr+" -> "₹" and " Cr+")
  const prefix = value.slice(0, value.indexOf(numberMatch![0]));
  const suffix = value.slice(value.indexOf(numberMatch![0]) + numberMatch![0].length);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    const duration = 2000; // 2 seconds

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOutQuart * targetNumber);

      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, targetNumber]);

  return (
    <span ref={ref} className="text-3xl font-semibold tracking-tight text-blue-400">
      {prefix}{count}{suffix}
    </span>
  );
}

export function StatsSection() {
  return (
    <div className="relative isolate overflow-hidden py-24 sm:py-32">
      {/* Futuristic Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F2645] via-[#0A1525] to-black" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(14,164,233,0.1)_0%,transparent_50%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(14,164,233,0.05)_50%,transparent_75%)]" />
          <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,rgba(14,164,233,0.05)_0px,rgba(14,164,233,0.05)_1px,transparent_1px,transparent_80px)]" />
          <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(14,164,233,0.05)_0px,rgba(14,164,233,0.05)_1px,transparent_1px,transparent_80px)]" />
          <div className="absolute top-0 left-0 right-0 h-[500px] bg-[radial-gradient(ellipse_at_50%_0%,rgba(14,164,233,0.2)_0%,transparent_70%)]" />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.8)_0%,transparent_40%,transparent_60%,rgba(0,0,0,0.8)_100%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="p-8 rounded-lg bg-gradient-to-br from-[#0F2645]/80 via-[#0A1525]/90 to-black/95 backdrop-blur-lg border border-white/10 relative overflow-hidden">
          {/* Accent lines */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#0ea4e9] to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#0ea4e9] to-transparent" />
            <div className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b from-transparent via-[#0ea4e9] to-transparent" />
            <div className="absolute top-0 right-0 w-[1px] h-full bg-gradient-to-b from-transparent via-[#0ea4e9] to-transparent" />
          </div>

          <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-5">
            {stats.map((stat) => (
              <motion.div
                key={stat.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mx-auto flex max-w-xs flex-col gap-y-4"
              >
                <dt className="text-base leading-7 text-gray-300">{stat.name}</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-blue-400 sm:text-5xl">
                  <Counter value={stat.value} />
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}