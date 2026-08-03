import { Vehicle } from '@/types';
import { MOCK_VEHICLES } from '@/lib/mock-data';

let inMemoryFleet: Vehicle[] = [...MOCK_VEHICLES];

export async function getVehicles(): Promise<Vehicle[]> {
  return Promise.resolve([...inMemoryFleet]);
}

export async function getFeaturedVehicles(): Promise<Vehicle[]> {
  return Promise.resolve(inMemoryFleet.filter((v) => v.isFeatured && v.isAvailable));
}

export async function getVehicleById(id: string): Promise<Vehicle | null> {
  const vehicle = inMemoryFleet.find((v) => v.id === id);
  return Promise.resolve(vehicle || null);
}

export async function saveVehicle(vehicle: Vehicle): Promise<Vehicle> {
  const index = inMemoryFleet.findIndex((v) => v.id === vehicle.id);
  if (index >= 0) {
    inMemoryFleet[index] = vehicle;
  } else {
    inMemoryFleet.push(vehicle);
  }
  return Promise.resolve(vehicle);
}

export async function deleteVehicle(id: string): Promise<boolean> {
  inMemoryFleet = inMemoryFleet.filter((v) => v.id !== id);
  return Promise.resolve(true);
}
