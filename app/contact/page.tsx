import type { Metadata } from 'next';
import Link from 'next/link';
import { ContactForm } from '@/src/components/contact-form';
import { SOCIAL_PREVIEW_IMAGE } from '@/src/lib/constants';

export const metadata: Metadata = {
  title: 'Book The Jazz Coasters',
  description:
    'Contact The Jazz Coasters to request pricing and availability for weddings, corporate events, festivals, and private parties.',
  openGraph: {
    siteName: 'The Jazz Coasters',
    title: 'Book The Jazz Coasters',
    description:
      'Request pricing and availability for live swing and vintage jazz music at your event.',
    url: '/contact',
    images: [
      {
        url: SOCIAL_PREVIEW_IMAGE,
        width: 1200,
        height: 1200,
        alt: 'The Jazz Coasters logo on black background'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Book The Jazz Coasters',
    description:
      'Request pricing and availability for live swing and vintage jazz music at your event.',
    images: [SOCIAL_PREVIEW_IMAGE]
  },
  alternates: { canonical: '/contact' }
};

export default function ContactPage() {
  return (
    <main className="space-y-6 !max-w-none">
      <div className="mx-auto w-full max-w-5xl space-y-6">
        <section className="gatsby-panel space-y-3 rounded-xl p-6 sm:p-8">
          <h1 className="text-3xl sm:text-4xl">Book The Jazz Coasters</h1>
          <p className="text-stone-200">
            Share a few details and we will follow up with availability and a tailored quote.
          </p>
          <p className="text-sm text-stone-300">
            By submitting this form, you agree to our{' '}
            <Link href="/privacy" className="text-gold-200 underline decoration-gold-400/70 underline-offset-4 hover:text-white">
              Privacy Policy
            </Link>
            .
          </p>
        </section>
        <ContactForm />
      </div>
    </main>
  );
}
