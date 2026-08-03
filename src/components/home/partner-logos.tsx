import React from 'react';
import { MOCK_PARTNERS } from '@/lib/mock-data';

export const PartnerLogos = () => {
  return (
    <section className="py-16 bg-[#FAFCFF] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-bold uppercase tracking-widest text-slate-400 mb-8">
          Trusted Transport Partner for Leading Hospitality & Corporate Entities
        </p>

        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14">
          {MOCK_PARTNERS.map((partner) => (
            <div
              key={partner.id}
              className="bg-white px-6 py-3.5 rounded-2xl border border-slate-200 shadow-sm text-slate-700 font-display font-bold text-sm hover:border-[#00509D] hover:text-[#00509D] transition-all"
            >
              {partner.logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
