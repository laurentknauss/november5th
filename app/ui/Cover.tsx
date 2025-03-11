'use client';

import React, { useState } from 'react';
import { cn } from '@/app/lib/utils';
import { motion } from 'motion/react';

interface CoverProps {
  children: React.ReactNode;
  className?: string;
}

export function Cover({ children, className }: CoverProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <span
      className={cn('relative inline-block group/cover', className)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Static content */}
      <span className="relative z-10">
        {children}
      </span>

      {/* Animated underline */}
      <motion.span
        initial={{ width: '0%' }}
        animate={{ width: hovered ? '100%' : '0%' }}
        transition={{ duration: 0.3 }}
        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-400 to-red-400 z-0"
      />

      {/* Beam effect on hover */}
      <motion.span 
        initial={{ opacity: 0 }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 bg-gradient-to-t from-transparent via-blue-400/20 to-transparent blur-sm z-0"
      />
      
      {/* Sparkle effect */}
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.span
            key={i}
            className="h-1 w-1 rounded-full bg-white opacity-0"
            initial={{ opacity: 0, scale: 0, x: (i - 2) * 10 }}
            animate={hovered ? { 
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              y: [0, -10, -20],
            } : { opacity: 0 }}
            transition={{ 
              duration: 1, 
              delay: i * 0.1,
              repeat: hovered ? Infinity : 0,
              repeatDelay: 0.5 
            }}
          />
        ))}
      </div>
    </span>
  );
}
