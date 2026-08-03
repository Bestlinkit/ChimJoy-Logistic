'use client';

import React from 'react';

interface BrandLogoProps {
  className?: string;
  variant?: 'light' | 'dark';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ className = '', variant = 'dark' }) => {
  const isDark = variant === 'dark';

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* SVG Emblem modeled directly from attached letterhead (input_file_4.png) */}
      <div className="relative shrink-0">
        <svg
          width="48"
          height="40"
          viewBox="0 0 120 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-sm"
        >
          {/* Outer Arc (Deep Blue) */}
          <path
            d="M 60 10 C 25 10 10 35 10 60 C 10 80 28 92 55 90 C 40 85 28 72 28 55 C 28 35 45 22 65 22 C 85 22 92 35 92 45 C 92 40 82 25 60 10 Z"
            fill="#00509D"
          />
          {/* Speed Dashes (Lemon Green) */}
          <ellipse cx="48" cy="48" rx="14" ry="4" fill="#C6D92C" />
          <ellipse cx="45" cy="58" rx="18" ry="4" fill="#C6D92C" />
          {/* Vehicle Body Outline (Deep Blue) */}
          <path
            d="M 45 42 L 68 42 C 72 42 75 44 78 48 L 88 60 L 105 60 C 108 60 110 62 110 65 L 110 72 C 110 75 108 77 105 77 L 40 77 C 36 77 34 74 34 70 C 34 66 37 63 42 63 L 88 63 L 78 52 L 45 52 Z"
            fill="#00509D"
          />
        </svg>
      </div>

      {/* Brand Name & Tagline */}
      <div className="flex flex-col">
        <span
          className={`font-display text-xl sm:text-2xl font-black tracking-tight leading-none ${
            isDark ? 'text-[#0F2B5B]' : 'text-white'
          }`}
        >
          CHIMJOY
        </span>
        <span className="text-[9px] font-extrabold tracking-wider uppercase text-[#00509D] leading-tight block mt-0.5">
          LOGISTICS SERVICES LTD
        </span>
        <span className="text-[7.5px] font-bold text-[#C6D92C] tracking-tight block -mt-0.5">
          Committed To Positive & Responsive Logistics
        </span>
      </div>
    </div>
  );
};
