"use client";

import { motion } from "framer-motion";
import {
  Cpu,
  LineChart,
  Zap,
  Network,
  BarChart3,
  Activity,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const services = [
  {
    name: "Mid-Frequency Trading",
    description:
      "Ultra-low latency execution systems capturing alpha",
    icon: Zap,
  },
  {
    name: "Statistical Arbitrage",
    description:
      "Identifying and exploiting price discrepancies across related assets",
    icon: LineChart,
  },
  {
    name: "Machine Learning Models",
    description:
      "Advanced AI algorithms for pattern recognition and prediction",
    icon: Cpu,
  },
  {
    name: "Backtesting",
    description:
      "Comprehensive strategy validation and performance analysis",
    icon: Activity,
    href: "/solutions/backtesting",
    showLearnMore: true
  },
  {
    name: "Strategy Automation",
    description:
      "Customized automated trading strategies tailored to your specific needs",
    icon: Network,
    href: "/solutions/trading-systems",
    showLearnMore: true
  },
  {
    name: "Alpha Generation",
    description:
      "Systematic strategies delivering consistent returns across market cycles",
    icon: BarChart3,
    href: "/solutions/alpha-generation",
    showLearnMore: true
  },
];

const pulseAnimation = {
  initial: { opacity: 0.5, scale: 0.95 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1,
      repeat: Infinity,
      repeatType: "reverse" as const
    }
  }
};

export function ServicesSection() {
  return (
    <section className="py-24 sm:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-black via-[#0A1525] to-[#0F2645]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.02),transparent_80%)]"></div>
      
      {/* Formula Background */}
      <div className="absolute inset-x-0 top-0 h-full overflow-hidden">
        <div 
          className="absolute left-1/2 top-0 w-full max-w-[800px] -translate-x-1/2 transform opacity-[0.15]"
          style={{ 
            width: 'min(800px, 100vw)',
            filter: 'brightness(2) contrast(0.8)'
          }}
        >
          <img 
            src="/formula.svg" 
            alt="" 
            className="w-full"
          />
        </div>
      </div>

      <div className="container relative z-10">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Our Solutions
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-300">
              Cutting-edge solutions powered by advanced technology
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:gap-8 lg:mt-20 lg:max-w-none lg:grid-cols-3">
            {services.map((service, index) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  transition: { type: "spring", stiffness: 300 }
                }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col rounded-2xl bg-white p-8 shadow-lg ring-1 ring-navy-900/10 transform-gpu"
              >
                <motion.div 
                  className="mb-6 relative group"
                  initial={{ scale: 1 }}
                  whileHover={{ 
                    scale: 1.2,
                    rotate: [0, -10, 10, -10, 0],
                    transition: {
                      rotate: {
                        duration: 0.5,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatType: "reverse"
                      },
                      scale: {
                        duration: 0.2
                      }
                    }
                  }}
                >
                  {service.icon && (
                    <motion.div
                      initial={pulseAnimation.initial}
                      animate={pulseAnimation.animate}
                      className="sm:animate-none"
                      whileHover={{ 
                        opacity: 1,
                        scale: 1.1,
                        filter: "drop-shadow(0 0 8px rgba(14, 165, 233, 0.3))"
                      }}
                    >
                      <service.icon className="h-8 w-8 text-gold-400" />
                    </motion.div>
                  )}
                </motion.div>
                <motion.h3 
                  className="text-lg font-semibold leading-7 text-navy-900"
                  whileHover={{ scale: 1.05, color: "#1a365d" }}
                  transition={{ duration: 0.2 }}
                >
                  {service.name}
                </motion.h3>
                <motion.p 
                  className="mt-4 text-base leading-7 text-navy-600"
                  initial={{ opacity: 0.8 }}
                  whileHover={{ opacity: 1 }}
                >
                  {service.description}
                </motion.p>
                {service.showLearnMore && (
                  <motion.div
                    className="mt-6 group"
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1 }}
                  >
                    <Link 
                      href={service.href}
                      className="inline-flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-navy-800 to-navy-900 text-white text-sm font-medium transition-all duration-300 hover:from-navy-700 hover:to-navy-800 hover:shadow-lg group"
                    >
                      <span className="relative">
                        Learn More
                      </span>
                      <motion.span
                        className="ml-2"
                        initial={{ x: 0 }}
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ArrowRight className="h-4 w-4" />
                      </motion.span>
                    </Link>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}