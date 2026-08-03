'use client';

import React from 'react';
import { Sparkles, ShieldCheck, Users, Briefcase, Plane } from 'lucide-react';
import { Vehicle } from '@/types';

interface SmartBookingAssistantProps {
  passengers: number;
  luggage: number;
  serviceType: string;
  flightNumber?: string;
  recommendedVehicle: Vehicle;
}

export const SmartBookingAssistant: React.FC<SmartBookingAssistantProps> = ({
  passengers,
  luggage,
  serviceType,
  flightNumber,
  recommendedVehicle,
}) => {
  return (
    <div className="bg-gradient-to-r from-[#0F2545] to-[#134074] p-4 rounded-2xl border border-[#D4AF37]/40 text-white flex items-start gap-3 shadow-gold">
      <div className="p-2.5 rounded-xl bg-slate-950 text-[#F5D061] shrink-0 border border-[#D4AF37]/30">
        <Sparkles className="w-5 h-5 animate-spin" style={{ animationDuration: '8s' }} />
      </div>
      <div className="space-y-1 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold text-[#F5D061] uppercase tracking-wider text-[10px]">Smart Mobility AI Assistant</span>
          <span className="bg-[#06D6A0]/20 text-[#06D6A0] text-[9px] font-bold px-2 py-0.5 rounded-full">Auto Suggestion</span>
        </div>
        <p className="text-slate-200 leading-relaxed">
          Based on <strong className="text-white">{passengers} passengers</strong> and <strong className="text-white">{luggage} luggage bags</strong>, we recommend the <strong className="text-[#F5D061]">{recommendedVehicle.name}</strong> for optimal comfort and trunk capacity.
        </p>
        {flightNumber && (
          <p className="text-[#06D6A0] font-semibold text-[11px] flex items-center gap-1 pt-1">
            <Plane className="w-3.5 h-3.5" /> Airport Flight Tracking enabled for flight {flightNumber.toUpperCase()}.
          </p>
        )}
      </div>
    </div>
  );
};
