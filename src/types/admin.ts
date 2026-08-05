export type AdminRole = 'Super Admin' | 'Admin' | 'Operations Staff';

export interface AdminUser {
  uid: string;
  email: string;
  name: string;
  role: AdminRole;
  status: 'Active' | 'Inactive';
  phone?: string;
  avatarUrl?: string;
  createdAt: string;
  lastLogin?: string;
  ipAddress?: string;
}

export type BookingStatus =
  | 'Pending'
  | 'Confirmed'
  | 'Driver Assigned'
  | 'Driver En Route'
  | 'Passenger Picked Up'
  | 'Trip Started'
  | 'Completed'
  | 'Cancelled'
  | 'No Show';

export interface AdminBooking {
  id: string;
  referenceCode: string;
  serviceType: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  pickupLocation: string;
  dropoffLocation: string;
  pickupDate: string;
  pickupTime: string;
  vehicleCategory?: string;
  vehicleId?: string;
  vehicleName?: string;
  vehicleImage?: string;
  driverId?: string;
  driverName?: string;
  driverPhone?: string;
  status: BookingStatus;
  estimatedPrice: number;
  totalAmount?: number;
  rentalDurationDays?: number;
  isSelfDrive?: boolean;
  insuranceSelected?: boolean;
  specialRequests?: string;
  flightNumber?: string;
  notes?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface AdminDriver {
  id: string;
  name: string;
  phone: string;
  email?: string;
  licenseNumber: string;
  licenseExpiry: string;
  photoUrl?: string;
  assignedVehicleId?: string;
  assignedVehicleName?: string;
  status: 'Available' | 'On Trip' | 'Off Duty' | 'Suspended';
  rating: number;
  completedTripsCount: number;
  employmentStatus: 'Full Time' | 'Contract' | 'Part Time';
  emergencyContact: string;
  documents?: { name: string; url: string }[];
  createdAt: string;
}

export interface AdminCustomer {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalSpent: number;
  totalBookings: number;
  lastBookingDate?: string;
  preferredVehicle?: string;
  isVIP: boolean;
  isBlacklisted: boolean;
  blacklistReason?: string;
  notes?: string;
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  senderName: string;
  senderEmail: string;
  senderPhone: string;
  subject: string;
  message: string;
  status: 'Unread' | 'Read' | 'Replied' | 'Archived';
  isImportant: boolean;
  createdAt: string;
}

export interface ReviewItem {
  id: string;
  customerName: string;
  rating: number;
  serviceType: string;
  comment: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  isFeatured: boolean;
  reply?: string;
  createdAt: string;
}

export interface AuditLog {
  id: string;
  adminEmail: string;
  adminRole: AdminRole;
  action: string;
  module: string;
  details: string;
  oldValue?: string;
  newValue?: string;
  ipAddress?: string;
  timestamp: string;
}

export interface SystemNotification {
  id: string;
  title: string;
  message: string;
  type: 'booking' | 'cancellation' | 'customer' | 'review' | 'message' | 'system';
  isRead: boolean;
  linkUrl?: string;
  createdAt: string;
}
