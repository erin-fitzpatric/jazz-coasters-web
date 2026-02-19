import type { Metadata } from 'next';
import { GalleryGrid } from '@/src/components/gallery-grid';

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Browse performance photos and moments from The Jazz Coasters.',
  alternates: { canonical: '/gallery' }
};

export default function GalleryPage() {
  return (
    <main className="space-y-6 !max-w-none">
      <div className="mx-auto w-full max-w-[88rem] space-y-6">
        <section className="gatsby-panel rounded-xl p-4">
          <h1 className="sr-only">Gallery</h1>
          <GalleryGrid />
        </section>
        <div>
          <a
            href="https://www.instagram.com/thejazzcoasters/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex rounded border border-gold-300/90 bg-gold-300 px-5 py-3 font-semibold uppercase tracking-[0.12em] text-black hover:bg-gold-200"
          >
            See more on Instagram
          </a>
        </div>
      </div>
    </main>
  );
}

