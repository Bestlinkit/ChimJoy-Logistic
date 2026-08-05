'use client';

import React, { use, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Calendar, User, Phone, Mail, MapPin, Printer, ArrowLeft, CheckCircle2, MessageCircle, ShieldCheck, Car, UserCheck, RefreshCw } from 'lucide-react';
import { AdminBooking, BookingStatus, AdminDriver } from '@/types/admin';
import { Vehicle } from '@/types';
import { getBookings } from '@/lib/firebase/services/booking-service';
import { subscribeToFleet, subscribeToDrivers, assignVehicleAndDriverInDb, updateBookingStatusInDb } from '@/lib/firebase/services/admin-db-service';
import { formatCurrency, generateWhatsAppUrl } from '@/lib/utils';
import { GlassCard } from '@/components/ui/glass-card';
import { LuxuryBadge } from '@/components/ui/luxury-badge';
import { LuxuryButton } from '@/components/ui/luxury-button';
import { sendBookingConfirmedEmail } from '@/lib/services/email-service';

export default function DetailedBookingPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [booking, setBooking] = useState<AdminBooking | null>(null);
  const [fleet, setFleet] = useState<Vehicle[]>([]);
  const [drivers, setDrivers] = useState<AdminDriver[]>([]);

  const [selectedVehicleId, setSelectedVehicleId] = useState('');
  const [selectedDriverId, setSelectedDriverId] = useState('');
  const [newStatus, setNewStatus] = useState<BookingStatus>('Pending');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    getBookings().then((list) => {
      const found = list.find((b) => b.id === resolvedParams.id);
      if (found) {
        setBooking(found);
        setSelectedVehicleId(found.vehicleId || '');
        setSelectedDriverId(found.driverId || '');
        setNewStatus(found.status);
      }
    });

    const unsubFleet = subscribeToFleet(setFleet);
    const unsubDrivers = subscribeToDrivers(setDrivers);

    return () => {
      unsubFleet();
      unsubDrivers();
    };
  }, [resolvedParams.id]);

  if (!booking) return <div className="p-8 text-white font-bold">Loading Booking Details...</div>;

  const handleSaveChanges = async () => {
    setIsSaving(true);
    try {
      const assignedVehicle = fleet.find((v) => v.id === selectedVehicleId);
      const assignedDriver = drivers.find((d) => d.id === selectedDriverId);

      await assignVehicleAndDriverInDb(
        booking.id,
        selectedVehicleId,
        assignedVehicle ? assignedVehicle.name : booking.vehicleName || 'Executive SUV',
        selectedDriverId,
        assignedDriver ? assignedDriver.name : booking.driverName || 'Chinedu Okeke',
        assignedDriver ? assignedDriver.phone : booking.driverPhone || '+234 800 000 0000'
      );

      await updateBookingStatusInDb(booking.id, newStatus);

      if (newStatus === 'Confirmed' && booking.customerEmail) {
        await sendBookingConfirmedEmail(
          booking.customerEmail,
          booking.customerName,
          booking.referenceCode,
          assignedVehicle ? assignedVehicle.name : booking.vehicleName || 'Executive SUV',
          booking.pickupLocation,
          `${booking.pickupDate} at ${booking.pickupTime}`,
          assignedDriver ? assignedDriver.name : booking.driverName || 'Assigned Chauffeur',
          assignedDriver ? assignedDriver.phone : booking.driverPhone || '+234 800 000 0000',
          booking.estimatedPrice || booking.totalAmount || 0
        ).catch((err) => console.warn('[Email Error]:', err));
      }

      alert('✓ Administrative assignment and status updated successfully!');
      router.refresh();
    } catch (err: any) {
      console.error('[Assignment Error]:', err);
      alert(`Assignment Error: ${err.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto p-4 sm:p-6 text-white">
      <div>
        <button onClick={() => router.back()} className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-[#9BC800] transition-colors mb-4 cursor-pointer">
          <ArrowLeft className="w-4 h-4" /> Back to Operations Matrix
        </button>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-[#9BC800] block mb-1">RESERVATION DISPATCH & ALLOCATION</span>
            <h1 className="font-display text-2xl sm:text-3xl font-black">Booking {booking.referenceCode}</h1>
          </div>
          <LuxuryBadge variant={booking.status === 'Confirmed' ? 'emerald' : booking.status === 'Cancelled' ? 'dark' : 'gold'}>
            {booking.status}
          </LuxuryBadge>
        </div>
      </div>

      {/* Main Details Card */}
      <GlassCard variant="dark" className="p-6 sm:p-8 border border-white/15 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs border-b border-white/10 pb-6">
          <div className="space-y-1">
            <span className="text-slate-400 block text-[10px] uppercase font-extrabold">Customer Information</span>
            <span className="font-extrabold text-white text-base block">{booking.customerName}</span>
            <span className="text-slate-300 block font-mono">{booking.customerEmail}</span>
            <span className="text-slate-300 block font-mono">{booking.customerPhone}</span>
          </div>

          <div className="space-y-1">
            <span className="text-slate-400 block text-[10px] uppercase font-extrabold">Service & Route</span>
            <span className="font-bold text-[#9BC800] text-base block">{booking.serviceType}</span>
            <span className="text-slate-300 block">From: <strong>{booking.pickupLocation}</strong></span>
            <span className="text-slate-300 block">To: <strong>{booking.dropoffLocation}</strong></span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-1">
            <span className="text-slate-400 text-[10px] uppercase font-extrabold block">Schedule</span>
            <span className="font-extrabold text-white text-sm block">{booking.pickupDate}</span>
            <span className="text-slate-400 block">Time: {booking.pickupTime}</span>
          </div>

          <div className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-1">
            <span className="text-slate-400 text-[10px] uppercase font-extrabold block">Assigned Vehicle</span>
            <span className="font-extrabold text-[#9BC800] text-sm block">{booking.vehicleName || 'Pending Allocation'}</span>
          </div>

          <div className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-1">
            <span className="text-slate-400 text-[10px] uppercase font-extrabold block">Assigned Chauffeur</span>
            <span className="font-extrabold text-emerald-400 text-sm block">{booking.driverName || 'Pending Allocation'}</span>
            {booking.driverPhone ? <span className="text-slate-400 block">{booking.driverPhone}</span> : null}
          </div>
        </div>

        {/* Administrative Allocation Panel */}
        <div className="p-6 rounded-3xl bg-[#081322] border border-[#9BC800]/30 space-y-4">
          <div className="flex items-center gap-2 border-b border-white/10 pb-3">
            <Car className="w-5 h-5 text-[#9BC800]" />
            <h3 className="font-display text-base font-extrabold text-white">Administrative Vehicle & Driver Dispatch</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="space-y-1">
              <label className="font-extrabold text-slate-300">Assign Vehicle</label>
              <select
                value={selectedVehicleId}
                onChange={(e) => setSelectedVehicleId(e.target.value)}
                className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white font-bold text-xs"
              >
                <option value="" className="bg-[#0B192C]">-- Select Vehicle --</option>
                {fleet.map((v) => (
                  <option key={v.id} value={v.id} className="bg-[#0B192C]">
                    {v.name} (₦{v.pricePerDay.toLocaleString()}/day)
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-extrabold text-slate-300">Assign Driver</label>
              <select
                value={selectedDriverId}
                onChange={(e) => setSelectedDriverId(e.target.value)}
                className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white font-bold text-xs"
              >
                <option value="" className="bg-[#0B192C]">-- Select Chauffeur --</option>
                {drivers.map((d) => (
                  <option key={d.id} value={d.id} className="bg-[#0B192C]">
                    {d.name} ({d.status})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-extrabold text-slate-300">Update Booking Status</label>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value as BookingStatus)}
                className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white font-bold text-xs"
              >
                <option value="Pending" className="bg-[#0B192C]">Pending</option>
                <option value="Confirmed" className="bg-[#0B192C]">Confirmed</option>
                <option value="Driver Assigned" className="bg-[#0B192C]">Driver Assigned</option>
                <option value="In Progress" className="bg-[#0B192C]">In Progress</option>
                <option value="Completed" className="bg-[#0B192C]">Completed</option>
                <option value="Cancelled" className="bg-[#0B192C]">Cancelled</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleSaveChanges}
            disabled={isSaving}
            className="w-full py-3.5 rounded-xl bg-[#9BC800] hover:bg-[#8ab300] text-[#0B192C] text-xs font-black uppercase tracking-wider transition-all shadow-lemon flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
            <span>Save Allocation & Update Status</span>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between">
          <button
            onClick={() => window.print()}
            className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer"
          >
            <Printer className="w-4 h-4" /> Print Dispatch Slip
          </button>

          <a
            href={generateWhatsAppUrl({
              referenceCode: booking.referenceCode,
              customerName: booking.customerName,
              serviceType: booking.serviceType,
              pickupLocation: booking.pickupLocation,
              dropoffLocation: booking.dropoffLocation,
              pickupDate: booking.pickupDate,
              pickupTime: booking.pickupTime,
              vehicleName: booking.vehicleName || 'Standard Executive SUV',
              estimatedPrice: booking.estimatedPrice,
            })}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-[#25D366] text-white rounded-xl text-xs font-extrabold flex items-center gap-2 shadow-md hover:bg-[#20ba5a] transition-all cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-current" /> WhatsApp Dispatch
          </a>
        </div>
      </GlassCard>
    </div>
  );
}
