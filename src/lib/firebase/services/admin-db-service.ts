import { db } from '../config';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
} from 'firebase/firestore';
import {
  AdminBooking,
  BookingStatus,
  AdminDriver,
  AdminCustomer,
  ContactMessage,
  ReviewItem,
  SystemNotification,
} from '@/types/admin';
import { Vehicle } from '@/types';

// ============================================================================
// 1. BOOKINGS REALTIME LISTENER & ACTIONS
// ============================================================================
export function subscribeToBookings(callback: (bookings: AdminBooking[]) => void) {
  const bookingsRef = collection(db, 'bookingRequests');
  const q = query(bookingsRef, orderBy('createdAt', 'desc'));
  return onSnapshot(bookingsRef, (snapshot) => {
    const list: AdminBooking[] = snapshot.docs.map((docSnap) => {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        referenceCode: data.referenceCode || `CJ-${docSnap.id.substring(0, 5).toUpperCase()}`,
        serviceType: data.serviceType || 'Executive Ride',
        customerName: data.customerName || 'Valued Client',
        customerEmail: data.customerEmail || 'client@company.ng',
        customerPhone: data.customerPhone || '+234 800 000 0000',
        pickupLocation: data.pickupLocation || 'Owerri',
        dropoffLocation: data.dropoffLocation || 'Destination',
        pickupDate: data.pickupDate || new Date().toISOString().split('T')[0],
        pickupTime: data.pickupTime || '09:00',
        vehicleId: data.vehicleId || '',
        vehicleName: data.vehicleName || 'Toyota Prado SUV',
        vehicleImage: data.vehicleImage || '/images/suv_prado_1.jpg',
        driverId: data.driverId || '',
        driverName: data.driverName || '',
        driverPhone: data.driverPhone || '',
        status: (data.status as BookingStatus) || 'Pending',
        estimatedPrice: data.estimatedPrice || data.totalAmount || 50000,
        totalAmount: data.totalAmount || data.estimatedPrice || 50000,
        rentalDurationDays: data.rentalDurationDays || 1,
        isSelfDrive: data.isSelfDrive || false,
        insuranceSelected: data.insuranceSelected || false,
        specialRequests: data.specialRequests || '',
        flightNumber: data.flightNumber || '',
        notes: data.notes || '',
        createdAt: data.createdAt || new Date().toISOString(),
        updatedAt: data.updatedAt || new Date().toISOString(),
      };
    });

    // Sort client-side if missing field
    list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    callback(list);
  });
}

export async function updateBookingStatusInDb(bookingId: string, status: BookingStatus, notes?: string): Promise<void> {
  const ref = doc(db, 'bookingRequests', bookingId);
  await updateDoc(ref, {
    status,
    notes: notes || '',
    updatedAt: new Date().toISOString(),
  });
}

export async function assignDriverToBookingInDb(
  bookingId: string,
  driverId: string,
  driverName: string,
  driverPhone: string
): Promise<void> {
  const ref = doc(db, 'bookingRequests', bookingId);
  await updateDoc(ref, {
    driverId,
    driverName,
    driverPhone,
    status: 'Driver Assigned',
    updatedAt: new Date().toISOString(),
  });
}

// ============================================================================
// 2. FLEET / VEHICLES REALTIME LISTENER & ACTIONS
// ============================================================================
export function subscribeToFleet(callback: (vehicles: Vehicle[]) => void) {
  const fleetRef = collection(db, 'vehicles');
  return onSnapshot(fleetRef, (snapshot) => {
    const list: Vehicle[] = snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...(docSnap.data() as Omit<Vehicle, 'id'>),
    }));
    callback(list);
  });
}

export async function saveVehicleToDb(vehicleData: Partial<Vehicle>): Promise<string> {
  const fleetRef = collection(db, 'vehicles');
  if (vehicleData.id) {
    const ref = doc(db, 'vehicles', vehicleData.id);
    await setDoc(ref, { ...vehicleData, updatedAt: new Date().toISOString() }, { merge: true });
    return vehicleData.id;
  } else {
    const docRef = await addDoc(fleetRef, {
      ...vehicleData,
      isAvailable: vehicleData.isAvailable ?? true,
      createdAt: new Date().toISOString(),
    });
    return docRef.id;
  }
}

