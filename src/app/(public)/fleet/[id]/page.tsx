'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Users,
  Briefcase,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Car,
  Clock,
  UserCheck,
} from 'lucide-react';
import { LuxuryButton } from '@/components/ui/luxury-button';
import { MOCK_VEHICLES } from '@/lib/mock-data';
import { Vehicle } from '@/types';
import { formatCurrency } from '@/lib/utils';

export default function VehicleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [activeImage, setActiveImage] = useState<string>('');

  useEffect(() => {
    const found = MOCK_VEHICLES.find((v) => v.id === params.id);
    if (found) {
      setVehicle(found);
      setActiveImage(found.image);
    }
  }, [params.id]);

  if (!vehicle) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center text-[#0E1726]">
        <h2 className="text-xl font-black">Vehicle Not Found</h2>
        <button onClick={() => router.back()} className="mt-4 text-xs font-bold text-[#003366] hover:underline">
          Return to Fleet
        </button>
      </div>
    );
  }

  const gallery = vehicle.gallery || [vehicle.image];

  return (
    <main className="min-h-screen pt-28 pb-24 bg-white text-[#0E1726]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        {/* Back Link */}
        <div>
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#475569] hover:text-[#0B192C] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Fleet Collection
          </button>
        </div>

        {/* Main Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* Left Column: Image Showcase & Gallery */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative h-80 sm:h-[450px] w-full rounded-3xl overflow-hidden bg-[#0B192C] border border-[#0B192C]/10 shadow-lg">
              <img src={activeImage} alt={vehicle.name} className="w-full h-full object-cover" />
              <div className="absolute top-4 left-4">
                <span className="bg-[#0B192C] text-[#9BC800] text-xs font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full border border-white/20">
                  {vehicle.categoryName}
                </span>
              </div>
              <div className="absolute top-4 right-4 bg-[#0B192C]/90 text-[#9BC800] text-xs font-bold px-3.5 py-1.5 rounded-full border border-[#9BC800]/40 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#9BC800] animate-pulse" />
                Available for Reservation
              </div>
            </div>

            {/* Gallery Thumbnails */}
            {gallery.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
                {gallery.map((imgUrl, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(imgUrl)}
                    className={`w-28 h-20 rounded-2xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                      activeImage === imgUrl ? 'border-[#9BC800] scale-105 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={imgUrl} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Title & Booking Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-widest text-[#003366] bg-[#003366]/10 px-3 py-1 rounded-full border border-[#003366]/15">
                  {vehicle.brand || 'ChimJoy Executive'}
                </span>
                {vehicle.year && <span className="text-xs text-[#475569] font-bold">{vehicle.year} Model</span>}
              </div>
              <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0E1726] tracking-tight">
                {vehicle.name}
              </h1>
              <p className="text-[#475569] text-sm font-medium leading-relaxed">{vehicle.description}</p>
            </div>

            {/* Booking Card */}
            <div className="bg-[#0B192C] text-white rounded-3xl p-6 border border-white/10 space-y-6 shadow-xl">
              <div className="flex items-center justify-between border-b border-white/15 pb-4">
                <div>
                  <span className="text-[10px] text-slate-300 font-bold uppercase tracking-wider block">Daily Rate From</span>
                  <span className="text-3xl font-black text-white">
                    {formatCurrency(vehicle.pricePerDay)}
                    <span className="text-xs font-medium text-slate-300">/day</span>
                  </span>
                </div>
                {vehicle.airportFlatRate && (
                  <div className="text-right">
                    <span className="text-[10px] text-[#9BC800] font-bold uppercase block">Airport Flat Rate</span>
                    <span className="text-lg font-bold text-white">{formatCurrency(vehicle.airportFlatRate)}</span>
                  </div>
                )}
              </div>

              {/* Key Capacities */}
              <div className="grid grid-cols-2 gap-3 text-xs font-black text-white">
                <div className="flex items-center gap-2 bg-white/10 p-3 rounded-xl border border-white/10">
                  <Users className="w-4 h-4 text-[#9BC800]" />
                  <span>{vehicle.passengers} Seats</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 p-3 rounded-xl border border-white/10">
                  <Briefcase className="w-4 h-4 text-[#9BC800]" />
                  <span>{vehicle.luggage} Bags</span>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <Link href={`/book/hire?vehicle=${vehicle.id}`}>
                  <LuxuryButton variant="lemon" size="lg" className="w-full justify-center" icon={<ArrowRight className="w-5 h-5" />}>
                    Reserve This Vehicle Now
                  </LuxuryButton>
                </Link>
                <p className="text-[10px] text-slate-300 text-center font-medium">
                  Includes professional chauffeur • No online prepayment required
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Specifications Table */}
        <div className="pt-8 space-y-6">
          <h3 className="font-display text-2xl font-extrabold text-[#0E1726]">Vehicle Specifications</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: 'Transmission', value: vehicle.transmission },
              { label: 'Fuel Type', value: vehicle.fuelType || 'Petrol' },
              { label: 'Passengers', value: `${vehicle.passengers} Persons` },
              { label: 'Luggage Capacity', value: `${vehicle.luggage} Full-size Suitcases` },
              { label: 'Sanitation', value: 'Disinfected before every pickup' },
              { label: 'Insurance', value: 'Comprehensive Commercial Fleet Insured' },
            ].map((spec, i) => (
              <div key={i} className="flex items-center justify-between bg-[#F4F6F9] p-4 rounded-2xl border border-[#0B192C]/10 text-xs">
                <span className="font-bold text-[#475569] uppercase tracking-wider">{spec.label}</span>
                <span className="font-black text-[#0E1726]">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}
