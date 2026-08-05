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
  Check,
  AlertCircle,
  FileText,
  Video,
} from 'lucide-react';
import { LuxuryButton } from '@/components/ui/luxury-button';
import { db } from '@/lib/firebase/config';
import { doc, onSnapshot } from 'firebase/firestore';
import { AdminBooking, DispatchSnapshot } from '@/types/admin';
import { formatCurrency, generateWhatsAppUrl } from '@/lib/utils';
import { downloadReceiptPdf } from '@/lib/services/receipt-generator';

export default function CustomerTripDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [booking, setBooking] = useState<AdminBooking | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!params.id) return;
    const docRef = doc(db, 'bookingRequests', params.id as string);
    const unsub = onSnapshot(
      docRef,
      (snap) => {
        if (snap.exists()) {
          setBooking({ id: snap.id, ...(snap.data() as Omit<AdminBooking, 'id'>) });
        } else {
          setBooking(null);
        }
        setIsLoading(false);
      },
      (err) => {
        console.error('[Customer Trip Details Error]:', err);
        setIsLoading(false);
      }
    );
    return () => unsub();
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="bg-[#0B192C] rounded-3xl p-12 text-center text-white space-y-3 border border-white/10">
        <div className="w-10 h-10 border-4 border-[#9BC800] border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs font-black uppercase tracking-widest text-[#9BC800]">
          Retrieving Realtime Dispatch Snapshot...
        </p>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="bg-white rounded-3xl p-12 text-center text-[#0E1726] space-y-4 border border-[#0B192C]/10">
        <h2 className="font-display text-xl font-bold">Booking Request Not Found</h2>
        <button onClick={() => router.back()} className="text-xs font-black text-[#003366] hover:underline">
          ← Return to My Bookings
        </button>
      </div>
    );
  }

  const dispatch: DispatchSnapshot | undefined = booking.dispatch;

  const vehicleName = dispatch?.vehicle?.name || booking.vehicleName || 'Toyota Land Cruiser Prado TX-L';
  const coverImage = dispatch?.vehicle?.coverImage || booking.vehicleImage || '/images/suv_prado_2.jpg';
  const registrationNumber = dispatch?.vehicle?.registrationNumber || 'IMO-8849-TX';
  const vehicleColor = dispatch?.vehicle?.color || 'Black';
  const vehicleYear = dispatch?.vehicle?.year || '2024';
  const vehicleFeatures = dispatch?.vehicle?.features || ['WiFi', 'Leather Interior', 'Air Conditioning', 'Full Tint'];
  const galleryImages = dispatch?.vehicle?.galleryImages || [];
  const youtubeVideo = dispatch?.vehicle?.youtubeVideo;

  const driverName = dispatch?.driver?.name || booking.driverName || 'Chinedu Okeke';
  const driverPhone = dispatch?.driver?.phone || booking.driverPhone || '+234 807 788 0262';
  const driverWhatsapp = dispatch?.driver?.whatsapp || '+234 807 788 0262';
  const driverPhoto = dispatch?.driver?.photo || '/images/nigerian_driver_alone_1785747001406.png';
  const driverLicense = dispatch?.driver?.licenseNumber || 'DL-IMO-99482';

  const meetingPoint = dispatch?.pickup?.meetingPoint || booking.pickupLocation;
  const flightNumber = dispatch?.pickup?.flightNumber || booking.flightNumber;
  const signboardName = dispatch?.pickup?.signboardName || booking.customerName;
  const instructions = dispatch?.pickup?.instructions || 'Driver will hold a welcome signboard at the arrival lounge.';

  const pricingTotal = dispatch?.pricing?.total || booking.totalAmount || booking.estimatedPrice || 85000;
  const paymentStatus = dispatch?.pricing?.paymentStatus || 'Pending';

  const lifecycleStages = [
    { label: 'Booking Requested', key: 'Pending' },
    { label: 'Confirmed', key: 'Confirmed' },
    { label: 'Driver & Vehicle Assigned', key: 'Driver Assigned' },
    { label: 'Driver En Route', key: 'Driver En Route' },
    { label: 'Driver Arrived at Pickup', key: 'Driver Arrived' },
    { label: 'Trip In Progress', key: 'Trip In Progress' },
    { label: 'Trip Completed', key: 'Trip Completed' },
  ];

  const currentStatusIndex = lifecycleStages.findIndex((s) => s.key === booking.status);

  return (
    <div className="space-y-8 text-[#0E1726]">
      {/* Top Navigation & Status Bar */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#0B192C]/10 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <Link href="/account/bookings" className="inline-flex items-center gap-2 text-xs font-black text-[#003366] hover:text-[#9BC800] transition-colors mb-2">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to My Bookings
          </Link>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-display text-2xl sm:text-3xl font-black text-[#0E1726]">
              Trip Dispatch #{booking.referenceCode}
            </h1>
            <span className="bg-[#9BC800] text-[#0B192C] text-xs font-black uppercase px-3.5 py-1 rounded-full shadow-sm">
              {booking.status}
            </span>
          </div>
        </div>

        <LuxuryButton
          onClick={() => downloadReceiptPdf(booking as any)}
          variant="lemon"
          size="md"
          icon={<Download className="w-4 h-4" />}
        >
          Download PDF Receipt
        </LuxuryButton>
      </div>

      {/* Main Grid: Vehicle & Chauffeur Snapshots */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (7 Cols): Vehicle Media & Pickup Instructions */}
        <div className="lg:col-span-7 space-y-6">
          {/* Assigned Vehicle Snapshot Card */}
          <div className="bg-[#0B192C] text-white rounded-3xl overflow-hidden border border-white/10 shadow-xl space-y-6 p-6">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#9BC800] bg-white/10 px-3 py-1 rounded-full border border-white/15">
                ASSIGNED VEHICLE DETAILS
              </span>
              <span className="text-xs font-extrabold text-slate-300">
                Plate: <strong className="text-white font-mono">{registrationNumber}</strong>
              </span>
            </div>

            {/* Vehicle Cover Image */}
            <div className="relative h-64 rounded-2xl overflow-hidden border border-white/15">
              <img
                src={coverImage}
                alt={vehicleName}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/suv_prado_2.jpg';
                }}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B192C] via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div>
                  <h3 className="font-display font-black text-xl text-white">{vehicleName}</h3>
                  <span className="text-xs text-slate-300 font-medium">{vehicleColor} • {vehicleYear} Edition</span>
                </div>
              </div>
            </div>

            {/* Vehicle Features Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {vehicleFeatures.map((feat, idx) => (
                <div key={idx} className="bg-white/10 p-2.5 rounded-xl border border-white/10 text-[11px] font-bold text-slate-200 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#9BC800] shrink-0" />
                  <span className="truncate">{feat}</span>
                </div>
              ))}
            </div>

            {/* YouTube Walkthrough Link if present */}
            {youtubeVideo ? (
              <a
                href={youtubeVideo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-black text-[#9BC800] hover:underline"
              >
                <Video className="w-4 h-4" /> Watch Vehicle Walkthrough Video
              </a>
            ) : null}
          </div>

          {/* Pickup & Meeting Point Card */}
          <div className="bg-white p-6 rounded-3xl border border-[#0B192C]/10 shadow-sm space-y-4">
            <h3 className="font-display text-base font-black text-[#0E1726] flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#003366]" /> Meeting Point & Airport Instructions
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="bg-[#F4F6F9] p-4 rounded-2xl border border-slate-200 space-y-1">
                <span className="text-[10px] font-extrabold uppercase text-slate-500 block">Pickup Location</span>
                <span className="font-extrabold text-[#0E1726] text-sm block">{meetingPoint}</span>
                <span className="text-slate-600 block">Destination: {booking.dropoffLocation}</span>
              </div>

              <div className="bg-[#F4F6F9] p-4 rounded-2xl border border-slate-200 space-y-1">
                <span className="text-[10px] font-extrabold uppercase text-slate-500 block">Welcome Signboard Name</span>
                <span className="font-extrabold text-[#003366] text-sm block">{signboardName}</span>
                {flightNumber ? <span className="text-slate-600 block font-mono">Flight: {flightNumber}</span> : null}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 font-medium">
              <strong>Pickup Instructions:</strong> {instructions}
            </div>
          </div>
        </div>

        {/* Right Column (5 Cols): Chauffeur Driver Snapshot & Lifecycle Timeline */}
        <div className="lg:col-span-5 space-y-6">
          {/* Assigned Driver Card */}
          <div className="bg-[#0B192C] text-white p-6 rounded-3xl border border-white/10 shadow-xl space-y-5">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#9BC800] bg-white/10 px-3 py-1 rounded-full border border-white/15">
              ASSIGNED CHAUFFEUR DRIVER
            </span>

            <div className="flex items-center gap-4">
              <img
                src={driverPhoto}
                alt={driverName}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/nigerian_driver_alone_1785747001406.png';
                }}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-[#9BC800] shadow-md shrink-0"
              />
              <div className="space-y-0.5">
                <h4 className="font-display font-black text-lg text-white">{driverName}</h4>
                <span className="text-xs text-slate-300 block font-mono">{driverPhone}</span>
                <span className="text-[10px] font-bold text-[#9BC800] block uppercase">License: {driverLicense}</span>
              </div>
            </div>

            {/* Direct Action Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <a
                href={`tel:${driverPhone}`}
                className="py-3 px-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-black text-xs flex items-center justify-center gap-2 border border-white/15 transition-all"
              >
                <Phone className="w-4 h-4 text-[#9BC800]" /> Call Driver
              </a>

              <a
                href={generateWhatsAppUrl({
                  referenceCode: booking.referenceCode,
                  customerName: booking.customerName,
                  serviceType: booking.serviceType,
                  pickupLocation: meetingPoint,
                  dropoffLocation: booking.dropoffLocation,
                  pickupDate: booking.pickupDate,
                  pickupTime: booking.pickupTime,
                  vehicleName,
                  estimatedPrice: pricingTotal,
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-2xl bg-[#25D366] text-white font-black text-xs flex items-center justify-center gap-2 shadow-md hover:bg-[#20ba5a] transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-current" /> WhatsApp
              </a>
            </div>
          </div>

          {/* Pricing & Payment Breakdown */}
          <div className="bg-white p-6 rounded-3xl border border-[#0B192C]/10 shadow-sm space-y-4 text-xs">
            <h3 className="font-display text-base font-black text-[#0E1726] flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#003366]" /> Official Fare Breakdown & Payment
            </h3>

            <div className="space-y-2 border-b border-slate-200 pb-4 text-slate-600">
              <div className="flex justify-between">
                <span>Base Rate:</span>
                <span className="font-bold text-[#0E1726]">{formatCurrency(pricingTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Chauffeur & Fuel Allowance:</span>
                <span className="font-bold text-emerald-600">Included</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <div>
                <span className="text-[10px] text-slate-400 font-extrabold uppercase block">Total Amount</span>
                <span className="font-display text-2xl font-black text-[#003366]">{formatCurrency(pricingTotal)}</span>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-black uppercase ${
                paymentStatus === 'Paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
              }`}>
                Payment: {paymentStatus}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
