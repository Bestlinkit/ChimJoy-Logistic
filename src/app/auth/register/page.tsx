'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Mail, User, Phone, ArrowRight, AlertTriangle, CheckCircle2, RefreshCw, LogIn } from 'lucide-react';
import { LuxuryButton } from '@/components/ui/luxury-button';
import { registerUser, resendVerificationViaResend } from '@/lib/services/auth-service';

type RegistrationState =
  | 'form'
  | 'success'
  | 'UNVERIFIED_EMAIL_EXISTS'
  | 'VERIFIED_EMAIL_EXISTS';

export default function RegisterPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [registrationState, setRegistrationState] = useState<RegistrationState>('form');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [resendStatus, setResendStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }
    if (!agreeTerms) {
      setErrorMessage('Please agree to the Terms of Service & Privacy Policy.');
      return;
    }

    setIsLoading(true);
    const result = await registerUser({ firstName, lastName, email, phone, password });
    setIsLoading(false);

    if (!result.user && result.error) {
      if (result.error === 'UNVERIFIED_EMAIL_EXISTS') {
        setRegistrationState('UNVERIFIED_EMAIL_EXISTS');
        return;
      }
      if (result.error === 'VERIFIED_EMAIL_EXISTS') {
        setRegistrationState('VERIFIED_EMAIL_EXISTS');
        return;
      }
      setErrorMessage(result.error);
      return;
    }

    // Success — redirect to verify-email page
    setRegistrationState('success');
    router.push(`/auth/verify-email?email=${encodeURIComponent(email)}`);
  };

  const handleResendVerification = async () => {
    setResendStatus('sending');
    const result = await resendVerificationViaResend(
      email,
      `${firstName || ''} ${lastName || ''}`.trim() || 'Valued Customer'
    );
    if (result.success) {
      setResendStatus('sent');
    } else {
      setResendStatus('error');
      setErrorMessage(result.error || 'Failed to send verification email.');
    }
  };

  // ─── State: UNVERIFIED EMAIL EXISTS ─────────────────────────────────────────
  if (registrationState === 'UNVERIFIED_EMAIL_EXISTS') {
    return (
      <main className="min-h-screen bg-[#F4F6F9] text-[#0E1726] flex flex-col justify-center items-center px-4 py-12 sm:py-20">
        <div className="w-full max-w-lg">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-3xl border border-[#0B192C]/10 shadow-xl overflow-hidden"
          >
            <div className="bg-[#0B192C] px-8 py-8 text-center relative overflow-hidden flex flex-col items-center justify-center">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#9BC800_1px,transparent_1px)] [background-size:16px_16px]" />
              <Link href="/" className="relative z-10 inline-block">
                <img src="/images/logo-footer.png" alt="ChimJoy Logistics" className="h-10 sm:h-12 w-auto object-contain mx-auto" />
              </Link>
            </div>

            <div className="p-7 sm:p-9 space-y-5">
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-amber-50 border border-amber-200">
                <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-extrabold text-amber-800">Account Not Yet Verified</p>
                  <p className="text-xs text-amber-700 mt-0.5 font-medium">
                    An account with <strong>{email}</strong> already exists but has not yet been verified.
                  </p>
                </div>
              </div>

              {errorMessage && (
                <p className="text-xs text-red-600 font-bold bg-red-50 p-3 rounded-xl border border-red-200">
                  {errorMessage}
                </p>
              )}

              {resendStatus === 'sent' && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-green-50 border border-green-200">
                  <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                  <p className="text-xs font-bold text-green-700">
                    Verification email resent! Please check your inbox.
                  </p>
                </div>
              )}

              <div className="space-y-3 pt-2">
                <LuxuryButton
                  type="button"
                  variant="lemon"
                  size="lg"
                  disabled={resendStatus === 'sending' || resendStatus === 'sent'}
                  onClick={handleResendVerification}
                  icon={<RefreshCw className={`w-4 h-4 ${resendStatus === 'sending' ? 'animate-spin' : ''}`} />}
                  className="w-full justify-center"
                >
                  {resendStatus === 'sending'
                    ? 'Sending Verification Link...'
                    : resendStatus === 'sent'
                    ? 'Verification Link Sent ✓'
                    : 'Resend Verification Email'}
                </LuxuryButton>

                <button
                  type="button"
                  onClick={() => { setRegistrationState('form'); setErrorMessage(null); }}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-full border border-[#0B192C]/15 bg-white text-xs font-bold text-[#0E1726] hover:bg-[#F8FAFC] transition-all cursor-pointer"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Change Email / Re-register</span>
                </button>

                <Link href="/auth/login" className="block">
                  <button
                    type="button"
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-full border border-[#003366]/20 bg-[#003366]/5 text-xs font-bold text-[#003366] hover:bg-[#003366]/10 transition-all cursor-pointer"
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    <span>Go to Login</span>
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    );
  }

  // ─── State: VERIFIED EMAIL EXISTS ────────────────────────────────────────────
  if (registrationState === 'VERIFIED_EMAIL_EXISTS') {
    return (
      <main className="min-h-screen bg-[#F4F6F9] text-[#0E1726] flex flex-col justify-center items-center px-4 py-12 sm:py-20">
        <div className="w-full max-w-lg">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-3xl border border-[#0B192C]/10 shadow-xl overflow-hidden"
          >
            <div className="bg-[#0B192C] px-8 py-8 text-center relative overflow-hidden flex flex-col items-center justify-center">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#9BC800_1px,transparent_1px)] [background-size:16px_16px]" />
              <Link href="/" className="relative z-10 inline-block">
                <img src="/images/logo-footer.png" alt="ChimJoy Logistics" className="h-10 sm:h-12 w-auto object-contain mx-auto" />
              </Link>
            </div>

            <div className="p-7 sm:p-9 space-y-5 text-center">
              <div className="w-14 h-14 rounded-full bg-[#9BC800]/20 text-[#9BC800] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h2 className="font-display text-xl font-extrabold text-[#0E1726]">
                  Email Already Registered
                </h2>
                <p className="text-sm text-[#475569] font-medium mt-2">
                  <strong>{email}</strong> is already registered and verified. Please sign in to your account.
                </p>
              </div>
              <div className="space-y-3 pt-2">
                <Link href="/auth/login">
                  <LuxuryButton
                    type="button"
                    variant="lemon"
                    size="lg"
                    icon={<LogIn className="w-4 h-4" />}
                    className="w-full justify-center"
                  >
                    Sign In to Your Account
                  </LuxuryButton>
                </Link>
                <button
                  type="button"
                  onClick={() => { setRegistrationState('form'); setEmail(''); setErrorMessage(null); }}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-full border border-[#0B192C]/15 bg-white text-xs font-bold text-[#0E1726] hover:bg-[#F8FAFC] transition-all cursor-pointer"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Use a Different Email</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    );
  }

  // ─── State: REGISTRATION FORM ────────────────────────────────────────────────
  return (
    <main className="min-h-screen bg-[#F4F6F9] text-[#0E1726] flex flex-col justify-center items-center px-4 py-12 sm:py-20">
      <div className="w-full max-w-lg">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-3xl border border-[#0B192C]/10 shadow-xl overflow-hidden"
        >
          {/* Card Top Brand Banner */}
          <div className="bg-[#0B192C] px-8 py-8 text-center relative overflow-hidden flex flex-col items-center justify-center">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#9BC800_1px,transparent_1px)] [background-size:16px_16px]" />
            <Link href="/" className="relative z-10 inline-block">
              <img
                src="/images/logo-footer.png"
                alt="ChimJoy Logistics Services Ltd"
                className="h-10 sm:h-12 w-auto object-contain mx-auto"
              />
            </Link>
          </div>

          {/* Form Content */}
          <div className="p-7 sm:p-9 space-y-6">
            <div className="space-y-1 text-center sm:text-left">
              <h1 className="font-display text-2xl font-extrabold text-[#0E1726]">
                Create Your Account
              </h1>
              <p className="text-xs sm:text-sm text-[#475569] font-medium">
                Enter your details to create your ChimJoy account.
              </p>
            </div>

            {errorMessage && (
              <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-red-50 border border-red-200">
                <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <p className="text-xs font-bold text-red-700">{errorMessage}</p>
              </div>
            )}

            <form onSubmit={handleRegister} className="space-y-4">
              {/* Name row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative group">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#003366] mb-1.5">
                    First Name
                  </label>
                  <div className="flex items-center gap-2.5 border border-[#0B192C]/20 group-focus-within:border-[#9BC800] rounded-xl px-3.5 py-2.5 transition-all duration-200 bg-white shadow-sm">
                    <User className="w-4 h-4 text-[#003366] shrink-0" />
                    <input
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Chinedu"
                      className="w-full text-sm font-medium text-[#0E1726] placeholder-[#475569]/40 focus:outline-none bg-transparent"
                    />
                  </div>
                </div>

                <div className="relative group">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#003366] mb-1.5">
                    Last Name
                  </label>
                  <div className="flex items-center gap-2.5 border border-[#0B192C]/20 group-focus-within:border-[#9BC800] rounded-xl px-3.5 py-2.5 transition-all duration-200 bg-white shadow-sm">
                    <User className="w-4 h-4 text-[#003366] shrink-0" />
                    <input
                      type="text"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Okonkwo"
                      className="w-full text-sm font-medium text-[#0E1726] placeholder-[#475569]/40 focus:outline-none bg-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Email & Phone row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative group">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#003366] mb-1.5">
                    Email Address
                  </label>
                  <div className="flex items-center gap-2.5 border border-[#0B192C]/20 group-focus-within:border-[#9BC800] rounded-xl px-3.5 py-2.5 transition-all duration-200 bg-white shadow-sm">
                    <Mail className="w-4 h-4 text-[#003366] shrink-0" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="chinedu@company.ng"
                      className="w-full text-sm font-medium text-[#0E1726] placeholder-[#475569]/40 focus:outline-none bg-transparent"
                    />
                  </div>
                </div>

                <div className="relative group">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#003366] mb-1.5">
                    Phone / WhatsApp
                  </label>
                  <div className="flex items-center gap-2.5 border border-[#0B192C]/20 group-focus-within:border-[#9BC800] rounded-xl px-3.5 py-2.5 transition-all duration-200 bg-white shadow-sm">
                    <Phone className="w-4 h-4 text-[#003366] shrink-0" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+234 803 000 0000"
                      className="w-full text-sm font-medium text-[#0E1726] placeholder-[#475569]/40 focus:outline-none bg-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Password row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative group">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#003366] mb-1.5">
                    Password
                  </label>
                  <div className="flex items-center gap-2.5 border border-[#0B192C]/20 group-focus-within:border-[#9BC800] rounded-xl px-3.5 py-2.5 transition-all duration-200 bg-white shadow-sm">
                    <Lock className="w-4 h-4 text-[#9BC800] shrink-0" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full text-sm font-medium text-[#0E1726] focus:outline-none bg-transparent"
                    />
                  </div>
                </div>

                <div className="relative group">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#003366] mb-1.5">
                    Confirm Password
                  </label>
                  <div className="flex items-center gap-2.5 border border-[#0B192C]/20 group-focus-within:border-[#9BC800] rounded-xl px-3.5 py-2.5 transition-all duration-200 bg-white shadow-sm">
                    <Lock className="w-4 h-4 text-[#9BC800] shrink-0" />
                    <input
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full text-sm font-medium text-[#0E1726] focus:outline-none bg-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Terms Checkbox */}
              <label className="flex items-center gap-2.5 text-xs font-bold text-[#475569] cursor-pointer select-none pt-1">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="w-4 h-4 rounded border-[#0B192C]/20 text-[#0B192C] focus:ring-[#9BC800]"
                />
                <span>I agree to the <Link href="#" className="text-[#003366] underline font-extrabold">Terms of Service</Link> & <Link href="#" className="text-[#003366] underline font-extrabold">Privacy Policy</Link></span>
              </label>

              {/* Submit Button */}
              <div className="space-y-3 pt-2">
                <LuxuryButton
                  type="submit"
                  variant="lemon"
                  size="lg"
                  disabled={isLoading}
                  icon={<ArrowRight className="w-4 h-4" />}
                  className="w-full justify-center"
                >
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </LuxuryButton>
              </div>
            </form>

            <div className="border-t border-[#0B192C]/10 pt-3 text-center text-xs text-[#475569] font-medium">
              Already have an account?{' '}
              <Link href="/auth/login" className="font-extrabold text-[#003366] hover:text-[#9BC800] transition-colors">
                Sign In
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