export async function deleteVehicleFromDb(vehicleId: string): Promise<void> {
  const ref = doc(db, 'vehicles', vehicleId);
  await deleteDoc(ref);
}

// ============================================================================
// 3. DRIVERS REALTIME LISTENER & ACTIONS
// ============================================================================
export function subscribeToDrivers(callback: (drivers: AdminDriver[]) => void) {
  const driversRef = collection(db, 'drivers');
  return onSnapshot(driversRef, (snapshot) => {
    const list: AdminDriver[] = snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...(docSnap.data() as Omit<AdminDriver, 'id'>),
    }));
    callback(list);
  });
}

export async function saveDriverToDb(driverData: Partial<AdminDriver>): Promise<string> {
  if (driverData.id) {
    const ref = doc(db, 'drivers', driverData.id);
    await setDoc(ref, { ...driverData, updatedAt: new Date().toISOString() }, { merge: true });
    return driverData.id;
  } else {
    const driversRef = collection(db, 'drivers');
    const docRef = await addDoc(driversRef, {
      ...driverData,
      status: driverData.status || 'Available',
      rating: driverData.rating || 5.0,
      completedTripsCount: driverData.completedTripsCount || 0,
      createdAt: new Date().toISOString(),
    });
    return docRef.id;
  }
}

// ============================================================================
// 4. CUSTOMERS REALTIME LISTENER & ACTIONS
// ============================================================================
export function subscribeToCustomers(callback: (customers: AdminCustomer[]) => void) {
  const customersRef = collection(db, 'customers');
  return onSnapshot(customersRef, (snapshot) => {
    const list: AdminCustomer[] = snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...(docSnap.data() as Omit<AdminCustomer, 'id'>),
    }));
    callback(list);
  });
}

export async function updateCustomerStatusInDb(
  customerId: string,
  isVIP: boolean,
  isBlacklisted: boolean,
  notes?: string
): Promise<void> {
  const ref = doc(db, 'customers', customerId);
  await setDoc(ref, { isVIP, isBlacklisted, notes: notes || '' }, { merge: true });
}

// ============================================================================
// 5. MESSAGES & REVIEWS
// ============================================================================
export function subscribeToMessages(callback: (messages: ContactMessage[]) => void) {
  const msgRef = collection(db, 'contact_messages');
  return onSnapshot(msgRef, (snapshot) => {
    const list: ContactMessage[] = snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...(docSnap.data() as Omit<ContactMessage, 'id'>),
    }));
    callback(list);
  });
}

export function subscribeToReviews(callback: (reviews: ReviewItem[]) => void) {
  const revRef = collection(db, 'reviews');
  return onSnapshot(revRef, (snapshot) => {
    const list: ReviewItem[] = snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...(docSnap.data() as Omit<ReviewItem, 'id'>),
    }));
    callback(list);
  });
}

export async function updateReviewStatusInDb(reviewId: string, status: 'Approved' | 'Rejected', isFeatured?: boolean): Promise<void> {
  const ref = doc(db, 'reviews', reviewId);
  await setDoc(ref, { status, isFeatured: isFeatured || false }, { merge: true });
}

// ============================================================================
// 6. REALTIME NOTIFICATIONS
// ============================================================================
export function subscribeToNotifications(callback: (notifications: SystemNotification[]) => void) {
  const notifRef = collection(db, 'admin_notifications');
  return onSnapshot(notifRef, (snapshot) => {
    const list: SystemNotification[] = snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...(docSnap.data() as Omit<SystemNotification, 'id'>),
    }));
    callback(list);
  });
}

export async function markNotificationReadInDb(notifId: string): Promise<void> {
  const ref = doc(db, 'admin_notifications', notifId);
  await updateDoc(ref, { isRead: true });
}
