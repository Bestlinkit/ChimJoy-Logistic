'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface GlassCardProps extends HTMLMotionProps<'div'> {
  variant?: 'light' | 'dark' | 'gold' | 'emerald';
  hoverEffect?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  variant = 'light',
  hoverEffect = true,
  children,
  className,
  ...props
}) => {
  const variantClasses = {
    light: 'glass-panel text-[#071325]',
    dark: 'glass-dark text-white',
    gold: 'bg-gradient-to-br from-[#0F2545]/90 to-[#134074]/90 border border-[#D4AF37]/30 text-white',
    emerald: 'bg-gradient-to-br from-[#071325]/90 to-[#0F2545]/90 border border-[#06D6A0]/30 text-white',
  };

  return (
    <motion.div
      whileHover={hoverEffect ? { y: -6, transition: { duration: 0.25 } } : undefined}
      className={cn(
        'relative rounded-3xl p-6 sm:p-8 transition-all duration-300',
        variantClasses[variant],
        hoverEffect && 'hover:shadow-luxury-hover hover:border-slate-300/80',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};
