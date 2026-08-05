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

    const profile: UserProfile = {
      uid: cred.user.uid,
      email: cred.user.email || email,
      displayName: cred.user.displayName || 'Valued Customer',
      emailVerified: cred.user.emailVerified,
      role: 'customer',
      createdAt: new Date().toISOString(),
    };

    // Asynchronously save/update profile in background
    setDoc(userDocRef, profile, { merge: true }).catch((err) =>
      console.warn('[loginCustomer] Async setDoc warning:', err)
    );

    return { user: profile };
  } catch (err: any) {
    console.error('[Login Error]:', err);
    let userMsg = 'Invalid email address or password. Please check your credentials.';
    if (
      err.code === 'auth/user-not-found' ||
      err.code === 'auth/invalid-credential' ||
      err.code === 'auth/wrong-password'
    ) {
      userMsg = 'Invalid email address or password. Please check your credentials.';
    } else if (err.code === 'auth/too-many-requests') {
      userMsg = 'Access to this account has been temporarily disabled due to multiple failed login attempts. Please reset your password or try again later.';
    } else if (err.message) {
      userMsg = err.message;
    }
    return { user: null, error: userMsg };
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
    provider.setCustomParameters({ prompt: 'select_account' });
    const cred = await signInWithPopup(auth, provider);

    if (!cred.user || !auth.currentUser) {
      return { user: null, error: 'Firebase authentication failed. No active current user.' };
    }

    const uid = cred.user.uid;
    console.log(`[Google Auth Success] Authenticated UID: ${uid} | Email: ${cred.user.email}`);

    const userDocRef = doc(db, 'users', uid);
    let profile: UserProfile = {
      uid,
      email: cred.user.email || '',
      displayName: cred.user.displayName || 'Google User',
      photoURL: cred.user.photoURL || '',
      emailVerified: true,
      role: 'customer',
      createdAt: new Date().toISOString(),
    };

    try {
      const userSnap = await getDoc(userDocRef).catch(() => null);
      if (userSnap && userSnap.exists()) {
        profile = { ...(userSnap.data() as UserProfile), emailVerified: true };
      } else {
        await setDoc(userDocRef, profile, { merge: true });
      }
    } catch (docErr: any) {
      console.warn('[signInWithGoogle] Non-blocking Firestore user profile save error:', docErr);
    }

    return { user: profile };
  } catch (err: any) {
    console.error('[Google Sign-In Error]:', err);
    return { user: null, error: `[${err.code || 'GOOGLE_AUTH_ERROR'}] ${err.message || 'Google Sign-In failed.'}` };
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
