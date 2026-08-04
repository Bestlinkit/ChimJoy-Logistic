'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plane,
  Car,
  MapPin,
  Calendar,
  Clock,
  Users,
  Briefcase,
  ArrowRight,
  CheckCircle2,
  MessageCircle,
  ChevronDown,
  Heart,
  Building2,
  Star,
  UserCheck,
  ShieldCheck,
  Sparkles,
  ArrowLeft,
} from 'lucide-react';
import { LuxuryButton } from '@/components/ui/luxury-button';
import { subscribeToPublicFleet } from '@/lib/firebase/services/fleet-service';
import { createBookingRequest } from '@/lib/firebase/services/booking-service';
import { formatCurrency, generateBookingRef, generateWhatsAppUrl } from '@/lib/utils';
import { Vehicle } from '@/types';

// ─── Service Types ──────────────────────────────────────────────────────────
const SERVICE_TYPES = [
  { id: 'airport-pickup',    label: 'Airport Pickup',           icon: <Plane className="w-5 h-5" />,       showFlight: true  },
  { id: 'airport-dropoff',   label: 'Airport Drop-off',         icon: <Plane className="w-5 h-5" />,       showFlight: true  },
  { id: 'within-owerri',     label: 'Within Owerri',            icon: <MapPin className="w-5 h-5" />,      showFlight: false },
  { id: 'interstate',        label: 'Inter-state Trip',         icon: <Car className="w-5 h-5" />,         showFlight: false },
  { id: 'wedding',           label: 'Wedding Transportation',   icon: <Heart className="w-5 h-5" />,       showFlight: false },
  { id: 'event',             label: 'Event Transportation',     icon: <Sparkles className="w-5 h-5" />,    showFlight: false },
  { id: 'corporate',         label: 'Corporate Transportation', icon: <Building2 className="w-5 h-5" />,   showFlight: false },
  { id: 'executive',         label: 'Executive Chauffeur',      icon: <Star className="w-5 h-5" />,        showFlight: false },
];

