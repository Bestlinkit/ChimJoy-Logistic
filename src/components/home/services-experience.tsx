'use client';

import React from 'react';
import Link from 'next/link';
import { Plane, Car, Clock, Package, ArrowRight, ShieldCheck } from 'lucide-react';
import { GlassCard } from '@/components/ui/glass-card';
import { LuxuryBadge } from '@/components/ui/luxury-badge';

export const ServicesExperience = () => {
  const services = [
    {
      id: 'airport-transfers',
      title: 'Airport VIP Transfer (QOW)',
      category: 'Sam Mbakwe Airport Specialist',
      icon: <Plane className="w-8 h-8 text-[#00509D]" />,
      description: 'Dedicated flight tracking and indoor greeting service at Sam Mbakwe International Cargo Airport QOW. Smooth connection to Owerri, Port Harcourt, and Enugu.',
      link: '/services/airport-transfers',
      badge: 'Flat Rate Available',
      bgGradient: 'from-blue-900/30 to-[#071325]',
    },
    {
      id: 'city-rides',
      title: 'Intercity & Owerri City Rides',
      category: 'Hourly & Point-to-Point',
      icon: <Car className="w-8 h-8 text-[#06D6A0]" />,
      description: 'Point-to-point transfers across New Owerri, Concorde Hotel Boulevard, World Bank Estate, and executive trips to Aba, Port Harcourt, and Onitsha.',
      link: '/services/city-rides',
      badge: 'Flexible Hours',
      bgGradient: 'from-emerald-900/30 to-[#071325]',
    },
    {
      id: 'car-rental',
      title: 'Executive Chauffeur Rental',
      category: 'Daily & Event Hire',
      icon: <Clock className="w-8 h-8 text-[#D4AF37]" />,
      description: 'Full-day executive car hire for VIP corporate meetings, weddings, state summits, and dignitaries with professional uniformed chauffeurs.',
      link: '/services/car-rental',
      badge: 'Most Popular',
      bgGradient: 'from-amber-900/30 to-[#071325]',
    },
    {
      id: 'logistics',
      title: 'Logistics & Haulage Services',
      category: 'Freight & Cargo',
      icon: <Package className="w-8 h-8 text-sky-400" />,
      description: 'Heavy cargo transport, warehouse dispatch, and high-value parcel delivery powered by ChimJoy Logistics Services Ltd.',
      link: '/services/logistics',
      badge: 'Freight Division',
      bgGradient: 'from-sky-900/30 to-[#071325]',
    },
  ];

  return (
    <section className="py-24 bg-[#FAFCFF] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#00509D] bg-[#00509D]/10 px-4 py-1.5 rounded-full">
            Our Core Mobility Services
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-[#071325] tracking-tight">
            Tailored Transportation for <span className="gradient-royal">Every Requirement</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Engineered around luxury, promptness, and safety. Select a dedicated service below to explore rates and availability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service) => (
            <GlassCard
              key={service.id}
              variant="light"
              className="p-8 border border-slate-200 hover:border-[#00509D]/50 space-y-6 flex flex-col justify-between group"
            >
              <div className="flex items-start justify-between">
                <div className="w-16 h-16 rounded-2xl bg-[#071325] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                  {service.icon}
                </div>
                <LuxuryBadge variant="gold">{service.badge}</LuxuryBadge>
              </div>

              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#00509D]">
                  {service.category}
                </span>
                <h3 className="font-display text-2xl font-bold text-[#071325] group-hover:text-[#00509D] transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">{service.description}</p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <Link
                  href={service.link}
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#071325] hover:text-[#00509D] transition-colors"
                >
                  <span>Explore Service Details</span>
                  <ArrowRight className="w-4 h-4 text-[#D4AF37] group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href={`/book?type=${service.id.replace('-transfers', '')}`}>
                  <span className="text-xs font-semibold text-[#06D6A0] bg-[#06D6A0]/10 px-3 py-1.5 rounded-full hover:bg-[#06D6A0] hover:text-slate-950 transition-colors">
                    Instant Book
                  </span>
                </Link>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};
