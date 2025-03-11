'use client';

import React, { useState, useId } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/app/lib/utils';

export function Cover({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [hovered, setHovered] = useState(false);
  const id = useId();

  return (
    <span
      className={cn('relative group/cover inline-block px-1', className)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Main text */}
      <span className="relative z-10">{children}</span>

      {/* Animated background */}
      <AnimatePresence>
        {hovered && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 -mx-1 bg-blue-500/10 rounded-md z-0"
          />
        )}
      </AnimatePresence>

      {/* Particles effect */}
      <span className="absolute inset-0 flex justify-center items-center pointer-events-none">
        {[...Array(6)].map((_, index) => (
          <motion.span
            key={`${id}-${index}`}
            className="absolute h-0.5 w-0.5 rounded-full bg-blue-400 opacity-0"
            initial={{ opacity: 0, x: 0, y: 0 }}
            animate={
              hovered
                ? {
                    opacity: [0, 1, 0],
                    y: [0, -10 * (index % 3)],
                    x: [0, (index - 3) * 5],
                  }
                : {}
            }
            transition={{
              duration: 0.8,
              ease: "easeOut",
              repeat: hovered ? Infinity : 0,
              repeatType: "loop",
              delay: index * 0.1,
            }}
          />
        ))}
      </span>

      {/* Speed beams */}
      <span className="absolute inset-0 flex justify-center">
        {[...Array(3)].map((_, index) => (
          <motion.span
            key={`${id}-beam-${index}`}
            className={`absolute bottom-0 h-0 w-[1px] bg-blue-400`}
            initial={{ height: 0, opacity: 0 }}
            animate={
              hovered
                ? {
                    height: [0, 10 + index * 5, 0],
                    opacity: [0, 0.7, 0],
                    bottom: ["100%", "100%", "100%"],
                  }
                : {}
            }
            transition={{
              duration: 0.5,
              ease: "easeOut",
              repeat: hovered ? Infinity : 0,
              repeatType: "loop",
              repeatDelay: 0.2,
              delay: index * 0.1,
            }}
            style={{
              left: `${48 + (index - 1) * 10}%`,
            }}
          />
        ))}
      </span>

      {/* Subtle pulse animation always present */}
      <motion.span
        className="absolute inset-0 bg-blue-500/0 rounded-md z-0"
        animate={{
          boxShadow: hovered 
            ? ["0 0 0px 0px rgba(59, 130, 246, 0)", "0 0 8px 2px rgba(59, 130, 246, 0.3)", "0 0 0px 0px rgba(59, 130, 246, 0)"]
            : ["0 0 0px 0px rgba(59, 130, 246, 0)", "0 0 4px 0px rgba(59, 130, 246, 0.1)", "0 0 0px 0px rgba(59, 130, 246, 0)"]
        }}
        transition={{
          duration: hovered ? 1.5 : 3,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "loop"
        }}
      />
    </span>
  );
}
