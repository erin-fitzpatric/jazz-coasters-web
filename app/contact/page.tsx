import type { Metadata } from 'next';
import { ContactForm } from '@/src/components/contact-form';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Request a quote for your event from The Jazz Coasters.',
  alternates: { canonical: '/contact' }
};

export default function ContactPage() {
  return (
    <main className="space-y-6">
      <h1 className="font-[var(--font-cinzel)] text-3xl sm:text-4xl">CONTACT US - Get a Quote!</h1>
      <p className="text-stone-200">Thanks for your interest in The Jazz Coasters!</p>
      <ContactForm />
    </main>
  );
}
