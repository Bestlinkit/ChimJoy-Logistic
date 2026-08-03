import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateString: string): string {
  if (!dateString) return "";
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

export function generateBookingRef(): string {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `CJ-2026-${randomNum}`;
}

export function generateWhatsAppUrl(booking: {
  referenceCode: string;
  customerName: string;
  serviceType: string;
  pickupLocation: string;
  dropoffLocation: string;
  pickupDate: string;
  pickupTime: string;
  vehicleName: string;
  estimatedPrice: number;
}): string {
  const phone = "2348000000000"; // Replace with ChimJoy official WhatsApp line
  const text = `Hello ChimJoy Logistics! I would like to confirm my booking request:
  
📌 *Ref Code*: ${booking.referenceCode}
👤 *Name*: ${booking.customerName}
🚘 *Service*: ${booking.serviceType.toUpperCase()}
🚘 *Vehicle*: ${booking.vehicleName}
📍 *Pickup*: ${booking.pickupLocation}
🏁 *Dropoff*: ${booking.dropoffLocation}
📅 *Date & Time*: ${booking.pickupDate} at ${booking.pickupTime}
💰 *Estimated Rate*: ${formatCurrency(booking.estimatedPrice)}

Please review and confirm my request. Thank you!`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}
