'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, ArrowLeft, CheckCircle2, AlertTriangle } from 'lucide-react';
import { LuxuryButton } from '@/components/ui/luxury-button';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setErrorMessage(null);
    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const json = await res.json();
      if (!res.ok) {
        setErrorMessage(json.error || 'Failed to send reset email. Please try again.');
      } else {
        setIsSent(true);
      }
    } catch {
      setErrorMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <main className="min-h-screen bg-[#0B192C] text-white flex items-center justify-center p-4 pt-24 pb-16">
      <div className="max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white text-[#0E1726] rounded-3xl p-8 sm:p-10 shadow-2xl border border-white/10 space-y-6"
        >
          <Link href="/auth/login" className="inline-flex items-center gap-2 text-xs font-bold text-[#475569] hover:text-[#0B192C] transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Sign In
          </Link>

          <div className="space-y-2 text-center">
            <span className="text-xs font-black uppercase tracking-widest text-[#003366] bg-[#003366]/10 px-4 py-1 rounded-full">
              PASSWORD RECOVERY
            </span>
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-[#0E1726]">
              Forgot Password?
            </h1>
            <p className="text-xs sm:text-sm text-[#475569] font-medium leading-relaxed">
              Enter your registered email address and we will send a password reset verification link.
            </p>
          </div>

          {!isSent ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              {errorMessage && (
                <div className="flex items-start gap-2 p-3.5 rounded-2xl bg-red-50 border border-red-200">
                  <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <p className="text-xs font-bold text-red-700">{errorMessage}</p>
                </div>
              )}
              <div className="relative group">
                <label className="absolute -top-2.5 left-4 bg-white px-1 text-[10px] font-black uppercase tracking-widest text-[#003366] z-10">
                  Registered Email Address
                </label>
                <div className="flex items-center gap-3 border-2 border-[#0B192C]/20 group-focus-within:border-[#9BC800] rounded-2xl px-4 py-4 transition-all duration-200 bg-white shadow-sm">
                  <Mail className="w-5 h-5 text-[#003366] shrink-0" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="chinedu@company.ng"
                    className="w-full text-sm font-medium text-[#0E1726] placeholder-[#475569]/50 focus:outline-none bg-transparent"
                  />
                </div>
              </div>

              <LuxuryButton
                type="submit"
                variant="lemon"
                size="xl"
                disabled={isLoading}
                icon={<ArrowRight className="w-5 h-5" />}
                className="w-full justify-center"
              >
                {isLoading ? 'Sending Request...' : 'Send Password Reset Code'}
              </LuxuryButton>
            </form>
          ) : (
            <div className="space-y-4 text-center py-2">
              <CheckCircle2 className="w-12 h-12 text-[#9BC800] mx-auto" />
              <h3 className="font-display font-black text-xl text-[#0E1726]">Recovery Email Sent!</h3>
              <p className="text-xs text-[#475569] font-medium leading-relaxed">
                We have sent password reset instructions to <strong>{email}</strong>.
              </p>
              <Link href={`/auth/reset-password?email=${encodeURIComponent(email)}`}>
                <LuxuryButton variant="navy" size="lg" className="w-full justify-center mt-2">
                  Proceed to Reset Password
                </LuxuryButton>
              </Link>
            </div>
          )}
        </motion.div>
      </div>
    </main>
  );
}
