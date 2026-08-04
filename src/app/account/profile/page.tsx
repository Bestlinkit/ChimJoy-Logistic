'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Shield, CheckCircle2, Save } from 'lucide-react';
import { LuxuryButton } from '@/components/ui/luxury-button';
import { useAuth } from '@/context/AuthContext';
import { updateUserProfile } from '@/lib/services/auth-service';

export default function ProfilePage() {
  const { user } = useAuth();
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phoneNumber || '');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || '');
      setEmail(user.email || '');
      setPhone(user.phoneNumber || '');
    }
  }, [user]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.uid) return;
    await updateUserProfile(user.uid, {
      displayName,
      phoneNumber: phone,
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#0B192C]/10 shadow-sm space-y-2">
        <span className="text-xs font-black uppercase tracking-widest text-[#003366] bg-[#003366]/10 px-4 py-1.5 rounded-full border border-[#003366]/15">
          CLIENT PROFILE
        </span>
        <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-[#0E1726]">
          Profile Settings
        </h1>
        <p className="text-xs sm:text-sm text-[#475569] font-medium">
          Manage your personal profile information and contact details.
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#0B192C]/10 shadow-sm space-y-6">
        <div className="flex items-center gap-6 p-4 bg-[#F4F6F9] rounded-2xl border border-[#0B192C]/10">
          <div className="w-16 h-16 rounded-2xl bg-[#0B192C] text-[#9BC800] flex items-center justify-center font-display font-black text-2xl border-2 border-[#9BC800]">
            {displayName ? displayName.charAt(0) : 'C'}
          </div>
          <div className="space-y-1">
            <h3 className="font-display font-black text-lg text-[#0E1726]">{displayName || 'Valued Client'}</h3>
            <div className="flex items-center gap-2 text-xs font-bold text-[#003366]">
              <CheckCircle2 className="w-4 h-4 text-[#9BC800]" /> Verified Client Profile
            </div>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-black uppercase tracking-wider text-[#003366]">
              Full Name
            </label>
            <input
              type="text"
              required
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full border-2 border-[#0B192C]/20 focus:border-[#9BC800] rounded-2xl px-4 py-3.5 text-sm font-medium text-[#0E1726] focus:outline-none transition-all duration-200 bg-white shadow-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-black uppercase tracking-wider text-[#003366]">
                Email Address
              </label>
              <input
                type="email"
                disabled
                value={email}
                className="w-full border-2 border-slate-200 rounded-2xl px-4 py-3.5 text-sm font-medium text-slate-500 bg-slate-100"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-black uppercase tracking-wider text-[#003366]">
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+234 800 000 0000"
                className="w-full border-2 border-[#0B192C]/20 focus:border-[#9BC800] rounded-2xl px-4 py-3.5 text-sm font-medium text-[#0E1726] focus:outline-none transition-all duration-200 bg-white shadow-sm"
              />
            </div>
          </div>

          <div className="pt-3 flex items-center gap-4">
            <LuxuryButton type="submit" variant="lemon" size="lg" icon={<Save className="w-4 h-4" />}>
              Save Profile Changes
            </LuxuryButton>
            {isSaved && (
              <span className="text-xs font-bold text-[#9BC800] flex items-center gap-1 bg-[#0B192C] px-3 py-1.5 rounded-full">
                <CheckCircle2 className="w-4 h-4" /> Saved to Firestore!
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
