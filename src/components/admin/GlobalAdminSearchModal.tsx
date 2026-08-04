'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, CalendarCheck, Car, UserCheck, Users, MessageSquare, ArrowRight, X } from 'lucide-react';
import { AdminBooking, AdminDriver, AdminCustomer, ContactMessage } from '@/types/admin';
import { Vehicle } from '@/types';

interface GlobalAdminSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: AdminBooking[];
  vehicles: Vehicle[];
  drivers: AdminDriver[];
  customers: AdminCustomer[];
  messages: ContactMessage[];
}

export const GlobalAdminSearchModal: React.FC<GlobalAdminSearchModalProps> = ({
  isOpen,
  onClose,
  bookings,
  vehicles,
  drivers,
  customers,
  messages,
}) => {
  const router = useRouter();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const qLower = query.toLowerCase().trim();

  const filteredBookings = qLower
    ? bookings.filter(
        (b) =>
          b.referenceCode.toLowerCase().includes(qLower) ||
          b.customerName.toLowerCase().includes(qLower) ||
          b.customerPhone.toLowerCase().includes(qLower) ||
          b.pickupLocation.toLowerCase().includes(qLower)
      )
    : [];

  const filteredVehicles = qLower
    ? vehicles.filter(
        (v) => v.name.toLowerCase().includes(qLower) || (v.categoryName || '').toLowerCase().includes(qLower)
      )
    : [];

  const filteredDrivers = qLower
    ? drivers.filter(
        (d) => d.name.toLowerCase().includes(qLower) || d.phone.toLowerCase().includes(qLower)
      )
    : [];

  const filteredCustomers = qLower
    ? customers.filter(
        (c) => c.name.toLowerCase().includes(qLower) || c.email.toLowerCase().includes(qLower) || c.phone.toLowerCase().includes(qLower)
      )
    : [];

  const navigateTo = (path: string) => {
    onClose();
    router.push(path);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-[#0B192C] text-white w-full max-w-2xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden z-10 space-y-4 p-5">
        {/* Search Header */}
        <div className="flex items-center gap-3 bg-[#081322] border border-white/15 rounded-2xl px-4 py-3">
          <Search className="w-5 h-5 text-[#9BC800] shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search booking ref, customer, phone, driver, or vehicle..."
            className="w-full bg-transparent font-medium text-white text-sm focus:outline-none placeholder:text-slate-500"
          />
          <button type="button" onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Stream */}
        <div className="max-h-[60vh] overflow-y-auto space-y-4 pr-1 custom-scrollbar text-xs">
          {!qLower && (
            <div className="text-center py-8 text-slate-400 font-medium">
              Start typing to instantly search live bookings, fleet vehicles, drivers, and customers...
            </div>
          )}

          {/* Bookings Match */}
          {filteredBookings.length > 0 && (
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#9BC800]">
                Matching Bookings ({filteredBookings.length})
              </span>
              {filteredBookings.slice(0, 5).map((b) => (
                <div
                  key={b.id}
                  onClick={() => navigateTo(`/admin/bookings`)}
                  className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 cursor-pointer border border-white/10"
                >
                  <div className="flex items-center gap-3">
                    <CalendarCheck className="w-4 h-4 text-[#9BC800]" />
                    <div>
                      <span className="font-extrabold text-white block">#{b.referenceCode} — {b.customerName}</span>
                      <span className="text-[11px] text-slate-400">{b.pickupLocation} ➔ {b.dropoffLocation}</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-[#9BC800]/20 text-[#9BC800] font-bold text-[10px]">{b.status}</span>
                </div>
              ))}
            </div>
          )}

          {/* Vehicles Match */}
          {filteredVehicles.length > 0 && (
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#9BC800]">
                Matching Vehicles ({filteredVehicles.length})
              </span>
              {filteredVehicles.slice(0, 4).map((v) => (
                <div
                  key={v.id}
                  onClick={() => navigateTo(`/admin/fleet`)}
                  className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 cursor-pointer border border-white/10"
                >
                  <div className="flex items-center gap-3">
                    <Car className="w-4 h-4 text-[#9BC800]" />
                    <div>
                      <span className="font-extrabold text-white block">{v.name}</span>
                      <span className="text-[11px] text-slate-400">{v.categoryName} • ₦{v.pricePerDay.toLocaleString()}/day</span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </div>
              ))}
            </div>
          )}

          {/* Drivers Match */}
          {filteredDrivers.length > 0 && (
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#9BC800]">
                Matching Drivers ({filteredDrivers.length})
              </span>
              {filteredDrivers.slice(0, 4).map((d) => (
                <div
                  key={d.id}
                  onClick={() => navigateTo(`/admin/drivers`)}
                  className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 cursor-pointer border border-white/10"
                >
                  <div className="flex items-center gap-3">
                    <UserCheck className="w-4 h-4 text-[#9BC800]" />
                    <div>
                      <span className="font-extrabold text-white block">{d.name}</span>
                      <span className="text-[11px] text-slate-400">{d.phone} • {d.status}</span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </div>
              ))}
            </div>
          )}

          {/* Customers Match */}
          {filteredCustomers.length > 0 && (
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#9BC800]">
                Matching Customers ({filteredCustomers.length})
              </span>
              {filteredCustomers.slice(0, 4).map((c) => (
                <div
                  key={c.id}
                  onClick={() => navigateTo(`/admin/customers`)}
                  className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 cursor-pointer border border-white/10"
                >
                  <div className="flex items-center gap-3">
                    <Users className="w-4 h-4 text-[#9BC800]" />
                    <div>
                      <span className="font-extrabold text-white block">{c.name}</span>
                      <span className="text-[11px] text-slate-400">{c.email} • {c.phone}</span>
                    </div>
                  </div>
                  <span className="text-slate-300 font-bold">₦{c.totalSpent.toLocaleString()}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
