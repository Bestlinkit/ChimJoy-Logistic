'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  CalendarCheck,
  Car,
  Users,
  MessageSquare,
  Bell,
  BarChart3,
  Settings,
  ShieldCheck,
  FileText,
  LogOut,
  ChevronLeft,
  ChevronRight,
  UserCheck,
  Star,
  Calendar,
  MapPin,
  KeyRound,
  History,
} from 'lucide-react';
import { useAdminAuth } from '@/context/AdminAuthContext';

interface AdminSidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isMobileOpen: boolean;
  onMobileClose: () => void;
  pendingCount?: number;
  unreadMessagesCount?: number;
  unreadNotifsCount?: number;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  isCollapsed,
  onToggleCollapse,
  isMobileOpen,
  onMobileClose,
  pendingCount = 0,
  unreadMessagesCount = 0,
  unreadNotifsCount = 0,
}) => {
  const pathname = usePathname();
  const { adminUser, logout } = useAdminAuth();

  const menuItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Ride Bookings', href: '/admin/bookings', icon: CalendarCheck, badge: pendingCount > 0 ? pendingCount : undefined },
    { name: 'Car Hire', href: '/admin/car-hire', icon: Car },
    { name: 'Fleet Management', href: '/admin/fleet', icon: Car },
    { name: 'Drivers', href: '/admin/drivers', icon: UserCheck },
    { name: 'Customers CRM', href: '/admin/customers', icon: Users },
    { name: 'Messages', href: '/admin/messages', icon: MessageSquare, badge: unreadMessagesCount > 0 ? unreadMessagesCount : undefined },
    { name: 'Reviews', href: '/admin/reviews', icon: Star },
    { name: 'Dispatch Calendar', href: '/admin/calendar', icon: Calendar },
    { name: 'Operations Hub', href: '/admin/map', icon: BarChart3 },
    { name: 'Reports & Analytics', href: '/admin/reports', icon: BarChart3 },
    { name: 'Notifications', href: '/admin/notifications', icon: Bell, badge: unreadNotifsCount > 0 ? unreadNotifsCount : undefined },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  // Super Admin only menu item
  if (adminUser?.role === 'Super Admin') {
    menuItems.push({ name: 'Administrators', href: '/admin/administrators', icon: ShieldCheck });
    menuItems.push({ name: 'Audit Logs', href: '/admin/audit-log', icon: History });
  }

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#0B192C] text-white border-r border-white/10 select-none">
      {/* Brand Header */}
      <div className="h-16 px-4 flex items-center justify-between border-b border-white/10 shrink-0">
        {!isCollapsed ? (
          <Link href="/admin" className="flex items-center gap-2.5">
            <img src="/images/logo.png" alt="ChimJoy Admin" className="h-9 w-auto object-contain" />
            <div>
              <span className="font-display font-black text-sm text-white block leading-none">CHIMJOY</span>
              <span className="text-[9px] font-black text-[#9BC800] uppercase tracking-wider block mt-0.5">ADMIN SYSTEM</span>
            </div>
          </Link>
        ) : (
          <Link href="/admin" className="mx-auto">
            <img src="/images/logo.png" alt="ChimJoy Admin" className="h-7 w-auto object-contain" />
          </Link>
        )}

        <button
          type="button"
          onClick={onToggleCollapse}
          className="hidden lg:flex p-1.5 rounded-lg bg-[#081322] text-slate-300 hover:text-white border border-white/10 hover:border-[#9BC800] transition-colors"
          title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Nav Items List */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1 custom-scrollbar">
        {menuItems.map((item, idx) => {
          const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={idx}
              href={item.href}
              onClick={onMobileClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all relative ${
                isActive
                  ? 'bg-[#9BC800] text-[#0B192C] shadow-lemon font-black'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
              title={isCollapsed ? item.name : undefined}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#0B192C]' : 'text-[#9BC800]'}`} />

              {!isCollapsed && (
                <span className="truncate flex-1">{item.name}</span>
              )}

              {!isCollapsed && item.badge !== undefined && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${isActive ? 'bg-[#0B192C] text-[#9BC800]' : 'bg-[#9BC800] text-[#0B192C]'}`}>
                  {item.badge}
                </span>
              )}

              {isCollapsed && item.badge !== undefined && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#9BC800] animate-ping" />
              )}
            </Link>
          );
        })}
      </div>

      {/* Admin User Footer */}
      <div className="p-3 border-t border-white/10 bg-[#081322] shrink-0">
        {!isCollapsed ? (
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#9BC800] text-[#0B192C] font-black flex items-center justify-center text-xs shrink-0">
                {adminUser?.name ? adminUser.name.charAt(0) : 'A'}
              </div>
              <div className="truncate">
                <span className="text-xs font-extrabold text-white block truncate">{adminUser?.name || 'Administrator'}</span>
                <span className="text-[10px] font-black text-[#9BC800] uppercase tracking-wider block truncate">{adminUser?.role || 'Admin'}</span>
              </div>
            </div>
            <button
              type="button"
              onClick={logout}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-red-950/60 hover:bg-red-900 text-red-200 border border-red-500/30 text-xs font-black uppercase tracking-wider transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out System</span>
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={logout}
            className="p-2 rounded-lg bg-red-950/60 text-red-200 hover:bg-red-900 mx-auto block cursor-pointer"
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar Container */}
      <aside className={`hidden lg:block h-screen sticky top-0 transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={onMobileClose} />
          <div className="relative w-72 max-w-[80vw] h-full z-10">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
