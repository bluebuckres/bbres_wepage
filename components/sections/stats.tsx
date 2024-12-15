"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function generateRelevantCalc(value: string, currentCount: number) {
  // Extract the base number without suffix
  const numMatch = value.match(/\d+/);
  if (!numMatch) return "";
  
  const num = parseInt(numMatch[0]);
  
  // Different calculations based on the stat type
  if (value.includes("Cr")) {
    return `${Math.round(num * 0.65)} + ${Math.round(num * 0.35)} Cr`;
  }
  else if (value.includes("K")) {
    const kValue = num / 1000;
    return `${Math.round(kValue * 0.8)}K + ${Math.round(kValue * 0.2)}K`;
  }
  else if (num <= 12) { // For Institution/HNI and Years
    const part1 = Math.max(1, Math.floor(currentCount * 0.7));
    const part2 = currentCount - part1;
    return `${part1} + ${part2}`;
  }
  else { // For Custom Automation
    return `${Math.round(num * 0.75)} + ${Math.round(num * 0.25)}`;
  }
}

const stats = [
  { 
    name: "Worth Orders Executed", 
    value: "₹470 Cr+",
    calculations: ["350 + 120 Cr", "400 + 70 Cr", "280 + 190 Cr"]
  },
  { 
    name: "Institution/HNI", 
    value: "12+",
    calculations: ["8 + 4", "7 + 5", "9 + 3"]
  },
  { 
    name: "Trades", 
    value: "4860K+",
    calculations: ["3.2K + 1.66K", "3.5K + 1.36K", "2.9K + 1.96K"]
  },
  { 
    name: "Years Active", 
    value: "4+",
    calculations: ["2 + 2", "3 + 1", "2.5 + 1.5"]
  },
  { 
    name: "Custom Automation Completed", 
    value: "280+",
    calculations: ["180 + 100", "200 + 80", "150 + 130"]
  }
];

function Counter({ value, calculations }: { value: string, calculations: string[] }) {
  const [count, setCount] = useState(0);
  const [calcDisplay, setCalcDisplay] = useState("");
  const [opacity, setOpacity] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref);
  
  const numberMatch = value.match(/\d+/);
  const fullNumber = numberMatch ? numberMatch[0] : "0";
  
  const staticPart = fullNumber.slice(0, -2) || "";
  const animatedPart = parseInt(fullNumber.slice(-2) || fullNumber);
  
  const prefix = value.slice(0, value.indexOf(numberMatch![0]));
  const suffix = value.slice(value.indexOf(numberMatch![0]) + numberMatch![0].length);

  const shouldPadZeros = fullNumber.length > 2;

  useEffect(() => {
    if (!isInView) return;
    
    setIsAnimating(true);
    let startTime: number;
    const duration = 2000; // 2 seconds total
    const calcDuration = 1200; // 1.2 seconds for calculations

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Sophisticated easing
      const easeOutCirc = 1 - Math.sqrt(1 - Math.pow(progress, 2));
      const currentCount = Math.floor(easeOutCirc * animatedPart);
      
      // Show calculations only during the first part
      if (elapsed < calcDuration) {
        const calcIndex = Math.min(
          Math.floor((elapsed / calcDuration) * calculations.length),
          calculations.length - 1
        );
        setCalcDisplay(calculations[calcIndex]);
      } else {
        setCalcDisplay("");
      }

      // Fade opacity
      const fadeProgress = Math.min(elapsed / (duration * 0.6), 1);
      const fadeEase = 1 - Math.pow(1 - fadeProgress, 3);
      setOpacity(fadeEase);

      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
      }
    };

    requestAnimationFrame(animate);

    // Cleanup
    return () => {
      setIsAnimating(false);
    };
  }, [isInView, animatedPart, calculations]);

  return (
    <div ref={ref} className="relative group">
      {/* Algorithmic calculation display */}
      <div 
        className="absolute -top-4 left-0 right-0 text-xs font-mono text-blue-400/70 overflow-hidden whitespace-nowrap"
        style={{
          opacity: isAnimating && calcDisplay ? 0.7 : 0,
          transform: `translateY(${calcDisplay ? '0' : '-5px'})`,
          transition: 'all 0.2s ease-out'
        }}
      >
        {calcDisplay && `→ ${calcDisplay}`}
      </div>

      {/* Main number display */}
      <div 
        className="text-3xl font-bold tracking-tight text-white relative z-10 py-2"
        style={{
          opacity: opacity,
          transform: `translateY(${(1 - opacity) * 10}px)`,
          transition: 'transform 0.3s ease-out'
        }}
      >
        {prefix}
        <span className="relative">
          {staticPart}
          <span className="relative inline-block min-w-[2ch] font-mono">
            {shouldPadZeros ? String(count).padStart(2, '0') : count}
          </span>
        </span>
        {suffix}
      </div>

      {/* Technical grid background */}
      <div className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, rgba(14,164,233,0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(14,164,233,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }} />
      </div>
    </div>
  );
}

export function StatsSection() {
  return (
    <div className="relative isolate overflow-hidden py-24 sm:py-32">
      {/* Futuristic Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F2645] via-[#0A1525] to-black" />
        
        {/* Pattern Background */}
        <div className="absolute inset-0">
          <img 
            src="/pattern-main.svg" 
            alt="" 
            className="absolute w-full h-full object-cover opacity-40"
            style={{ 
              filter: 'brightness(2.5) contrast(1.2)'
            }}
          />
        </div>

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
        <div className="p-8 rounded-lg bg-gradient-to-br from-[#0F2645]/15 via-[#0A1525]/20 to-black/25 backdrop-blur-[2px] border border-white/10 relative overflow-hidden">
          {/* Accent lines */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#0ea4e9]/25 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#0ea4e9]/25 to-transparent" />
            <div className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b from-transparent via-[#0ea4e9]/25 to-transparent" />
            <div className="absolute top-0 right-0 w-[1px] h-full bg-gradient-to-b from-transparent via-[#0ea4e9]/25 to-transparent" />
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
                  <Counter value={stat.value} calculations={stat.calculations} />
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}