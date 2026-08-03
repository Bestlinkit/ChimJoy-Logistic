'use client';

import React from 'react';
import { ShieldCheck, Lock, Clock, Award, Check } from 'lucide-react';

export const TrustStory = () => {
  return (
    <section className="py-32 bg-[#F4F4F5] text-[#121212] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left Column: Cinematic Chauffeur Photography */}
          <div className="lg:col-span-6">
            <div className="relative h-[550px] w-full rounded-[40px] overflow-hidden shadow-editorial bg-[#111111]">
              <img
                src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1400&q=80"
                alt="Executive Chauffeur Service"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 text-white space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4A017] block">
                  100% Vetted Drivers
                </span>
                <h3 className="font-display text-2xl font-extrabold">Executive Chauffeur Protocol</h3>
                <p className="text-xs text-slate-300">Trained in defensive driving & executive VIP etiquette.</p>
              </div>
            </div>
          </div>

          {/* Right Column: 56px Section Heading & Storytelling */}
          <div className="lg:col-span-6 space-y-8">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C1121F] bg-[#C1121F]/10 px-4 py-1.5 rounded-full">
              The ChimJoy Standard
            </span>

            <h2 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-[#121212] leading-[1.08]">
              Built on Dignity, <br />
              <span className="text-[#C1121F]">Uncompromised Safety</span> & Precision.
            </h2>

            <p className="text-[#6B7280] text-lg sm:text-[22px] font-normal leading-relaxed">
              We are not an anonymous ride dispatch app. ChimJoy Logistics Services Ltd provides fully vetted professional chauffeurs, flight tracking concierge, and armed police escorts tailored for dignitaries and business leaders.
            </p>

            <div className="space-y-4 pt-4 text-base font-bold text-[#121212]">
              {[
                '100% Vetted & Background-Checked Drivers',
                'Sam Mbakwe Airport Flight Delay Guarantee',
                'Mobile Police (MOPOL) Armed Escort Options',
                'Subsidiary of ChimJoy Logistics Services Ltd',
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#C1121F] text-white flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
