import { BookingRequest } from '@/types';
import { MOCK_BOOKINGS } from '@/lib/mock-data';

// Local reactive state store for seamless offline/mock operational execution
let inMemoryBookings: BookingRequest[] = [...MOCK_BOOKINGS];

export async function getBookings(): Promise<BookingRequest[]> {
  return Promise.resolve([...inMemoryBookings]);
}

export async function createBookingRequest(request: Omit<BookingRequest, 'id' | 'createdAt' | 'status'>): Promise<BookingRequest> {
  const newBooking: BookingRequest = {
    ...request,
    id: `b_${Date.now()}`,
    status: 'Pending',
    createdAt: new Date().toISOString(),
  };
  inMemoryBookings = [newBooking, ...inMemoryBookings];
  return Promise.resolve(newBooking);
}

export async function updateBookingStatus(id: string, status: BookingRequest['status'], adminNotes?: string, driver?: string, vehicleNo?: string): Promise<BookingRequest | null> {
  const index = inMemoryBookings.findIndex((b) => b.id === id);
  if (index === -1) return Promise.resolve(null);

  inMemoryBookings[index] = {
    ...inMemoryBookings[index],
    status,
    ...(adminNotes !== undefined && { adminNotes }),
    ...(driver !== undefined && { assignedDriver: driver }),
    ...(vehicleNo !== undefined && { assignedVehicleNo: vehicleNo }),
  };

  return Promise.resolve(inMemoryBookings[index]);
}
