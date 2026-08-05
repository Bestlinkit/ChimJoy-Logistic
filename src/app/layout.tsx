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
  metadataBase: new URL('https://chimjoylogistics.com.ng'),
  title: {
    default: 'ChimJoy Car Hire | Premier Mobility & Airport Transfers in Owerri, Nigeria',
    template: '%s | ChimJoy Car Hire',
  },
  description:
    'Executive vehicle hire, airport transfers at Sam Mbakwe International Cargo Airport (QOW), intercity luxury transport, and armed security escorts across Imo State and Southeast Nigeria.',
  keywords: [
    'ChimJoy Car Hire',
    'Owerri car rental',
    'Sam Mbakwe airport transfer',
    'luxury vehicle hire Nigeria',
    'armed police escort Owerri',
    'ChimJoy Logistics',
    'Imo State car hire',
    'executive chauffeur Nigeria',
  ],
  authors: [
    { name: 'ChimJoy Logistics Services Ltd' },
    { name: 'Bestlink Digital Tech', url: 'https://bestlinkdigitaltech.online' },
  ],
  creator: 'Bestlink Digital Tech',
  publisher: 'ChimJoy Logistics Services Ltd',
  verification: {
    google: 'ENEEgJfaocb3mlFUp3YUg52eFZeF2Zun0jfEaR45M6c',
  },
  alternates: {
    canonical: 'https://chimjoylogistics.com.ng',
  },
  openGraph: {
    type: 'website',
    locale: 'en_NG',
    url: 'https://chimjoylogistics.com.ng',
    siteName: 'ChimJoy Car Hire & Logistics Services Ltd',
    title: 'ChimJoy Car Hire | Premier Mobility & Airport Transfers in Owerri, Nigeria',
    description:
      'Executive vehicle hire, airport transfers at Sam Mbakwe International Cargo Airport (QOW), intercity luxury transport, and armed security escorts across Imo State and Southeast Nigeria.',
    images: [
      {
        url: 'https://chimjoylogistics.com.ng/images/luxury_executive_suv_prado.png',
        width: 1200,
        height: 630,
        alt: 'ChimJoy Logistics Executive Vehicle Fleet in Owerri',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ChimJoy Car Hire | Premier Mobility & Airport Transfers in Owerri',
    description:
      'Executive vehicle hire and Sam Mbakwe QOW airport transfers across Imo State and Southeast Nigeria.',
    images: ['https://chimjoylogistics.com.ng/images/luxury_executive_suv_prado.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLdData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://chimjoylogistics.com.ng/#organization',
      name: 'ChimJoy Logistics Services Ltd',
      url: 'https://chimjoylogistics.com.ng',
      logo: 'https://chimjoylogistics.com.ng/images/logo.png',
      email: 'hq@chimjoylogistics.com.ng',
      telephone: '+2348077880262',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '56 Christ Church Road',
        addressLocality: 'Owerri',
        addressRegion: 'Imo State',
        addressCountry: 'NG',
      },
      creator: {
        '@type': 'Organization',
        name: 'Bestlink Digital Tech',
        url: 'https://bestlinkdigitaltech.online',
      },
    },
    {
      '@type': ['LocalBusiness', 'TransportationService', 'AutoRental'],
      '@id': 'https://chimjoylogistics.com.ng/#localbusiness',
      name: 'ChimJoy Car Hire & Logistics',
      url: 'https://chimjoylogistics.com.ng',
      telephone: '+2348077880262',
      email: 'hq@chimjoylogistics.com.ng',
      priceRange: '₦₦₦',
      image: 'https://chimjoylogistics.com.ng/images/luxury_executive_suv_prado.png',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '56 Christ Church Road',
        addressLocality: 'Owerri',
        addressRegion: 'Imo State',
        addressCountry: 'NG',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 5.4833,
        longitude: 7.0333,
      },
      areaServed: [
        'Owerri',
        'Sam Mbakwe International Cargo Airport (QOW)',
        'Imo State',
        'Port Harcourt',
        'Aba',
        'Enugu',
        'South-East Nigeria',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://chimjoylogistics.com.ng/#website',
      url: 'https://chimjoylogistics.com.ng',
      name: 'ChimJoy Car Hire',
      publisher: {
        '@id': 'https://chimjoylogistics.com.ng/#organization',
      },
      copyrightHolder: {
        '@id': 'https://chimjoylogistics.com.ng/#organization',
      },
      creator: {
        '@type': 'Organization',
        name: 'Bestlink Digital Tech',
        url: 'https://bestlinkdigitaltech.online',
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${jakarta.variable} ${outfit.variable} scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
      </head>
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
