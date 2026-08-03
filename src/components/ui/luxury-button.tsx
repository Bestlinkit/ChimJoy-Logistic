'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

export interface LuxuryButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'lemon' | 'blue' | 'navy' | 'gold' | 'outline' | 'ghost' | 'emerald' | 'royal' | 'dark' | 'crimson' | 'orange';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  children: React.ReactNode;
  className?: string;
}

export const LuxuryButton: React.FC<LuxuryButtonProps> = ({
  variant = 'lemon',
  size = 'md',
  icon,
  iconPosition = 'right',
  children,
  className = '',
  ...props
}) => {
  const baseStyles =
    'relative inline-flex items-center justify-center font-display font-extrabold tracking-wide rounded-full transition-all duration-300 overflow-hidden cursor-pointer select-none active:scale-[0.98] border';

  const sizeStyles = {
    sm: 'px-4 py-2 text-xs gap-1.5',
    md: 'px-6 py-3 text-xs sm:text-sm gap-2',
    lg: 'px-7 py-3.5 text-sm sm:text-base gap-2.5',
    xl: 'px-8 py-4 text-base sm:text-lg gap-3 shadow-lemon',
  };

  const variantStyles = {
    lemon: 'bg-[#9BC800] hover:bg-[#8CB800] text-[#0B192C] border-[#9BC800] shadow-lemon hover:shadow-xl font-black',
    gold: 'bg-[#9BC800] hover:bg-[#8CB800] text-[#0B192C] border-[#9BC800] shadow-lemon hover:shadow-xl font-black',
    orange: 'bg-[#9BC800] hover:bg-[#8CB800] text-[#0B192C] border-[#9BC800] shadow-lemon hover:shadow-xl font-black',
    blue: 'bg-[#003366] hover:bg-[#0B192C] text-white border-[#003366] shadow-navy',
    navy: 'bg-[#0B192C] hover:bg-[#003366] text-white border-white/20 shadow-md',
    emerald: 'bg-[#9BC800] hover:bg-[#8CB800] text-[#0B192C] border-[#9BC800]',
    royal: 'bg-[#003366] hover:bg-[#0B192C] text-white border-[#003366]',
    dark: 'bg-[#0B192C] hover:bg-[#003366] text-white border-white/20',
    crimson: 'bg-[#9BC800] hover:bg-[#8CB800] text-[#0B192C] border-[#9BC800]',
    outline: 'bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border-white/30',
    ghost: 'bg-transparent hover:bg-[#0B192C]/10 text-[#0B192C] border-transparent',
  };

  return (
    <motion.button
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.97 }}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant] || variantStyles.lemon} ${className}`}
      {...props}
    >
      {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
      <span className="relative z-10">{children}</span>
      {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}

      {/* Sheen animation */}
      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/35 to-transparent -translate-x-full hover:animate-shimmer pointer-events-none" />
    </motion.button>
  );
};
