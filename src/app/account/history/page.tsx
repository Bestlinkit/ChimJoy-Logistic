'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { History, TrendingUp, Car, MapPin, Download, Award } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { subscribeToUserBookings } from '@/lib/firebase/services/booking-service';
import { AdminBooking } from '@/types/admin';
import { formatCurrency } from '@/lib/utils';
import { downloadReceiptPdf } from '@/lib/services/receipt-generator';

export default function TripHistoryPage() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<AdminBooking[]>([]);

  useEffect(() => {
    if (!user?.email) return;
    const unsub = subscribeToUserBookings(user.email, (data) => {
      setBookings(data);
    });
    return () => unsub();
  }, [user?.email]);

  const completedTrips = bookings.filter((b) => b.status === 'Completed' || b.status === 'Confirmed');
  const totalSpent = bookings.reduce((sum, b) => sum + (b.estimatedPrice || 0), 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#0B192C]/10 shadow-sm space-y-2">
        <span className="text-xs font-black uppercase tracking-widest text-[#003366] bg-[#003366]/10 px-4 py-1.5 rounded-full border border-[#003366]/15">
          ANALYTICAL SUMMARY
        </span>
        <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-[#0E1726]">
          Trip History & Mobility Stats
        </h1>
        <p className="text-xs sm:text-sm text-[#475569] font-medium">
          Comprehensive statistics and live history logs of your travels with ChimJoy.
        </p>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Money Spent', value: formatCurrency(totalSpent), icon: <TrendingUp className="w-5 h-5 text-[#9BC800]" /> },
          { label: 'Trips Completed', value: `${completedTrips.length} Rides`, icon: <Award className="w-5 h-5 text-[#003366]" /> },
          { label: 'Favourite Destination', value: 'Port Harcourt GRA', icon: <MapPin className="w-5 h-5 text-[#9BC800]" /> },
          { label: 'Most Booked Vehicle', value: 'Prado Executive SUV', icon: <Car className="w-5 h-5 text-[#003366]" /> },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-3xl p-6 border border-[#0B192C]/10 shadow-sm space-y-2">
            <div className="p-3 rounded-2xl bg-[#0B192C] w-fit text-[#9BC800]">{stat.icon}</div>
            <span className="text-[10px] font-black uppercase text-[#475569] block">{stat.label}</span>
            <span className="font-display font-black text-xl text-[#0E1726]">{stat.value}</span>
          </div>
        ))}
      </div>

      {/* Trip Log History */}
      <div className="bg-white rounded-3xl p-6 border border-[#0B192C]/10 shadow-sm space-y-6">
        <h3 className="font-display font-black text-lg text-[#0E1726]">Completed & Past Travels</h3>

        {bookings.length === 0 ? (
          <div className="p-8 text-center bg-[#F4F6F9] rounded-2xl text-slate-500 text-xs font-bold">
            No completed trip history found for this account.
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((b) => (
              <div key={b.id} className="p-5 rounded-2xl bg-[#F4F6F9] border border-[#0B192C]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  {b.vehicleImage ? (
                    <img src={b.vehicleImage} alt={b.vehicleName} className="w-16 h-12 object-cover rounded-xl border shrink-0" />
                  ) : (
                    <div className="w-16 h-12 bg-[#0B192C] text-[#9BC800] rounded-xl flex items-center justify-center font-bold text-xs">
                      CAR
                    </div>
                  )}
                  <div>
                    <h4 className="font-display font-black text-base text-[#0E1726]">{b.vehicleName || 'Executive Transport'}</h4>
                    <p className="text-xs text-[#475569] font-medium">{b.pickupLocation} → {b.dropoffLocation}</p>
                    <span className="text-[10px] font-mono text-[#003366] font-bold">#{b.referenceCode} • {b.pickupDate}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 border-[#0B192C]/10 pt-3 sm:pt-0">
                  <span className="font-display font-black text-base text-[#0B192C]">{formatCurrency(b.estimatedPrice)}</span>
                  <button
                    onClick={() => downloadReceiptPdf(b as any)}
                    className="px-4 py-2 bg-[#0B192C] text-white rounded-full text-xs font-bold flex items-center gap-1.5 hover:bg-[#003366] transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-[#9BC800]" /> Receipt PDF
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
