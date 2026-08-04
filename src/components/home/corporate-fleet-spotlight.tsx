'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShieldCheck, Users, Briefcase, Award, ArrowRight } from 'lucide-react';
import { LuxuryButton } from '@/components/ui/luxury-button';

export const CorporateFleetSpotlight = () => {
  return (
    <section className="py-16 bg-[#0A1E40] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6"
          >
            <span className="text-xs font-black uppercase tracking-widest text-[#C6D92C] bg-white/10 px-4 py-1.5 rounded-full border border-white/15">
              FEATURED VEHICLE SPOTLIGHT
            </span>

            <h2 className="font-display text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Toyota Land Cruiser <span className="text-[#C6D92C]">Prado TX-L.</span>
            </h2>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
              The premier executive 4WD SUV choice for Sam Mbakwe Airport VIP transfers, corporate delegations, wedding convoys, and long-distance intercity travel.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2 text-xs font-bold text-slate-200">
              <div className="flex items-center gap-2 bg-white/5 p-3 rounded-xl border border-white/10">
                <Users className="w-4 h-4 text-[#C6D92C]" />
                <span>7 Leather Seats</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 p-3 rounded-xl border border-white/10">
                <Briefcase className="w-4 h-4 text-[#C6D92C]" />
                <span>5 Luggage Capacity</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 p-3 rounded-xl border border-white/10">
                <ShieldCheck className="w-4 h-4 text-[#C6D92C]" />
                <span>Armed Escort Ready</span>
              </div>
            </div>

            <div className="pt-3">
              <Link href="/book?vehicle=v1">
                <LuxuryButton variant="lemon" size="xl" icon={<ArrowRight className="w-5 h-5" />}>
                  Reserve Land Cruiser Prado
                </LuxuryButton>
              </Link>
            </div>
          </motion.div>

          {/* Right Vehicle Cutout Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <div className="relative h-[380px] w-full rounded-3xl overflow-hidden border border-white/15 shadow-2xl group">
              <img
                src="/images/suv_prado_2.jpg"
                alt="Toyota Land Cruiser Prado TX-L"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1E40]/90 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 text-xs text-white">
                <span className="font-extrabold text-[#C6D92C]">₦85,000 / Day</span>
                <p className="text-[11px] text-slate-300">Chauffeur, fuel option & full climate control included.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
