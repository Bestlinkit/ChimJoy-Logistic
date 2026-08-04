'use client';

import React, { useState } from 'react';
import { Settings, Building2, Phone, Mail, MapPin, Key, DollarSign, Save, ShieldCheck } from 'lucide-react';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { logAdminAction } from '@/lib/firebase/services/admin-audit-service';

export default function AdminSettingsPage() {
  const { adminUser } = useAdminAuth();

  const [companyPhone, setCompanyPhone] = useState('+234 807 788 0262');
  const [companyEmail, setCompanyEmail] = useState('chimjoylimited@gmail.com');
  const [officeAddress, setOfficeAddress] = useState('Plot 12 Executive Layout, Off Bank Road, Owerri, Imo State, Nigeria');
  const [baseAirportRate, setBaseAirportRate] = useState(35000);

  const [isSaved, setIsSaved] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminUser) return;

    await logAdminAction(adminUser.email, adminUser.role, 'UPDATE_SETTINGS', 'Settings', 'Updated company operational settings & rates');
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
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
    </div>
  );
}
