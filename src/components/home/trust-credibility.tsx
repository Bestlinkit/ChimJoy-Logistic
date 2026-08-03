'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, Clock, Award, MapPin, CheckCircle2 } from 'lucide-react';
import { GlassCard } from '@/components/ui/glass-card';

export const TrustCredibility = () => {
  const pillars = [
    {
      icon: <ShieldCheck className="w-8 h-8 text-[#06D6A0]" />,
      title: 'Vetted Professional Drivers',
      description: 'Every chauffeur undergoes thorough background checks, defensive driving certifications, and executive etiquette training.',
    },
    {
      icon: <Lock className="w-8 h-8 text-[#D4AF37]" />,
      title: 'Armed Security Escorts (MOPOL)',
      description: 'Licensed Mobile Police escort options for dignitaries, international visitors, and executive convoys across Southeast Nigeria.',
    },
    {
      icon: <Clock className="w-8 h-8 text-blue-400" />,
      title: '24/7 Flight Tracking & Punctuality',
      description: 'Real-time tracking of flights arriving at Sam Mbakwe Airport QOW so your chauffeur is always waiting before you step out.',
    },
    {
      icon: <Award className="w-8 h-8 text-[#F5D061]" />,
      title: 'Subsidiary of ChimJoy Logistics',
      description: 'Backed by the enterprise strength, insurance coverage, and operational excellence of ChimJoy Logistics Services Ltd.',
    },
  ];

  return (
    <section className="py-24 bg-[#FAFCFF] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#00509D] bg-[#00509D]/10 px-4 py-1.5 rounded-full">
            Why Trust ChimJoy
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-[#071325] tracking-tight">
            Built on Safety, Dignity & <span className="gradient-royal">Uncompromised Luxury</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            We are not a casual taxi dispatch app. We are a managed executive transport institution tailored for high standards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar, idx) => (
            <GlassCard key={idx} variant="light" className="space-y-4 flex flex-col justify-between border border-slate-200">
              <div className="w-14 h-14 rounded-2xl bg-[#071325] flex items-center justify-center shadow-md">
                {pillar.icon}
              </div>
              <div className="space-y-2">
                <h3 className="font-display text-xl font-bold text-[#071325]">{pillar.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{pillar.description}</p>
              </div>
              <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-[#06D6A0]">
                <CheckCircle2 className="w-4 h-4" /> Standard Protocol
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};
