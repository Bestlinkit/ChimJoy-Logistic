'use client';

import React from 'react';
import { CorporateHero } from '@/components/home/corporate-hero';
import { CorporateStory } from '@/components/home/corporate-story';
import { CorporateBookingSection } from '@/components/home/corporate-booking-section';
import { CorporateCarHireSection } from '@/components/home/corporate-car-hire-section';
import { CorporateServicesDeck } from '@/components/home/corporate-services-deck';
import { CorporateLogisticsSection } from '@/components/home/corporate-logistics-section';
import { CorporateFleetSpotlight } from '@/components/home/corporate-fleet-spotlight';
import { CorporateValuePillars } from '@/components/home/corporate-value-pillars';
import { CorporateAirportSection } from '@/components/home/corporate-airport-section';
import { CorporateTestimonials } from '@/components/home/corporate-testimonials';
import { CorporateCTABanner } from '@/components/home/corporate-cta-banner';

export default function PublicHomePage() {
  return (
    <main className="w-full bg-white overflow-hidden">
      {/* 1. HERO SECTION (3 Slides, 3 Buttons, 4 Trust Bar Items) */}
      <CorporateHero />

      {/* 2. ABOUT SECTION (WHO WE ARE, 3 Paragraphs, Statistics) */}
      <CorporateStory />

      {/* 3. BOOKING SECTION (BOOK A RIDE, 4 Tabs, 8 Fields, Check Availability Button) */}
      <CorporateBookingSection />

      {/* 4. CAR HIRE SECTION (CAR HIRE, Need a Car?, 5 Categories) */}
      <CorporateCarHireSection />

      {/* 5. TAILORED MOBILITY SOLUTIONS SERVICES DECK */}
      <CorporateServicesDeck />

      {/* 6. LOGISTICS SECTION (LOGISTICS SERVICES, 5 Services) */}
      <CorporateLogisticsSection />

      {/* 7. LAND CRUISER PRADO SPOTLIGHT */}
      <CorporateFleetSpotlight />

      {/* 8. WHY CHOOSE CHIMJOY (WHY CHOOSE US, 4 Pillars) */}
      <CorporateValuePillars />

      {/* 9. AIRPORT SECTION (SAM MBAKWE AIRPORT PICKUP, Flying Into Owerri?) */}
      <CorporateAirportSection />

      {/* 10. TESTIMONIAL SECTION (WHAT OUR CUSTOMERS SAY, 7 Realistic Text Reviews Carousel) */}
      <CorporateTestimonials />

      {/* 11. CALL TO ACTION BANNER (Ready to Travel?) */}
      <CorporateCTABanner />
    </main>
  );
}
