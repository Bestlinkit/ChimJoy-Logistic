'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, Plane, Navigation, ArrowRight } from 'lucide-react';
import { LuxuryButton } from '@/components/ui/luxury-button';

export const RegionalHubCoverage = () => {
  const routes = [
    { from: 'Sam Mbakwe Airport (QOW)', to: 'Owerri City Center', time: '25 Mins' },
    { from: 'Owerri Hub', to: 'Port Harcourt (Rivers State)', time: '1 hr 15 Mins' },
    { from: 'Owerri Hub', to: 'Enugu City & Airport', time: '1 hr 45 Mins' },
    { from: 'Owerri Hub', to: 'Aba Commercial Hub', time: '50 Mins' },
    { from: 'Owerri Hub', to: 'Onitsha Commercial Hub', time: '1 hr 20 Mins' },
    { from: 'Owerri Hub', to: 'Uyo (Akwa Ibom)', time: '2 hrs 10 Mins' },
  ];

  return (
    <section className="py-32 bg-[#FAF8F5] text-[#121212] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left Column Text & Routes List */}
          <div className="lg:col-span-6 space-y-8">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C1121F] bg-[#C1121F]/10 px-4 py-1.5 rounded-full">
              Regional Mobility Network
            </span>
            <h2 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-[#121212] leading-[1.08]">
              Owerri Hub & <br />
              <span className="text-[#C1121F]">Intercity Convoys</span>
            </h2>
            <p className="text-[#6B7280] text-lg sm:text-[22px] font-normal leading-relaxed">
              Operating headquarters in Owerri, Imo State, with express intercity connections across Port Harcourt, Aba, Enugu, Onitsha, and Uyo.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {routes.map((route, idx) => (
                <div
                  key={idx}
                  className="bg-white p-4 rounded-2xl border border-black/5 shadow-sm flex items-center justify-between hover:border-[#C1121F] transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#121212]">
                      <MapPin className="w-3.5 h-3.5 text-[#C1121F]" />
                      <span>{route.from}</span>
                    </div>
                    <div className="text-xs text-[#6B7280] pl-5">➔ {route.to}</div>
                  </div>
                  <span className="text-[11px] font-bold text-[#16A34A] bg-[#16A34A]/10 px-2.5 py-1 rounded-full">
                    {route.time}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Link href="/book">
                <LuxuryButton variant="crimson" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
                  Book Intercity Route
                </LuxuryButton>
              </Link>
            </div>
          </div>

          {/* Right Column Airport Hub Highlight */}
          <div className="lg:col-span-6">
            <div className="bg-[#111111] text-white p-10 rounded-[40px] space-y-8 shadow-editorial relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-white/10 pb-6">
                <div>
                  <span className="text-xs text-[#D4A017] font-bold uppercase tracking-widest block">
                    Primary Operational Gate
                  </span>
                  <h3 className="font-display text-3xl font-extrabold">Sam Mbakwe International</h3>
                  <p className="text-xs text-slate-300">Cargo & Passenger Airport (QOW) - Owerri</p>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-[#D4A017]">
                  <Plane className="w-8 h-8" />
                </div>
              </div>

              <div className="space-y-4 text-sm text-slate-300">
                <div className="flex items-start gap-3">
                  <Navigation className="w-5 h-5 text-[#16A34A] shrink-0 mt-0.5" />
                  <p>Guaranteed airport reception with chauffeur holding your custom greeting sign.</p>
                </div>
                <div className="flex items-start gap-3">
                  <Navigation className="w-5 h-5 text-[#D4A017] shrink-0 mt-0.5" />
                  <p>Luggage handling and direct VIP transfer to Protea Hotel, Concorde Hotel, or regional hubs.</p>
                </div>
              </div>

              <div className="bg-white/10 p-4 rounded-2xl border border-white/15 text-center text-xs text-[#D4A017] font-bold">
                ✈️ Flat airport transfer rates from ₦25,000
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
