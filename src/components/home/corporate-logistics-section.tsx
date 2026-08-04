'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Truck } from 'lucide-react';
import { LuxuryButton } from '@/components/ui/luxury-button';

export const CorporateLogisticsSection = () => {
  const logisticsServices = [
    { title: 'Business Deliveries', desc: 'On-time haulage & cargo delivery for businesses across Imo State.' },
    { title: 'Corporate Logistics', desc: 'Dedicated fleet support for corporate organizations & events.' },
    { title: 'Document Dispatch', desc: 'Secure, confidential document & parcel dispatch in Owerri.' },
    { title: 'Special Deliveries', desc: 'Custom handling for urgent & sensitive goods.' },
    { title: 'Custom Logistics Requests', desc: 'Tailored logistics solutions designed for your operational needs.' },
  ];

  return (
    <section className="py-10 bg-white text-[#0E1726]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 45 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
        >
          {/* Left Column Content */}
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-black uppercase tracking-widest text-[#003366] bg-[#003366]/10 px-4 py-1.5 rounded-full border border-[#003366]/15">
              LOGISTICS SERVICES
            </span>

            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0E1726] leading-tight">
              Reliable Logistics Support.
            </h2>

            <p className="text-[#475569] text-sm font-medium leading-relaxed">
              We also provide dependable logistics services for businesses and individuals across Owerri and surrounding cities.
            </p>

            {/* Interactive Animated Bullet Cards with Glowing Lemon Flare Hover */}
            <div className="space-y-2.5 pt-1">
              {logisticsServices.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  whileHover={{ x: 6, scale: 1.01 }}
                  className="flex items-start gap-3 bg-[#F4F6F9] hover:bg-white p-3.5 rounded-2xl border border-[#0B192C]/10 hover:border-[#9BC800] hover:shadow-[0_0_20px_rgba(155,200,0,0.4)] transition-all duration-300 cursor-pointer group"
                >
                  <div className="p-1 rounded-full bg-[#9BC800]/20 text-[#003366] group-hover:bg-[#9BC800] group-hover:text-[#0B192C] transition-colors shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 fill-current" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-[#0E1726] group-hover:text-[#003366] transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-xs text-[#475569] font-medium mt-0.5">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="pt-2">
              <Link href="/book/ride">
                <LuxuryButton
                  variant="lemon"
                  size="lg"
                  icon={<ArrowRight className="w-4 h-4" />}
                  className="hover:shadow-[0_0_25px_rgba(155,200,0,0.6)]"
                >
                  Request Logistics Service
                </LuxuryButton>
              </Link>
            </div>
          </div>

          {/* Right Column Photo: Enhanced 4K ChimJoy Delivery Van */}
          <div className="lg:col-span-6">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative h-[440px] w-full rounded-3xl overflow-hidden shadow-corporate border border-[#0B192C]/15 hover:border-[#9BC800] hover:shadow-[0_0_30px_rgba(155,200,0,0.4)] transition-all duration-300 group"
            >
              <img
                src="/images/logistics_truck_2.png"
                alt="ChimJoy Logistics Branded Courier Delivery Vehicle in Owerri"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B192C]/85 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-5 rounded-2xl border border-[#0B192C]/15 shadow-xl space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#003366] text-white text-[10px] font-black uppercase tracking-wider">
                  <Truck className="w-3 h-3 text-[#9BC800]" />
                  <span>ChimJoy Logistics Fleet</span>
                </div>
                <h4 className="font-display text-base font-extrabold text-[#0E1726]">
                  Dependable Freight & Dispatch Logistics in Owerri
                </h4>
                <p className="text-xs text-[#475569] font-semibold">
                  On-time parcel haulage, corporate logistics, and express delivery dispatch.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
