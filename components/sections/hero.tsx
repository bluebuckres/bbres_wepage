"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ParticlesBackground } from "../particles-background";
import Image from 'next/image';
import { CircuitPattern } from "../circuit-pattern";

const words = [
  "Quantitative Trading",
  "Quantitative Investing",
  "Algorithmic Trading",
];

export function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[calc(100vh-4rem)] overflow-hidden bg-gradient-to-br from-[#0A1525] via-[#061020] to-black">
      {/* NYC Skyline Background */}
      <div 
        className="absolute inset-0 -z-20 opacity-10"
        style={{
          backgroundImage: 'url("/nyc-skyline.png")',
          backgroundPosition: 'bottom',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          filter: 'grayscale(100%) brightness(0.4)'
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#0A1525] via-[#0A1525]/95 to-[#061020]/80" />
      
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.02),transparent_50%)]" />
      
      <ParticlesBackground />

      {/* Pattern SVG - Top Left */}
      <div className="absolute left-0 top-0 z-0 w-1/2 md:w-1/3 lg:w-1/4 opacity-20">
        <Image
          src="/Pattern.svg"
          alt="Pattern"
          width={600}
          height={600}
          className="w-full h-auto object-contain transform -translate-x-1/4"
          priority
        />
      </div>

      {/* Pattern SVG - Bottom Right */}
      <div className="absolute right-0 bottom-0 z-0 w-1/2 md:w-1/3 lg:w-1/4 opacity-20">
        <Image
          src="/Pattern.svg"
          alt="Pattern"
          width={600}
          height={600}
          className="w-full h-auto object-contain transform translate-x-1/4 rotate-180"
          priority
        />
      </div>

      {/* Formula SVG Decoration */}
      <div 
        className="absolute right-0 top-1/4 z-0 w-1/2 opacity-25"
        style={{
          filter: 'invert(1) sepia(0) saturate(0) brightness(1.2)',
          transform: 'rotate(12deg)'
        }}
      >
        <img 
          src="/formula.svg" 
          alt="" 
          className="w-full mix-blend-soft-light"
          onError={(e) => {
            console.error('Error loading formula SVG');
            console.log(e);
          }}
        />
      </div>
      
      {/* Circuit Patterns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Top Left Pattern */}
        <div className="absolute -left-[10%] -top-[10%] w-[80%] h-[80%] text-blue-400/20">
          <CircuitPattern className="w-full h-full" />
        </div>
        
        {/* Upper Right Pattern */}
        <div className="absolute -right-[10%] -top-[10%] w-[80%] h-[80%] text-blue-400/20">
          <CircuitPattern className="w-full h-full" rotate />
        </div>

        {/* Middle Patterns */}
        <div className="absolute right-[20%] top-[40%] w-[40%] h-[40%] text-blue-400/10">
          <CircuitPattern className="w-full h-full" />
        </div>
        <div className="absolute left-[25%] bottom-[20%] w-[35%] h-[35%] text-blue-400/10">
          <CircuitPattern className="w-full h-full" rotate />
        </div>
      </div>

      {/* Spotlight Effect */}
      <div className="absolute left-1/2 top-0 z-0 w-[150%] md:w-full h-[40vh] -translate-x-1/2 overflow-hidden pointer-events-none opacity-60">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
          <defs>
            <radialGradient id="spotlight" cx="50%" cy="0%" r="100%" fx="50%" fy="0%">
              <stop offset="0%" style={{ stopColor: '#4A90E2', stopOpacity: 0.08 }}>
                <animate attributeName="stop-opacity"
                         values="0.08;0.12;0.08"
                         dur="4s"
                         repeatCount="indefinite"/>
              </stop>
              <stop offset="100%" style={{ stopColor: '#4A90E2', stopOpacity: 0 }}/>
            </radialGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Main Cone */}
          <path d="M 35,0 L 65,0 L 80,100 L 20,100 Z" 
                fill="url(#spotlight)"
                filter="url(#glow)"
                opacity="0.8">
            <animate attributeName="d"
                     values="M 35,0 L 65,0 L 80,100 L 20,100 Z;
                             M 35,0 L 65,0 L 85,100 L 15,100 Z;
                             M 35,0 L 65,0 L 80,100 L 20,100 Z"
                     dur="5s"
                     repeatCount="indefinite"/>
          </path>
          
          {/* Additional Light Beams */}
          <path d="M 45,0 L 55,0 L 60,100 L 40,100 Z"
                fill="url(#spotlight)"
                opacity="0.5"
                filter="url(#glow)">
            <animate attributeName="d"
                     values="M 45,0 L 55,0 L 60,100 L 40,100 Z;
                             M 45,0 L 55,0 L 65,100 L 35,100 Z;
                             M 45,0 L 55,0 L 60,100 L 40,100 Z"
                     dur="4s"
                     repeatCount="indefinite"/>
          </path>
        </svg>
      </div>

      {/* BIM-like Graphics with Effects - Bottom Left */}
      <div className="absolute left-0 bottom-0 z-0 w-1/2 md:w-2/5 lg:w-1/3 h-1/2 md:h-2/3 opacity-40 transform -translate-x-1/4 translate-y-1/4"
           style={{
             maskImage: 'radial-gradient(circle at 30% 70%, black 20%, transparent 70%)',
             WebkitMaskImage: 'radial-gradient(circle at 30% 70%, black 20%, transparent 70%)'
           }}>
        <svg viewBox="0 0 400 400" className="w-full h-full scale-150">
          <defs>
            {/* Primary Gradient */}
            <linearGradient id="techGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#4A90E2', stopOpacity: 0.4 }}>
                <animate attributeName="stop-opacity"
                         values="0.4;0.6;0.4"
                         dur="3s"
                         repeatCount="indefinite"/>
              </stop>
              <stop offset="100%" style={{ stopColor: '#50E3C2', stopOpacity: 0.2 }}>
                <animate attributeName="stop-opacity"
                         values="0.2;0.4;0.2"
                         dur="3s"
                         repeatCount="indefinite"/>
              </stop>
            </linearGradient>

            {/* Secondary Gradient */}
            <linearGradient id="techGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#FF6B6B', stopOpacity: 0.3 }}>
                <animate attributeName="stop-opacity"
                         values="0.3;0.5;0.3"
                         dur="4s"
                         repeatCount="indefinite"/>
              </stop>
              <stop offset="100%" style={{ stopColor: '#FFE66D', stopOpacity: 0.1 }}>
                <animate attributeName="stop-opacity"
                         values="0.1;0.3;0.1"
                         dur="4s"
                         repeatCount="indefinite"/>
              </stop>
            </linearGradient>

            {/* Floating Animation */}
            <animate id="floatAnim"
                    attributeName="transform"
                    values="translate(0,0); translate(0,-10px); translate(0,0)"
                    dur="5s"
                    repeatCount="indefinite"/>
          </defs>

          {/* Background with subtle grid */}
          <g opacity="0.3">
            <pattern id="smallGrid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10"
                    fill="none"
                    stroke="url(#techGradient2)"
                    strokeWidth="0.5"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#smallGrid)" opacity="0.1"/>
          </g>

          {/* Floating Elements Group */}
          <g transform="scale(1.2)">
            {/* Central Design Element */}
            <g transform="translate(200, 200)">
              {/* Rotating Circles */}
              <circle r="60"
                      fill="none"
                      stroke="url(#techGradient)"
                      strokeWidth="1"
                      opacity="0.6">
                <animateTransform attributeName="transform"
                                type="rotate"
                                from="0"
                                to="360"
                                dur="20s"
                                repeatCount="indefinite"/>
              </circle>
              
              <circle r="40"
                      fill="none"
                      stroke="url(#techGradient2)"
                      strokeWidth="1"
                      opacity="0.8">
                <animateTransform attributeName="transform"
                                type="rotate"
                                from="360"
                                to="0"
                                dur="15s"
                                repeatCount="indefinite"/>
              </circle>

              {/* Pulsing Inner Circle */}
              <circle r="20"
                      fill="url(#techGradient2)"
                      opacity="0.3">
                <animate attributeName="r"
                         values="20;25;20"
                         dur="3s"
                         repeatCount="indefinite"/>
                <animate attributeName="opacity"
                         values="0.3;0.5;0.3"
                         dur="3s"
                         repeatCount="indefinite"/>
              </circle>
            </g>

            {/* Floating Geometric Elements */}
            <g>
              {/* Small Decorative Elements */}
              <path d="M 100 150 L 120 150 L 110 130 Z"
                    fill="url(#techGradient)"
                    opacity="0.4">
                <animateTransform attributeName="transform"
                                type="translate"
                                values="0,0; 0,-10; 0,0"
                                dur="4s"
                                repeatCount="indefinite"/>
              </path>
              
              <path d="M 280 250 L 300 250 L 290 230 Z"
                    fill="url(#techGradient2)"
                    opacity="0.4">
                <animateTransform attributeName="transform"
                                type="translate"
                                values="0,0; 0,-8; 0,0"
                                dur="3.5s"
                                repeatCount="indefinite"/>
              </path>

              {/* Dots */}
              <circle cx="150" cy="280" r="3"
                      fill="url(#techGradient)"
                      opacity="0.6">
                <animate attributeName="opacity"
                         values="0.6;0.8;0.6"
                         dur="2s"
                         repeatCount="indefinite"/>
              </circle>
              
              <circle cx="250" cy="180" r="3"
                      fill="url(#techGradient2)"
                      opacity="0.6">
                <animate attributeName="opacity"
                         values="0.6;0.8;0.6"
                         dur="2.5s"
                         repeatCount="indefinite"/>
              </circle>
            </g>
          </g>
        </svg>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container relative z-10 flex h-full items-center"
      >
        <div className="mx-auto max-w-2xl lg:max-w-4xl">
          <div className="text-center text-3xl font-bold tracking-tight text-white sm:text-6xl">
            <div className="mb-2 font-glory text-white">Pioneering the Future of</div>
            <div className="words-wrapper">
              {words.map((word, index) => (
                <div
                  key={word}
                  className={`word-slide text-gold-400 ${
                    index === currentIndex ? "visible" : ""
                  }`}
                  style={{
                    transform: `translate(-50%, ${(index - currentIndex) * 100}%)`,
                    left: '50%',
                    background: 'linear-gradient(to bottom, #FFD700, #B8860B)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '0 0 10px rgba(255, 215, 0, 0.3)'
                  }}
                >
                  {word.split(' ').map((part, i) => (
                    <span key={i}>
                      {part}
                      {i < word.split(' ').length - 1 && <br className="sm:hidden" />}
                      {i < word.split(' ').length - 1 && <span className="hidden sm:inline"> </span>}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mx-auto mt-6 max-w-xl text-center text-lg leading-8 sm:text-xl font-light tracking-wide"
          >
            <span className="text-white font-medium">
              BlueBuck Research
            </span>{" "}
            <span className="text-gray-300">
              leverages{" "}
              <span className="text-white font-medium">advanced algorithms</span>{" "}
              and{" "}
              <span className="text-white font-medium">cutting-edge technology</span>{" "}
              to create wealth through{" "}
              <span className="text-white font-medium">deep market expertise</span>.
            </span>
          </motion.p>
        </div>
      </motion.div>

      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(10,21,37,0.95),rgba(6,16,32,0.95))]" />
      <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-black/95 shadow-xl shadow-black/20 ring-1 ring-navy-50/5 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
           onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}>
        <div className="relative w-6 h-10">
          {/* Mouse Border with Gradient */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-cyan-500/30 to-purple-500/30 p-[1px]">
            <div className="absolute inset-0 rounded-full bg-black/20 backdrop-blur-sm border border-white/20" />
            {/* Scrolling Wheel Animation */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1 h-2 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full animate-bounce-small">
              <div className="absolute inset-0 animate-fade-pulse" />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .animate-bounce-small {
          animation: bounce-small 1s ease-in-out infinite;
        }
        .animate-fade-pulse {
          animation: fade-pulse 1s ease-in-out infinite;
        }
        @keyframes bounce-small {
          0%, 100% {
            transform: translateX(-50%) translateY(0px);
          }
          50% {
            transform: translateX(-50%) translateY(6px);
          }
        }
        @keyframes fade-pulse {
          0%, 100% {
            opacity: 0.6;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>

      <style jsx global>{`
        @font-face {
          font-family: 'Glory';
          src: url('/fonts/Glory-Bold.woff2') format('woff2');
          font-weight: bold;
          font-style: normal;
        }

        .font-glory {
          font-family: 'Glory', sans-serif;
          font-weight: bold;
        }

        .words-wrapper {
          position: relative;
          height: 3.6em;
          overflow: hidden;
          @media (min-width: 640px) {
            height: 1.2em;
          }
        }

        .word-slide {
          position: absolute;
          width: 100%;
          height: 100%;
          opacity: 0;
          transition: transform 0.4s ease, opacity 0.4s ease;
          text-shadow: 0 0 8px rgba(255, 215, 0, 0.3);
        }

        .word-slide.visible {
          opacity: 1;
        }
      `}</style>
    </section>
  );
}