function RideBookingContent() {
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
  const [serviceType, setServiceType]         = useState('airport-pickup');
  const [pickupAddress, setPickupAddress]     = useState('');
  const [destination, setDestination]         = useState('');
  const [pickupDate, setPickupDate]           = useState('');
  const [pickupTime, setPickupTime]           = useState('');
  const [passengers, setPassengers]           = useState(1);
  const [bags, setBags]                       = useState(1);
  const [vehicleCategory, setVehicleCategory] = useState('');
  const [flightNumber, setFlightNumber]       = useState('');
  const [specialRequests, setSpecialRequests] = useState('');

  // Vehicle selection
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  // Customer info + submission
  const [customerName, setCustomerName]   = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [isSubmitting, setIsSubmitting]   = useState(false);
  const [isSuccess, setIsSuccess]         = useState(false);
  const [refCode, setRefCode]             = useState('');
  const [showContactForm, setShowContactForm] = useState(false);

  const selectedService = SERVICE_TYPES.find(s => s.id === serviceType);
  const showFlightField = selectedService?.showFlight ?? false;

  const filteredVehicles = vehicleCategory
    ? fleet.filter(v => v.categoryName === vehicleCategory)
    : fleet;

  const handleFindVehicles = (e: React.FormEvent) => {
    e.preventDefault();
    setShowContactForm(false);
    // Scroll to vehicle section
    document.getElementById('vehicle-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectVehicle = (v: Vehicle) => {
    setSelectedVehicle(v);
    setShowContactForm(true);
    setTimeout(() => {
      document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
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
      serviceType,
      pickupLocation: pickupAddress,
      dropoffLocation: destination,
      pickupDate,
      pickupTime,
      flightNumber,
      vehicleId: selectedVehicle.id,
      vehicleName: selectedVehicle.name,
      vehicleImage: selectedVehicle.image,
      addons: [],
      customerName,
      customerPhone,
      customerEmail,
      specialRequests,
      estimatedPrice: selectedVehicle.pricePerDay,
    });
    setIsSubmitting(false);
    setRefCode(code);
    setIsSuccess(true);
  };

  const whatsappUrl = selectedVehicle ? generateWhatsAppUrl({
    referenceCode: refCode,
    customerName,
    serviceType,
    pickupLocation: pickupAddress,
    dropoffLocation: destination,
    pickupDate,
    pickupTime,
    vehicleName: selectedVehicle.name,
    estimatedPrice: selectedVehicle.pricePerDay,
  }) : '#';

  return (
    <main className="min-h-screen bg-white text-[#0E1726]">

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative min-h-[420px] w-full bg-[#0B192C] text-white flex flex-col justify-end overflow-hidden pt-28 pb-0">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src="/images/nigerian_driver_alone_1785747001406.png"
            alt="ChimJoy Executive Fleet"
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
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B192C] via-transparent to-[#0B192C]/60" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl space-y-4"
          >

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-black text-[#9BC800] uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#9BC800] animate-pulse" />
              <span>RIDE BOOKING</span>
            </div>
            <h1 className="font-display text-3xl sm:text-5xl font-black tracking-tight leading-[1.1] text-white">
              Book Your Ride.<br />We Handle the Rest.
            </h1>
            <p className="text-slate-300 text-base font-medium leading-relaxed max-w-xl">
              Airport pickups, executive transfers, interstate trips, weddings and more. Professional drivers, clean vehicles, on-time every time.
            </p>
          </motion.div>
        </div>

        {/* Trust bar */}
        <div className="relative z-10 w-full bg-[#0B192C]/90 backdrop-blur-xl border-t border-white/10 py-3">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs font-black uppercase tracking-wider text-white">
              {[
                { icon: <Plane className="w-4 h-4 text-[#9BC800]" />, label: 'Airport Pickup' },
                { icon: <UserCheck className="w-4 h-4 text-[#9BC800]" />, label: 'Professional Drivers' },
                { icon: <ShieldCheck className="w-4 h-4 text-[#9BC800]" />, label: 'Clean Vehicles' },
                { icon: <Clock className="w-4 h-4 text-[#9BC800]" />, label: '24/7 Support' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-center gap-2 p-2">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── BOOKING FORM ─────────────────────────────────────────────── */}
      <section className="py-14 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-10"
          >
            {/* Section header */}
            <div className="space-y-2">
              <span className="text-xs font-black uppercase tracking-widest text-[#003366] bg-[#003366]/10 px-4 py-1.5 rounded-full border border-[#003366]/15">
                STEP 1 — YOUR TRIP DETAILS
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#0E1726]">
                Tell us about your journey.
              </h2>
            </div>

            <form onSubmit={handleFindVehicles} className="space-y-8">

              {/* Service Type Grid */}
              <div className="space-y-3">
                <label className="text-xs font-black uppercase tracking-widest text-[#0E1726]">
                  Select Service Type
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {SERVICE_TYPES.map(s => {
                    const isActive = serviceType === s.id;
                    return (
                      <motion.button
                        type="button"
                        key={s.id}
                        whileHover={{ y: -2, scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setServiceType(s.id)}
                        className={`p-3.5 rounded-2xl border text-left flex flex-col gap-2 transition-all duration-200 cursor-pointer ${
                          isActive
                            ? 'bg-[#0B192C] border-[#9BC800] shadow-[0_0_20px_rgba(155,200,0,0.3)] text-white'
                            : 'bg-[#F4F6F9] border-[#0B192C]/10 hover:border-[#9BC800]/50 hover:bg-white text-[#0E1726]'
                        }`}
                      >
                        <span className={isActive ? 'text-[#9BC800]' : 'text-[#003366]'}>{s.icon}</span>
                        <span className="text-[11px] font-black leading-tight">{s.label}</span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Route Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Pickup */}
                <div className="relative group">
                  <label className="absolute -top-2.5 left-4 bg-white px-1 text-[10px] font-black uppercase tracking-widest text-[#003366] z-10">
                    Pickup Address
                  </label>
                  <div className="flex items-center gap-3 border-2 border-[#0B192C]/20 group-focus-within:border-[#9BC800] rounded-2xl px-4 py-4 transition-all duration-200 bg-white shadow-sm">
                    <MapPin className="w-5 h-5 text-[#9BC800] shrink-0" />
                    <input
                      type="text"
                      required
                      value={pickupAddress}
                      onChange={e => setPickupAddress(e.target.value)}
                      placeholder="e.g. Sam Mbakwe Airport or your hotel"
                      className="w-full text-sm font-medium text-[#0E1726] placeholder-[#475569]/50 focus:outline-none bg-transparent"
                    />
                  </div>
                </div>

                {/* Destination */}
                <div className="relative group">
                  <label className="absolute -top-2.5 left-4 bg-white px-1 text-[10px] font-black uppercase tracking-widest text-[#003366] z-10">
                    Destination
                  </label>
                  <div className="flex items-center gap-3 border-2 border-[#0B192C]/20 group-focus-within:border-[#9BC800] rounded-2xl px-4 py-4 transition-all duration-200 bg-white shadow-sm">
                    <MapPin className="w-5 h-5 text-[#003366] shrink-0" />
                    <input
                      type="text"
                      required
                      value={destination}
                      onChange={e => setDestination(e.target.value)}
                      placeholder="e.g. Protea Hotel Owerri or Port Harcourt GRA"
                      className="w-full text-sm font-medium text-[#0E1726] placeholder-[#475569]/50 focus:outline-none bg-transparent"
                    />
                  </div>
                </div>

                {/* Date */}
                <div className="relative group">
                  <label className="absolute -top-2.5 left-4 bg-white px-1 text-[10px] font-black uppercase tracking-widest text-[#003366] z-10">
                    Pickup Date
                  </label>
                  <div className="flex items-center gap-3 border-2 border-[#0B192C]/20 group-focus-within:border-[#9BC800] rounded-2xl px-4 py-4 transition-all duration-200 bg-white shadow-sm">
                    <Calendar className="w-5 h-5 text-[#9BC800] shrink-0" />
                    <input
                      type="date"
                      required
                      value={pickupDate}
                      onChange={e => setPickupDate(e.target.value)}
                      className="w-full text-sm font-medium text-[#0E1726] focus:outline-none bg-transparent [color-scheme:light]"
                    />
                  </div>
                </div>

                {/* Time */}
                <div className="relative group">
                  <label className="absolute -top-2.5 left-4 bg-white px-1 text-[10px] font-black uppercase tracking-widest text-[#003366] z-10">
                    Pickup Time
                  </label>
                  <div className="flex items-center gap-3 border-2 border-[#0B192C]/20 group-focus-within:border-[#9BC800] rounded-2xl px-4 py-4 transition-all duration-200 bg-white shadow-sm">
                    <Clock className="w-5 h-5 text-[#003366] shrink-0" />
                    <input
                      type="time"
                      required
                      value={pickupTime}
                      onChange={e => setPickupTime(e.target.value)}
                      className="w-full text-sm font-medium text-[#0E1726] focus:outline-none bg-transparent [color-scheme:light]"
                    />
                  </div>
                </div>
              </div>

              {/* Passengers + Bags */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Passengers counter */}
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-[#0E1726]">
                    Passengers
                  </label>
                  <div className="flex items-center gap-0 border-2 border-[#0B192C]/20 rounded-2xl overflow-hidden bg-white shadow-sm">
                    <button
                      type="button"
                      onClick={() => setPassengers(Math.max(1, passengers - 1))}
                      className="px-5 py-4 text-lg font-black text-[#003366] hover:bg-[#F4F6F9] transition-colors border-r border-[#0B192C]/10"
                    >−</button>
                    <div className="flex-1 flex items-center justify-center gap-2 py-4">
                      <Users className="w-4 h-4 text-[#9BC800]" />
                      <span className="font-black text-sm text-[#0E1726]">{passengers} {passengers === 1 ? 'Passenger' : 'Passengers'}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setPassengers(Math.min(14, passengers + 1))}
                      className="px-5 py-4 text-lg font-black text-[#003366] hover:bg-[#F4F6F9] transition-colors border-l border-[#0B192C]/10"
                    >+</button>
                  </div>
                </div>

                {/* Bags counter */}
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-[#0E1726]">
                    Number of Bags
                  </label>
                  <div className="flex items-center gap-0 border-2 border-[#0B192C]/20 rounded-2xl overflow-hidden bg-white shadow-sm">
                    <button
                      type="button"
                      onClick={() => setBags(Math.max(0, bags - 1))}
                      className="px-5 py-4 text-lg font-black text-[#003366] hover:bg-[#F4F6F9] transition-colors border-r border-[#0B192C]/10"
                    >−</button>
                    <div className="flex-1 flex items-center justify-center gap-2 py-4">
                      <Briefcase className="w-4 h-4 text-[#9BC800]" />
                      <span className="font-black text-sm text-[#0E1726]">{bags} {bags === 1 ? 'Bag' : 'Bags'}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setBags(Math.min(12, bags + 1))}
                      className="px-5 py-4 text-lg font-black text-[#003366] hover:bg-[#F4F6F9] transition-colors border-l border-[#0B192C]/10"
                    >+</button>
                  </div>
                </div>
              </div>

              {/* Vehicle Category + Flight Number row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
                      <option value="">Any category (show all)</option>
                      <option value="SUVs">SUVs</option>
                      <option value="Executive Cars">Executive Cars</option>
                      <option value="Luxury Vehicles">Luxury Vehicles</option>
                      <option value="Mini Bus">Mini Bus (Group)</option>
                      <option value="Economy Cars">Economy Cars</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-[#475569] shrink-0" />
                  </div>
                </div>

                {/* Flight Number — only for airport service types */}
                <AnimatePresence>
                  {showFlightField && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="relative group"
                    >
                      <label className="absolute -top-2.5 left-4 bg-white px-1 text-[10px] font-black uppercase tracking-widest text-[#003366] z-10">
                        Flight Number <span className="font-normal normal-case text-[#475569]">(Optional)</span>
                      </label>
                      <div className="flex items-center gap-3 border-2 border-[#0B192C]/20 group-focus-within:border-[#9BC800] rounded-2xl px-4 py-4 transition-all duration-200 bg-white shadow-sm">
                        <Plane className="w-5 h-5 text-[#9BC800] shrink-0" />
                        <input
                          type="text"
                          value={flightNumber}
                          onChange={e => setFlightNumber(e.target.value)}
                          placeholder="e.g. Air Peace P4 7120"
                          className="w-full text-sm font-medium text-[#0E1726] placeholder-[#475569]/50 focus:outline-none bg-transparent"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Special Requests */}
              <div className="relative group">
                <label className="absolute -top-2.5 left-4 bg-white px-1 text-[10px] font-black uppercase tracking-widest text-[#003366] z-10">
                  Special Requests <span className="font-normal normal-case text-[#475569]">(Optional)</span>
                </label>
                <textarea
                  rows={3}
                  value={specialRequests}
                  onChange={e => setSpecialRequests(e.target.value)}
                  placeholder="e.g. Driver to hold name sign at arrival gate, wheelchair access, child seat needed..."
                  className="w-full border-2 border-[#0B192C]/20 focus:border-[#9BC800] rounded-2xl px-4 py-4 text-sm font-medium text-[#0E1726] placeholder-[#475569]/50 focus:outline-none transition-all duration-200 resize-none bg-white shadow-sm"
                />
              </div>

              {/* CTA */}
              <div className="pt-2">
                <LuxuryButton type="submit" variant="lemon" size="xl" icon={<ArrowRight className="w-5 h-5" />} className="w-full sm:w-auto">
                  Show Available Vehicles
                </LuxuryButton>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* ── VEHICLE SELECTION ────────────────────────────────────────── */}
      <section id="vehicle-section" className="py-14 bg-[#F4F6F9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="space-y-2"
          >
            <span className="text-xs font-black uppercase tracking-widest text-[#003366] bg-[#003366]/10 px-4 py-1.5 rounded-full border border-[#003366]/15">
              STEP 2 — CHOOSE YOUR VEHICLE
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#0E1726]">
              Available Vehicles for Your Trip.
            </h2>
            <p className="text-[#475569] text-sm font-medium">
              All vehicles come with a professional chauffeur. Select the one that best fits your journey.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVehicles.map((v, idx) => {
              const isSelected = selectedVehicle?.id === v.id;
              return (
                <motion.div
                  key={v.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: idx * 0.07 }}
                  whileHover={{ y: -5, scale: 1.01 }}
                  onClick={() => handleSelectVehicle(v)}
                  className={`bg-white rounded-3xl border overflow-hidden shadow-sm cursor-pointer transition-all duration-300 flex flex-col ${
                    isSelected
                      ? 'border-[#9BC800] shadow-[0_0_30px_rgba(155,200,0,0.35)] ring-2 ring-[#9BC800]/40'
                      : 'border-[#0B192C]/10 hover:border-[#9BC800]/60 hover:shadow-[0_0_20px_rgba(155,200,0,0.2)]'
                  }`}
                >
                  {/* Vehicle Photo */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={v.image}
                      alt={v.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B192C]/60 via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 bg-[#9BC800] text-[#0B192C] text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full">
                      {v.categoryName}
                    </span>
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#9BC800] flex items-center justify-center"
                      >
                        <CheckCircle2 className="w-5 h-5 text-[#0B192C]" />
                      </motion.div>
                    )}
                  </div>

                  {/* Vehicle Info */}
                  <div className="p-5 flex flex-col flex-1 gap-4">
                    <div>
                      <h3 className="font-display font-black text-lg text-[#0E1726] leading-tight">{v.name}</h3>
                      <p className="text-xs text-[#475569] font-medium mt-1 leading-relaxed line-clamp-2">{v.description}</p>
                    </div>

                    {/* Specs row */}
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { label: 'Passengers', value: `${v.passengers} persons`, icon: <Users className="w-3.5 h-3.5 text-[#9BC800]" /> },
                        { label: 'Luggage', value: `${v.luggage} bags`, icon: <Briefcase className="w-3.5 h-3.5 text-[#9BC800]" /> },
                        { label: 'Transmission', value: v.transmission, icon: <Car className="w-3.5 h-3.5 text-[#9BC800]" /> },
                        { label: 'Driver', value: 'Included', icon: <UserCheck className="w-3.5 h-3.5 text-[#9BC800]" /> },
                      ].map((spec, i) => (
                        <div key={i} className="flex items-center gap-2 bg-[#F4F6F9] rounded-xl p-2.5">
                          {spec.icon}
                          <div>
                            <span className="text-[9px] font-bold uppercase text-[#475569] block tracking-wide">{spec.label}</span>
                            <span className="text-[11px] font-black text-[#0E1726]">{spec.value}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Features */}
                    {v.features && v.features.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {v.features.slice(0, 3).map((f, i) => (
                          <span key={i} className="text-[10px] font-bold bg-[#0B192C]/5 text-[#003366] px-2.5 py-1 rounded-full border border-[#0B192C]/10">
                            {f}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Price + CTA */}
                    <div className="mt-auto pt-4 border-t border-[#0B192C]/8 flex items-center justify-between gap-3">
                      <div>
                        <span className="text-[10px] font-bold text-[#475569] uppercase tracking-wider block">Estimated Rate</span>
                        <span className="font-display text-xl font-black text-[#0B192C]">{formatCurrency(v.pricePerDay)}</span>
                      </div>
                      <LuxuryButton
                        type="button"
                        variant={isSelected ? 'lemon' : 'navy'}
                        size="sm"
                        onClick={() => handleSelectVehicle(v)}
                      >
                        {isSelected ? '✓ Selected' : 'Book This Vehicle'}
                      </LuxuryButton>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CONTACT FORM ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {showContactForm && selectedVehicle && (
          <motion.section
            id="contact-section"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.5 }}
            className="py-14 bg-white"
          >
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              <div className="space-y-2">
                <span className="text-xs font-black uppercase tracking-widest text-[#003366] bg-[#003366]/10 px-4 py-1.5 rounded-full border border-[#003366]/15">
                  STEP 3 — YOUR CONTACT DETAILS
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#0E1726]">
                  Almost done. Confirm your booking.
                </h2>
              </div>

              {/* Selected vehicle recap */}
              <div className="flex items-center gap-4 bg-[#F4F6F9] rounded-2xl p-4 border border-[#9BC800]/30">
                <img src={selectedVehicle.image} alt={selectedVehicle.name} className="w-20 h-14 object-cover rounded-xl shrink-0" />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-black uppercase text-[#9BC800]">{selectedVehicle.categoryName}</span>
                  <h4 className="font-display font-black text-base text-[#0E1726] truncate">{selectedVehicle.name}</h4>
                  <span className="text-xs text-[#475569] font-medium">{selectedVehicle.passengers} passengers • {selectedVehicle.luggage} bags</span>
                </div>
                <div className="text-right shrink-0">
                  <span className="font-display text-lg font-black text-[#0B192C]">{formatCurrency(selectedVehicle.pricePerDay)}</span>
                  <span className="text-[10px] text-[#475569] block">Est. rate</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Full name */}
                <div className="relative group">
                  <label className="absolute -top-2.5 left-4 bg-white px-1 text-[10px] font-black uppercase tracking-widest text-[#003366] z-10">
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
                  {/* Phone */}
                  <div className="relative group">
                    <label className="absolute -top-2.5 left-4 bg-white px-1 text-[10px] font-black uppercase tracking-widest text-[#003366] z-10">
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

                  {/* Email */}
                  <div className="relative group">
                    <label className="absolute -top-2.5 left-4 bg-white px-1 text-[10px] font-black uppercase tracking-widest text-[#003366] z-10">
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

                {/* Submit */}
                <div className="pt-2">
                  <LuxuryButton
                    type="submit"
                    variant="lemon"
                    size="xl"
                    disabled={isSubmitting}
                    icon={<CheckCircle2 className="w-5 h-5" />}
                    className="w-full sm:w-auto"
                  >
                    {isSubmitting ? 'Submitting Request...' : 'Submit Booking Request'}
                  </LuxuryButton>
                  <p className="text-xs text-[#475569] mt-3 font-medium">
                    No online payment required. Our team will contact you to confirm.
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
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center space-y-6"
            >
              <div className="w-16 h-16 rounded-full bg-[#9BC800]/15 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10 text-[#9BC800]" />
              </div>
              <div className="space-y-2">
                <h3 className="font-display text-2xl font-black text-[#0E1726]">Booking Submitted!</h3>
                <p className="text-sm text-[#475569] font-medium">
                  Reference: <span className="font-black text-[#0B192C]">{refCode}</span>
                </p>
                <p className="text-sm text-[#475569] font-medium">
                  Thank you, {customerName}! Our team will contact you shortly to confirm your driver and pickup details.
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
                  Send via WhatsApp
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

export default function RideBookingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 rounded-full border-4 border-[#9BC800] border-t-transparent animate-spin mx-auto" />
          <p className="text-sm font-bold text-[#475569]">Loading Ride Booking...</p>
        </div>
      </div>
    }>
      <RideBookingContent />
    </Suspense>
  );
}
