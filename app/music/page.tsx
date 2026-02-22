import type { Metadata } from 'next';
import Link from 'next/link';
import { musicVideos } from '@/src/content/musicVideos';
import { SOCIAL_PREVIEW_IMAGE } from '@/src/lib/constants';

export const metadata: Metadata = {
  title: 'Live Performance Videos',
  description:
    'Watch live performance videos from The Jazz Coasters featuring vintage jazz, swing standards, and dance favorites.',
  openGraph: {
    title: 'The Jazz Coasters Music Videos',
    description:
      'Featured live videos from The Jazz Coasters, a Cincinnati swing and vintage jazz band.',
    url: '/music',
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
    title: 'The Jazz Coasters Music Videos',
    description:
      'Featured live videos from The Jazz Coasters, a Cincinnati swing and vintage jazz band.',
    images: [SOCIAL_PREVIEW_IMAGE]
  },
  alternates: { canonical: '/music' }
};

export default function MusicPage() {
  return (
    <main className="space-y-6 !max-w-none">
      <div className="mx-auto w-full max-w-[88rem]">
        <div className="grid gap-6">
          <section className="gatsby-panel rounded-xl p-6 sm:p-8">
            <h1 className="text-3xl sm:text-4xl">Music</h1>
            <p className="mt-3 text-stone-200">
              Watch featured live performances from The Jazz Coasters. Looking for live music for your event? Visit our{' '}
              <Link href="/contact" className="text-gold-200 underline decoration-gold-400/70 underline-offset-4 hover:text-white">
                contact page
              </Link>{' '}
              to check availability.
            </p>
          </section>
          {musicVideos.map((video) => (
            <article key={video.id} className="gatsby-panel overflow-hidden rounded-xl p-4">
              <div className="gatsby-frame relative mx-auto w-full max-w-6xl overflow-hidden rounded-lg pb-[56.25%]">
                <iframe
                  className="absolute left-0 top-0 h-full w-full"
                  src={`https://www.youtube.com/embed/${video.id}`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
