'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Plane, Car, Truck, ShieldCheck } from 'lucide-react';

export const CorporateServicesDeck = () => {
  const services = [
    {
      title: 'Airport Transfers',
      subtitle: 'Sam Mbakwe Airport VIP Pickup',
      desc: 'Seamless, flight-monitored arrival pickups and departures at Sam Mbakwe International Cargo Airport (QOW).',
      image: '/images/sam_mbakwe_vip_airport_transfer_1785760768280.png',
      icon: <Plane className="w-6 h-6 text-[#9BC800]" />,
      link: '/services/airport-transfers',
    },
    {
      title: 'Executive Rides',
      subtitle: 'Business & VIP Travel',
      desc: 'Chchauffeur-driven luxury sedans and SUVs for corporate delegations, conferences, and special events in Owerri.',
      image: '/images/nigerian_lady_passenger_alone_1785753330902.png',
      icon: <Car className="w-6 h-6 text-[#9BC800]" />,
      link: '/book/ride',
    },
    {
      title: 'Car Hire',
      subtitle: 'Daily & Intercity Rentals',
      desc: 'Flexible daily vehicle rentals with experienced, vetted drivers for local town runs and interstate trips.',
      image: '/images/images (5).jpg',
      icon: <ShieldCheck className="w-6 h-6 text-[#9BC800]" />,
      link: '/book/hire',
    },
    {
      title: 'Logistics Services',
      subtitle: 'Freight & Document Dispatch',
      desc: 'Dependable logistics support, cargo haulage, and confidential document dispatch across South-East Nigeria.',
      image: '/images/enhanced_chimjoy_logistics_van_1785760697298.png',
      icon: <Truck className="w-6 h-6 text-[#9BC800]" />,
      link: '/book/ride',
    },
  ];

  return (
    <section className="py-10 bg-[#F4F6F9] text-[#0E1726]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 45 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-2xl mx-auto space-y-2"
        >
          <span className="text-xs font-black uppercase tracking-widest text-[#003366] bg-[#003366]/10 px-4 py-1.5 rounded-full border border-[#003366]/15">
            TAILORED MOBILITY SOLUTIONS
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0E1726]">
            Designed for Individuals, Families & Businesses.
          </h2>
        </motion.div>

        {/* 4 Photographic Cards Grid with Glowing Lemon Flare Hover Effects */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((s, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4, scale: 1.01 }}
              className="group relative h-[320px] rounded-3xl overflow-hidden shadow-corporate border border-[#0B192C]/15 hover:border-[#9BC800] hover:shadow-[0_0_30px_rgba(155,200,0,0.5)] transition-all duration-300 flex flex-col justify-end p-7 text-white"
            >
              <img
                src={s.image}
                alt={s.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B192C] via-[#0B192C]/65 to-transparent" />

              <div className="relative z-10 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
                    {s.icon}
                  </div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-[#9BC800] bg-[#0B192C]/80 px-3 py-1 rounded-full backdrop-blur-sm border border-white/10">
                    {s.subtitle}
                  </span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl font-black text-white drop-shadow-md">
                  {s.title}
                </h3>
                <p className="text-slate-200 text-xs sm:text-sm font-medium leading-relaxed max-w-lg">
                  {s.desc}
                </p>

                <div className="pt-1">
                  <Link href={s.link} className="inline-flex items-center gap-2 text-xs font-black text-[#9BC800] hover:underline">
                    <span>Learn More & Book</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
