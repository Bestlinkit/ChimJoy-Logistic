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
  | 'Vehicle Ready'
  | 'Driver En Route'
  | 'Driver Arrived'
  | 'Passenger Picked Up'
  | 'Trip In Progress'
  | 'Trip Completed'
  | 'Invoice Sent'
  | 'Closed'
  | 'Cancelled'
  | 'No Show';

export interface DispatchHistoryRecord {
  status: BookingStatus;
  timestamp: string;
  adminName: string;
  notes?: string;
}

export interface DispatchSnapshot {
  vehicle: {
    name: string;
    category: string;
    registrationNumber: string;
    color: string;
    year: string;
    condition: string;
    features: string[];
    maxPassengers: number;
    dailyRate: number;
    coverImage: string;
    galleryImages: string[];
    youtubeVideo?: string;
    internalNotes?: string;
  };
  driver: {
    name: string;
    phone: string;
    whatsapp: string;
    email: string;
    licenseNumber: string;
    driverId?: string;
    experience?: string;
    languages?: string[];
    uniformStatus?: string;
    emergencyContact?: string;
    photo: string;
    notes?: string;
  };
  pickup: {
    pickupDate: string;
    pickupTime: string;
    estimatedArrival?: string;
    terminal?: string;
    gate?: string;
    flightNumber?: string;
    hotelName?: string;
    meetingPoint: string;
    contactMethod: 'Call' | 'SMS' | 'WhatsApp';
    signboardName?: string;
    instructions?: string;
  };
  pricing: {
    baseFare: number;
    distanceCharge: number;
    waitingCharge: number;
    airportFee: number;
    nightCharge: number;
    discount: number;
    vat: number;
    total: number;
    paymentMethod: string;
    paymentStatus: 'Pending' | 'Paid' | 'Refunded' | 'Cancelled';
  };
  status: BookingStatus;
  history: DispatchHistoryRecord[];
  internalNotes?: {
    dispatcherNotes?: string;
    driverNotes?: string;
    vipInstructions?: string;
    securityNotes?: string;
  };
}

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
  dispatch?: DispatchSnapshot;
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
  status: 'unread' | 'read' | 'replied' | 'archived' | 'Unread' | 'Read' | 'Replied' | 'Archived';
  isRead: boolean;
  isImportant?: boolean;
  replyStatus?: 'pending' | 'replied';
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
