'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Bell,
  Plus,
  Menu,
  Shield,
  User,
  LogOut,
  CalendarCheck,
  Car,
  UserPlus,
  ExternalLink,
  ChevronDown,
} from 'lucide-react';
import { useAdminAuth } from '@/context/AdminAuthContext';

interface AdminTopBarProps {
  onOpenMobileSidebar: () => void;
  onOpenGlobalSearch: () => void;
  onQuickAddBooking?: () => void;
  onQuickAddVehicle?: () => void;
  onQuickAddDriver?: () => void;
  unreadNotifsCount?: number;
}

export const AdminTopBar: React.FC<AdminTopBarProps> = ({
  onOpenMobileSidebar,
  onOpenGlobalSearch,
  onQuickAddBooking,
  onQuickAddVehicle,
  onQuickAddDriver,
  unreadNotifsCount = 0,
}) => {
  const { adminUser, logout } = useAdminAuth();
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const currentDateStr = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <header className="sticky top-0 z-30 h-16 bg-[#0B192C] text-white border-b border-white/10 shadow-md px-4 sm:px-6 flex items-center justify-between">
      {/* Left Section: Mobile Toggle & Global Search Trigger */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenMobileSidebar}
          className="lg:hidden p-2 rounded-xl bg-[#081322] text-white hover:bg-[#003366] transition-colors"
          aria-label="Open Navigation Menu"
        >
          <Menu className="w-5 h-5 text-[#9BC800]" />
        </button>

        {/* Instant Search Bar */}
        <button
          type="button"
          onClick={onOpenGlobalSearch}
          className="flex items-center gap-3 bg-[#081322] border border-white/15 hover:border-[#9BC800] px-3.5 py-2 rounded-xl text-xs text-slate-300 transition-all cursor-pointer w-48 sm:w-72 justify-between"
        >
          <div className="flex items-center gap-2 truncate">
            <Search className="w-4 h-4 text-[#9BC800] shrink-0" />
            <span className="truncate">Search ref, customer, phone...</span>
          </div>
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 bg-white/10 rounded text-[10px] text-slate-400 font-mono">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right Section: Date, Quick Add, Notifications & Admin Badge */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Date Display */}
        <span className="hidden md:inline-block text-xs font-bold text-slate-300 bg-[#081322] px-3 py-1.5 rounded-xl border border-white/10">
          {currentDateStr}
        </span>

        {/* Quick Add Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsQuickAddOpen((prev) => !prev)}
            className="flex items-center gap-1.5 bg-[#9BC800] hover:bg-[#8ab300] text-[#0B192C] font-black text-xs px-3.5 py-2 rounded-xl transition-all shadow-lemon cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Quick Add</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>

          <AnimatePresence>
            {isQuickAddOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                className="absolute right-0 mt-2 w-48 bg-[#0B192C] rounded-2xl border border-white/15 shadow-2xl p-2 z-50 text-xs font-bold space-y-1"
              >
                {onQuickAddBooking && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsQuickAddOpen(false);
                      onQuickAddBooking();
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-slate-200 hover:text-white hover:bg-white/10 flex items-center gap-2"
                  >
                    <CalendarCheck className="w-4 h-4 text-[#9BC800]" />
                    <span>New Booking</span>
                  </button>
                )}
                {onQuickAddVehicle && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsQuickAddOpen(false);
                      onQuickAddVehicle();
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-slate-200 hover:text-white hover:bg-white/10 flex items-center gap-2"
                  >
                    <Car className="w-4 h-4 text-[#9BC800]" />
                    <span>Add New Vehicle</span>
                  </button>
                )}
                {onQuickAddDriver && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsQuickAddOpen(false);
                      onQuickAddDriver();
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-slate-200 hover:text-white hover:bg-white/10 flex items-center gap-2"
                  >
                    <UserPlus className="w-4 h-4 text-[#9BC800]" />
                    <span>Add New Driver</span>
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Realtime Notification Bell */}
        <Link href="/admin/notifications" className="relative p-2 rounded-xl bg-[#081322] border border-white/10 text-slate-200 hover:text-white transition-colors">
          <Bell className="w-4 h-4 text-[#9BC800]" />
          {unreadNotifsCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#9BC800] text-[#0B192C] text-[9px] font-black flex items-center justify-center">
              {unreadNotifsCount}
            </span>
          )}
        </Link>

        {/* Admin Profile Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsProfileOpen((prev) => !prev)}
            className="flex items-center gap-2 p-1.5 rounded-xl bg-[#081322] border border-white/10 hover:border-[#9BC800] transition-colors cursor-pointer"
          >
            <div className="w-7 h-7 rounded-lg bg-[#9BC800] text-[#0B192C] font-black flex items-center justify-center text-xs">
              {adminUser?.name ? adminUser.name.charAt(0) : 'A'}
            </div>
            <span className="hidden sm:inline-block text-xs font-bold text-white max-w-[100px] truncate">
              {adminUser?.name || 'Admin'}
            </span>
          </button>

          <AnimatePresence>
            {isProfileOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                className="absolute right-0 mt-2 w-56 bg-[#0B192C] rounded-2xl border border-white/15 shadow-2xl p-3 z-50 text-xs space-y-3"
              >
                <div className="border-b border-white/10 pb-2">
                  <span className="font-bold text-white block truncate">{adminUser?.name}</span>
                  <span className="text-[10px] text-slate-400 block truncate">{adminUser?.email}</span>
                  <span className="mt-1 inline-block px-2 py-0.5 rounded bg-[#9BC800]/20 text-[#9BC800] text-[9px] font-black uppercase">
                    {adminUser?.role}
                  </span>
                </div>

                <div className="space-y-1">
                  <Link
                    href="/admin/settings"
                    onClick={() => setIsProfileOpen(false)}
                    className="w-full text-left px-3 py-2 rounded-xl text-slate-200 hover:text-white hover:bg-white/10 flex items-center gap-2 font-bold"
                  >
                    <Shield className="w-4 h-4 text-[#9BC800]" />
                    <span>System Settings</span>
                  </Link>
                  <Link
                    href="/"
                    target="_blank"
                    className="w-full text-left px-3 py-2 rounded-xl text-slate-200 hover:text-white hover:bg-white/10 flex items-center gap-2 font-bold"
                  >
                    <ExternalLink className="w-4 h-4 text-[#9BC800]" />
                    <span>View Live Website</span>
                  </Link>
                </div>

                <button
                  type="button"
                  onClick={logout}
                  className="w-full text-left px-3 py-2 rounded-xl bg-red-950/60 hover:bg-red-900 text-red-200 flex items-center gap-2 font-bold transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log Out</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};
