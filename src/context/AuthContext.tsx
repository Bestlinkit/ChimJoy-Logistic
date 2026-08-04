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
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      setFirebaseUser(fbUser);

      if (!fbUser) {
        setUser(null);
        setIsLoading(false);
        if (pathname.startsWith('/account')) {
          router.push('/auth/login');
        }
        return;
      }

      // Subscribe to customer Firestore profile
      const userRef = doc(db, 'users', fbUser.uid);
      const unsubProfile = onSnapshot(userRef, (snap) => {
        if (snap.exists()) {
          const profileData = snap.data() as UserProfile;
          profileData.emailVerified = fbUser.emailVerified;
          setUser(profileData);
        } else {
          setUser({
            uid: fbUser.uid,
            email: fbUser.email || '',
            displayName: fbUser.displayName || 'Customer',
            emailVerified: fbUser.emailVerified,
            role: 'customer',
            createdAt: new Date().toISOString(),
          });
        }
        setIsLoading(false);
      });

      return () => unsubProfile();
    });

    return () => unsubscribe();
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
