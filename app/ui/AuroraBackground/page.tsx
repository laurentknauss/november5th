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
        "relative min-h-screen w-full overflow-hidden",
        className
      )}
      {...props}
    >
      {/* USA flag-inspired aurora background with more red */}
      <div
        className="fixed inset-0 z-[-1]"
        style={{
          background: "radial-gradient(circle at center, rgba(178, 34, 52, 0.7) 0%, rgba(178, 34, 52, 0.6) 20%, rgba(0, 40, 104, 0.4) 50%, rgba(255, 255, 255, 0.3) 80%, transparent 100%), linear-gradient(180deg, rgba(178, 34, 52, 0.4) 0%, rgba(178, 34, 52, 0.5) 30%, rgba(0, 40, 104, 0.3) 70%, rgba(255, 255, 255, 0.2) 100%)",
          maskImage: "radial-gradient(ellipse at center, transparent 20%, black 100%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, transparent 20%, black 100%)"
        }}
      ></div>
      
      {/* Stars overlay */}
      {showRadialGradient && (
        <div
          className="fixed inset-0 z-[-1]"
          style={{
            background: "radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.3) 0%, transparent 1%), radial-gradient(circle at 80% 30%, rgba(255, 255, 255, 0.3) 0%, transparent 1%), radial-gradient(circle at 40% 60%, rgba(255, 255, 255, 0.3) 0%, transparent 1%), radial-gradient(circle at 70% 50%, rgba(255, 255, 255, 0.3) 0%, transparent 1%), radial-gradient(circle at 30% 80%, rgba(255, 255, 255, 0.3) 0%, transparent 1%)",
            backgroundSize: "100% 100%"
          }}
        ></div>
      )}
      
      {/* Animated aurora with more red dominance */}
      <div 
        className="fixed inset-0 z-[-1] animate-aurora"
        style={{
          background: "radial-gradient(circle at center, rgba(178, 34, 52, 0.7) 0%, rgba(178, 34, 52, 0.6) 30%, rgba(0, 40, 104, 0.5) 60%, rgba(255, 255, 255, 0.3) 85%, transparent 100%)",
          backgroundSize: "200% 200%"
        }}
      ></div>
      
      {/* Content */}
      <div className="relative z-10 min-h-screen w-full">
        {children}
      </div>
    </div>
  );
}