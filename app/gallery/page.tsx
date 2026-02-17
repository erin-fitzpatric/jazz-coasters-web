import type { Metadata } from 'next';
import { GalleryGrid } from '@/src/components/gallery-grid';

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Browse performance photos and moments from The Jazz Coasters.',
  alternates: { canonical: '/gallery' }
};

export default function GalleryPage() {
  return (
    <main className="space-y-6">
      <h1 className="font-[var(--font-cinzel)] text-3xl sm:text-4xl">Gallery</h1>
      <p className="text-stone-200">A live Instagram integration is coming soon. Explore recent highlights below.</p>
      <GalleryGrid />
      <a
        href="https://www.instagram.com/thejazzcoasters/"
        target="_blank"
        rel="noreferrer"
        className="inline-flex rounded bg-gold-300 px-5 py-3 font-semibold text-black hover:bg-gold-200"
      >
        See more on Instagram
      </a>
    </main>
  );
}
