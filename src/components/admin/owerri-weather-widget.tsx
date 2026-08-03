'use client';

import React from 'react';
import { Sun, Cloud, Wind, Eye, Plane } from 'lucide-react';
import { GlassCard } from '@/components/ui/glass-card';

export const OwerriWeatherWidget = () => {
  return (
    <GlassCard variant="dark" className="p-5 border border-white/10 space-y-4">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <Sun className="w-5 h-5 text-[#F5D061] animate-spin" style={{ animationDuration: '20s' }} />
          <div>
            <h4 className="font-display font-bold text-white text-sm">Owerri Hub Weather</h4>
            <span className="text-[10px] text-slate-400">Sam Mbakwe Airport (QOW) Conditions</span>
          </div>
        </div>
        <span className="text-xl font-extrabold text-[#F5D061]">29°C</span>
      </div>

      <div className="grid grid-cols-3 gap-2 text-center text-xs">
        <div className="bg-white/5 p-2 rounded-xl border border-white/10">
          <span className="text-slate-400 text-[10px] block">Visibility</span>
          <span className="font-bold text-[#06D6A0]">10 km (Clear)</span>
        </div>
        <div className="bg-white/5 p-2 rounded-xl border border-white/10">
          <span className="text-slate-400 text-[10px] block">Wind Speed</span>
          <span className="font-bold text-white">12 km/h</span>
        </div>
        <div className="bg-white/5 p-2 rounded-xl border border-white/10">
          <span className="text-slate-400 text-[10px] block">Flight Status</span>
          <span className="font-bold text-[#06D6A0]">On Time</span>
        </div>
      </div>
    </GlassCard>
  );
};
