'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, DollarSign, Download, Printer, FileSpreadsheet, Calendar, Car } from 'lucide-react';
import { subscribeToBookings } from '@/lib/firebase/services/admin-db-service';
import { AdminBooking } from '@/types/admin';

export default function AdminReportsPage() {
  const [bookings, setBookings] = useState<AdminBooking[]>([]);

  useEffect(() => {
    const unsub = subscribeToBookings((data) => setBookings(data));
    return () => unsub();
  }, []);

  const totalRevenue = bookings
    .filter((b) => b.status !== 'Cancelled')
    .reduce((sum, b) => sum + (b.totalAmount || b.estimatedPrice || 0), 0);

  const completedCount = bookings.filter((b) => b.status === 'Trip Completed' || b.status === 'Closed').length;
  const pendingCount = bookings.filter((b) => b.status === 'Pending').length;

  const handleExportCSV = () => {
    const headers = ['RefCode', 'CustomerName', 'ServiceType', 'PickupLocation', 'DropoffLocation', 'Amount', 'Status', 'Date'];
    const rows = bookings.map((b) => [
      b.referenceCode,
      `"${b.customerName}"`,
      `"${b.serviceType}"`,
      `"${b.pickupLocation}"`,
      `"${b.dropoffLocation}"`,
      b.totalAmount || b.estimatedPrice || 0,
      b.status,
      b.pickupDate,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `ChimJoy_Financial_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-[#0B192C]/10 shadow-sm">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-[#003366] bg-[#003366]/10 px-3 py-1 rounded-full border border-[#003366]/15">
            EXECUTIVE ANALYTICS
          </span>
          <h1 className="font-display text-2xl font-black text-[#0E1726] mt-2">
            Reports & Revenue Analytics
          </h1>
          <p className="text-xs text-[#475569] font-medium mt-0.5">
            Download financial audits, revenue distribution, and fleet utilization metrics.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCSV}
            className="px-4 py-2.5 rounded-xl bg-[#003366] hover:bg-[#0B192C] text-white text-xs font-black uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <FileSpreadsheet className="w-4 h-4 text-[#9BC800]" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={() => window.print()}
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0E1726] text-xs font-black uppercase tracking-wider flex items-center gap-2 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print Report</span>
          </button>
        </div>
      </div>

      {/* Financial Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-[#0B192C]/10 shadow-sm space-y-2">
          <span className="text-xs font-extrabold text-[#475569] uppercase tracking-wider">Gross Total Revenue</span>
          <span className="font-display text-3xl font-black text-[#0E1726] block">₦{totalRevenue.toLocaleString()}</span>
          <span className="text-xs text-slate-500 font-bold block">Live Firestore Financial Data</span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-[#0B192C]/10 shadow-sm space-y-2">
          <span className="text-xs font-extrabold text-[#475569] uppercase tracking-wider">Completed Trips</span>
          <span className="font-display text-3xl font-black text-[#003366] block">{completedCount}</span>
          <span className="text-xs text-slate-500 font-bold block">Fulfillment tracking</span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-[#0B192C]/10 shadow-sm space-y-2">
          <span className="text-xs font-extrabold text-[#475569] uppercase tracking-wider">Average Trip Value</span>
          <span className="font-display text-3xl font-black text-emerald-700 block">
            ₦{bookings.length > 0 ? Math.round(totalRevenue / bookings.length).toLocaleString() : 0}
          </span>
          <span className="text-xs text-slate-500 font-bold block">Per booking transaction</span>
        </div>
      </div>

      {/* Reports Table Summary */}
      <div className="bg-white rounded-3xl border border-[#0B192C]/10 shadow-sm p-6 space-y-4">
        <h3 className="font-display text-lg font-black text-[#0E1726] border-b border-slate-100 pb-3">
          Transaction Audit Statement
        </h3>
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#0B192C] text-[#9BC800] uppercase text-[10px] tracking-wider font-extrabold">
                <th className="p-3.5">Ref Code</th>
                <th className="p-3.5">Date</th>
                <th className="p-3.5">Customer</th>
                <th className="p-3.5">Service Type</th>
                <th className="p-3.5">Amount</th>
                <th className="p-3.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-400 font-extrabold text-xs">
                    No transaction records found in database.
                  </td>
                </tr>
              ) : (
                bookings.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50">
                    <td className="p-3.5 font-black text-[#003366]">#{b.referenceCode}</td>
                    <td className="p-3.5">{b.pickupDate}</td>
                    <td className="p-3.5 font-bold text-[#0E1726]">{b.customerName}</td>
                    <td className="p-3.5">{b.serviceType}</td>
                    <td className="p-3.5 font-black text-[#0E1726]">₦{(b.totalAmount || b.estimatedPrice || 0).toLocaleString()}</td>
                    <td className="p-3.5 font-bold text-emerald-700">{b.status}</td>
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
