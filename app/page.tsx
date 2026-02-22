import type { Metadata } from 'next';
import Link from 'next/link';
import { SOCIAL_PREVIEW_IMAGE } from '@/src/lib/constants';

const musicStyles = [
  "Roaring 20's Jazz",
  'Swing',
  'New Orleans Jazz',
  'Hot Jazz',
  'Dixieland',
  'Traditional Jazz',
  'Big Band',
  'West Coast Swing',
  'Blues',
  'Balboa',
  'Pop Covers (Postmodern Jukebox)'
];

const services = [
  "Roaring 20's Parties",
  'Weddings',
  'House Parties',
  'Private Parties',
  'Corporate Events',
  'Cocktail Hours',
  'Vintage Films',
  'Gatsby Parties',
  'Second Line Parades',
  'Swing Dances',
  'Music Festivals',
  'Mardi Gras Celebrations',
  'Repeal Prohibition Parties',
  'New Orleans Funerals'
];

const pastClients = [
  'Netflix Series "Say I Do"',
  "Jeff Ruby's",
  'Cincinnati Symphony Orchestra',
  'Cincinnati Art Museum',
  'Belterra Park',
  'Memorial Hall',
  'Hilton Netherlands',
  'Hotel Covington',
  "The Baker's Table",
  "Arnold's Bar and Grill",
  "Japp's Since 1879",
  "Molly Malone's",
  "Bloom's and Berries Farm",
  'SwinGallery',
  'CincyHop',
  'Gem City Swing',
  'Miami University'
];

export const metadata: Metadata = {
  title: 'Cincinnati Swing Band for Weddings, Events, and Dance Nights',
  description:
    'The Jazz Coasters bring live vintage jazz and swing music to Cincinnati weddings, private events, festivals, and dance socials.',
  openGraph: {
    siteName: 'The Jazz Coasters',
    title: 'The Jazz Coasters | Cincinnati Swing Band',
    description:
      'Live vintage jazz and swing band for Cincinnati weddings, private events, festivals, and dance socials.',
    url: '/',
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
    title: 'The Jazz Coasters | Cincinnati Swing Band',
    description:
      'Live vintage jazz and swing band for Cincinnati weddings, private events, festivals, and dance socials.',
    images: [SOCIAL_PREVIEW_IMAGE]
  },
  alternates: { canonical: '/' }
};

function ListSection({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="gatsby-panel rounded-lg p-5">
      <h2 className="mb-4 text-2xl">{title}</h2>
      <ul className="space-y-2 text-sm text-stone-200 sm:text-base">
        {items.map((item) => (
          <li key={item}>&bull; {item}</li>
        ))}
      </ul>
    </section>
  );
}

export default function HomePage() {
  return (
    <main className="space-y-10 !max-w-none">
      <div className="mx-auto w-full max-w-[88rem]">
        <section className="gatsby-panel rounded-xl p-6 sm:p-8">
          <div className="grid items-center gap-6 md:grid-cols-[1.1fr_1fr]">
            <div className="space-y-4">
              <h1 className="text-3xl leading-tight sm:text-5xl">Cincinnati&apos;s Premiere Swing Band</h1>
              <p className="max-w-2xl text-lg text-stone-200">
                Bringing high-energy vintage jazz to dance floors, festivals, weddings, and unforgettable private events.
              </p>
              <p className="max-w-2xl text-stone-200">
                Explore upcoming{' '}
                <Link href="/shows" className="text-gold-200 underline decoration-gold-400/70 underline-offset-4">
                  shows
                </Link>{' '}
                , watch our{' '}
                <Link href="/music" className="text-gold-200 underline decoration-gold-400/70 underline-offset-4">
                  music videos
                </Link>
                , or request availability on our{' '}
                <Link href="/contact" className="text-gold-200 underline decoration-gold-400/70 underline-offset-4">
                  contact page
                </Link>
                .
              </p>
              <Link
                href="/contact"
                className="inline-flex rounded border border-gold-300/90 bg-gold-300 px-5 py-3 font-semibold uppercase tracking-[0.1em] text-black hover:bg-gold-200"
              >
                Get a Quote
              </Link>
            </div>
            <div className="overflow-hidden rounded-lg gatsby-frame">
              <div className="relative w-full pb-[56.25%]">
                <iframe
                  className="absolute left-0 top-0 h-full w-full"
                  src="https://www.youtube.com/embed/HKjwUuhrN5g?autoplay=1&mute=1&playsinline=1"
                  title="The Jazz Coasters video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="mx-auto w-full max-w-[88rem]">
        <section className="grid gap-6 md:grid-cols-3">
          <ListSection title="Music Styles" items={musicStyles} />
          <ListSection title="Services" items={services} />
          <ListSection title="Past Clients" items={pastClients} />
        </section>
      </div>
      <div className="mx-auto w-full max-w-5xl">
        <section className="rounded-xl border border-gold-400/30 bg-[#0f0c08]/80 px-6 py-5 text-center">
          <p className="font-[var(--font-marcellus)] text-lg uppercase tracking-[0.22em] text-gold-200">
            Roaring 20s energy for weddings, dance nights, and Gatsby-style parties
          </p>
        </section>
      </div>
    </main>
  );
}
