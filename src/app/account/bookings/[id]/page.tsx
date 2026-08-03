'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  MapPin,
  Clock,
  UserCheck,
  Phone,
  MessageCircle,
  Download,
  CheckCircle2,
  Car,
  ShieldCheck,
  Navigation,
} from 'lucide-react';
import { LuxuryButton } from '@/components/ui/luxury-button';
import { MOCK_BOOKINGS } from '@/lib/mock-data';
import { BookingRequest } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { downloadReceiptPdf } from '@/lib/services/receipt-generator';

export default function TripDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [booking, setBooking] = useState<BookingRequest | null>(null);

  useEffect(() => {
    const found = MOCK_BOOKINGS.find((b) => b.id === params.id) || MOCK_BOOKINGS[0];
    setBooking(found);
  }, [params.id]);

  if (!booking) {
    return (
      <div className="bg-white rounded-3xl p-12 text-center text-[#0E1726]">
        <h2 className="font-display text-xl font-bold">Booking Not Found</h2>
        <button onClick={() => router.back()} className="mt-4 text-xs font-bold text-[#003366] hover:underline">
          Return to Bookings
        </button>
      </div>
    );
  }

  const timelineSteps = [
    { label: 'Booking Requested', time: '08:00 AM', status: 'completed' },
    { label: 'Chchauffeur Assigned', time: '08:05 AM', status: 'completed' },
    { label: 'Driver En Route', time: '08:15 AM', status: 'active' },
    { label: 'Arrived at Pickup', time: '08:30 AM', status: 'pending' },
    { label: 'Trip Completed', time: '09:15 AM', status: 'pending' },
  ];

  return (
    <div className="space-y-8">

      {/* Top Header Bar */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#0B192C]/10 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <Link href="/account/bookings" className="inline-flex items-center gap-2 text-xs font-bold text-[#475569] hover:text-[#0B192C] transition-colors mb-2">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to My Bookings
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-[#0E1726]">
              Trip Details #{booking.referenceCode}
            </h1>
            <span className="bg-[#9BC800]/20 text-[#0B192C] text-xs font-black uppercase px-3 py-1 rounded-full">
              {booking.status}
            </span>
          </div>
        </div>

        <LuxuryButton
          onClick={() => downloadReceiptPdf(booking)}
          variant="lemon"
          size="md"
          icon={<Download className="w-4 h-4" />}
        >
          Download PDF Receipt
        </LuxuryButton>
      </div>

      {/* Grid: Map & Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Left 7 Cols: Map Preview & Timeline */}
        <div className="lg:col-span-7 space-y-6">

          {/* Interactive Live Route Map Component */}
          <div className="bg-[#0B192C] text-white rounded-3xl overflow-hidden border border-[#0B192C]/10 shadow-lg relative min-h-[340px] flex flex-col justify-between p-6">
            {/* Map visual background */}
            <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
              <img src="/images/owerri_rockview_city_skyline.jpg" alt="Live Route Map" className="w-full h-full object-cover filter contrast-125 brightness-75" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B192C] via-transparent to-[#0B192C]/70" />
            </div>

            {/* Top Map Overlay Badges */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="bg-[#0B192C]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-xs font-black text-[#9BC800] flex items-center gap-2">
                <Navigation className="w-4 h-4 animate-spin text-[#9BC800]" />
                <span>LIVE DRIVER TRACKING (GPS)</span>
              </div>
              <span className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-slate-200 border border-white/20">
                Est. Arrival: 15 Mins
              </span>
            </div>

            {/* Route Pin Card */}
            <div className="relative z-10 bg-[#0B192C]/90 backdrop-blur-xl rounded-2xl p-5 border border-white/15 space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-3 h-3 rounded-full bg-[#9BC800] mt-1 shrink-0" />
                <div className="text-xs">
                  <span className="text-[9px] font-black uppercase text-[#9BC800] block">Pickup Pin</span>
                  <span className="font-extrabold text-white">{booking.pickupLocation}</span>
                </div>
              </div>

              <div className="border-l-2 border-dashed border-white/20 ml-1.5 pl-4 py-1 text-[11px] text-slate-300">
                Distance: ~28.5 km • Travel time: ~35 mins
              </div>

              <div className="flex items-start gap-3">
                <div className="w-3 h-3 rounded-full bg-[#003366] mt-1 shrink-0" />
                <div className="text-xs">
                  <span className="text-[9px] font-black uppercase text-slate-300 block">Destination Pin</span>
                  <span className="font-extrabold text-white">{booking.dropoffLocation}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline Status Card */}
          <div className="bg-white rounded-3xl p-6 border border-[#0B192C]/10 shadow-sm space-y-4">
            <h3 className="font-display font-black text-base text-[#0E1726]">Booking Timeline</h3>
            <div className="space-y-4">
              {timelineSteps.map((step, idx) => (
                <div key={idx} className="flex items-center gap-4 text-xs">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                    step.status === 'completed' ? 'bg-[#9BC800] text-[#0B192C]' :
                    step.status === 'active' ? 'bg-[#003366] text-white animate-pulse' : 'bg-slate-100 text-slate-400'
                  }`}>
                    {step.status === 'completed' ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-extrabold text-[#0E1726]">{step.label}</h4>
                    <p className="text-[11px] text-[#475569]">{step.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right 5 Cols: Driver & Fare Breakdown */}
        <div className="lg:col-span-5 space-y-6">

          {/* Driver Card */}
          <div className="bg-white rounded-3xl p-6 border border-[#0B192C]/10 shadow-sm space-y-5">
            <h3 className="font-display font-black text-base text-[#0E1726]">Assigned Chauffeur</h3>
            <div className="flex items-center gap-4">
              <img
                src="/images/nigerian_driver_alone_1785747001406.png"
                alt="Chinedu Okeke"
                className="w-16 h-16 rounded-2xl object-cover border border-[#0B192C]/10 shrink-0"
              />
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-black uppercase text-[#9BC800] bg-[#0B192C] px-2 py-0.5 rounded-full inline-block">
                  Verified Senior Chchauffeur
                </span>
                <h4 className="font-display font-black text-lg text-[#0E1726] truncate mt-1">
                  {booking.assignedDriver || 'Chinedu Okeke'}
                </h4>
                <p className="text-xs text-[#475569] font-medium">Rating: ★ 4.98 (340+ Trips)</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <a
                href="tel:+2348077880262"
                className="flex items-center justify-center gap-2 bg-[#0B192C] text-white py-3 px-4 rounded-2xl text-xs font-black hover:bg-[#003366] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#9BC800]" /> Call Driver
              </a>
              <a
                href="https://wa.me/2348077880262"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 px-4 rounded-2xl text-xs font-black hover:bg-[#128C7E] transition-colors"
              >
                <MessageCircle className="w-4 h-4 fill-current" /> WhatsApp
              </a>
            </div>
          </div>

          {/* Vehicle Information */}
          <div className="bg-white rounded-3xl p-6 border border-[#0B192C]/10 shadow-sm space-y-4">
            <h3 className="font-display font-black text-base text-[#0E1726]">Vehicle Details</h3>
            <div className="flex items-center gap-4">
              <img src={booking.vehicleImage} alt={booking.vehicleName} className="w-24 h-16 object-cover rounded-xl border shrink-0" />
              <div>
                <h4 className="font-display font-black text-base text-[#0E1726]">{booking.vehicleName}</h4>
                <p className="text-xs text-[#475569] font-medium">Plate No: {booking.assignedVehicleNo || 'IMO-884920-VIP'}</p>
                <span className="text-[10px] font-black uppercase text-[#003366] bg-[#003366]/10 px-2.5 py-0.5 rounded-full inline-block mt-1">
                  Executive AC Prado SUV
                </span>
              </div>
            </div>
          </div>

          {/* Fare Breakdown */}
          <div className="bg-[#F4F6F9] rounded-3xl p-6 border border-[#0B192C]/10 space-y-4">
            <h3 className="font-display font-black text-base text-[#0E1726]">Fare Summary</h3>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-[#475569]">
                <span>Base Transportation Fare:</span>
                <span className="font-bold text-[#0E1726]">{formatCurrency(booking.estimatedPrice)}</span>
              </div>
              <div className="flex justify-between text-[#475569]">
                <span>Vetted Chchauffeur Included:</span>
                <span className="font-bold text-[#9BC800]">₦0 (Included)</span>
              </div>
              <div className="flex justify-between text-[#475569]">
                <span>Fuel & Toll Charges:</span>
                <span className="font-bold text-[#9BC800]">₦0 (Included)</span>
              </div>
              <div className="pt-3 border-t border-[#0B192C]/10 flex justify-between items-center font-black text-base text-[#0B192C]">
                <span>Total Amount:</span>
                <span>{formatCurrency(booking.estimatedPrice)}</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
