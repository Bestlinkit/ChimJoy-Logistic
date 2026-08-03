'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, CheckCircle2, Trash2, Car, UserCheck, ShieldCheck, Clock } from 'lucide-react';
import { LuxuryButton } from '@/components/ui/luxury-button';
import { NotificationItem } from '@/types';

export default function NotificationsPage() {
  const [items, setItems] = useState<NotificationItem[]>([
    {
      id: 'notif_1',
      title: 'Chchauffeur Assigned to Trip #CJ-9921',
      message: 'Chinedu Okeke has been assigned to your Toyota Land Cruiser trip. Your driver is en route.',
      category: 'driver',
      isRead: false,
      createdAt: '10 mins ago',
    },
    {
      id: 'notif_2',
      title: 'Airport Transfer Flight Status (QOW)',
      message: 'Air Peace Flight P4 7120 is confirmed on schedule for 08:30 AM arrival at Sam Mbakwe Airport.',
      category: 'booking',
      isRead: false,
      createdAt: '1 hour ago',
    },
    {
      id: 'notif_3',
      title: 'Official Booking Receipt Generated',
      message: 'Your official receipt for booking #CJ-8842 is ready for download in your portal.',
      category: 'system',
      isRead: true,
      createdAt: 'Yesterday',
    },
  ]);

  const markAllRead = () => {
    setItems(items.map(n => ({ ...n, isRead: true })));
  };

  const deleteNotification = (id: string) => {
    setItems(items.filter(n => n.id !== id));
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#0B192C]/10 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-black uppercase tracking-widest text-[#003366] bg-[#003366]/10 px-4 py-1.5 rounded-full border border-[#003366]/15">
            NOTIFICATION CENTER
          </span>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-[#0E1726] mt-2">
            Real-Time Updates
          </h1>
          <p className="text-xs sm:text-sm text-[#475569] font-medium">
            Stay informed about your booking status, driver dispatch, and flight tracking.
          </p>
        </div>

        <LuxuryButton onClick={markAllRead} variant="outline" size="sm">
          Mark All as Read
        </LuxuryButton>
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-3xl p-6 border border-[#0B192C]/10 shadow-sm space-y-4">
        {items.length > 0 ? (
          items.map((n) => (
            <div
              key={n.id}
              className={`p-5 rounded-2xl border transition-all duration-200 flex items-start justify-between gap-4 ${
                !n.isRead ? 'bg-[#9BC800]/10 border-[#9BC800]' : 'bg-[#F4F6F9] border-[#0B192C]/10'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-[#0B192C] text-[#9BC800] shrink-0 mt-0.5">
                  {n.category === 'driver' ? <UserCheck className="w-5 h-5" /> : <Bell className="w-5 h-5" />}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-display font-black text-sm text-[#0E1726]">{n.title}</h3>
                    {!n.isRead && (
                      <span className="w-2 h-2 rounded-full bg-[#9BC800] animate-pulse" />
                    )}
                  </div>
                  <p className="text-xs text-[#475569] font-medium leading-relaxed">{n.message}</p>
                  <span className="text-[10px] text-[#003366] font-mono font-bold">{n.createdAt}</span>
                </div>
              </div>

              <button
                onClick={() => deleteNotification(n.id)}
                className="p-2 text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        ) : (
          <div className="py-12 text-center text-[#475569] font-medium">
            You have no notifications.
          </div>
        )}
      </div>

    </div>
  );
}
