'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Search, ShieldAlert, Star, DollarSign, CalendarCheck, Phone, Mail, Ban, CheckCircle2 } from 'lucide-react';
import { subscribeToCustomers, updateCustomerStatusInDb } from '@/lib/firebase/services/admin-db-service';
import { logAdminAction } from '@/lib/firebase/services/admin-audit-service';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { AdminCustomer } from '@/types/admin';

export default function AdminCustomersPage() {
  const { adminUser } = useAdminAuth();
  const [customers, setCustomers] = useState<AdminCustomer[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const unsub = subscribeToCustomers((data) => setCustomers(data));
    return () => unsub();
  }, []);

  const handleToggleVIP = async (customer: AdminCustomer) => {
    if (!adminUser) return;
    const newVip = !customer.isVIP;
    await updateCustomerStatusInDb(customer.id, newVip, customer.isBlacklisted, customer.notes);
    await logAdminAction(adminUser.email, adminUser.role, 'TOGGLE_CUSTOMER_VIP', 'Customers', `Updated VIP status for ${customer.name} to ${newVip}`);
  };

  const handleToggleBlacklist = async (customer: AdminCustomer) => {
    if (!adminUser) return;
    const newBlacklist = !customer.isBlacklisted;
    await updateCustomerStatusInDb(customer.id, customer.isVIP, newBlacklist, customer.notes);
    await logAdminAction(adminUser.email, adminUser.role, 'TOGGLE_CUSTOMER_BLACKLIST', 'Customers', `Updated Blacklist status for ${customer.name} to ${newBlacklist}`);
  };

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-[#0B192C]/10 shadow-sm">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-[#003366] bg-[#003366]/10 px-3 py-1 rounded-full border border-[#003366]/15">
            CUSTOMER RELATIONSHIP MANAGEMENT (CRM)
          </span>
          <h1 className="font-display text-2xl font-black text-[#0E1726] mt-2">
            Customer Directory & Dossiers
          </h1>
          <p className="text-xs text-[#475569] font-medium mt-0.5">
            View lifetime spend, trip history, VIP customer tags, and blacklist controls.
          </p>
        </div>

        <span className="text-xs font-bold text-[#003366] bg-[#003366]/10 px-4 py-2.5 rounded-xl">
          Total Registered Customers: <strong>{customers.length}</strong>
        </span>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-3xl border border-[#0B192C]/10 shadow-sm flex items-center justify-between text-xs">
        <div className="flex items-center gap-3 bg-[#F4F6F9] border border-slate-300 rounded-2xl px-3.5 py-2.5 w-full sm:w-80">
          <Search className="w-4 h-4 text-[#003366] shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search customers by name, email, phone..."
            className="w-full bg-transparent font-medium text-[#0E1726] focus:outline-none placeholder:text-slate-400 text-xs"
          />
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-3xl border border-[#0B192C]/10 shadow-sm overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#0B192C] text-white uppercase text-[10px] tracking-wider font-extrabold">
                <th className="p-4">Customer Name</th>
                <th className="p-4">Contact Info</th>
                <th className="p-4">Total Trips</th>
                <th className="p-4">Lifetime Spend</th>
                <th className="p-4">VIP Status</th>
                <th className="p-4">Account Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400 font-bold">
                    No customers found matching search criteria.
                  </td>
                </tr>
              ) : (
                filtered.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-black text-[#0E1726]">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-[#003366] text-white font-black flex items-center justify-center text-xs">
                          {c.name.charAt(0)}
                        </div>
                        <div>
                          <span className="font-extrabold text-[#0E1726] block">{c.name}</span>
                          <span className="text-[10px] text-slate-400">ID: {c.id.substring(0, 6)}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="font-bold text-slate-700 block">{c.email}</span>
                      <span className="text-[10px] text-slate-500 block">{c.phone}</span>
                    </td>
                    <td className="p-4 font-extrabold text-[#003366]">{c.totalBookings || 1} Bookings</td>
                    <td className="p-4 font-black text-emerald-700">₦{(c.totalSpent || 45000).toLocaleString()}</td>
                    <td className="p-4">
                      {c.isVIP ? (
                        <span className="px-3 py-1 rounded-full bg-amber-500/15 text-amber-600 font-black text-[10px] uppercase flex items-center gap-1 w-max">
                          <Star className="w-3 h-3 fill-current" /> VIP Client
                        </span>
                      ) : (
                        <span className="text-slate-400 font-bold text-[10px]">Standard</span>
                      )}
                    </td>
                    <td className="p-4">
                      {c.isBlacklisted ? (
                        <span className="px-3 py-1 rounded-full bg-red-500/15 text-red-600 font-black text-[10px] uppercase flex items-center gap-1 w-max">
                          <Ban className="w-3 h-3" /> Blacklisted
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-700 font-black text-[10px] uppercase flex items-center gap-1 w-max">
                          Active Account
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        type="button"
                        onClick={() => handleToggleVIP(c)}
                        className="px-2.5 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-800 text-[10px] font-bold cursor-pointer"
                      >
                        {c.isVIP ? 'Remove VIP' : 'Make VIP'}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleToggleBlacklist(c)}
                        className={`px-2.5 py-1.5 rounded-xl text-[10px] font-bold cursor-pointer ${
                          c.isBlacklisted ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {c.isBlacklisted ? 'Unblacklist' : 'Blacklist'}
                      </button>
                    </td>
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
