'use client';

import React from 'react';
import { Check, X, ShieldCheck, Award } from 'lucide-react';
import { LuxuryBadge } from '@/components/ui/luxury-badge';

export const WhyChimJoy = () => {
  const comparison = [
    { feature: 'Vetted Executive Chauffeurs', chimjoy: true, standard: false },
    { feature: 'Sam Mbakwe Flight Tracking Concierge', chimjoy: true, standard: false },
    { feature: 'Armed Police Security Escort Option', chimjoy: true, standard: false },
    { feature: 'High-End Vehicles (Prado, Lexus, Benz)', chimjoy: true, standard: false },
    { feature: 'Fixed Transparent Rates & Written Slips', chimjoy: true, standard: false },
    { feature: '24/7 Dedicated Concierge Support', chimjoy: true, standard: false },
    { feature: 'Full Comprehensive Insurance Coverage', chimjoy: true, standard: false },
  ];

  return (
    <section className="py-24 bg-[#071325] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <LuxuryBadge variant="gold">Unmatched Standard</LuxuryBadge>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight">
            Why Discerning Clients Choose <span className="gradient-gold">ChimJoy</span>
          </h2>
          <p className="text-slate-300 text-base">
            See how ChimJoy Car Hire compares against unverified street taxis and standard ride dispatchers in Nigeria.
          </p>
        </div>

        <div className="max-w-4xl mx-auto glass-dark rounded-3xl p-6 sm:p-10 border border-white/15 shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/15 pb-4">
                  <th className="py-4 px-4 text-sm font-bold text-slate-300 uppercase tracking-wider">Service Feature</th>
                  <th className="py-4 px-4 text-center text-lg font-extrabold text-[#F5D061] bg-[#D4AF37]/10 rounded-t-2xl">
                    CHIMJOY CAR HIRE
                  </th>
                  <th className="py-4 px-4 text-center text-sm font-semibold text-slate-400">
                    Standard Local Taxi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 text-sm">
                {comparison.map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/5 transition-colors">
                    <td className="py-4 px-4 font-semibold text-slate-200">{row.feature}</td>
                    <td className="py-4 px-4 text-center bg-[#D4AF37]/5">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#06D6A0]/20 text-[#06D6A0] mx-auto">
                        <Check className="w-5 h-5" />
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-500/10 text-red-400 mx-auto">
                        <X className="w-5 h-5" />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
