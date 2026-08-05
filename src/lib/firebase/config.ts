import { initializeApp, getApps, getApp } from "firebase/app";
import { initializeFirestore, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getAnalytics, isSupported, Analytics } from "firebase/analytics";

const getCleanEnv = (val: string | undefined, fallback: string) => {
  if (!val || typeof val !== 'string' || val.trim() === '') return fallback;
  return val.trim();
};

const firebaseConfig = {
  apiKey: getCleanEnv(process.env.NEXT_PUBLIC_FIREBASE_API_KEY, "AIzaSyCV78LWPP4vaiv88V6exq-O-n8mrMJtNeg"),
  authDomain: getCleanEnv(process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN, "chimjoy-logistic.firebaseapp.com"),
  projectId: getCleanEnv(process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID, "chimjoy-logistic"),
  storageBucket: getCleanEnv(process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET, "chimjoy-logistic.firebasestorage.app"),
  messagingSenderId: getCleanEnv(process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID, "714625191786"),
  appId: getCleanEnv(process.env.NEXT_PUBLIC_FIREBASE_APP_ID, "1:714625191786:web:9d811403a4327412c41f13"),
  measurementId: getCleanEnv(process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID, "G-NWH78YE627"),
};

// Validate environment variables
const requiredKeys = ['apiKey', 'authDomain', 'projectId', 'storageBucket', 'messagingSenderId', 'appId'] as const;
for (const key of requiredKeys) {
  if (!firebaseConfig[key]) {
    throw new Error(`[Firebase Config Error] Missing required Firebase configuration key: ${key}`);
  }
}

export const NEXT_PUBLIC_FIREBASE_VAPID_KEY =
  getCleanEnv(process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY, "BJt8sl6DdE3a-bbvEvzIJx7Iiu6dxTOQzsZjO5fFwB9fw7EHRs_pNKark5gxR-WVSHiBPm34jRvzVJb5Fzztuz4");

export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

if (typeof window !== "undefined") {
  console.log(`[Firebase Initialized] Singleton Active | Project ID: ${app.options.projectId || firebaseConfig.projectId} | Auth Domain: ${firebaseConfig.authDomain}`);
}

export let analytics: Analytics | undefined;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}
