"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="relative isolate overflow-hidden">
      {/* NYC Skyline Background */}
      <div 
        className="absolute inset-0 -z-20 opacity-10"
        style={{
          backgroundImage: 'url("/nyc-skyline.png")',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          filter: 'grayscale(100%) brightness(0.4)'
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#0A1525] via-[#0A1525]/95 to-transparent" />
      
      {/* Original futuristic background with reduced opacity */}
      <div className="absolute inset-0 -z-10 opacity-50">
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

      <div className="container mx-auto py-12 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="p-8 rounded-lg bg-gradient-to-br from-[#0F2645]/80 via-[#0A1525]/90 to-black/95 backdrop-blur-lg border border-white/10 relative overflow-hidden mb-12"
          >
            {/* Accent lines */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#0ea4e9] to-transparent" />
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#0ea4e9] to-transparent" />
              <div className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b from-transparent via-[#0ea4e9] to-transparent" />
              <div className="absolute top-0 right-0 w-[1px] h-full bg-gradient-to-b from-transparent via-[#0ea4e9] to-transparent" />
            </div>

            <style jsx global>{`
              @font-face {
                font-family: 'Cormorant';
                src: url('/fonts/Cormorant-Regular.woff2') format('woff2');
                font-weight: normal;
                font-style: normal;
                font-display: swap;
              }
            `}</style>

            <motion.h1 
              className="text-5xl font-['Cormorant'] font-medium tracking-tight text-white sm:text-6xl relative overflow-hidden py-8"
            >
              <div className="flex flex-wrap justify-center">
                {["We", "Make", "Machines", "That", "Make", "Money"].map((word, wordIndex) => (
                  <div key={wordIndex} className="mx-2">
                    {word.split('').map((letter, letterIndex) => (
                      <motion.span
                        key={letterIndex}
                        className="inline-block relative"
                        initial={{ 
                          opacity: 0,
                          x: (letterIndex % 2 === 0 ? -100 : 100),
                          y: (letterIndex % 3 === 0 ? -50 : 50)
                        }}
                        animate={{ 
                          opacity: 1,
                          x: 0,
                          y: 0
                        }}
                        transition={{
                          duration: 0.5,
                          delay: (wordIndex * 0.1) + (letterIndex * 0.05),
                          type: "spring",
                          stiffness: 100
                        }}
                        whileHover={{
                          scale: 1.2,
                          color: "#FFD700",
                          transition: { duration: 0.2 }
                        }}
                      >
                        {letter}
                      </motion.span>
                    ))}
                  </div>
                ))}
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shine" />
            </motion.h1>
            <style jsx global>{`
              @keyframes shine {
                from {
                  transform: translateX(-100%);
                }
                to {
                  transform: translateX(100%);
                }
              }
              .animate-shine {
                animation: shine 3s infinite;
                background-size: 200% 100%;
              }
            `}</style>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Pioneering the future of quantitative trading and investing through advanced
              technology and systematic approches.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-8 rounded-lg bg-gradient-to-br from-[#0F2645]/80 via-[#0A1525]/90 to-black/95 backdrop-blur-lg border border-white/10 relative overflow-hidden"
            >
              {/* Accent lines */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#0ea4e9] to-transparent" />
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#0ea4e9] to-transparent" />
                <div className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b from-transparent via-[#0ea4e9] to-transparent" />
                <div className="absolute top-0 right-0 w-[1px] h-full bg-gradient-to-b from-transparent via-[#0ea4e9] to-transparent" />
              </div>

              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                The BlueBuck Way
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                BlueBuck is a bootstrapped quant trading and investing firm. We are like-minded people from different backgrounds who have created this firm. We stand at the intersection of finance and technology.
                <br /><br />
                Founded by quantitative enthusiasts and tech-savvy professionals, we've built a capital market powerhouse that combines <span className="text-gold-400 font-semibold">human insight with computational might</span>.
                <br /><br />
                We bring true skin in the game - investing our own capital and expertise into every strategy we develop.
                <br /><br />
                We're a hyper-ambitious team on a mission to <span className="text-gold-400 font-semibold">make machines that make money</span> whether the markets go up, down, sideways, or in circles.
                <br /><br />
                We are constantly fighting with the world's top minds, so we approach the market like warriors on a battlefield.
              </p>
              <div className="mt-10 relative">
                <Button 
                  asChild 
                  size="lg"
                  className="bg-[#0ea4e9] hover:bg-[#0284c7] text-white font-semibold"
                >
                  <Link href="/contact">
                    Get in Touch
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[120%] w-full max-w-lg hidden md:block">
                  <img 
                    src="https://cdn.prod.website-files.com/635002cac2651040225422cf/635002cac26510e44c54232e_Union.svg"
                    alt=""
                    className="w-full h-auto opacity-50"
                  />
                </div>
                <div className="absolute bottom-0 left-[85%] -translate-x-1/2 translate-y-[40%] w-full max-w-[180px] md:hidden">
                  <img 
                    src="https://cdn.prod.website-files.com/635002cac2651040225422cf/635002cac26510e44c54232e_Union.svg"
                    alt=""
                    className="w-full h-auto opacity-30"
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-8"
            >
              {/* Image Container */}
              <div className="relative h-[600px] rounded-lg overflow-hidden">
                <Image
                  src="/nyc-career.png"
                  alt="NYC Skyline"
                  width={1920}
                  height={1080}
                  className="object-cover w-full h-full"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0A1525]/30 via-transparent to-[#0A1525]/90" />
                
                {/* Accent border with gradient */}
                <div className="absolute inset-0 border border-white/10 rounded-lg">
                  <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#0ea4e9] to-transparent" />
                    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#0ea4e9] to-transparent" />
                    <div className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b from-transparent via-[#0ea4e9] to-transparent" />
                    <div className="absolute top-0 right-0 w-[1px] h-full bg-gradient-to-b from-transparent via-[#0ea4e9] to-transparent" />
                  </div>
                </div>
              </div>

              {/* Quote Container */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 1.2,
                  type: "spring",
                  bounce: 0.2
                }}
                className="relative"
              >
                {/* Sophisticated Quote Frame */}
                <div className="relative w-full max-w-6xl mx-auto py-16 px-6 sm:px-12">
                  <div className="relative p-8 sm:p-12">
                    {/* Outer Corner Brackets */}
                    <div className="absolute top-0 left-0 w-24 h-24">
                      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-gold-400/50 to-transparent"></div>
                      <div className="absolute top-0 left-0 h-full w-[2px] bg-gradient-to-b from-gold-400/50 to-transparent"></div>
                    </div>
                    <div className="absolute top-0 right-0 w-24 h-24">
                      <div className="absolute top-0 right-0 w-full h-[2px] bg-gradient-to-l from-gold-400/50 to-transparent"></div>
                      <div className="absolute top-0 right-0 h-full w-[2px] bg-gradient-to-b from-gold-400/50 to-transparent"></div>
                    </div>
                    <div className="absolute bottom-0 left-0 w-24 h-24">
                      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-gold-400/50 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 h-full w-[2px] bg-gradient-to-t from-gold-400/50 to-transparent"></div>
                    </div>
                    <div className="absolute bottom-0 right-0 w-24 h-24">
                      <div className="absolute bottom-0 right-0 w-full h-[2px] bg-gradient-to-l from-gold-400/50 to-transparent"></div>
                      <div className="absolute bottom-0 right-0 h-full w-[2px] bg-gradient-to-t from-gold-400/50 to-transparent"></div>
                    </div>

                    {/* Inner Corner Brackets - Slightly Smaller and Offset */}
                    <div className="absolute top-4 left-4 w-20 h-20">
                      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-gold-400/30 to-transparent"></div>
                      <div className="absolute top-0 left-0 h-full w-[1px] bg-gradient-to-b from-gold-400/30 to-transparent"></div>
                    </div>
                    <div className="absolute top-4 right-4 w-20 h-20">
                      <div className="absolute top-0 right-0 w-full h-[1px] bg-gradient-to-l from-gold-400/30 to-transparent"></div>
                      <div className="absolute top-0 right-0 h-full w-[1px] bg-gradient-to-b from-gold-400/30 to-transparent"></div>
                    </div>
                    <div className="absolute bottom-4 left-4 w-20 h-20">
                      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-gold-400/30 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 h-full w-[1px] bg-gradient-to-t from-gold-400/30 to-transparent"></div>
                    </div>
                    <div className="absolute bottom-4 right-4 w-20 h-20">
                      <div className="absolute bottom-0 right-0 w-full h-[1px] bg-gradient-to-l from-gold-400/30 to-transparent"></div>
                      <div className="absolute bottom-0 right-0 h-full w-[1px] bg-gradient-to-t from-gold-400/30 to-transparent"></div>
                    </div>

                    {/* Quote Text */}
                    <div className="relative flex flex-col items-center justify-center gap-2 py-8">
                      {/* Text Groups */}
                      <div className="flex items-center gap-3">
                        <motion.span
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5 }}
                          className="text-5xl sm:text-6xl md:text-7xl font-cormorant text-gray-300 font-light tracking-wide [text-shadow:_0_0_30px_rgba(255,255,255,0.15)]"
                        >
                          The Future
                        </motion.span>
                      </div>

                      <div className="flex items-center gap-3">
                        <motion.span
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.1 }}
                          className="text-5xl sm:text-6xl md:text-7xl font-cormorant text-gray-300 font-light tracking-wide [text-shadow:_0_0_30px_rgba(255,255,255,0.15)]"
                        >
                          Belongs
                        </motion.span>
                      </div>

                      <div className="flex items-center gap-3">
                        <motion.span
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                          className="text-5xl sm:text-6xl md:text-7xl font-cormorant text-gray-300 font-light tracking-wide [text-shadow:_0_0_30px_rgba(255,255,255,0.15)]"
                        >
                          to Those
                        </motion.span>
                      </div>

                      <div className="flex items-center gap-3">
                        <motion.span
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.3 }}
                          className="text-5xl sm:text-6xl md:text-7xl font-cormorant text-gray-300 font-light tracking-wide [text-shadow:_0_0_30px_rgba(255,255,255,0.15)]"
                        >
                          Who
                        </motion.span>
                      </div>

                      <div className="flex items-center gap-3">
                        <motion.span
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.4 }}
                          className="text-5xl sm:text-6xl md:text-7xl font-cormorant text-gray-300 font-light tracking-wide [text-shadow:_0_0_30px_rgba(255,255,255,0.15)]"
                        >
                          Code It
                        </motion.span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <style jsx global>{`
                @keyframes shimmer {
                  0% {
                    transform: translateX(-100%) skewX(-45deg);
                  }
                  100% {
                    transform: translateX(200%) skewX(-45deg);
                  }
                }

                .shimmer-line {
                  position: absolute;
                  width: 100%;
                  height: 100%;
                  background: linear-gradient(
                    90deg,
                    transparent,
                    rgba(255, 255, 255, 0.1),
                    transparent
                  );
                  animation: shimmer 3s infinite;
                  transform: skewX(-45deg);
                }

                @keyframes gradient-x {
                  0%, 100% { transform: translateX(-100%); }
                  50% { transform: translateX(100%); }
                }

                @keyframes gradient-y {
                  0%, 100% { transform: translateY(-100%); }
                  50% { transform: translateY(100%); }
                }

                .animate-gradient-x {
                  animation: gradient-x 8s infinite;
                }

                .animate-gradient-x-reverse {
                  animation: gradient-x 8s infinite reverse;
                }

                .animate-gradient-y {
                  animation: gradient-y 8s infinite;
                }

                .premium-text {
                  background: linear-gradient(to right, #ffffff, #e2e2e2);
                  -webkit-background-clip: text;
                  background-clip: text;
                  color: transparent;
                  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
                  transition: all 0.3s ease;
                }

                .premium-text:hover {
                  background: linear-gradient(to right, #ffffff, #f0f0f0);
                  transform: translateY(-2px);
                  text-shadow: 4px 4px 8px rgba(0, 0, 0, 0.3);
                }
              `}</style>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 mt-16">
            {values.map((value, i) => (
              <motion.div
                key={i}
                className="relative group overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: i * 0.1,
                  duration: 0.5,
                  ease: [0.21, 0.47, 0.32, 0.98]
                }}
              >
                <div className="p-6 rounded-xl bg-gradient-to-b from-blue-950/50 to-blue-900/30 backdrop-blur-sm relative">
                  {/* Laser beam borders with rounded corners */}
                  <div className="absolute inset-0 rounded-xl">
                    <div className="absolute top-0 left-[2px] right-[2px] h-[1px] animate-border-flow bg-gradient-to-r from-transparent via-blue-400/40 to-transparent" />
                    <div className="absolute bottom-0 left-[2px] right-[2px] h-[1px] animate-border-flow bg-gradient-to-r from-transparent via-blue-400/40 to-transparent" />
                    <div className="absolute top-[2px] bottom-[2px] left-0 w-[1px] animate-border-flow-vertical bg-gradient-to-b from-transparent via-blue-400/40 to-transparent" />
                    <div className="absolute top-[2px] bottom-[2px] right-0 w-[1px] animate-border-flow-vertical bg-gradient-to-b from-transparent via-blue-400/40 to-transparent" />
                    
                    {/* Rounded corner glows */}
                    <div className="absolute top-0 left-0 w-2 h-2 rounded-tl-xl bg-blue-400/20" />
                    <div className="absolute top-0 right-0 w-2 h-2 rounded-tr-xl bg-blue-400/20" />
                    <div className="absolute bottom-0 left-0 w-2 h-2 rounded-bl-xl bg-blue-400/20" />
                    <div className="absolute bottom-0 right-0 w-2 h-2 rounded-br-xl bg-blue-400/20" />
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-2 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                    {value.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 hidden sm:block"
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <svg width="35" height="35" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gold-400">
              <path
                d="M12 5l-1.545 1.545 3.47 3.47H5v2.17h8.925l-3.47 3.47L12 17.2l6.17-6.1L12 5z"
                fill="currentColor"
              />
            </svg>
          </motion.div>

          <div className="absolute inset-0 w-full h-full opacity-20">
            <div className="w-full h-full" style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgb(107 114 128) 1px, transparent 0)`,
              backgroundSize: '30px 30px'
            }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

const values = [
  {
    title: "Innovation",
    description:
      "We continuously push the boundaries of what's possible in quantitative trading through technological advancement and research.",
  },
  {
    title: "Excellence",
    description:
      "We maintain the highest standards in everything we do, from strategy development to risk management and client service.",
  },
  {
    title: "Integrity",
    description:
      "We operate with complete transparency and adhere to the highest ethical standards in all our business practices.",
  },
  {
    title: "Collaboration",
    description:
      "We foster a culture of teamwork and knowledge sharing to drive better outcomes for our clients and partners.",
  },
  {
    title: "Adaptability",
    description:
      "We embrace change and continuously evolve our strategies to stay ahead in dynamic market conditions.",
  },
  {
    title: "Sustainability",
    description:
      "We focus on long-term success through responsible trading practices and sustainable business operations.",
  },
];