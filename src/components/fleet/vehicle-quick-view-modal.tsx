'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Users, Briefcase, ShieldCheck, Check, ArrowRight, X, Star, Heart } from 'lucide-react';
import { Vehicle } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { LuxuryButton } from '@/components/ui/luxury-button';
import { LuxuryBadge } from '@/components/ui/luxury-badge';
import { ModalDrawer } from '@/components/ui/modal-drawer';

interface VehicleQuickViewModalProps {
  vehicle: Vehicle | null;
  isOpen: boolean;
  onClose: () => void;
}

export const VehicleQuickViewModal: React.FC<VehicleQuickViewModalProps> = ({
  vehicle,
  isOpen,
  onClose,
}) => {
  const [selectedImage, setSelectedImage] = useState<string>('');

  if (!vehicle) return null;

  const currentImage = selectedImage || vehicle.image;
  const gallery = vehicle.gallery || [vehicle.image];

  return (
    <ModalDrawer isOpen={isOpen} onClose={onClose} maxWidth="2xl" title={vehicle.name} subtitle={vehicle.categoryName}>
      <div className="space-y-6 text-[#071325]">
        {/* Main Image Showcase */}
        <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden bg-slate-950">
          <img src={currentImage} alt={vehicle.name} className="w-full h-full object-cover" />
          <div className="absolute top-4 left-4">
            <LuxuryBadge variant="gold" className="bg-slate-950/80 backdrop-blur-md">
              {vehicle.categoryName}
            </LuxuryBadge>
          </div>
          <div className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur-md text-[#06D6A0] text-xs font-bold px-3 py-1 rounded-full border border-[#06D6A0]/40">
            {vehicle.isAvailable ? 'Available Now' : 'Reserved'}
          </div>
        </div>

        {/* Gallery Thumbnails */}
        {gallery.length > 1 && (
          <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
            {gallery.map((imgUrl, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(imgUrl)}
                className={`w-20 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                  currentImage === imgUrl ? 'border-[#00509D] scale-105 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img src={imgUrl} alt="Thumbnail" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}

        {/* Specs Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
          <div>
            <span className="text-slate-400 font-bold uppercase block text-[10px]">Passengers</span>
            <span className="font-extrabold text-slate-900 text-sm">{vehicle.passengers} Seats</span>
          </div>
          <div>
            <span className="text-slate-400 font-bold uppercase block text-[10px]">Luggage</span>
            <span className="font-extrabold text-slate-900 text-sm">{vehicle.luggage} Bags</span>
          </div>
          <div>
            <span className="text-slate-400 font-bold uppercase block text-[10px]">Transmission</span>
            <span className="font-extrabold text-slate-900 text-sm">{vehicle.transmission}</span>
          </div>
          <div>
            <span className="text-slate-400 font-bold uppercase block text-[10px]">Chauffeur</span>
            <span className="font-extrabold text-[#06D6A0] text-sm">Included</span>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <h4 className="font-display font-bold text-base text-slate-900">Vehicle Description</h4>
          <p className="text-slate-600 text-xs leading-relaxed">{vehicle.description}</p>
        </div>

        {/* Amenities Pills */}
        <div className="space-y-2">
          <h4 className="font-display font-bold text-xs uppercase tracking-wider text-slate-500">Luxury Amenities</h4>
          <div className="flex flex-wrap gap-2">
            {(vehicle.amenities || vehicle.features || []).map((am, idx) => (
              <span key={idx} className="text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1 rounded-lg border border-slate-200">
                ✓ {am}
              </span>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Daily Hire Rate</span>
            <span className="text-2xl font-black text-[#00509D]">{formatCurrency(vehicle.pricePerDay)}</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Link href={`/fleet/${vehicle.id}`} className="flex-1 sm:flex-none">
              <button className="w-full py-3 px-5 border-2 border-slate-300 rounded-2xl font-bold text-xs hover:border-[#00509D] hover:text-[#00509D]">
                Full Showroom Specs
              </button>
            </Link>
            <Link href={`/book?vehicle=${vehicle.id}`} className="flex-1 sm:flex-none">
              <LuxuryButton variant="gold" size="md" className="w-full justify-center" icon={<ArrowRight className="w-4 h-4" />}>
                Book This Ride
              </LuxuryButton>
            </Link>
          </div>
        </div>
      </div>
    </ModalDrawer>
  );
};
