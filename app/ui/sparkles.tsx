'use client';

import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/app/lib/utils';

export interface SparklesProps {
  id?: string;
  className?: string;
  background?: boolean;
  minSize?: number;
  maxSize?: number;
  speed?: number;
  count?: number;
  particleColor?: string;
}

export const SparklesCore = ({
  id,
  className,
  background = false,
  minSize = 1,
  maxSize = 2,
  speed = 0.5,
  count = 50,
  particleColor = '#FFFFFF',
}: SparklesProps) => {
  const [windowDimensions, setWindowDimensions] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = windowDimensions.width;
    canvas.height = windowDimensions.height;
    
    let particles: {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
    }[] = [];
    
    const createParticle = () => {
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * (maxSize - minSize) + minSize,
          speedX: (Math.random() - 0.5) * speed,
          speedY: (Math.random() - 0.5) * speed,
        });
      }
    };
    
    createParticle();
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        ctx.fillStyle = particleColor;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Update position
        p.x += p.speedX;
        p.y += p.speedY;
        
        // Wrap around edges
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
      }
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      particles = [];
    };
  }, [windowDimensions, particleColor, count, minSize, maxSize, speed]);

  return (
    <canvas
      ref={canvasRef}
      id={id}
      className={cn(
        'absolute inset-0 z-[-1]',
        className,
        background ? 'bg-black' : 'bg-transparent'
      )}
    />
  );
};
