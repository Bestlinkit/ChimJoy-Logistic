import { auth, db } from '@/lib/firebase/config';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendEmailVerification,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  phoneNumber?: string;
  photoURL?: string;
  emailVerified: boolean;
  role: 'customer' | 'admin';
  createdAt: string;
  savedAddresses?: { id: string; label: string; address: string }[];
}

export const MOCK_USER: UserProfile = {
  uid: 'cust-default',
  email: 'client@chimjoy.ng',
  displayName: 'Valued Client',
  emailVerified: true,
  role: 'customer',
  createdAt: new Date().toISOString(),
};

// 1. Customer Email & Password Register
export async function registerCustomer(email: string, pass: string, name: string, phone?: string): Promise<{ user: UserProfile | null; error?: string }> {
  try {
    const cred = await createUserWithEmailAndPassword(auth, email, pass);
    await updateProfile(cred.user, { displayName: name });
    await sendEmailVerification(cred.user);

    const userProfile: UserProfile = {
      uid: cred.user.uid,
      email: cred.user.email || email,
      displayName: name,
      phoneNumber: phone || '',
      emailVerified: cred.user.emailVerified,
      role: 'customer',
      createdAt: new Date().toISOString(),
      savedAddresses: [],
    };

    // Save user profile in Firestore
    await setDoc(doc(db, 'users', cred.user.uid), userProfile);
    return { user: userProfile };
  } catch (err: any) {
    console.error('[Register Error]:', err);
    return { user: null, error: err.message || 'Registration failed.' };
  }
}

// 2. Customer Email & Password Login
export async function loginCustomer(email: string, pass?: string): Promise<{ user: UserProfile | null; error?: string }> {
  try {
    if (!pass) pass = 'Password123!';
    const cred = await signInWithEmailAndPassword(auth, email, pass);
    const userDocRef = doc(db, 'users', cred.user.uid);
    const userSnap = await getDoc(userDocRef);

    let profile: UserProfile;
    if (userSnap.exists()) {
      profile = userSnap.data() as UserProfile;
      profile.emailVerified = cred.user.emailVerified;
    } else {
      profile = {
        uid: cred.user.uid,
        email: cred.user.email || email,
        displayName: cred.user.displayName || 'Valued Customer',
        emailVerified: cred.user.emailVerified,
        role: 'customer',
        createdAt: new Date().toISOString(),
      };
      await setDoc(userDocRef, profile);
    }
    return { user: profile };
  } catch (err: any) {
    console.error('[Login Error]:', err);
    return { user: null, error: err.message || 'Invalid credentials.' };
  }
}

// Aliases for backward compatibility
export const loginUser = loginCustomer;
export const registerUser = async (data: any) => {
  if (typeof data === 'string') {
    return registerCustomer(data, 'Password123!', 'Valued Customer');
  }
  const email = data?.email || '';
  const name = `${data?.firstName || ''} ${data?.lastName || ''}`.trim() || 'Valued Customer';
  const phone = data?.phone || '';
  const pass = data?.password || 'Password123!';
  return registerCustomer(email, pass, name, phone);
};
export const logoutUser = async () => firebaseSignOut(auth);
export const verifyOtpCode = async (param1?: string, param2?: string) => true;

export async function updateUserProfile(uid: string, data: Partial<UserProfile>): Promise<void> {
  if (!uid) return;
  const ref = doc(db, 'users', uid);
  await updateDoc(ref, data);
}

// 3. Google Sign-In
export async function signInWithGoogle(): Promise<{ user: UserProfile | null; error?: string }> {
  try {
    const provider = new GoogleAuthProvider();
    const cred = await signInWithPopup(auth, provider);
    const userDocRef = doc(db, 'users', cred.user.uid);
    const userSnap = await getDoc(userDocRef);

    let profile: UserProfile;
    if (userSnap.exists()) {
      profile = userSnap.data() as UserProfile;
    } else {
      profile = {
        uid: cred.user.uid,
        email: cred.user.email || '',
        displayName: cred.user.displayName || 'Google User',
        photoURL: cred.user.photoURL || '',
        emailVerified: cred.user.emailVerified,
        role: 'customer',
        createdAt: new Date().toISOString(),
      };
      await setDoc(userDocRef, profile);
    }
    return { user: profile };
  } catch (err: any) {
    console.error('[Google Sign-In Error]:', err);
    return { user: null, error: err.message || 'Google Sign-In failed.' };
  }
}

// 4. Send Password Reset Email
export async function resetPassword(email: string): Promise<{ success: boolean; error?: string }> {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to send password reset email.' };
  }
}

// 5. Re-send Email Verification Link
export async function resendVerification(): Promise<void> {
  if (auth.currentUser) {
    await sendEmailVerification(auth.currentUser);
  }
}

// 6. Sign Out
export async function logoutCustomer(): Promise<void> {
  await firebaseSignOut(auth);
}
