'use client';

import React from 'react';
import Link from 'next/link';
import { Lock, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { LuxuryButton } from '@/components/ui/luxury-button';

export const MatteSecuritySpotlight = () => {
  return (
    <section className="py-32 bg-[#111111] text-white relative overflow-hidden">
      {/* Subtle Gold Ambient Glow */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-[#D4A017]/10 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left Column Text */}
          <div className="lg:col-span-7 space-y-8">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D4A017] bg-[#D4A017]/10 px-4 py-1.5 rounded-full border border-[#D4A017]/20">
              Executive Protection & Security
            </span>

            <h2 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.08]">
              Armed Security Escorts <br />
              <span className="text-[#C1121F]">(MOPOL Officers)</span>
            </h2>

            <p className="text-slate-300 text-lg sm:text-[22px] font-normal leading-relaxed">
              Travelling with high-net-worth individuals, foreign delegates, or valuable cargo? Add uniformed Mobile Police (MOPOL) armed security escorts to any vehicle hire request across Southeast Nigeria.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-bold text-slate-200 pt-2">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <CheckCircle2 className="w-5 h-5 text-[#C1121F]" />
                <span>2 Uniformed Armed Officers</span>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <CheckCircle2 className="w-5 h-5 text-[#D4A017]" />
                <span>Convoy Route Clearance</span>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>Intercity VIP Security Transit</span>
              </div>
            </div>

            <div className="pt-4">
              <Link href="/book?addon=addon-escort">
                <LuxuryButton variant="crimson" size="xl" icon={<ArrowRight className="w-5 h-5" />}>
                  Request Armed Security Escort
                </LuxuryButton>
              </Link>
            </div>
          </div>

          {/* Right Column Photographic Spotlight */}
          <div className="lg:col-span-5">
            <div className="relative h-[480px] w-full rounded-[40px] overflow-hidden border border-white/15 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1520050206274-a1ae44613e6d?auto=format&fit=crop&w=1200&q=80"
                alt="Mercedes-Benz G 63 AMG VIP Escort"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 text-white space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4A017] block">
                  Armored Convoy Option
                </span>
                <h3 className="font-display text-2xl font-extrabold">Mercedes-Benz G 63 AMG</h3>
                <p className="text-xs text-slate-300">High-security SUV preferred by dignitaries & convoys.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
