'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { History, TrendingUp, Car, MapPin, Download, Award } from 'lucide-react';
import { MOCK_BOOKINGS } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/utils';
import { downloadReceiptPdf } from '@/lib/services/receipt-generator';

export default function TripHistoryPage() {
  const completedTrips = MOCK_BOOKINGS.filter((b) => b.status === 'Completed' || b.status === 'Confirmed');
  const totalSpent = MOCK_BOOKINGS.reduce((sum, b) => sum + b.estimatedPrice, 0);

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
          Comprehensive statistics and history logs of your travels with ChimJoy.
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
            <div className="p-3 rounded-2xl bg-[#0B192C] w-fit text-white">{stat.icon}</div>
            <span className="text-[10px] font-black uppercase text-[#475569] block">{stat.label}</span>
            <span className="font-display font-black text-xl text-[#0E1726]">{stat.value}</span>
          </div>
        ))}
      </div>

      {/* Trip Log History */}
      <div className="bg-white rounded-3xl p-6 border border-[#0B192C]/10 shadow-sm space-y-6">
        <h3 className="font-display font-black text-lg text-[#0E1726]">Completed & Past Travels</h3>

        <div className="space-y-4">
          {MOCK_BOOKINGS.map((b) => (
            <div key={b.id} className="p-5 rounded-2xl bg-[#F4F6F9] border border-[#0B192C]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <img src={b.vehicleImage} alt={b.vehicleName} className="w-16 h-12 object-cover rounded-xl border shrink-0" />
                <div>
                  <h4 className="font-display font-black text-base text-[#0E1726]">{b.vehicleName}</h4>
                  <p className="text-xs text-[#475569] font-medium">{b.pickupLocation} → {b.dropoffLocation}</p>
                  <span className="text-[10px] font-mono text-[#003366] font-bold">#{b.referenceCode} • {b.pickupDate}</span>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 border-[#0B192C]/10 pt-3 sm:pt-0">
                <span className="font-display font-black text-base text-[#0B192C]">{formatCurrency(b.estimatedPrice)}</span>
                <button
                  onClick={() => downloadReceiptPdf(b)}
                  className="px-4 py-2 bg-[#0B192C] text-white rounded-full text-xs font-bold flex items-center gap-1.5 hover:bg-[#003366] transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-[#9BC800]" /> Receipt PDF
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
