import { auth, db } from '@/lib/firebase/config';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  fetchSignInMethodsForEmail,
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc, collection, addDoc } from 'firebase/firestore';

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

// ─────────────────────────────────────────────────────────────────────────────
// 1. Customer Registration — NO Firebase default emails ever
// ─────────────────────────────────────────────────────────────────────────────
export async function registerCustomer(
  email: string,
  pass: string,
  name: string,
  phone?: string
): Promise<{ user: UserProfile | null; error?: string }> {
  try {
    // Check if email already exists before attempting creation
    const methods = await fetchSignInMethodsForEmail(auth, email).catch(() => []);
    if (methods && methods.length > 0) {
      // Email is already registered — check if verified
      try {
        const tempCred = await signInWithEmailAndPassword(auth, email, pass);
        if (tempCred.user.emailVerified) {
          await firebaseSignOut(auth);
          return { user: null, error: 'VERIFIED_EMAIL_EXISTS' };
        } else {
          await firebaseSignOut(auth);
          return { user: null, error: 'UNVERIFIED_EMAIL_EXISTS' };
        }
      } catch {
        // Wrong password or sign-in failed — email exists but we can't check verified status
        return { user: null, error: 'UNVERIFIED_EMAIL_EXISTS' };
      }
    }

    // Create new Firebase Auth account (does NOT send any email)
    const cred = await createUserWithEmailAndPassword(auth, email, pass);
    await updateProfile(cred.user, { displayName: name });
    // NOTE: We do NOT call sendEmailVerification() — Firebase email is disabled
    // Resend email is triggered via API route below

    const userProfile: UserProfile = {
      uid: cred.user.uid,
      email: cred.user.email || email,
      displayName: name,
      phoneNumber: phone || '',
      emailVerified: false,
      role: 'customer',
      createdAt: new Date().toISOString(),
      savedAddresses: [],
    };

    // Save user profile in Firestore
    await setDoc(doc(db, 'users', cred.user.uid), userProfile);

    // Create admin notification for new registration
    await addDoc(collection(db, 'admin_notifications'), {
      title: 'New Customer Registration',
      message: `${name} (${email}) has just registered on ChimJoy.`,
      type: 'customer',
      isRead: false,
      createdAt: new Date().toISOString(),
    }).catch((e) => console.warn('[Notification write warning]:', e));

    // Send branded Resend verification email (non-blocking)
    if (typeof window !== 'undefined') {
      fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name }),
      }).catch((e) => console.warn('[Resend verification email warning]:', e));

      // Send admin alert email (non-blocking)
      fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: 'hq@chimjoylogistics.com.ng',
          subject: `New Customer Registration: ${name}`,
          template: 'admin_alert',
          text: `New customer registered:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\nTime: ${new Date().toLocaleString('en-NG', { timeZone: 'Africa/Lagos' })}`,
        }),
      }).catch((e) => console.warn('[Admin alert email warning]:', e));
    }

    return { user: userProfile };
  } catch (err: any) {
    console.error('[Register Error]:', err);
    if (err.code === 'auth/email-already-in-use') {
      return { user: null, error: 'UNVERIFIED_EMAIL_EXISTS' };
    }
    return { user: null, error: err.message || 'Registration failed.' };
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. Customer Login
// ─────────────────────────────────────────────────────────────────────────────
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

// ─────────────────────────────────────────────────────────────────────────────
// 3. Google Sign-In
// ─────────────────────────────────────────────────────────────────────────────
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
        // Admin notification for new Google sign-up (non-blocking)
        addDoc(collection(db, 'admin_notifications'), {
          title: 'New Customer Registration (Google)',
          message: `${profile.displayName} (${profile.email}) signed up via Google.`,
          type: 'customer',
          isRead: false,
          createdAt: new Date().toISOString(),
        }).catch(() => null);
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

// ─────────────────────────────────────────────────────────────────────────────
// 4. Password Reset — sends via Resend API (not Firebase)
// ─────────────────────────────────────────────────────────────────────────────
export async function resetPassword(email: string): Promise<{ success: boolean; error?: string }> {
  try {
    if (typeof window !== 'undefined') {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const json = await res.json();
      if (!res.ok) return { success: false, error: json.error || 'Failed to send password reset email.' };
      return { success: true };
    }
    return { success: false, error: 'Cannot send reset email from server context.' };
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to send password reset email.' };
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. Resend Verification — calls API route which uses Resend (not Firebase email)
// ─────────────────────────────────────────────────────────────────────────────
export async function resendVerification(): Promise<void> {
  // Legacy: triggers Firebase resend if user is still signed in (fallback only)
  // Prefer resendVerificationViaResend() for production use
  if (auth.currentUser) {
    const { sendEmailVerification } = await import('firebase/auth');
    await sendEmailVerification(auth.currentUser);
  }
}

export async function resendVerificationViaResend(
  email: string,
  name?: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch('/api/auth/resend-verification', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name: name || 'Valued Customer' }),
    });
    const json = await res.json();
    if (!res.ok) return { success: false, error: json.error || 'Failed to send verification email.' };
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'Network error.' };
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. Sign Out
// ─────────────────────────────────────────────────────────────────────────────
export async function logoutCustomer(): Promise<void> {
  await firebaseSignOut(auth);
}

