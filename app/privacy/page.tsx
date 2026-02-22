import type { Metadata } from 'next';
import Link from 'next/link';
import { SOCIAL_PREVIEW_IMAGE } from '@/src/lib/constants';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Learn how The Jazz Coasters collect, use, and retain contact form information for booking inquiries.',
  openGraph: {
    title: 'The Jazz Coasters Privacy Policy',
    description:
      'How we collect, use, and retain personal information submitted through booking inquiry forms.',
    url: '/privacy',
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
    title: 'The Jazz Coasters Privacy Policy',
    description:
      'How we collect, use, and retain personal information submitted through booking inquiry forms.',
    images: [SOCIAL_PREVIEW_IMAGE]
  },
  alternates: { canonical: '/privacy' }
};

export default function PrivacyPage() {
  return (
    <main className="space-y-6 !max-w-none">
      <div className="mx-auto w-full max-w-5xl space-y-6">
        <section className="gatsby-panel space-y-4 rounded-xl p-6 sm:p-8">
          <h1 className="text-3xl sm:text-4xl">Privacy Policy</h1>
          <p className="text-sm text-stone-300">Last updated: February 22, 2026</p>
          <p className="text-stone-200">
            This page explains how The Jazz Coasters handle personal information submitted through our website booking
            form.
          </p>
        </section>

        <section className="gatsby-panel space-y-3 rounded-xl p-6 sm:p-8">
          <h2 className="text-2xl">Information We Collect</h2>
          <p className="text-stone-200">
            When you submit our contact form, we may collect your name, email address, phone number, event details,
            event date, venue information, and any message content you provide.
          </p>
        </section>

        <section className="gatsby-panel space-y-3 rounded-xl p-6 sm:p-8">
          <h2 className="text-2xl">How We Use Information</h2>
          <p className="text-stone-200">
            We use this information only to respond to inquiries, provide pricing and availability, and follow up about
            potential bookings.
          </p>
        </section>

        <section className="gatsby-panel space-y-3 rounded-xl p-6 sm:p-8">
          <h2 className="text-2xl">Retention Plan</h2>
          <p className="text-stone-200">
            We retain inquiry submissions for up to 24 months to manage ongoing and repeat booking requests. We may keep
            records longer when needed for active client relationships or legal/business requirements.
          </p>
        </section>

        <section className="gatsby-panel space-y-3 rounded-xl p-6 sm:p-8">
          <h2 className="text-2xl">Third-Party Services</h2>
          <p className="text-stone-200">
            Our contact form emails are sent using Resend. Your submitted information is processed by this provider only
            for message delivery.
          </p>
        </section>

        <section className="gatsby-panel space-y-3 rounded-xl p-6 sm:p-8">
          <h2 className="text-2xl">Your Choices</h2>
          <p className="text-stone-200">
            To request that we delete your prior contact submission, email us at{' '}
            <a
              href="mailto:thejazzcoasters@gmail.com"
              className="text-gold-200 underline decoration-gold-400/70 underline-offset-4 hover:text-white"
            >
              thejazzcoasters@gmail.com
            </a>
            .
          </p>
          <p className="text-stone-300">
            Return to the{' '}
            <Link href="/contact" className="text-gold-200 underline decoration-gold-400/70 underline-offset-4 hover:text-white">
              booking form
            </Link>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
