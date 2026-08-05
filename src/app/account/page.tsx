'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CalendarCheck, Car, Clock, ShieldCheck, MapPin, ArrowRight, User, Star, CreditCard } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { subscribeToUserBookings } from '@/lib/firebase/services/booking-service';
import { AdminBooking } from '@/types/admin';

export default function CustomerAccountDashboard() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<AdminBooking[]>([]);

  useEffect(() => {
    if (!user?.email) return;
    const unsub = subscribeToUserBookings(user.email, (data) => setBookings(data));
    return () => unsub();
  }, [user]);

  const upcomingBookings = bookings.filter((b) => b.status !== 'Trip Completed' && b.status !== 'Closed' && b.status !== 'Cancelled');
  const totalSpent = bookings.filter((b) => b.status !== 'Cancelled').reduce((sum, b) => sum + (b.totalAmount || b.estimatedPrice || 0), 0);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-[#0B192C] text-white p-6 sm:p-8 rounded-3xl border border-white/10 shadow-xl relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-2 z-10">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#9BC800] bg-white/10 px-3 py-1 rounded-full border border-white/20">
            CHIMJOY CUSTOMER PORTAL
          </span>
          <h1 className="font-display text-2xl sm:text-3xl font-black text-white">
            Welcome back, {user?.displayName || 'Valued Client'}!
          </h1>
          <p className="text-xs text-slate-300 font-medium">
            Manage your executive ride bookings, airport transfers, and car hire history.
          </p>
        </div>

        <div className="flex items-center gap-3 z-10">
          <Link href="/book/ride">
            <button className="px-4 py-2.5 rounded-xl bg-[#9BC800] hover:bg-[#8ab300] text-[#0B192C] text-xs font-black uppercase tracking-wider shadow-lemon cursor-pointer">
              Book Executive Ride
            </button>
          </Link>
          <Link href="/book/hire">
            <button className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-black uppercase tracking-wider cursor-pointer">
              Hire a Car
            </button>
          </Link>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-3xl border border-[#0B192C]/10 shadow-sm space-y-2">
          <span className="text-xs font-extrabold text-[#475569] uppercase tracking-wider">Total Bookings</span>
          <span className="font-display text-3xl font-black text-[#003366] block">{bookings.length}</span>
          <span className="text-xs text-slate-500 font-medium">Lifetime travel history</span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-[#0B192C]/10 shadow-sm space-y-2">
          <span className="text-xs font-extrabold text-[#475569] uppercase tracking-wider">Active & Upcoming Trips</span>
          <span className="font-display text-3xl font-black text-emerald-700 block">{upcomingBookings.length}</span>
          <span className="text-xs text-emerald-600 font-medium">Live status updating in real-time</span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-[#0B192C]/10 shadow-sm space-y-2">
          <span className="text-xs font-extrabold text-[#475569] uppercase tracking-wider">Lifetime Travel Spend</span>
          <span className="font-display text-3xl font-black text-[#0E1726] block">₦{totalSpent.toLocaleString()}</span>
          <span className="text-xs text-slate-500 font-medium">Total completed bookings</span>
        </div>
      </div>

      {/* Upcoming Trips Stream */}
      <div className="bg-white rounded-3xl border border-[#0B192C]/10 shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="font-display text-base font-extrabold text-[#0E1726]">
            Active & Upcoming Bookings
          </h3>
          <Link href="/account/bookings" className="text-xs font-black text-[#003366] hover:underline flex items-center gap-1">
            <span>View Full History</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="space-y-3">
          {upcomingBookings.length === 0 ? (
            <div className="py-8 text-center text-slate-400 font-medium text-xs">
              No upcoming trips scheduled. Book your next airport transfer or executive ride above!
            </div>
          ) : (
            upcomingBookings.map((b) => (
              <div key={b.id} className="p-4 rounded-2xl bg-[#F4F6F9] border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-black text-[#003366] text-xs">#{b.referenceCode}</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-500/15 text-blue-700 font-black text-[10px] uppercase">
                      {b.status}
                    </span>
                  </div>
                  <h4 className="font-display font-extrabold text-[#0E1726] text-sm">{b.serviceType}</h4>
                  <p className="text-xs text-slate-600 font-medium">{b.pickupLocation} ➔ {b.dropoffLocation}</p>
                  <span className="text-[11px] text-slate-500 font-semibold block">{b.pickupDate} at {b.pickupTime}</span>
                </div>

                <div className="text-right space-y-1">
                  <span className="font-display font-black text-base text-[#0E1726] block">₦{(b.totalAmount || b.estimatedPrice || 0).toLocaleString()}</span>
                  {b.driverName && (
                    <span className="text-xs font-extrabold text-emerald-700 block">
                      Driver: {b.driverName} ({b.driverPhone})
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
