'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarCheck, Search, Filter, Edit, Printer, Plus, UserCheck, ShieldCheck, CheckCircle2, Clock } from 'lucide-react';
import {
  subscribeToBookings,
  subscribeToDrivers,
  updateBookingStatusInDb,
  assignDriverToBookingInDb,
} from '@/lib/firebase/services/admin-db-service';
import { logAdminAction } from '@/lib/firebase/services/admin-audit-service';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { AdminBooking, BookingStatus, AdminDriver } from '@/types/admin';
import { formatCurrency } from '@/lib/utils';
import { DispatchOperationsPanel } from '@/components/admin/DispatchOperationsPanel';

export default function AdminBookingsPage() {
  const { adminUser } = useAdminAuth();
  const [bookings, setBookings] = useState<AdminBooking[]>([]);
  const [drivers, setDrivers] = useState<AdminDriver[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const [selectedBooking, setSelectedBooking] = useState<AdminBooking | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newStatus, setNewStatus] = useState<BookingStatus>('Confirmed');
  const [selectedDriverId, setSelectedDriverId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const unsubBookings = subscribeToBookings((data) => setBookings(data));
    const unsubDrivers = subscribeToDrivers((data) => setDrivers(data));
    return () => {
      unsubBookings();
      unsubDrivers();
    };
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBooking || !adminUser) return;
    setIsSubmitting(true);

    try {
      if (selectedDriverId) {
        const driverObj = drivers.find((d) => d.id === selectedDriverId);
        await assignDriverToBookingInDb(
          selectedBooking.id,
          selectedDriverId,
          driverObj ? driverObj.name : 'Chinedu Driver',
          driverObj ? driverObj.phone : '+234 807 788 0262'
        );
      } else {
        await updateBookingStatusInDb(selectedBooking.id, newStatus);
      }

      await logAdminAction(
        adminUser.email,
        adminUser.role,
        'UPDATE_BOOKING_STATUS',
        'Bookings',
        `Updated booking #${selectedBooking.referenceCode} status to ${newStatus}`,
        selectedBooking.status,
        newStatus
      );

      setIsModalOpen(false);
      setSelectedBooking(null);
    } catch (err) {
      console.error('[Update Error]:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.referenceCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.customerPhone.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-[#0B192C]/10 shadow-sm">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-[#003366] bg-[#003366]/10 px-3 py-1 rounded-full border border-[#003366]/15">
            OPERATIONAL MANAGEMENT
          </span>
          <h1 className="font-display text-2xl font-black text-[#0E1726] mt-2">
            Ride Bookings Management
          </h1>
          <p className="text-xs text-[#475569] font-medium mt-0.5">
            Realtime dispatch feed for airport transfers, executive rides, and city trips.
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0E1726] text-xs font-black uppercase tracking-wider flex items-center gap-2 cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          <span>Print Manifest</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-3xl border border-[#0B192C]/10 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3 bg-[#F4F6F9] border border-slate-300 rounded-2xl px-3.5 py-2.5 w-full sm:w-80">
          <Search className="w-4 h-4 text-[#003366] shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter by ref code, customer, phone..."
            className="w-full bg-transparent font-medium text-[#0E1726] focus:outline-none placeholder:text-slate-400 text-xs"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-[#003366]" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="p-2.5 rounded-xl bg-[#F4F6F9] border border-slate-300 font-bold text-[#0E1726] focus:outline-none cursor-pointer text-xs w-full sm:w-48"
          >
            <option value="all">All Statuses ({bookings.length})</option>
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Driver Assigned">Driver Assigned</option>
            <option value="Driver En Route">Driver En Route</option>
            <option value="Passenger Picked Up">Passenger Picked Up</option>
            <option value="Trip Started">Trip Started</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
            <option value="No Show">No Show</option>
          </select>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-3xl border border-[#0B192C]/10 shadow-sm overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#0B192C] text-white uppercase text-[10px] tracking-wider font-extrabold">
                <th className="p-4">Ref Code</th>
                <th className="p-4">Customer Details</th>
                <th className="p-4">Service</th>
                <th className="p-4">Pickup / Dropoff</th>
                <th className="p-4">Vehicle</th>
                <th className="p-4">Driver</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-slate-400 font-bold">
                    No bookings found matching filter criteria.
                  </td>
                </tr>
              ) : (
                filteredBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-black text-[#003366]">#{b.referenceCode}</td>
                    <td className="p-4">
                      <span className="font-extrabold text-[#0E1726] block">{b.customerName}</span>
                      <span className="text-[10px] text-slate-500 block">{b.customerEmail}</span>
                      <span className="text-[10px] text-slate-500 block">{b.customerPhone}</span>
                    </td>
                    <td className="p-4 font-bold text-[#0E1726]">{b.serviceType}</td>
                    <td className="p-4 text-slate-600 max-w-[160px]">
                      <span className="font-bold text-[#0E1726] block truncate">{b.pickupLocation}</span>
                      <span className="text-[10px] text-slate-400 block truncate">➔ {b.dropoffLocation}</span>
                      <span className="text-[10px] text-slate-500 font-semibold block">{b.pickupDate} at {b.pickupTime}</span>
                    </td>
                    <td className="p-4 font-bold text-[#0E1726]">{b.vehicleName || 'Standard SUV'}</td>
                    <td className="p-4">
                      {b.driverName ? (
                        <span className="font-extrabold text-emerald-700 block">{b.driverName}</span>
                      ) : (
                        <span className="text-amber-600 font-bold text-[10px] block">Unassigned</span>
                      )}
                    </td>
                    <td className="p-4 font-black text-[#003366]">₦{(b.totalAmount || b.estimatedPrice || 0).toLocaleString()}</td>
                    <td className="p-4">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedBooking(b);
                          setNewStatus(b.status);
                          setSelectedDriverId(b.driverId || '');
                          setIsModalOpen(true);
                        }}
                        className="px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-wider bg-slate-100 hover:scale-105 transition-transform cursor-pointer"
                      >
                        {b.status}
                      </button>
                    </td>
                    <td className="p-4 text-right space-x-1">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedBooking(b);
                          setNewStatus(b.status);
                          setSelectedDriverId(b.driverId || '');
                          setIsModalOpen(true);
                        }}
                        className="p-2 rounded-xl bg-[#003366] text-white hover:bg-[#0B192C] transition-colors"
                        title="Edit Status / Assign Driver"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ENTERPRISE DISPATCH OPERATIONS PANEL */}
      {isModalOpen && selectedBooking && (
        <DispatchOperationsPanel
          booking={selectedBooking}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedBooking(null);
          }}
          adminName={adminUser?.name || 'Administrator'}
        />
      )}
    </div>
  );
}
