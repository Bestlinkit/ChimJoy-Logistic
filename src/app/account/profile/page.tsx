'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Shield, CheckCircle2, Save, Upload } from 'lucide-react';
import { LuxuryButton } from '@/components/ui/luxury-button';
import { MOCK_USER, updateUserProfile } from '@/lib/services/auth-service';

export default function ProfilePage() {
  const [firstName, setFirstName] = useState(MOCK_USER.firstName);
  const [lastName, setLastName]   = useState(MOCK_USER.lastName);
  const [email, setEmail]         = useState(MOCK_USER.email);
  const [phone, setPhone]         = useState(MOCK_USER.phone);
  const [emergencyName, setEmergencyName]   = useState(MOCK_USER.emergencyContactName || '');
  const [emergencyPhone, setEmergencyPhone] = useState(MOCK_USER.emergencyContactPhone || '');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateUserProfile({
      firstName,
      lastName,
      email,
      phone,
      emergencyContactName: emergencyName,
      emergencyContactPhone: emergencyPhone,
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
          Manage your personal information, emergency contact, and communication details.
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#0B192C]/10 shadow-sm space-y-6">
        {/* Photo avatar banner */}
        <div className="flex items-center gap-6 p-4 bg-[#F4F6F9] rounded-2xl border border-[#0B192C]/10">
          <div className="w-20 h-20 rounded-2xl bg-[#0B192C] text-[#9BC800] flex items-center justify-center font-display font-black text-3xl border-2 border-[#9BC800] overflow-hidden">
            {MOCK_USER.avatar ? (
              <img src={MOCK_USER.avatar} alt={firstName} className="w-full h-full object-cover" />
            ) : (
              firstName[0]
            )}
          </div>
          <div className="space-y-2">
            <h3 className="font-display font-black text-lg text-[#0E1726]">{firstName} {lastName}</h3>
            <div className="flex items-center gap-2 text-xs font-bold text-[#003366]">
              <CheckCircle2 className="w-4 h-4 text-[#9BC800]" /> Email Verified Client
            </div>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="relative group">
              <label className="absolute -top-2.5 left-4 bg-white px-1 text-[10px] font-black uppercase tracking-widest text-[#003366] z-10">
                First Name
              </label>
              <input
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full border-2 border-[#0B192C]/20 focus:border-[#9BC800] rounded-2xl px-4 py-4 text-sm font-medium text-[#0E1726] focus:outline-none transition-all duration-200 bg-white shadow-sm"
              />
            </div>

            <div className="relative group">
              <label className="absolute -top-2.5 left-4 bg-white px-1 text-[10px] font-black uppercase tracking-widest text-[#003366] z-10">
                Last Name
              </label>
              <input
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full border-2 border-[#0B192C]/20 focus:border-[#9BC800] rounded-2xl px-4 py-4 text-sm font-medium text-[#0E1726] focus:outline-none transition-all duration-200 bg-white shadow-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="relative group">
              <label className="absolute -top-2.5 left-4 bg-white px-1 text-[10px] font-black uppercase tracking-widest text-[#003366] z-10">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-2 border-[#0B192C]/20 focus:border-[#9BC800] rounded-2xl px-4 py-4 text-sm font-medium text-[#0E1726] focus:outline-none transition-all duration-200 bg-white shadow-sm"
              />
            </div>

            <div className="relative group">
              <label className="absolute -top-2.5 left-4 bg-white px-1 text-[10px] font-black uppercase tracking-widest text-[#003366] z-10">
                Phone Number
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border-2 border-[#0B192C]/20 focus:border-[#9BC800] rounded-2xl px-4 py-4 text-sm font-medium text-[#0E1726] focus:outline-none transition-all duration-200 bg-white shadow-sm"
              />
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="space-y-4 pt-4 border-t border-[#0B192C]/10">
            <h3 className="font-display font-black text-base text-[#0E1726]">Emergency Contact Information</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="relative group">
                <label className="absolute -top-2.5 left-4 bg-white px-1 text-[10px] font-black uppercase tracking-widest text-[#003366] z-10">
                  Emergency Contact Name
                </label>
                <input
                  type="text"
                  value={emergencyName}
                  onChange={(e) => setEmergencyName(e.target.value)}
                  placeholder="e.g. Dr. Amaka Okonkwo"
                  className="w-full border-2 border-[#0B192C]/20 focus:border-[#9BC800] rounded-2xl px-4 py-4 text-sm font-medium text-[#0E1726] focus:outline-none transition-all duration-200 bg-white shadow-sm"
                />
              </div>

              <div className="relative group">
                <label className="absolute -top-2.5 left-4 bg-white px-1 text-[10px] font-black uppercase tracking-widest text-[#003366] z-10">
                  Emergency Contact Phone
                </label>
                <input
                  type="tel"
                  value={emergencyPhone}
                  onChange={(e) => setEmergencyPhone(e.target.value)}
                  placeholder="+234 802 000 0000"
                  className="w-full border-2 border-[#0B192C]/20 focus:border-[#9BC800] rounded-2xl px-4 py-4 text-sm font-medium text-[#0E1726] focus:outline-none transition-all duration-200 bg-white shadow-sm"
                />
              </div>
            </div>
          </div>

          <div className="pt-2 flex items-center gap-4">
            <LuxuryButton type="submit" variant="lemon" size="lg" icon={<Save className="w-4 h-4" />}>
              Save Profile Changes
            </LuxuryButton>
            {isSaved && (
              <span className="text-xs font-bold text-[#9BC800] flex items-center gap-1 bg-[#0B192C] px-3 py-1.5 rounded-full">
                <CheckCircle2 className="w-4 h-4" /> Profile Updated!
              </span>
            )}
          </div>
        </form>
      </div>

    </div>
  );
}
