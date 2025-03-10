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
      {/* USA flag-inspired aurora background */}
      <div
        className="fixed inset-0 z-[-1]"
        style={{
          background: "radial-gradient(circle at center, rgba(255, 0, 0, 0.5) 0%, rgba(0, 0, 255, 0.5) 40%, rgba(255, 255, 255, 0.5) 80%, transparent 100%), linear-gradient(180deg, rgba(0, 40, 104, 0.2) 0%, rgba(178, 34, 52, 0.3) 50%, rgba(255, 255, 255, 0.2) 100%)",
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
      
      {/* Animated aurora */}
      <div 
        className="fixed inset-0 z-[-1] animate-aurora"
        style={{
          background: "radial-gradient(circle at center, rgba(178, 34, 52, 0.6) 0%, rgba(0, 40, 104, 0.6) 40%, rgba(255, 255, 255, 0.4) 80%, transparent 100%)",
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