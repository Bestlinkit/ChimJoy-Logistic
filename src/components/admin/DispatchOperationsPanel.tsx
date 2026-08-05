'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  X,
  Car,
  User,
  MapPin,
  Calendar,
  Clock,
  DollarSign,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Upload,
  MessageCircle,
  Phone,
  Mail,
  Send,
  Sparkles,
  Plane,
  Building,
} from 'lucide-react';
import { AdminBooking, BookingStatus, DispatchSnapshot } from '@/types/admin';
import { saveBookingDispatchInDb } from '@/lib/firebase/services/admin-db-service';
import { uploadVehicleImage } from '@/lib/firebase/services/storage-service';
import { sendBookingConfirmedEmail, sendDriverAssignedEmail } from '@/lib/services/email-service';
import { formatCurrency } from '@/lib/utils';

interface DispatchOperationsPanelProps {
  booking: AdminBooking;
  isOpen: boolean;
  onClose: () => void;
  adminName: string;
}

export const DispatchOperationsPanel: React.FC<DispatchOperationsPanelProps> = ({
  booking,
  isOpen,
  onClose,
  adminName,
}) => {
  const existingDispatch = booking.dispatch;

  // Section 2 & 3: Vehicle Assignment & Images
  const [vehicleName, setVehicleName] = useState(existingDispatch?.vehicle?.name || booking.vehicleName || 'Toyota Land Cruiser Prado TX-L');
  const [vehicleCategory, setVehicleCategory] = useState(existingDispatch?.vehicle?.category || booking.vehicleCategory || 'SUVs');
  const [registrationNumber, setRegistrationNumber] = useState(existingDispatch?.vehicle?.registrationNumber || 'IMO-8849-TX');
  const [vehicleColor, setVehicleColor] = useState(existingDispatch?.vehicle?.color || 'Black');
  const [vehicleYear, setVehicleYear] = useState(existingDispatch?.vehicle?.year || '2024');
  const [vehicleCondition, setVehicleCondition] = useState(existingDispatch?.vehicle?.condition || 'Excellent');
  const [maxPassengers, setMaxPassengers] = useState(existingDispatch?.vehicle?.maxPassengers || 7);
  const [dailyRate, setDailyRate] = useState(existingDispatch?.vehicle?.dailyRate || booking.estimatedPrice || 85000);
  const [coverImage, setCoverImage] = useState(existingDispatch?.vehicle?.coverImage || booking.vehicleImage || '/images/suv_prado_2.jpg');
  const [galleryImages, setGalleryImages] = useState<string[]>(existingDispatch?.vehicle?.galleryImages || ['/images/suv_prado_1.jpg']);
  const [youtubeVideo, setYoutubeVideo] = useState(existingDispatch?.vehicle?.youtubeVideo || '');
  const [vehicleFeatures, setVehicleFeatures] = useState<string[]>(existingDispatch?.vehicle?.features || ['WiFi', 'Leather Seats', 'AC', 'Full Tint']);

  // Section 4: Driver Assignment
  const [driverName, setDriverName] = useState(existingDispatch?.driver?.name || booking.driverName || 'Chinedu Okeke');
  const [driverPhone, setDriverPhone] = useState(existingDispatch?.driver?.phone || booking.driverPhone || '+234 807 788 0262');
  const [driverWhatsapp, setDriverWhatsapp] = useState(existingDispatch?.driver?.whatsapp || '+234 807 788 0262');
  const [driverEmail, setDriverEmail] = useState(existingDispatch?.driver?.email || 'driver@chimjoylogistics.com.ng');
  const [driverLicenseNumber, setDriverLicenseNumber] = useState(existingDispatch?.driver?.licenseNumber || 'DL-IMO-99482');
  const [driverExperience, setDriverExperience] = useState(existingDispatch?.driver?.experience || '8 Years Executive Chauffeur');
  const [driverUniformStatus, setDriverUniformStatus] = useState(existingDispatch?.driver?.uniformStatus || 'Full Suit & Tie');
  const [driverPhoto, setDriverPhoto] = useState(existingDispatch?.driver?.photo || '/images/nigerian_driver_alone_1785747001406.png');
  const [driverNotes, setDriverNotes] = useState(existingDispatch?.driver?.notes || 'Trained defensive VIP escort chauffeur.');

  // Section 5: Pickup Details
  const [pickupDate, setPickupDate] = useState(existingDispatch?.pickup?.pickupDate || booking.pickupDate || '');
  const [pickupTime, setPickupTime] = useState(existingDispatch?.pickup?.pickupTime || booking.pickupTime || '');
  const [estimatedArrival, setEstimatedArrival] = useState(existingDispatch?.pickup?.estimatedArrival || '15 mins before pickup');
  const [terminal, setTerminal] = useState(existingDispatch?.pickup?.terminal || 'Arrivals Hall');
  const [gate, setGate] = useState(existingDispatch?.pickup?.gate || 'Gate 2');
  const [flightNumber, setFlightNumber] = useState(existingDispatch?.pickup?.flightNumber || booking.flightNumber || '');
  const [hotelName, setHotelName] = useState(existingDispatch?.pickup?.hotelName || 'Rockview Hotel, Owerri');
  const [meetingPoint, setMeetingPoint] = useState(existingDispatch?.pickup?.meetingPoint || booking.pickupLocation || '');
  const [contactMethod, setContactMethod] = useState<'Call' | 'SMS' | 'WhatsApp'>(existingDispatch?.pickup?.contactMethod || 'Call');
  const [signboardName, setSignboardName] = useState(existingDispatch?.pickup?.signboardName || booking.customerName || '');
  const [instructions, setInstructions] = useState(existingDispatch?.pickup?.instructions || 'Driver will hold welcome signboard at arrivals.');

  // Section 6: Trip Pricing
  const [baseFare, setBaseFare] = useState(existingDispatch?.pricing?.baseFare || booking.estimatedPrice || 85000);
  const [distanceCharge, setDistanceCharge] = useState(existingDispatch?.pricing?.distanceCharge || 0);
  const [waitingCharge, setWaitingCharge] = useState(existingDispatch?.pricing?.waitingCharge || 0);
  const [airportFee, setAirportFee] = useState(existingDispatch?.pricing?.airportFee || 5000);
  const [nightCharge, setNightCharge] = useState(existingDispatch?.pricing?.nightCharge || 0);
  const [discount, setDiscount] = useState(existingDispatch?.pricing?.discount || 0);
  const [vat, setVat] = useState(existingDispatch?.pricing?.vat || 0);
  const [paymentMethod, setPaymentMethod] = useState(existingDispatch?.pricing?.paymentMethod || 'Bank Transfer');
  const [paymentStatus, setPaymentStatus] = useState<'Pending' | 'Paid' | 'Refunded' | 'Cancelled'>(existingDispatch?.pricing?.paymentStatus || 'Pending');

  // Section 7: Booking Lifecycle Status
  const [status, setStatus] = useState<BookingStatus>(booking.status || 'Confirmed');

  // Section 8: Customer Notifications
  const [notifyCustomer, setNotifyCustomer] = useState(true);
  const [sendEmail, setSendEmail] = useState(true);
  const [sendWhatsappAlert, setSendWhatsappAlert] = useState(true);

  // Section 9: Internal Dispatch Notes
  const [dispatcherNotes, setDispatcherNotes] = useState(existingDispatch?.internalNotes?.dispatcherNotes || 'VIP Protocol vehicle assigned.');
  const [vipInstructions, setVipInstructions] = useState(existingDispatch?.internalNotes?.vipInstructions || 'Strict confidentiality required.');

  const [isSaving, setIsSaving] = useState(false);

  if (!isOpen) return null;

  const totalCalculated = Math.max(0, baseFare + distanceCharge + waitingCharge + airportFee + nightCharge - discount + vat);

  const handleSaveDispatch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const historyRecord = {
        status,
        timestamp: new Date().toISOString(),
        adminName,
        notes: `Dispatch status updated to ${status}`,
      };

      const existingHistory = existingDispatch?.history || [];
      const updatedHistory = [...existingHistory, historyRecord];

      const dispatchSnapshot: DispatchSnapshot = {
        vehicle: {
          name: vehicleName,
          category: vehicleCategory,
          registrationNumber,
          color: vehicleColor,
          year: vehicleYear,
          condition: vehicleCondition,
          features: vehicleFeatures,
          maxPassengers,
          dailyRate,
          coverImage,
          galleryImages,
          youtubeVideo,
          internalNotes: 'Cleaned and sanitized before dispatch.',
        },
        driver: {
          name: driverName,
          phone: driverPhone,
          whatsapp: driverWhatsapp,
          email: driverEmail,
          licenseNumber: driverLicenseNumber,
          experience: driverExperience,
          uniformStatus: driverUniformStatus,
          photo: driverPhoto,
          notes: driverNotes,
        },
        pickup: {
          pickupDate,
          pickupTime,
          estimatedArrival,
          terminal,
          gate,
          flightNumber,
          hotelName,
          meetingPoint,
          contactMethod,
          signboardName,
          instructions,
        },
        pricing: {
          baseFare,
          distanceCharge,
          waitingCharge,
          airportFee,
          nightCharge,
          discount,
          vat,
          total: totalCalculated,
          paymentMethod,
          paymentStatus,
        },
        status,
        history: updatedHistory,
        internalNotes: {
          dispatcherNotes,
          vipInstructions,
        },
      };

      await saveBookingDispatchInDb(booking.id, dispatchSnapshot, status);

      // Trigger automatic customer notification email if enabled
      if (notifyCustomer && sendEmail && booking.customerEmail) {
        if (status === 'Confirmed') {
          await sendBookingConfirmedEmail(
            booking.customerEmail,
            booking.customerName,
            booking.referenceCode,
            vehicleName,
            meetingPoint,
            `${pickupDate} at ${pickupTime}`,
            driverName,
            driverPhone,
            totalCalculated
          ).catch((err) => console.warn('[Dispatch Notification Email Error]:', err));
        } else if (status === 'Driver Assigned') {
          await sendDriverAssignedEmail(
            booking.customerEmail,
            booking.customerName,
            booking.referenceCode,
            driverName,
            driverPhone,
            vehicleName,
            `${pickupDate} at ${pickupTime}`
          ).catch((err) => console.warn('[Driver Assigned Email Error]:', err));
        }
      }

      alert('✓ Enterprise dispatch operations panel saved successfully!');
      onClose();
    } catch (err: any) {
      console.error('[Dispatch Save Error]:', err);
      alert(`Dispatch Error: ${err.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-[#0B192C] text-white rounded-3xl border border-[#9BC800]/30 shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-8 custom-scrollbar my-8"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-[#9BC800]">
              ENTERPRISE DISPATCH OPERATIONS PANEL
            </span>
            <h2 className="font-display text-2xl font-black text-white">
              Dispatch Allocation #{booking.referenceCode}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSaveDispatch} className="space-y-8 text-xs">
          {/* SECTION 1: Booking Summary (Read Only) */}
          <div className="bg-white/5 p-5 rounded-2xl border border-white/10 space-y-3">
            <h3 className="font-display text-sm font-extrabold text-[#9BC800] uppercase tracking-wider">
              1. Customer Booking Summary (Read Only)
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-slate-300">
              <div>
                <span className="text-slate-400 block text-[10px]">Customer Name:</span>
                <span className="font-bold text-white text-sm">{booking.customerName}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Phone & Email:</span>
                <span className="font-bold text-white block">{booking.customerPhone}</span>
                <span className="text-slate-400 block truncate">{booking.customerEmail}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Pickup & Dropoff:</span>
                <span className="font-bold text-white block">{booking.pickupLocation}</span>
                <span className="text-slate-400 block">To: {booking.dropoffLocation}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Service & Schedule:</span>
                <span className="font-bold text-[#9BC800] block">{booking.serviceType}</span>
                <span className="text-slate-300 block">{booking.pickupDate} at {booking.pickupTime}</span>
              </div>
            </div>
          </div>

          {/* SECTION 2 & 3: Vehicle Assignment & Images */}
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4">
            <h3 className="font-display text-sm font-extrabold text-[#9BC800] uppercase tracking-wider flex items-center gap-2">
              <Car className="w-4 h-4" /> 2 & 3. Vehicle Assignment & Media
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="font-bold text-slate-300">Vehicle Name</label>
                <input
                  type="text"
                  value={vehicleName}
                  onChange={(e) => setVehicleName(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-white/10 border border-white/15 text-white font-bold"
                />
              </div>
              <div className="space-y-1">
                <label className="font-bold text-slate-300">Registration / Plate No</label>
                <input
                  type="text"
                  value={registrationNumber}
                  onChange={(e) => setRegistrationNumber(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-white/10 border border-white/15 text-white font-bold"
                />
              </div>
              <div className="space-y-1">
                <label className="font-bold text-slate-300">Vehicle Color & Year</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={vehicleColor}
                    onChange={(e) => setVehicleColor(e.target.value)}
                    placeholder="Color"
                    className="w-full p-2.5 rounded-xl bg-white/10 border border-white/15 text-white font-bold"
                  />
                  <input
                    type="text"
                    value={vehicleYear}
                    onChange={(e) => setVehicleYear(e.target.value)}
                    placeholder="Year"
                    className="w-full p-2.5 rounded-xl bg-white/10 border border-white/15 text-white font-bold"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-300">Vehicle Cover Image Upload</label>
              <div className="flex items-center gap-3">
                {coverImage ? (
                  <img src={coverImage} alt="Cover Preview" className="w-16 h-12 object-cover rounded-xl border border-white/20 shrink-0" />
                ) : null}
                <input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    setCoverImage(URL.createObjectURL(file));
                    try {
                      const { downloadURL } = await uploadVehicleImage(file, booking.id, false);
                      setCoverImage(downloadURL);
                    } catch (err) {
                      console.error('[Upload Error]:', err);
                    }
                  }}
                  className="w-full bg-white/10 p-2 rounded-xl border border-white/15 text-xs text-slate-300 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* SECTION 4: Driver Assignment */}
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4">
            <h3 className="font-display text-sm font-extrabold text-[#9BC800] uppercase tracking-wider flex items-center gap-2">
              <User className="w-4 h-4" /> 4. Chauffeur Driver Snapshot Assignment
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="font-bold text-slate-300">Driver Full Name</label>
                <input
                  type="text"
                  value={driverName}
                  onChange={(e) => setDriverName(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-white/10 border border-white/15 text-white font-bold"
                />
              </div>
              <div className="space-y-1">
                <label className="font-bold text-slate-300">Driver Phone</label>
                <input
                  type="text"
                  value={driverPhone}
                  onChange={(e) => setDriverPhone(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-white/10 border border-white/15 text-white font-bold"
                />
              </div>
              <div className="space-y-1">
                <label className="font-bold text-slate-300">Driver WhatsApp</label>
                <input
                  type="text"
                  value={driverWhatsapp}
                  onChange={(e) => setDriverWhatsapp(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-white/10 border border-white/15 text-white font-bold"
                />
              </div>
            </div>
          </div>

          {/* SECTION 5: Pickup Details */}
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4">
            <h3 className="font-display text-sm font-extrabold text-[#9BC800] uppercase tracking-wider flex items-center gap-2">
              <MapPin className="w-4 h-4" /> 5. Pickup & Airport/Hotel Instructions
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="font-bold text-slate-300">Meeting Point / Location</label>
                <input
                  type="text"
                  value={meetingPoint}
                  onChange={(e) => setMeetingPoint(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-white/10 border border-white/15 text-white font-bold"
                />
              </div>
              <div className="space-y-1">
                <label className="font-bold text-slate-300">Airport Terminal / Gate / Flight #</label>
                <input
                  type="text"
                  value={flightNumber}
                  onChange={(e) => setFlightNumber(e.target.value)}
                  placeholder="e.g. Flight P47120 - Terminal 1"
                  className="w-full p-2.5 rounded-xl bg-white/10 border border-white/15 text-white font-bold"
                />
              </div>
              <div className="space-y-1">
                <label className="font-bold text-slate-300">Airport Welcome Signboard Name</label>
                <input
                  type="text"
                  value={signboardName}
                  onChange={(e) => setSignboardName(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-white/10 border border-white/15 text-white font-bold"
                />
              </div>
            </div>
          </div>

          {/* SECTION 6: Trip Pricing & Itemized Fares */}
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4">
            <h3 className="font-display text-sm font-extrabold text-[#9BC800] uppercase tracking-wider flex items-center gap-2">
              <DollarSign className="w-4 h-4" /> 6. Trip Pricing & Financial Breakdown
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="space-y-1">
                <label className="font-bold text-slate-300">Base Fare (₦)</label>
                <input
                  type="number"
                  value={baseFare}
                  onChange={(e) => setBaseFare(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl bg-white/10 border border-white/15 text-white font-bold"
                />
              </div>
              <div className="space-y-1">
                <label className="font-bold text-slate-300">Airport Fee (₦)</label>
                <input
                  type="number"
                  value={airportFee}
                  onChange={(e) => setAirportFee(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl bg-white/10 border border-white/15 text-white font-bold"
                />
              </div>
              <div className="space-y-1">
                <label className="font-bold text-slate-300">Discount (₦)</label>
                <input
                  type="number"
                  value={discount}
                  onChange={(e) => setDiscount(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl bg-white/10 border border-white/15 text-white font-bold"
                />
              </div>
              <div className="space-y-1">
                <label className="font-bold text-slate-300">Total Calculated (₦)</label>
                <div className="p-2.5 rounded-xl bg-[#9BC800]/20 border border-[#9BC800] text-[#9BC800] font-black text-sm">
                  ₦{totalCalculated.toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 7: Booking Lifecycle Status */}
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4">
            <h3 className="font-display text-sm font-extrabold text-[#9BC800] uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4" /> 7. Trip Lifecycle Status Workflow
            </h3>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as BookingStatus)}
              className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white font-bold text-xs"
            >
              <option value="Pending" className="bg-[#0B192C]">Pending Allocation</option>
              <option value="Confirmed" className="bg-[#0B192C]">Confirmed</option>
              <option value="Driver Assigned" className="bg-[#0B192C]">Driver Assigned</option>
              <option value="Vehicle Ready" className="bg-[#0B192C]">Vehicle Ready</option>
              <option value="Driver En Route" className="bg-[#0B192C]">Driver En Route</option>
              <option value="Driver Arrived" className="bg-[#0B192C]">Driver Arrived</option>
              <option value="Passenger Picked Up" className="bg-[#0B192C]">Passenger Picked Up</option>
              <option value="Trip In Progress" className="bg-[#0B192C]">Trip In Progress</option>
              <option value="Trip Completed" className="bg-[#0B192C]">Trip Completed</option>
              <option value="Invoice Sent" className="bg-[#0B192C]">Invoice Sent</option>
              <option value="Closed" className="bg-[#0B192C]">Closed</option>
              <option value="Cancelled" className="bg-[#0B192C]">Cancelled</option>
            </select>
          </div>

          {/* SECTION 8: Customer Notification Options */}
          <div className="p-5 rounded-2xl bg-[#9BC800]/10 border border-[#9BC800]/30 space-y-3">
            <h3 className="font-display text-xs font-black text-[#9BC800] uppercase tracking-wider">
              8. Automatic Customer Notifications
            </h3>
            <div className="flex flex-wrap items-center gap-6 text-xs font-bold text-white">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifyCustomer}
                  onChange={(e) => setNotifyCustomer(e.target.checked)}
                  className="w-4 h-4 accent-[#9BC800]"
                />
                <span>Notify Customer Immediately</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={sendEmail}
                  onChange={(e) => setSendEmail(e.target.checked)}
                  className="w-4 h-4 accent-[#9BC800]"
                />
                <span>Send Email Receipt & Dispatch Ticket</span>
              </label>
            </div>
          </div>

          {/* Save Action */}
          <button
            type="submit"
            disabled={isSaving}
            className="w-full py-4 rounded-2xl bg-[#9BC800] hover:bg-[#8ab300] text-[#0B192C] font-black text-xs uppercase tracking-wider shadow-lemon transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>{isSaving ? 'Saving Dispatch...' : 'Save Dispatch Operations Panel'}</span>
          </button>
        </form>
      </motion.div>
    </div>
  );
};
