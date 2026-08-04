'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Car,
  Plane,
  MapPin,
  Heart,
  Building2,
  Star,
  Calendar,
  UserCheck,
  ShieldCheck,
  Clock,
} from 'lucide-react';
import { LuxuryButton } from '@/components/ui/luxury-button';

export default function BookingLandingPage() {
  return (
    <main className="min-h-screen bg-white text-[#0E1726]">

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative min-h-[480px] w-full bg-[#0B192C] text-white flex flex-col justify-end overflow-hidden pt-28 pb-0">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster="/images/nigerian_driver_alone_1785747001406.png"
            className="w-full h-full object-cover filter contrast-110 brightness-90 scale-105"
          >
            <source src="/videos/hero-video-opt.mp4" type="video/mp4" />
            <source src="/videos/hero-video.mp4" type="video/mp4" />
            <img
              src="/images/nigerian_driver_alone_1785747001406.png"
              alt="ChimJoy VIP fleet"
              loading="eager"
              decoding="async"
              className="w-full h-full object-cover opacity-30"
            />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B192C] via-[#0B192C]/85 to-[#0B192C]/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B192C] via-transparent to-[#0B192C]/70" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-5 max-w-2xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-black text-[#9BC800] uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#9BC800] animate-pulse" />
              <span>CHIMJOY LOGISTICS — BOOK NOW</span>
            </div>

            <h1 className="font-display text-3xl sm:text-5xl lg:text-[54px] font-black tracking-tight leading-[1.1] text-white drop-shadow-md">
              How can we move<br />you today?
            </h1>

            <p className="text-slate-200 text-base sm:text-lg font-medium leading-relaxed">
              Choose your service below. Two separate journeys, two dedicated booking experiences.
            </p>
          </motion.div>
        </div>

        {/* Trust strip */}
        <div className="relative z-10 w-full bg-[#0B192C]/90 backdrop-blur-xl border-t border-white/10 py-3">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs font-black uppercase tracking-wider text-white">
              {[
                { icon: <UserCheck className="w-4 h-4 text-[#9BC800]" />, label: 'Professional Drivers' },
                { icon: <ShieldCheck className="w-4 h-4 text-[#9BC800]" />, label: 'Vetted & Insured' },
                { icon: <Clock className="w-4 h-4 text-[#9BC800]" />, label: '24/7 Support' },
                { icon: <MapPin className="w-4 h-4 text-[#9BC800]" />, label: 'South-East Nigeria' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-center gap-2 p-2">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICE SELECTOR ─────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-[#F4F6F9]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="text-center space-y-3"
          >
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#0E1726]">
              Select Your Service
            </h2>
            <p className="text-[#475569] text-sm font-medium max-w-xl mx-auto">
              Ride Booking and Car Hire are two completely different services with dedicated booking flows.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">

            {/* ── CARD 1: RIDE BOOKING ── */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0 }}
              whileHover={{ y: -6, scale: 1.01 }}
              className="group bg-white rounded-3xl border border-[#0B192C]/10 overflow-hidden shadow-sm hover:border-[#9BC800] hover:shadow-[0_0_30px_rgba(155,200,0,0.25)] transition-all duration-300"
            >
              {/* Top accent bar */}
              <div className="h-1.5 bg-[#9BC800] w-full" />

              <div className="p-8 space-y-6">
                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-[#0B192C] flex items-center justify-center shadow-md group-hover:bg-[#003366] transition-colors">
                  <Plane className="w-7 h-7 text-[#9BC800]" />
                </div>

                {/* Heading */}
                <div className="space-y-2">
                  <h3 className="font-display text-2xl font-black text-[#0B192C]">Book a Ride</h3>
                  <p className="text-[#475569] text-sm font-medium leading-relaxed">
                    You need to get somewhere. We send a professional driver to pick you up.
                  </p>
                </div>

                {/* Service bullets */}
                <div className="space-y-2.5">
                  {[
                    { icon: <Plane className="w-3.5 h-3.5 text-[#9BC800]" />, label: 'Airport Pickup & Drop-off' },
                    { icon: <MapPin className="w-3.5 h-3.5 text-[#9BC800]" />, label: 'Within Owerri & Interstate Trips' },
                    { icon: <Heart className="w-3.5 h-3.5 text-[#9BC800]" />, label: 'Wedding & Event Transportation' },
                    { icon: <Building2 className="w-3.5 h-3.5 text-[#9BC800]" />, label: 'Corporate & Executive Chauffeur' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#9BC800]/15 flex items-center justify-center shrink-0">
                        {item.icon}
                      </div>
                      <span className="text-xs font-bold text-[#0E1726]">{item.label}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="pt-2">
                  <Link href="/book/ride">
                    <LuxuryButton variant="lemon" size="lg" icon={<ArrowRight className="w-4 h-4" />} className="w-full justify-center">
                      Book a Ride
                    </LuxuryButton>
                  </Link>
                </div>

                <p className="text-[10px] text-[#475569] font-medium text-center">
                  Select service type → fill details → choose vehicle → submit
                </p>
              </div>
            </motion.div>

            {/* ── CARD 2: CAR HIRE ── */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -6, scale: 1.01 }}
              className="group bg-[#0B192C] rounded-3xl border border-white/10 overflow-hidden shadow-sm hover:border-[#9BC800] hover:shadow-[0_0_30px_rgba(155,200,0,0.3)] transition-all duration-300"
            >
              {/* Top accent bar */}
              <div className="h-1.5 bg-[#003366] group-hover:bg-[#9BC800] w-full transition-colors" />

              <div className="p-8 space-y-6">
                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-[#9BC800] flex items-center justify-center shadow-md">
                  <Car className="w-7 h-7 text-[#0B192C]" />
                </div>

                {/* Heading */}
                <div className="space-y-2">
                  <h3 className="font-display text-2xl font-black text-white">Hire a Vehicle</h3>
                  <p className="text-slate-300 text-sm font-medium leading-relaxed">
                    Rent a vehicle for a day, a week, or a special occasion — with a professional chauffeur.
                  </p>
                </div>

                {/* Service bullets */}
                <div className="space-y-2.5">
                  {[
                    { icon: <Calendar className="w-3.5 h-3.5 text-[#9BC800]" />, label: 'Daily, Weekend & Multi-day Hire' },
                    { icon: <Building2 className="w-3.5 h-3.5 text-[#9BC800]" />, label: 'Business Trips & Official Assignments' },
                    { icon: <Heart className="w-3.5 h-3.5 text-[#9BC800]" />, label: 'Wedding Convoys & Special Events' },
                    { icon: <Star className="w-3.5 h-3.5 text-[#9BC800]" />, label: 'Tourism & Personal Use' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                        {item.icon}
                      </div>
                      <span className="text-xs font-bold text-slate-200">{item.label}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="pt-2">
                  <Link href="/book/hire">
                    <LuxuryButton variant="outline" size="lg" icon={<ArrowRight className="w-4 h-4" />} className="w-full justify-center border-[#9BC800]/50 hover:bg-[#9BC800] hover:text-[#0B192C] hover:border-[#9BC800]">
                      Hire a Vehicle
                    </LuxuryButton>
                  </Link>
                </div>

                <p className="text-[10px] text-slate-400 font-medium text-center">
                  Set dates → choose purpose → select vehicle → submit
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── REASSURANCE STRIP ────────────────────────────────────────── */}
      <section className="py-12 bg-white border-t border-[#0B192C]/8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            {[
              {
                icon: <ShieldCheck className="w-7 h-7 text-[#9BC800]" />,
                title: 'No Online Payment',
                desc: 'All bookings are request-based. Pay on confirmation or on the day.',
              },
              {
                icon: <Clock className="w-7 h-7 text-[#9BC800]" />,
                title: '24/7 Response',
                desc: 'Our operations team responds fast. WhatsApp confirmation available instantly.',
              },
              {
                icon: <UserCheck className="w-7 h-7 text-[#9BC800]" />,
                title: 'Vetted Drivers',
                desc: 'Every driver is background-checked, licensed, and trained in professional conduct.',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="space-y-3"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#F4F6F9] flex items-center justify-center mx-auto">
                  {item.icon}
                </div>
                <h4 className="font-display font-black text-base text-[#0E1726]">{item.title}</h4>
                <p className="text-xs text-[#475569] font-medium leading-relaxed max-w-xs mx-auto">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
