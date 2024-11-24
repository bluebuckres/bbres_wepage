"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Shield, BarChart2, GitBranch, LineChart, Code2, Briefcase, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const backtestingDetails = {
  title: "Backtesting",
  subtitle: "Check Before Deploy Your Hard Earn Money",
  overview: "Have a trading strategy but unsure about its performance? Let us help you transform your ideas into validated trading systems.",
  benefits: {
    title: "Why Choose Us for Backtesting?",
    items: [
      "Protect your intellectual property",
      "Professional grade analysis",
      "Opportunity for profit sharing",
      "Potential partnership if strategy shows promise",
      "Convert discretionary to systematic trading"
    ]
  },
  offerings: {
    title: "What We Offer",
    icon: BarChart2,
    items: [
      "Comprehensive strategy validation",
      "Detailed performance metrics",
      "Risk analysis reports",
      "Strategy optimization suggestions",
      "Implementation roadmap"
    ]
  },
  process: {
    title: "Our Process",
    icon: GitBranch,
    items: [
      "Strategy consultation",
      "Historical data analysis",
      "Robust backtesting",
      "Performance reporting",
      "Risk assessment",
      "Implementation planning"
    ]
  },
  metrics: {
    title: "Performance Metrics Provided",
    icon: LineChart,
    items: [
      "Returns & drawdowns",
      "Risk-adjusted metrics",
      "Win rate & profit factors",
      "Position analytics",
      "Trading costs impact",
      "Strategy correlation"
    ]
  },
  technologies: {
    title: "Technologies We Use",
    icon: Code2,
    items: [
      "Python ecosystem",
      "Pandas/Polars for data processing",
      "NumPy for computations",
      "Matplotlib/Seaborn for visualization",
      "Scikit-learn for analysis",
      "Custom backtesting engines",
      "TA-Lib for technical analysis",
      "Jupyter for interactive analysis",
      "Quantstats for reporting"
    ]
  },
  cta: {
    title: "Turn Your Ideas Into Reality",
    icon: Briefcase,
    description: "Whether you're a discretionary trader looking to validate strategies or seeking partnership opportunities, we're here to help. Your strategies remain confidential, and high-performing systems may qualify for profit-sharing arrangements."
  }
};

export default function BacktestingPage() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen bg-black">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0A1525] to-[#0F2645] pointer-events-none" />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-transparent to-cyan-500/10 pointer-events-none" />
      
      {/* Content */}
      <div className="relative">
        <div className="container mx-auto px-4 py-12">
          <Button
            variant="ghost"
            className="mb-8 hover:bg-white/10"
            onClick={() => router.back()}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-500">
              {backtestingDetails.title}
            </h1>
            <p className="text-2xl md:text-3xl text-gray-300 mb-6 font-semibold">
              {backtestingDetails.subtitle}
            </p>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              {backtestingDetails.overview}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-white/10 mb-16 max-w-4xl mx-auto"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-lg bg-[#0ea4e9]/10">
                <Shield className="h-6 w-6 text-[#0ea4e9]" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold">{backtestingDetails.benefits.title}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {backtestingDetails.benefits.items.map((item, index) => (
                <div key={index} className="flex items-center bg-white/5 rounded-lg p-4">
                  <span className="w-2 h-2 bg-[#0ea4e9] rounded-full mr-3 flex-shrink-0"></span>
                  <span className="text-gray-300">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {[backtestingDetails.offerings, backtestingDetails.process].map((section, index) => {
              const Icon = section.icon;
              return (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + (0.1 * index) }}
                  className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-lg bg-[#0ea4e9]/10">
                      <Icon className="h-6 w-6 text-[#0ea4e9]" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold">{section.title}</h3>
                  </div>
                  <ul className="space-y-3">
                    {section.items.map((item, idx) => (
                      <li key={idx} className="flex items-center text-gray-300">
                        <span className="w-2 h-2 bg-[#0ea4e9] rounded-full mr-3 flex-shrink-0"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {[backtestingDetails.metrics, backtestingDetails.technologies].map((section, index) => {
              const Icon = section.icon;
              return (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + (0.1 * index) }}
                  className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-lg bg-[#0ea4e9]/10">
                      <Icon className="h-6 w-6 text-[#0ea4e9]" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold">{section.title}</h3>
                  </div>
                  <ul className="space-y-3">
                    {section.items.map((item, idx) => (
                      <li key={idx} className="flex items-center text-gray-300">
                        <span className="w-2 h-2 bg-[#0ea4e9] rounded-full mr-3 flex-shrink-0"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-white/10 mb-16 max-w-4xl mx-auto"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-lg bg-[#0ea4e9]/10">
                <Briefcase className="h-6 w-6 text-[#0ea4e9]" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold">{backtestingDetails.cta.title}</h2>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              {backtestingDetails.cta.description}
            </p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.9 }}
              className="flex justify-center"
            >
              <Button
                onClick={() => router.push('/contact')}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-6 rounded-xl text-lg font-semibold transition-all duration-200 flex items-center gap-2 hover:gap-4 hover:shadow-lg hover:shadow-blue-500/20"
              >
                Connect with Us
                <ArrowRight className="h-5 w-5" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
