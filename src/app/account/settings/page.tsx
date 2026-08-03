'use client';

import React, { useState } from 'react';
import { User, Phone, Mail, Lock, ShieldCheck, Check } from 'lucide-react';
import { GlassCard } from '@/components/ui/glass-card';
import { LuxuryButton } from '@/components/ui/luxury-button';

export default function AccountSettingsPage() {
  const [name, setName] = useState('Chief Emeka Okonkwo');
  const [phone, setPhone] = useState('+234 803 123 4567');
  const [email, setEmail] = useState('emeka.okonkwo@capitalgroup.ng');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h2 className="font-display text-2xl font-extrabold">Profile & Security Settings</h2>
        <p className="text-xs text-slate-400">Update contact phone number for instant WhatsApp concierge notifications.</p>
      </div>

      <GlassCard variant="dark" className="p-8 border border-white/15 space-y-6">
        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div className="space-y-1">
            <label className="font-bold uppercase tracking-wider text-slate-300">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3.5 bg-white/10 border border-white/15 rounded-xl text-white focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold uppercase tracking-wider text-slate-300">Phone / WhatsApp Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-3.5 bg-white/10 border border-white/15 rounded-xl text-white focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold uppercase tracking-wider text-slate-300">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3.5 bg-white/10 border border-white/15 rounded-xl text-white focus:outline-none"
            />
          </div>

          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            {isSaved ? (
              <span className="text-xs font-bold text-[#06D6A0] flex items-center gap-1.5">
                <Check className="w-4 h-4" /> Profile Updated Successfully
              </span>
            ) : <div />}

            <LuxuryButton variant="gold" size="md">
              Save Account Changes
            </LuxuryButton>
          </div>
        </form>
      </GlassCard>
    </div>
  );
}
