'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Plane, Car, Clock, Package, MapPin, Calendar, ArrowRight, ShieldCheck } from 'lucide-react';
import { LuxuryButton } from '@/components/ui/luxury-button';

export const QuickBookingWidget = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'airport' | 'city' | 'rental' | 'logistics'>('airport');
  const [pickup, setPickup] = useState('Sam Mbakwe International Cargo Airport (QOW)');
  const [dropoff, setDropoff] = useState('Protea Hotel Owerri Select');
  const [date, setDate] = useState('2026-08-05');

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/book?type=${activeTab}&pickup=${encodeURIComponent(pickup)}&dropoff=${encodeURIComponent(dropoff)}&date=${date}`);
  };

  const tabs = [
    { id: 'airport', label: 'Airport Transfer', icon: <Plane className="w-4 h-4" /> },
    { id: 'city', label: 'City Ride', icon: <Car className="w-4 h-4" /> },
    { id: 'rental', label: 'Car Rental', icon: <Clock className="w-4 h-4" /> },
    { id: 'logistics', label: 'Logistics', icon: <Package className="w-4 h-4" /> },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto glass-dark rounded-3xl p-4 sm:p-6 shadow-2xl border border-white/15 relative z-20">
      {/* Service Tabs */}
      <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto pb-3 mb-4 border-b border-white/10 no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-300 whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#F5D061] text-slate-950 shadow-gold'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Inputs Form */}
      <form onSubmit={handleQuickSearch} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
        {/* Pickup Location */}
        <div className="md:col-span-4 bg-white/10 border border-white/15 rounded-2xl p-3 hover:border-[#F5D061]/50 transition-colors">
          <label className="text-[10px] font-bold text-[#F5D061] uppercase tracking-wider block mb-1">
            Pickup Location
          </label>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#06D6A0] shrink-0" />
            <input
              type="text"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              placeholder="e.g. Sam Mbakwe Airport QOW"
              className="w-full bg-transparent text-white text-xs sm:text-sm font-medium focus:outline-none placeholder-slate-400"
            />
          </div>
        </div>

        {/* Dropoff Location */}
        <div className="md:col-span-4 bg-white/10 border border-white/15 rounded-2xl p-3 hover:border-[#F5D061]/50 transition-colors">
          <label className="text-[10px] font-bold text-[#F5D061] uppercase tracking-wider block mb-1">
            Destination / Dropoff
          </label>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0" />
            <input
              type="text"
              value={dropoff}
              onChange={(e) => setDropoff(e.target.value)}
              placeholder="e.g. Protea Hotel or PH City"
              className="w-full bg-transparent text-white text-xs sm:text-sm font-medium focus:outline-none placeholder-slate-400"
            />
          </div>
        </div>

        {/* Schedule Date */}
        <div className="md:col-span-2 bg-white/10 border border-white/15 rounded-2xl p-3 hover:border-[#F5D061]/50 transition-colors">
          <label className="text-[10px] font-bold text-[#F5D061] uppercase tracking-wider block mb-1">
            Travel Date
          </label>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-blue-400 shrink-0" />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-transparent text-white text-xs sm:text-sm font-medium focus:outline-none [color-scheme:dark]"
            />
          </div>
        </div>

        {/* CTA Button */}
        <div className="md:col-span-2">
          <LuxuryButton variant="gold" size="lg" className="w-full justify-center h-full py-3.5" icon={<ArrowRight className="w-4 h-4" />}>
            Search Fleet
          </LuxuryButton>
        </div>
      </form>
    </div>
  );
};
