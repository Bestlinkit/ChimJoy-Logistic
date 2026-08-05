'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Search, Car, Calendar, MapPin, Users, HelpCircle, X, ArrowRight } from 'lucide-react';
import { ModalDrawer } from '@/components/ui/modal-drawer';
import { MOCK_VEHICLES, MOCK_BOOKINGS, MOCK_FAQS } from '@/lib/mock-data';

export const CommandSearch = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');

  if (pathname?.startsWith('/admin')) return null;

  // Keyboard shortcut listener (Cmd/Ctrl + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filteredVehicles = MOCK_VEHICLES.filter((v) =>
    v.name.toLowerCase().includes(query.toLowerCase()) || (v.categoryName || '').toLowerCase().includes(query.toLowerCase())
  );

  const filteredBookings = MOCK_BOOKINGS.filter((b) =>
    b.referenceCode.toLowerCase().includes(query.toLowerCase()) || b.customerName.toLowerCase().includes(query.toLowerCase())
  );

  const filteredFaqs = MOCK_FAQS.filter((f) =>
    f.question.toLowerCase().includes(query.toLowerCase()) || f.answer.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      {/* Modal Dialog */}
      <ModalDrawer isOpen={isOpen} onClose={() => setIsOpen(false)} maxWidth="xl" title="Global Ecosystem Search">
        <div className="space-y-4 text-[#071325]">
          {/* Search Input Field */}
          <div className="flex items-center gap-3 bg-slate-100 p-3.5 rounded-2xl border border-slate-300">
            <Search className="w-5 h-5 text-[#00509D]" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search vehicles, booking refs, FAQs, locations..."
              className="w-full bg-transparent text-sm font-semibold focus:outline-none placeholder-slate-400"
            />
            {query && (
              <button onClick={() => setQuery('')} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Results Area */}
          <div className="max-h-[380px] overflow-y-auto space-y-6 pt-2">
            {/* Fleet Section */}
            {filteredVehicles.length > 0 && (
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Fleet Vehicles ({filteredVehicles.length})</span>
                <div className="space-y-1.5">
                  {filteredVehicles.map((v) => (
                    <div
                      key={v.id}
                      onClick={() => {
                        setIsOpen(false);
                        router.push(`/fleet/${v.id}`);
                      }}
                      className="p-3 rounded-xl bg-slate-50 hover:bg-[#00509D]/10 border border-slate-200 cursor-pointer flex items-center justify-between transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Car className="w-4 h-4 text-[#00509D]" />
                        <div>
                          <h4 className="font-bold text-xs text-slate-900">{v.name}</h4>
                          <span className="text-[10px] text-slate-500">{v.categoryName}</span>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Bookings Section */}
            {filteredBookings.length > 0 && (
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Booking Requests ({filteredBookings.length})</span>
                <div className="space-y-1.5">
                  {filteredBookings.map((b) => (
                    <div
                      key={b.id}
                      onClick={() => {
                        setIsOpen(false);
                        router.push('/admin');
                      }}
                      className="p-3 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200 cursor-pointer flex items-center justify-between transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Calendar className="w-4 h-4 text-[#06D6A0]" />
                        <div>
                          <h4 className="font-bold text-xs text-slate-900">{b.referenceCode} - {b.customerName}</h4>
                          <span className="text-[10px] text-slate-500">{b.pickupLocation} ➔ {b.dropoffLocation}</span>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* FAQs Section */}
            {filteredFaqs.length > 0 && (
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Help & Knowledge Base ({filteredFaqs.length})</span>
                <div className="space-y-1.5">
                  {filteredFaqs.map((f) => (
                    <div key={f.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                      <h4 className="font-bold text-slate-900">{f.question}</h4>
                      <p className="text-slate-500 text-[11px] mt-0.5 line-clamp-1">{f.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </ModalDrawer>
    </>
  );
};
