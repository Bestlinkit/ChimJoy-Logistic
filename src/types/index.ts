export type ServiceCategory = 'airport' | 'city' | 'rental' | 'logistics';

export interface Vehicle {
  id: string;
  name: string;
  categoryName?: string;
  categoryId?: string;
  brand?: string;
  model?: string;
  year?: number;
  category?: ServiceCategory;
  image: string;
  coverImage?: string;
  gallery?: string[];
  youtubeVideos?: string[];
  storagePath?: string;
  passengers: number;
  luggage: number;
  transmission: string;
  fuelType?: string;
  features?: string[];
  amenities?: string[];
  pricePerDay: number; // in NGN ₦
  airportFlatRate?: number; // in NGN ₦
  hourlyRate?: number; // in NGN ₦
  isAvailable: boolean;
  isFeatured?: boolean;
  maintenanceStatus?: 'Active' | 'Service Required' | 'Reserved';
  displayOrder?: number;
  description: string;
}

export type BookingStatus = 'Pending' | 'Confirmed' | 'Assigned' | 'In Transit' | 'Completed' | 'Cancelled';

export interface BookingAddon {
  id: string;
  name: string;
  price: number;
  description: string;
}

export interface BookingRequest {
  id: string;
  referenceCode: string;
  serviceType: any;
  pickupLocation: string;
  dropoffLocation: string;
  pickupDate: string;
  pickupTime: string;
  returnDate?: string;
  flightNumber?: string;
  vehicleId: string;
  vehicleName: string;
  vehicleImage: string;
  addons: any[];
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  specialRequests?: string;
  estimatedPrice: number;
  status: any;
  createdAt: string;
  assignedDriver?: string;
  assignedVehicleNo?: string;
  adminNotes?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location?: string;
  rating: number;
  content: string;
  avatar?: string;
  company?: string;
  serviceUsed?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface Driver {
  id: string;
  name: string;
  phone: string;
  licenseNo: string;
  status: string;
  avatar?: string;
  rating?: number;
  vehicleNo?: string;
}

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar?: string;
  emailVerified: boolean;
  isGoogleConnected?: boolean;
  twoFactorEnabled?: boolean;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  preferredLanguage?: string;
  createdAt: string;
}

export interface SavedLocation {
  id: string;
  label: 'Home' | 'Office' | 'Hotel' | 'Airport' | 'Custom';
  title: string;
  address: string;
  isDefault?: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  category: 'booking' | 'driver' | 'promotion' | 'system';
  isRead: boolean;
  createdAt: string;
  link?: string;
}

export interface TripStats {
  totalSpent: number;
  tripsCompleted: number;
  favouriteDestination: string;
  mostBookedVehicle: string;
}

