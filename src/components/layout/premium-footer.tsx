'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone, Mail, MapPin, Shield } from 'lucide-react';

export const PremiumFooter = () => {
  const pathname = usePathname();
  if (pathname?.startsWith('/admin')) return null;
  return (
    <footer className="bg-[#0B192C] text-white border-t border-white/10 pt-14 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* About Column with Large White & Lemon Footer Logo (No White Box) */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block group py-1">
              <img
                src="/images/logo-footer.png"
                alt="ChimJoy Logistics Services Ltd"
                className="h-14 sm:h-16 w-auto object-contain filter drop-shadow-sm group-hover:scale-105 transition-transform"
              />
            </Link>

            <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
              ChimJoy Logistics Services Ltd is a subsidiary of ChimJoy Limited., providing airport pickup, executive transportation, car hire and logistics services in Owerri and across South-East Nigeria.
            </p>

            <div className="text-xs text-[#9BC800] font-bold flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#9BC800]" />
              <span>Committed to Positive & Responsive Logistics Services</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3 text-xs">
            <h4 className="font-display font-extrabold text-[#9BC800] uppercase tracking-wider text-xs">Quick Links</h4>
            <ul className="space-y-2 text-slate-300 font-semibold">
              <li><Link href="/" className="hover:text-[#9BC800] transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-[#9BC800] transition-colors">About Us</Link></li>
              <li><Link href="/book/ride" className="hover:text-[#9BC800] transition-colors">Ride Booking</Link></li>
              <li><Link href="/book/hire" className="hover:text-[#9BC800] transition-colors">Car Hire</Link></li>
              <li><Link href="/services/airport-transfers" className="hover:text-[#9BC800] transition-colors">Airport Pickup</Link></li>
              <li><Link href="/book/ride" className="hover:text-[#9BC800] transition-colors">Logistics</Link></li>
              <li><Link href="/contact" className="hover:text-[#9BC800] transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-3 text-xs">
            <h4 className="font-display font-extrabold text-[#9BC800] uppercase tracking-wider text-xs">Services</h4>
            <ul className="space-y-2 text-slate-300 font-semibold">
              <li><Link href="/services/airport-transfers" className="hover:text-[#9BC800] transition-colors">Airport Pickup</Link></li>
              <li><Link href="/book/ride" className="hover:text-[#9BC800] transition-colors">Executive Ride</Link></li>
              <li><Link href="/book/hire" className="hover:text-[#9BC800] transition-colors">Car Hire</Link></li>
              <li><Link href="/book/ride" className="hover:text-[#9BC800] transition-colors">Logistics</Link></li>
              <li><Link href="/book/ride" className="hover:text-[#9BC800] transition-colors">Corporate Transportation</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3 text-xs">
            <h4 className="font-display font-extrabold text-[#9BC800] uppercase tracking-wider text-xs">Contact</h4>
            <div className="space-y-2.5 text-slate-300 font-semibold">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#9BC800] shrink-0 mt-0.5" />
                <span>Office: 56 Christ Church Road, Owerri, Imo State, Nigeria.</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#9BC800] shrink-0" />
                <span>Phone: +234 807 788 0262</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#9BC800] shrink-0" />
                <span>Email: hq@chimjoylogistics.com.ng</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-3">
          <p>© 2026 ChimJoy Logistics Services Ltd. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
