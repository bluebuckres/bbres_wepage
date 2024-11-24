"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const solutions = [
  {
    title: "Trading Systems",
    description: "High-performance, low-latency trading infrastructure designed for institutional-grade execution.",
    details: [
      {
        title: "Ultra-Low Latency",
        description: "Sub-microsecond order execution with direct market connectivity and optimized network paths."
      },
      {
        title: "Smart Order Routing",
        description: "Intelligent order routing algorithms that optimize execution across multiple venues."
      },
      {
        title: "Market Making",
        description: "Advanced market making systems with real-time pricing and risk controls."
      },
      {
        title: "Custom Infrastructure",
        description: "Tailored trading infrastructure designed for your specific trading strategies."
      }
    ]
  },
  {
    title: "Alpha Generation",
    description: "Sophisticated quantitative strategies leveraging advanced mathematics and machine learning.",
    details: [
      {
        title: "Statistical Arbitrage",
        description: "Mean reversion and pairs trading strategies across multiple asset classes."
      },
      {
        title: "ML-Driven Signals",
        description: "Machine learning models that identify trading opportunities using alternative data."
      },
      {
        title: "High-Frequency Strategies",
        description: "Micro-structure trading strategies exploiting short-term price movements."
      },
      {
        title: "Factor Investing",
        description: "Systematic strategies based on academic and proprietary factors."
      }
    ]
  },
  {
    title: "Backtesting",
    description: "Comprehensive backtesting framework for strategy validation and optimization.",
    details: [
      {
        title: "Historical Simulation",
        description: "Tick-by-tick historical data simulation with realistic market conditions."
      },
      {
        title: "Performance Analytics",
        description: "Detailed strategy performance metrics and risk analytics."
      },
      {
        title: "Parameter Optimization",
        description: "Grid search and genetic algorithms for strategy parameter optimization."
      },
      {
        title: "Market Impact",
        description: "Advanced models to estimate and account for market impact in backtests."
      }
    ]
  }
];

export default function SolutionsPage() {
  const router = useRouter();

  return (
    <div className="relative isolate overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0A1525] to-[#0F2645]"></div>
      
      <div className="relative px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Our Solutions
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Cutting-edge quantitative trading solutions powered by advanced technology and research
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3"
          >
            {solutions.map((solution, index) => (
              <div
                key={solution.title}
                className="relative group"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 h-full border border-white/10 hover:border-[#0ea4e9]/50 transition-all duration-300"
                >
                  <h2 className="text-2xl font-bold text-white mb-4">{solution.title}</h2>
                  <p className="text-gray-300 mb-6">{solution.description}</p>
                  
                  <div className="space-y-6">
                    {solution.details.map((detail) => (
                      <div key={detail.title} className="bg-white/5 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-white mb-2">{detail.title}</h3>
                        <p className="text-gray-300 text-sm">{detail.description}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6">
                    <Button
                      variant="default"
                      className="bg-[#0ea4e9] hover:bg-[#0284c7] text-white w-full group"
                      onClick={() => {
                        if (solution.title === "Trading Systems") {
                          router.push("/solutions/trading-systems");
                        } else if (solution.title === "Alpha Generation") {
                          router.push("/solutions/alpha-generation");
                        } else if (solution.title === "Backtesting") {
                          router.push("/solutions/backtesting");
                        }
                      }}
                    >
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </motion.div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
