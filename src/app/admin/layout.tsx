'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Calendar, Car, Users, Settings, ArrowLeft, ShieldCheck, Bell } from 'lucide-react';
import { LuxuryBadge } from '@/components/ui/luxury-badge';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const menu = [
    { name: 'Control Overview', href: '/admin', icon: <LayoutDashboard className="w-4 h-4" /> },
    { name: 'Bookings Matrix', href: '/admin/bookings', icon: <Calendar className="w-4 h-4" /> },
    { name: 'Fleet CMS Manager', href: '/admin/fleet', icon: <Car className="w-4 h-4" /> },
    { name: 'Customer Directory', href: '/admin/customers', icon: <Users className="w-4 h-4" /> },
    { name: 'Settings & Rates', href: '/admin/settings', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-[#040B17] text-white flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-[#071325] border-r border-slate-800 p-6 flex flex-col justify-between shrink-0">
        <div className="space-y-8">
          {/* Logo & Status */}
          <div className="space-y-2">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#00509D] p-0.5">
                <div className="w-full h-full bg-[#071325] rounded-[10px] flex items-center justify-center font-display font-black text-xs gradient-gold">
                  CJ
                </div>
              </div>
              <div>
                <h2 className="font-display font-bold text-white text-base tracking-tight">CHIMJOY</h2>
                <span className="text-[9px] text-[#F5D061] font-semibold tracking-widest uppercase block">
                  OPERATIONS CONTROL
                </span>
              </div>
            </Link>
            <div className="pt-2">
              <LuxuryBadge variant="emerald" className="text-[9px] py-0.5 px-2">
                System Live • 24/7
              </LuxuryBadge>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {menu.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                    isActive
                      ? 'bg-[#00509D] text-white shadow-royal'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Back to Public Site */}
        <div className="pt-6 border-t border-slate-800">
          <Link href="/" className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-[#F5D061] transition-colors">
            <ArrowLeft className="w-4 h-4" /> Return to Website
          </Link>
        </div>
      </aside>

      {/* Main Operations View Content */}
      <main className="flex-1 p-6 sm:p-10 overflow-y-auto max-h-screen">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-8 border-b border-slate-800 mb-8">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold">Executive Operations Control Center</h1>
            <p className="text-xs text-slate-400">Manage booking dispatch requests, vehicle allocation, and fleet rules.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#06D6A0] rounded-full animate-ping" />
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-[#F5D061]">
              Owerri Hub Active
            </div>
          </div>
        </div>

        {children}
      </main>
    </div>
  );
}
