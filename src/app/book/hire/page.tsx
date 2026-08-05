'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Car,
  Calendar,
  MapPin,
  Briefcase,
  Users,
  CheckCircle2,
  MessageCircle,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  Building2,
  Heart,
  Globe,
  UserCheck,
  Star,
  ShieldCheck,
  Clock,
  Key,
  Shield,
} from 'lucide-react';
import { LuxuryButton } from '@/components/ui/luxury-button';
import { subscribeToPublicFleet } from '@/lib/firebase/services/fleet-service';
import { createBookingRequest } from '@/lib/firebase/services/booking-service';
import { formatCurrency, generateBookingRef, generateWhatsAppUrl } from '@/lib/utils';
import { Vehicle } from '@/types';

// ─── Purpose options ────────────────────────────────────────────────────────
const PURPOSE_OPTIONS = [
  { id: 'business',   label: 'Business',           icon: <Building2 className="w-4 h-4" /> },
  { id: 'wedding',    label: 'Wedding',             icon: <Heart className="w-4 h-4" /> },
  { id: 'personal',   label: 'Personal',            icon: <Star className="w-4 h-4" /> },
  { id: 'tourism',    label: 'Tourism',             icon: <Globe className="w-4 h-4" /> },
  { id: 'official',   label: 'Official Assignment', icon: <ShieldCheck className="w-4 h-4" /> },
];

