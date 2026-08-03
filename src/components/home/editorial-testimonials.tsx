'use client';

import React from 'react';
import { Star, Quote } from 'lucide-react';
import { MOCK_TESTIMONIALS } from '@/lib/mock-data';

export const EditorialTestimonials = () => {
  return (
    <section className="py-32 bg-[#FFFFFF] text-[#121212] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C1121F] bg-[#C1121F]/10 px-4 py-1.5 rounded-full">
            Client Praise
          </span>
          <h2 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-[#121212]">
            Trusted by <span className="text-[#C1121F]">Dignitaries & Leaders</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {MOCK_TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-[#FAFAF8] p-8 rounded-[36px] border border-black/5 shadow-editorial flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[#D4A017]">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-black/10" />
                </div>
                <p className="text-[#121212] text-base leading-relaxed italic font-display font-medium">
                  "{t.content}"
                </p>
              </div>

              <div className="pt-4 border-t border-black/5 flex items-center gap-4">
                <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover border border-[#C1121F]" />
                <div>
                  <h4 className="font-display font-bold text-[#121212] text-sm">{t.name}</h4>
                  <p className="text-xs text-[#C1121F] font-semibold">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
