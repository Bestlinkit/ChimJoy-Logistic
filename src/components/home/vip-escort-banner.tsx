'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Lock, CheckCircle2, ArrowRight } from 'lucide-react';
import { LuxuryButton } from '@/components/ui/luxury-button';
import { LuxuryBadge } from '@/components/ui/luxury-badge';

export const VipEscortBanner = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-[#040B17] via-[#0F2545] to-[#040B17] text-white relative overflow-hidden border-y border-amber-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <LuxuryBadge variant="gold" icon={<Lock className="w-3.5 h-3.5" />}>
              Executive Protection & Security
            </LuxuryBadge>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight">
              Armed Police Security Escorts <span className="gradient-gold">(MOPOL Option)</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
              Travelling with high-net-worth individuals, international delegates, or valuable cargo? Add licensed Mobile Police (MOPOL) armed security escort to any vehicle hire request.
            </p>
            <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-200 pt-2">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#06D6A0]" /> 2 Uniformed Armed Officers</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#06D6A0]" /> Convoy Clearance</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#06D6A0]" /> Intercity Security Transit</span>
            </div>
          </div>

          <div className="lg:col-span-4 text-left lg:text-right">
            <Link href="/book?addon=addon-escort">
              <LuxuryButton variant="gold" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
                Request VIP Escort
              </LuxuryButton>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
