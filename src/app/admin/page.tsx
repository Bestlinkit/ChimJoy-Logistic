'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CalendarCheck,
  Car,
  Clock,
  CheckCircle2,
  XCircle,
  Users,
  TrendingUp,
  DollarSign,
  UserCheck,
  MapPin,
  ArrowUpRight,
  Plus,
  Printer,
  Edit,
  Eye,
  ChevronRight,
  ShieldCheck,
  AlertCircle,
  Truck,
  Sparkles,
  Search,
  Filter,
  FileSpreadsheet,
} from 'lucide-react';
import {
  subscribeToBookings,
  subscribeToFleet,
  subscribeToDrivers,
  subscribeToCustomers,
  subscribeToNotifications,
  updateBookingStatusInDb,
  assignDriverToBookingInDb,
} from '@/lib/firebase/services/admin-db-service';
import { logAdminAction } from '@/lib/firebase/services/admin-audit-service';
import { subscribeToAuditLogs } from '@/lib/firebase/services/admin-audit-service';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { AdminBooking, BookingStatus, AdminDriver, AdminCustomer, AuditLog } from '@/types/admin';
import { Vehicle } from '@/types';
import { formatCurrency } from '@/lib/utils';

export default function AdminDashboardPage() {
  const router = useRouter();
  const { adminUser } = useAdminAuth();

  // Firestore Realtime State
  const [bookings, setBookings] = useState<AdminBooking[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [drivers, setDrivers] = useState<AdminDriver[]>([]);
  const [customers, setCustomers] = useState<AdminCustomer[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);

  // Modal State for Status Update & Driver Assignment
  const [selectedBooking, setSelectedBooking] = useState<AdminBooking | null>(null);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [newStatus, setNewStatus] = useState<BookingStatus>('Confirmed');
  const [selectedDriverId, setSelectedDriverId] = useState('');
  const [isSubmittingStatus, setIsSubmittingStatus] = useState(false);

  useEffect(() => {
    const unsubBookings = subscribeToBookings((data) => setBookings(data));
    const unsubFleet = subscribeToFleet((data) => setVehicles(data));
    const unsubDrivers = subscribeToDrivers((data) => setDrivers(data));
    const unsubCustomers = subscribeToCustomers((data) => setCustomers(data));
    const unsubLogs = subscribeToAuditLogs(20, (data) => setAuditLogs(data));

    return () => {
      unsubBookings();
      unsubFleet();
      unsubDrivers();
      unsubCustomers();
      unsubLogs();
    };
  }, []);

  // Compute KPI metrics dynamically
  const todayStr = new Date().toISOString().split('T')[0];
  const thisMonthStr = todayStr.substring(0, 7);

  const todayBookingsCount = bookings.filter((b) => b.pickupDate === todayStr || b.createdAt.startsWith(todayStr)).length;
  const activeTripsCount = bookings.filter((b) => ['Driver En Route', 'Passenger Picked Up', 'Trip Started'].includes(b.status)).length;
  const pendingRequestsCount = bookings.filter((b) => b.status === 'Pending').length;
  const availableVehiclesCount = vehicles.filter((v) => v.isAvailable).length;
  const vehiclesOnHireCount = vehicles.filter((v) => !v.isAvailable).length;

  const todayRevenue = bookings
    .filter((b) => b.status !== 'Cancelled' && (b.createdAt.startsWith(todayStr) || b.pickupDate === todayStr))
    .reduce((sum, b) => sum + (b.totalAmount || b.estimatedPrice || 0), 0);

  const monthRevenue = bookings
    .filter((b) => b.status !== 'Cancelled' && (b.createdAt.startsWith(thisMonthStr) || b.pickupDate.startsWith(thisMonthStr)))
    .reduce((sum, b) => sum + (b.totalAmount || b.estimatedPrice || 0), 0);

  const newCustomersCount = customers.filter((c) => c.createdAt && c.createdAt.startsWith(thisMonthStr)).length;

  // Handle status update submitting directly to Firestore
  const handleUpdateStatusSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBooking || !adminUser) return;
    setIsSubmittingStatus(true);

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

      setIsStatusModalOpen(false);
      setSelectedBooking(null);
    } catch (err) {
      console.error('[Status Update Error]:', err);
    } finally {
      setIsSubmittingStatus(false);
    }
  };

  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case 'Pending':
        return 'bg-amber-500/15 text-amber-600 border-amber-500/30';
      case 'Confirmed':
        return 'bg-blue-500/15 text-blue-600 border-blue-500/30';
      case 'Driver Assigned':
        return 'bg-indigo-500/15 text-indigo-600 border-indigo-500/30';
      case 'Driver En Route':
        return 'bg-purple-500/15 text-purple-600 border-purple-500/30';
      case 'Passenger Picked Up':
        return 'bg-teal-500/15 text-teal-600 border-teal-500/30';
      case 'Trip Started':
        return 'bg-[#003366]/15 text-[#003366] border-[#003366]/30';
      case 'Completed':
        return 'bg-emerald-500/15 text-emerald-700 border-emerald-500/30';
      case 'Cancelled':
        return 'bg-red-500/15 text-red-600 border-red-500/30';
      case 'No Show':
        return 'bg-slate-500/15 text-slate-600 border-slate-500/30';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-300';
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Banner & Operational Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-[#0B192C]/10 shadow-sm">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-[#003366] bg-[#003366]/10 px-3 py-1 rounded-full border border-[#003366]/15">
            CHIMJOY CAR HIRE • OPERATIONAL CONTROL CENTER
          </span>
          <h1 className="font-display text-2xl sm:text-3xl font-black text-[#0E1726] mt-2">
            Operations Dashboard
          </h1>
          <p className="text-xs text-[#475569] font-medium mt-0.5">
            Realtime System Active • Connected as <strong className="text-[#003366]">{adminUser?.name}</strong> ({adminUser?.role})
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/admin/bookings">
            <button className="px-4 py-2.5 rounded-xl bg-[#0B192C] hover:bg-[#003366] text-white text-xs font-extrabold uppercase tracking-wider transition-colors shadow-sm cursor-pointer">
              Manage Bookings
            </button>
          </Link>
          <Link href="/admin/fleet">
            <button className="px-4 py-2.5 rounded-xl bg-[#9BC800] hover:bg-[#8ab300] text-[#0B192C] text-xs font-black uppercase tracking-wider transition-colors shadow-lemon cursor-pointer">
              Manage Fleet
            </button>
          </Link>
        </div>
      </div>

      {/* 1. TOP KPI CARDS (8 ENTERPRISE METRICS) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "Today's Bookings", val: todayBookingsCount, change: '+12% today', icon: CalendarCheck, color: 'text-blue-600', link: '/admin/bookings' },
          { title: 'Active Trips', val: activeTripsCount, change: 'En route / in progress', icon: MapPin, color: 'text-indigo-600', link: '/admin/bookings' },
          { title: 'Pending Requests', val: pendingRequestsCount, change: 'Action required', icon: Clock, color: 'text-amber-600', link: '/admin/bookings' },
          { title: 'Available Vehicles', val: availableVehiclesCount, change: `out of ${vehicles.length} total`, icon: Car, color: 'text-emerald-600', link: '/admin/fleet' },
          { title: 'Vehicles on Hire', val: vehiclesOnHireCount, change: 'Currently dispatched', icon: Truck, color: 'text-purple-600', link: '/admin/fleet' },
          { title: 'Revenue Today', val: `₦${todayRevenue.toLocaleString()}`, change: 'Realtime total', icon: DollarSign, color: 'text-emerald-700', link: '/admin/reports' },
          { title: 'Revenue This Month', val: `₦${monthRevenue.toLocaleString()}`, change: 'Current MTD', icon: TrendingUp, color: 'text-[#003366]', link: '/admin/reports' },
          { title: 'New Customers', val: newCustomersCount, change: 'Registered this month', icon: Users, color: 'text-teal-600', link: '/admin/customers' },
        ].map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
              whileHover={{ y: -3, scale: 1.01 }}
              onClick={() => router.push(kpi.link)}
              className="bg-white p-5 rounded-3xl border border-[#0B192C]/10 shadow-sm hover:shadow-md transition-all cursor-pointer space-y-3 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#475569]">{kpi.title}</span>
                <div className="p-2.5 rounded-2xl bg-slate-100 group-hover:bg-[#0B192C] group-hover:text-white transition-colors">
                  <Icon className={`w-4 h-4 ${kpi.color} group-hover:text-[#9BC800]`} />
                </div>
              </div>
              <div>
                <span className="font-display font-black text-2xl sm:text-3xl text-[#0E1726] block leading-none">{kpi.val}</span>
                <span className="text-[11px] text-slate-500 font-bold mt-1 block">{kpi.change}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* 2. LIVE OPERATIONS PANEL (RECENT BOOKINGS & STATUS UPDATES) */}
      <div className="bg-white rounded-3xl border border-[#0B192C]/10 shadow-sm p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <h2 className="font-display text-lg font-black text-[#0E1726]">
                Live Operations Panel
              </h2>
            </div>
            <p className="text-xs text-[#475569] font-medium mt-0.5">
              Realtime booking dispatch feed. Click any status badge to immediately update status in Firestore.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0E1726] text-xs font-extrabold transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print Table</span>
            </button>
          </div>
        </div>

        {/* Live Table */}
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#0B192C] text-white uppercase text-[10px] tracking-wider font-extrabold">
                <th className="p-3.5 rounded-l-xl">Ref Code</th>
                <th className="p-3.5">Customer</th>
                <th className="p-3.5">Service Type</th>
                <th className="p-3.5">Pickup Location</th>
                <th className="p-3.5">Vehicle</th>
                <th className="p-3.5">Driver</th>
                <th className="p-3.5">Date & Time</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right rounded-r-xl">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-8 text-center text-slate-400 font-bold">
                    No active bookings found in Firestore.
                  </td>
                </tr>
              ) : (
                bookings.slice(0, 15).map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3.5 font-black text-[#003366]">#{b.referenceCode}</td>
                    <td className="p-3.5">
                      <span className="font-extrabold text-[#0E1726] block">{b.customerName}</span>
                      <span className="text-[10px] text-slate-400">{b.customerPhone}</span>
                    </td>
                    <td className="p-3.5 font-bold text-[#0E1726]">{b.serviceType}</td>
                    <td className="p-3.5 text-slate-600 truncate max-w-[150px]">{b.pickupLocation}</td>
                    <td className="p-3.5 font-bold text-[#0E1726]">{b.vehicleName || 'Assigned SUV'}</td>
                    <td className="p-3.5 text-slate-700">
                      {b.driverName ? (
                        <span className="font-extrabold text-emerald-700">{b.driverName}</span>
                      ) : (
                        <span className="text-amber-600 font-bold text-[11px]">Unassigned</span>
                      )}
                    </td>
                    <td className="p-3.5">
                      <span className="font-bold text-[#0E1726] block">{b.pickupDate}</span>
                      <span className="text-[10px] text-slate-500">{b.pickupTime}</span>
                    </td>
                    <td className="p-3.5">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedBooking(b);
                          setNewStatus(b.status);
                          setSelectedDriverId(b.driverId || '');
                          setIsStatusModalOpen(true);
                        }}
                        className={`px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-wider transition-transform hover:scale-105 cursor-pointer ${getStatusBadge(
                          b.status
                        )}`}
                        title="Click to update status or assign driver"
                      >
                        {b.status}
                      </button>
                    </td>
                    <td className="p-3.5 text-right space-x-1">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedBooking(b);
                          setNewStatus(b.status);
                          setSelectedDriverId(b.driverId || '');
                          setIsStatusModalOpen(true);
                        }}
                        className="p-1.5 rounded-lg bg-slate-100 hover:bg-[#003366] hover:text-white transition-colors"
                        title="Update Status / Assign Driver"
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

      {/* 3. QUICK SHORTCUT CARDS & REALTIME AUDIT FEED GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Quick Shortcuts */}
        <div className="lg:col-span-6 bg-white rounded-3xl border border-[#0B192C]/10 shadow-sm p-6 space-y-4">
          <h3 className="font-display text-base font-extrabold text-[#0E1726] border-b border-slate-100 pb-3">
            Quick Enterprise Shortcuts
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <Link href="/admin/fleet" className="p-4 rounded-2xl bg-[#F4F6F9] hover:bg-[#0B192C] hover:text-white transition-all border border-[#0B192C]/10 space-y-2 group">
              <Car className="w-5 h-5 text-[#003366] group-hover:text-[#9BC800]" />
              <span className="font-black block text-sm">Add / Manage Fleet</span>
              <p className="text-[11px] text-slate-500 group-hover:text-slate-300">Publish vehicles, change pricing, set draft status.</p>
            </Link>

            <Link href="/admin/bookings" className="p-4 rounded-2xl bg-[#F4F6F9] hover:bg-[#0B192C] hover:text-white transition-all border border-[#0B192C]/10 space-y-2 group">
              <CalendarCheck className="w-5 h-5 text-[#003366] group-hover:text-[#9BC800]" />
              <span className="font-black block text-sm">Pending Booking Requests</span>
              <p className="text-[11px] text-slate-500 group-hover:text-slate-300">Review & confirm upcoming ride requests.</p>
            </Link>

            <Link href="/admin/drivers" className="p-4 rounded-2xl bg-[#F4F6F9] hover:bg-[#0B192C] hover:text-white transition-all border border-[#0B192C]/10 space-y-2 group">
              <UserCheck className="w-5 h-5 text-[#003366] group-hover:text-[#9BC800]" />
              <span className="font-black block text-sm">Chauffeur Drivers</span>
              <p className="text-[11px] text-slate-500 group-hover:text-slate-300">Assign drivers to trips and check ratings.</p>
            </Link>

            <Link href="/admin/reports" className="p-4 rounded-2xl bg-[#F4F6F9] hover:bg-[#0B192C] hover:text-white transition-all border border-[#0B192C]/10 space-y-2 group">
              <TrendingUp className="w-5 h-5 text-[#003366] group-hover:text-[#9BC800]" />
              <span className="font-black block text-sm">Export Financial Reports</span>
              <p className="text-[11px] text-slate-500 group-hover:text-slate-300">Download revenue summaries PDF / CSV.</p>
            </Link>
          </div>
        </div>

        {/* Audit Log Stream */}
        <div className="lg:col-span-6 bg-white rounded-3xl border border-[#0B192C]/10 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-display text-base font-extrabold text-[#0E1726]">
              Realtime System Audit Feed
            </h3>
            {adminUser?.role === 'Super Admin' && (
              <Link href="/admin/audit-log" className="text-xs font-black text-[#003366] hover:underline">
                View All
              </Link>
            )}
          </div>

          <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar text-xs">
            {auditLogs.length === 0 ? (
              <div className="text-center py-6 text-slate-400 font-bold">
                No system audit events recorded yet.
              </div>
            ) : (
              auditLogs.slice(0, 6).map((log) => (
                <div key={log.id} className="p-3 rounded-2xl bg-[#F4F6F9] border border-slate-200 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-[#0B192C]">{log.action}</span>
                    <span className="text-[10px] text-slate-400 font-medium">
                      {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 font-medium">{log.details}</p>
                  <span className="text-[10px] font-bold text-[#003366] block">
                    By: {log.adminEmail} ({log.adminRole})
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* STATUS UPDATE & DRIVER ASSIGNMENT MODAL */}
      <AnimatePresence>
        {isStatusModalOpen && selectedBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setIsStatusModalOpen(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white rounded-3xl p-6 border border-[#0B192C]/15 shadow-2xl w-full max-w-md space-y-5 z-10 text-[#0E1726]"
            >
              <div className="border-b border-slate-100 pb-3">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#003366]">
                  UPDATE BOOKING STATUS
                </span>
                <h3 className="font-display text-xl font-black text-[#0E1726]">
                  Ref #{selectedBooking.referenceCode}
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  {selectedBooking.customerName} ({selectedBooking.customerPhone})
                </p>
              </div>

              <form onSubmit={handleUpdateStatusSubmit} className="space-y-4 text-xs">
                {/* Select Status */}
                <div className="space-y-1.5">
                  <label className="font-extrabold uppercase tracking-wider text-[#0E1726] text-[10px]">
                    Lifecycle Status
                  </label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as BookingStatus)}
                    className="w-full p-3 rounded-xl bg-[#F4F6F9] border border-slate-300 font-bold text-[#0E1726] focus:outline-none cursor-pointer"
                  >
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

                {/* Assign Chauffeur Driver */}
                <div className="space-y-1.5">
                  <label className="font-extrabold uppercase tracking-wider text-[#0E1726] text-[10px]">
                    Assign Chchauffeur Driver
                  </label>
                  <select
                    value={selectedDriverId}
                    onChange={(e) => setSelectedDriverId(e.target.value)}
                    className="w-full p-3 rounded-xl bg-[#F4F6F9] border border-slate-300 font-bold text-[#0E1726] focus:outline-none cursor-pointer"
                  >
                    <option value="">Unassigned</option>
                    {drivers.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name} ({d.phone}) — {d.status}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsStatusModalOpen(false)}
                    className="w-1/2 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0E1726] font-extrabold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmittingStatus}
                    className="w-1/2 py-3 rounded-xl bg-[#0B192C] hover:bg-[#003366] text-white font-black cursor-pointer shadow-md disabled:opacity-50"
                  >
                    {isSubmittingStatus ? 'Saving...' : 'Save'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
