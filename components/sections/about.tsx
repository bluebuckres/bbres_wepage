"use client";

import { motion, useInView, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import Image from "next/image";

const stats = [
  { 
    id: 1, 
    name: "Daily Trades", 
    value: "470",
    animatedValue: true,
    prefix: "4",
    duration: 2
  },
  { id: 2, name: "Markets", value: "50+" },
  { id: 3, name: "Success Rate", value: "87%" },
];

const numberAnimation = {
  hidden: { y: 0 },
  visible: {
    y: "-70%",
    transition: {
      duration: 2,
      ease: "easeOut",
    },
  },
};

export function AboutSection() {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <section className="py-24 sm:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-black via-[#0A1525] to-[#0F2645]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.02),transparent_80%)]"></div>
      <div className="container relative z-10">
        <div ref={ref} className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="mx-auto max-w-2xl lg:mx-0"
            >
              <motion.h2 
                initial={{ x: -50 }}
                whileInView={{ x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl font-['Cormorant_Garamond'] font-medium tracking-tight text-white sm:text-2xl"
              >
                We Make Machines That Make Money
              </motion.h2>
              <motion.p 
                initial={{ x: -50 }}
                whileInView={{ x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-6 text-lg leading-8 text-gray-300"
              >
                Pioneering the future of quantitative trading and investing through advanced technology and systematic strategies.
              </motion.p>
            </motion.div>

            <div className="mx-auto mt-16 max-w-2xl lg:mx-0 lg:mt-20 lg:max-w-none">
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <figure className="border-l border-gold-400 pl-8">
                  <blockquote className="text-xl font-semibold leading-8 tracking-tight text-white">
                    <p>"Our mission is to revolutionize financial markets through innovative technology and data-driven strategies."</p>
                  </blockquote>
                  <figcaption className="mt-8 flex gap-x-4">
                    <div className="text-sm leading-6">
                      <div className="font-semibold text-white">Dr. John Smith</div>
                      <div className="text-gray-400">Founder & CEO</div>
                    </div>
                  </figcaption>
                </figure>
              </motion.div>
            </div>

            <div className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-3 lg:mt-24">
              {stats.map((stat) => (
                <motion.div
                  key={stat.id}
                  initial="hidden"
                  animate={controls}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  transition={{ duration: 0.5, delay: stat.id * 0.2 }}
                  className="flex flex-col-reverse gap-y-3"
                >
                  <dt className="text-base leading-7 text-gray-300">{stat.name}</dt>
                  <dd className="text-3xl font-semibold tracking-tight text-white">
                    {stat.animatedValue ? (
                      <div className="flex items-center">
                        <span>{stat.prefix}</span>
                        <div className="relative h-[1.875rem] overflow-hidden ml-0.5">
                          <motion.div
                            initial="hidden"
                            animate={controls}
                            variants={numberAnimation}
                            className="absolute flex flex-col items-center"
                          >
                            {Array.from({ length: 11 }, (_, i) => (
                              <span key={i} className="h-[1.875rem] flex items-center">
                                {60 + i}
                              </span>
                            ))}
                          </motion.div>
                        </div>
                      </div>
                    ) : (
                      stat.value
                    )}
                  </dd>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
