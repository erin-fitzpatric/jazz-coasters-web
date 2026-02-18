import type { Metadata } from 'next';
import { Cinzel, Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/src/components/header';
import { Footer } from '@/src/components/footer';
import { SchemaScript } from '@/src/components/schema-script';
import { SITE_URL } from '@/src/lib/constants';

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  weight: ['400', '600', '700']
});

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'The Jazz Coasters | Cincinnati Swing Dance Band',
    template: '%s | The Jazz Coasters'
  },
  description:
    "Cincinnati's premiere swing dance band for weddings, private events, dance socials, and vintage jazz experiences.",
  alternates: { canonical: '/' }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${cinzel.variable} ${inter.variable} font-[var(--font-inter)]`}>
        <SchemaScript />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
