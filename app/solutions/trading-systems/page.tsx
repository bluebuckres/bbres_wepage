"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Users, Zap, LineChart, LayoutGrid, Wrench, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const tradingSystemsDetails = {
  title: "Trading Solutions",
  subtitle: "High-performance, customized trading infrastructure for retail traders, HNIs, and institutions.",
  overview: "Our systems are built from ground up focusing on performance and reliability. We specialize in creating customized trading solutions that integrate seamlessly with your existing brokers and strategies.",
  features: [
    {
      title: "Multi-Account Management",
      icon: Users,
      description: "Comprehensive account management solutions for institutions and family offices.",
      details: [
        "Multiple account execution",
        "Family office solutions",
        "Portfolio management across accounts",
        "Unified risk management",
        "Consolidated reporting",
        "Different allocation strategies",
        "And many more customizations available..."
      ]
    },
    {
      title: "Low-Latency Execution",
      icon: Zap,
      description: "High-performance order execution with advanced monitoring capabilities.",
      details: [
        "Multi-broker order management",
        "Optimized order execution",
        "Advanced order slicing algorithms",
        "Real-time performance monitoring",
        "Strategy-specific customizations",
        "And many more performance features..."
      ]
    },
    {
      title: "Strategy Implementation",
      icon: LineChart,
      description: "Comprehensive support for diverse trading approaches.",
      details: [
        "Options trading systems (including ODTE)",
        "Equity market strategies",
        "Commodity trading solutions",
        "Trend following systems",
        "Mean reversion models",
        "Quantitative stock screening",
        "And many more strategies supported..."
      ]
    },
    {
      title: "Smart Order Management",
      icon: LayoutGrid,
      description: "Intelligent order routing and risk management system.",
      details: [
        "Intelligent order routing",
        "Risk management controls",
        "Real-time position monitoring",
        "Multi-strategy support",
        "Cross-instrument trading",
        "And many more management features..."
      ]
    },
    {
      title: "Custom Solutions",
      icon: Wrench,
      description: "Tailored trading infrastructure designed for your specific needs.",
      details: [
        "Strategy-specific optimizations",
        "Multi-broker integration",
        "Real-time monitoring dashboards",
        "Performance analytics",
        "Risk management tools",
        "24/7 system monitoring",
        "And many more custom features..."
      ]
    }
  ],
  technologies: {
    "Programming Languages": [
      "C++17/20",
      "Python",
      "Golang",
      "Rust"
    ],
    "Infrastructure": [
      "Linux (Ubuntu/CentOS)",
      "AWS Cloud",
      "Docker/Kubernetes"
    ],
    "Databases": [
      "Clickhouse for time-series data",
      "Redis for caching",
      "MongoDB for analytics",
      "PostgreSQL for transactional data"
    ],
    "Monitoring & Analytics": [
      "Grafana dashboards",
      "Prometheus metrics",
      "ELK Stack",
      "Custom analytics tools"
    ],
    "Development Tools": [
      "Git version control",
      "Jenkins CI/CD",
      "Ansible automation",
      "Terraform infrastructure"
    ],
    "Performance Tools": [
      "Custom low-latency libraries",
      "Memory optimization tools",
      "Network analyzers",
      "Performance profilers"
    ]
  }
};

export default function TradingSystemsPage() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen bg-black">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0A1525] to-[#0F2645] pointer-events-none" />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-transparent to-cyan-500/10 pointer-events-none" />
      
      {/* Content */}
      <div className="relative">
        <div className="px-6 py-12 sm:py-16 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Button
              variant="ghost"
              onClick={() => router.push("/solutions")}
              className="inline-flex items-center text-[#0ea4e9] hover:text-[#0284c7] mb-8"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Solutions
            </Button>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-4">
                {tradingSystemsDetails.title}
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                {tradingSystemsDetails.subtitle}
              </p>
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 mb-12">
                <p className="text-gray-300 leading-relaxed">
                  {tradingSystemsDetails.overview}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 max-w-screen-2xl mx-auto"
            >
              {tradingSystemsDetails.features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 rounded-lg bg-[#0ea4e9]/10">
                        <Icon className="h-6 w-6 text-[#0ea4e9]" />
                      </div>
                      <h3 className="text-2xl font-bold text-white">{feature.title}</h3>
                    </div>
                    <p className="text-gray-300 mb-6">{feature.description}</p>
                    <ul className="space-y-3">
                      {feature.details.map((detail, idx) => (
                        <li key={idx} className="flex items-center text-gray-300">
                          <span className="w-2 h-2 bg-[#0ea4e9] rounded-full mr-3"></span>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 max-w-screen-2xl mx-auto"
            >
              <h2 className="text-3xl font-bold text-white mb-8">Technologies</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Object.entries(tradingSystemsDetails.technologies).map(([category, items], index) => (
                  <div key={category} className="space-y-4">
                    <h3 className="text-xl font-semibold text-white border-b border-[#0ea4e9]/30 pb-2">{category}</h3>
                    <ul className="space-y-3">
                      {items.map((item, idx) => (
                        <li key={idx} className="flex items-center text-gray-300">
                          <span className="w-2 h-2 bg-[#0ea4e9] rounded-full mr-3"></span>
                          {item}
                        </li>
                      ))}
                      <li className="flex items-center text-[#0ea4e9] italic">
                        <span className="w-2 h-2 bg-[#0ea4e9] rounded-full mr-3"></span>
                        And many more...
                      </li>
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.9 }}
              className="flex justify-center mt-12 mb-16"
            >
              <Button
                onClick={() => router.push('/contact')}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-6 rounded-xl text-lg font-semibold transition-all duration-200 flex items-center gap-2 hover:gap-4 hover:shadow-lg hover:shadow-blue-500/20"
              >
                Connect with Us
                <ArrowRight className="h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
