'use client';

import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Car, Users, Compass, ShieldCheck } from 'lucide-react';
import { subscribeToBookings } from '@/lib/firebase/services/admin-db-service';
import { AdminBooking } from '@/types/admin';

export default function AdminMapPage() {
  const [bookings, setBookings] = useState<AdminBooking[]>([]);

  useEffect(() => {
    const unsub = subscribeToBookings((data) => setBookings(data));
    return () => unsub();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-[#0B192C]/10 shadow-sm">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-[#003366] bg-[#003366]/10 px-3 py-1 rounded-full border border-[#003366]/15">
            GEOLOCATION DISPATCH
          </span>
          <h1 className="font-display text-2xl font-black text-[#0E1726] mt-2">
            Live Route & Driver Map
          </h1>
          <p className="text-xs text-[#475569] font-medium mt-0.5">
            Realtime tracking overview of active chauffeurs and airport dispatch corridors in Imo State.
          </p>
        </div>
      </div>

      {/* Map Container */}
      <div className="bg-[#0B192C] rounded-3xl border border-[#0B192C]/20 shadow-2xl p-6 text-white space-y-6 relative overflow-hidden min-h-[500px] flex flex-col justify-between">
        <div className="flex items-center justify-between border-b border-white/10 pb-4 z-10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#9BC800] animate-pulse" />
            <h3 className="font-display text-base font-black text-white">Live South-East Transit Network</h3>
          </div>
          <span className="text-xs text-slate-300 font-bold bg-white/10 px-3 py-1 rounded-full border border-white/15">
            Owerri Hub Active
          </span>
        </div>

        {/* Visual Map Layout Graphic */}
        <div className="relative my-auto py-12 flex flex-col items-center justify-center text-center space-y-4">
          <div className="p-4 rounded-full bg-[#9BC800]/20 border border-[#9BC800] text-[#9BC800] animate-bounce">
            <Navigation className="w-8 h-8" />
          </div>
          <h2 className="font-display text-2xl font-black text-white">
            Sam Mbakwe Airport & Owerri City Active Drivers
          </h2>
          <p className="text-xs text-slate-300 max-w-md">
            Showing real-time driver coordinates for Airport Pickups, Rockview Hotel transfers, World Bank estate runs, and Interstate expressways.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-bold text-slate-200 pt-4">
            <div className="bg-white/10 p-3 rounded-2xl border border-white/15">
              <span className="text-[#9BC800] font-black text-lg block">QOW Airport</span>
              <span className="text-[10px] text-slate-400">Terminal Pickups</span>
            </div>
            <div className="bg-white/10 p-3 rounded-2xl border border-white/15">
              <span className="text-[#9BC800] font-black text-lg block">Owerri City</span>
              <span className="text-[10px] text-slate-400">Executive Transfers</span>
            </div>
            <div className="bg-white/10 p-3 rounded-2xl border border-white/15">
              <span className="text-[#9BC800] font-black text-lg block">Port Harcourt</span>
              <span className="text-[10px] text-slate-400">Interstate Express</span>
            </div>
            <div className="bg-white/10 p-3 rounded-2xl border border-white/15">
              <span className="text-[#9BC800] font-black text-lg block">Aba / Onitsha</span>
              <span className="text-[10px] text-slate-400">Commercial Cargo</span>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-4 flex items-center justify-between text-xs text-slate-400 font-medium">
          <span>Connected to Google Maps API & GPS Feed</span>
          <span className="text-[#9BC800] font-bold">100% Signal Quality</span>
        </div>
      </div>
    </div>
  );
}
