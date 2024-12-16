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
        {/* Main Connected Circuit Path */}
        <motion.path
          d="M 50,200 
             L 100,200 
             L 100,100 
             L 150,100 
             L 150,300 
             L 200,300 
             L 200,150 
             L 250,150 
             L 250,250 
             L 300,250 
             L 300,200 
             L 350,200"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0, opacity: 0.1 }}
          animate={{
            pathLength: 1,
            opacity: [0.1, 0.4, 0.1],
          }}
          transition={{
            duration: 3,
            ease: "linear",
            repeat: Infinity,
          }}
        />

        {/* Circuit Nodes */}
        {[
          [100, 200], [150, 100], [150, 300], 
          [200, 150], [250, 250], [300, 200]
        ].map(([cx, cy], i) => (
          <motion.circle
            key={i}
            cx={cx}
            cy={cy}
            r="3"
            fill="currentColor"
            initial={{ opacity: 0.1 }}
            animate={{
              opacity: [0.1, 0.5, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              delay: i * 0.2,
              repeat: Infinity,
            }}
          />
        ))}

        {/* Glowing Effect Along Path */}
        <motion.path
          d="M 50,200 
             L 100,200 
             L 100,100 
             L 150,100 
             L 150,300 
             L 200,300 
             L 200,150 
             L 250,150 
             L 250,250 
             L 300,250 
             L 300,200 
             L 350,200"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: [0, 1],
            opacity: [0.3, 0],
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
