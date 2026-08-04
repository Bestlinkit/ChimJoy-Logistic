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

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#07101E] flex flex-col items-center justify-center text-white font-bold gap-3">
        <div className="w-10 h-10 border-4 border-[#9BC800] border-t-transparent rounded-full animate-spin" />
        <span className="text-xs uppercase tracking-widest text-[#9BC800] font-mono">Authenticating System...</span>
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
