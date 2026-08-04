'use client';
import React, { useState } from 'react';
import { auth, db } from '@/lib/firebase/config';
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export default function AuthTest() {
  const [status, setStatus] = useState<string>('');
  const [profile, setProfile] = useState<any>(null);

  const log = (msg: string) => {
    console.log('[AuthTest]', msg);
    setStatus((prev) => prev + msg + '\n');
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      log(`Google login successful: ${user.uid}`);
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, { uid: user.uid, email: user.email, name: user.displayName || 'Guest' }, { merge: true });
      log('User document written');
      const snap = await getDoc(userRef);
      if (snap.exists()) {
        setProfile(snap.data());
        log('User document read successfully');
      } else {
        log('User document not found after write');
      }
    } catch (err: any) {
      console.error('[AuthTest] Google login error', err);
      log(`Error: ${err.code || err.message}`);
    }
  };

  const handleEmailLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      const user = cred.user;
      log(`Email login successful: ${user.uid}`);
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, { uid: user.uid, email: user.email, name: user.displayName || 'Guest' }, { merge: true });
      const snap = await getDoc(userRef);
      if (snap.exists()) {
        setProfile(snap.data());
        log('User profile retrieved');
      } else {
        log('User profile missing after write');
      }
    } catch (err: any) {
      console.error('[AuthTest] Email login error', err);
      log(`Error: ${err.code || err.message}`);
    }
  };

  const handleAdminTest = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        log('No authenticated user for admin test');
        return;
      }
      const adminRef = doc(db, 'admins', user.uid);
      await setDoc(adminRef, { uid: user.uid, email: user.email, name: user.displayName || 'Admin', role: 'Super Admin', status: 'Active' }, { merge: true });
      log('Admin document written');
      const snap = await getDoc(adminRef);
      if (snap.exists()) {
        log('Admin document read');
        console.log('Admin data:', snap.data());
      } else {
        log('Admin document missing after write');
      }
    } catch (err: any) {
      console.error('[AuthTest] Admin test error', err);
      log(`Error: ${err.code || err.message}`);
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <h1>🔧 Firebase Auth & Firestore End‑to‑End Test</h1>
      <button onClick={handleGoogleLogin} style={{ margin: '0.5rem', padding: '0.5rem 1rem' }}>
        Login with Google
      </button>
      <form onSubmit={handleEmailLogin} style={{ margin: '0.5rem 0' }}>
        <input name="email" type="email" placeholder="email@example.com" required style={{ marginRight: '0.5rem' }} />
        <input name="password" type="password" placeholder="password" required style={{ marginRight: '0.5rem' }} />
        <button type="submit" style={{ padding: '0.5rem 1rem' }}>Email / Password Login</button>
      </form>
      <button onClick={handleAdminTest} style={{ margin: '0.5rem', padding: '0.5rem 1rem' }}>
        Write / Read Admin Document
      </button>
      <pre style={{ background: '#f5f5f5', padding: '1rem', marginTop: '1rem', maxHeight: '300px', overflow: 'auto' }}>{status}</pre>
      {profile && (
        <div style={{ marginTop: '1rem', padding: '1rem', background: '#e0ffe0' }}>
          <h2>User Profile</h2>
          <pre>{JSON.stringify(profile, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
