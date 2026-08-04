'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CalendarCheck, Car, Clock, ShieldCheck, MapPin, Printer } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { subscribeToUserBookings } from '@/lib/firebase/services/booking-service';
import { AdminBooking } from '@/types/admin';

export default function CustomerBookingsHistoryPage() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<AdminBooking[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'rides' | 'car-hire'>('all');

  useEffect(() => {
    if (!user?.email) return;
    const unsub = subscribeToUserBookings(user.email, (data) => setBookings(data));
    return () => unsub();
  }, [user]);

  const filtered = bookings.filter((b) => {
    if (activeTab === 'rides') return !b.serviceType.toLowerCase().includes('hire');
    if (activeTab === 'car-hire') return b.serviceType.toLowerCase().includes('hire') || b.isSelfDrive;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-[#0B192C]/10 shadow-sm">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-[#003366] bg-[#003366]/10 px-3 py-1 rounded-full border border-[#003366]/15">
            TRAVEL HISTORY & REALTIME TIMELINE
          </span>
          <h1 className="font-display text-2xl font-black text-[#0E1726] mt-2">
            My Booking History
          </h1>
          <p className="text-xs text-[#475569] font-medium mt-0.5">
            Realtime status updates for all your ride requests, airport pickups, and car hire rentals.
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0E1726] text-xs font-black uppercase tracking-wider flex items-center gap-2 cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          <span>Print Receipts</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 bg-white p-2 rounded-2xl border border-[#0B192C]/10 w-max text-xs font-extrabold">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 rounded-xl transition-colors cursor-pointer ${activeTab === 'all' ? 'bg-[#0B192C] text-white' : 'text-[#475569] hover:text-[#0E1726]'}`}
        >
          All Bookings ({bookings.length})
        </button>
        <button
          onClick={() => setActiveTab('rides')}
          className={`px-4 py-2 rounded-xl transition-colors cursor-pointer ${activeTab === 'rides' ? 'bg-[#0B192C] text-white' : 'text-[#475569] hover:text-[#0E1726]'}`}
        >
          Executive Rides & Airport
        </button>
        <button
          onClick={() => setActiveTab('car-hire')}
          className={`px-4 py-2 rounded-xl transition-colors cursor-pointer ${activeTab === 'car-hire' ? 'bg-[#0B192C] text-white' : 'text-[#475569] hover:text-[#0E1726]'}`}
        >
          Car Hire Rentals
        </button>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-3xl border border-[#0B192C]/10 shadow-sm overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#0B192C] text-white uppercase text-[10px] tracking-wider font-extrabold">
                <th className="p-4">Ref Code</th>
                <th className="p-4">Service Type</th>
                <th className="p-4">Pickup / Dropoff</th>
                <th className="p-4">Vehicle</th>
                <th className="p-4">Chauffeur Driver</th>
                <th className="p-4">Date & Time</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Realtime Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400 font-bold">
                    No travel history found in this category.
                  </td>
                </tr>
              ) : (
                filtered.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-black text-[#003366]">#{b.referenceCode}</td>
                    <td className="p-4 font-bold text-[#0E1726]">{b.serviceType}</td>
                    <td className="p-4 text-slate-600 max-w-[180px]">
                      <span className="font-bold text-[#0E1726] block truncate">{b.pickupLocation}</span>
                      <span className="text-[10px] text-slate-400 block truncate">➔ {b.dropoffLocation}</span>
                    </td>
                    <td className="p-4 font-bold text-[#0E1726]">{b.vehicleName || 'Toyota Prado SUV'}</td>
                    <td className="p-4">
                      {b.driverName ? (
                        <div>
                          <span className="font-extrabold text-emerald-700 block">{b.driverName}</span>
                          <span className="text-[10px] text-slate-500 block">{b.driverPhone}</span>
                        </div>
                      ) : (
                        <span className="text-amber-600 font-bold text-[10px]">Driver Assignment Pending</span>
                      )}
                    </td>
                    <td className="p-4">
                      <span className="font-bold text-[#0E1726] block">{b.pickupDate}</span>
                      <span className="text-[10px] text-slate-500">{b.pickupTime}</span>
                    </td>
                    <td className="p-4 font-black text-[#0E1726]">₦{(b.totalAmount || b.estimatedPrice || 0).toLocaleString()}</td>
                    <td className="p-4">
                      <span className="px-3 py-1 rounded-full bg-blue-500/15 text-blue-700 font-black text-[10px] uppercase">
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
