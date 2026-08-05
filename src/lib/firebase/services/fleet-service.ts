import { db } from '../config';
import { collection, onSnapshot, getDocs, setDoc, doc } from 'firebase/firestore';
import { Vehicle } from '@/types';
import { MOCK_VEHICLES } from '@/lib/mock-data';

// Realtime Firestore subscription for public fleet
export function subscribeToPublicFleet(callback: (vehicles: Vehicle[]) => void) {
  const fleetRef = collection(db, 'vehicles');
  return onSnapshot(
    fleetRef,
    async (snapshot) => {
      if (snapshot.empty) {
        // Auto-seed initial fleet to Cloud Firestore
        for (const v of MOCK_VEHICLES) {
          await setDoc(doc(db, 'vehicles', v.id), v).catch(() => null);
        }
        callback(MOCK_VEHICLES);
        return;
      }
      const list: Vehicle[] = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...(docSnap.data() as Omit<Vehicle, 'id'>),
      }));
      callback(list);
    },
    (err) => {
      console.error('[subscribeToPublicFleet Error]:', err);
      callback(MOCK_VEHICLES);
    }
  );
}

// Single fetch for server side or fallback
export async function getVehicles(): Promise<Vehicle[]> {
  try {
    const fleetRef = collection(db, 'vehicles');
    const snapshot = await getDocs(fleetRef);
    if (snapshot.empty) {
      return MOCK_VEHICLES;
    }
    return snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...(docSnap.data() as Omit<Vehicle, 'id'>),
    }));
  } catch (err) {
    console.error('[getVehicles Error]:', err);
    return MOCK_VEHICLES;
  }
}

export async function getFeaturedVehicles(): Promise<Vehicle[]> {
  const all = await getVehicles();
  return all.slice(0, 6);
}
