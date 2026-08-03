'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { UserCheck, Sparkles, Clock, Headset } from 'lucide-react';

export const CorporateValuePillars = () => {
  const pillars = [
    {
      title: 'Professional Drivers',
      desc: 'Every driver is trained, courteous and committed to your safety.',
      icon: <UserCheck className="w-6 h-6 text-[#00509D]" />,
    },
    {
      title: 'Clean Vehicles',
      desc: 'Our vehicles are cleaned and inspected before every trip.',
      icon: <Sparkles className="w-6 h-6 text-[#00509D]" />,
    },
    {
      title: 'Reliable Service',
      desc: 'We arrive on time and keep you informed throughout your journey.',
      icon: <Clock className="w-6 h-6 text-[#00509D]" />,
    },
    {
      title: 'Friendly Support',
      desc: 'Need help? Our team is available to assist you before and after your booking.',
      icon: <Headset className="w-6 h-6 text-[#00509D]" />,
    },
  ];

  return (
    <section className="py-16 bg-white text-[#0F2B5B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-3 max-w-2xl mx-auto"
        >
          <span className="text-xs font-black uppercase tracking-widest text-[#00509D] bg-[#00509D]/10 px-4 py-1.5 rounded-full">
            WHY CHOOSE US
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0F2B5B]">
            Why People Choose ChimJoy.
          </h2>
        </motion.div>

        {/* 4 Pillar Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-[#F4F6F9] p-7 rounded-3xl border border-[#0F2B5B]/10 space-y-4 text-center hover:bg-white hover:shadow-corporate hover:border-[#00509D] hover:-translate-y-1.5 transition-all duration-300"
            >
              <div className="w-13 h-13 rounded-2xl bg-white text-[#00509D] shadow-sm flex items-center justify-center mx-auto border border-[#0F2B5B]/10">
                {p.icon}
              </div>
              <h3 className="font-display text-lg font-extrabold text-[#0F2B5B]">{p.title}</h3>
              <p className="text-[#64748B] text-xs leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
