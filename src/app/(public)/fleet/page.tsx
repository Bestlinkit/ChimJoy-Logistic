'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Users, Briefcase, Car, ShieldCheck } from 'lucide-react';
import { LuxuryButton } from '@/components/ui/luxury-button';
import { MOCK_VEHICLES } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/utils';
import { subscribeToPublicFleet } from '@/lib/firebase/services/fleet-service';
import { Vehicle } from '@/types';

export default function FleetPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  React.useEffect(() => {
    const unsub = subscribeToPublicFleet((data) => setVehicles(data));
    return () => unsub();
  }, []);

  const filtered = activeCategory === 'all'
    ? vehicles
    : vehicles.filter((v) => v.categoryName === activeCategory || v.categoryId === activeCategory);

  return (
    <main className="min-h-screen bg-white text-[#0E1726]">

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative min-h-[420px] w-full bg-[#0B192C] text-white flex flex-col justify-end overflow-hidden pt-28 pb-10">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-25">
          <img src="/images/images (5).jpg" alt="ChimJoy Fleet" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#0B192C]/80" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center sm:text-left">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="max-w-3xl space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-black text-[#9BC800] uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#9BC800] animate-pulse" />
              <span>CHIMJOY EXECUTIVE FLEET</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-[54px] font-black tracking-tight leading-[1.08] text-white">
              Explore Our <span className="text-[#9BC800]">Vehicle Collection</span>
            </h1>

            <p className="text-slate-200 text-base sm:text-lg font-medium leading-relaxed max-w-2xl">
              Every vehicle in our fleet is meticulously maintained, sanitized, fully insured, and available with an experienced executive chauffeur or self-drive option.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── FLEET SECTION ────────────────────────────────────────────── */}
      <section className="py-14 sm:py-20 bg-[#F4F6F9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              { id: 'all', label: 'All Fleet Categories' },
              { id: 'cat-suv', label: 'SUVs' },
              { id: 'cat-exec', label: 'Executive Cars' },
              { id: 'cat-lux', label: 'Luxury Vehicles' },
              { id: 'cat-bus', label: 'Mini Bus' },
              { id: 'cat-econ', label: 'Economy Cars' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-black transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#0B192C] text-[#9BC800] border-2 border-[#9BC800] shadow-md'
                    : 'bg-white border border-[#0B192C]/15 text-[#475569] hover:border-[#9BC800]/50 hover:text-[#0B192C]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Fleet Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((vehicle, idx) => (
              <motion.div
                key={vehicle.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                whileHover={{ y: -5, scale: 1.01 }}
                className="bg-white rounded-3xl overflow-hidden border border-[#0B192C]/10 hover:border-[#9BC800] hover:shadow-[0_0_25px_rgba(155,200,0,0.3)] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-56 w-full overflow-hidden bg-[#0B192C]">
                    <img src={vehicle.image} alt={vehicle.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute top-4 left-4 bg-[#0B192C] text-[#9BC800] text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full">
                      {vehicle.categoryName}
                    </span>
                  </div>

                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="font-display text-xl font-black text-[#0E1726]">{vehicle.name}</h3>
                      <p className="text-[#475569] text-xs font-medium mt-1 leading-relaxed line-clamp-2">{vehicle.description}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 py-3 border-y border-[#0B192C]/10 text-xs font-black text-[#0E1726]">
                      <span className="flex items-center gap-2"><Users className="w-4 h-4 text-[#9BC800]" /> {vehicle.passengers} Seats</span>
                      <span className="flex items-center gap-2"><Briefcase className="w-4 h-4 text-[#003366]" /> {vehicle.luggage} Bags</span>
                    </div>

                    {/* Features Badges */}
                    <div className="flex flex-wrap gap-1.5">
                      {(vehicle.features || []).slice(0, 3).map((f, i) => (
                        <span key={i} className="text-[10px] font-bold text-[#003366] bg-[#003366]/10 px-2.5 py-1 rounded-full border border-[#003366]/15">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 flex items-center justify-between border-t border-[#0B192C]/8 mt-2">
                  <div>
                    <span className="text-[10px] text-[#475569] uppercase font-bold block">Daily Rate</span>
                    <span className="text-xl font-black text-[#0B192C]">{formatCurrency(vehicle.pricePerDay)}<span className="text-xs font-medium text-[#475569]">/day</span></span>
                  </div>

                  <Link href={`/book/hire?vehicle=${vehicle.id}`}>
                    <LuxuryButton variant="lemon" size="sm" icon={<ArrowRight className="w-4 h-4" />}>
                      Hire Car
                    </LuxuryButton>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

    </main>
  );
}
