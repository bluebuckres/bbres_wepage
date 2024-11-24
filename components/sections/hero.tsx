"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ParticlesBackground } from "../particles-background";

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
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#0A1525] via-[#0A1525]/95 to-transparent" />
      
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.03),transparent_50%)]" />
      
      <ParticlesBackground />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container relative z-10 flex h-full items-center"
      >
        <div className="mx-auto max-w-2xl lg:max-w-4xl">
          <div className="text-center text-3xl font-bold tracking-tight text-white sm:text-6xl">
            <div className="mb-2 font-glory">Pioneering the Future of</div>
            <div className="words-wrapper">
              {words.map((word, index) => (
                <div
                  key={word}
                  className={`word-slide text-gold-400 ${
                    index === currentIndex ? "visible" : ""
                  }`}
                  style={{
                    transform: `translate(-50%, ${(index - currentIndex) * 100}%)`,
                    left: '50%'
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
          <p className="mt-6 text-center text-lg leading-8 text-gray-300">
            BlueBuck Research leverages advanced algorithms and cutting-edge technology to create wealth through deep market expertise.
          </p>
        </div>
      </motion.div>

      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(10,21,37,0.95),rgba(6,16,32,0.95))]" />
      <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-black/95 shadow-xl shadow-black/20 ring-1 ring-navy-50/5 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />

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