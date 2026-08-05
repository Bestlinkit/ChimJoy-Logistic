import { db, auth } from '../config';
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
  return onSnapshot(
    bookingsRef,
    (snapshot) => {
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

      list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      callback(list);
    },
    (err) => {
      console.error('[subscribeToBookings Error]:', err);
      callback([]);
    }
  );
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

// Initial Fleet Seed Data
const INITIAL_SEED_VEHICLES: Vehicle[] = [
  {
    id: 'vehicle_prado_txl',
    name: 'Toyota Land Cruiser Prado TX-L',
    categoryName: 'SUVs',
    categoryId: 'cat-suv',
    image: '/images/suv_prado_1.jpg',
    coverImage: '/images/suv_prado_1.jpg',
    gallery: ['/images/suv_prado_1.jpg', '/images/fleet_prado_black.jpg'],
    pricePerDay: 120000,
    passengers: 7,
    luggage: 5,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    features: ['Chchauffeur Included', 'Air Conditioning', 'Leather Seats', 'Bulletproof Tint'],
    description: 'Executive armored & luxury Prado SUV for high-profile transport in South-East Nigeria.',
    isAvailable: true,
  },
  {
    id: 'vehicle_sclass_550',
    name: 'Mercedes-Benz S-Class S550',
    categoryName: 'Luxury Vehicles',
    categoryId: 'cat-luxury',
    image: '/images/fleet_mercedes_sclass.jpg',
    coverImage: '/images/fleet_mercedes_sclass.jpg',
    gallery: ['/images/fleet_mercedes_sclass.jpg'],
    pricePerDay: 250000,
    passengers: 4,
    luggage: 3,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    features: ['VIP Chauffeur', 'Massage Seats', 'Ambient Lighting', 'Soft Close Doors'],
    description: 'Ultra-luxury flagship sedan for corporate dignitaries, weddings, and executive airport transfers.',
    isAvailable: true,
  },
  {
    id: 'vehicle_hiace_bus',
    name: 'Toyota HiAce Executive Coaster Mini Bus',
    categoryName: 'Mini Bus / HiAce',
    categoryId: 'cat-bus',
    image: '/images/fleet_hiace_bus.jpg',
    coverImage: '/images/fleet_hiace_bus.jpg',
    gallery: ['/images/fleet_hiace_bus.jpg'],
    pricePerDay: 95000,
    passengers: 15,
    luggage: 12,
    transmission: 'Manual',
    fuelType: 'Diesel',
    features: ['Group Travel', 'Dual AC Units', 'Reclining Seats', 'High Ceiling'],
    description: 'Premium 15-seater executive mini bus for group transport, delegational travel, and event shuttles.',
    isAvailable: true,
  },
  {
    id: 'vehicle_hilux_truck',
    name: 'Toyota Hilux Double Cab 4x4',
    categoryName: 'Logistics Vans',
    categoryId: 'cat-truck',
    image: '/images/fleet_hilux_pickup.jpg',
    coverImage: '/images/fleet_hilux_pickup.jpg',
    gallery: ['/images/fleet_hilux_pickup.jpg'],
    pricePerDay: 80000,
    passengers: 5,
    luggage: 8,
    transmission: 'Automatic',
    fuelType: 'Diesel',
    features: ['All-Terrain 4x4', 'Heavy Duty Load Canopy', 'Escort Ready'],
    description: 'Rugged 4x4 double cab for heavy cargo dispatch, field operations, and security logistics.',
    isAvailable: true,
  },
];

export function subscribeToFleet(callback: (vehicles: Vehicle[]) => void) {
  const fleetRef = collection(db, 'vehicles');
  return onSnapshot(
    fleetRef,
    (snapshot) => {
      const list: Vehicle[] = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...(docSnap.data() as Omit<Vehicle, 'id'>),
      }));
      callback(list);
    },
    (err) => {
      console.error('[subscribeToFleet Error]:', err);
      callback([]);
    }
  );
}

export async function saveVehicleToDb(vehicleData: Partial<Vehicle>): Promise<string> {
  const currentUser = auth.currentUser;
  console.log('[Firestore Write Attempt] Target Collection: "vehicles"', {
    currentUser: currentUser
      ? { uid: currentUser.uid, email: currentUser.email, emailVerified: currentUser.emailVerified }
      : null,
    vehicleData,
  });

  if (!currentUser) {
    const authErr = new Error('[AUTH_NOT_SIGNED_IN] Cannot write to Firestore. No active Firebase Auth currentUser found.');
    console.error('[Firestore Write Aborted]:', authErr);
    throw authErr;
  }

  const fleetRef = collection(db, 'vehicles');
  try {
    if (vehicleData.id) {
      const ref = doc(db, 'vehicles', vehicleData.id);
      await setDoc(ref, { ...vehicleData, updatedAt: new Date().toISOString() }, { merge: true });
      console.log(`[Firestore Write Success] Updated document "vehicles/${vehicleData.id}"`);
      return vehicleData.id;
    } else {
      const docRef = await addDoc(fleetRef, {
        ...vehicleData,
        isAvailable: vehicleData.isAvailable ?? true,
        createdAt: new Date().toISOString(),
      });
      console.log(`[Firestore Write Success] Created new document "vehicles/${docRef.id}"`);
      return docRef.id;
    }
  } catch (err: any) {
    console.error('[Firestore Write Error]:', {
      code: err.code || 'UNKNOWN_ERROR',
      message: err.message,
      stack: err.stack,
      rawError: err,
    });
    throw err;
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
  return onSnapshot(
    driversRef,
    (snapshot) => {
      const list: AdminDriver[] = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...(docSnap.data() as Omit<AdminDriver, 'id'>),
      }));
      callback(list);
    },
    (err) => {
      console.error('[subscribeToDrivers Error]:', err);
      callback([]);
    }
  );
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
