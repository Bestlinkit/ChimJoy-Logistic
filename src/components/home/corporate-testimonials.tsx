'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { subscribeToReviews } from '@/lib/firebase/services/admin-db-service';

export const CorporateTestimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reviews, setReviews] = useState<Array<{ content: string; name: string; rating: number }>>([
    {
      content: 'Excellent service from the airport to my hotel in Owerri. The driver arrived before my flight landed and the vehicle was spotless.',
      name: 'Chinedu A.',
      rating: 5,
    },
    {
      content: 'We hired two Toyota Prado SUVs for our family event in Owerri. The drivers were punctual, polite, and knew all the roads.',
      name: 'Adanna K.',
      rating: 5,
    },
    {
      content: 'ChimJoy provides reliable corporate car hire for our visiting executives. Always professional and exceptionally on time.',
      name: 'Emeka O.',
      rating: 5,
    },
  ]);

  useEffect(() => {
    // Listen to Firestore approved reviews
    const unsub = subscribeToReviews((data) => {
      const approved = data.filter((r) => r.status === 'Approved');
      if (approved.length > 0) {
        setReviews(
          approved.map((r) => ({
            content: r.comment,
            name: r.customerName,
            rating: r.rating || 5,
          }))
        );
      }
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (reviews.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [reviews.length]);

  return (
    <section className="py-10 bg-[#FAFAFA] text-[#0E1726] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 45 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4"
        >
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-black uppercase tracking-widest text-[#003366] bg-[#003366]/10 px-4 py-1.5 rounded-full border border-[#003366]/15">
              CUSTOMER REVIEWS
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0E1726]">
              Real Feedback from <span className="text-[#003366] italic">Verified Travellers.</span>
            </h2>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length)}
              className="p-3 rounded-full bg-white border border-[#0E1726]/15 text-[#0E1726] hover:bg-[#003366] hover:text-white transition-colors shadow-sm"
              aria-label="Previous Review"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentIndex((prev) => (prev + 1) % reviews.length)}
              className="p-3 rounded-full bg-white border border-[#0E1726]/15 text-[#0E1726] hover:bg-[#003366] hover:text-white transition-colors shadow-sm"
              aria-label="Next Review"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        {/* Testimonial Card - ONLY BIGGER NAME, NO AVATAR PICTURE, NO DESIGNATION AS DIRECTED */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl mx-auto bg-white p-6 sm:p-10 rounded-3xl shadow-corporate border border-[#0E1726]/15 hover:border-[#9BC800] hover:shadow-[0_0_30px_rgba(155,200,0,0.35)] transition-all duration-300 relative"
        >
          <Quote className="w-10 h-10 text-[#9BC800] mb-4" />

          <div className="min-h-[140px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-5"
              >
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-[#9BC800]">
                  {[...Array(reviews[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                  <span className="text-xs font-extrabold text-[#0E1726] ml-2">5.0 Verified Trip</span>
                </div>

                {/* Review Copy */}
                <p className="text-[#0E1726] text-base sm:text-xl font-display font-extrabold leading-relaxed italic">
                  "{reviews[currentIndex].content}"
                </p>

                {/* ONLY BIGGER NAME, NO PICTURE, NO DESIGNATION */}
                <div className="pt-4 border-t border-[#0E1726]/10 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#9BC800] fill-current text-[#0B192C]" />
                    <h4 className="font-display font-black text-xl sm:text-2xl text-[#0E1726] tracking-tight">
                      {reviews[currentIndex].name}
                    </h4>
                  </div>

                  <span className="text-xs font-black text-[#003366] bg-[#003366]/10 px-3 py-1 rounded-full shrink-0">
                    {currentIndex + 1} of {reviews.length}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
