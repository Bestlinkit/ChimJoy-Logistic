'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { MOCK_FAQS } from '@/lib/mock-data';
import { LuxuryBadge } from '@/components/ui/luxury-badge';

export const FaqAccordion = () => {
  const [openId, setOpenId] = useState<string | null>(MOCK_FAQS[0].id);

  return (
    <section className="py-24 bg-[#FAFCFF] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <LuxuryBadge variant="royal" icon={<HelpCircle className="w-3.5 h-3.5" />}>
            Frequently Asked Questions
          </LuxuryBadge>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-[#071325] tracking-tight">
            Everything You Need to Know About <span className="gradient-royal">ChimJoy Car Hire</span>
          </h2>
        </div>

        <div className="space-y-4">
          {MOCK_FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden transition-all duration-300 shadow-sm"
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-display font-bold text-lg text-[#071325] hover:text-[#00509D] transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#00509D]' : 'text-slate-400'}`} />
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
