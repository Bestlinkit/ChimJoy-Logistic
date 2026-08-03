'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Users, Briefcase, ArrowRight, Star } from 'lucide-react';
import { Vehicle } from '@/types';
import { getFeaturedVehicles } from '@/lib/firebase/services/fleet-service';
import { formatCurrency } from '@/lib/utils';
import { LuxuryButton } from '@/components/ui/luxury-button';

export const EditorialFleet = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    getFeaturedVehicles().then(setVehicles);
  }, []);

  return (
    <section className="py-32 bg-[#FFFFFF] text-[#121212] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="space-y-4 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C1121F] bg-[#C1121F]/10 px-4 py-1.5 rounded-full">
              Handcrafted Collection
            </span>
            <h2 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-[#121212]">
              The Executive <span className="text-[#C1121F]">Fleet</span>
            </h2>
            <p className="text-[#6B7280] text-lg sm:text-[22px]">
              Inspected, sanitized, and chauffeur-driven for VIP arrivals and intercity travel.
            </p>
          </div>

          <Link href="/fleet">
            <LuxuryButton variant="outline" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
              Explore Full Collection
            </LuxuryButton>
          </Link>
        </div>

        {/* Large Photographic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {vehicles.map((v) => (
            <div
              key={v.id}
              className="group bg-[#FAFAF8] rounded-[36px] overflow-hidden shadow-editorial border border-black/5 flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 hover:shadow-editorial-hover"
            >
              {/* Image Container */}
              <div className="relative h-72 w-full bg-[#111111] overflow-hidden">
                <img
                  src={v.image}
                  alt={v.name}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                />
                <div className="absolute top-5 left-5 bg-white/90 backdrop-blur-md text-[#121212] text-xs font-bold px-4 py-1.5 rounded-full border border-black/5">
                  {v.categoryName}
                </div>
              </div>

              {/* Info & Action */}
              <div className="p-8 space-y-6 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="font-display text-2xl font-extrabold text-[#121212] group-hover:text-[#C1121F] transition-colors">
                    {v.name}
                  </h3>
                  <p className="text-[#6B7280] text-xs leading-relaxed line-clamp-2">{v.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 py-4 border-y border-black/5 text-xs text-[#6B7280] font-semibold">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#C1121F]" />
                    <span>{v.passengers} Seats</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-[#D4A017]" />
                    <span>{v.luggage} Luggage Bags</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div>
                    <span className="text-[10px] text-[#6B7280] font-bold uppercase tracking-wider block">Daily Rate From</span>
                    <span className="text-2xl font-black text-[#121212]">{formatCurrency(v.pricePerDay)}</span>
                  </div>

                  <Link href={`/book?vehicle=${v.id}`}>
                    <LuxuryButton variant="crimson" size="sm" icon={<ArrowRight className="w-4 h-4" />}>
                      Reserve
                    </LuxuryButton>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
