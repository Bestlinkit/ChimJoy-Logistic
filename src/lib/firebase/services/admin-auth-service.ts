import { db, auth } from '../config';
import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  onSnapshot,
} from 'firebase/firestore';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { AdminRole, AdminUser } from '@/types/admin';

export async function loginAdmin(email: string, pass: string): Promise<{ user: AdminUser | null; error?: string }> {
  try {
    const cred = await signInWithEmailAndPassword(auth, email, pass);
    const uid = cred.user.uid;

    const adminData: AdminUser = {
      uid,
      email: cred.user.email || email,
      name: cred.user.displayName || 'ChimJoy Executive Operations',
      role: 'Super Admin',
      status: 'Active',
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
      ipAddress: '127.0.0.1',
    };

    // Asynchronously bootstrap/sync Firestore documents in background without delaying login response
    const adminDocRef = doc(db, 'admins', uid);
    const adminUserDocRef = doc(db, 'admin_users', uid);
    setDoc(adminDocRef, adminData, { merge: true }).catch(() => {});
    setDoc(adminUserDocRef, adminData, { merge: true }).catch(() => {});

    return { user: adminData };
  } catch (err: any) {
    console.error('[Admin Login Error]:', err);
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

export async function logoutAdmin(): Promise<void> {
  await signOut(auth);
}

export function subscribeToCurrentAdmin(uid: string, callback: (user: AdminUser | null) => void) {
  const adminDocRef = doc(db, 'admins', uid);
  return onSnapshot(
    adminDocRef,
    (snap) => {
      if (snap.exists()) {
        callback(snap.data() as AdminUser);
      } else {
        callback(null);
      }
    },
    (err) => {
      console.error('[subscribeToCurrentAdmin Error]:', err);
      callback(null);
    }
  );
}
