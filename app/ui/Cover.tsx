'use client';

import React from 'react';
import { cn } from '@/app/lib/utils';

interface CoverProps {
  children: React.ReactNode;
  className?: string;
}

export function Cover({ children, className }: CoverProps) {
  return (
    <div className={cn('flex flex-grow flex-col md:flex-row', className)}>
      {children}
    </div>
  );
}
