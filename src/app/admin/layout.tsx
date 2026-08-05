'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { AdminAuthProvider, useAdminAuth } from '@/context/AdminAuthContext';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminTopBar } from '@/components/admin/AdminTopBar';
import { GlobalAdminSearchModal } from '@/components/admin/GlobalAdminSearchModal';
import {
  subscribeToBookings,
  subscribeToFleet,
  subscribeToDrivers,
  subscribeToCustomers,
  subscribeToMessages,
  subscribeToNotifications,
} from '@/lib/firebase/services/admin-db-service';
import { AdminBooking, AdminDriver, AdminCustomer, ContactMessage, SystemNotification } from '@/types/admin';
import { Vehicle } from '@/types';

function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { adminUser, isLoading } = useAdminAuth();

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Firestore Live State
  const [bookings, setBookings] = useState<AdminBooking[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [drivers, setDrivers] = useState<AdminDriver[]>([]);
  const [customers, setCustomers] = useState<AdminCustomer[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [notifications, setNotifications] = useState<SystemNotification[]>([]);

  useEffect(() => {
    if (pathname === '/admin/login') return;

    const unsubBookings = subscribeToBookings((data) => setBookings(data));
    const unsubFleet = subscribeToFleet((data) => setVehicles(data));
    const unsubDrivers = subscribeToDrivers((data) => setDrivers(data));
    const unsubCustomers = subscribeToCustomers((data) => setCustomers(data));
    const unsubMessages = subscribeToMessages((data) => setMessages(data));
    const unsubNotifs = subscribeToNotifications((data) => setNotifications(data));

    return () => {
      unsubBookings();
      unsubFleet();
      unsubDrivers();
      unsubCustomers();
      unsubMessages();
      unsubNotifs();
    };
  }, [pathname]);

  // If on private login page, render children directly
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  // Branded Loading State (Requirement 1)
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#07101E] flex flex-col items-center justify-center text-white px-4 relative overflow-hidden">
        {/* Subtle Background Radial */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#9BC800_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="flex flex-col items-center text-center space-y-6 max-w-sm z-10">
          <div className="relative">
            <div className="w-20 h-20 rounded-3xl bg-[#0B192C] border border-[#9BC800]/30 shadow-2xl flex items-center justify-center p-3">
              <img
                src="/images/logo.png"
                alt="ChimJoy Logistics Administration"
                className="w-full h-full object-contain filter drop-shadow-md"
              />
            </div>
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#9BC800] opacity-75" />
              <span className="relative inline-flex rounded-full h-4 w-4 bg-[#9BC800]" />
            </span>
          </div>

          <div className="space-y-1.5">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#9BC800] bg-[#9BC800]/15 px-3 py-1 rounded-full border border-[#9BC800]/30 inline-block">
              PRIVATE ENTERPRISE CONTROL
            </span>
            <h2 className="font-display text-lg font-black text-white">
              Connecting to Secure Administration...
            </h2>
            <p className="text-xs text-slate-400 font-medium">
              Verifying credentials & restoring live snapshot session
            </p>
          </div>

          {/* Animated Progress Bar */}
          <div className="w-full bg-[#0B192C] h-2 rounded-full overflow-hidden border border-white/10 p-0.5">
            <div className="bg-gradient-to-r from-[#9BC800] via-emerald-400 to-[#9BC800] h-full rounded-full animate-pulse w-full" />
          </div>
        </div>
      </div>
    );
  }

  // Protected Route Check
  if (!adminUser) {
    return null; // Will redirect inside AdminAuthContext
  }

  const pendingCount = bookings.filter((b) => b.status === 'Pending').length;
  const unreadMessagesCount = messages.filter((m) => m.status === 'Unread').length;
  const unreadNotifsCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="min-h-screen bg-[#F4F6F9] text-[#0E1726] flex flex-col lg:flex-row">
      {/* Collapsible Left Sidebar */}
      <AdminSidebar
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed((prev) => !prev)}
        isMobileOpen={isMobileSidebarOpen}
        onMobileClose={() => setIsMobileSidebarOpen(false)}
        pendingCount={pendingCount}
        unreadMessagesCount={unreadMessagesCount}
        unreadNotifsCount={unreadNotifsCount}
      />

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        {/* Sticky Top Header */}
        <AdminTopBar
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
          onOpenGlobalSearch={() => setIsSearchOpen(true)}
          unreadNotifsCount={unreadNotifsCount}
        />

        {/* Scrollable Content Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>

      {/* Global Cmd+K Instant Search Modal */}
      <GlobalAdminSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        bookings={bookings}
        vehicles={vehicles}
        drivers={drivers}
        customers={customers}
        messages={messages}
      />
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthProvider>
      <AdminShell>{children}</AdminShell>
    </AdminAuthProvider>
  );
}
