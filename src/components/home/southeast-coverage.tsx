'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, Plane, Navigation, ArrowRight } from 'lucide-react';
import { GlassCard } from '@/components/ui/glass-card';
import { LuxuryBadge } from '@/components/ui/luxury-badge';
import { LuxuryButton } from '@/components/ui/luxury-button';

export const SoutheastCoverage = () => {
  const routes = [
    { from: 'Sam Mbakwe Airport (QOW)', to: 'Owerri City Center', time: '25-35 Mins', popular: true },
    { from: 'Owerri Hub', to: 'Port Harcourt (Rivers State)', time: '1 hr 15 Mins', popular: true },
    { from: 'Owerri Hub', to: 'Enugu Airport / City', time: '1 hr 45 Mins', popular: false },
    { from: 'Owerri Hub', to: 'Aba Commercial Hub', time: '50 Mins', popular: true },
    { from: 'Owerri Hub', to: 'Onitsha Commercial Hub', time: '1 hr 20 Mins', popular: false },
    { from: 'Owerri Hub', to: 'Uyo (Akwa Ibom)', time: '2 hrs 10 Mins', popular: false },
  ];

  return (
    <section className="py-24 bg-[#FAFCFF] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column Text & Routes List */}
          <div className="lg:col-span-6 space-y-6">
            <LuxuryBadge variant="royal">Regional Hub Coverage</LuxuryBadge>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-[#071325] tracking-tight">
              Owerri Headquarters <br />
              <span className="gradient-royal">& Intercity VIP Routes</span>
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Operating seamlessly across Imo State with direct express connections to Rivers State (Port Harcourt), Abia State (Aba), Enugu, and Anambra (Onitsha).
            </p>

            {/* Popular Express Routes Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {routes.map((route, idx) => (
                <div
                  key={idx}
                  className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between hover:border-[#00509D] transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#071325]">
                      <MapPin className="w-3.5 h-3.5 text-[#00509D]" />
                      <span>{route.from}</span>
                    </div>
                    <div className="text-xs text-slate-500 pl-5">➔ {route.to}</div>
                  </div>
                  <span className="text-[11px] font-semibold text-[#06D6A0] bg-[#06D6A0]/10 px-2.5 py-1 rounded-full">
                    {route.time}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Link href="/book">
                <LuxuryButton variant="gold" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
                  Book Intercity Route
                </LuxuryButton>
              </Link>
            </div>
          </div>

          {/* Right Column Visual Route Card */}
          <div className="lg:col-span-6">
            <GlassCard variant="gold" className="p-8 sm:p-10 text-white space-y-8 relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-white/20 pb-6">
                <div>
                  <span className="text-xs text-[#F5D061] font-bold uppercase tracking-widest block">Primary Hub</span>
                  <h3 className="font-display text-3xl font-extrabold">Sam Mbakwe International</h3>
                  <p className="text-xs text-slate-300">Cargo & Passenger Airport (QOW) - Owerri</p>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-[#F5D061]">
                  <Plane className="w-8 h-8" />
                </div>
              </div>

              <div className="space-y-4 text-sm text-slate-200">
                <div className="flex items-start gap-3">
                  <Navigation className="w-5 h-5 text-[#06D6A0] shrink-0 mt-0.5" />
                  <p>Guaranteed airport reception with driver waiting holding your custom greeting sign.</p>
                </div>
                <div className="flex items-start gap-3">
                  <Navigation className="w-5 h-5 text-[#F5D061] shrink-0 mt-0.5" />
                  <p>Luggage assistance and direct transfer to hotels in New Owerri or regional cities.</p>
                </div>
              </div>

              <div className="bg-slate-950/60 p-4 rounded-2xl border border-white/15 text-center text-xs text-[#F5D061] font-semibold">
                ✈️ Flat airport transfer rates start from ₦25,000
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
};
