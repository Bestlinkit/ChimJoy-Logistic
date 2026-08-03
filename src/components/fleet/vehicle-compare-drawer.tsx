'use client';

import React from 'react';
import Link from 'next/link';
import { X, Check, Users, Briefcase, ShieldCheck, ArrowRight } from 'lucide-react';
import { Vehicle } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { LuxuryButton } from '@/components/ui/luxury-button';
import { ModalDrawer } from '@/components/ui/modal-drawer';

interface VehicleCompareDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedVehicles?: Vehicle[];
  vehicles?: Vehicle[];
  onRemoveVehicle: (id: string) => void;
}

export const VehicleCompareDrawer: React.FC<VehicleCompareDrawerProps> = ({
  isOpen,
  onClose,
  selectedVehicles,
  vehicles,
  onRemoveVehicle,
}) => {
  const list = selectedVehicles || vehicles || [];
  if (list.length === 0) return null;

  return (
    <ModalDrawer isOpen={isOpen} onClose={onClose} maxWidth="2xl" title="Side-by-Side Fleet Comparison">
      <div className="space-y-6 text-[#071325]">
        <p className="text-xs text-slate-500">Compare rates, capacities, and specs across selected vehicles.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 overflow-x-auto pb-4">
          {list.map((v) => (
            <div key={v.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-4 relative flex flex-col justify-between">
              <button
                onClick={() => onRemoveVehicle(v.id)}
                className="absolute top-2 right-2 p-1 bg-slate-200 rounded-full text-slate-500 hover:text-red-500"
              >
                <X className="w-3.5 h-3.5" />
              </button>

              <div className="space-y-2">
                <img src={v.image} alt={v.name} className="w-full h-28 object-cover rounded-xl" />
                <span className="text-[10px] font-bold uppercase text-[#00509D] block">{v.categoryName}</span>
                <h4 className="font-display font-bold text-sm text-slate-900 leading-snug">{v.name}</h4>
              </div>

              <div className="space-y-2 py-3 border-y border-slate-200 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Daily Rate:</span>
                  <span className="font-bold text-[#00509D]">{formatCurrency(v.pricePerDay)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Passengers:</span>
                  <span className="font-bold text-slate-700">{v.passengers} Seats</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Luggage:</span>
                  <span className="font-bold text-slate-700">{v.luggage} Bags</span>
                </div>
              </div>

              <Link href={`/book?vehicle=${v.id}`} onClick={onClose}>
                <LuxuryButton variant="lemon" size="sm" className="w-full justify-center">
                  Book This Vehicle
                </LuxuryButton>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </ModalDrawer>
  );
};
