'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowRight, RefreshCw, CheckCircle2, Laptop } from 'lucide-react';
import { LuxuryButton } from '@/components/ui/luxury-button';
import { verifyOtpCode } from '@/lib/services/auth-service';

function VerifyLoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || 'chinedu.okonkwo@company.ng';

  const [otp, setOtp] = useState<string[]>(['8', '8', '4', '9', '2', '0']);
  const [timeLeft, setTimeLeft] = useState<number>(300); // 5 minutes
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleChange = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join('');
    if (code.length < 6) {
      alert('Please enter the complete 6-digit code.');
      return;
    }
    setIsVerifying(true);
    const isValid = await verifyOtpCode(code);
    setIsVerifying(false);

    if (isValid) {
      setIsSuccess(true);
      setTimeout(() => {
        router.push('/account');
      }, 1000);
    } else {
      alert('Invalid code. Please try 884920.');
    }
  };

  return (
    <main className="min-h-screen bg-[#0B192C] text-white flex items-center justify-center p-4 pt-24 pb-16">
      <div className="max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white text-[#0E1726] rounded-3xl p-8 sm:p-10 shadow-2xl border border-white/10 space-y-6 text-center"
        >
          <div className="w-16 h-16 rounded-full bg-[#003366]/10 text-[#003366] flex items-center justify-center mx-auto">
            <Laptop className="w-8 h-8 text-[#9BC800]" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-[#003366] bg-[#003366]/10 px-4 py-1 rounded-full">
              NEW DEVICE LOG IN VERIFICATION
            </span>
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-[#0E1726]">
              Security Verification
            </h1>
            <p className="text-xs sm:text-sm text-[#475569] font-medium leading-relaxed">
              We detected a sign-in attempt for <strong className="text-[#0B192C]">{email}</strong>. Please enter the 6-digit OTP code sent to your email.
            </p>
          </div>

          {!isSuccess ? (
            <form onSubmit={handleVerify} className="space-y-6">
              <div className="flex items-center justify-center gap-2 sm:gap-3 my-4">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={(el) => { inputRefs.current[idx] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(idx, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(idx, e)}
                    className="w-10 h-14 sm:w-12 sm:h-14 text-center font-display text-2xl font-black text-[#0B192C] bg-[#F4F6F9] border-2 border-[#0B192C]/20 focus:border-[#9BC800] rounded-2xl focus:outline-none transition-all shadow-sm"
                  />
                ))}
              </div>

              <div className="text-xs font-bold text-[#475569] flex items-center justify-center gap-2">
                <span>Code expires in:</span>
                <span className="bg-[#0B192C] text-[#9BC800] px-2.5 py-1 rounded-full font-mono font-black text-xs">
                  {formatTime(timeLeft)}
                </span>
              </div>

              <div className="space-y-3 pt-2">
                <LuxuryButton
                  type="submit"
                  variant="lemon"
                  size="xl"
                  disabled={isVerifying}
                  icon={<ArrowRight className="w-5 h-5" />}
                  className="w-full justify-center"
                >
                  {isVerifying ? 'Authenticating...' : 'Authorize Login'}
                </LuxuryButton>
              </div>
            </form>
          ) : (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="space-y-3 py-4 text-center"
            >
              <CheckCircle2 className="w-12 h-12 text-[#9BC800] mx-auto animate-bounce" />
              <h3 className="font-display font-black text-xl text-[#0E1726]">Login Authorized!</h3>
              <p className="text-xs text-[#475569] font-medium">Opening customer dashboard...</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </main>
  );
}

export default function VerifyLoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0B192C] flex items-center justify-center text-white font-bold">Loading...</div>}>
      <VerifyLoginContent />
    </Suspense>
  );
}
