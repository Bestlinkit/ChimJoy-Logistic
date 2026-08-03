'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Car } from 'lucide-react';
import { LuxuryButton } from '@/components/ui/luxury-button';

export const CorporateCTABanner = () => {
  return (
    <section className="py-16 bg-[#0F2B5B] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
          <div className="space-y-2 max-w-2xl">
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
              Ready to Travel?
            </h2>
            <p className="text-slate-300 text-base sm:text-lg">
              Whether you're heading to the airport, attending an event or hiring a vehicle for your next trip, ChimJoy is ready to serve you.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 shrink-0">
            <Link href="/book/ride">
              <LuxuryButton variant="lemon" size="xl" icon={<ArrowRight className="w-5 h-5" />}>
                Book a Ride
              </LuxuryButton>
            </Link>

            <Link href="/book/hire">
              <LuxuryButton variant="outline" size="xl" icon={<Car className="w-4 h-4 text-[#C6D92C]" />}>
                Hire a Car
              </LuxuryButton>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
