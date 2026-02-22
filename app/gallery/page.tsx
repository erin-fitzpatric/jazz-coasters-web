import type { Metadata } from 'next';
import { GalleryGrid } from '@/src/components/gallery-grid';
import { SOCIAL_PREVIEW_IMAGE } from '@/src/lib/constants';

export const metadata: Metadata = {
  title: 'Photo Gallery',
  description:
    'Browse live performance photos and behind-the-scenes moments from The Jazz Coasters at events and dance nights.',
  openGraph: {
    title: 'The Jazz Coasters Photo Gallery',
    description:
      'Performance photos and band moments from weddings, dance socials, and live jazz events.',
    url: '/gallery',
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
    title: 'The Jazz Coasters Photo Gallery',
    description:
      'Performance photos and band moments from weddings, dance socials, and live jazz events.',
    images: [SOCIAL_PREVIEW_IMAGE]
  },
  alternates: { canonical: '/gallery' }
};

export default function GalleryPage() {
  return (
    <main className="space-y-6 !max-w-none">
      <div className="mx-auto w-full max-w-[88rem] space-y-6">
        <section className="gatsby-panel rounded-xl p-4">
          <h1 className="text-3xl sm:text-4xl">Gallery</h1>
          <p className="mb-4 mt-3 text-stone-200">
            Photos from The Jazz Coasters performing at weddings, private events, festivals, and swing dance nights.
          </p>
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
