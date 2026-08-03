'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star,
  ArrowRight,
  Plane,
  Car,
  Clock,
  Package,
  MapPin,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  Users,
  Briefcase,
  Sparkles,
  Navigation,
  Check,
  PhoneCall,
} from 'lucide-react';
import { ServiceCategory, Vehicle } from '@/types';
import { MOCK_VEHICLES } from '@/lib/mock-data';

export const LuxuryHero = () => {
  const router = useRouter();

  // Floating Navigation Scroll shrink state
  const [isScrolled, setIsScrolled] = useState(false);

  // Booking Card State
  const [activeStep, setActiveStep] = useState<number>(1);
  const [serviceType, setServiceType] = useState<ServiceCategory>('airport');
  const [pickup, setPickup] = useState<string>('Sam Mbakwe International Cargo Airport (QOW)');
  const [dropoff, setDropoff] = useState<string>('Protea Hotel Owerri Select');
  const [pickupDate, setPickupDate] = useState<string>('2026-08-05');
  const [pickupTime, setPickupTime] = useState<string>('14:00');
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle>(MOCK_VEHICLES[0]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      router.push(
        `/book?type=${serviceType}&pickup=${encodeURIComponent(pickup)}&dropoff=${encodeURIComponent(dropoff)}&date=${pickupDate}&vehicle=${selectedVehicle.id}`
      );
    }, 800);
  };

  // Preview Vehicles (Top 3 vehicles for step 3)
  const previewVehicles = MOCK_VEHICLES.slice(0, 3);

  return (
    <section className="relative min-h-screen w-full bg-[#040B17] text-white flex flex-col justify-between overflow-hidden">
      {/* ========================================== */}
      {/* LAYER 1: CINEMATIC BACKGROUND VIDEO / LAYER */}
      {/* ========================================== */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-[0.45] filter brightness-75 scale-105"
          poster="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=2000&q=80"
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-luxury-car-driving-through-the-city-at-night-41566-large.mp4"
            type="video/mp4"
          />
        </video>

        {/* Fallback overlay image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=2000&q=80')`,
          }}
        />
      </div>

      {/* ========================================== */}
      {/* LAYER 2: DEEP NAVY GRADIENT OVERLAY       */}
      {/* ========================================== */}
      <div className="absolute inset-0 z-1 bg-gradient-to-r from-[#040B17] via-[#040B17]/90 to-transparent pointer-events-none" />
      <div className="absolute inset-0 z-1 bg-gradient-to-t from-[#040B17] via-transparent to-[#040B17]/80 pointer-events-none" />

      {/* ========================================== */}
      {/* LAYER 3: ROYAL BLUE RADIAL GLOW           */}
      {/* ========================================== */}
      <div className="absolute top-1/3 right-10 z-2 w-[500px] h-[500px] bg-[#00509D]/15 rounded-full blur-[250px] pointer-events-none" />

      {/* ========================================== */}
      {/* LAYER 4: SUBTLE FLOATING GOLD PARTICLES   */}
      {/* ========================================== */}
      <div className="absolute inset-0 z-2 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0.1, y: 100, x: Math.random() * 1000 }}
            animate={{
              opacity: [0.1, 0.4, 0.1],
              y: [-20, -120],
              x: `+=${Math.random() * 40 - 20}`,
            }}
            transition={{
              duration: 12 + i * 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute w-2 h-2 rounded-full bg-[#D4AF37] blur-[1px]"
            style={{ left: `${15 + i * 15}%`, top: `${20 + i * 12}%` }}
          />
        ))}
      </div>

      {/* ========================================== */}
      {/* LAYER 5: ANIMATED TECH GRID PATTERN       */}
      {/* ========================================== */}
      <div
        className="absolute inset-0 z-2 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* ========================================== */}
      {/* FLOATING AMBIENT VECTOR ELEMENTS          */}
      {/* ========================================== */}
      <motion.div
        animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 right-[42%] z-2 hidden xl:block pointer-events-none opacity-20"
      >
        <div className="w-48 h-48 rounded-full border border-[#D4AF37] blur-[1px]" />
      </motion.div>

      {/* ========================================== */}
      {/* TOP FLOATING GLASS NAVIGATION (84px Height) */}
      {/* ========================================== */}
      <header className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto">
        <motion.div
          animate={{
            height: isScrolled ? '72px' : '84px',
            backgroundColor: isScrolled ? 'rgba(7, 19, 37, 0.92)' : 'rgba(255, 255, 255, 0.08)',
            boxShadow: isScrolled
              ? '0 25px 50px -12px rgba(4, 11, 23, 0.5)'
              : '0 20px 40px -15px rgba(7, 19, 37, 0.2)',
          }}
          transition={{ duration: 0.3 }}
          className="w-full rounded-full border border-white/15 backdrop-blur-[24px] px-6 flex items-center justify-between"
        >
          {/* Logo Left */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#D4AF37] via-[#00509D] to-[#071325] p-0.5 shadow-gold group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#071325] rounded-full flex items-center justify-center">
                <span className="font-display text-lg font-black gradient-gold">CJ</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display text-xl font-extrabold tracking-tight text-white">
                  CHIMJOY
                </span>
                <span className="text-[10px] font-bold text-[#F5D061] bg-[#D4AF37]/15 border border-[#D4AF37]/30 px-2 py-0.5 rounded-full uppercase">
                  CAR HIRE
                </span>
              </div>
              <span className="text-[9px] text-slate-400 font-medium tracking-widest uppercase block -mt-0.5">
                Logistics Services Ltd
              </span>
            </div>
          </Link>

          {/* Navigation Centered */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 backdrop-blur-md">
            {[
              { name: 'Home', href: '/' },
              { name: 'Fleet Catalog', href: '/fleet' },
              { name: 'Airport Transfers (QOW)', href: '/services/airport-transfers' },
              { name: 'Services', href: '/services' },
              { name: 'About Us', href: '/about' },
              { name: 'Contact', href: '/contact' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-[#F5D061] transition-colors rounded-full"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right Action Button */}
          <div className="flex items-center gap-4">
            <a
              href="tel:+2348000000000"
              className="hidden xl:flex items-center gap-2 text-slate-300 hover:text-[#F5D061] text-xs font-semibold"
            >
              <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-[#F5D061]">
                <PhoneCall className="w-3.5 h-3.5" />
              </div>
              <span>+234 (0) 800 CHIMJOY</span>
            </a>

            <Link href="/book">
              <button className="relative inline-flex items-center justify-center font-bold text-xs tracking-wide rounded-full px-6 py-3 bg-gradient-to-r from-[#D4AF37] via-[#F5D061] to-[#AA820A] text-slate-950 shadow-gold hover:scale-105 transition-all overflow-hidden group">
                <span className="absolute inset-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
                Book Ride
              </button>
            </Link>
          </div>
        </motion.div>
      </header>

      {/* ========================================== */}
      {/* MAIN 12-COLUMN CONTAINER CONTENT           */}
      {/* ========================================== */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-36 pb-20 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* ========================================== */}
          {/* LEFT CONTENT COLUMN (7 Columns)            */}
          {/* ========================================== */}
          <div className="lg:col-span-7 space-y-8">
            {/* Small Glass Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-white/20 text-xs font-bold text-white mb-2 shadow-luxury"
            >
              <div className="flex items-center gap-1 text-[#F5D061]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span className="text-slate-300">|</span>
              <span className="text-white font-semibold">Premium Mobility Platform</span>
            </motion.div>

            {/* Main Heading (72px Outfit ExtraBold, 3 Lines) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="max-w-[700px] space-y-1"
            >
              <h1 className="font-display text-4xl sm:text-6xl xl:text-[72px] font-black tracking-[-0.02em] leading-[1.05] text-white">
                <span className="bg-gradient-to-r from-[#00509D] via-blue-400 to-[#06D6A0] bg-clip-text text-transparent">
                  Luxury Airport
                </span>{' '}
                Transfers
                <br />
                <span className="bg-gradient-to-r from-[#00509D] to-[#06D6A0] bg-clip-text text-transparent">
                  Executive
                </span>{' '}
                Car Rentals
                <br />
                Professional Logistics
              </h1>
            </motion.div>

            {/* Paragraph Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="max-w-[620px] text-lg sm:text-[22px] text-slate-300 font-normal leading-[1.4]"
            >
              ChimJoy is the premier transportation company serving Owerri and Southeast Nigeria with reliable airport transfers, luxury vehicle rentals, executive rides, and professional logistics services.
            </motion.p>

            {/* Primary & Secondary CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-4 pt-2"
            >
              {/* Primary Pill Button (Height 60px, Padding 32px) */}
              <Link href="/book" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ y: -6, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto h-[60px] px-8 rounded-full bg-gradient-to-r from-[#00509D] via-blue-600 to-[#134074] text-white font-extrabold text-base tracking-wide shadow-royal flex items-center justify-center gap-3 border border-blue-400/40 relative overflow-hidden group"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  <span>Explore Instant Booking</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform text-[#F5D061]" />
                </motion.button>
              </Link>

              {/* Secondary Glass Button */}
              <Link href="/fleet" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto h-[60px] px-8 rounded-full glass-panel border border-white/30 text-white font-extrabold text-base hover:bg-white hover:text-slate-950 transition-all duration-300 flex items-center justify-center gap-2">
                  View Luxury Fleet
                </button>
              </Link>
            </motion.div>

            {/* Trust Cards Row (4 Staggered Glass Cards) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 no-scrollbar overflow-x-auto"
            >
              {[
                { label: '24/7 Availability', icon: <Clock className="w-5 h-5 text-blue-400" /> },
                { label: 'Airport Pickup QOW', icon: <Plane className="w-5 h-5 text-[#00509D]" /> },
                { label: 'Professional Fleet', icon: <Car className="w-5 h-5 text-[#D4AF37]" /> },
                { label: 'Verified Chauffeurs', icon: <ShieldCheck className="w-5 h-5 text-[#06D6A0]" /> },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -4, scale: 1.03 }}
                  className="p-3.5 rounded-2xl glass-dark border border-white/15 flex items-center gap-3 group transition-all"
                >
                  <div className="p-2 rounded-xl bg-white/10 text-white group-hover:rotate-12 transition-transform">
                    {item.icon}
                  </div>
                  <span className="text-xs font-bold text-white leading-tight">{item.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* ========================================== */}
          {/* RIGHT CONTENT COLUMN (5 Columns Floating) */}
          {/* ========================================== */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="w-full max-w-[460px] rounded-[32px] backdrop-blur-[30px] bg-white/10 border border-white/20 p-6 sm:p-8 shadow-2xl space-y-6 relative"
            >
              {/* Radial glow backdrop */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#D4AF37]/20 to-[#00509D]/30 rounded-[34px] blur-xl -z-10" />

              {/* Booking Card Header */}
              <div className="space-y-1">
                <h3 className="font-display text-2xl font-black text-white">Book Your Journey</h3>
                <p className="text-xs text-slate-300">Reserve your ride in less than two minutes.</p>
                <div className="h-1 w-16 bg-gradient-to-r from-[#D4AF37] to-[#06D6A0] rounded-full mt-2" />
              </div>

              {/* Booking Progress Indicator (4 Circular Steps) */}
              <div className="flex items-center justify-between relative py-2">
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/20 -translate-y-1/2 z-0" />
                <div
                  className="absolute top-1/2 left-0 h-0.5 bg-[#F5D061] -translate-y-1/2 z-0 transition-all duration-500"
                  style={{ width: `${((activeStep - 1) / 3) * 100}%` }}
                />
                {[1, 2, 3, 4].map((stepNum) => (
                  <button
                    key={stepNum}
                    onClick={() => setActiveStep(stepNum)}
                    className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center relative z-10 transition-all ${
                      activeStep === stepNum
                        ? 'bg-[#F5D061] text-slate-950 ring-4 ring-[#F5D061]/30 scale-110'
                        : activeStep > stepNum
                        ? 'bg-[#06D6A0] text-slate-950'
                        : 'bg-slate-900 text-slate-400 border border-white/20'
                    }`}
                  >
                    {activeStep > stepNum ? <Check className="w-3.5 h-3.5" /> : stepNum}
                  </button>
                ))}
              </div>

              <form onSubmit={handleBookingSubmit} className="space-y-5">
                {/* STEP 1: SERVICE SELECTION (Interactive Cards) */}
                {activeStep === 1 && (
                  <div className="space-y-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#F5D061] block">
                      Select Mobility Purpose
                    </span>
                    <div className="grid grid-cols-2 gap-2.5">
                      {[
                        { id: 'airport', title: 'Airport Transfer', desc: 'Sam Mbakwe QOW', icon: <Plane className="w-4 h-4 text-[#00509D]" /> },
                        { id: 'city', title: 'City Ride', desc: 'Owerri & Intercity', icon: <Car className="w-4 h-4 text-[#06D6A0]" /> },
                        { id: 'rental', title: 'Car Rental', desc: 'Executive Hire', icon: <Clock className="w-4 h-4 text-[#D4AF37]" /> },
                        { id: 'logistics', title: 'Logistics', desc: 'Freight Haulage', icon: <Package className="w-4 h-4 text-sky-400" /> },
                      ].map((item) => {
                        const isSelected = serviceType === item.id;
                        return (
                          <div
                            key={item.id}
                            onClick={() => setServiceType(item.id as ServiceCategory)}
                            className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                              isSelected
                                ? 'bg-[#00509D]/40 border-[#F5D061] shadow-gold scale-102'
                                : 'bg-white/5 border-white/10 hover:bg-white/10'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1">
                              {item.icon}
                              {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-[#F5D061]" />}
                            </div>
                            <h4 className="font-bold text-xs text-white">{item.title}</h4>
                            <p className="text-[10px] text-slate-300 mt-0.5">{item.desc}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* STEP 2: LOCATION & SCHEDULE INPUTS */}
                {activeStep === 2 && (
                  <div className="space-y-3 text-xs">
                    <div className="space-y-1">
                      <label className="font-bold uppercase tracking-wider text-[#F5D061] text-[10px]">Pickup Location</label>
                      <div className="flex items-center gap-2 bg-white/10 border border-white/15 rounded-xl p-3 focus-within:border-[#F5D061]">
                        <MapPin className="w-4 h-4 text-[#06D6A0] shrink-0" />
                        <input
                          type="text"
                          value={pickup}
                          onChange={(e) => setPickup(e.target.value)}
                          placeholder="e.g. Sam Mbakwe Airport QOW"
                          className="w-full bg-transparent text-white text-xs focus:outline-none placeholder-slate-400"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold uppercase tracking-wider text-[#F5D061] text-[10px]">Destination / Dropoff</label>
                      <div className="flex items-center gap-2 bg-white/10 border border-white/15 rounded-xl p-3 focus-within:border-[#F5D061]">
                        <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0" />
                        <input
                          type="text"
                          value={dropoff}
                          onChange={(e) => setDropoff(e.target.value)}
                          placeholder="e.g. Protea Hotel Owerri"
                          className="w-full bg-transparent text-white text-xs focus:outline-none placeholder-slate-400"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="font-bold uppercase tracking-wider text-slate-300 text-[10px]">Travel Date</label>
                        <input
                          type="date"
                          value={pickupDate}
                          onChange={(e) => setPickupDate(e.target.value)}
                          className="w-full bg-white/10 border border-white/15 rounded-xl p-2.5 text-white text-xs focus:outline-none [color-scheme:dark]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-bold uppercase tracking-wider text-slate-300 text-[10px]">Time</label>
                        <input
                          type="time"
                          value={pickupTime}
                          onChange={(e) => setPickupTime(e.target.value)}
                          className="w-full bg-white/10 border border-white/15 rounded-xl p-2.5 text-white text-xs focus:outline-none [color-scheme:dark]"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 3: VEHICLE PREVIEW SELECTION */}
                {activeStep === 3 && (
                  <div className="space-y-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#F5D061] block">
                      Select Vehicle Fleet
                    </span>
                    <div className="space-y-2 max-h-56 overflow-y-auto pr-1 no-scrollbar">
                      {previewVehicles.map((v) => {
                        const isSelected = selectedVehicle.id === v.id;
                        return (
                          <div
                            key={v.id}
                            onClick={() => setSelectedVehicle(v)}
                            className={`p-3 rounded-2xl border cursor-pointer flex items-center gap-3 transition-all ${
                              isSelected
                                ? 'bg-[#00509D]/40 border-[#F5D061] shadow-gold'
                                : 'bg-white/5 border-white/10 hover:bg-white/10'
                            }`}
                          >
                            <img src={v.image} alt={v.name} className="w-16 h-12 object-cover rounded-xl shrink-0" />
                            <div className="flex-1 text-xs">
                              <h4 className="font-bold text-white leading-snug">{v.name}</h4>
                              <div className="flex items-center gap-3 text-[10px] text-slate-300 mt-0.5">
                                <span><Users className="w-3 h-3 inline text-[#D4AF37]" /> {v.passengers} Seats</span>
                                <span><Briefcase className="w-3 h-3 inline text-[#06D6A0]" /> {v.luggage} Bags</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* STEP 4: LIVE BOOKING SUMMARY & SUBMIT */}
                {activeStep === 4 && (
                  <div className="space-y-3 bg-white/5 p-4 rounded-2xl border border-white/15 text-xs text-slate-200">
                    <div className="flex justify-between pb-1.5 border-b border-white/10">
                      <span className="text-slate-400">Service:</span>
                      <span className="font-bold text-white uppercase">{serviceType}</span>
                    </div>
                    <div className="flex justify-between pb-1.5 border-b border-white/10">
                      <span className="text-slate-400">Pickup:</span>
                      <span className="font-semibold text-white truncate max-w-[180px]">{pickup}</span>
                    </div>
                    <div className="flex justify-between pb-1.5 border-b border-white/10">
                      <span className="text-slate-400">Destination:</span>
                      <span className="font-semibold text-white truncate max-w-[180px]">{dropoff}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Vehicle:</span>
                      <span className="font-bold text-[#F5D061]">{selectedVehicle.name}</span>
                    </div>
                  </div>
                )}

                {/* Step Action Buttons */}
                <div className="flex items-center justify-between pt-2">
                  {activeStep > 1 && (
                    <button
                      type="button"
                      onClick={() => setActiveStep(activeStep - 1)}
                      className="text-xs font-semibold text-slate-400 hover:text-white"
                    >
                      Back
                    </button>
                  )}

                  {activeStep < 4 ? (
                    <button
                      type="button"
                      onClick={() => setActiveStep(activeStep + 1)}
                      className="ml-auto px-5 py-2.5 bg-[#00509D] hover:bg-blue-600 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-md"
                    >
                      <span>Next</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-[60px] bg-gradient-to-r from-[#00509D] via-blue-600 to-[#134074] hover:shadow-royal text-white font-extrabold text-sm rounded-2xl flex items-center justify-center gap-2 border border-blue-400/30 transition-all"
                    >
                      {isSubmitting ? 'Processing Request...' : 'Submit Booking Request'}
                    </button>
                  )}
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ========================================== */}
      {/* BOTTOM TRANSITION WAVE                     */}
      {/* ========================================== */}
      <div className="relative w-full h-16 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#FAFCFF]" />
      </div>
    </section>
  );
};
