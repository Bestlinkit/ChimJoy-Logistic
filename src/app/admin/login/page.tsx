'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Lock, Mail, ShieldAlert, KeyRound, ArrowRight } from 'lucide-react';
import { loginAdmin } from '@/lib/firebase/services/admin-auth-service';
import { logAdminAction } from '@/lib/firebase/services/admin-audit-service';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsSubmitting(true);

    const res = await loginAdmin(email, password);
    setIsSubmitting(false);

    if (res.error || !res.user) {
      setErrorMsg(res.error || 'Authentication failed. Unauthorized administrator credentials.');
      return;
    }

    // Log login activity
    await logAdminAction(res.user.email, res.user.role, 'ADMIN_LOGIN', 'Authentication', `Admin logged in successfully from /admin/login`);

    // Redirect to Admin Dashboard
    router.push('/admin');
  };

  return (
    <main className="min-h-screen bg-[#07101E] text-white flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#9BC800_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-[#0B192C] rounded-3xl border border-white/15 shadow-2xl overflow-hidden"
        >
          {/* Top Brand Banner */}
          <div className="bg-[#081322] px-8 py-8 text-center border-b border-white/10 relative">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#9BC800]/15 border border-[#9BC800]/30 text-[10px] font-black text-[#9BC800] uppercase tracking-wider mb-3">
              <span className="w-2 h-2 rounded-full bg-[#9BC800] animate-pulse" />
              <span>PRIVATE ENTERPRISE SYSTEM</span>
            </div>
            <img
              src="/images/logo.png"
              alt="ChimJoy Logistics Administration"
              className="h-12 w-auto object-contain mx-auto filter drop-shadow-md"
            />
            <h1 className="font-display text-lg font-black text-white mt-3">
              Internal Administration System
            </h1>
            <p className="text-xs text-slate-400 font-medium">
              ChimJoy Car Hire & Operational Control Center
            </p>
          </div>

          {/* Login Form */}
          <div className="p-8 space-y-6">
            {errorMsg && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-3 bg-red-950/60 border border-red-500/40 p-4 rounded-2xl text-red-200 text-xs font-semibold"
              >
                <ShieldAlert className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-black text-red-300 block mb-0.5">Authentication Failed</span>
                  <span>{errorMsg}</span>
                </div>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Address */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-black uppercase tracking-wider text-slate-300 block">
                  Administrator Email
                </label>
                <div className="flex items-center gap-3 bg-[#081322] border border-white/15 rounded-xl px-4 py-3 focus-within:border-[#9BC800] transition-colors">
                  <Mail className="w-4 h-4 text-[#9BC800] shrink-0" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your administrator email"
                    className="w-full bg-transparent font-medium text-white text-xs focus:outline-none placeholder:text-slate-500"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-black uppercase tracking-wider text-slate-300 block">
                  Password
                </label>
                <div className="flex items-center gap-3 bg-[#081322] border border-white/15 rounded-xl px-4 py-3 focus-within:border-[#9BC800] transition-colors">
                  <Lock className="w-4 h-4 text-[#9BC800] shrink-0" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-transparent font-medium text-white text-xs focus:outline-none placeholder:text-slate-500"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#9BC800] hover:bg-[#8ab300] text-[#0B192C] font-black text-xs uppercase tracking-wider transition-all shadow-lemon flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Authenticating System...</span>
                  ) : (
                    <>
                      <span>Sign In to Admin System</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="pt-4 border-t border-white/10 text-center text-[10px] text-slate-500 font-bold uppercase tracking-wider">
              Restricted Access • Authorized ChimJoy Personnel Only
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
