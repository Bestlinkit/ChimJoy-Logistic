'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Calendar,
  Search,
  Download,
  Eye,
  XCircle,
  Copy,
  Filter,
  Car,
  MapPin,
  CheckCircle2,
} from 'lucide-react';
import { LuxuryButton } from '@/components/ui/luxury-button';
import { MOCK_BOOKINGS } from '@/lib/mock-data';
import { downloadReceiptPdf } from '@/lib/services/receipt-generator';
import { formatCurrency } from '@/lib/utils';
import { BookingRequest } from '@/types';

export default function MyBookingsPage() {
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredBookings = MOCK_BOOKINGS.filter((b) => {
    const matchesStatus = filterStatus === 'All' || b.status === filterStatus;
    const matchesSearch =
      b.referenceCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.vehicleName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.pickupLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.dropoffLocation.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#0B192C]/10 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-black uppercase tracking-widest text-[#003366] bg-[#003366]/10 px-4 py-1.5 rounded-full border border-[#003366]/15">
            CLIENT PORTAL
          </span>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-[#0E1726] mt-2">
            My Bookings & Reservations
          </h1>
          <p className="text-xs sm:text-sm text-[#475569] font-medium">
            View, track, download receipts or manage all your past and upcoming trips.
          </p>
        </div>

        <Link href="/book/ride">
          <LuxuryButton variant="lemon" size="md">
            + New Booking
          </LuxuryButton>
        </Link>
      </div>

      {/* Filters & Search Controls */}
      <div className="bg-white rounded-3xl p-6 border border-[#0B192C]/10 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Status Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            {['All', 'Confirmed', 'Assigned', 'Pending', 'Completed', 'Cancelled'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-full text-xs font-black transition-all cursor-pointer ${
                  filterStatus === status
                    ? 'bg-[#0B192C] text-[#9BC800] border border-[#9BC800] shadow-sm'
                    : 'bg-[#F4F6F9] text-[#475569] hover:bg-slate-200'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-[#003366] absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search ref, vehicle, route..."
              className="w-full bg-[#F4F6F9] border border-[#0B192C]/15 rounded-2xl pl-10 pr-4 py-2.5 text-xs font-medium text-[#0E1726] focus:outline-none focus:border-[#9BC800]"
            />
          </div>
        </div>
      </div>

      {/* Bookings Table Card */}
      <div className="bg-white rounded-3xl border border-[#0B192C]/10 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#0B192C] text-white uppercase font-black tracking-wider text-[10px]">
                <th className="py-4 px-5">Booking Ref & Vehicle</th>
                <th className="py-4 px-5">Pickup & Destination</th>
                <th className="py-4 px-5">Date & Time</th>
                <th className="py-4 px-5">Fare</th>
                <th className="py-4 px-5">Status</th>
                <th className="py-4 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredBookings.length > 0 ? (
                filteredBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-[#F4F6F9] transition-colors">
                    {/* Vehicle */}
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-3">
                        <img src={b.vehicleImage} alt={b.vehicleName} className="w-12 h-9 object-cover rounded-lg border shrink-0" />
                        <div>
                          <div className="font-extrabold text-[#0E1726] text-sm">{b.vehicleName}</div>
                          <span className="font-mono text-[10px] font-black text-[#003366]">#{b.referenceCode}</span>
                        </div>
                      </div>
                    </td>

                    {/* Route */}
                    <td className="py-4 px-5 font-medium max-w-[200px]">
                      <div className="text-[#0E1726] font-bold truncate">{b.pickupLocation}</div>
                      <div className="text-[#475569] text-[11px] truncate">To: {b.dropoffLocation}</div>
                    </td>

                    {/* Date */}
                    <td className="py-4 px-5 font-medium text-[#0E1726]">
                      <div>{b.pickupDate}</div>
                      <div className="text-[11px] text-[#475569]">{b.pickupTime}</div>
                    </td>

                    {/* Fare */}
                    <td className="py-4 px-5 font-black text-[#0B192C]">
                      {formatCurrency(b.estimatedPrice)}
                    </td>

                    {/* Status */}
                    <td className="py-4 px-5">
                      <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full inline-block ${
                        b.status === 'Completed' ? 'bg-green-100 text-green-800' :
                        b.status === 'Confirmed' || b.status === 'Assigned' ? 'bg-[#9BC800]/20 text-[#0B192C]' :
                        b.status === 'Pending' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {b.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/account/bookings/${b.id}`}
                          className="p-2 rounded-xl bg-[#F4F6F9] text-[#003366] hover:bg-[#0B192C] hover:text-white transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>

                        <button
                          onClick={() => downloadReceiptPdf(b)}
                          className="p-2 rounded-xl bg-[#F4F6F9] text-[#003366] hover:bg-[#9BC800] hover:text-[#0B192C] transition-colors cursor-pointer"
                          title="Download Receipt PDF"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-[#475569] font-medium">
                    No bookings found matching your search or filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
