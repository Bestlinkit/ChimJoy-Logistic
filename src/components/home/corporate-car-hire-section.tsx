'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Users, Shield, ArrowRight, Car } from 'lucide-react';
import { MOCK_VEHICLES } from '@/lib/mock-data';
import { LuxuryButton } from '@/components/ui/luxury-button';

export const CorporateCarHireSection = () => {
  const featuredVehicles = MOCK_VEHICLES.slice(0, 3);

  return (
    <section className="py-10 bg-white text-[#0E1726]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 45 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4"
        >
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-black uppercase tracking-widest text-[#003366] bg-[#003366]/10 px-4 py-1.5 rounded-full border border-[#003366]/15">
              CAR HIRE SHOWROOM
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0E1726]">
              Need a Car? <span className="text-[#003366] italic">Explore Our Fleet.</span>
            </h2>
            <p className="text-[#475569] text-sm font-medium">
              Whether you need a vehicle for a few hours, a full day or several days, we have comfortable, clean cars ready for your journey.
            </p>
          </div>

          <Link href="/book/hire">
            <LuxuryButton
              variant="lemon"
              size="md"
              icon={<ArrowRight className="w-4 h-4" />}
              className="hover:shadow-[0_0_25px_rgba(155,200,0,0.6)]"
            >
              View Available Cars
            </LuxuryButton>
          </Link>
        </motion.div>

        {/* 3 Vehicle Cards Grid with Glowing Lemon Flare Hover */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredVehicles.map((vehicle, idx) => (
            <motion.div
              key={vehicle.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4, scale: 1.01 }}
              className="bg-[#FAFAFA] rounded-3xl overflow-hidden border border-[#0B192C]/15 hover:border-[#9BC800] hover:shadow-[0_0_25px_rgba(155,200,0,0.4)] transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 w-full overflow-hidden bg-slate-200">
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#0B192C]/90 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-[10px] font-black uppercase tracking-wider text-[#9BC800]">
                    {vehicle.categoryName}
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <h3 className="font-display font-black text-lg text-[#0E1726] group-hover:text-[#003366] transition-colors">
                    {vehicle.name}
                  </h3>

                  <div className="flex items-center gap-4 text-xs text-[#475569] font-bold">
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-[#003366]" /> {vehicle.passengers} Seats
                    </span>
                    <span className="flex items-center gap-1">
                      <Shield className="w-3.5 h-3.5 text-[#003366]" /> Chchauffeur Included
                    </span>
                  </div>

                  <p className="text-xs text-[#475569] line-clamp-2">{vehicle.description}</p>
                </div>
              </div>

              <div className="p-5 pt-0 flex items-center justify-between border-t border-slate-200 mt-2">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block">Rate Per Day</span>
                  <span className="font-display font-black text-lg text-[#0B192C]">
                    ₦{vehicle.pricePerDay.toLocaleString()}
                  </span>
                </div>

                <Link href="/book/hire">
                  <LuxuryButton variant="blue" size="sm" icon={<Car className="w-3.5 h-3.5" />}>
                    Hire This Car
                  </LuxuryButton>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
