'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar, Car, Clock, ShieldCheck, CheckCircle2, AlertCircle, ArrowUpRight, MessageCircle, Activity, HeartPulse } from 'lucide-react';
import { BookingRequest, Vehicle } from '@/types';
import { getBookings, updateBookingStatus } from '@/lib/firebase/services/booking-service';
import { getVehicles } from '@/lib/firebase/services/fleet-service';
import { formatCurrency, generateWhatsAppUrl } from '@/lib/utils';
import { GlassCard } from '@/components/ui/glass-card';
import { LuxuryBadge } from '@/components/ui/luxury-badge';
import { ModalDrawer } from '@/components/ui/modal-drawer';
import { OwerriWeatherWidget } from '@/components/admin/owerri-weather-widget';

export default function AdminDashboardPage() {
  const [bookings, setBookings] = useState<BookingRequest[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<BookingRequest | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Modal edit fields
  const [driverName, setDriverName] = useState('');
  const [vehicleNo, setVehicleNo] = useState('');
  const [adminNotes, setAdminNotes] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const bData = await getBookings();
    const vData = await getVehicles();
    setBookings(bData);
    setVehicles(vData);
  };

  const pendingCount = bookings.filter((b) => b.status === 'Pending').length;
  const confirmedCount = bookings.filter((b) => b.status === 'Confirmed' || b.status === 'Assigned').length;
  const activeFleetCount = vehicles.filter((v) => v.isAvailable).length;

  const handleOpenDispatch = (b: BookingRequest) => {
    setSelectedBooking(b);
    setDriverName(b.assignedDriver || '');
    setVehicleNo(b.assignedVehicleNo || '');
    setAdminNotes(b.adminNotes || '');
    setIsModalOpen(true);
  };

  const handleUpdateStatus = async (status: BookingRequest['status']) => {
    if (!selectedBooking) return;
    await updateBookingStatus(selectedBooking.id, status, adminNotes, driverName, vehicleNo);
    setIsModalOpen(false);
    fetchData();
  };

  return (
    <div className="space-y-8">
      {/* Top Banner Row (Owerri Weather & Business Health) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
          {/* Welcome & Business Health Card */}
          <GlassCard variant="gold" className="p-6 border border-[#D4AF37]/40 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <LuxuryBadge variant="emerald" className="py-0.5 px-2">Operations Operations Center Active</LuxuryBadge>
                <h2 className="font-display text-2xl font-extrabold text-white mt-1">Welcome, Chief Dispatcher</h2>
                <p className="text-xs text-slate-300">Operational performance index across Owerri, Sam Mbakwe Airport QOW & Intercity Convoys.</p>
              </div>
              <div className="text-right">
                <span className="text-3xl font-black text-[#F5D061]">98%</span>
                <span className="text-[10px] text-slate-300 uppercase font-bold block">Business Health Score</span>
              </div>
            </div>
          </GlassCard>

          {/* Analytics KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <GlassCard variant="dark" className="p-5 border border-white/10 space-y-1">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-[10px] font-bold uppercase tracking-wider">Total Requests</span>
                <Calendar className="w-4 h-4 text-blue-400" />
              </div>
              <span className="text-2xl font-black text-white block">{bookings.length}</span>
              <span className="text-[10px] text-slate-400">All-time booking requests</span>
            </GlassCard>

            <GlassCard variant="dark" className="p-5 border border-amber-500/30 space-y-1">
              <div className="flex items-center justify-between text-[#F5D061]">
                <span className="text-[10px] font-bold uppercase tracking-wider">Pending Review</span>
                <Clock className="w-4 h-4 animate-pulse" />
              </div>
              <span className="text-2xl font-black text-[#F5D061] block">{pendingCount}</span>
              <span className="text-[10px] text-amber-300">Requires manual dispatch</span>
            </GlassCard>

            <GlassCard variant="dark" className="p-5 border border-emerald-500/30 space-y-1">
              <div className="flex items-center justify-between text-[#06D6A0]">
                <span className="text-[10px] font-bold uppercase tracking-wider">Active Convoys</span>
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <span className="text-2xl font-black text-[#06D6A0] block">{confirmedCount}</span>
              <span className="text-[10px] text-emerald-300">Chauffeur assigned</span>
            </GlassCard>
          </div>
        </div>

        {/* Right Column: Owerri Live Weather Widget */}
        <div className="lg:col-span-4">
          <OwerriWeatherWidget />
        </div>
      </div>

      {/* Bookings Dispatch Table */}
      <div className="glass-dark rounded-3xl p-6 border border-white/15 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display text-xl font-bold text-white">Recent Booking Requests</h2>
            <p className="text-xs text-slate-400">Click any request to review details, assign driver, or trigger WhatsApp dispatch.</p>
          </div>
          <Link href="/admin/bookings" className="text-xs font-bold text-[#F5D061] hover:underline flex items-center gap-1">
            View All <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/15 text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-4">Ref Code</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Service & Vehicle</th>
                <th className="py-3 px-4">Pickup Route</th>
                <th className="py-3 px-4">Schedule</th>
                <th className="py-3 px-4">Est. Rate</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {bookings.map((b) => (
                <tr key={b.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-4 px-4 font-mono font-bold text-[#F5D061]">{b.referenceCode}</td>
                  <td className="py-4 px-4">
                    <span className="font-bold text-white block">{b.customerName}</span>
                    <span className="text-slate-400">{b.customerPhone}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-bold text-white capitalize block">{b.serviceType}</span>
                    <span className="text-slate-400">{b.vehicleName}</span>
                  </td>
                  <td className="py-4 px-4 max-w-xs truncate text-slate-300">
                    {b.pickupLocation} ➔ {b.dropoffLocation}
                  </td>
                  <td className="py-4 px-4 text-slate-300">
                    {b.pickupDate} @ {b.pickupTime}
                  </td>
                  <td className="py-4 px-4 font-extrabold text-[#06D6A0]">
                    {formatCurrency(b.estimatedPrice)}
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                      b.status === 'Pending'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        : b.status === 'Confirmed'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-blue-500/20 text-blue-300'
                    }`}>
                      {b.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <button
                      onClick={() => handleOpenDispatch(b)}
                      className="px-3 py-1.5 bg-[#00509D] hover:bg-blue-600 text-white rounded-lg font-bold text-[11px] transition-colors"
                    >
                      Manage
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* DISPATCH MANAGEMENT MODAL */}
      {selectedBooking && (
        <ModalDrawer
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={`Manage Booking ${selectedBooking.referenceCode}`}
          subtitle={`Customer: ${selectedBooking.customerName}`}
        >
          <div className="space-y-6 text-slate-900">
            {/* Itinerary Details */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Service:</span>
                <span className="font-bold uppercase text-slate-900">{selectedBooking.serviceType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Pickup:</span>
                <span className="font-bold text-slate-900">{selectedBooking.pickupLocation}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Destination:</span>
                <span className="font-bold text-slate-900">{selectedBooking.dropoffLocation}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Schedule:</span>
                <span className="font-bold text-slate-900">{selectedBooking.pickupDate} at {selectedBooking.pickupTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Est. Rate:</span>
                <span className="font-black text-[#00509D] text-sm">{formatCurrency(selectedBooking.estimatedPrice)}</span>
              </div>
            </div>

            {/* Allocation Form */}
            <div className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold uppercase tracking-wider text-slate-700">Assign Driver Name</label>
                <input
                  type="text"
                  value={driverName}
                  onChange={(e) => setDriverName(e.target.value)}
                  placeholder="e.g. Mazi Innocent Ibe"
                  className="w-full p-3 border border-slate-300 rounded-xl font-medium focus:outline-none focus:border-[#00509D]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold uppercase tracking-wider text-slate-700">Assign Vehicle Reg No.</label>
                <input
                  type="text"
                  value={vehicleNo}
                  onChange={(e) => setVehicleNo(e.target.value)}
                  placeholder="e.g. IMO 884-CJ"
                  className="w-full p-3 border border-slate-300 rounded-xl font-medium focus:outline-none focus:border-[#00509D]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold uppercase tracking-wider text-slate-700">Internal Admin Notes</label>
                <textarea
                  rows={2}
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="e.g. Driver briefed for airport arrival clearance."
                  className="w-full p-3 border border-slate-300 rounded-xl font-medium focus:outline-none focus:border-[#00509D]"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center gap-3">
              <button
                onClick={() => handleUpdateStatus('Confirmed')}
                className="flex-1 py-3 bg-[#06D6A0] text-slate-950 rounded-xl font-bold text-xs hover:brightness-105"
              >
                Confirm Request
              </button>
              <button
                onClick={() => handleUpdateStatus('Completed')}
                className="flex-1 py-3 bg-[#00509D] text-white rounded-xl font-bold text-xs hover:bg-blue-700"
              >
                Mark Completed
              </button>
              <a
                href={generateWhatsAppUrl({
                  referenceCode: selectedBooking.referenceCode,
                  customerName: selectedBooking.customerName,
                  serviceType: selectedBooking.serviceType,
                  pickupLocation: selectedBooking.pickupLocation,
                  dropoffLocation: selectedBooking.dropoffLocation,
                  pickupDate: selectedBooking.pickupDate,
                  pickupTime: selectedBooking.pickupTime,
                  vehicleName: selectedBooking.vehicleName,
                  estimatedPrice: selectedBooking.estimatedPrice,
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 bg-[#25D366] text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-current" /> WhatsApp Customer
              </a>
            </div>
          </div>
        </ModalDrawer>
      )}
    </div>
  );
}
