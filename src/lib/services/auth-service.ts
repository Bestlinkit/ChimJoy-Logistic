import { UserProfile } from '@/types';

// Default Executive User for Portal Showcase
export const MOCK_USER: UserProfile = {
  id: 'usr_chinedu_01',
  firstName: 'Chinedu',
  lastName: 'Okonkwo',
  email: 'chinedu.okonkwo@company.ng',
  phone: '+234 803 889 0122',
  avatar: '/images/nigerian_driver_alone_1785747001406.png',
  emailVerified: true,
  isGoogleConnected: true,
  twoFactorEnabled: false,
  emergencyContactName: 'Dr. Amaka Okonkwo',
  emergencyContactPhone: '+234 802 112 3456',
  preferredLanguage: 'English',
  createdAt: '2025-11-15T09:30:00Z',
};

// In-Memory reactive session store
let currentUser: UserProfile | null = MOCK_USER;
let pendingVerificationEmail: string | null = null;
let currentOtpCode: string = '884920';

export async function getCurrentUser(): Promise<UserProfile | null> {
  return Promise.resolve(currentUser);
}

export async function loginUser(email: string): Promise<{ success: boolean; requiresOtp?: boolean; user?: UserProfile }> {
  // If logging in from new session/device, trigger OTP
  pendingVerificationEmail = email;
  return Promise.resolve({
    success: true,
    requiresOtp: true,
    user: {
      ...MOCK_USER,
      email,
    },
  });
}

export async function registerUser(data: Partial<UserProfile>): Promise<{ success: boolean; email: string }> {
  const newUser: UserProfile = {
    id: `usr_${Date.now()}`,
    firstName: data.firstName || 'New',
    lastName: data.lastName || 'Client',
    email: data.email || 'user@company.ng',
    phone: data.phone || '+234 800 000 0000',
    emailVerified: false,
    createdAt: new Date().toISOString(),
  };
  currentUser = newUser;
  pendingVerificationEmail = newUser.email;
  return Promise.resolve({ success: true, email: newUser.email });
}

export async function verifyOtpCode(code: string): Promise<boolean> {
  if (currentUser) {
    currentUser.emailVerified = true;
  }
  return Promise.resolve(code === currentOtpCode || code.length === 6);
}

export async function logoutUser(): Promise<void> {
  currentUser = null;
  return Promise.resolve();
}

export async function updateUserProfile(updates: Partial<UserProfile>): Promise<UserProfile> {
  if (!currentUser) throw new Error('Not authenticated');
  currentUser = {
    ...currentUser,
    ...updates,
  };
  return Promise.resolve(currentUser);
}
