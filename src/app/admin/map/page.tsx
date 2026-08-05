'use client';

import React, { useState, useEffect } from 'react';
import {
  CalendarCheck,
  Car,
  Clock,
  CheckCircle2,
  Users,
  DollarSign,
  TrendingUp,
  Activity,
  ShieldCheck,
  BarChart3,
  AlertCircle,
  Percent,
} from 'lucide-react';
import {
  subscribeToBookings,
  subscribeToFleet,
  subscribeToCustomers,
} from '@/lib/firebase/services/admin-db-service';
import { AdminBooking, AdminCustomer } from '@/types/admin';
import { Vehicle } from '@/types';
import { formatCurrency } from '@/lib/utils';

export default function AdminOperationsHubPage() {
  const [bookings, setBookings] = useState<AdminBooking[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [customers, setCustomers] = useState<AdminCustomer[]>([]);

  useEffect(() => {
    const unsubBookings = subscribeToBookings((data) => setBookings(data));
    const unsubFleet = subscribeToFleet((data) => setVehicles(data));
    const unsubCustomers = subscribeToCustomers((data) => setCustomers(data));

    return () => {
      unsubBookings();
      unsubFleet();
      unsubCustomers();
    };
  }, []);

  const todayStr = new Date().toISOString().split('T')[0];

  const todaysBookings = bookings.filter((b) => b.pickupDate === todayStr || b.createdAt.startsWith(todayStr));
  const pendingCount = bookings.filter((b) => b.status === 'Pending').length;
  const confirmedCount = bookings.filter((b) => b.status === 'Confirmed' || b.status === 'Driver Assigned').length;
  const completedCount = bookings.filter((b) => b.status === 'Trip Completed' || b.status === 'Closed').length;

  const totalVehicles = vehicles.length;
  const availableVehicles = vehicles.filter((v) => v.isAvailable).length;
  const vehiclesInService = vehicles.filter((v) => !v.isAvailable).length;
  const utilizationRate = totalVehicles > 0 ? Math.round((vehiclesInService / totalVehicles) * 100) : 0;

  const grossRevenue = bookings
    .filter((b) => b.status !== 'Cancelled')
    .reduce((sum, b) => sum + (b.totalAmount || b.estimatedPrice || 0), 0);

  return (
    <div className="space-y-6 text-[#0E1726]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-[#0B192C]/10 shadow-sm">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-[#003366] bg-[#003366]/10 px-3 py-1 rounded-full border border-[#003366]/15">
            OPERATIONS & FLEET UTILIZATION
          </span>
          <h1 className="font-display text-2xl font-black text-[#0E1726] mt-2">
            Operational Metrics Hub
          </h1>
          <p className="text-xs text-[#475569] font-medium mt-0.5">
            Realtime dispatch efficiency, fleet capacity utilization, and revenue performance.
          </p>
        </div>
      </div>

      {/* Grid Stats KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-[#0B192C]/10 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-black uppercase text-[#003366]">Today&apos;s Bookings</span>
            <CalendarCheck className="w-5 h-5 text-[#003366]" />
          </div>
          <span className="font-display text-3xl font-black text-[#0E1726]">{todaysBookings.length}</span>
          <span className="text-[11px] font-bold text-slate-500 block">Received for {todayStr}</span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-[#0B192C]/10 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-amber-600">
            <span className="text-xs font-black uppercase text-amber-700">Pending Requests</span>
            <Clock className="w-5 h-5" />
          </div>
          <span className="font-display text-3xl font-black text-amber-700">{pendingCount}</span>
          <span className="text-[11px] font-bold text-amber-600 block">Awaiting Vehicle Allocation</span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-[#0B192C]/10 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-emerald-600">
            <span className="text-xs font-black uppercase text-emerald-700">Confirmed / Active</span>
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <span className="font-display text-3xl font-black text-emerald-700">{confirmedCount}</span>
          <span className="text-[11px] font-bold text-emerald-600 block">Allocated & En Route</span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-[#0B192C]/10 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-[#003366]">
            <span className="text-xs font-black uppercase text-[#003366]">Total Gross Revenue</span>
            <DollarSign className="w-5 h-5 text-[#9BC800]" />
          </div>
          <span className="font-display text-3xl font-black text-[#0E1726]">{formatCurrency(grossRevenue)}</span>
          <span className="text-[11px] font-bold text-slate-500 block">Live Firestore Financial Audit</span>
        </div>
      </div>

      {/* Fleet Utilization & Operations Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Fleet Capacity & Availability Bar */}
        <div className="lg:col-span-6 bg-white p-6 rounded-3xl border border-[#0B192C]/10 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h3 className="font-display text-base font-black text-[#0E1726] flex items-center gap-2">
              <Car className="w-5 h-5 text-[#003366]" /> Fleet Availability & Utilization
            </h3>
            <span className="text-xs font-black text-[#9BC800] bg-[#0B192C] px-3 py-1 rounded-full">
              {utilizationRate}% Capacity Utilized
            </span>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-slate-600">
              <span>Vehicles in Service ({vehiclesInService})</span>
              <span>Available Vehicles ({availableVehicles})</span>
            </div>
            <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden flex">
              <div className="bg-[#003366] h-full transition-all duration-500" style={{ width: `${utilizationRate}%` }} />
              <div className="bg-[#9BC800] h-full transition-all duration-500" style={{ width: `${100 - utilizationRate}%` }} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="bg-[#F4F6F9] p-4 rounded-2xl border border-slate-200 space-y-1">
              <span className="text-[10px] font-extrabold uppercase text-slate-500 block">Available Vehicles</span>
              <span className="font-display text-2xl font-black text-emerald-700 block">{availableVehicles}</span>
              <span className="text-slate-500 block text-[11px]">Ready for Dispatch</span>
            </div>
            <div className="bg-[#F4F6F9] p-4 rounded-2xl border border-slate-200 space-y-1">
              <span className="text-[10px] font-extrabold uppercase text-slate-500 block">Vehicles in Service</span>
              <span className="font-display text-2xl font-black text-[#003366] block">{vehiclesInService}</span>
              <span className="text-slate-500 block text-[11px]">Currently On Hire</span>
            </div>
          </div>
        </div>

        {/* Right Column: Recent Activity Feed */}
        <div className="lg:col-span-6 bg-white p-6 rounded-3xl border border-[#0B192C]/10 shadow-sm space-y-4">
          <h3 className="font-display text-base font-black text-[#0E1726] flex items-center gap-2 border-b border-slate-100 pb-3">
            <Activity className="w-5 h-5 text-[#003366]" /> Realtime Activity Feed
          </h3>

          <div className="space-y-3 custom-scrollbar max-h-[280px] overflow-y-auto text-xs">
            {bookings.length === 0 ? (
              <p className="text-slate-400 font-bold text-center py-8">No recent dispatch activity logged.</p>
            ) : (
              bookings.slice(0, 5).map((b) => (
                <div key={b.id} className="p-3.5 rounded-2xl bg-[#F4F6F9] border border-slate-200 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="font-black text-[#003366] block">#{b.referenceCode} — {b.customerName}</span>
                    <span className="text-slate-500 text-[11px] block">{b.serviceType} • {b.pickupLocation}</span>
                  </div>
                  <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase bg-[#9BC800]/20 text-[#0B192C]">
                    {b.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
