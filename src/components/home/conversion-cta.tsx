'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, PhoneCall, Sparkles } from 'lucide-react';
import { LuxuryButton } from '@/components/ui/luxury-button';
import { LuxuryBadge } from '@/components/ui/luxury-badge';

export const ConversionCta = () => {
  return (
    <section className="py-24 bg-[#040B17] text-white relative overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#00509D]/30 via-[#D4AF37]/10 to-[#06D6A0]/20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8 max-w-4xl">
        <LuxuryBadge variant="gold" icon={<Sparkles className="w-3.5 h-3.5" />}>
          Ready to Experience True Luxury Mobility?
        </LuxuryBadge>

        <h2 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight">
          Reserve Your Chauffeur & Vehicle in <span className="gradient-gold">Under 2 Minutes</span>
        </h2>

        <p className="text-slate-300 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto">
          No credit card required. Receive instant WhatsApp confirmation and personalized booking concierge assistance.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link href="/book" className="w-full sm:w-auto">
            <LuxuryButton variant="gold" size="xl" className="w-full sm:w-auto justify-center" icon={<ArrowRight className="w-5 h-5" />}>
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
