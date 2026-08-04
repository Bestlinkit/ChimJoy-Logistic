import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, doc, setDoc, collection, addDoc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

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

async function seedDatabase() {
  console.log('🚀 Starting Firebase Auth & Firestore Production Seeding...');

  const adminEmail = 'office@chimjoylogisticservices.com.ng';
  const adminPassword = 'ChimJoyAdmin2026!';
  let adminUid = '';

  // 1. Create or Authenticate Firebase Auth Admin User
  try {
    const cred = await createUserWithEmailAndPassword(auth, adminEmail, adminPassword);
    adminUid = cred.user.uid;
    console.log(`✅ Created Admin Firebase Auth User: ${adminEmail} (UID: ${adminUid})`);
  } catch (err: any) {
    if (err.code === 'auth/email-already-in-use') {
      const cred = await signInWithEmailAndPassword(auth, adminEmail, adminPassword);
      adminUid = cred.user.uid;
      console.log(`✅ Authenticated Existing Admin User: ${adminEmail} (UID: ${adminUid})`);
    } else {
      console.error('❌ Error creating Admin Auth user:', err);
    }
  }

  // 2. Seed `admins` Collection
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
    console.log('✅ Seeded Firestore Collection: admins');
  }

  // 3. Seed `vehicles` Collection
  const vehicles = [
    {
      id: 'v1',
      name: 'Toyota Land Cruiser Prado TX-L',
      categoryName: 'SUVs',
      categoryId: 'cat-suv',
      image: '/images/suv_prado_2.jpg',
      pricePerDay: 85000,
      passengers: 7,
      luggage: 5,
      transmission: 'Automatic',
      fuelType: 'Petrol',
      features: ['Chchauffeur Included', 'Climate Control AC', 'Full Tint', 'VIP Escort Ready'],
      description: 'Executive 4WD Toyota Land Cruiser Prado SUV for luxury airport transfers, VIP delegations, and intercity travel across Imo State.',
      isAvailable: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'v2',
      name: 'Toyota Camry Executive Sedan',
      categoryName: 'Executive Cars',
      categoryId: 'cat-exec',
      image: '/images/car_sedan.jpg',
      pricePerDay: 45000,
      passengers: 4,
      luggage: 3,
      transmission: 'Automatic',
      fuelType: 'Petrol',
      features: ['Chchauffeur Included', 'Cold AC', 'Leather Interior', 'Smooth Ride'],
      description: 'Comfortable executive sedan for business travel, hotel transfers, and daily town trips within Owerri.',
      isAvailable: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'v3',
      name: 'Toyota Prado VIP Luxury SUV',
      categoryName: 'Luxury Vehicles',
      categoryId: 'cat-lux',
      image: '/images/suv_prado_1.jpg',
      pricePerDay: 150000,
      passengers: 7,
      luggage: 6,
      transmission: 'Automatic',
      fuelType: 'Petrol',
      features: ['Executive Chchauffeur', 'V8 Power', 'Premium Sound', 'High Security'],
      description: 'Flagship luxury SUV for VIP dignitary arrivals, weddings, and high-security executive movement.',
      isAvailable: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'v4',
      name: 'Executive Fleet SUV Prado TX',
      categoryName: 'SUVs',
      categoryId: 'cat-suv',
      image: '/images/suv_prado_3.webp',
      pricePerDay: 95000,
      passengers: 7,
      luggage: 5,
      transmission: 'Automatic',
      fuelType: 'Petrol',
      features: ['Dedicated Driver', 'Dual AC Units', 'Reclining Seats', 'Luggage Space'],
      description: 'Spacious executive SUV for corporate team transportation, wedding guests, and group airport movement.',
      isAvailable: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'v5',
      name: 'Toyota Executive Sedan Special',
      categoryName: 'Executive Cars',
      categoryId: 'cat-exec',
      image: '/images/images (4).jpg',
      pricePerDay: 110000,
      passengers: 4,
      luggage: 3,
      transmission: 'Automatic',
      fuelType: 'Petrol',
      features: ['Professional Chauffeur', 'Climate Control', 'Leather Seats', 'Tinted Windows'],
      description: 'Prestigious luxury sedan for corporate executives, VIP events, and high-profile visits to Owerri.',
      isAvailable: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'v6',
      name: 'Toyota Corolla Comfort',
      categoryName: 'Economy Cars',
      categoryId: 'cat-econ',
      image: '/images/images (10).jpg',
      pricePerDay: 35000,
      passengers: 4,
      luggage: 2,
      transmission: 'Automatic',
      fuelType: 'Petrol',
      features: ['Experienced Driver', 'Air Conditioning', 'Fuel Efficient', 'Clean Interior'],
      description: 'Reliable and affordable daily car hire for city errands and quick transfers around Owerri town.',
      isAvailable: true,
      createdAt: new Date().toISOString(),
    },
  ];

  for (const v of vehicles) {
    await setDoc(doc(db, 'vehicles', v.id), v);
  }
  console.log('✅ Seeded Firestore Collection: vehicles');

  // 4. Seed `drivers` Collection
  const drivers = [
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

  for (const d of drivers) {
    await setDoc(doc(db, 'drivers', d.id), d);
  }
  console.log('✅ Seeded Firestore Collection: drivers');

  // 5. Seed `bookingRequests` Collection
  const initialBooking = {
    referenceCode: 'CJ-QOW99',
    serviceType: 'Sam Mbakwe Airport VIP Pickup',
    customerName: 'Dr. Amaka Igwe',
    customerEmail: 'amaka.igwe@corporate.ng',
    customerPhone: '+234 803 999 8877',
    pickupLocation: 'Sam Mbakwe International Cargo Airport (QOW)',
    dropoffLocation: 'Rockview Hotel, Owerri',
    pickupDate: new Date().toISOString().split('T')[0],
    pickupTime: '14:30',
    vehicleId: 'v1',
    vehicleName: 'Toyota Land Cruiser Prado TX-L',
    driverId: 'drv-01',
    driverName: 'Chinedu Okeke',
    driverPhone: '+234 807 788 0262',
    status: 'Confirmed',
    estimatedPrice: 85000,
    totalAmount: 85000,
    createdAt: new Date().toISOString(),
  };
  await addDoc(collection(db, 'bookingRequests'), initialBooking);
  console.log('✅ Seeded Firestore Collection: bookingRequests');

  // 6. Seed `reviews` Collection
  const reviews = [
    {
      id: 'rev-01',
      customerName: 'Chinedu A.',
      serviceType: 'Sam Mbakwe Airport Transfer',
      rating: 5,
      comment: 'Excellent service from the airport to my hotel in Owerri. The driver arrived before my flight landed and the vehicle was spotless.',
      status: 'Approved',
      isFeatured: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'rev-02',
      customerName: 'Adanna K.',
      serviceType: 'Car Hire (Prado SUV)',
      rating: 5,
      comment: 'We hired two Toyota Prado SUVs for our family event in Owerri. The drivers were punctual, polite, and knew all the roads.',
      status: 'Approved',
      isFeatured: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'rev-03',
      customerName: 'Emeka O.',
      serviceType: 'Executive Chchauffeur',
      rating: 5,
      comment: 'ChimJoy provides reliable corporate car hire for our visiting executives. Always professional and exceptionally on time.',
      status: 'Approved',
      isFeatured: true,
      createdAt: new Date().toISOString(),
    },
  ];

  for (const r of reviews) {
    await setDoc(doc(db, 'reviews', r.id), r);
  }
  console.log('✅ Seeded Firestore Collection: reviews');

  // 7. Seed `admin_notifications` Collection
  await addDoc(collection(db, 'admin_notifications'), {
    title: 'Operational Control Center Active',
    message: 'ChimJoy Car Hire Firebase database seeded and live.',
    type: 'system',
    isRead: false,
    createdAt: new Date().toISOString(),
  });
  console.log('✅ Seeded Firestore Collection: admin_notifications');

  console.log('🎉 Seeding Complete! Firestore is live with production data.');
}

seedDatabase().then(() => process.exit(0)).catch((err) => {
  console.error(err);
  process.exit(1);
});
