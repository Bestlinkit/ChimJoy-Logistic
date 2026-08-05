'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { auth, db } from '@/lib/firebase/config';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { UserProfile, logoutCustomer } from '@/lib/services/auth-service';

interface AuthContextType {
  user: UserProfile | null;
  firebaseUser: FirebaseUser | null;
  isLoading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  firebaseUser: null,
  isLoading: true,
  logout: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    let unsubProfile: (() => void) | undefined;

    const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
      setFirebaseUser(fbUser);

      // Clean up previous profile listener if any
      if (unsubProfile) {
        unsubProfile();
        unsubProfile = undefined;
      }

      if (!fbUser) {
        setUser(null);
        setIsLoading(false);
        if (pathname.startsWith('/account')) {
          router.push('/auth/login');
        }
        return;
      }

      // Subscribe to customer Firestore profile after auth state is confirmed
      const userRef = doc(db, 'users', fbUser.uid);
      unsubProfile = onSnapshot(
        userRef,
        (snap) => {
          if (snap.exists()) {
            const profileData = snap.data() as UserProfile;
            profileData.emailVerified = fbUser.emailVerified;
            setUser(profileData);
          } else {
            setUser({
              uid: fbUser.uid,
              email: fbUser.email || '',
              displayName: fbUser.displayName || 'Valued Customer',
              emailVerified: fbUser.emailVerified,
              role: 'customer',
              createdAt: new Date().toISOString(),
            });
          }
          setIsLoading(false);
        },
        (err) => {
          console.error('[AuthContext] Firestore onSnapshot error:', err);
          setUser(null);
          setIsLoading(false);
        }
      );
    });

    return () => {
      unsubscribe();
      if (unsubProfile) {
        unsubProfile();
      }
    };
  }, [pathname, router]);

  const handleLogout = async () => {
    await logoutCustomer();
    setUser(null);
    setFirebaseUser(null);
    router.push('/');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        firebaseUser,
        isLoading,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
