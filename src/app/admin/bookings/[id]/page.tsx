'use client';

import React, { use, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Calendar, User, Phone, Mail, MapPin, Printer, ArrowLeft, CheckCircle2, MessageCircle } from 'lucide-react';
import { AdminBooking } from '@/types/admin';
import { getBookings } from '@/lib/firebase/services/booking-service';
import { formatCurrency, generateWhatsAppUrl } from '@/lib/utils';
import { GlassCard } from '@/components/ui/glass-card';
import { LuxuryBadge } from '@/components/ui/luxury-badge';
import { LuxuryButton } from '@/components/ui/luxury-button';

export default function DetailedBookingPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [booking, setBooking] = useState<AdminBooking | null>(null);

  useEffect(() => {
    getBookings().then((list) => {
      const found = list.find((b) => b.id === resolvedParams.id) || list[0];
      setBooking(found);
    });
  }, [resolvedParams.id]);

  if (!booking) return <div className="p-8 text-white">Loading Booking Details...</div>;

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <button onClick={() => router.back()} className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-[#F5D061] transition-colors mb-4">
          <ArrowLeft className="w-4 h-4" /> Back to Operations Matrix
        </button>
        <div className="flex items-center justify-between">
          <h1 className="font-display text-3xl font-extrabold">Booking Request {booking.referenceCode}</h1>
          <LuxuryBadge variant="gold">{booking.status}</LuxuryBadge>
        </div>
      </div>

      <GlassCard variant="dark" className="p-8 border border-white/15 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs border-b border-white/10 pb-6">
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Passenger Name</span>
            <span className="font-bold text-white text-base">{booking.customerName}</span>
            <span className="text-slate-400 block">{booking.customerPhone}</span>
          </div>

          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Vehicle Requested</span>
            <span className="font-bold text-[#F5D061] text-base">{booking.vehicleName}</span>
            <span className="text-slate-400 block capitalize">Service: {booking.serviceType}</span>
          </div>
        </div>

        <div className="space-y-3 text-xs text-slate-300">
          <div className="flex justify-between">
            <span className="text-slate-400">Pickup Location:</span>
            <span className="font-bold text-white">{booking.pickupLocation}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Destination:</span>
            <span className="font-bold text-white">{booking.dropoffLocation}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Schedule:</span>
            <span className="font-bold text-[#06D6A0]">{booking.pickupDate} at {booking.pickupTime}</span>
          </div>
          <div className="flex justify-between pt-2 border-t border-white/10">
            <span className="text-slate-400">Est. Total Rate:</span>
            <span className="font-black text-[#F5D061] text-lg">{formatCurrency(booking.estimatedPrice)}</span>
          </div>
        </div>

        <div className="pt-4 border-t border-white/10 flex items-center justify-between">
          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold flex items-center gap-2"
          >
            <Printer className="w-4 h-4" /> Print Dispatch Slip
          </button>

          <a
            href={generateWhatsAppUrl({
              referenceCode: booking.referenceCode,
              customerName: booking.customerName,
              serviceType: booking.serviceType,
              pickupLocation: booking.pickupLocation,
              dropoffLocation: booking.dropoffLocation,
              pickupDate: booking.pickupDate,
              pickupTime: booking.pickupTime,
              vehicleName: booking.vehicleName || 'Standard Executive SUV',
              estimatedPrice: booking.estimatedPrice,
            })}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-[#25D366] text-white rounded-xl text-xs font-bold flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4 fill-current" /> WhatsApp Dispatch
          </a>
        </div>
      </GlassCard>
    </div>
  );
}
