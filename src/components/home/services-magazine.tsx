'use client';

import React from 'react';
import Link from 'next/link';
import { Plane, Car, Clock, Package, ArrowRight } from 'lucide-react';
import { LuxuryButton } from '@/components/ui/luxury-button';

export const ServicesMagazine = () => {
  const blocks = [
    {
      id: 'airport-transfers',
      title: 'Sam Mbakwe Airport Transfers (QOW)',
      subtitle: 'VIP Arrival Reception & Flight Delay Guarantee',
      description: 'Dedicated flight tracking and terminal greeting at Sam Mbakwe International Cargo Airport QOW. Smooth connections to Owerri, Port Harcourt, Enugu, and Aba.',
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80',
      link: '/services/airport-transfers',
      badge: 'Sam Mbakwe Specialist',
    },
    {
      id: 'car-rental',
      title: 'Executive Chauffeur Rental',
      subtitle: 'Full-Day VIP Hire & Event Delegations',
      description: 'First-class luxury vehicles accompanied by certified uniformed chauffeurs for corporate summits, state visits, weddings, and executive delegations.',
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80',
      link: '/services/car-rental',
      badge: 'Chauffeur Driven',
    },
  ];

  return (
    <section className="py-32 bg-[#FFFFFF] text-[#121212] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C1121F] bg-[#C1121F]/10 px-4 py-1.5 rounded-full">
            Core Service Offerings
          </span>
          <h2 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-[#121212]">
            Tailored Mobility <span className="text-[#C1121F]">Solutions</span>
          </h2>
        </div>

        {/* Alternating Split Blocks */}
        {blocks.map((block, index) => {
          const isEven = index % 2 === 0;
          return (
            <div key={block.id} className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              {/* Image Left or Right based on index */}
              <div className={`lg:col-span-6 ${isEven ? 'order-1' : 'order-1 lg:order-2'}`}>
                <div className="relative h-[480px] w-full rounded-[40px] overflow-hidden shadow-editorial border border-black/5 bg-[#111111]">
                  <img src={block.image} alt={block.title} className="w-full h-full object-cover" />
                  <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md text-[#121212] text-xs font-bold px-4 py-1.5 rounded-full">
                    {block.badge}
                  </div>
                </div>
              </div>

              {/* Text Left or Right */}
              <div className={`lg:col-span-6 space-y-6 ${isEven ? 'order-2' : 'order-2 lg:order-1'}`}>
                <span className="text-xs font-bold uppercase tracking-widest text-[#D4A017]">
                  {block.subtitle}
                </span>
                <h3 className="font-display text-3xl sm:text-5xl font-extrabold text-[#121212] leading-[1.1]">
                  {block.title}
                </h3>
                <p className="text-[#6B7280] text-lg sm:text-[20px] font-normal leading-relaxed">
                  {block.description}
                </p>

                <div className="pt-4">
                  <Link href={block.link}>
                    <LuxuryButton variant="crimson" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
                      Explore Service Details
                    </LuxuryButton>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
