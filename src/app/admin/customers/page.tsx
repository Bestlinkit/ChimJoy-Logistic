'use client';

import React, { useState } from 'react';
import { Users, Search, Phone, Mail, Award, Calendar, CheckCircle2 } from 'lucide-react';
import { GlassCard } from '@/components/ui/glass-card';
import { LuxuryBadge } from '@/components/ui/luxury-badge';
import { formatCurrency } from '@/lib/utils';

export default function AdminCustomersPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const customers = [
    {
      id: 'c1',
      name: 'Chief Emeka Okonkwo',
      role: 'Managing Director, Capital Group',
      phone: '+234 803 123 4567',
      email: 'emeka.okonkwo@capitalgroup.ng',
      tier: 'VIP Gold Member',
      totalBookings: 14,
      totalSpend: 1650000,
      preferredVehicle: 'Toyota Prado TX-L',
      preferredLocation: 'Sam Mbakwe Airport QOW',
    },
    {
      id: 'c2',
      name: 'Dr. Chidinma Nwachukwu',
      role: 'Senior Consultant',
      phone: '+234 802 987 6543',
      email: 'chidinma@healthplus.org',
      tier: 'Executive Member',
      totalBookings: 8,
      totalSpend: 760000,
      preferredVehicle: 'Lexus ES 350',
      preferredLocation: 'Port Harcourt GRA',
    },
    {
      id: 'c3',
      name: 'High Chief Uche Amadi',
      role: 'Chairman, LogisticsNet',
      phone: '+234 814 555 0199',
      email: 'uche.amadi@logisticsnet.ng',
      tier: 'Corporate Client',
      totalBookings: 22,
      totalSpend: 3400000,
      preferredVehicle: 'Freight Logistics Truck',
      preferredLocation: 'Main Market, Aba',
    },
  ];

  const filtered = customers.filter(
    (c) => c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-extrabold">VIP Customer Directory</h2>
          <p className="text-xs text-slate-400">Inspect client booking histories, lifetime spend, and preferred vehicles.</p>
        </div>

        {/* Search Bar */}
        <div className="flex items-center gap-2 bg-white/10 p-2.5 rounded-xl border border-white/15 text-xs w-full sm:w-64">
          <Search className="w-4 h-4 text-[#F5D061]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search customers..."
            className="w-full bg-transparent text-white focus:outline-none placeholder-slate-400"
          />
        </div>
      </div>

      {/* Customer Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filtered.map((c) => (
          <GlassCard key={c.id} variant="dark" className="p-6 border border-white/15 space-y-4">
            <div className="flex items-center justify-between">
              <LuxuryBadge variant="gold" className="text-[9px]">{c.tier}</LuxuryBadge>
              <span className="text-[10px] text-slate-400 font-bold">{c.totalBookings} Rides</span>
            </div>

            <div>
              <h3 className="font-display text-lg font-bold text-white">{c.name}</h3>
              <p className="text-xs text-slate-400">{c.role}</p>
            </div>

            <div className="space-y-2 text-xs text-slate-300 py-3 border-y border-white/10">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#06D6A0]" />
                <span>{c.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#00509D]" />
                <span>{c.email}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Lifetime Value</span>
                <span className="text-base font-extrabold text-[#F5D061]">{formatCurrency(c.totalSpend)}</span>
              </div>
              <span className="text-[10px] font-bold text-slate-400 bg-white/5 px-2 py-1 rounded-md">
                Fav: {c.preferredVehicle.split(' ')[0]}
              </span>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
