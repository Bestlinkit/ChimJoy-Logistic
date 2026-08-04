'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Plane, CheckCircle2, ArrowRight } from 'lucide-react';
import { LuxuryButton } from '@/components/ui/luxury-button';

export const CorporateAirportSection = () => {
  const highlights = [
    'Flight status tracking for delayed or early arrivals',
    'Chchauffeur waiting at Sam Mbakwe arrival terminal with greeting board',
    'Luggage assistance & immediate vehicle dispatch',
    'VIP tarmac reception & armed MOPOL escort options',
  ];

  return (
    <section className="py-10 bg-[#0B192C] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 45 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
        >
          {/* Left Column Content */}
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-black uppercase tracking-widest text-[#9BC800] bg-white/10 px-4 py-1.5 rounded-full border border-white/20">
              SAM MBAKWE AIRPORT PICKUP
            </span>

            <h2 className="font-display text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Flying Into <span className="text-[#9BC800]">Owerri?</span>
            </h2>

            <p className="text-slate-200 text-sm sm:text-base font-medium leading-relaxed">
              Book your airport pickup before you travel and avoid the stress of finding transportation after landing at Sam Mbakwe International Cargo Airport (QOW).
            </p>

            <div className="space-y-2.5 pt-1">
              {highlights.map((item, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ x: 6, scale: 1.01 }}
                  className="flex items-start gap-3 bg-white/10 hover:bg-white/15 p-3 rounded-2xl border border-white/15 hover:border-[#9BC800] hover:shadow-[0_0_20px_rgba(155,200,0,0.4)] transition-all duration-300 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#9BC800] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-bold text-white">{item}</span>
                </motion.div>
              ))}
            </div>

            <div className="pt-2">
              <Link href="/services/airport-transfers">
                <LuxuryButton
                  variant="lemon"
                  size="lg"
                  icon={<ArrowRight className="w-4 h-4" />}
                  className="hover:shadow-[0_0_25px_rgba(155,200,0,0.6)]"
                >
                  Book Airport Pickup
                </LuxuryButton>
              </Link>
            </div>
          </div>

          {/* Right Column Photo: Attached Authentic Owerri Rockview Hotel & Roundabout City Photo */}
          <div className="lg:col-span-6">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative h-[420px] w-full rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20 hover:border-[#9BC800] hover:shadow-[0_0_30px_rgba(155,200,0,0.5)] transition-all duration-300 group"
            >
              <img
                src="/images/airport_1.jpg"
                alt="Sam Mbakwe International Cargo Airport QOW Arrival Transfers"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B192C]/90 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 bg-[#0B192C]/90 backdrop-blur-md p-5 rounded-2xl border border-white/20 shadow-xl space-y-1">
                <div className="inline-flex items-center gap-1.5 text-xs font-black text-[#9BC800]">
                  <Plane className="w-4 h-4" />
                  <span>Sam Mbakwe Airport & Owerri City Transfers</span>
                </div>
                <h4 className="font-display text-base font-extrabold text-white">
                  Direct Transfers Across Owerri
                </h4>
                <p className="text-xs text-slate-300 font-medium">
                  Driver holding customized greeting board ready upon exit for your hotel transfer.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
