'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertCircle, RefreshCw, ArrowLeft } from 'lucide-react';
import { LuxuryButton } from '@/components/ui/luxury-button';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen bg-white text-[#0E1726] flex items-center justify-center pt-28 pb-20">
      <div className="max-w-lg w-full px-4 text-center">
        <div className="bg-[#F4F6F9] rounded-3xl p-8 sm:p-10 border border-[#0B192C]/10 space-y-6 shadow-lg">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-100 border border-red-200 text-xs font-black text-red-700 uppercase tracking-wider">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>SYSTEM NOTICE</span>
          </div>

          <h1 className="font-display text-3xl font-black text-[#0B192C]">Temporary Interruption</h1>

          <p className="text-xs sm:text-sm text-[#475569] font-medium leading-relaxed max-w-sm mx-auto">
            Our operational system encountered a minor interruption. Your request data remains safe.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => reset()}
              className="w-full sm:w-auto"
            >
              <LuxuryButton variant="lemon" size="lg" className="w-full justify-center" icon={<RefreshCw className="w-4 h-4" />}>
                Try Again
              </LuxuryButton>
            </button>
            <Link href="/" className="w-full sm:w-auto">
              <LuxuryButton variant="navy" size="lg" className="w-full justify-center" icon={<ArrowLeft className="w-4 h-4" />}>
                Return Home
              </LuxuryButton>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
