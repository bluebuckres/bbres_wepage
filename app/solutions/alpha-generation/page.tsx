"use client";

import { motion } from "framer-motion";
import { ArrowLeft, TrendingUp, Brain, LineChart, Activity, Shield, BarChart3, Scale, FlaskConical, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

// Define the valid icon names type
type IconName = keyof typeof IconMap;

// Type for strategy
interface Strategy {
  title: string;
  iconName: IconName;
  description: string;
  details: string[];
}

// Type for alpha generation details
interface AlphaGenerationDetails {
  title: string;
  subtitle: string;
  overview: string;
  performanceMetrics: {
    title: string;
    metrics: string[];
    disclaimer: string;
  };
  strategies: Strategy[];
  solutions: {
    title: string;
    iconName: IconName;
    details: string[];
  };
  riskManagement: {
    title: string;
    iconName: IconName;
    details: string[];
  };
  validation: {
    title: string;
    iconName: IconName;
    details: string[];
  };
}

const alphaGenerationDetails: AlphaGenerationDetails = {
  title: "Alpha-as-a-Service",
  subtitle: "Sophisticated quantitative strategies leveraging advanced mathematics, statistical methods, and machine learning",
  overview: "We develop and deploy rigorously backtested strategies across diverse market regimes to deliver consistent risk-adjusted returns.",
  performanceMetrics: {
    title: "Performance Metrics (2022-2024)",
    metrics: [
      "Consistent monthly positive returns",
      "Average Annual Return: 35-40%*",
      "Sharpe Ratio: 2.0-2.4",
      "Sortino Ratio: 2.2-2.6",
      "Max Drawdown: < 15%",
      "Win Rate: 70-80%",
      "Recovery Period: < 3 months",
      "Information Ratio: 1.4-1.8",
      "Beta to Market: 0.1-0.3",
      "Calmar Ratio: 1.8-2.2"
    ],
    disclaimer: "*Past performance doesn't guarantee future returns"
  },
  strategies: [
    {
      title: "Quantitative Methodologies",
      iconName: "Brain",
      description: "Advanced mathematical approaches:",
      details: [
        "Time series analysis",
        "Bayesian optimization",
        "Statistical arbitrage",
        "Machine learning models",
        "Stochastic calculus",
        "Econometric modeling",
        "Regime switching models",
        "Signal processing",
        "Neural networks",
        "Reinforcement learning"
      ]
    },
    {
      title: "Statistical Arbitrage & Mean Reversion",
      iconName: "Activity",
      description: "Advanced mathematical models capturing market inefficiencies:",
      details: [
        "Pairs trading algorithms",
        "Cointegration analysis",
        "Kalman filter implementation",
        "Cross-asset correlations",
        "Statistical significance testing",
        "GARCH modeling",
        "PCA analysis",
        "Historical Sharpe: 1.6-2.0",
        "Max Drawdown: 8-12%"
      ]
    },
    {
      title: "ML-Driven Signals",
      iconName: "Brain",
      description: "Combining traditional and modern approaches:",
      details: [
        "Deep learning models",
        "Alternative data processing",
        "Feature engineering",
        "Real-time signal generation",
        "Market regime detection",
        "NLP sentiment analysis",
        "Ensemble methods",
        "Anomaly detection",
        "Historical Sharpe: 1.7-2.1",
        "Max Drawdown: 10-14%"
      ]
    },
    {
      title: "Factor Investing & Trend Following",
      iconName: "TrendingUp",
      description: "Systematic strategies across timeframes:",
      details: [
        "Multi-factor models",
        "Risk premia strategies",
        "Adaptive trend detection",
        "Multi-timeframe analysis",
        "Portfolio optimization",
        "Momentum strategies",
        "Value factors",
        "Quality metrics",
        "Historical Sharpe: 1.8-2.2",
        "Max Drawdown: 12-15%"
      ]
    },
    {
      title: "Delta Neutral Options",
      iconName: "LineChart",
      description: "Market neutral strategies with controlled risk:",
      details: [
        "Volatility trading models",
        "Greeks optimization",
        "Dynamic hedging systems",
        "Risk-adjusted sizing",
        "Options arbitrage",
        "Volatility surface modeling",
        "Skew trading",
        "Historical Sharpe: 1.5-1.9",
        "Max Drawdown: 10-14%"
      ]
    }
  ],
  solutions: {
    title: "Investment Solutions",
    iconName: "BarChart3",
    details: [
      "Profit sharing arrangements",
      "Customizable capital deployment",
      "Segregated accounts",
      "Strategy customization",
      "Real-time monitoring",
      "Daily performance updates",
      "Transparent reporting",
      "Risk allocation options"
    ]
  },
  riskManagement: {
    title: "Risk Management",
    iconName: "Shield",
    details: [
      "Real-time monitoring",
      "VaR calculations",
      "Expected shortfall",
      "Position size optimization",
      "Dynamic risk controls",
      "Correlation analysis",
      "Stress testing",
      "Scenario analysis",
      "Liquidity management",
      "Counterparty risk monitoring"
    ]
  },
  validation: {
    title: "Strategy Validation",
    iconName: "FlaskConical",
    details: [
      "Extensive backtesting",
      "Walk-forward analysis",
      "Monte Carlo simulations",
      "Transaction cost analysis",
      "Regime stress testing",
      "Performance attribution",
      "Factor decomposition",
      "Robustness checks",
      "Sensitivity analysis",
      "Out-of-sample testing"
    ]
  }
};

// Icon mapping object
const IconMap = {
  Brain,
  Activity,
  TrendingUp,
  LineChart,
  BarChart3,
  Shield,
  FlaskConical
};

export default function AlphaGenerationPage() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen bg-black">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0A1525] to-[#0F2645] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-transparent to-cyan-500/10 pointer-events-none" />
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
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-500 whitespace-nowrap">
              Alpha&#8209;as&#8209;a&#8209;Service
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">{alphaGenerationDetails.subtitle}</p>
            <p className="text-gray-400 mb-16 max-w-2xl mx-auto">{alphaGenerationDetails.overview}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-white/10 mb-16 max-w-4xl mx-auto"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">{alphaGenerationDetails.performanceMetrics.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {alphaGenerationDetails.performanceMetrics.metrics.map((metric, index) => (
                <div key={index} className="flex items-center bg-white/5 rounded-lg p-4">
                  <span className="w-2 h-2 bg-[#0ea4e9] rounded-full mr-3 flex-shrink-0"></span>
                  <span className="text-gray-300">{metric}</span>
                </div>
              ))}
            </div>
            <p className="text-[#0ea4e9] mt-8 italic text-center">
              {alphaGenerationDetails.performanceMetrics.disclaimer}
            </p>
          </motion.div>

          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Our Strategies</h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              {alphaGenerationDetails.strategies.map((strategy, index) => {
                const Icon = IconMap[strategy.iconName];
                return (
                  <motion.div
                    key={strategy.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 rounded-lg bg-[#0ea4e9]/10">
                        <Icon className="h-6 w-6 text-[#0ea4e9]" />
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold">{strategy.title}</h3>
                    </div>
                    <p className="text-gray-300 mb-6 text-sm md:text-base">{strategy.description}</p>
                    <ul className="space-y-3 text-sm md:text-base">
                      {strategy.details.map((detail, idx) => (
                        <li key={idx} className="flex items-center text-gray-300">
                          <span className="w-2 h-2 bg-[#0ea4e9] rounded-full mr-3 flex-shrink-0"></span>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Additional Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[alphaGenerationDetails.solutions, alphaGenerationDetails.riskManagement, alphaGenerationDetails.validation].map((section, index) => {
                const Icon = IconMap[section.iconName];
                return (
                  <motion.div
                    key={section.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + (0.1 * index) }}
                    className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 rounded-lg bg-[#0ea4e9]/10">
                        <Icon className="h-6 w-6 text-[#0ea4e9]" />
                      </div>
                      <h3 className="text-xl font-bold">{section.title}</h3>
                    </div>
                    <ul className="space-y-3 text-sm md:text-base">
                      {section.details.map((detail, idx) => (
                        <li key={idx} className="flex items-center text-gray-300">
                          <span className="w-2 h-2 bg-[#0ea4e9] rounded-full mr-3 flex-shrink-0"></span>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.9 }}
            className="flex justify-center mt-12"
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
  );
}
