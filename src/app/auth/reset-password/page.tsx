'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Lock, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { LuxuryButton } from '@/components/ui/luxury-button';

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Password strength logic
  const getStrength = (pass: string) => {
    if (!pass) return { score: 0, label: 'None', color: 'bg-slate-200' };
    let score = 0;
    if (pass.length >= 8) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    if (score <= 1) return { score: 25, label: 'Weak', color: 'bg-red-500' };
    if (score === 2) return { score: 50, label: 'Fair', color: 'bg-yellow-500' };
    if (score === 3) return { score: 75, label: 'Good', color: 'bg-blue-500' };
    return { score: 100, label: 'Strong', color: 'bg-[#9BC800]' };
  };

  const strength = getStrength(password);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      setTimeout(() => {
        router.push('/auth/login');
      }, 1500);
    }, 800);
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
          <div className="space-y-2 text-center">
            <span className="text-xs font-black uppercase tracking-widest text-[#003366] bg-[#003366]/10 px-4 py-1 rounded-full">
              SECURITY RESET
            </span>
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-[#0E1726]">
              Set New Password
            </h1>
            <p className="text-xs sm:text-sm text-[#475569] font-medium leading-relaxed">
              Create a new strong password for your ChimJoy account.
            </p>
          </div>

          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* New Password */}
              <div className="relative group">
                <label className="absolute -top-2.5 left-4 bg-white px-1 text-[10px] font-black uppercase tracking-widest text-[#003366] z-10">
                  New Password
                </label>
                <div className="flex items-center gap-3 border-2 border-[#0B192C]/20 group-focus-within:border-[#9BC800] rounded-2xl px-4 py-4 transition-all duration-200 bg-white shadow-sm">
                  <Lock className="w-5 h-5 text-[#9BC800] shrink-0" />
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

              {/* Password Strength Meter */}
              {password && (
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase text-[#475569]">
                    <span>Password Strength:</span>
                    <span className="text-[#0B192C]">{strength.label}</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full ${strength.color} transition-all duration-300`} style={{ width: `${strength.score}%` }} />
                  </div>
                </div>
              )}

              {/* Confirm Password */}
              <div className="relative group">
                <label className="absolute -top-2.5 left-4 bg-white px-1 text-[10px] font-black uppercase tracking-widest text-[#003366] z-10">
                  Confirm New Password
                </label>
                <div className="flex items-center gap-3 border-2 border-[#0B192C]/20 group-focus-within:border-[#9BC800] rounded-2xl px-4 py-4 transition-all duration-200 bg-white shadow-sm">
                  <Lock className="w-5 h-5 text-[#003366] shrink-0" />
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

              <LuxuryButton
                type="submit"
                variant="lemon"
                size="xl"
                disabled={isLoading}
                icon={<ArrowRight className="w-5 h-5" />}
                className="w-full justify-center"
              >
                {isLoading ? 'Updating Password...' : 'Reset Password'}
              </LuxuryButton>
            </form>
          ) : (
            <div className="space-y-4 text-center py-2">
              <CheckCircle2 className="w-12 h-12 text-[#9BC800] mx-auto animate-bounce" />
              <h3 className="font-display font-black text-xl text-[#0E1726]">Password Updated!</h3>
              <p className="text-xs text-[#475569] font-medium leading-relaxed">
                Your password has been changed successfully. Redirecting to sign in...
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </main>
  );
}
