import { NextResponse } from 'next/server';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, doc, setDoc, collection, addDoc, getDocs } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { MOCK_VEHICLES } from '@/lib/mock-data';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyCV78LWPP4vaiv88V6exq-O-n8mrMJtNeg",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "chimjoy-logistic.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "chimjoy-logistic",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "chimjoy-logistic.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "714625191786",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:714625191786:web:9d811403a4327412c41f13",
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export async function GET() {
  try {
    const adminEmail = 'office@chimjoylogisticservices.com.ng';
    const adminPassword = 'ChimJoyAdmin2026!';
    let adminUid = '';

    // 1. Create or Authenticate Admin User
    try {
      const cred = await createUserWithEmailAndPassword(auth, adminEmail, adminPassword);
      adminUid = cred.user.uid;
    } catch (err: any) {
      if (err.code === 'auth/email-already-in-use') {
        const cred = await signInWithEmailAndPassword(auth, adminEmail, adminPassword);
        adminUid = cred.user.uid;
      } else {
        console.error('Auth User creation error:', err);
      }
    }

    // 2. Seed `admins` document
    if (adminUid) {
      await setDoc(doc(db, 'admins', adminUid), {
        uid: adminUid,
        email: adminEmail,
        name: 'ChimJoy Executive Operations Office',
        role: 'Super Admin',
        status: 'Active',
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        ipAddress: '127.0.0.1',
      });
    }

    // 3. Seed `vehicles` collection
    const vehiclesSnap = await getDocs(collection(db, 'vehicles'));
    if (vehiclesSnap.empty) {
      for (const v of MOCK_VEHICLES) {
        await setDoc(doc(db, 'vehicles', v.id), v);
      }
    }

    // 4. Seed `drivers` collection
    const driversSnap = await getDocs(collection(db, 'drivers'));
    if (driversSnap.empty) {
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
    }

    // 5. Seed `reviews` collection
    const reviewsSnap = await getDocs(collection(db, 'reviews'));
    if (reviewsSnap.empty) {
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
          comment: 'We hired two Toyota Prado SUVs for our family event in Owerri. Drivers were polite and on time.',
          status: 'Approved',
          isFeatured: true,
          createdAt: new Date().toISOString(),
        },
      ];
      for (const r of initialReviews) {
        await setDoc(doc(db, 'reviews', r.id), r);
      }
    }

    // 6. Seed `admin_notifications` collection
    const notifSnap = await getDocs(collection(db, 'admin_notifications'));
    if (notifSnap.empty) {
      await addDoc(collection(db, 'admin_notifications'), {
        title: 'Operational Control Center Active',
        message: 'ChimJoy Car Hire Firebase database seeded and live.',
        type: 'system',
        isRead: false,
        createdAt: new Date().toISOString(),
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Firestore seeded successfully with all collections and Super Admin account office@chimjoylogisticservices.com.ng',
      adminUid,
    });
  } catch (err: any) {
    console.error('Seed API error:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
