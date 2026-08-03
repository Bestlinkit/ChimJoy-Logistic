import React from 'react';
import { cn } from '@/lib/utils';

export interface LuxuryBadgeProps {
  variant?: 'gold' | 'emerald' | 'royal' | 'dark' | 'outline';
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export const LuxuryBadge: React.FC<LuxuryBadgeProps> = ({
  variant = 'gold',
  children,
  icon,
  className,
}) => {
  const variantStyles = {
    gold: 'bg-[#D4AF37]/15 text-[#AA820A] border border-[#D4AF37]/40',
    emerald: 'bg-[#06D6A0]/15 text-[#05A87C] border border-[#06D6A0]/40',
    royal: 'bg-[#00509D]/15 text-[#00509D] border border-[#00509D]/30',
    dark: 'bg-[#0F2545] text-slate-200 border border-slate-700',
    outline: 'bg-transparent text-slate-700 border border-slate-300',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full backdrop-blur-md',
        variantStyles[variant],
        className
      )}
    >
      {icon && <span>{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
