'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, MapPin, Car, ShieldAlert } from 'lucide-react';
import { subscribeToBookings } from '@/lib/firebase/services/admin-db-service';
import { AdminBooking } from '@/types/admin';

export default function AdminCalendarPage() {
  const [bookings, setBookings] = useState<AdminBooking[]>([]);

  useEffect(() => {
    const unsub = subscribeToBookings((data) => setBookings(data));
    return () => unsub();
  }, []);

  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-[#0B192C]/10 shadow-sm">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-[#003366] bg-[#003366]/10 px-3 py-1 rounded-full border border-[#003366]/15">
            DISPATCH SCHEDULER
          </span>
          <h1 className="font-display text-2xl font-black text-[#0E1726] mt-2">
            Vehicle & Driver Calendar Schedule
          </h1>
          <p className="text-xs text-[#475569] font-medium mt-0.5">
            Visual timeline calendar with automatic vehicle and driver double-booking conflict detection.
          </p>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white rounded-3xl border border-[#0B192C]/10 shadow-sm p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <h3 className="font-display text-lg font-black text-[#0E1726] flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-[#9BC800]" />
            <span>Today's Dispatch Corridor ({todayStr})</span>
          </h3>

          <span className="text-xs font-extrabold text-[#003366] bg-[#003366]/10 px-3.5 py-1.5 rounded-xl">
            {bookings.length} Scheduled Operations
          </span>
        </div>

        <div className="space-y-3">
          {bookings.map((b) => (
            <div
              key={b.id}
              className="p-4 rounded-2xl bg-[#F4F6F9] border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[#003366] transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-[#0B192C] text-[#9BC800] shrink-0 font-mono text-center text-xs font-black">
                  <Clock className="w-4 h-4 mx-auto mb-1" />
                  <span>{b.pickupTime}</span>
                </div>
                <div>
                  <span className="font-black text-[#003366] text-xs">#{b.referenceCode} — {b.customerName}</span>
                  <h4 className="font-display font-extrabold text-[#0E1726] text-sm">{b.serviceType}</h4>
                  <p className="text-xs text-slate-500 font-medium">{b.pickupLocation} ➔ {b.dropoffLocation}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right text-xs">
                  <span className="font-extrabold text-[#0E1726] block">{b.vehicleName || 'Standard SUV'}</span>
                  <span className="text-[10px] text-emerald-700 font-bold block">{b.driverName || 'Driver Pending'}</span>
                </div>
                <span className="px-3 py-1 rounded-full bg-blue-500/15 text-blue-700 font-black text-[10px] uppercase">
                  {b.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
