'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Clock, Users, Car, ArrowRight, Plane, FileText } from 'lucide-react';
import { LuxuryButton } from '@/components/ui/luxury-button';

export const CorporateBookingSection = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'airport' | 'within' | 'outside' | 'corporate'>('airport');
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [passengers, setPassengers] = useState('1');
  const [vehicleType, setVehicleType] = useState('Executive SUV');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      router.push(
        `/book?type=${activeTab}&pickup=${encodeURIComponent(pickup)}&destination=${encodeURIComponent(destination)}&date=${pickupDate}&time=${pickupTime}&passengers=${passengers}&vehicle=${encodeURIComponent(vehicleType)}`
      );
    }, 500);
  };

  return (
    <section className="pt-14 sm:pt-16 pb-10 bg-[#FAFAFA] text-[#0E1726] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto space-y-2 mb-8"
        >
          <span className="text-xs font-black uppercase tracking-widest text-[#003366] bg-[#003366]/10 px-4 py-1.5 rounded-full border border-[#003366]/15">
            INSTANT BOOKING
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0E1726]">
            Book Your Ride in Seconds.
          </h2>
          <p className="text-[#475569] text-sm font-medium">
            Fast, transparent, and instant reservation across Owerri & South-East Nigeria.
          </p>
        </motion.div>

        {/* Wide & Compact Horizontal Booking Matrix */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto bg-white rounded-3xl p-5 sm:p-7 shadow-corporate border border-[#0B192C]/15 space-y-5"
        >
          {/* Top Segmented Tabs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-1.5 bg-[#0B192C] p-1.5 rounded-2xl w-full sm:w-auto">
              {[
                { id: 'airport', label: 'Airport Pickup' },
                { id: 'within', label: 'Within Owerri' },
                { id: 'outside', label: 'Outside Owerri' },
                { id: 'corporate', label: 'Corporate' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-2 px-3 sm:px-4 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all text-center ${
                    activeTab === tab.id
                      ? 'bg-[#9BC800] text-[#0B192C] shadow-lemon font-black'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <span className="text-[11px] font-extrabold text-[#003366] bg-[#003366]/10 px-3 py-1.5 rounded-full text-center hidden sm:inline-block">
              ✓ All Bookings Include Professional Chauffeur
            </span>
          </div>

          {/* Smart Mobile-Compact Form */}
          <form onSubmit={handleBookingSubmit} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-2.5 text-xs">
              {/* Pickup Location */}
              <div className="space-y-1">
                <label className="font-extrabold uppercase tracking-wider text-[#0E1726] text-[10px]">Pickup</label>
                <div className="flex items-center gap-2 bg-[#F4F6F9] border border-[#0B192C]/15 rounded-xl p-2.5 sm:p-3 focus-within:border-[#003366] focus-within:bg-white transition-colors">
                  <MapPin className="w-4 h-4 text-[#003366] shrink-0" />
                  <input
                    type="text"
                    required
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    placeholder="Pickup location or airport"
                    className="w-full bg-transparent font-bold text-[#0E1726] focus:outline-none placeholder:text-slate-400 text-xs"
                  />
                </div>
              </div>

              {/* Destination */}
              <div className="space-y-1">
                <label className="font-extrabold uppercase tracking-wider text-[#0E1726] text-[10px]">Destination</label>
                <div className="flex items-center gap-2 bg-[#F4F6F9] border border-[#0B192C]/15 rounded-xl p-2.5 sm:p-3 focus-within:border-[#003366] focus-within:bg-white transition-colors">
                  <MapPin className="w-4 h-4 text-[#9BC800] shrink-0" />
                  <input
                    type="text"
                    required
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="Destination or hotel"
                    className="w-full bg-transparent font-bold text-[#0E1726] focus:outline-none placeholder:text-slate-400 text-xs"
                  />
                </div>
              </div>

              {/* Date */}
              <div className="space-y-1">
                <label className="font-extrabold uppercase tracking-wider text-[#0E1726] text-[10px]">Date</label>
                <div className="flex items-center gap-1.5 bg-[#F4F6F9] border border-[#0B192C]/15 rounded-xl p-2.5 sm:p-3">
                  <Calendar className="w-3.5 h-3.5 text-[#003366] shrink-0" />
                  <input
                    type="date"
                    required
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    className="w-full bg-transparent font-bold text-[#0E1726] focus:outline-none text-[11px]"
                  />
                </div>
              </div>

              {/* Time */}
              <div className="space-y-1">
                <label className="font-extrabold uppercase tracking-wider text-[#0E1726] text-[10px]">Time</label>
                <div className="flex items-center gap-1.5 bg-[#F4F6F9] border border-[#0B192C]/15 rounded-xl p-2.5 sm:p-3">
                  <Clock className="w-3.5 h-3.5 text-[#003366] shrink-0" />
                  <input
                    type="time"
                    required
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    className="w-full bg-transparent font-bold text-[#0E1726] focus:outline-none text-[11px]"
                  />
                </div>
              </div>

              {/* Vehicle Type */}
              <div className="space-y-1">
                <label className="font-extrabold uppercase tracking-wider text-[#0E1726] text-[10px]">Vehicle Category</label>
                <div className="flex items-center gap-2 bg-[#F4F6F9] border border-[#0B192C]/15 rounded-xl p-2.5 sm:p-3">
                  <Car className="w-4 h-4 text-[#0E1726] shrink-0" />
                  <select
                    value={vehicleType}
                    onChange={(e) => setVehicleType(e.target.value)}
                    className="w-full bg-transparent font-bold text-[#0E1726] focus:outline-none cursor-pointer text-xs"
                  >
                    <option value="SUVs (Prado TX-L)">Toyota Prado SUV</option>
                    <option value="Executive Cars">Toyota Camry Sedan</option>
                    <option value="Luxury Vehicles">Lexus LX570 SUV</option>
                    <option value="Mini Bus">HiAce VIP Bus</option>
                    <option value="Economy Cars">Toyota Corolla</option>
                  </select>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex items-end pt-1 sm:pt-0">
                <LuxuryButton
                  variant="lemon"
                  size="md"
                  className="w-full justify-center py-3 sm:py-3.5 text-[#0B192C]"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  {isSubmitted ? 'Searching...' : 'Check Availability'}
                </LuxuryButton>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};
