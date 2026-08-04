'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '@/lib/firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import { AdminUser, AdminRole } from '@/types/admin';
import { logoutAdmin } from '@/lib/firebase/services/admin-auth-service';

interface AdminAuthContextType {
  adminUser: AdminUser | null;
  role: AdminRole | null;
  isLoading: boolean;
  logout: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextType>({
  adminUser: null,
  role: null,
  isLoading: true,
  logout: async () => {},
});

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setAdminUser(null);
        setIsLoading(false);
        if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
          router.push('/admin/login');
        }
        return;
      }

      try {
        const adminDocRef = doc(db, 'admins', firebaseUser.uid);
        const adminSnap = await getDoc(adminDocRef);

        if (adminSnap.exists()) {
          const data = adminSnap.data() as AdminUser;
          setAdminUser(data);
        } else {
          // Check fallback for super admin email bootstrap
          const userEmail = firebaseUser.email || '';
          if (userEmail.toLowerCase().includes('admin') || userEmail.toLowerCase().includes('ayodele') || userEmail.toLowerCase().includes('chimjoy')) {
            const fallbackAdmin: AdminUser = {
              uid: firebaseUser.uid,
              email: userEmail,
              name: firebaseUser.displayName || 'Executive Administrator',
              role: 'Super Admin',
              status: 'Active',
              createdAt: new Date().toISOString(),
            };
            setAdminUser(fallbackAdmin);
          } else {
            setAdminUser(null);
            if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
              router.push('/admin/login');
            }
          }
        }
      } catch (err) {
        console.error('[AdminAuthContext Error]:', err);
        setAdminUser(null);
      } finally {
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, [pathname, router]);

  const handleLogout = async () => {
    await logoutAdmin();
    setAdminUser(null);
    router.push('/admin/login');
  };

  return (
    <AdminAuthContext.Provider
      value={{
        adminUser,
        role: adminUser ? adminUser.role : null,
        isLoading,
        logout: handleLogout,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => useContext(AdminAuthContext);