function CarHireContent() {
  const router = useRouter();

  const [fleet, setFleet] = useState<Vehicle[]>([]);

  useEffect(() => {
    const unsub = subscribeToPublicFleet((data) => {
      setFleet(data);
      if (data.length > 0 && !selectedVehicle) {
        setSelectedVehicle(data[0]);
      }
    });
    return () => unsub();
  }, []);

  // Form state
  const [hireType, setHireType]               = useState<'chauffeur' | 'self'>('chauffeur');
  const [startDate, setStartDate]             = useState('');
  const [endDate, setEndDate]                 = useState('');
  const [pickupLocation, setPickupLocation]   = useState('');
  const [returnLocation, setReturnLocation]   = useState('');
  const [purpose, setPurpose]                 = useState('business');
  const [vehicleCategory, setVehicleCategory] = useState('');
  const [additionalRequests, setAdditionalRequests] = useState('');
  const [driversLicense, setDriversLicense]   = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  // Customer + submission
  const [customerName, setCustomerName]   = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  
  const [showContactForm, setShowContactForm]   = useState(false);
  const [isSubmitting, setIsSubmitting]   = useState(false);
  const [isSuccess, setIsSuccess]         = useState(false);
  const [refCode, setRefCode]             = useState('');

  // Rental days calculation
  const rentalDays = startDate && endDate
    ? Math.max(1, Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / 86400000))
    : 1;

  const filteredVehicles = vehicleCategory
    ? fleet.filter(v => v.categoryName === vehicleCategory)
    : fleet;

  const handleShowVehicles = (e: React.FormEvent) => {
    e.preventDefault();
    setShowContactForm(false);
    document.getElementById('hire-vehicle-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectVehicle = (v: Vehicle) => {
    setSelectedVehicle(v);
    setShowContactForm(true);
    setTimeout(() => {
      document.getElementById('hire-contact-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !selectedVehicle) {
      alert('Please fill in your name and phone number, and select a vehicle.');
      return;
    }
    setIsSubmitting(true);
    const code = generateBookingRef();
    await createBookingRequest({
      referenceCode: code,
      serviceType: `car-hire-${hireType}-${purpose}`,
      pickupLocation,
      dropoffLocation: returnLocation,
      pickupDate: startDate,
      pickupTime: '08:00',
      vehicleId: selectedVehicle.id,
      vehicleName: selectedVehicle.name,
      vehicleImage: selectedVehicle.image,
      addons: hireType === 'self' && driversLicense ? [`License: ${driversLicense}`] : [],
      customerName,
      customerPhone,
      customerEmail,
      specialRequests: `${hireType === 'self' ? '[SELF DRIVE RENTAL] ' : '[CHAUFFEUR DRIVEN] '}${additionalRequests}`,
      estimatedPrice: selectedVehicle.pricePerDay * rentalDays,
    });
    setIsSubmitting(false);
    setRefCode(code);
    setIsSuccess(true);
  };

  const whatsappUrl = selectedVehicle ? generateWhatsAppUrl({
    referenceCode: refCode,
    customerName,
    serviceType: `Car Hire (${hireType === 'self' ? 'Self Drive' : 'Chauffeur Driven'}) — ${purpose} (${rentalDays} day${rentalDays > 1 ? 's' : ''})`,
    pickupLocation,
    dropoffLocation: returnLocation,
    pickupDate: startDate,
    pickupTime: '08:00',
    vehicleName: selectedVehicle.name,
    estimatedPrice: selectedVehicle.pricePerDay * rentalDays,
  }) : '#';

  return (
    <main className="min-h-screen bg-white text-[#0E1726]">

      {/* ── HERO WITH AUTOPLAYING VIDEO BACKDROP ───────────────────────── */}
      <section className="relative min-h-[460px] h-[65vh] w-full bg-[#0B192C] text-white flex flex-col justify-between overflow-hidden pt-28">
        {/* Background Video Layer */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            src="/images/nigerian_driver_alone_1785747001406.png"
            alt="ChimJoy Fleet Hire"
            className="absolute inset-0 w-full h-full object-cover filter contrast-110 brightness-90 scale-105 opacity-80"
          />
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster="/images/nigerian_driver_alone_1785747001406.png"
            className="absolute inset-0 w-full h-full object-cover filter contrast-110 brightness-90 scale-105"
          >
            <source src="/videos/hero-video.mp4" type="video/mp4" />
            <source src="/videos/hero-video-opt.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B192C] via-[#0B192C]/85 to-[#0B192C]/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B192C] via-transparent to-[#0B192C]/80" />
        </div>

        {/* Hero Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full my-auto py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="max-w-3xl space-y-4"
          >


            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-black text-[#9BC800] uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#9BC800] animate-pulse" />
              <span>CAR HIRE & FLEET RENTAL</span>
            </div>

            <h1 className="font-display text-3xl sm:text-5xl lg:text-[54px] font-black tracking-tight leading-[1.1] text-white drop-shadow-md">
              Hire a Vehicle <span className="text-[#9BC800]">Your Way.</span>
            </h1>

            <p className="text-slate-200 text-base sm:text-lg font-medium leading-relaxed max-w-2xl">
              Chauffeur-driven or Self-Drive options available. Daily, weekly, or corporate hire with transparent pricing and clean executive vehicles.
            </p>

            {/* USPs pill badges */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {[
                { icon: <UserCheck className="w-4 h-4 text-[#9BC800]" />, text: 'Chauffeur Driven' },
                { icon: <Key className="w-4 h-4 text-[#9BC800]" />, text: 'Self Drive Available' },
                { icon: <ShieldCheck className="w-4 h-4 text-[#9BC800]" />, text: 'Fully Insured' },
                { icon: <Clock className="w-4 h-4 text-[#9BC800]" />, text: 'Flexible Rental Days' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-3.5 py-1.5 text-xs font-extrabold text-white">
                  {item.icon}
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Trust Strip */}
        <div className="relative z-20 w-full bg-[#0B192C]/90 backdrop-blur-xl border-t border-white/10 py-3.5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-black uppercase tracking-wider text-white">
              <div className="flex items-center justify-center gap-2.5 p-1 text-center sm:text-left">
                <Car className="w-5 h-5 text-[#9BC800] shrink-0" />
                <span>Executive SUVs & Sedans</span>
              </div>
              <div className="flex items-center justify-center gap-2.5 p-1 text-center sm:text-left">
                <Key className="w-5 h-5 text-[#9BC800] shrink-0" />
                <span>Self-Drive Ready</span>
              </div>
              <div className="flex items-center justify-center gap-2.5 p-1 text-center sm:text-left">
                <ShieldCheck className="w-5 h-5 text-[#9BC800] shrink-0" />
                <span>Sanitized & Insured</span>
              </div>
              <div className="flex items-center justify-center gap-2.5 p-1 text-center sm:text-left">
                <Clock className="w-5 h-5 text-[#9BC800] shrink-0" />
                <span>Instant WhatsApp Dispatch</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HIRE FORM (MODERN CLASSIC & SMART) ────────────────────────── */}
      <section className="py-14 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-2"
          >
            <span className="text-xs font-black uppercase tracking-widest text-[#003366] bg-[#003366]/10 px-4 py-1.5 rounded-full border border-[#003366]/15">
              STEP 1 — YOUR RENTAL DETAILS
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#0E1726]">
              Configure Your Rental
            </h2>
            <p className="text-sm text-[#475569] font-medium">
              Choose your hire type, duration, and purpose below.
            </p>
          </motion.div>

          <form onSubmit={handleShowVehicles} className="space-y-8">

            {/* Hire Type Toggle — Both Chauffeur & Self-Drive Active */}
            <div className="space-y-3">
              <label className="text-xs font-black uppercase tracking-widest text-[#0E1726]">Select Hire Type</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                {/* Chauffeur Driven Button */}
                <motion.button
                  type="button"
                  whileHover={{ y: -2, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setHireType('chauffeur')}
                  className={`p-5 rounded-2xl border-2 text-left transition-all duration-200 cursor-pointer ${
                    hireType === 'chauffeur'
                      ? 'bg-[#0B192C] border-[#9BC800] text-white shadow-[0_0_25px_rgba(155,200,0,0.35)]'
                      : 'bg-[#F4F6F9] border-[#0B192C]/10 hover:border-[#9BC800]/50 hover:bg-white text-[#0E1726]'
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <div className={`p-3 rounded-xl ${hireType === 'chauffeur' ? 'bg-[#9BC800] text-[#0B192C]' : 'bg-[#003366] text-white'}`}>
                      <UserCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-display font-black text-base">Chauffeur Driven</h3>
                        <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
                          hireType === 'chauffeur' ? 'bg-[#9BC800] text-[#0B192C]' : 'bg-[#003366]/15 text-[#003366]'
                        }`}>Popular</span>
                      </div>
                      <p className={`text-xs mt-1 font-medium ${hireType === 'chauffeur' ? 'text-slate-300' : 'text-[#475569]'}`}>
                        Professional vetted driver included for your entire trip
                      </p>
                    </div>
                  </div>
                </motion.button>

                {/* Self Drive Button — FULLY ACTIVE & SELECTABLE */}
                <motion.button
                  type="button"
                  whileHover={{ y: -2, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setHireType('self')}
                  className={`p-5 rounded-2xl border-2 text-left transition-all duration-200 cursor-pointer ${
                    hireType === 'self'
                      ? 'bg-[#0B192C] border-[#9BC800] text-white shadow-[0_0_25px_rgba(155,200,0,0.35)]'
                      : 'bg-[#F4F6F9] border-[#0B192C]/10 hover:border-[#9BC800]/50 hover:bg-white text-[#0E1726]'
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <div className={`p-3 rounded-xl ${hireType === 'self' ? 'bg-[#9BC800] text-[#0B192C]' : 'bg-[#003366] text-white'}`}>
                      <Key className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-display font-black text-base">Self Drive</h3>
                        <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
                          hireType === 'self' ? 'bg-[#9BC800] text-[#0B192C]' : 'bg-[#9BC800]/20 text-[#0B192C]'
                        }`}>Available Now</span>
                      </div>
                      <p className={`text-xs mt-1 font-medium ${hireType === 'self' ? 'text-slate-300' : 'text-[#475569]'}`}>
                        Drive yourself • Valid Driver's License & ID required
                      </p>
                    </div>
                  </div>
                </motion.button>

              </div>
            </div>

            {/* Self-Drive License Field (Appears when Self-Drive selected) */}
            <AnimatePresence>
              {hireType === 'self' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="relative group"
                >
                  <label className="absolute -top-2.5 left-4 bg-white px-1 text-[10px] font-black uppercase tracking-widest text-[#003366] z-10">
                    Driver's License Number / National ID
                  </label>
                  <div className="flex items-center gap-3 border-2 border-[#0B192C]/20 group-focus-within:border-[#9BC800] rounded-2xl px-4 py-4 transition-all duration-200 bg-white shadow-sm">
                    <Shield className="w-5 h-5 text-[#9BC800] shrink-0" />
                    <input
                      type="text"
                      value={driversLicense}
                      onChange={e => setDriversLicense(e.target.value)}
                      placeholder="e.g. IMO-884920-AB or NIN Number"
                      className="w-full text-sm font-medium text-[#0E1726] placeholder-[#475569]/50 focus:outline-none bg-transparent"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Date Range — Modern Floating Label Design */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="relative group">
                <label className="absolute -top-2.5 left-4 bg-white px-1 text-[10px] font-black uppercase tracking-widest text-[#003366] z-10">
                  Rental Start Date
                </label>
                <div className="flex items-center gap-3 border-2 border-[#0B192C]/20 group-focus-within:border-[#9BC800] rounded-2xl px-4 py-4 transition-all duration-200 bg-white shadow-sm">
                  <Calendar className="w-5 h-5 text-[#9BC800] shrink-0" />
                  <input
                    type="date"
                    required
                    value={startDate}
                    onChange={e => setStartDate(e.target.value)}
                    className="w-full text-sm font-medium text-[#0E1726] focus:outline-none bg-transparent [color-scheme:light]"
                  />
                </div>
              </div>

              <div className="relative group">
                <label className="absolute -top-2.5 left-4 bg-white px-1 text-[10px] font-black uppercase tracking-widest text-[#003366] z-10">
                  Rental End Date
                </label>
                <div className="flex items-center gap-3 border-2 border-[#0B192C]/20 group-focus-within:border-[#9BC800] rounded-2xl px-4 py-4 transition-all duration-200 bg-white shadow-sm">
                  <Calendar className="w-5 h-5 text-[#003366] shrink-0" />
                  <input
                    type="date"
                    required
                    value={endDate}
                    onChange={e => setEndDate(e.target.value)}
                    min={startDate}
                    className="w-full text-sm font-medium text-[#0E1726] focus:outline-none bg-transparent [color-scheme:light]"
                  />
                </div>
                {startDate && endDate && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute -top-2.5 right-4 bg-[#9BC800] text-[#0B192C] text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-sm"
                  >
                    {rentalDays} day{rentalDays > 1 ? 's' : ''} rental
                  </motion.span>
                )}
              </div>
            </div>

            {/* Location Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="relative group">
                <label className="absolute -top-2.5 left-4 bg-white px-1 text-[10px] font-black uppercase tracking-widest text-[#003366] z-10">
                  Pickup Location
                </label>
                <div className="flex items-center gap-3 border-2 border-[#0B192C]/20 group-focus-within:border-[#9BC800] rounded-2xl px-4 py-4 transition-all duration-200 bg-white shadow-sm">
                  <MapPin className="w-5 h-5 text-[#9BC800] shrink-0" />
                  <input
                    type="text"
                    required
                    value={pickupLocation}
                    onChange={e => setPickupLocation(e.target.value)}
                    placeholder="e.g. Concorde Hotel, Owerri or Airport QOW"
                    className="w-full text-sm font-medium text-[#0E1726] placeholder-[#475569]/50 focus:outline-none bg-transparent"
                  />
                </div>
              </div>

              <div className="relative group">
                <label className="absolute -top-2.5 left-4 bg-white px-1 text-[10px] font-black uppercase tracking-widest text-[#003366] z-10">
                  Return Location
                </label>
                <div className="flex items-center gap-3 border-2 border-[#0B192C]/20 group-focus-within:border-[#9BC800] rounded-2xl px-4 py-4 transition-all duration-200 bg-white shadow-sm">
                  <MapPin className="w-5 h-5 text-[#003366] shrink-0" />
                  <input
                    type="text"
                    value={returnLocation}
                    onChange={e => setReturnLocation(e.target.value)}
                    placeholder="Same as pickup or specify return city"
                    className="w-full text-sm font-medium text-[#0E1726] placeholder-[#475569]/50 focus:outline-none bg-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Purpose Selector Pills */}
            <div className="space-y-3">
              <label className="text-xs font-black uppercase tracking-widest text-[#0E1726]">Purpose of Hire</label>
              <div className="flex flex-wrap gap-3">
                {PURPOSE_OPTIONS.map(opt => {
                  const isActive = purpose === opt.id;
                  return (
                    <motion.button
                      type="button"
                      key={opt.id}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setPurpose(opt.id)}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-full border text-xs font-black transition-all duration-200 cursor-pointer ${
                        isActive
                          ? 'bg-[#0B192C] border-[#9BC800] text-white shadow-[0_0_15px_rgba(155,200,0,0.25)]'
                          : 'bg-white border-[#0B192C]/15 text-[#475569] hover:border-[#9BC800]/50 hover:text-[#0B192C]'
                      }`}
                    >
                      <span className={isActive ? 'text-[#9BC800]' : 'text-[#003366]'}>{opt.icon}</span>
                      {opt.label}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Vehicle Category */}
            <div className="relative group">
              <label className="absolute -top-2.5 left-4 bg-white px-1 text-[10px] font-black uppercase tracking-widest text-[#003366] z-10">
                Vehicle Category
              </label>
              <div className="flex items-center gap-3 border-2 border-[#0B192C]/20 group-focus-within:border-[#9BC800] rounded-2xl px-4 py-4 transition-all duration-200 bg-white shadow-sm">
                <Car className="w-5 h-5 text-[#9BC800] shrink-0" />
                <select
                  value={vehicleCategory}
                  onChange={e => setVehicleCategory(e.target.value)}
                  className="w-full text-sm font-medium text-[#0E1726] focus:outline-none bg-transparent appearance-none cursor-pointer"
                >
                  <option value="">Any vehicle category (show all)</option>
                  <option value="SUVs">Executive SUVs (Prado, Land Cruiser)</option>
                  <option value="Executive Cars">Executive Sedans (Camry, Mercedes)</option>
                  <option value="Luxury Vehicles">Luxury Fleet (Lexus LX570)</option>
                  <option value="Mini Bus">Executive Buses (Toyota HiAce 14-seater)</option>
                  <option value="Economy Cars">Economy Sedans (Corolla)</option>
                </select>
                <ChevronDown className="w-4 h-4 text-[#475569] shrink-0" />
              </div>
            </div>

            {/* Additional Requests */}
            <div className="relative group">
              <label className="absolute -top-2.5 left-4 bg-white px-1 text-[10px] font-black uppercase tracking-widest text-[#003366] z-10">
                Additional Requests <span className="font-normal normal-case text-[#475569]">(Optional)</span>
              </label>
              <textarea
                rows={3}
                value={additionalRequests}
                onChange={e => setAdditionalRequests(e.target.value)}
                placeholder="e.g. Early morning pickup at 7am, airport meeting, vehicle branding, security escort..."
                className="w-full border-2 border-[#0B192C]/20 focus:border-[#9BC800] rounded-2xl px-4 py-4 text-sm font-medium text-[#0E1726] placeholder-[#475569]/50 focus:outline-none transition-all duration-200 resize-none bg-white shadow-sm"
              />
            </div>

            {/* Submit Button */}
            <LuxuryButton type="submit" variant="lemon" size="xl" icon={<ArrowRight className="w-5 h-5" />} className="w-full sm:w-auto">
              Choose Vehicle for Hire
            </LuxuryButton>
          </form>
        </div>
      </section>

      {/* ── VEHICLE SELECTION SECTION ────────────────────────────────── */}
      <section id="hire-vehicle-section" className="py-14 bg-[#0B192C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="text-center max-w-2xl mx-auto space-y-3"
          >
            <span className="text-xs font-black uppercase tracking-widest text-[#9BC800] bg-white/10 px-4 py-1.5 rounded-full border border-white/20">
              STEP 2 — SELECT YOUR CAR
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
              Available Fleet for {hireType === 'self' ? 'Self Drive' : 'Chauffeur Hire'}
            </h2>
            <p className="text-slate-300 text-sm font-medium">
              {startDate && endDate
                ? `${rentalDays}-day total calculated rate shown per vehicle.`
                : 'Daily rates shown below.'}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVehicles.map((v, idx) => {
              const isSelected = selectedVehicle?.id === v.id;
              const totalPrice = v.pricePerDay * rentalDays;
              return (
                <motion.div
                  key={v.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: idx * 0.07 }}
                  whileHover={{ y: -6, scale: 1.01 }}
                  onClick={() => handleSelectVehicle(v)}
                  className={`rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 flex flex-col ${
                    isSelected
                      ? 'bg-[#081322] border-2 border-[#9BC800] shadow-[0_0_35px_rgba(155,200,0,0.3)] ring-2 ring-[#9BC800]/50'
                      : 'bg-white/10 backdrop-blur-sm border border-white/15 hover:bg-white/15 hover:border-[#9BC800]/60'
                  }`}
                >
                  {/* Photo */}
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={v.image || v.coverImage || '/images/suv_prado_1.jpg'}
                      alt={v.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B192C]/80 via-transparent to-transparent" />

                    {/* Category badge */}
                    <span className="absolute top-3 left-3 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-[#9BC800] text-[#0B192C]">
                      {v.categoryName}
                    </span>

                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#9BC800] text-[#0B192C] text-xs font-black flex items-center gap-1 shadow-md"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#0B192C]" />
                        <span>Selected</span>
                      </motion.div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-5 flex flex-col flex-1 gap-4 text-white">
                    <div>
                      <h3 className="font-display font-black text-lg leading-tight text-white">{v.name}</h3>
                      <p className="text-xs font-medium mt-1 leading-relaxed line-clamp-2 text-slate-300">
                        {v.description}
                      </p>
                    </div>

                    {/* Specs */}
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { icon: <Users className="w-3.5 h-3.5" />, value: `${v.passengers} seats` },
                        { icon: <Briefcase className="w-3.5 h-3.5" />, value: `${v.luggage} bags` },
                        { icon: <Car className="w-3.5 h-3.5" />, value: v.transmission },
                        { icon: hireType === 'self' ? <Key className="w-3.5 h-3.5" /> : <UserCheck className="w-3.5 h-3.5" />, value: hireType === 'self' ? 'Self Drive' : 'Chauffeur Included' },
                      ].map((spec, i) => (
                        <div key={i} className="flex items-center gap-2 rounded-xl p-2.5 bg-white/10 border border-white/5">
                          <span className="text-[#9BC800]">{spec.icon}</span>
                          <span className="text-[11px] font-black text-white">{spec.value}</span>
                        </div>
                      ))}
                    </div>

                    {/* Price + CTA */}
                    <div className="mt-auto pt-4 border-t border-white/15 flex items-center justify-between gap-3">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider block text-slate-400">
                          {rentalDays > 1 ? `${rentalDays}-day total` : 'Per Day'}
                        </span>
                        <span className="font-display text-xl font-black text-[#9BC800]">
                          {formatCurrency(totalPrice)}
                        </span>
                      </div>
                      <motion.button
                        type="button"
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleSelectVehicle(v)}
                        className={`px-4 py-2.5 rounded-full text-xs font-black border transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? 'bg-[#9BC800] text-[#0B192C] border-[#9BC800]'
                            : 'bg-white/10 text-white border-white/20 hover:bg-[#9BC800] hover:text-[#0B192C]'
                        }`}
                      >
                        {isSelected ? '✓ Selected' : 'Select Vehicle'}
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CONTACT & CONFIRMATION SECTION ───────────────────────────── */}
      <AnimatePresence>
        {showContactForm && selectedVehicle && (
          <motion.section
            id="hire-contact-section"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.5 }}
            className="py-14 bg-[#F4F6F9]"
          >
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              <div className="space-y-2">
                <span className="text-xs font-black uppercase tracking-widest text-[#003366] bg-[#003366]/10 px-4 py-1.5 rounded-full border border-[#003366]/15">
                  STEP 3 — CONFIRM CONTACT DETAILS
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#0E1726]">
                  Complete Your Hire Request
                </h2>
              </div>

              {/* Selected Recap Card */}
              <div className="bg-white rounded-2xl p-5 border border-[#9BC800]/30 shadow-sm">
                <div className="flex items-center gap-4">
                  <img src={selectedVehicle.image} alt={selectedVehicle.name} className="w-24 h-16 object-cover rounded-xl shrink-0" />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-black uppercase text-[#9BC800]">{selectedVehicle.categoryName}</span>
                    <h4 className="font-display font-black text-base text-[#0E1726] truncate">{selectedVehicle.name}</h4>
                    <span className="text-xs text-[#475569] font-medium">
                      {hireType === 'self' ? 'Self Drive' : 'Chauffeur Driven'} • {rentalDays} day{rentalDays > 1 ? 's' : ''} • {PURPOSE_OPTIONS.find(p => p.id === purpose)?.label}
                    </span>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-display text-xl font-black text-[#0B192C]">{formatCurrency(selectedVehicle.pricePerDay * rentalDays)}</span>
                    <span className="text-[10px] text-[#475569] block">Est. total</span>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="relative group">
                  <label className="absolute -top-2.5 left-4 bg-[#F4F6F9] px-1 text-[10px] font-black uppercase tracking-widest text-[#003366] z-10">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={e => setCustomerName(e.target.value)}
                    placeholder="e.g. Chief Emeka Okonkwo"
                    className="w-full border-2 border-[#0B192C]/20 focus:border-[#9BC800] rounded-2xl px-4 py-4 text-sm font-medium text-[#0E1726] placeholder-[#475569]/50 focus:outline-none transition-all duration-200 bg-white shadow-sm"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="relative group">
                    <label className="absolute -top-2.5 left-4 bg-[#F4F6F9] px-1 text-[10px] font-black uppercase tracking-widest text-[#003366] z-10">
                      Phone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={e => setCustomerPhone(e.target.value)}
                      placeholder="+234 803 000 0000"
                      className="w-full border-2 border-[#0B192C]/20 focus:border-[#9BC800] rounded-2xl px-4 py-4 text-sm font-medium text-[#0E1726] placeholder-[#475569]/50 focus:outline-none transition-all duration-200 bg-white shadow-sm"
                    />
                  </div>
                  <div className="relative group">
                    <label className="absolute -top-2.5 left-4 bg-[#F4F6F9] px-1 text-[10px] font-black uppercase tracking-widest text-[#003366] z-10">
                      Email <span className="font-normal normal-case text-[#475569]">(Optional)</span>
                    </label>
                    <input
                      type="email"
                      value={customerEmail}
                      onChange={e => setCustomerEmail(e.target.value)}
                      placeholder="name@company.ng"
                      className="w-full border-2 border-[#0B192C]/20 focus:border-[#9BC800] rounded-2xl px-4 py-4 text-sm font-medium text-[#0E1726] placeholder-[#475569]/50 focus:outline-none transition-all duration-200 bg-white shadow-sm"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <LuxuryButton
                    type="submit"
                    variant="lemon"
                    size="xl"
                    disabled={isSubmitting}
                    icon={<CheckCircle2 className="w-5 h-5" />}
                    className="w-full sm:w-auto"
                  >
                    {isSubmitting ? 'Submitting Request...' : 'Submit Hire Request'}
                  </LuxuryButton>
                  <p className="text-xs text-[#475569] mt-3 font-medium">
                    No online payment required. Pay on confirmation.
                  </p>
                </div>
              </form>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ── SUCCESS MODAL ────────────────────────────────────────────── */}
      <AnimatePresence>
        {isSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B192C]/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center space-y-6"
            >
              <div className="w-16 h-16 rounded-full bg-[#9BC800]/15 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10 text-[#9BC800]" />
              </div>
              <div className="space-y-2">
                <h3 className="font-display text-2xl font-black text-[#0E1726]">Hire Request Submitted!</h3>
                <p className="text-sm text-[#475569] font-medium">
                  Reference: <span className="font-black text-[#0B192C]">{refCode}</span>
                </p>
                <p className="text-sm text-[#475569] font-medium">
                  Thank you, {customerName}! Our team will contact you shortly to confirm your vehicle reservation.
                </p>
              </div>
              <div className="bg-[#F4F6F9] rounded-2xl p-4 text-left space-y-3">
                <span className="text-xs font-black uppercase tracking-wider text-[#003366]">Speed up confirmation:</span>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 px-4 rounded-xl font-bold text-sm shadow-md hover:bg-[#128C7E] transition-colors"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  Send Hire Request via WhatsApp
                </a>
              </div>
              <button
                onClick={() => { setIsSuccess(false); router.push('/'); }}
                className="text-xs font-bold text-[#475569] hover:text-[#0B192C] transition-colors"
              >
                Return to Homepage
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

export default function CarHirePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 rounded-full border-4 border-[#9BC800] border-t-transparent animate-spin mx-auto" />
          <p className="text-sm font-bold text-[#475569]">Loading Car Hire...</p>
        </div>
      </div>
    }>
      <CarHireContent />
    </Suspense>
  );
}
