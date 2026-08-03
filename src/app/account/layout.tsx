'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Calendar,
  History,
  MapPin,
  Bell,
  User,
  Shield,
  LogOut,
  Car,
  ChevronRight,
  Menu,
  X,
  Plus,
} from 'lucide-react';
import { LuxuryButton } from '@/components/ui/luxury-button';
import { MOCK_USER, logoutUser } from '@/lib/services/auth-service';

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const sidebarLinks = [
    { name: 'Overview', href: '/account', icon: <LayoutDashboard className="w-4 h-4" /> },
    { name: 'My Bookings', href: '/account/bookings', icon: <Calendar className="w-4 h-4" /> },
    { name: 'Trip History', href: '/account/history', icon: <History className="w-4 h-4" /> },
    { name: 'Saved Locations', href: '/account/locations', icon: <MapPin className="w-4 h-4" /> },
    { name: 'Notifications', href: '/account/notifications', icon: <Bell className="w-4 h-4" />, badge: '2' },
    { name: 'Profile Settings', href: '/account/profile', icon: <User className="w-4 h-4" /> },
    { name: 'Security & 2FA', href: '/account/security', icon: <Shield className="w-4 h-4" /> },
  ];

  const handleLogout = async () => {
    await logoutUser();
    router.push('/auth/login');
  };

  return (
    <div className="min-h-screen bg-[#F4F6F9] text-[#0E1726] pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

        {/* Top Header Card */}
        <div className="bg-[#0B192C] text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
          {/* Background element */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B192C] via-[#0B192C]/90 to-transparent pointer-events-none" />

          <div className="relative z-10 flex items-center gap-4 text-center sm:text-left">
            <div className="w-16 h-16 rounded-full bg-[#9BC800] text-[#0B192C] flex items-center justify-center font-display font-black text-2xl shadow-md border-2 border-white/20">
              {MOCK_USER.firstName[0]}
            </div>
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                  Good Afternoon, {MOCK_USER.firstName}.
                </h1>
                <span className="text-[10px] font-black uppercase bg-[#9BC800] text-[#0B192C] px-2.5 py-0.5 rounded-full">
                  VIP Client
                </span>
              </div>
              <p className="text-xs text-slate-300 font-medium mt-1">
                Manage your executive transfers, car hires and itinerary receipts.
              </p>
            </div>
          </div>

          <div className="relative z-10 flex items-center gap-3 w-full sm:w-auto">
            <Link href="/book/ride" className="flex-1 sm:flex-none">
              <LuxuryButton variant="lemon" size="md" icon={<Plus className="w-4 h-4" />} className="w-full justify-center">
                New Ride
              </LuxuryButton>
            </Link>
            <button
              onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
              className="lg:hidden p-3 rounded-2xl bg-white/10 text-white border border-white/20"
            >
              {isMobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Main Grid: Sidebar + Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Executive Sidebar Navigation */}
          <aside className={`lg:col-span-3 bg-white rounded-3xl p-5 border border-[#0B192C]/10 shadow-sm space-y-6 ${
            isMobileSidebarOpen ? 'block' : 'hidden lg:block'
          }`}>
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#475569] px-3 py-1 block">
                PORTAL NAVIGATION
              </span>

              {sidebarLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileSidebarOpen(false)}
                    className={`flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-black transition-all duration-200 ${
                      isActive
                        ? 'bg-[#0B192C] text-white shadow-md'
                        : 'text-[#0E1726] hover:bg-[#F4F6F9] hover:text-[#003366]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={isActive ? 'text-[#9BC800]' : 'text-[#003366]'}>{link.icon}</span>
                      <span>{link.name}</span>
                    </div>
                    {link.badge && (
                      <span className="bg-[#9BC800] text-[#0B192C] text-[10px] font-black px-2 py-0.5 rounded-full">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>

            <div className="pt-4 border-t border-[#0B192C]/10 space-y-3">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-black text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out Account</span>
              </button>
            </div>
          </aside>

          {/* Right Content Area */}
          <main className="lg:col-span-9 space-y-6">
            {children}
          </main>

        </div>

      </div>
    </div>
  );
}
