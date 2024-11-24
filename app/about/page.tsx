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

            <motion.h1 
              className="text-5xl font-['Cormorant_Garamond'] font-medium tracking-tight text-white sm:text-6xl relative overflow-hidden py-8"
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
              <div className="mt-10">
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
                className="relative bg-gradient-to-br from-[#0F2645]/80 via-[#0A1525]/90 to-black/95 backdrop-blur-lg border border-white/10 rounded-lg p-16"
              >
                {/* Premium animated text */}
                <div className="relative overflow-hidden">
                  <motion.div
                    className="relative z-10"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                      visible: {
                        transition: {
                          staggerChildren: 0.05
                        }
                      }
                    }}
                  >
                    <div className="text-center">
                      {["The", "Future", "Belongs", "to", "Those", "Who", "Code", "It"].map((word, i) => (
                        <motion.span
                          key={i}
                          className="inline-block"
                          variants={{
                            hidden: { 
                              y: 100,
                              opacity: 0,
                              rotateX: -80
                            },
                            visible: {
                              y: 0,
                              opacity: 1,
                              rotateX: 0,
                              transition: {
                                type: "spring",
                                damping: 12,
                                stiffness: 100
                              }
                            }
                          }}
                        >
                          <span className="inline-block text-5xl md:text-6xl lg:text-7xl font-cinzel font-normal tracking-wider leading-tight mx-[0.2em] premium-text">
                            {word}
                          </span>
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>

                  {/* Shimmer effect */}
                  <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                    <div className="shimmer-line" />
                  </div>
                </div>

                {/* Accent lines with enhanced animation */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#0ea4e9] to-transparent animate-gradient-x" />
                  <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#0ea4e9] to-transparent animate-gradient-x-reverse" />
                  <div className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b from-transparent via-[#0ea4e9] to-transparent animate-gradient-y" />
                  <div className="absolute top-0 right-0 w-[1px] h-full bg-gradient-to-b from-transparent via-[#0ea4e9] to-transparent animate-gradient-y" />
                </div>

                {/* Premium background effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#0F2645]/50 via-[#0A1525]/60 to-black/70 opacity-80 backdrop-blur-xl" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(14,164,233,0.1),transparent_70%)]" />
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
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-8 rounded-lg bg-gradient-to-br from-[#0F2645]/80 via-[#0A1525]/90 to-black/95 backdrop-blur-lg border border-white/10 relative overflow-hidden"
              >
                {/* Accent lines */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#0ea4e9] to-transparent" />
                  <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#0ea4e9] to-transparent" />
                  <div className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b from-transparent via-[#0ea4e9] to-transparent" />
                  <div className="absolute top-0 right-0 w-[1px] h-full bg-gradient-to-b from-transparent via-[#0ea4e9] to-transparent" />
                </div>

                <dt className="text-lg font-semibold leading-7 text-white">
                  {value.title}
                </dt>
                <dd className="mt-4 text-base leading-7 text-gray-300">
                  {value.description}
                </dd>
              </motion.div>
            ))}
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