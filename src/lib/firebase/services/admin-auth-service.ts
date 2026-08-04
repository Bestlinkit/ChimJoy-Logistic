import { db, auth } from '../config';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  addDoc,
} from 'firebase/firestore';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { AdminRole, AdminUser } from '@/types/admin';
import { MOCK_VEHICLES } from '@/lib/mock-data';

// Helper function to auto-seed initial database collections if Firestore is empty
export async function seedFirestoreCollections() {
  try {
    // 1. Seed Vehicles
    const vehiclesRef = collection(db, 'vehicles');
    const vehSnap = await getDocs(vehiclesRef);
    if (vehSnap.empty) {
      for (const v of MOCK_VEHICLES) {
        await setDoc(doc(db, 'vehicles', v.id), v);
      }
      console.log('✅ Seeded vehicles collection');
    }

    // 2. Seed Drivers
    const driversRef = collection(db, 'drivers');
    const drvSnap = await getDocs(driversRef);
    if (drvSnap.empty) {
      const initialDrivers = [
        {
          id: 'drv-01',
          name: 'Chinedu Okeke',
          phone: '+234 807 788 0262',
          email: 'chinedu.driver@chimjoy.ng',
          licenseNumber: 'IMO-DRV-90821',
          licenseExpiry: '2028-12-31',
          status: 'Available',
          rating: 5.0,
          completedTripsCount: 142,
          employmentStatus: 'Full Time',
          emergencyContact: '+234 803 111 2233',
          createdAt: new Date().toISOString(),
        },
        {
          id: 'drv-02',
          name: 'Emeka Nnamdi',
          phone: '+234 803 445 6677',
          email: 'emeka.driver@chimjoy.ng',
          licenseNumber: 'IMO-DRV-77612',
          licenseExpiry: '2027-09-30',
          status: 'On Trip',
          rating: 4.9,
          completedTripsCount: 98,
          employmentStatus: 'Full Time',
          emergencyContact: '+234 802 333 4455',
          createdAt: new Date().toISOString(),
        },
      ];
      for (const d of initialDrivers) {
        await setDoc(doc(db, 'drivers', d.id), d);
      }
      console.log('✅ Seeded drivers collection');
    }

    // 3. Seed Reviews
    const reviewsRef = collection(db, 'reviews');
    const revSnap = await getDocs(reviewsRef);
    if (revSnap.empty) {
      const initialReviews = [
        {
          id: 'rev-01',
          customerName: 'Chinedu A.',
          serviceType: 'Sam Mbakwe Airport Transfer',
          rating: 5,
          comment: 'Excellent service from the airport to my hotel in Owerri. The driver arrived before my flight landed.',
          status: 'Approved',
          isFeatured: true,
          createdAt: new Date().toISOString(),
        },
        {
          id: 'rev-02',
          customerName: 'Adanna K.',
          serviceType: 'Car Hire (Prado SUV)',
          rating: 5,
          comment: 'We hired two Toyota Prado SUVs for our family event in Owerri. Professional and punctual.',
          status: 'Approved',
          isFeatured: true,
          createdAt: new Date().toISOString(),
        },
      ];
      for (const r of initialReviews) {
        await setDoc(doc(db, 'reviews', r.id), r);
      }
      console.log('✅ Seeded reviews collection');
    }
  } catch (err) {
    console.error('Firestore seeding warning:', err);
  }
}

export async function loginAdmin(email: string, pass: string): Promise<{ user: AdminUser | null; error?: string }> {
  try {
    let cred;
    try {
      cred = await signInWithEmailAndPassword(auth, email, pass);
    } catch (authErr: any) {
      // If user does not exist yet in Firebase Auth, create admin account for authorized domain
      if (
        authErr.code === 'auth/user-not-found' ||
        authErr.code === 'auth/invalid-credential' ||
        authErr.code === 'auth/wrong-password'
      ) {
        if (
          email.toLowerCase().includes('chimjoy') ||
          email.toLowerCase().includes('office') ||
          email.toLowerCase().includes('admin')
        ) {
          try {
            cred = await createUserWithEmailAndPassword(auth, email, pass);
          } catch (createErr: any) {
            return { user: null, error: createErr.message || 'Invalid administrator password.' };
          }
        } else {
          return { user: null, error: 'Invalid administrator credentials.' };
        }
      } else {
        throw authErr;
      }
    }

    const uid = cred.user.uid;
    const adminDocRef = doc(db, 'admins', uid);
    const adminSnap = await getDoc(adminDocRef);

    let adminData: AdminUser;

    if (!adminSnap.exists()) {
      adminData = {
        uid,
        email: cred.user.email || email,
        name: 'ChimJoy Executive Operations',
        role: 'Super Admin',
        status: 'Active',
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        ipAddress: '127.0.0.1',
      };
      await setDoc(adminDocRef, adminData);
    } else {
      adminData = adminSnap.data() as AdminUser;
      if (adminData.status !== 'Active') {
        await signOut(auth);
        return { user: null, error: 'Account Suspended: Your administrator account is deactivated.' };
      }
      await updateDoc(adminDocRef, {
        lastLogin: new Date().toISOString(),
      });
    }

    // Trigger background collection seeding in Firestore
    seedFirestoreCollections();

    return { user: adminData };
  } catch (err: any) {
    console.error('[Admin Login Error]:', err);
    return { user: null, error: err.message || 'Invalid administrator credentials.' };
  }
}

export async function logoutAdmin(): Promise<void> {
  await signOut(auth);
}

export function subscribeToCurrentAdmin(uid: string, callback: (user: AdminUser | null) => void) {
  const adminDocRef = doc(db, 'admins', uid);
  return onSnapshot(adminDocRef, (snap) => {
    if (snap.exists()) {
      callback(snap.data() as AdminUser);
    } else {
      callback(null);
    }
  });
}
