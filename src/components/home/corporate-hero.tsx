'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Plane, UserCheck, Sparkles, Clock, Car } from 'lucide-react';
import { LuxuryButton } from '@/components/ui/luxury-button';

export const CorporateHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      title: "Need a Ride? Need a Car? We've Got You Covered.",
      description:
        'From airport pickups and executive rides to car hire and logistics services, ChimJoy makes getting around Owerri simple, safe and stress-free.',
    },
    {
      title: "Going Somewhere? Let's Get You There.",
      description:
        'Professional drivers, clean vehicles and dependable service for airport transfers, business trips, family outings and more.',
    },
    {
      title: 'Book a Ride. Hire a Car. Move Without Stress.',
      description:
        'Fast bookings, professional drivers and well-maintained vehicles serving Owerri and surrounding cities.',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  return (
    <section className="relative min-h-[580px] h-[75vh] w-full bg-[#0B192C] text-white flex flex-col justify-between overflow-hidden pt-24">
      {/* High Contrast Video Backdrop Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="w-full h-full object-cover filter contrast-110 brightness-90 scale-105"
        >
          <source src="/videos/hero-video.mp4" type="video/mp4" />
          <img
            src="/images/images (5).jpg"
            alt="ChimJoy Executive Fleet"
            className="w-full h-full object-cover opacity-35"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B192C] via-[#0B192C]/85 to-[#0B192C]/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B192C] via-transparent to-[#0B192C]/80" />
      </div>

      {/* Main Hero Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full my-auto py-8">
        <div className="max-w-3xl space-y-5">
          {/* Top Label Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-black text-[#9BC800] uppercase tracking-wider"
          >
            <span className="w-2 h-2 rounded-full bg-[#9BC800] animate-pulse" />
            <span>PREMIUM TRANSPORTATION SERVICES</span>
          </motion.div>

          {/* Animated Headline Rotator - Crisp High-Contrast Typography */}
          <div className="min-h-[160px] sm:min-h-[180px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-3"
              >
                <h1 className="font-display text-3xl sm:text-5xl lg:text-[54px] font-black tracking-tight leading-[1.1] text-white drop-shadow-md">
                  {heroSlides[currentSlide].title}
                </h1>
                <p className="text-slate-200 text-base sm:text-lg font-medium leading-relaxed max-w-2xl">
                  {heroSlides[currentSlide].description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-1">
            <Link href="/book/ride">
              <LuxuryButton variant="lemon" size="xl" icon={<ArrowRight className="w-5 h-5" />}>
                Book a Ride
              </LuxuryButton>
            </Link>

            <Link href="/book/hire">
              <LuxuryButton variant="outline" size="xl" icon={<Car className="w-4 h-4 text-[#9BC800]" />}>
                Hire a Car
              </LuxuryButton>
            </Link>
          </div>
        </div>
      </div>

      {/* Trust Strip (4 Items) */}
      <div className="relative z-20 w-full bg-[#0B192C]/90 backdrop-blur-xl border-t border-white/10 py-3.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-black uppercase tracking-wider text-white">
            <div className="flex items-center justify-center gap-2.5 p-2 text-center sm:text-left">
              <Plane className="w-5 h-5 text-[#9BC800] shrink-0" />
              <span>Airport Pickup</span>
            </div>
            <div className="flex items-center justify-center gap-2.5 p-2 text-center sm:text-left">
              <UserCheck className="w-5 h-5 text-[#9BC800] shrink-0" />
              <span>Professional Drivers</span>
            </div>
            <div className="flex items-center justify-center gap-2.5 p-2 text-center sm:text-left">
              <Sparkles className="w-5 h-5 text-[#9BC800] shrink-0" />
              <span>Clean Vehicles</span>
            </div>
            <div className="flex items-center justify-center gap-2.5 p-2 text-center sm:text-left">
              <Clock className="w-5 h-5 text-[#9BC800] shrink-0" />
              <span>24/7 Customer Support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
