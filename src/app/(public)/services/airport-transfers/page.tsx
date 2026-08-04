'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Plane,
  ShieldCheck,
  Clock,
  MapPin,
  CheckCircle2,
  ArrowRight,
  UserCheck,
  Briefcase,
  Users,
  Car,
  Sparkles,
  Phone,
  Shield,
} from 'lucide-react';
import { LuxuryButton } from '@/components/ui/luxury-button';
import { MOCK_VEHICLES } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/utils';

export default function AirportTransfersPage() {
  const airportVehicles = MOCK_VEHICLES.slice(0, 4);

  return (
    <main className="min-h-screen bg-white text-[#0E1726]">

      {/* ── 1. HERO WITH AUTOPLAY VIDEO BACKDROP ──────────────────────── */}
      <section className="relative min-h-[500px] h-[70vh] w-full bg-[#0B192C] text-white flex flex-col justify-between overflow-hidden pt-28">
        {/* Background Video Layer */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster="/images/sam_mbakwe_vip_airport_transfer_1785760768280.png"
            className="w-full h-full object-cover filter contrast-110 brightness-90 scale-105"
          >
            <source src="/videos/hero-video-opt.mp4" type="video/mp4" />
            <source src="/videos/hero-video.mp4" type="video/mp4" />
            <img
              src="/images/sam_mbakwe_vip_airport_transfer_1785760768280.png"
              alt="Sam Mbakwe Airport VIP Transfers"
              loading="eager"
              decoding="async"
              className="w-full h-full object-cover opacity-35"
            />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B192C] via-[#0B192C]/85 to-[#0B192C]/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B192C] via-transparent to-[#0B192C]/80" />
        </div>

        {/* Hero Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full my-auto py-8">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl space-y-5"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-black text-[#9BC800] uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#9BC800] animate-pulse" />
              <span>SAM MBAKWE INTERNATIONAL CARGO AIRPORT (QOW)</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-[56px] font-black tracking-tight leading-[1.08] text-white drop-shadow-md">
              Executive Airport Pickup<br />
              <span className="text-[#9BC800]">& Drop-off in Owerri</span>
            </h1>

            <p className="text-slate-200 text-base sm:text-lg font-medium leading-relaxed max-w-2xl">
              First-class arrivals at Sam Mbakwe Airport (QOW). Real-time flight tracking, terminal meet & greet sign, luggage assistance, and sanitized luxury vehicles.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link href="/book/ride">
                <LuxuryButton variant="lemon" size="xl" icon={<ArrowRight className="w-5 h-5" />}>
                  Book Airport Pickup
                </LuxuryButton>
              </Link>
              <Link href="/book/hire">
                <LuxuryButton variant="outline" size="xl" icon={<Car className="w-4 h-4 text-[#9BC800]" />}>
                  Hire Airport SUV
                </LuxuryButton>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Trust Strip */}
        <div className="relative z-20 w-full bg-[#0B192C]/90 backdrop-blur-xl border-t border-white/10 py-3.5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-black uppercase tracking-wider text-white">
              {[
                { icon: <Clock className="w-5 h-5 text-[#9BC800]" />, text: 'Real-time Flight Tracking' },
                { icon: <UserCheck className="w-5 h-5 text-[#9BC800]" />, text: 'Terminal Meet & Greet' },
                { icon: <Briefcase className="w-5 h-5 text-[#9BC800]" />, text: 'Full Luggage Support' },
                { icon: <ShieldCheck className="w-5 h-5 text-[#9BC800]" />, text: 'Optional MOPOL Escort' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-center gap-2.5 p-1 text-center sm:text-left">
                  {item.icon}
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. WHY CHOOSE OUR AIRPORT TRANSFERS ───────────────────────── */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto space-y-3"
          >
            <span className="text-xs font-black uppercase tracking-widest text-[#003366] bg-[#003366]/10 px-4 py-1.5 rounded-full border border-[#003366]/15">
              THE CHIMJOY STANDARD
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0E1726] tracking-tight">
              Stress-Free Airport Transportation.
            </h2>
            <p className="text-[#475569] text-base font-medium">
              We eliminate flight delay anxiety and airport hassle with our dedicated VIP arrival system.
            </p>
          </motion.div>

          {/* 3 Pillar Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Clock className="w-7 h-7 text-[#9BC800]" />,
                title: 'Flight Delay Guarantee',
                desc: 'We monitor Air Peace, Ibom Air, United Nigeria, ValueJet and Arik Air flight statuses live. If your flight is delayed or rescheduled, your chauffeur adjusts automatically at zero extra cost.',
                tag: 'Zero Wait Policy',
              },
              {
                icon: <UserCheck className="w-7 h-7 text-[#9BC800]" />,
                title: 'Terminal VIP Meet & Greet',
                desc: 'Your driver enters the arrival hall holding a customized name sign board, greets you warmly, takes care of all heavy suitcases, and escorts you directly to your waiting air-conditioned vehicle.',
                tag: 'Arrival Hall Service',
              },
              {
                icon: <ShieldCheck className="w-7 h-7 text-[#9BC800]" />,
                title: 'Armed Security (MOPOL Escort)',
                desc: 'For foreign investors, VIP delegations, corporate executives, and high-net-worth arrivals, we provide uniformed Mobile Police (MOPOL) escort vehicles from airport tarmac/terminal to your destination.',
                tag: 'VIP Protection',
              },
            ].map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                whileHover={{ y: -6, scale: 1.01 }}
                className="bg-[#F4F6F9] rounded-3xl p-8 border border-[#0B192C]/10 hover:border-[#9BC800] hover:shadow-[0_0_30px_rgba(155,200,0,0.3)] transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#0B192C] flex items-center justify-center shadow-md">
                    {card.icon}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#003366] bg-[#003366]/10 px-3 py-1 rounded-full inline-block">
                    {card.tag}
                  </span>
                  <h3 className="font-display font-black text-xl text-[#0E1726]">{card.title}</h3>
                  <p className="text-xs text-[#475569] font-medium leading-relaxed">{card.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. HOW IT WORKS PROCESS STEPS ────────────────────────────── */}
      <section className="py-16 bg-[#0B192C] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="text-center max-w-3xl mx-auto space-y-3"
          >
            <span className="text-xs font-black uppercase tracking-widest text-[#9BC800] bg-white/10 px-4 py-1.5 rounded-full border border-white/20">
              SIMPLE 4-STEP PROCESS
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
              How Your Airport Pickup Works
            </h2>
            <p className="text-slate-300 text-sm font-medium">
              From landing at Sam Mbakwe Airport to stepping into your hotel.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Book Your Transfer',
                desc: 'Enter your flight number, arrival time, and destination (Owerri, PH, Aba, Enugu, or Onitsha).',
              },
              {
                step: '02',
                title: 'Live Tracking',
                desc: 'Our dispatch center tracks your flight status in real time to ensure your driver is waiting before you touch down.',
              },
              {
                step: '03',
                title: 'Terminal Meet & Greet',
                desc: 'Your driver greets you inside the arrival terminal with a personalized sign and handles your luggage.',
              },
              {
                step: '04',
                title: 'Smooth Ride to Destination',
                desc: 'Relax in a clean, sanitized executive car as your experienced driver takes you to your hotel or residence.',
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/15 hover:border-[#9BC800] transition-all duration-300 relative group space-y-3"
              >
                <span className="font-display font-black text-4xl text-[#9BC800] block">{item.step}</span>
                <h3 className="font-display font-black text-lg text-white">{item.title}</h3>
                <p className="text-xs text-slate-300 font-medium leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. POPULAR AIRPORT VEHICLES & RATES ──────────────────────── */}
      <section className="py-16 sm:py-20 bg-[#F4F6F9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-4"
          >
            <div className="space-y-2 max-w-xl">
              <span className="text-xs font-black uppercase tracking-widest text-[#003366] bg-[#003366]/10 px-4 py-1.5 rounded-full border border-[#003366]/15">
                AIRPORT FLEET
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0E1726]">
                Vehicles Available for Airport Pickup
              </h2>
              <p className="text-[#475569] text-sm font-medium">
                Choose the perfect ride for solo travel, family arrivals or VIP executive delegations.
              </p>
            </div>

            <Link href="/book/ride">
              <LuxuryButton variant="lemon" size="md" icon={<ArrowRight className="w-4 h-4" />}>
                Book Airport Transfer
              </LuxuryButton>
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {airportVehicles.map((v, idx) => (
              <motion.div
                key={v.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                whileHover={{ y: -5, scale: 1.01 }}
                className="bg-white rounded-3xl overflow-hidden border border-[#0B192C]/10 hover:border-[#9BC800] hover:shadow-[0_0_25px_rgba(155,200,0,0.3)] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-44 overflow-hidden">
                    <img src={v.image} alt={v.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute top-3 left-3 bg-[#0B192C] text-[#9BC800] text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full">
                      {v.categoryName}
                    </span>
                  </div>

                  <div className="p-5 space-y-3">
                    <h3 className="font-display font-black text-base text-[#0E1726]">{v.name}</h3>
                    <div className="flex items-center gap-3 text-xs text-[#475569] font-bold">
                      <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5 text-[#003366]" /> {v.passengers} Pass</span>
                      <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5 text-[#003366]" /> {v.luggage} Bags</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0 flex items-center justify-between border-t border-slate-100 mt-2">
                  <div>
                    <span className="text-[9px] text-[#475569] font-bold uppercase block">Flat Rate</span>
                    <span className="font-display text-lg font-black text-[#0B192C]">{formatCurrency(v.airportFlatRate || v.pricePerDay)}</span>
                  </div>
                  <Link href={`/book/ride?vehicle=${v.id}`}>
                    <LuxuryButton variant="lemon" size="sm">
                      Book Ride
                    </LuxuryButton>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. FINAL CTA BANNER ──────────────────────────────────────── */}
      <section className="py-16 bg-[#0B192C] text-white relative overflow-hidden">
        {/* Background backdrop layer */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
          <img src="/images/images (5).jpg" alt="Sam Mbakwe Airport VIP Fleet" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#0B192C]/80" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs font-black uppercase tracking-widest text-[#9BC800] bg-white/10 px-4 py-1 rounded-full border border-white/20">
                FLYING INTO SAM MBAKWE AIRPORT?
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
                Reserve Your Airport Transfer Now
              </h2>
              <p className="text-slate-300 text-base">
                No prepayment required. Provide your flight details and our dispatch team will confirm your driver instantly.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 shrink-0">
              <Link href="/book/ride">
                <LuxuryButton variant="lemon" size="xl" icon={<ArrowRight className="w-5 h-5" />}>
                  Book Airport Pickup
                </LuxuryButton>
              </Link>
              <a href="tel:+2348077880262">
                <LuxuryButton variant="outline" size="xl" icon={<Phone className="w-4 h-4 text-[#9BC800]" />}>
                  Call Chauffeur Dispatch
                </LuxuryButton>
              </a>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
