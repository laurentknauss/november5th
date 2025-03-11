'use client';

import React from 'react';
import { cn } from '@/app/lib/utils';

interface CoverProps {
  children: React.ReactNode;
  className?: string;
}

export function Cover({ children, className }: CoverProps) {
  return (
    <span className={cn('', className)}>
      {children}
    </span>
  );
}
