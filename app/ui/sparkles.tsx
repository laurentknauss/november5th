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
  const [isClient, setIsClient] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    let particles: {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
    }[] = [];
    
    const createParticle = () => {
      particles = [];
      const seededRandom = (seed: number) => {
        const x = Math.sin(seed) * 10000;
        return x - Math.floor(x);
      };
      
      for (let i = 0; i < count; i++) {
        const seed = i * 1000;
        particles.push({
          x: seededRandom(seed) * canvas.width,
          y: seededRandom(seed + 1) * canvas.height,
          size: seededRandom(seed + 2) * (maxSize - minSize) + minSize,
          speedX: (seededRandom(seed + 3) - 0.5) * speed,
          speedY: (seededRandom(seed + 4) - 0.5) * speed,
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
    
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        createParticle();
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      particles = [];
      window.removeEventListener('resize', handleResize);
    };
  }, [isClient, particleColor, count, minSize, maxSize, speed]);

  // Render nothing on server, canvas on client
  if (!isClient) return null;

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
