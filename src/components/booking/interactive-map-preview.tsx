'use client';

import React from 'react';
import { MapPin, Navigation, Plane } from 'lucide-react';

interface InteractiveMapPreviewProps {
  pickup: string;
  dropoff: string;
}

export const InteractiveMapPreview: React.FC<InteractiveMapPreviewProps> = ({ pickup, dropoff }) => {
  return (
    <div className="w-full bg-[#040B17] rounded-3xl p-6 border border-white/15 text-white space-y-4 relative overflow-hidden">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2 text-xs font-bold text-[#F5D061] uppercase tracking-wider">
          <Navigation className="w-4 h-4 text-[#06D6A0] animate-pulse" />
          <span>Interactive Route Visualization</span>
        </div>
        <span className="text-[10px] text-slate-400">GPS Live Vector</span>
      </div>

      {/* Vector Map Preview Canvas */}
      <div className="relative h-44 w-full bg-[#071325] rounded-2xl border border-white/10 overflow-hidden p-4 flex flex-col justify-between">
        {/* Animated Waypoint Line SVG */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M 40,30 Q 150,110 320,60"
            fill="none"
            stroke="url(#routeGradient)"
            strokeWidth="3"
            strokeDasharray="6 6"
            className="animate-pulse"
          />
          <defs>
            <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06D6A0" />
              <stop offset="50%" stopColor="#F5D061" />
              <stop offset="100%" stopColor="#00509D" />
            </linearGradient>
          </defs>
        </svg>

        {/* Start Point Pill */}
        <div className="relative z-10 flex items-center gap-2 bg-slate-950/80 border border-[#06D6A0]/50 px-3 py-1.5 rounded-xl w-max backdrop-blur-md">
          <div className="w-2.5 h-2.5 rounded-full bg-[#06D6A0] animate-ping" />
          <div>
            <span className="text-[9px] font-bold text-[#06D6A0] uppercase block">Pickup Point</span>
            <span className="text-xs font-bold text-white max-w-[200px] truncate block">{pickup}</span>
          </div>
        </div>

        {/* End Point Pill */}
        <div className="relative z-10 flex items-center gap-2 bg-slate-950/80 border border-[#D4AF37]/50 px-3 py-1.5 rounded-xl w-max ml-auto backdrop-blur-md">
          <MapPin className="w-4 h-4 text-[#F5D061]" />
          <div>
            <span className="text-[9px] font-bold text-[#F5D061] uppercase block">Destination</span>
            <span className="text-xs font-bold text-white max-w-[200px] truncate block">{dropoff}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-[11px] text-slate-300 pt-1">
        <span>Estimated Transit: <strong className="text-[#06D6A0]">25-45 Mins</strong></span>
        <span>Route Coverage: <strong className="text-white">Imo State / Southeast Express</strong></span>
      </div>
    </div>
  );
};
