import React from 'react';
import { motion } from 'framer-motion';

export const CircuitPattern = ({ className = '', rotate = false }: { className?: string; rotate?: boolean }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={rotate ? { transform: 'rotate(180deg)' } : undefined}
    >
      <g>
        {/* Main Circuit Grid */}
        <motion.path
          d="M 50,50 H 350 M 50,150 H 350 M 50,250 H 350 M 50,350 H 350
             M 50,50 V 350 M 150,50 V 350 M 250,50 V 350 M 350,50 V 350"
          stroke="currentColor"
          strokeWidth="1"
          strokeOpacity="0.2"
        />

        {/* Diagonal Connections */}
        <motion.path
          d="M 50,50 L 150,150 M 150,150 L 250,50
             M 150,250 L 250,150 M 250,150 L 350,250
             M 50,250 L 150,350 M 250,350 L 350,250"
          stroke="currentColor"
          strokeWidth="1.5"
          initial={{ pathLength: 0, opacity: 0.1 }}
          animate={{
            pathLength: 1,
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 3,
            ease: "linear",
            repeat: Infinity,
          }}
        />

        {/* Circuit Nodes */}
        {[
          [150, 150], [250, 150], [150, 250], [250, 250],
          [50, 150], [350, 150], [150, 50], [150, 350]
        ].map(([cx, cy], i) => (
          <motion.circle
            key={i}
            cx={cx}
            cy={cy}
            r="3"
            fill="currentColor"
            initial={{ opacity: 0.1 }}
            animate={{
              opacity: [0.1, 0.4, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              delay: i * 0.2,
              repeat: Infinity,
            }}
          />
        ))}

        {/* Animated Circuit Paths */}
        <motion.path
          d="M 50,150 H 150 V 250 H 250 V 150 H 350"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{
            pathLength: [0, 1],
            opacity: [0.4, 0.1],
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />

        {/* Secondary Animated Path */}
        <motion.path
          d="M 150,50 V 150 H 250 V 350"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{
            pathLength: [0, 1],
            opacity: [0.4, 0.1],
          }}
          transition={{
            duration: 2,
            delay: 1,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />

        {/* Glowing Effect */}
        <motion.path
          d="M 50,150 H 150 V 250 H 250 V 150 H 350
             M 150,50 V 150 H 250 V 350"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{
            pathLength: [0, 1],
            opacity: [0.2, 0],
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity,
          }}
          className="blur-[2px]"
        />
      </g>
    </svg>
  );
};
