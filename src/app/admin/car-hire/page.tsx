'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Car, Calendar, ShieldCheck, UserCheck, Plus, Search, Edit, FileText, CheckCircle2 } from 'lucide-react';
import { subscribeToBookings, updateBookingStatusInDb } from '@/lib/firebase/services/admin-db-service';
import { logAdminAction } from '@/lib/firebase/services/admin-audit-service';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { AdminBooking, BookingStatus } from '@/types/admin';

export default function AdminCarHirePage() {
  const { adminUser } = useAdminAuth();
  const [bookings, setBookings] = useState<AdminBooking[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const unsub = subscribeToBookings((data) => {
      // Filter for car-hire services
      setBookings(data.filter((b) => b.serviceType.toLowerCase().includes('hire') || b.isSelfDrive));
    });
    return () => unsub();
  }, []);

  const filtered = bookings.filter(
    (b) =>
      b.referenceCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.vehicleName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-[#0B192C]/10 shadow-sm">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-[#003366] bg-[#003366]/10 px-3 py-1 rounded-full border border-[#003366]/15">
            RENTAL DISPATCH WORKFLOW
          </span>
          <h1 className="font-display text-2xl font-black text-[#0E1726] mt-2">
            Car Hire Management
          </h1>
          <p className="text-xs text-[#475569] font-medium mt-0.5">
            Dedicated workflow for short-term & multi-day vehicle rentals (Self-Drive & Chauffeur Hire).
          </p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-3xl border border-[#0B192C]/10 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3 bg-[#F4F6F9] border border-slate-300 rounded-2xl px-3.5 py-2.5 w-full sm:w-80">
          <Search className="w-4 h-4 text-[#003366] shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search ref, customer, vehicle..."
            className="w-full bg-transparent font-medium text-[#0E1726] focus:outline-none placeholder:text-slate-400 text-xs"
          />
        </div>
        <span className="text-xs font-bold text-[#003366] bg-[#003366]/10 px-3.5 py-2 rounded-xl">
          {filtered.length} Active Rentals Found
        </span>
      </div>

      {/* Car Hire Table */}
      <div className="bg-white rounded-3xl border border-[#0B192C]/10 shadow-sm overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#0B192C] text-white uppercase text-[10px] tracking-wider font-extrabold">
                <th className="p-4">Ref Code</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Vehicle</th>
                <th className="p-4">Rental Mode</th>
                <th className="p-4">Pickup ➔ Return</th>
                <th className="p-4">Duration</th>
                <th className="p-4">Insurance</th>
                <th className="p-4">Total Price</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-slate-400 font-bold">
                    No active car hire bookings found.
                  </td>
                </tr>
              ) : (
                filtered.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-black text-[#003366]">#{b.referenceCode}</td>
                    <td className="p-4">
                      <span className="font-extrabold text-[#0E1726] block">{b.customerName}</span>
                      <span className="text-[10px] text-slate-500 block">{b.customerPhone}</span>
                    </td>
                    <td className="p-4 font-bold text-[#0E1726]">{b.vehicleName || 'Toyota Prado TX'}</td>
                    <td className="p-4">
                      {b.isSelfDrive ? (
                        <span className="px-2.5 py-1 rounded-full bg-purple-500/15 text-purple-700 font-black text-[10px] uppercase">
                          Self Drive
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full bg-[#003366]/15 text-[#003366] font-black text-[10px] uppercase">
                          Chauffeur Driven
                        </span>
                      )}
                    </td>
                    <td className="p-4">
                      <span className="font-bold text-[#0E1726] block">{b.pickupLocation}</span>
                      <span className="text-[10px] text-slate-500 block">Return: {b.dropoffLocation}</span>
                    </td>
                    <td className="p-4 font-extrabold text-[#0E1726]">{b.rentalDurationDays || 1} Days</td>
                    <td className="p-4">
                      {b.insuranceSelected ? (
                        <span className="text-emerald-600 font-bold text-[10px] flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5" /> Full Cover
                        </span>
                      ) : (
                        <span className="text-slate-400 font-bold text-[10px]">Standard</span>
                      )}
                    </td>
                    <td className="p-4 font-black text-[#003366]">₦{(b.totalAmount || b.estimatedPrice || 0).toLocaleString()}</td>
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
