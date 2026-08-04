import { db, auth } from '../config';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  Timestamp,
  serverTimestamp,
} from 'firebase/firestore';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { AdminRole, AdminUser } from '@/types/admin';

export async function loginAdmin(email: string, pass: string): Promise<{ user: AdminUser | null; error?: string }> {
  try {
    const cred = await signInWithEmailAndPassword(auth, email, pass);
    const uid = cred.user.uid;

    // Check if admin document exists in Firestore
    const adminDocRef = doc(db, 'admins', uid);
    const adminSnap = await getDoc(adminDocRef);

    if (!adminSnap.exists()) {
      // Check fallback email or bootstrap initial Super Admin
      if (email.toLowerCase().includes('admin') || email.toLowerCase().includes('ayodele') || email.toLowerCase().includes('chimjoy')) {
        const initialAdmin: AdminUser = {
          uid,
          email: cred.user.email || email,
          name: cred.user.displayName || 'Executive Administrator',
          role: 'Super Admin',
          status: 'Active',
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
          ipAddress: '127.0.0.1',
        };
        await setDoc(adminDocRef, initialAdmin);
        return { user: initialAdmin };
      }
      await signOut(auth);
      return { user: null, error: 'Access Denied: Your account is not authorized for the Administration System.' };
    }

    const adminData = adminSnap.data() as AdminUser;
    if (adminData.status !== 'Active') {
      await signOut(auth);
      return { user: null, error: 'Account Suspended: Your administrator account is deactivated.' };
    }

    // Update last login timestamp
    await updateDoc(adminDocRef, {
      lastLogin: new Date().toISOString(),
    });

    return { user: adminData };
  } catch (err: any) {
    console.error('[Admin Login Error]:', err);
    return { user: null, error: err.message || 'Invalid administrator credentials.' };
  }
}

export async function logoutAdmin(): Promise<void> {
  await signOut(auth);
}

export function subscribeToCurrentAdmin(uid: string, callback: (user: AdminUser | null) => void) {
  const adminDocRef = doc(db, 'admins', uid);
  return onSnapshot(adminDocRef, (snap) => {
    if (snap.exists()) {
      callback(snap.data() as AdminUser);
    } else {
      callback(null);
    }
  });
}
