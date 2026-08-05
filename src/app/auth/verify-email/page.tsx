'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowRight, RefreshCw, CheckCircle2 } from 'lucide-react';
import { LuxuryButton } from '@/components/ui/luxury-button';
import { auth } from '@/lib/firebase/config';
import { sendEmailVerification } from 'firebase/auth';

function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailParam = searchParams.get('email');

  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isSending, setIsSending] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      if (user && user.emailVerified) {
        router.push('/account');
      }
    });
    return () => unsub();
  }, [router]);

  const handleResend = async () => {
    if (!currentUser && auth.currentUser) {
      setCurrentUser(auth.currentUser);
    }
    const targetUser = currentUser || auth.currentUser;
    if (!targetUser) {
      setMessage('No active account session found. Please sign in first.');
      return;
    }
    setIsSending(true);
    setMessage(null);
    try {
      await sendEmailVerification(targetUser);
      setMessage('Official verification link sent to your email inbox! Please check your email.');
    } catch (err: any) {
      console.error('[Resend Verification Error]:', err);
      setMessage(err.message || 'Failed to send verification email. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  const handleRefreshStatus = async () => {
    setIsChecking(true);
    setMessage(null);
    try {
      if (auth.currentUser) {
        await auth.currentUser.reload();
        if (auth.currentUser.emailVerified) {
          setMessage('Email verified successfully! Redirecting...');
          setTimeout(() => router.push('/account'), 1000);
        } else {
          setMessage('Email not verified yet. Please check your inbox and click the link.');
        }
      } else {
        setMessage('Please sign in to verify your status.');
      }
    } catch (err: any) {
      console.error('[Refresh Error]:', err);
    } finally {
      setIsChecking(false);
    }
  };

  const emailDisplay = currentUser?.email || emailParam || 'your registered email';

  return (
    <main className="min-h-screen bg-[#0B192C] text-white flex items-center justify-center p-4 pt-24 pb-16">
      <div className="max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white text-[#0E1726] rounded-3xl p-8 sm:p-10 shadow-2xl border border-white/10 space-y-6 text-center"
        >
          {/* Icon */}
          <div className="w-16 h-16 rounded-full bg-[#003366]/10 text-[#003366] flex items-center justify-center mx-auto">
            <ShieldCheck className="w-10 h-10 text-[#9BC800]" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-[#003366] bg-[#003366]/10 px-4 py-1 rounded-full">
              OFFICIAL FIREBASE EMAIL VERIFICATION
            </span>
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-[#0E1726]">
              Verify Your Email Address
            </h1>
            <p className="text-xs sm:text-sm text-[#475569] font-medium leading-relaxed">
              An official verification link has been sent to:<br />
              <strong className="text-[#0B192C] font-black">{emailDisplay}</strong>
            </p>
          </div>

          {message && (
            <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-200 text-xs font-bold text-[#003366]">
              {message}
            </div>
          )}

          <div className="space-y-3 pt-2">
            <LuxuryButton
              type="button"
              variant="lemon"
              size="xl"
              disabled={isChecking}
              onClick={handleRefreshStatus}
              icon={<ArrowRight className="w-5 h-5" />}
              className="w-full justify-center"
            >
              {isChecking ? 'Checking Status...' : 'I Have Verified — Continue'}
            </LuxuryButton>

            <button
              type="button"
              disabled={isSending}
              onClick={handleResend}
              className="inline-flex items-center justify-center gap-2 w-full text-xs font-extrabold text-[#003366] hover:text-[#9BC800] py-2 transition-colors cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSending ? 'animate-spin' : ''}`} />
              <span>{isSending ? 'Sending Verification Link...' : 'Resend Verification Email'}</span>
            </button>
          </div>

          <div className="border-t border-[#0B192C]/10 pt-4 text-xs text-[#475569]">
            Wrong email address?{' '}
            <Link href="/auth/register" className="font-bold text-[#003366] hover:underline">
              Change Email / Re-register
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0B192C] flex items-center justify-center text-white font-bold">Loading...</div>}>
      <VerifyEmailContent />
    </Suspense>
  );
}
