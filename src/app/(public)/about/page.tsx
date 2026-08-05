'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Target,
  Compass,
  Plane,
  Car,
  ShieldCheck,
  Sparkles,
  Users,
  Truck,
  UserCheck,
  CheckCircle2,
  Clock,
  HeartHandshake,
  ShieldAlert,
  MapPin,
  ArrowRight,
  Phone,
  MessageCircle,
} from 'lucide-react';
import { LuxuryButton } from '@/components/ui/luxury-button';

export default function AboutPage() {
  const serviceAreas = [
    'Sam Mbakwe International Cargo Airport',
    'Port Harcourt',
    'Aba',
    'Umuahia',
    'Enugu',
    'Onitsha',
    'Orlu',
    'Okigwe',
  ];

  const whatWeDoCards = [
    {
      title: 'Airport Pickup',
      desc: 'Seamless, flight-monitored arrival pickups and departures at Sam Mbakwe International Cargo Airport (QOW).',
      icon: <Plane className="w-6 h-6 text-[#9BC800]" />,
    },
    {
      title: 'Executive Transportation',
      desc: 'Chchauffeur-driven luxury sedans and SUVs for business travel, VIP delegations, and corporate meetings in Owerri.',
      icon: <Car className="w-6 h-6 text-[#9BC800]" />,
    },
    {
      title: 'Car Hire',
      desc: 'Flexible daily vehicle rentals with experienced, vetted drivers for local town runs and interstate trips.',
      icon: <ShieldCheck className="w-6 h-6 text-[#9BC800]" />,
    },
    {
      title: 'Wedding & Event Transport',
      desc: 'Elegant vehicle convoys and dedicated transportation for weddings, family celebrations, and special occasions.',
      icon: <Sparkles className="w-6 h-6 text-[#9BC800]" />,
    },
    {
      title: 'Corporate Staff Transportation',
      desc: 'Reliable group shuttle and staff movement solutions for companies, non-profits, and visiting organizations.',
      icon: <Users className="w-6 h-6 text-[#9BC800]" />,
    },
    {
      title: 'Logistics & Delivery Services',
      desc: 'Dependable logistics support, cargo haulage, and confidential document dispatch across South-East Nigeria.',
      icon: <Truck className="w-6 h-6 text-[#9BC800]" />,
    },
  ];

  const whyChooseUsCards = [
    {
      title: 'Professional Drivers',
      desc: 'Every driver is experienced, courteous and committed to your safety.',
      icon: <UserCheck className="w-6 h-6 text-[#9BC800]" />,
    },
    {
      title: 'Clean & Well-Maintained Vehicles',
      desc: 'Every vehicle is inspected and cleaned before every trip.',
      icon: <ShieldCheck className="w-6 h-6 text-[#9BC800]" />,
    },
    {
      title: 'Reliable Service',
      desc: 'We value your time and strive to arrive promptly for every booking.',
      icon: <Clock className="w-6 h-6 text-[#9BC800]" />,
    },
    {
      title: 'Flexible Booking',
      desc: 'Book online, by phone or through WhatsApp.',
      icon: <MessageCircle className="w-6 h-6 text-[#9BC800]" />,
    },
    {
      title: 'Friendly Customer Support',
      desc: 'Our team is always available to assist before and after your journey.',
      icon: <HeartHandshake className="w-6 h-6 text-[#9BC800]" />,
    },
    {
      title: 'Comfortable Travel',
      desc: "Whether it's a short trip or a long journey, your comfort comes first.",
      icon: <Sparkles className="w-6 h-6 text-[#9BC800]" />,
    },
  ];

  return (
    <main className="min-h-screen bg-white text-[#0E1726]">
      {/* ====================================================
          SECTION 1: HERO SECTION
          ==================================================== */}
      <section className="relative min-h-[540px] lg:h-[75vh] w-full bg-[#0B192C] text-white flex flex-col justify-between overflow-hidden pt-32 sm:pt-36 pb-8">
        {/* Hero Background — Real fleet photo */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            src="/images/images (5).jpg"
            alt="ChimJoy VIP fleet of black Toyota Land Cruisers with professional chauffeurs"
            className="w-full h-full object-cover object-center opacity-50 filter contrast-110 brightness-90 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B192C] via-[#0B192C]/75 to-[#0B192C]/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B192C] via-transparent to-[#0B192C]/70" />
        </div>

        {/* Hero Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full my-auto py-4 sm:py-8">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl space-y-4"
          >
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-[11px] sm:text-xs font-black text-[#9BC800] uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#9BC800] animate-pulse" />
              <span>ABOUT CHIMJOY</span>
            </div>

            {/* Heading */}
            <h1 className="font-display text-3xl sm:text-5xl lg:text-[54px] font-black tracking-tight leading-[1.1] text-white drop-shadow-md">
              Reliable Transportation, Built Around People.
            </h1>

            {/* Paragraphs */}
            <div className="space-y-3 text-slate-200 text-sm sm:text-base font-medium leading-relaxed max-w-2xl">
              <p>
                ChimJoy Car Hire is a transportation service operated by ChimJoy Logistics Services Ltd., providing dependable airport pickup, executive transportation, car hire and logistics services across Owerri, Imo State and South-East Nigeria.
              </p>
              <p>
                We believe every journey deserves professionalism, comfort and peace of mind. Whether you're travelling for business, family or a special occasion, our team is committed to getting you there safely and on time.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link href="/book">
                <LuxuryButton
                  variant="lemon"
                  size="lg"
                  icon={<ArrowRight className="w-4 h-4" />}
                  className="hover:shadow-[0_0_25px_rgba(155,200,0,0.6)]"
                >
                  Book a Ride
                </LuxuryButton>
              </Link>
              <Link href="/contact">
                <LuxuryButton variant="outline" size="lg" icon={<Phone className="w-4 h-4 text-[#9BC800]" />}>
                  Contact Us
                </LuxuryButton>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Trust Badges Bar */}
        <div className="relative z-20 w-full bg-[#0B192C]/90 backdrop-blur-xl border-t border-white/10 py-3">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 text-[11px] sm:text-xs font-black uppercase tracking-wider text-white">
              <div className="flex items-center justify-center gap-2 p-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#9BC800] shrink-0" />
                <span>Professional Drivers</span>
              </div>
              <div className="flex items-center justify-center gap-2 p-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#9BC800] shrink-0" />
                <span>Clean Vehicles</span>
              </div>
              <div className="flex items-center justify-center gap-2 p-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#9BC800] shrink-0" />
                <span>Airport Pickup</span>
              </div>
              <div className="flex items-center justify-center gap-2 p-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#9BC800] shrink-0" />
                <span>Corporate Transport</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          SECTION 2: WHO WE ARE
          ==================================================== */}
      <section className="py-10 sm:py-12 bg-[#F4F6F9] text-[#0E1726] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center"
          >
            {/* Left Side — Transparent Land Cruiser cutout */}
            <div className="lg:col-span-6 flex items-center justify-center">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative min-h-[300px] sm:h-[400px] w-full flex flex-col items-center justify-end"
              >
                <img
                  src="/images/luxury_executive_suv_prado.png"
                  alt="Classic black Toyota Land Cruiser Prado — ChimJoy executive fleet"
                  className="w-full h-[260px] sm:h-[340px] object-contain drop-shadow-[0_24px_50px_rgba(11,25,44,0.25)] transition-transform duration-500 hover:scale-105"
                />
                <div className="mt-4 sm:mt-0 sm:absolute sm:bottom-0 sm:left-6 sm:right-6 bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-[#0B192C]/15 shadow-lg w-full sm:w-auto">
                  <h4 className="font-display text-sm sm:text-base font-extrabold text-[#0E1726]">
                    Executive Fleet in Owerri
                  </h4>
                  <p className="text-xs text-[#475569] font-semibold mt-0.5">
                    Clean, inspected vehicles and courteous drivers for every journey.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Right Side Content */}
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-black uppercase tracking-widest text-[#003366] bg-[#003366]/10 px-4 py-1.5 rounded-full border border-[#003366]/15">
                WHO WE ARE
              </span>

              <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0E1726] leading-tight">
                More Than Transportation. A Service You Can Trust.
              </h2>

              <div className="space-y-3 text-[#475569] text-sm sm:text-base font-medium leading-relaxed">
                <p>
                  ChimJoy Car Hire is a transportation service proudly operated by ChimJoy Logistics Services Ltd., serving individuals, families, businesses and organisations across Owerri and South-East Nigeria.
                </p>
                <p>
                  Our services are built around one simple idea—making transportation easy, dependable and comfortable.
                </p>
                <p>
                  Whether you need an airport pickup, a vehicle for personal use, transportation for a corporate engagement, or reliable logistics support, our experienced team is ready to serve you with professionalism and attention to detail.
                </p>
                <p>
                  From the moment you book with us until you arrive at your destination, we focus on delivering a smooth experience you can rely on.
                </p>
              </div>

              {/* Animated Statistics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-[#0E1726]/10">
                <div className="space-y-1">
                  <span className="font-display text-3xl font-black text-[#0B192C]">10+</span>
                  <span className="text-xs text-[#475569] font-bold block">Years of Service</span>
                </div>
                <div className="space-y-1">
                  <span className="font-display text-3xl font-black text-[#0B192C]">1,000+</span>
                  <span className="text-xs text-[#475569] font-bold block">Successful Trips</span>
                </div>
                <div className="space-y-1">
                  <span className="font-display text-3xl font-black text-[#0B192C]">100+</span>
                  <span className="text-xs text-[#475569] font-bold block">Corporate Clients</span>
                </div>
                <div className="space-y-1">
                  <span className="font-display text-3xl font-black text-[#0B192C]">24/7</span>
                  <span className="text-xs text-[#475569] font-bold block">Customer Support</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ====================================================
          SECTION 3: MISSION & VISION
          ==================================================== */}
      <section className="py-12 bg-[#0B192C] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 45 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {/* Card One: OUR MISSION */}
            <motion.div
              whileHover={{ y: -4, scale: 1.01 }}
              className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20 hover:border-[#9BC800] hover:shadow-[0_0_30px_rgba(155,200,0,0.45)] transition-all duration-300 space-y-4"
            >
              <div className="p-3.5 rounded-2xl bg-[#9BC800]/20 text-[#9BC800] w-fit">
                <Target className="w-8 h-8" />
              </div>
              <h3 className="font-display text-2xl font-black text-white">OUR MISSION</h3>
              <p className="text-slate-200 text-sm sm:text-base font-medium leading-relaxed">
                To provide safe, reliable and professional transportation services that make every journey comfortable, convenient and stress-free for our customers.
              </p>
            </motion.div>

            {/* Card Two: OUR VISION */}
            <motion.div
              whileHover={{ y: -4, scale: 1.01 }}
              className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20 hover:border-[#9BC800] hover:shadow-[0_0_30px_rgba(155,200,0,0.45)] transition-all duration-300 space-y-4"
            >
              <div className="p-3.5 rounded-2xl bg-[#9BC800]/20 text-[#9BC800] w-fit">
                <Compass className="w-8 h-8" />
              </div>
              <h3 className="font-display text-2xl font-black text-white">OUR VISION</h3>
              <p className="text-slate-200 text-sm sm:text-base font-medium leading-relaxed">
                To become one of Nigeria's most trusted transportation and logistics companies, recognised for excellent service, dependable operations and customer satisfaction.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ====================================================
          SECTION 4: WHAT WE DO
          ==================================================== */}
      <section className="py-12 bg-white text-[#0E1726]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 45 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-center max-w-3xl mx-auto space-y-2"
          >
            <span className="text-xs font-black uppercase tracking-widest text-[#003366] bg-[#003366]/10 px-4 py-1.5 rounded-full border border-[#003366]/15">
              WHAT WE DO
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0E1726]">
              Transportation Solutions Designed Around Your Needs.
            </h2>
            <p className="text-[#475569] text-sm sm:text-base font-medium">
              Whether you're travelling alone, with family or for business, ChimJoy provides dependable transportation services tailored to your schedule.
            </p>
          </motion.div>

          {/* 6 Premium Service Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whatWeDoCards.map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4, scale: 1.01 }}
                className="bg-[#FAFAFA] hover:bg-white p-7 rounded-3xl border border-[#0B192C]/15 hover:border-[#9BC800] shadow-corporate hover:shadow-[0_0_25px_rgba(155,200,0,0.45)] transition-all duration-300 space-y-4 group flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="p-3.5 rounded-2xl bg-[#0B192C] text-white w-fit group-hover:bg-[#003366] transition-colors">
                    {card.icon}
                  </div>
                  <h3 className="font-display font-black text-xl text-[#0E1726] group-hover:text-[#003366] transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#475569] font-medium leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          SECTION 5: WHY CHOOSE CHIMJOY
          ==================================================== */}
      <section className="py-12 bg-[#0B192C] text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 45 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-center max-w-3xl mx-auto space-y-2"
          >
            <span className="text-xs font-black uppercase tracking-widest text-[#9BC800] bg-white/10 px-4 py-1.5 rounded-full border border-white/20">
              WHY CHOOSE CHIMJOY
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Why Thousands Continue to Choose ChimJoy.
            </h2>
          </motion.div>

          {/* 6 Feature Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUsCards.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4, scale: 1.01 }}
                className="bg-white/10 backdrop-blur-xl p-7 rounded-3xl border border-white/15 hover:border-[#9BC800] hover:shadow-[0_0_25px_rgba(155,200,0,0.45)] transition-all duration-300 space-y-3 group"
              >
                <div className="p-3 rounded-2xl bg-white/10 text-[#9BC800] w-fit group-hover:bg-[#9BC800] group-hover:text-[#0B192C] transition-colors">
                  {item.icon}
                </div>
                <h3 className="font-display font-black text-lg text-white">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          SECTION 6: SERVICE AREAS
          ==================================================== */}
      <section className="py-12 bg-[#F4F6F9] text-[#0E1726]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 45 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
          >
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-black uppercase tracking-widest text-[#003366] bg-[#003366]/10 px-4 py-1.5 rounded-full border border-[#003366]/15">
                SERVICE COVERAGE
              </span>

              <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0E1726]">
                Serving Owerri and South-East Nigeria.
              </h2>

              <p className="text-[#475569] text-sm sm:text-base font-medium leading-relaxed">
                Our operations are based in Owerri, Imo State, with transportation and logistics services available across South-East Nigeria.
              </p>

              <div className="space-y-2 pt-1">
                <span className="text-xs font-black uppercase tracking-wider text-[#003366] block">
                  Popular Destinations Include:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {serviceAreas.map((area, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ x: 4 }}
                      className="flex items-center gap-2 bg-white p-3 rounded-2xl border border-[#0B192C]/10 shadow-sm hover:border-[#9BC800]"
                    >
                      <MapPin className="w-4 h-4 text-[#9BC800] shrink-0" />
                      <span className="text-xs font-extrabold text-[#0E1726]">{area}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — Owerri aerial city photo */}
            <div className="lg:col-span-6">
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="relative h-[420px] w-full rounded-3xl overflow-hidden shadow-corporate border border-[#0B192C]/15 hover:border-[#9BC800] hover:shadow-[0_0_25px_rgba(155,200,0,0.4)] transition-all duration-300 bg-[#0B192C] p-6 text-white flex flex-col justify-between"
              >
                {/* Real Owerri aerial city photo */}
                <img
                  src="/images/images (14).jpg"
                  alt="Aerial view of Owerri city — ChimJoy Logistics South-East Nigeria operations hub"
                  className="absolute inset-0 w-full h-full object-cover opacity-45 filter contrast-110 brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B192C] via-[#0B192C]/60 to-transparent" />

                <div className="relative z-10 flex flex-wrap items-center justify-between gap-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#9BC800] text-[#0B192C] text-[11px] font-black uppercase shrink-0">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span>South-East Route Hub</span>
                  </div>
                  <span className="text-[11px] text-slate-300 font-bold">Owerri HQ Base</span>
                </div>

                <div className="relative z-10 space-y-2 bg-[#0B192C]/90 backdrop-blur-md p-5 rounded-2xl border border-white/20">
                  <h4 className="font-display font-black text-lg text-white">
                    Owerri • Port Harcourt • Aba • Enugu • Onitsha
                  </h4>
                  <p className="text-xs text-slate-300 font-medium">
                    24/7 dispatched drivers across all major city routes and airport arrival corridors.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ====================================================
          SECTION 7: FINAL CTA
          ==================================================== */}
      <section className="py-14 bg-[#0B192C] text-white relative overflow-hidden">
        {/* Subtle Glowing Lemon Aura */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#9BC800]/15 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 45 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl mx-auto space-y-3"
          >
            <h2 className="font-display text-3xl sm:text-5xl font-black tracking-tight text-white">
              Need Reliable Transportation?
            </h2>
            <p className="text-slate-200 text-sm sm:text-base font-medium leading-relaxed">
              Whether you're travelling to the airport, hiring a vehicle, planning an event or moving goods, ChimJoy is ready to help.
            </p>
          </motion.div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link href="/book">
              <LuxuryButton
                variant="lemon"
                size="xl"
                icon={<ArrowRight className="w-5 h-5" />}
                className="hover:shadow-[0_0_30px_rgba(155,200,0,0.65)]"
              >
                Book a Ride
              </LuxuryButton>
            </Link>
            <Link href="/fleet">
              <LuxuryButton variant="outline" size="xl" icon={<Car className="w-4 h-4 text-[#9BC800]" />}>
                Hire a Car
              </LuxuryButton>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
