'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Laptop, CheckCircle2, Key, AlertTriangle } from 'lucide-react';
import { LuxuryButton } from '@/components/ui/luxury-button';
import { useAuth } from '@/context/AuthContext';

export default function SecurityPage() {
  const { user } = useAuth();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword]         = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [twoFactor, setTwoFactor]             = useState(false);
  const [isSaved, setIsSaved]                 = useState(false);

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('New passwords do not match.');
      return;
    }
    setIsSaved(true);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#0B192C]/10 shadow-sm space-y-2">
        <span className="text-xs font-black uppercase tracking-widest text-[#003366] bg-[#003366]/10 px-4 py-1.5 rounded-full border border-[#003366]/15">
          SECURITY & PRIVACY
        </span>
        <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-[#0E1726]">
          Security & Authentication Settings
        </h1>
        <p className="text-xs sm:text-sm text-[#475569] font-medium">
          Manage password changes, two-factor authentication, connected services, and active login sessions.
        </p>
      </div>

      {/* Password Change Form Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#0B192C]/10 shadow-sm space-y-6">
        <h3 className="font-display font-black text-lg text-[#0E1726]">Change Password</h3>

        <form onSubmit={handlePasswordChange} className="space-y-5">
          <div className="relative group">
            <label className="absolute -top-2.5 left-4 bg-white px-1 text-[10px] font-black uppercase tracking-widest text-[#003366] z-10">
              Current Password
            </label>
            <input
              type="password"
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full border-2 border-[#0B192C]/20 focus:border-[#9BC800] rounded-2xl px-4 py-4 text-sm font-medium text-[#0E1726] focus:outline-none transition-all duration-200 bg-white shadow-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="relative group">
              <label className="absolute -top-2.5 left-4 bg-white px-1 text-[10px] font-black uppercase tracking-widest text-[#003366] z-10">
                New Password
              </label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full border-2 border-[#0B192C]/20 focus:border-[#9BC800] rounded-2xl px-4 py-4 text-sm font-medium text-[#0E1726] focus:outline-none transition-all duration-200 bg-white shadow-sm"
              />
            </div>

            <div className="relative group">
              <label className="absolute -top-2.5 left-4 bg-white px-1 text-[10px] font-black uppercase tracking-widest text-[#003366] z-10">
                Confirm New Password
              </label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full border-2 border-[#0B192C]/20 focus:border-[#9BC800] rounded-2xl px-4 py-4 text-sm font-medium text-[#0E1726] focus:outline-none transition-all duration-200 bg-white shadow-sm"
              />
            </div>
          </div>

          <div className="pt-2 flex items-center gap-4">
            <LuxuryButton type="submit" variant="lemon" size="lg" icon={<Lock className="w-4 h-4" />}>
              Update Password
            </LuxuryButton>
            {isSaved && (
              <span className="text-xs font-bold text-[#9BC800] flex items-center gap-1 bg-[#0B192C] px-3 py-1.5 rounded-full">
                <CheckCircle2 className="w-4 h-4" /> Password Changed!
              </span>
            )}
          </div>
        </form>
      </div>

      {/* Connected Accounts & 2FA */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Google OAuth Connected Status */}
        <div className="bg-white rounded-3xl p-6 border border-[#0B192C]/10 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            <div>
              <h3 className="font-display font-black text-base text-[#0E1726]">Google Account</h3>
              <p className="text-xs text-[#475569] font-medium">Connected as {user?.email}</p>
            </div>
          </div>
          <span className="text-[10px] font-black uppercase bg-[#9BC800]/20 text-[#0B192C] px-3 py-1 rounded-full inline-block">
            Connected for 1-Click Login
          </span>
        </div>

        {/* Two Factor Authentication (2FA) */}
        <div className="bg-white rounded-3xl p-6 border border-[#0B192C]/10 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-black text-base text-[#0E1726]">Email OTP 2FA</h3>
              <input
                type="checkbox"
                checked={twoFactor}
                onChange={(e) => setTwoFactor(e.target.checked)}
                className="w-5 h-5 text-[#0B192C] focus:ring-[#9BC800] rounded"
              />
            </div>
            <p className="text-xs text-[#475569] font-medium leading-relaxed">
              Require a 6-digit email OTP verification code whenever logging in from a new device.
            </p>
          </div>
          <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full inline-block w-fit ${
            twoFactor ? 'bg-[#9BC800] text-[#0B192C]' : 'bg-slate-100 text-slate-600'
          }`}>
            {twoFactor ? '2FA Protection Active' : '2FA Protection Optional'}
          </span>
        </div>

      </div>

      {/* Active Sessions */}
      <div className="bg-[#0B192C] text-white rounded-3xl p-6 sm:p-8 border border-white/10 shadow-lg space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/15 pb-4">
          <div>
            <h3 className="font-display font-black text-lg text-white">Active Login Sessions</h3>
            <p className="text-xs text-slate-300 font-medium">Devices currently authorized for your account</p>
          </div>
          <button
            onClick={() => alert('Logged out from all other active sessions.')}
            className="px-4 py-2 bg-red-600/80 hover:bg-red-600 text-white rounded-full text-xs font-bold transition-colors cursor-pointer"
          >
            Logout All Other Devices
          </button>
        </div>

        <div className="space-y-3 text-xs">
          <div className="p-4 bg-white/10 rounded-2xl border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Laptop className="w-5 h-5 text-[#9BC800]" />
              <div>
                <div className="font-black text-white">Windows PC — Chrome Browser</div>
                <div className="text-[11px] text-slate-300">Owerri, Imo State, Nigeria (Current Device)</div>
              </div>
            </div>
            <span className="text-[10px] font-black bg-[#9BC800] text-[#0B192C] px-2.5 py-0.5 rounded-full">Active Now</span>
          </div>
        </div>
      </div>

    </div>
  );
}
