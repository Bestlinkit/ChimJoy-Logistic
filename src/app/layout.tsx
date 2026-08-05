import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Outfit } from 'next/font/google';
import './globals.css';
import { LuxuryNavbar } from '@/components/layout/luxury-navbar';
import { PremiumFooter } from '@/components/layout/premium-footer';
import { WhatsAppConcierge } from '@/components/layout/whatsapp-concierge';
import { CommandSearch } from '@/components/ui/command-search';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ChimJoy Car Hire | Premier Mobility & Airport Transfers in Owerri, Nigeria',
  description: 'Executive vehicle hire, airport transfers at Sam Mbakwe International Cargo Airport (QOW), intercity luxury transport, and armed security escorts across Imo State and Southeast Nigeria.',
  keywords: 'ChimJoy Car Hire, Owerri car rental, Sam Mbakwe airport transfer, luxury vehicle hire Nigeria, armed police escort Owerri, ChimJoy Logistics',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${jakarta.variable} ${outfit.variable} scroll-smooth`}>
      <body suppressHydrationWarning className="bg-[#FAFCFF] text-[#071325] antialiased selection:bg-[#D4AF37] selection:text-slate-950 flex flex-col min-h-screen">
        <LuxuryNavbar />
        <div className="flex-1">{children}</div>
        <PremiumFooter />
        <WhatsAppConcierge />
        <CommandSearch />
      </body>
    </html>
  );
}
