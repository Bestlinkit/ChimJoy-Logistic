'use client';

import React, { useState, useEffect } from 'react';
import { app, auth, db } from '@/lib/firebase/config';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { Server, Database, Key, UserCheck, CheckCircle2, AlertTriangle, RefreshCw } from 'lucide-react';

export default function FirebaseSystemHealthPage() {
  const [fbUser, setFbUser] = useState<FirebaseUser | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [firestoreStatus, setFirestoreStatus] = useState<'pending' | 'success' | 'error'>('pending');
  const [firestoreError, setFirestoreError] = useState<string | null>(null);
  const [adminDocStatus, setAdminDocStatus] = useState<'pending' | 'found' | 'missing' | 'error'>('pending');
  const [adminDocDetails, setAdminDocDetails] = useState<any>(null);
  const [adminDocError, setAdminDocError] = useState<string | null>(null);
  const [isTesting, setIsTesting] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setFbUser(user);
      setAuthLoading(false);
      if (user) {
        runDiagnostics(user);
      } else {
        runDiagnostics(null);
      }
    });
    return () => unsub();
  }, []);

  const runDiagnostics = async (user: FirebaseUser | null) => {
    setIsTesting(true);
    setFirestoreStatus('pending');
    setFirestoreError(null);
    setAdminDocStatus('pending');
    setAdminDocError(null);

    // 1. Test Firestore Read/Write Ping
    try {
      const pingRef = doc(db, 'system_health', user ? user.uid : 'anonymous_test');
      await setDoc(pingRef, { timestamp: new Date().toISOString(), status: 'OK' });
      await getDoc(pingRef);
      await deleteDoc(pingRef);
      setFirestoreStatus('success');
    } catch (err: any) {
      console.error('[System Diagnostic] Firestore Ping Error:', err);
      setFirestoreStatus('error');
      setFirestoreError(`[${err.code || 'UNKNOWN'}] ${err.message}`);
    }

    // 2. Test Admin Document Lookup
    if (user) {
      try {
        const adminRef = doc(db, 'admins', user.uid);
        const adminUserRef = doc(db, 'admin_users', user.uid);

        const [adminSnap, adminUserSnap] = await Promise.all([
          getDoc(adminRef),
          getDoc(adminUserRef),
        ]);

        if (adminSnap.exists() || adminUserSnap.exists()) {
          setAdminDocStatus('found');
          setAdminDocDetails({
            adminsDoc: adminSnap.exists() ? adminSnap.data() : null,
            adminUsersDoc: adminUserSnap.exists() ? adminUserSnap.data() : null,
          });
        } else {
          setAdminDocStatus('missing');
        }
      } catch (err: any) {
        console.error('[System Diagnostic] Admin Doc Error:', err);
        setAdminDocStatus('error');
        setAdminDocError(`[${err.code || 'UNKNOWN'}] ${err.message}`);
      }
    } else {
      setAdminDocStatus('missing');
    }

    setIsTesting(false);
  };

  const projectConfig = app.options;

  return (
    <div className="space-y-6 max-w-5xl mx-auto p-4 sm:p-6 text-white">
      {/* Header */}
      <div className="bg-[#0B192C] p-6 sm:p-8 rounded-3xl border border-white/15 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#9BC800]/15 text-[#9BC800] text-[10px] font-black uppercase tracking-wider mb-2">
            <Server className="w-3.5 h-3.5" />
            <span>ENTERPRISE SYSTEM DIAGNOSTICS</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-black">Firebase Production Health</h1>
          <p className="text-xs text-slate-300 font-medium">
            Live diagnostic console for Firebase App, Authentication, Firestore, and Security Rules.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={async () => {
              setIsTesting(true);
              try {
                const INITIAL_VEHICLES = [
                  {
                    id: 'vehicle_prado_txl',
                    name: 'Toyota Land Cruiser Prado TX-L',
                    categoryName: 'SUVs',
                    categoryId: 'cat-suv',
                    image: '/images/suv_prado_1.jpg',
                    coverImage: '/images/suv_prado_1.jpg',
                    gallery: ['/images/suv_prado_1.jpg', '/images/fleet_prado_black.jpg'],
                    pricePerDay: 120000,
                    passengers: 7,
                    luggage: 5,
                    transmission: 'Automatic',
                    fuelType: 'Petrol',
                    features: ['Chauffeur Included', 'Air Conditioning', 'Leather Seats', 'Bulletproof Tint'],
                    description: 'Executive armored & luxury Prado SUV for high-profile transport in South-East Nigeria.',
                    isAvailable: true,
                    createdAt: new Date().toISOString(),
                  },
                  {
                    id: 'vehicle_sclass_550',
                    name: 'Mercedes-Benz S-Class S550',
                    categoryName: 'Luxury Vehicles',
                    categoryId: 'cat-luxury',
                    image: '/images/fleet_mercedes_sclass.jpg',
                    coverImage: '/images/fleet_mercedes_sclass.jpg',
                    gallery: ['/images/fleet_mercedes_sclass.jpg'],
                    pricePerDay: 250000,
                    passengers: 4,
                    luggage: 3,
                    transmission: 'Automatic',
                    fuelType: 'Petrol',
                    features: ['VIP Chauffeur', 'Massage Seats', 'Ambient Lighting', 'Soft Close Doors'],
                    description: 'Ultra-luxury flagship sedan for corporate dignitaries, weddings, and executive airport transfers.',
                    isAvailable: true,
                    createdAt: new Date().toISOString(),
                  },
                  {
                    id: 'vehicle_hiace_bus',
                    name: 'Toyota HiAce Executive Coaster Mini Bus',
                    categoryName: 'Mini Bus / HiAce',
                    categoryId: 'cat-bus',
                    image: '/images/fleet_hiace_bus.jpg',
                    coverImage: '/images/fleet_hiace_bus.jpg',
                    gallery: ['/images/fleet_hiace_bus.jpg'],
                    pricePerDay: 95000,
                    passengers: 15,
                    luggage: 12,
                    transmission: 'Manual',
                    fuelType: 'Diesel',
                    features: ['Group Travel', 'Dual AC Units', 'Reclining Seats', 'High Ceiling'],
                    description: 'Premium 15-seater executive mini bus for group transport, delegational travel, and event shuttles.',
                    isAvailable: true,
                    createdAt: new Date().toISOString(),
                  },
                  {
                    id: 'vehicle_hilux_truck',
                    name: 'Toyota Hilux Double Cab 4x4',
                    categoryName: 'Logistics Vans',
                    categoryId: 'cat-truck',
                    image: '/images/fleet_hilux_pickup.jpg',
                    coverImage: '/images/fleet_hilux_pickup.jpg',
                    gallery: ['/images/fleet_hilux_pickup.jpg'],
                    pricePerDay: 80000,
                    passengers: 5,
                    luggage: 8,
                    transmission: 'Automatic',
                    fuelType: 'Diesel',
                    features: ['All-Terrain 4x4', 'Heavy Duty Load Canopy', 'Escort Ready'],
                    description: 'Rugged 4x4 double cab for heavy cargo dispatch, field operations, and security logistics.',
                    isAvailable: true,
                    createdAt: new Date().toISOString(),
                  },
                ];

                const INITIAL_DRIVERS = [
                  {
                    id: 'driver_chinedu',
                    name: 'Chinedu Okeke',
                    phone: '+234 807 788 0262',
                    email: 'chinedu@chimjoylogistics.com.ng',
                    licenseNumber: 'IMO-884920-CH',
                    licenseExpiry: '2028-12-31',
                    status: 'Available',
                    rating: 4.9,
                    completedTripsCount: 142,
                    employmentStatus: 'Full Time',
                    emergencyContact: '+234 803 123 4567',
                    createdAt: new Date().toISOString(),
                  },
                  {
                    id: 'driver_emeka',
                    name: 'Emeka Nwosu',
                    phone: '+234 802 345 6789',
                    email: 'emeka@chimjoylogistics.com.ng',
                    licenseNumber: 'IMO-773910-EM',
                    licenseExpiry: '2027-09-30',
                    status: 'Available',
                    rating: 5.0,
                    completedTripsCount: 98,
                    employmentStatus: 'Full Time',
                    emergencyContact: '+234 805 987 6543',
                    createdAt: new Date().toISOString(),
                  },
                ];

                for (const v of INITIAL_VEHICLES) {
                  await setDoc(doc(db, 'vehicles', v.id), v);
                }

                for (const d of INITIAL_DRIVERS) {
                  await setDoc(doc(db, 'drivers', d.id), d);
                }

                if (fbUser) {
                  await setDoc(
                    doc(db, 'admins', fbUser.uid),
                    {
                      uid: fbUser.uid,
                      email: fbUser.email || '',
                      name: fbUser.displayName || 'ChimJoy Administrator',
                      role: 'Super Admin',
                      status: 'Active',
                      createdAt: new Date().toISOString(),
                    },
                    { merge: true }
                  );
                }

                alert('✓ Successfully populated Cloud Firestore database with Vehicles, Drivers, and Admin Records! Refresh your Firebase Console now.');
                runDiagnostics(fbUser);
              } catch (err: any) {
                console.error('[Seed Error]:', err);
                alert(`Seed Error: ${err.message}`);
              } finally {
                setIsTesting(false);
              }
            }}
            disabled={isTesting}
            className="px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black uppercase tracking-wider transition-all shadow-md cursor-pointer disabled:opacity-50"
          >
            Seed Database Now
          </button>

          <button
            onClick={() => runDiagnostics(fbUser)}
            disabled={isTesting}
            className="px-4 py-3 rounded-xl bg-[#9BC800] hover:bg-[#8ab300] text-[#0B192C] text-xs font-black uppercase tracking-wider transition-all shadow-lemon flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isTesting ? 'animate-spin' : ''}`} />
            <span>Diagnostics</span>
          </button>
        </div>
      </div>

      {/* Grid of Diagnostic Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* 1. Firebase App & Environment Status */}
        <div className="bg-[#081322] p-6 rounded-3xl border border-white/10 space-y-4 shadow-md">
          <div className="flex items-center gap-3 border-b border-white/10 pb-3">
            <Server className="w-5 h-5 text-[#9BC800]" />
            <h3 className="font-display text-base font-extrabold">1. Firebase App & Environment</h3>
          </div>
          <div className="space-y-2 text-xs font-mono">
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-slate-400">Firebase App Name:</span>
              <span className="font-bold text-emerald-400">{app.name}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-slate-400">Project ID:</span>
              <span className="font-bold text-emerald-400">{projectConfig.projectId || 'Not set'}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-slate-400">Auth Domain:</span>
              <span className="font-bold text-emerald-400">{projectConfig.authDomain || 'Not set'}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-400">Storage Bucket:</span>
              <span className="font-bold text-slate-300">{projectConfig.storageBucket || 'Not set'}</span>
            </div>
          </div>
        </div>

        {/* 2. Auth State Diagnostic */}
        <div className="bg-[#081322] p-6 rounded-3xl border border-white/10 space-y-4 shadow-md">
          <div className="flex items-center gap-3 border-b border-white/10 pb-3">
            <UserCheck className="w-5 h-5 text-[#9BC800]" />
            <h3 className="font-display text-base font-extrabold">2. Authentication State</h3>
          </div>
          {authLoading ? (
            <div className="text-xs text-slate-400 font-medium py-4">Checking Auth State...</div>
          ) : fbUser ? (
            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">Auth Status:</span>
                <span className="font-bold text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Authenticated
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">Email:</span>
                <span className="font-bold text-white">{fbUser.email}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">UID:</span>
                <span className="font-bold text-slate-300 truncate max-w-[200px]">{fbUser.uid}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Email Verified:</span>
                <span className={`font-bold ${fbUser.emailVerified ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {fbUser.emailVerified ? 'Yes' : 'No'}
                </span>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-200 text-xs space-y-1">
              <span className="font-black block">Unauthenticated</span>
              <span>No user is currently signed into Firebase Auth. Sign in to run full admin diagnostics.</span>
            </div>
          )}
        </div>

        {/* 3. Firestore Read/Write Ping Test */}
        <div className="bg-[#081322] p-6 rounded-3xl border border-white/10 space-y-4 shadow-md">
          <div className="flex items-center gap-3 border-b border-white/10 pb-3">
            <Database className="w-5 h-5 text-[#9BC800]" />
            <h3 className="font-display text-base font-extrabold">3. Firestore Realtime Connection</h3>
          </div>
          {firestoreStatus === 'pending' ? (
            <div className="text-xs text-slate-400 font-medium py-4">Testing Firestore Ping...</div>
          ) : firestoreStatus === 'success' ? (
            <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-200 text-xs flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-black text-emerald-300 block mb-0.5">Firestore Online & Connected</span>
                <span>Successfully performed test document write, read, and delete on database <strong>{projectConfig.projectId}</strong>.</span>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-black text-red-300 block mb-0.5">Firestore Connection Error</span>
                <span className="font-mono">{firestoreError}</span>
              </div>
            </div>
          )}
        </div>

        {/* 4. Admin Security Document Diagnostic */}
        <div className="bg-[#081322] p-6 rounded-3xl border border-white/10 space-y-4 shadow-md">
          <div className="flex items-center gap-3 border-b border-white/10 pb-3">
            <Key className="w-5 h-5 text-[#9BC800]" />
            <h3 className="font-display text-base font-extrabold">4. Admin Document Verification</h3>
          </div>
          {adminDocStatus === 'pending' ? (
            <div className="text-xs text-slate-400 font-medium py-4">Checking Admin Documents...</div>
          ) : adminDocStatus === 'found' ? (
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-200 text-xs flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-black text-emerald-300 block mb-0.5">Admin Record Found</span>
                  <span>Administrator profile verified in Firestore.</span>
                </div>
              </div>
              <pre className="p-3 bg-black/40 rounded-xl text-[11px] font-mono text-slate-300 overflow-x-auto max-h-32">
                {JSON.stringify(adminDocDetails, null, 2)}
              </pre>
            </div>
          ) : adminDocStatus === 'missing' ? (
            <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-200 text-xs space-y-1">
              <span className="font-black block">No Admin Document Found</span>
              <span>No document exists in <code>admins/{'{uid}'}</code> or <code>admin_users/{'{uid}'}</code> for current user. Logging in via /admin/login will automatically bootstrap this record.</span>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-black text-red-300 block mb-0.5">Admin Security Read Error</span>
                <span className="font-mono">{adminDocError}</span>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
