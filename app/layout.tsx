import type { Metadata } from 'next';
import { Cormorant_Garamond, Marcellus_SC } from 'next/font/google';
import './globals.css';
import { Header } from '@/src/components/header';
import { Footer } from '@/src/components/footer';
import { SchemaScript } from '@/src/components/schema-script';
import { IntroSplash } from '@/src/components/intro-splash';
import { SITE_URL } from '@/src/lib/constants';

const marcellus = Marcellus_SC({
  subsets: ['latin'],
  variable: '--font-marcellus',
  weight: ['400']
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['400', '500', '600', '700']
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'The Jazz Coasters | Cincinnati Swing Dance Band',
    template: '%s | The Jazz Coasters'
  },
  description:
    "Cincinnati's premiere swing dance band for weddings, private events, dance socials, and vintage jazz experiences.",
  alternates: { canonical: '/' },
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/apple-icon.png'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${marcellus.variable} ${cormorant.variable} font-[var(--font-cormorant)]`}>
        <SchemaScript />
        <IntroSplash />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
