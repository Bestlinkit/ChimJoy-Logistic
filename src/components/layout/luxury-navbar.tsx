'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, Menu, X, ArrowRight } from 'lucide-react';
import { LuxuryButton } from '@/components/ui/luxury-button';

export const LuxuryNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Ride Booking', href: '/book/ride' },
    { name: 'Car Hire', href: '/book/hire' },
    { name: 'Airport Pickup', href: '/services/airport-transfers' },
    { name: 'Logistics', href: '/book' },
    { name: 'Contact Us', href: '/contact' },
  ];

  const handleMobileNavigate = (href: string) => {
    setIsMobileMenuOpen(false);
    router.push(href);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top Announcement Bar in Official Deep Navy (#0B192C) */}
      <div className="bg-[#0B192C] text-white text-[10px] font-extrabold uppercase tracking-wider py-1.5 px-4 border-b border-[#9BC800]/25 hidden lg:block shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 text-slate-200">
            <span className="text-[#9BC800] flex items-center gap-1.5 font-black">
              <span className="w-2 h-2 rounded-full bg-[#9BC800] animate-pulse" />
              COMMITTED TO POSITIVE & RESPONSIVE LOGISTICS SERVICES
            </span>
            <span className="text-white/30">|</span>
            <span className="text-white font-black">SERVING OWERRI, IMO STATE & SOUTH-EAST NIGERIA</span>
          </div>

          <div className="flex items-center gap-5 text-white font-extrabold">
            <a href="tel:+2348077880262" className="flex items-center gap-1 hover:text-[#9BC800] transition-colors">
              <Phone className="w-3 h-3 text-[#9BC800]" />
              <span>+234 807 788 0262</span>
            </a>
            <a href="mailto:hq@chimjoylogistics.com.ng" className="flex items-center gap-1 hover:text-[#9BC800] transition-colors">
              <Mail className="w-3 h-3 text-[#9BC800]" />
              <span>HQ@CHIMJOYLOGISTICS.COM.NG</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header Navbar */}
      <nav
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-md py-1.5'
            : 'bg-white/95 backdrop-blur-md border-b border-slate-200 py-2'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-2">
            <Link href="/" className="flex items-center gap-2 group py-0.5 shrink-0">
              <img
                src="/images/logo.png"
                alt="ChimJoy Logistics Services Ltd"
                className="h-9 sm:h-12 w-auto object-contain filter drop-shadow-sm group-hover:scale-105 transition-transform"
              />
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link, idx) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={idx}
                    href={link.href}
                    className={`px-3 py-1.5 text-[11px] font-black uppercase tracking-wider rounded-md transition-all duration-300 relative ${
                      isActive ? 'text-[#003366]' : 'text-[#0B192C] hover:text-[#003366]'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.div
                        layoutId="activeWhiteNavCompact"
                        className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#9BC800] rounded-full shadow-lemon"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Right Action CTA Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <Link href="/auth/login" className="text-xs font-black text-[#0B192C] hover:text-[#003366] px-3 py-2 transition-colors">
                Sign In
              </Link>
              <Link href="/auth/register">
                <LuxuryButton variant="navy" size="sm">
                  Sign Up
                </LuxuryButton>
              </Link>
              <Link href="/book/ride">
                <LuxuryButton variant="lemon" size="sm" icon={<ArrowRight className="w-3.5 h-3.5" />}>
                  Book a Ride
                </LuxuryButton>
              </Link>
            </div>

            {/* Mobile Header Action Toggle */}
            <div className="flex lg:hidden items-center gap-1.5 sm:gap-2 shrink-0">
              <button
                type="button"
                onClick={() => handleMobileNavigate('/book/ride')}
                className="hidden sm:inline-flex"
              >
                <LuxuryButton variant="lemon" size="sm">
                  Book
                </LuxuryButton>
              </button>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                aria-label="Toggle navigation menu"
                className="p-2 sm:p-2.5 rounded-xl bg-[#0B192C] text-white hover:bg-[#003366] transition-colors focus:outline-none cursor-pointer shrink-0"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6 text-[#9BC800]" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-white" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-white border-b-2 border-[#0B192C]/10 shadow-2xl overflow-hidden text-[#0E1726]"
          >
            <div className="px-5 py-6 space-y-1.5">
              {navLinks.map((link, idx) => {
                const isActive = pathname === link.href;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleMobileNavigate(link.href)}
                    className={`w-full text-left block px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                      isActive
                        ? 'bg-[#003366]/10 text-[#003366] border-l-4 border-[#9BC800] font-black'
                        : 'text-[#0B192C] hover:bg-[#F4F6F9]'
                    }`}
                  >
                    {link.name}
                  </button>
                );
              })}

              <div className="pt-4 border-t border-slate-200 space-y-3">
                <button
                  type="button"
                  onClick={() => handleMobileNavigate('/account')}
                  className="w-full text-center block text-xs font-extrabold text-[#003366] hover:text-[#9BC800] py-1 transition-colors"
                >
                  My Account
                </button>
                <div className="grid grid-cols-2 gap-3">
                  <button type="button" onClick={() => handleMobileNavigate('/auth/login')} className="w-full">
                    <LuxuryButton variant="dark" size="sm" className="w-full justify-center">
                      Sign In
                    </LuxuryButton>
                  </button>
                  <button type="button" onClick={() => handleMobileNavigate('/auth/register')} className="w-full">
                    <LuxuryButton variant="navy" size="sm" className="w-full justify-center">
                      Register
                    </LuxuryButton>
                  </button>
                </div>
                <button type="button" onClick={() => handleMobileNavigate('/book/ride')} className="w-full">
                  <LuxuryButton variant="lemon" size="lg" className="w-full justify-center">
                    Book a Ride
                  </LuxuryButton>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
