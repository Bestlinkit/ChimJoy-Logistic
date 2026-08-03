'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Users, Briefcase, ArrowRight, Eye, Layers, Heart } from 'lucide-react';
import { Vehicle } from '@/types';
import { getFeaturedVehicles } from '@/lib/firebase/services/fleet-service';
import { formatCurrency } from '@/lib/utils';
import { LuxuryButton } from '@/components/ui/luxury-button';
import { LuxuryBadge } from '@/components/ui/luxury-badge';
import { GlassCard } from '@/components/ui/glass-card';
import { VehicleQuickViewModal } from '@/components/fleet/vehicle-quick-view-modal';
import { VehicleCompareDrawer } from '@/components/fleet/vehicle-compare-drawer';

export const DynamicFleetShowcase = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [quickViewVehicle, setQuickViewVehicle] = useState<Vehicle | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState<boolean>(false);
  const [compareList, setCompareList] = useState<Vehicle[]>([]);
  const [isCompareOpen, setIsCompareOpen] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    getFeaturedVehicles().then(setVehicles);
  }, []);

  const filteredVehicles = selectedCategory === 'all'
    ? vehicles
    : vehicles.filter((v) => v.category === selectedCategory);

  const handleOpenQuickView = (v: Vehicle) => {
    setQuickViewVehicle(v);
    setIsQuickViewOpen(true);
  };

  const handleToggleFavorite = (id: string) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((fId) => fId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const handleToggleCompare = (v: Vehicle) => {
    if (compareList.some((c) => c.id === v.id)) {
      setCompareList(compareList.filter((c) => c.id !== v.id));
    } else {
      if (compareList.length >= 3) {
        alert('You can compare up to 3 vehicles at a time.');
        return;
      }
      setCompareList([...compareList, v]);
    }
  };

  return (
    <section className="py-24 bg-[#071325] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4 max-w-2xl">
            <LuxuryBadge variant="gold">Dynamic Luxury Fleet</LuxuryBadge>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight">
              Handcrafted Fleet for <span className="gradient-gold">Every Journey</span>
            </h2>
            <p className="text-slate-300 text-base">
              From executive sedans to bulletproof-compatible SUVs and passenger vans. Inspected, sanitized, and chauffeur-driven.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 bg-white/5 border border-white/10 p-1.5 rounded-2xl backdrop-blur-md">
            {['all', 'airport', 'rental', 'city', 'logistics'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl capitalize transition-all ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#F5D061] text-slate-950 shadow-gold'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {cat === 'all' ? 'All Vehicles' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Compare Floating Trigger */}
        {compareList.length > 0 && (
          <div className="mb-6 flex items-center justify-between bg-gradient-to-r from-[#0F2545] to-[#134074] p-4 rounded-2xl border border-[#D4AF37]">
            <span className="text-xs font-bold text-white">
              {compareList.length} Vehicles Selected for Comparison
            </span>
            <button
              onClick={() => setIsCompareOpen(true)}
              className="px-4 py-2 bg-[#F5D061] text-slate-950 rounded-xl font-bold text-xs flex items-center gap-2 hover:brightness-105"
            >
              <Layers className="w-4 h-4" /> Compare Now
            </button>
          </div>
        )}

        {/* Vehicle Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVehicles.map((vehicle) => {
            const isFav = favorites.includes(vehicle.id);
            const isComp = compareList.some((c) => c.id === vehicle.id);

            return (
              <GlassCard
                key={vehicle.id}
                variant="dark"
                className="p-0 overflow-hidden flex flex-col justify-between border border-white/15 group relative"
              >
                {/* Image Container with Badge & Quick Actions */}
                <div className="relative h-64 w-full overflow-hidden bg-slate-900">
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F2545] via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <LuxuryBadge variant="gold" className="bg-slate-950/80 backdrop-blur-md">
                      {vehicle.categoryName}
                    </LuxuryBadge>
                  </div>

                  {/* Favorite & Quick View Floating Buttons */}
                  <div className="absolute top-4 right-4 flex items-center gap-2">
                    <button
                      onClick={() => handleToggleFavorite(vehicle.id)}
                      className={`p-2 rounded-full backdrop-blur-md border transition-colors ${
                        isFav ? 'bg-red-500 border-red-400 text-white' : 'bg-slate-950/80 border-white/20 text-slate-300 hover:text-white'
                      }`}
                    >
                      <Heart className="w-4 h-4 fill-current" />
                    </button>

                    <button
                      onClick={() => handleOpenQuickView(vehicle)}
                      className="p-2 rounded-full bg-slate-950/80 border border-white/20 text-slate-300 hover:text-white backdrop-blur-md transition-colors"
                      title="Quick View Specs"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Specs & Info */}
                <div className="p-6 space-y-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display text-2xl font-bold text-white group-hover:text-[#F5D061] transition-colors">
                      {vehicle.name}
                    </h3>
                    <p className="text-slate-400 text-xs mt-1 line-clamp-2">{vehicle.description}</p>
                  </div>

                  {/* Capacity Badges */}
                  <div className="grid grid-cols-2 gap-3 py-3 border-y border-white/10 text-xs text-slate-300 font-medium">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-[#D4AF37]" />
                      <span>{vehicle.passengers} Passengers</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-[#06D6A0]" />
                      <span>{vehicle.luggage} Luggage Bags</span>
                    </div>
                  </div>

                  {/* Compare Toggle */}
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <label className="flex items-center gap-2 cursor-pointer select-none hover:text-white">
                      <input
                        type="checkbox"
                        checked={isComp}
                        onChange={() => handleToggleCompare(vehicle)}
                        className="w-4 h-4 accent-[#F5D061]"
                      />
                      <span>Compare Vehicle</span>
                    </label>

                    <Link href={`/fleet/${vehicle.id}`} className="text-[11px] font-semibold text-[#06D6A0] hover:underline">
                      Full Showroom ➔
                    </Link>
                  </div>

                  {/* Pricing & Booking Action */}
                  <div className="flex items-center justify-between pt-2 border-t border-white/10">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Daily Rate</span>
                      <span className="text-xl sm:text-2xl font-black text-[#F5D061]">
                        {formatCurrency(vehicle.pricePerDay)}
                      </span>
                    </div>

                    <Link href={`/book?vehicle=${vehicle.id}`}>
                      <LuxuryButton variant="gold" size="sm" icon={<ArrowRight className="w-4 h-4" />}>
                        Book Vehicle
                      </LuxuryButton>
                    </Link>
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>

        {/* View Full Fleet Button */}
        <div className="mt-16 text-center">
          <Link href="/fleet">
            <LuxuryButton variant="outline" size="lg" className="border-white/30 text-white hover:bg-white hover:text-slate-950">
              Explore Complete Fleet Catalog
            </LuxuryButton>
          </Link>
        </div>

        {/* MODALS */}
        <VehicleQuickViewModal
          vehicle={quickViewVehicle}
          isOpen={isQuickViewOpen}
          onClose={() => setIsQuickViewOpen(false)}
        />

        <VehicleCompareDrawer
          isOpen={isCompareOpen}
          onClose={() => setIsCompareOpen(false)}
          selectedVehicles={compareList}
          onRemoveVehicle={(id) => setCompareList(compareList.filter((c) => c.id !== id))}
        />
      </div>
    </section>
  );
};
