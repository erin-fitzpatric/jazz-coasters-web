import type { Metadata } from 'next';
import { ContactForm } from '@/src/components/contact-form';

export const metadata: Metadata = {
  title: 'Book The Jazz Coasters',
  description:
    'Contact The Jazz Coasters to request pricing and availability for weddings, corporate events, festivals, and private parties.',
  openGraph: {
    title: 'Book The Jazz Coasters',
    description:
      'Request pricing and availability for live swing and vintage jazz music at your event.',
    url: '/contact'
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
        </section>
        <ContactForm />
      </div>
    </main>
  );
}
