'use client';

import React, { useState } from 'react';
import { Settings, Phone, MessageCircle, MapPin, Key, Check, Save } from 'lucide-react';
import { GlassCard } from '@/components/ui/glass-card';
import { LuxuryButton } from '@/components/ui/luxury-button';

export default function AdminSettingsPage() {
  const [whatsappNo, setWhatsappNo] = useState('2348000000000');
  const [airportFlatRate, setAirportFlatRate] = useState(25000);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h2 className="font-display text-2xl font-extrabold">Operations & Rate Settings</h2>
        <p className="text-xs text-slate-400">Configure base rates, WhatsApp phone dispatch numbers, and API keys.</p>
      </div>

      <GlassCard variant="dark" className="p-8 border border-white/15 space-y-6">
        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div className="space-y-1">
            <label className="font-bold uppercase tracking-wider text-slate-300">Official WhatsApp Dispatch Line</label>
            <div className="flex items-center gap-2 bg-white/10 border border-white/15 rounded-xl p-3.5">
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <input
                type="text"
                value={whatsappNo}
                onChange={(e) => setWhatsappNo(e.target.value)}
                placeholder="2348000000000"
                className="w-full bg-transparent text-white focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-bold uppercase tracking-wider text-slate-300">Sam Mbakwe Airport Default Flat Rate (₦ NGN)</label>
            <input
              type="number"
              value={airportFlatRate}
              onChange={(e) => setAirportFlatRate(Number(e.target.value))}
              className="w-full p-3.5 bg-white/10 border border-white/15 rounded-xl text-white focus:outline-none"
            />
          </div>

          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            {isSaved ? (
              <span className="text-xs font-bold text-[#06D6A0] flex items-center gap-1.5">
                <Check className="w-4 h-4" /> Operations Settings Saved
              </span>
            ) : <div />}

            <LuxuryButton variant="gold" size="md" icon={<Save className="w-4 h-4" />}>
              Save Settings
            </LuxuryButton>
          </div>
        </form>
      </GlassCard>
    </div>
  );
}
