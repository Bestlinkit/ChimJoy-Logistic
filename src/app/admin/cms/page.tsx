'use client';

import React, { useState } from 'react';
import { Layout, MessageSquare, HelpCircle, Building, Globe, Check, Save } from 'lucide-react';
import { GlassCard } from '@/components/ui/glass-card';
import { LuxuryButton } from '@/components/ui/luxury-button';
import { LuxuryBadge } from '@/components/ui/luxury-badge';

export default function AdminCmsPage() {
  const [activeTab, setActiveTab] = useState<'hero' | 'faqs' | 'partners' | 'seo'>('hero');
  const [isSaved, setIsSaved] = useState(false);

  // Editable Form States
  const [heroTitle, setHeroTitle] = useState('Redefining Executive Mobility & Luxury Transport');
  const [heroSubtitle, setHeroSubtitle] = useState('Seamless airport transfers at Sam Mbakwe International Cargo Airport (QOW) and intercity VIP luxury hire.');
  const [metaTitle, setMetaTitle] = useState('ChimJoy Car Hire | Premier Mobility & Airport Transfers in Owerri, Nigeria');

  const handleSaveCMS = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-extrabold">CMS Content Management System</h2>
          <p className="text-xs text-slate-400">Edit homepage slides, FAQs, partner logos, and SEO metadata without code changes.</p>
        </div>

        {/* CMS Section Tabs */}
        <div className="flex items-center gap-2 bg-white/5 p-1 rounded-xl border border-white/10 text-xs">
          {[
            { id: 'hero', label: 'Hero Slides', icon: <Layout className="w-3.5 h-3.5" /> },
            { id: 'faqs', label: 'FAQs & Terms', icon: <HelpCircle className="w-3.5 h-3.5" /> },
            { id: 'partners', label: 'Partner Logos', icon: <Building className="w-3.5 h-3.5" /> },
            { id: 'seo', label: 'SEO & Meta', icon: <Globe className="w-3.5 h-3.5" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all ${
                activeTab === tab.id ? 'bg-[#D4AF37] text-slate-950 shadow-gold' : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <GlassCard variant="dark" className="p-8 border border-white/15 space-y-6">
        <form onSubmit={handleSaveCMS} className="space-y-6">
          {activeTab === 'hero' && (
            <div className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold uppercase tracking-wider text-slate-300">Homepage Main Heading</label>
                <input
                  type="text"
                  value={heroTitle}
                  onChange={(e) => setHeroTitle(e.target.value)}
                  className="w-full p-3.5 bg-white/10 border border-white/15 rounded-xl text-white font-medium focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold uppercase tracking-wider text-slate-300">Hero Subtitle Paragraph</label>
                <textarea
                  rows={3}
                  value={heroSubtitle}
                  onChange={(e) => setHeroSubtitle(e.target.value)}
                  className="w-full p-3.5 bg-white/10 border border-white/15 rounded-xl text-white font-medium focus:outline-none"
                />
              </div>
            </div>
          )}

          {activeTab === 'seo' && (
            <div className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold uppercase tracking-wider text-slate-300">Global Website Meta Title</label>
                <input
                  type="text"
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  className="w-full p-3.5 bg-white/10 border border-white/15 rounded-xl text-white font-medium focus:outline-none"
                />
              </div>
            </div>
          )}

          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            {isSaved ? (
              <span className="text-xs font-bold text-[#06D6A0] flex items-center gap-1.5">
                <Check className="w-4 h-4" /> Content Published to Live Site
              </span>
            ) : <div />}

            <LuxuryButton variant="gold" size="md" icon={<Save className="w-4 h-4" />}>
              Publish Changes to CMS
            </LuxuryButton>
          </div>
        </form>
      </GlassCard>
    </div>
  );
}
