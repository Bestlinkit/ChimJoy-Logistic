'use client';

import React from 'react';
import { Star, Quote } from 'lucide-react';
import { MOCK_TESTIMONIALS } from '@/lib/mock-data';
import { GlassCard } from '@/components/ui/glass-card';
import { LuxuryBadge } from '@/components/ui/luxury-badge';

export const ClientTestimonials = () => {
  return (
    <section className="py-24 bg-[#071325] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <LuxuryBadge variant="gold">Client Reviews & Praise</LuxuryBadge>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight">
            Trusted by Dignitaries, <span className="gradient-gold">Executives & Families</span>
          </h2>
          <p className="text-slate-300 text-base">
            Read what corporate leaders and travelers say about our VIP airport transfers and chauffeur services in Imo State.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MOCK_TESTIMONIALS.map((t) => (
            <GlassCard key={t.id} variant="dark" className="p-8 space-y-6 flex flex-col justify-between border border-white/15">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[#F5D061]">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-white/20" />
                </div>
                <p className="text-slate-300 text-sm leading-relaxed italic">"{t.content}"</p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover border border-[#D4AF37]" />
                <div>
                  <h4 className="font-display font-bold text-white text-base">{t.name}</h4>
                  <p className="text-xs text-[#F5D061]">{t.role} {t.company ? `• ${t.company}` : ''}</p>
                  <span className="text-[10px] text-slate-400 block mt-0.5">{t.serviceUsed}</span>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};
