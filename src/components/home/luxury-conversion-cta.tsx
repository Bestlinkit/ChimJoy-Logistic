'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, PhoneCall, Sparkles } from 'lucide-react';
import { LuxuryButton } from '@/components/ui/luxury-button';

export const LuxuryConversionCTA = () => {
  return (
    <section className="py-32 bg-gradient-to-br from-[#111111] via-[#1A1A1A] to-[#C1121F] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8 max-w-4xl">
        <span className="text-xs font-bold uppercase tracking-widest text-[#D4A017] bg-white/10 px-4 py-1.5 rounded-full border border-white/15 inline-flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#D4A017]" /> Experience True Executive Mobility
        </span>

        <h2 className="font-display text-4xl sm:text-7xl font-extrabold tracking-tight leading-[1.08]">
          Reserve Your Chauffeur & Vehicle in <span className="text-[#F5C747]">Two Minutes</span>
        </h2>

        <p className="text-slate-300 text-lg sm:text-[22px] leading-relaxed max-w-2xl mx-auto">
          No online card payment required. Receive instant WhatsApp confirmation and personalized concierge assistance.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link href="/book" className="w-full sm:w-auto">
            <LuxuryButton variant="crimson" size="xl" className="w-full sm:w-auto justify-center" icon={<ArrowRight className="w-5 h-5" />}>
              Start Instant Booking Request
            </LuxuryButton>
          </Link>

          <a href="tel:+2348000000000" className="w-full sm:w-auto">
            <LuxuryButton variant="outline" size="xl" className="w-full sm:w-auto justify-center border-white/30 text-white hover:bg-white hover:text-slate-950" icon={<PhoneCall className="w-5 h-5" />}>
              Call Direct Dispatch
            </LuxuryButton>
          </a>
        </div>
      </div>
    </section>
  );
};
