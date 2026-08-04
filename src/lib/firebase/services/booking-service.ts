import { db } from '../config';
import { collection, addDoc, onSnapshot, query, where, orderBy, setDoc, doc, getDocs } from 'firebase/firestore';
import { sendBookingConfirmationEmail } from '@/lib/services/email-service';
import { AdminBooking } from '@/types/admin';

export async function createRideBooking(bookingData: {
  serviceType: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  pickupLocation: string;
  dropoffLocation: string;
  pickupDate: string;
  pickupTime: string;
  referenceCode?: string;
  addons?: string[];
  vehicleImage?: string;
  vehicleId?: string;
  vehicleName?: string;
  flightNumber?: string;
  specialRequests?: string;
  estimatedPrice: number;
}): Promise<{ success: boolean; id?: string; referenceCode?: string; error?: string }> {
  try {
    const refCode = bookingData.referenceCode || `CJ-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
    const newBooking: Omit<AdminBooking, 'id'> = {
      referenceCode: refCode,
      serviceType: bookingData.serviceType,
      customerName: bookingData.customerName,
      customerEmail: bookingData.customerEmail,
      customerPhone: bookingData.customerPhone,
      pickupLocation: bookingData.pickupLocation,
      dropoffLocation: bookingData.dropoffLocation,
      pickupDate: bookingData.pickupDate,
      pickupTime: bookingData.pickupTime,
      vehicleId: bookingData.vehicleId || '',
      vehicleName: bookingData.vehicleName || 'Standard Executive SUV',
      flightNumber: bookingData.flightNumber || '',
      specialRequests: bookingData.specialRequests || '',
      status: 'Pending',
      estimatedPrice: bookingData.estimatedPrice,
      totalAmount: bookingData.estimatedPrice,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const docRef = await addDoc(collection(db, 'bookingRequests'), newBooking);

    // Save notification in admin_notifications
    await addDoc(collection(db, 'admin_notifications'), {
      title: 'New Booking Request Received',
      message: `Booking #${refCode} from ${bookingData.customerName} (${bookingData.serviceType})`,
      type: 'booking',
      isRead: false,
      createdAt: new Date().toISOString(),
    });

    // Trigger transactional Resend email
    await sendBookingConfirmationEmail({
      to: bookingData.customerEmail,
      customerName: bookingData.customerName,
      referenceCode: refCode,
      serviceType: bookingData.serviceType,
      pickupLocation: bookingData.pickupLocation,
      dropoffLocation: bookingData.dropoffLocation,
      pickupDate: bookingData.pickupDate,
      pickupTime: bookingData.pickupTime,
      vehicleName: bookingData.vehicleName || 'Standard Executive SUV',
      estimatedPrice: bookingData.estimatedPrice,
    });

    return { success: true, id: docRef.id, referenceCode: refCode };
  } catch (err: any) {
    console.error('[createRideBooking Error]:', err);
    return { success: false, error: err.message || 'Failed to submit booking.' };
  }
}

export const createBookingRequest = createRideBooking;

export async function createCarHireBooking(hireData: {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  pickupLocation: string;
  dropoffLocation: string;
  pickupDate: string;
  pickupTime: string;
  rentalDurationDays: number;
  isSelfDrive: boolean;
  insuranceSelected: boolean;
  vehicleId?: string;
  vehicleName?: string;
  totalAmount: number;
}): Promise<{ success: boolean; referenceCode?: string; error?: string }> {
  try {
    const refCode = `CJH-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
    const newHire: Omit<AdminBooking, 'id'> = {
      referenceCode: refCode,
      serviceType: hireData.isSelfDrive ? 'Car Hire (Self Drive)' : 'Car Hire (Chauffeur)',
      customerName: hireData.customerName,
      customerEmail: hireData.customerEmail,
      customerPhone: hireData.customerPhone,
      pickupLocation: hireData.pickupLocation,
      dropoffLocation: hireData.dropoffLocation,
      pickupDate: hireData.pickupDate,
      pickupTime: hireData.pickupTime,
      rentalDurationDays: hireData.rentalDurationDays,
      isSelfDrive: hireData.isSelfDrive,
      insuranceSelected: hireData.insuranceSelected,
      vehicleId: hireData.vehicleId || '',
      vehicleName: hireData.vehicleName || 'Toyota Land Cruiser Prado',
      status: 'Pending',
      estimatedPrice: hireData.totalAmount,
      totalAmount: hireData.totalAmount,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await addDoc(collection(db, 'bookingRequests'), newHire);
    await addDoc(collection(db, 'carHireBookings'), newHire);

    // Save notification for admin
    await addDoc(collection(db, 'admin_notifications'), {
      title: 'New Car Hire Rental Received',
      message: `Car Hire #${refCode} (${hireData.rentalDurationDays} Days) by ${hireData.customerName}`,
      type: 'booking',
      isRead: false,
      createdAt: new Date().toISOString(),
    });

    return { success: true, referenceCode: refCode };
  } catch (err: any) {
    console.error('[createCarHireBooking Error]:', err);
    return { success: false, error: err.message || 'Failed to submit car hire request.' };
  }
}

export function subscribeToUserBookings(userEmail: string, callback: (bookings: AdminBooking[]) => void) {
  const ref = collection(db, 'bookingRequests');
  return onSnapshot(ref, (snapshot) => {
    const list: AdminBooking[] = snapshot.docs
      .map((docSnap) => ({ id: docSnap.id, ...(docSnap.data() as Omit<AdminBooking, 'id'>) }))
      .filter((b) => b.customerEmail.toLowerCase() === userEmail.toLowerCase());
    callback(list);
  });
}

export async function getBookings(): Promise<AdminBooking[]> {
  try {
    const ref = collection(db, 'bookingRequests');
    const snap = await getDocs(ref);
    return snap.docs.map((docSnap) => ({ id: docSnap.id, ...(docSnap.data() as Omit<AdminBooking, 'id'>) }));
  } catch (err) {
    console.error('[getBookings Error]:', err);
    return [];
  }
}
