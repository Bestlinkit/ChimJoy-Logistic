const { initializeApp } = require('firebase/app');
const { getFirestore, setDoc, doc } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyCV78LWPP4vaiv88V6exq-O-n8mrMJtNeg",
  authDomain: "chimjoy-logistic.firebaseapp.com",
  projectId: "chimjoy-logistic",
  storageBucket: "chimjoy-logistic.firebasestorage.app",
  messagingSenderId: "714625191786",
  appId: "1:714625191786:web:9d811403a4327412c41f13",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const INITIAL_VEHICLES = [
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
    features: ['Chauffeur Included', 'Air Conditioning', 'Leather Seats', 'Bulletproof Tint'],
    description: 'Executive armored & luxury Prado SUV for high-profile transport in South-East Nigeria.',
    isAvailable: true,
    createdAt: new Date().toISOString(),
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
    createdAt: new Date().toISOString(),
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
    createdAt: new Date().toISOString(),
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
    createdAt: new Date().toISOString(),
  },
];

const INITIAL_DRIVERS = [
  {
    id: 'driver_chinedu',
    name: 'Chinedu Okeke',
    phone: '+234 807 788 0262',
    email: 'chinedu@chimjoylogistics.com.ng',
    licenseNumber: 'IMO-884920-CH',
    licenseExpiry: '2028-12-31',
    status: 'Available',
    rating: 4.9,
    completedTripsCount: 142,
    employmentStatus: 'Full Time',
    emergencyContact: '+234 803 123 4567',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'driver_emeka',
    name: 'Emeka Nwosu',
    phone: '+234 802 345 6789',
    email: 'emeka@chimjoylogistics.com.ng',
    licenseNumber: 'IMO-773910-EM',
    licenseExpiry: '2027-09-30',
    status: 'Available',
    rating: 5.0,
    completedTripsCount: 98,
    employmentStatus: 'Full Time',
    emergencyContact: '+234 805 987 6543',
    createdAt: new Date().toISOString(),
  },
];

async function seed() {
  console.log('[Direct Seeding] Writing vehicles to Cloud Firestore project: chimjoy-logistic...');
  for (const v of INITIAL_VEHICLES) {
    await setDoc(doc(db, 'vehicles', v.id), v);
    console.log(`✓ Document written: vehicles/${v.id}`);
  }

  console.log('[Direct Seeding] Writing drivers to Cloud Firestore project: chimjoy-logistic...');
  for (const d of INITIAL_DRIVERS) {
    await setDoc(doc(db, 'drivers', d.id), d);
    console.log(`✓ Document written: drivers/${d.id}`);
  }

  console.log('🎉 SUCCESS: All documents successfully written to Cloud Firestore!');
  process.exit(0);
}

seed().catch((err) => {
  console.error('❌ Seed Error:', err);
  process.exit(1);
});
