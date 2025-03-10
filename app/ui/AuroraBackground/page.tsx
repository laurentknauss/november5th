'use client';

import { cn } from "@/app/lib/utils";
import React, { ReactNode } from "react";

export interface AuroraBackgroundProps {
  children: ReactNode;
  className?: string;
  showRadialGradient?: boolean;
}

export function AuroraBackground({
  children,
  className,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden bg-transparent",
        className
      )}
      {...props}
    >
      {/* Aurora background elements */}
      <div
        className="absolute inset-0 z-[-1]"
        style={{
          background: "radial-gradient(circle at center, rgba(59, 130, 246, 0.8) 0%, rgba(139, 92, 246, 0.6) 25%, rgba(34, 197, 94, 0.4) 50%, rgba(234, 179, 8, 0.2) 75%, transparent 100%), linear-gradient(180deg, rgba(59, 130, 246, 0.2) 0%, rgba(139, 92, 246, 0.3) 50%, rgba(34, 197, 94, 0.2) 100%)",
          maskImage: "radial-gradient(ellipse at center, transparent 20%, black 100%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, transparent 20%, black 100%)"
        }}
      ></div>
      
      {/* Radial gradient overlay */}
      {showRadialGradient && (
        <div
          className="absolute inset-0 z-[-1]"
          style={{
            background: "radial-gradient(circle at center, rgba(59, 130, 246, 0.2) 0%, transparent 80%)"
          }}
        ></div>
      )}
      
      {/* Animated aurora */}
      <div 
        className="absolute inset-0 z-[-1] animate-aurora"
        style={{
          background: "radial-gradient(circle at center, rgba(59, 130, 246, 0.8) 0%, rgba(139, 92, 246, 0.6) 25%, rgba(34, 197, 94, 0.4) 50%, rgba(234, 179, 8, 0.2) 75%, transparent 100%), linear-gradient(180deg, rgba(59, 130, 246, 0.2) 0%, rgba(139, 92, 246, 0.3) 50%, rgba(34, 197, 94, 0.2) 100%)",
          backgroundSize: "200% 200%"
        }}
      ></div>
      
      {/* Content */}
      <div className="relative z-10 h-full w-full">
        {children}
      </div>
    </div>
  );
}