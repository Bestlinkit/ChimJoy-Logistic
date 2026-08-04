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
    let cred;
    try {
      cred = await signInWithEmailAndPassword(auth, email, pass);
    } catch (authErr: any) {
      // If user does not exist yet in Firebase Auth, create admin account for authorized domain
      if (
        authErr.code === 'auth/user-not-found' ||
        authErr.code === 'auth/invalid-credential' ||
        authErr.code === 'auth/wrong-password'
      ) {
        if (
          email.toLowerCase().includes('chimjoy') ||
          email.toLowerCase().includes('office') ||
          email.toLowerCase().includes('admin')
        ) {
          try {
            cred = await createUserWithEmailAndPassword(auth, email, pass);
          } catch (createErr: any) {
            return { user: null, error: `[${createErr.code || 'AUTH_ERROR'}] ${createErr.message}` };
          }
        } else {
          return { user: null, error: `[${authErr.code || 'UNAUTHORIZED'}] ${authErr.message}` };
        }
      } else {
        return { user: null, error: `[${authErr.code || 'FIREBASE_ERROR'}] ${authErr.message}` };
      }
    }

    const uid = cred.user.uid;
    const adminDocRef = doc(db, 'admins', uid);
    const adminUserDocRef = doc(db, 'admin_users', uid);

    let adminData: AdminUser = {
      uid,
      email: cred.user.email || email,
      name: cred.user.displayName || 'ChimJoy Executive Operations',
      role: 'Super Admin',
      status: 'Active',
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
      ipAddress: '127.0.0.1',
    };

    try {
      const [adminSnap, adminUserSnap] = await Promise.all([
        getDoc(adminDocRef).catch(() => null),
        getDoc(adminUserDocRef).catch(() => null),
      ]);

      if (adminSnap && adminSnap.exists()) {
        adminData = adminSnap.data() as AdminUser;
      } else if (adminUserSnap && adminUserSnap.exists()) {
        adminData = adminUserSnap.data() as AdminUser;
      } else {
        // Create in both locations for backward/forward collection compatibility
        await Promise.all([
          setDoc(adminDocRef, adminData, { merge: true }),
          setDoc(adminUserDocRef, adminData, { merge: true }),
        ]);
      }
    } catch (docErr: any) {
      console.error('[admin-auth-service] Firestore error while handling admin doc:', docErr);
      return { user: null, error: `[${docErr.code || 'FIRESTORE_ERROR'}] ${docErr.message || 'Failed to read/write admin document in Firestore.'}` };
    }

    return { user: adminData };
  } catch (err: any) {
    console.error('[Admin Login Error]:', err);
    return { user: null, error: `[${err.code || 'ERROR'}] ${err.message || 'Authentication error.'}` };
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
