'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Plane,
  Car,
  Clock,
  Package,
  MapPin,
  Calendar,
  Check,
  ChevronDown,
  Sparkles,
  Users,
  Briefcase,
  ShieldCheck,
  Navigation,
} from 'lucide-react';
import { ServiceCategory, Vehicle } from '@/types';
import { MOCK_VEHICLES } from '@/lib/mock-data';

export const EditorialHero = () => {
  const router = useRouter();

  // Booking Widget Form States
  const [selectedService, setSelectedService] = useState<ServiceCategory>('airport');
  const [pickup, setPickup] = useState<string>('Sam Mbakwe Airport QOW');
  const [dropoff, setDropoff] = useState<string>('Protea Hotel Owerri Select');
  const [pickupDate, setPickupDate] = useState<string>('2026-08-05');
  const [pickupTime, setPickupTime] = useState<string>('14:30');
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle>(MOCK_VEHICLES[0]);
  const [passengers, setPassengers] = useState<number>(2);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const previewVehicles = MOCK_VEHICLES.slice(0, 3);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      router.push(
        `/book?type=${selectedService}&pickup=${encodeURIComponent(pickup)}&dropoff=${encodeURIComponent(dropoff)}&date=${pickupDate}&vehicle=${selectedVehicle.id}`
      );
    }, 800);
  };

  return (
    <section className="relative min-h-screen w-full bg-[#FAFAF8] text-[#121212] flex flex-col justify-between overflow-hidden">
      {/* ========================================== */}
      {/* SUBTLE AMBIENT BACKGROUND LAYERS           */}
      {/* ========================================== */}

      {/* 1. Soft Radial Crimson & Gold Blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-[#C1121F]/5 via-[#D4A017]/5 to-transparent rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#C1121F]/3 rounded-full blur-[160px] pointer-events-none" />

      {/* 2. Faint Tech Grid Pattern (3% Opacity) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle, #121212 1px, transparent 1px)`,
          backgroundSize: '36px 36px',
        }}
      />

      {/* ========================================== */}
      {/* MAIN 1440px CONTAINER                       */}
      {/* ========================================== */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-32 pb-16 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* ========================================== */}
          {/* LEFT SIDE: EDITORIAL TYPOGRAPHY & STORY   */}
          {/* ========================================== */}
          <div className="lg:col-span-6 space-y-8">
            {/* Top Luxury Badge (Soft crimson tint pill with animated pulse) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#C1121F]/10 border border-[#C1121F]/20 text-xs font-bold text-[#C1121F]"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C1121F] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C1121F]" />
              </span>
              <span className="tracking-widest uppercase text-[11px]">PREMIUM MOBILITY SOLUTIONS</span>
            </motion.div>

            {/* Main Heading (84px Outfit ExtraBold, 3 Lines, Max 650px) */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="max-w-[650px]"
            >
              <h1 className="font-display text-[44px] sm:text-[64px] lg:text-[84px] font-black text-[#121212] leading-[0.95] tracking-[-0.03em]">
                Luxury Airport <br />
                <span className="bg-gradient-to-r from-[#C1121F] to-[#9E0D18] bg-clip-text text-transparent">
                  Transfers &
                </span> <br />
                Executive Mobility
              </h1>
            </motion.div>

            {/* Natural Description Paragraph (Max 560px, 18-20px) */}
            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-[560px] text-lg sm:text-[20px] text-[#6B7280] font-normal leading-relaxed"
            >
              Seamless airport receptions at Sam Mbakwe International Airport QOW, private chauffeur hire, executive intercity travel, and dedicated logistics support across Owerri and Southeast Nigeria.
            </motion.p>

            {/* Call To Actions (Primary Crimson 56px + Secondary White/Black) */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-4 pt-2"
            >
              {/* Primary: Book Your Ride (56px Height, Crimson) */}
              <Link href="/book" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto h-[56px] px-8 rounded-full bg-[#C1121F] hover:bg-[#9E0D18] text-white font-extrabold text-base tracking-wide shadow-crimson flex items-center justify-center gap-3 border border-[#C1121F]/50 group transition-all"
                >
                  <span>Book Your Ride</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform text-[#F5C747]" />
                </motion.button>
              </Link>

              {/* Secondary: Explore Fleet (White background, thin black border) */}
              <Link href="/fleet" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto h-[56px] px-8 rounded-full bg-white border border-[#121212]/20 text-[#121212] font-extrabold text-base hover:bg-[#121212] hover:text-white transition-all duration-300 flex items-center justify-center gap-2">
                  Explore Fleet
                </button>
              </Link>
            </motion.div>

            {/* Minimalist Trust Indicators Row (4 Line Items) */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-bold text-[#121212]"
            >
              {[
                '✓ Airport Transfers',
                '✓ Executive Fleet',
                '✓ 24/7 Availability',
                '✓ Trusted Local Service',
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-[#121212]">
                  <span className="text-[#C1121F] font-black">{item}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ========================================== */}
          {/* RIGHT SIDE: ASYMMETRICAL EDITORIAL MASTERWORK */}
          {/* ========================================== */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full max-w-[540px]"
            >
              {/* LAYER 1: Cinematic Photograph (Golden Hour Luxury SUV extending beyond grid) */}
              <div className="relative h-[480px] w-full rounded-[40px] overflow-hidden shadow-editorial border border-black/10 bg-[#111111] transform lg:translate-x-4">
                <img
                  src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1400&q=80"
                  alt="Toyota Prado TX-L Luxury Executive SUV"
                  className="w-full h-full object-cover filter contrast-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-8 text-white">
                  <span className="text-[10px] font-bold text-[#D4A017] uppercase tracking-widest block">
                    Featured VIP Fleet
                  </span>
                  <h4 className="font-display text-xl font-extrabold">Toyota Prado TX-L SUV</h4>
                </div>
              </div>

              {/* LAYER 2: Floating Glass Booking Widget (32px Radius, Backdrop Blur) */}
              <div className="absolute top-10 -left-4 sm:-left-8 right-4 sm:right-8 bg-white/95 backdrop-blur-[24px] border border-black/10 rounded-[32px] p-6 sm:p-7 shadow-editorial-hover space-y-5">
                {/* Header */}
                <div className="space-y-0.5">
                  <h3 className="font-display text-2xl font-black text-[#121212]">Book Your Journey</h3>
                  <p className="text-xs text-[#6B7280]">Select service purpose & luxury vehicle.</p>
                </div>

                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  {/* Apple Segmented Control for Service Purpose */}
                  <div className="bg-[#F4F4F5] p-1 rounded-2xl flex items-center gap-1 border border-black/5">
                    {[
                      { id: 'airport', label: 'Airport', icon: <Plane className="w-3.5 h-3.5" /> },
                      { id: 'city', label: 'City Ride', icon: <Car className="w-3.5 h-3.5" /> },
                      { id: 'rental', label: 'Car Rental', icon: <Clock className="w-3.5 h-3.5" /> },
                      { id: 'logistics', label: 'Logistics', icon: <Package className="w-3.5 h-3.5" /> },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setSelectedService(item.id as ServiceCategory)}
                        className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-all ${
                          selectedService === item.id
                            ? 'bg-[#C1121F] text-white shadow-crimson'
                            : 'text-[#6B7280] hover:text-[#121212]'
                        }`}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </button>
                    ))}
                  </div>

                  {/* Location Inputs (Custom designed leading icon & animated focus) */}
                  <div className="space-y-2 text-xs">
                    <div className="bg-[#F4F4F5] p-3 rounded-2xl border border-black/5 flex items-center gap-2.5 focus-within:border-[#C1121F] focus-within:bg-white transition-all">
                      <MapPin className="w-4 h-4 text-[#C1121F] shrink-0" />
                      <div className="flex-1">
                        <label className="text-[9px] font-bold text-[#C1121F] uppercase tracking-wider block">Pickup Location</label>
                        <input
                          type="text"
                          value={pickup}
                          onChange={(e) => setPickup(e.target.value)}
                          className="w-full bg-transparent text-[#121212] font-semibold text-xs focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="bg-[#F4F4F5] p-3 rounded-2xl border border-black/5 flex items-center gap-2.5 focus-within:border-[#C1121F] focus-within:bg-white transition-all">
                      <MapPin className="w-4 h-4 text-[#D4A017] shrink-0" />
                      <div className="flex-1">
                        <label className="text-[9px] font-bold text-[#D4A017] uppercase tracking-wider block">Destination / Hotel</label>
                        <input
                          type="text"
                          value={dropoff}
                          onChange={(e) => setDropoff(e.target.value)}
                          className="w-full bg-transparent text-[#121212] font-semibold text-xs focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Date & Time Selector */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-[#F4F4F5] p-2.5 rounded-2xl border border-black/5">
                      <label className="text-[9px] font-bold text-[#6B7280] uppercase tracking-wider block mb-0.5">Travel Date</label>
                      <input
                        type="date"
                        value={pickupDate}
                        onChange={(e) => setPickupDate(e.target.value)}
                        className="w-full bg-transparent text-[#121212] font-semibold focus:outline-none"
                      />
                    </div>
                    <div className="bg-[#F4F4F5] p-2.5 rounded-2xl border border-black/5">
                      <label className="text-[9px] font-bold text-[#6B7280] uppercase tracking-wider block mb-0.5">Time</label>
                      <input
                        type="time"
                        value={pickupTime}
                        onChange={(e) => setPickupTime(e.target.value)}
                        className="w-full bg-transparent text-[#121212] font-semibold focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Vehicle Preview Tiles (3 options) */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block">Select Vehicle</label>
                    <div className="grid grid-cols-3 gap-2">
                      {previewVehicles.map((v) => {
                        const isSelected = selectedVehicle.id === v.id;
                        return (
                          <div
                            key={v.id}
                            onClick={() => setSelectedVehicle(v)}
                            className={`p-2 rounded-2xl border cursor-pointer text-center transition-all ${
                              isSelected
                                ? 'bg-[#C1121F]/10 border-[#C1121F] shadow-sm'
                                : 'bg-[#F4F4F5] border-black/5 hover:bg-black/5'
                            }`}
                          >
                            <img src={v.image} alt={v.name} className="w-full h-10 object-cover rounded-xl mb-1" />
                            <h5 className="font-bold text-[11px] text-[#121212] truncate">{v.name}</h5>
                            <span className="text-[9px] text-[#6B7280] block">{v.passengers} Seats</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Real-time Live Booking Summary (No pricing) */}
                  <div className="bg-[#FAF8F5] p-3 rounded-2xl border border-black/5 text-[11px] space-y-1 text-[#6B7280]">
                    <div className="flex justify-between">
                      <span>Summary:</span>
                      <span className="font-bold text-[#121212] capitalize">{selectedService} • {selectedVehicle.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Schedule:</span>
                      <span className="font-bold text-[#C1121F]">{pickupDate} at {pickupTime}</span>
                    </div>
                  </div>

                  {/* Submit Request Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-[52px] bg-[#C1121F] hover:bg-[#9E0D18] text-white font-extrabold text-sm rounded-full shadow-crimson flex items-center justify-center gap-2 transition-all"
                  >
                    {isSubmitting ? 'Processing Request...' : 'Submit Booking Request'}
                  </button>
                </form>
              </div>

              {/* LAYER 3: Subtle Decorative Floating Indicator Badges */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-4 right-4 bg-white/90 backdrop-blur-md border border-black/10 px-4 py-2 rounded-full text-xs font-bold text-[#121212] shadow-editorial hidden sm:flex items-center gap-2 z-20"
              >
                <Navigation className="w-3.5 h-3.5 text-[#C1121F]" />
                <span>Sam Mbakwe Airport Express • 25 Mins</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ========================================== */}
      {/* SCROLL INDICATOR & NATURAL SECTION FADE    */}
      {/* ========================================== */}
      <div className="relative w-full pb-6 text-center z-10 flex flex-col items-center gap-2">
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-5 h-8 rounded-full border-2 border-[#121212]/30 flex items-start justify-center p-1"
        >
          <div className="w-1 h-2 rounded-full bg-[#C1121F]" />
        </motion.div>
      </div>

      {/* Smooth Natural Section Fade Transition */}
      <div className="relative w-full h-12 bg-gradient-to-b from-transparent to-[#F4F4F5]" />
    </section>
  );
};
