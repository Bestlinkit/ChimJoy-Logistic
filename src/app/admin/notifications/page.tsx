'use client';

import React, { useState, useEffect } from 'react';
import { Bell, CheckCircle2, AlertCircle, MessageSquare, Shield, Clock } from 'lucide-react';
import { subscribeToNotifications, markNotificationReadInDb } from '@/lib/firebase/services/admin-db-service';
import { SystemNotification } from '@/types/admin';

export default function AdminNotificationsPage() {
  const [notifications, setNotifications] = useState<SystemNotification[]>([]);

  useEffect(() => {
    const unsub = subscribeToNotifications((data) => setNotifications(data));
    return () => unsub();
  }, []);

  const handleMarkRead = async (id: string) => {
    await markNotificationReadInDb(id);
  };

  return (
    <div className="space-[#0E1726] space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-[#0B192C]/10 shadow-sm">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-[#003366] bg-[#003366]/10 px-3 py-1 rounded-full border border-[#003366]/15">
            SYSTEM ALERTS
          </span>
          <h1 className="font-display text-2xl font-black text-[#0E1726] mt-2">
            Realtime Notifications Center
          </h1>
          <p className="text-xs text-[#475569] font-medium mt-0.5">
            Live alerts for incoming bookings, cancellations, customer inquiries, and system updates.
          </p>
        </div>

        <span className="text-xs font-bold text-[#003366] bg-[#003366]/10 px-4 py-2.5 rounded-xl">
          Unread Alerts: <strong>{notifications.filter((n) => !n.isRead).length}</strong>
        </span>
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-3xl border border-[#0B192C]/10 shadow-sm p-6 space-y-3">
        {notifications.length === 0 ? (
          <div className="py-12 text-center text-slate-400 font-bold text-xs">
            No notification alerts in queue.
          </div>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => handleMarkRead(n.id)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
                !n.isRead ? 'bg-[#9BC800]/10 border-[#9BC800]' : 'bg-[#F4F6F9] border-slate-200 opacity-75'
              }`}
            >
              <div className="p-2.5 rounded-xl bg-[#0B192C] text-[#9BC800] shrink-0 mt-0.5">
                <Bell className="w-4 h-4" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-display font-extrabold text-sm text-[#0E1726]">{n.title}</h4>
                  <span className="text-[10px] text-slate-400 font-bold">{new Date(n.createdAt).toLocaleTimeString()}</span>
                </div>
                <p className="text-xs text-[#475569] font-medium">{n.message}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
