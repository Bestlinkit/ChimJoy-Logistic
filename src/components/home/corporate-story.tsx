'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const CorporateStory = () => {
  return (
    <section className="py-10 bg-[#F4F6F9] text-[#0E1726] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Side Content */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-4"
          >
            <span className="text-xs font-black uppercase tracking-widest text-[#003366] bg-[#003366]/10 px-4 py-1.5 rounded-full border border-[#003366]/15">
              WHO WE ARE
            </span>

            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0E1726] leading-tight">
              Reliable Transportation Backed by Experience.
            </h2>

            <p className="text-[#0E1726] font-extrabold text-base leading-relaxed">
              ChimJoy Logistics Services Ltd is a subsidiary of ChimJoy Limited.
            </p>

            <p className="text-[#475569] text-sm sm:text-base font-medium leading-relaxed">
              We provide reliable airport pickup, executive transportation, car hire and logistics services for individuals, families, businesses and organisations in Owerri, Imo State.
            </p>

            <p className="text-[#475569] text-sm sm:text-base font-medium leading-relaxed">
              Whether you are visiting Owerri, attending an event, travelling for business or simply need dependable transportation, our team is committed to making every journey safe, comfortable and stress-free.
            </p>

            {/* High Contrast Stat Counters */}
            <div className="grid grid-cols-3 gap-6 pt-4 border-t border-[#0E1726]/10">
              <div className="space-y-1">
                <span className="font-display text-3xl font-black text-[#0B192C]">10+</span>
                <span className="text-xs text-[#475569] font-bold block">Years Experience</span>
              </div>
              <div className="space-y-1">
                <span className="font-display text-3xl font-black text-[#0B192C]">1000+</span>
                <span className="text-xs text-[#475569] font-bold block">Happy Customers</span>
              </div>
              <div className="space-y-1">
                <span className="font-display text-3xl font-black text-[#0B192C]">100+</span>
                <span className="text-xs text-[#475569] font-bold block">Corporate Clients</span>
              </div>
            </div>
          </motion.div>

          {/* Right Side Photo: Driver Alone in Vehicle (Lady Removed as requested in screenshot 2) */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6"
          >
            <div className="relative h-[400px] w-full rounded-3xl overflow-hidden shadow-corporate border border-[#0B192C]/15 group">
              <img
                src="/images/images (7).jpg"
                alt="Professional Driver at the wheel in Owerri"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B192C]/85 via-transparent to-transparent" />
              <div className="absolute bottom-6 right-6 left-6 bg-white/95 backdrop-blur-md p-5 rounded-2xl border border-[#0B192C]/15 shadow-xl">
                <h4 className="font-display text-base font-extrabold text-[#0E1726]">
                  Dedicated to Safe & Comfortable Travel in Owerri
                </h4>
                <p className="text-xs text-[#475569] mt-0.5 font-semibold">
                  Professional drivers and clean executive vehicles for business and leisure.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
