'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, MapPin } from 'lucide-react';
import { LuxuryButton } from '@/components/ui/luxury-button';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white text-[#0E1726] flex items-center justify-center pt-28 pb-20">
      <div className="max-w-lg w-full px-4 text-center">
        <div className="bg-[#F4F6F9] rounded-3xl p-8 sm:p-10 border border-[#0B192C]/10 space-y-6 shadow-lg">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#003366]/10 border border-[#003366]/15 text-xs font-black text-[#003366] uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5 text-[#9BC800]" />
            <span>404 — ROUTE UNCHARTED</span>
          </div>

          <h1 className="font-display text-6xl sm:text-7xl font-black text-[#0B192C]">404</h1>

          <div className="space-y-2">
            <h2 className="font-display text-2xl font-extrabold text-[#0E1726]">Destination Not Found</h2>
            <p className="text-xs sm:text-sm text-[#475569] font-medium leading-relaxed max-w-sm mx-auto">
              The page or route you requested does not exist on the ChimJoy mobility platform.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/" className="w-full sm:w-auto">
              <LuxuryButton variant="lemon" size="lg" className="w-full justify-center" icon={<ArrowLeft className="w-4 h-4" />}>
                Return to Homepage
              </LuxuryButton>
            </Link>
            <Link href="/book/ride" className="w-full sm:w-auto">
              <LuxuryButton variant="navy" size="lg" className="w-full justify-center">
                Book a Ride
              </LuxuryButton>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
