'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Car,
  Plane,
  Clock,
  MapPin,
  CheckCircle2,
  AlertCircle,
  FileText,
  HelpCircle,
  Calendar as CalendarIcon,
  ArrowRight,
  UserCheck,
  Download,
  Bell,
  Search,
} from 'lucide-react';
import { LuxuryButton } from '@/components/ui/luxury-button';
import { MOCK_BOOKINGS, MOCK_VEHICLES } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/utils';
import { downloadReceiptPdf } from '@/lib/services/receipt-generator';

export default function AccountDashboardPage() {
  const activeBookings = MOCK_BOOKINGS;
  const upcomingRide = activeBookings.find(b => b.status === 'Confirmed' || b.status === 'Assigned') || activeBookings[0];

  // Live countdown timer state (hours:mins:secs)
  const [countdown, setCountdown] = useState('02h 45m 12s');

  useEffect(() => {
    const timer = setInterval(() => {
      const h = Math.floor(Math.random() * 2) + 1;
      const m = Math.floor(Math.random() * 59);
      const s = Math.floor(Math.random() * 59);
      setCountdown(`0${h}h ${m < 10 ? '0' : ''}${m}m ${s < 10 ? '0' : ''}${s}s`);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-8">

      {/* ── 1. UPCOMING RIDE CARD (AIRBNB / UBER STYLE) ──────────────── */}
      {upcomingRide && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#9BC800]/40 shadow-lg space-y-6 relative overflow-hidden"
        >
          {/* Top Status Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#0B192C]/10 pb-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#9BC800] animate-pulse" />
              <span className="text-xs font-black uppercase tracking-wider text-[#003366]">UPCOMING RIDE CONFIRMED</span>
              <span className="bg-[#0B192C] text-[#9BC800] font-mono text-[10px] font-black px-2.5 py-0.5 rounded-full">
                #{upcomingRide.referenceCode}
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs font-bold text-[#475569]">
              <Clock className="w-4 h-4 text-[#9BC800]" />
              <span>Pickup in:</span>
              <span className="font-mono font-black text-[#0B192C] bg-[#F4F6F9] px-2.5 py-1 rounded-lg">
                {countdown}
              </span>
            </div>
          </div>

          {/* Ride Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Vehicle image & details */}
            <div className="md:col-span-5 flex items-center gap-4">
              <img
                src={upcomingRide.vehicleImage}
                alt={upcomingRide.vehicleName}
                className="w-28 h-20 object-cover rounded-2xl border border-[#0B192C]/10 shadow-sm shrink-0"
              />
              <div>
                <span className="text-[10px] font-black uppercase text-[#003366]">{upcomingRide.serviceType}</span>
                <h3 className="font-display font-black text-lg text-[#0E1726] leading-tight">{upcomingRide.vehicleName}</h3>
                <span className="text-xs font-bold text-[#9BC800] bg-[#0B192C] px-2.5 py-0.5 rounded-full inline-block mt-1">
                  Chauffeur Assigned
                </span>
              </div>
            </div>

            {/* Route */}
            <div className="md:col-span-4 space-y-2 border-l border-[#0B192C]/10 md:pl-6">
              <div className="flex items-start gap-2.5 text-xs">
                <MapPin className="w-4 h-4 text-[#9BC800] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[9px] font-bold uppercase text-[#475569] block">Pickup Location</span>
                  <span className="font-black text-[#0E1726] line-clamp-1">{upcomingRide.pickupLocation}</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5 text-xs">
                <MapPin className="w-4 h-4 text-[#003366] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[9px] font-bold uppercase text-[#475569] block">Destination</span>
                  <span className="font-black text-[#0E1726] line-clamp-1">{upcomingRide.dropoffLocation}</span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="md:col-span-3 text-right flex flex-col gap-2">
              <Link href={`/account/bookings/${upcomingRide.id}`}>
                <LuxuryButton variant="lemon" size="md" icon={<ArrowRight className="w-4 h-4" />} className="w-full justify-center">
                  Track Ride Live
                </LuxuryButton>
              </Link>
              <button
                onClick={() => downloadReceiptPdf(upcomingRide)}
                className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-[#003366] hover:text-[#9BC800] transition-colors py-1 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Receipt</span>
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ── 2. QUICK ACTIONS BAR ────────────────────────────────────── */}
      <div className="space-y-3">
        <h3 className="font-display font-black text-lg text-[#0E1726]">Quick Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Book a Ride', href: '/book/ride', icon: <Car className="w-5 h-5 text-[#9BC800]" />, bg: 'bg-[#0B192C]' },
            { label: 'Hire a Vehicle', href: '/book/hire', icon: <Car className="w-5 h-5 text-[#003366]" />, bg: 'bg-[#F4F6F9]' },
            { label: 'Airport Pickup', href: '/services/airport-transfers', icon: <Plane className="w-5 h-5 text-[#9BC800]" />, bg: 'bg-[#0B192C]' },
            { label: 'Support & Help', href: '/contact', icon: <HelpCircle className="w-5 h-5 text-[#003366]" />, bg: 'bg-[#F4F6F9]' },
          ].map((act, i) => (
            <Link key={i} href={act.href}>
              <motion.div
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`p-4 rounded-2xl border border-[#0B192C]/10 flex flex-col gap-2 shadow-sm transition-all cursor-pointer ${
                  act.bg === 'bg-[#0B192C]' ? 'bg-[#0B192C] text-white hover:border-[#9BC800]' : 'bg-white text-[#0E1726] hover:border-[#003366]'
                }`}
              >
                <div>{act.icon}</div>
                <span className="text-xs font-black">{act.label}</span>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>

      {/* ── 3. RECENT TRIPS TABLE & CALENDAR WIDGET GRID ─────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Recent Trips Table (8 Cols) */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-[#0B192C]/10 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-[#0B192C]/10 pb-4">
            <div>
              <h3 className="font-display font-black text-lg text-[#0E1726]">Recent Bookings</h3>
              <p className="text-xs text-[#475569] font-medium">Your latest 5 transportation requests</p>
            </div>
            <Link href="/account/bookings" className="text-xs font-extrabold text-[#003366] hover:text-[#9BC800] transition-colors">
              View All →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#0B192C]/10 text-[#475569] uppercase font-black tracking-wider text-[10px]">
                  <th className="py-3 px-3">Vehicle</th>
                  <th className="py-3 px-3">Pickup Location</th>
                  <th className="py-3 px-3">Date</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {activeBookings.slice(0, 5).map((b) => (
                  <tr key={b.id} className="hover:bg-[#F4F6F9] transition-colors">
                    <td className="py-3 px-3">
                      <div className="font-extrabold text-[#0E1726]">{b.vehicleName}</div>
                      <span className="text-[10px] text-[#475569] font-mono">#{b.referenceCode}</span>
                    </td>
                    <td className="py-3 px-3 font-medium text-[#475569] max-w-[140px] truncate">
                      {b.pickupLocation}
                    </td>
                    <td className="py-3 px-3 font-medium text-[#0E1726]">
                      {b.pickupDate}
                    </td>
                    <td className="py-3 px-3">
                      <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full ${
                        b.status === 'Completed' ? 'bg-green-100 text-green-800' :
                        b.status === 'Confirmed' || b.status === 'Assigned' ? 'bg-[#9BC800]/20 text-[#0B192C]' :
                        b.status === 'Pending' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <Link href={`/account/bookings/${b.id}`} className="font-extrabold text-[#003366] hover:underline">
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Notifications & Calendar Widget (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">

          {/* Calendar Widget */}
          <div className="bg-white rounded-3xl p-6 border border-[#0B192C]/10 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-[#0B192C]/10 pb-3">
              <CalendarIcon className="w-5 h-5 text-[#9BC800]" />
              <h3 className="font-display font-black text-base text-[#0E1726]">Upcoming Schedule</h3>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-[#F4F6F9] rounded-2xl border border-[#0B192C]/10 space-y-1">
                <span className="text-[10px] font-black uppercase text-[#003366]">Tomorrow, 08:30 AM</span>
                <h4 className="font-display font-extrabold text-xs text-[#0E1726]">Sam Mbakwe Airport Transfer</h4>
                <p className="text-[11px] text-[#475569]">Air Peace Flight P4 7120 Arrival</p>
              </div>

              <div className="p-3 bg-[#F4F6F9] rounded-2xl border border-[#0B192C]/10 space-y-1">
                <span className="text-[10px] font-black uppercase text-[#003366]">Friday, 10:00 AM</span>
                <h4 className="font-display font-extrabold text-xs text-[#0E1726]">Prado SUV Executive Hire</h4>
                <p className="text-[11px] text-[#475569]">Protea Hotel Owerri to Port Harcourt</p>
              </div>
            </div>
          </div>

          {/* Notifications Preview */}
          <div className="bg-[#0B192C] text-white rounded-3xl p-6 border border-white/10 shadow-md space-y-4">
            <div className="flex items-center justify-between border-b border-white/15 pb-3">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-[#9BC800]" />
                <h3 className="font-display font-black text-base text-white">Notifications</h3>
              </div>
              <span className="bg-[#9BC800] text-[#0B192C] text-[10px] font-black px-2 py-0.5 rounded-full">
                2 New
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="p-2.5 rounded-xl bg-white/10 border border-white/10 space-y-1">
                <div className="font-bold text-[#9BC800]">Chauffeur Assigned</div>
                <p className="text-slate-300 text-[11px]">Chinedu Okeke has been assigned to your Toyota Land Cruiser trip.</p>
              </div>
              <div className="p-2.5 rounded-xl bg-white/10 border border-white/10 space-y-1">
                <div className="font-bold text-white">Flight Tracked (QOW)</div>
                <p className="text-slate-300 text-[11px]">Air Peace P4 7120 is on schedule for 08:30 AM arrival.</p>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
