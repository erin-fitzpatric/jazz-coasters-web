import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

const reviews = [
  {
    quote:
      "The Jazz Coasters, fronted by Erin Fitzpatric, perform high-energy, toe tapping, you-can't-stay-seated Swing and Dixieland. Each musician is exceptional, the solos are awesome, and together they form a phenomenal band. The sheer joy of playing comes through.",
    attribution: 'Deanna R. (Private Wedding)'
  },
  {
    quote:
      'Everyone had been raving about this band and I kept missing their shows! I finally had the chance to see them tonight and was totally overwhelmed by how awesome they were! Thank you so much for an unforgettable night of dancing!',
    attribution: 'Hannah D. (Swing Dancer)'
  },
  {
    quote:
      'Great group. They played for our dance event and kept the energy high and displayed amazing musicianship throughout!',
    attribution: 'Jackson H. (Miami Swing Syndicate)'
  },
  {
    quote:
      "I hired The Jazz Coasters to play at the reception for my Mother's funeral. Yes, you read that right. She loved music and we're a music family so I wanted something special to give her a proper send off. The Jazz Coasters totally delivered with New Orleans second line songs, gospel, Dixieland and traditional jazz with soulful energy and respect that the day called for. It set the perfect tone for what we wanted.\n\nI knew Erin \"got it\" as for what I was looking for when we connected and he was in NOLA gigging on vacation- that says a lot! I highly recommend them for their talent, versatility and the joy of the music they hold as a high standard for their trade. 100% would hire them again.",
    attribution: 'Terry H. (New Orleans Funeral)'
  }
];

export const metadata: Metadata = {
  title: 'Bio',
  description: 'Read the band biography, reviews, and influences behind The Jazz Coasters.',
  alternates: { canonical: '/bio' }
};

export default function BioPage() {
  return (
    <main className="space-y-10 !max-w-none">
      <div className="mx-auto w-full max-w-[88rem]">
        <section className="gatsby-panel space-y-4 rounded-xl p-6 sm:p-8">
          <h1 className="text-3xl sm:text-4xl">Biography</h1>
          <div className="grid items-start gap-6 lg:grid-cols-[1.4fr_0.9fr]">
            <div className="space-y-4">
              <p className="text-stone-200">
                The Jazz Coasters is Cincinnati&apos;s premiere swing dance band, comprised of some of the most in demand
                musicians in the Tri-State. They bring the party to the dance floor with a blend of vintage swing, New
                Orleans Jazz, and pop covers.
              </p>
              <p className="text-stone-200">
                The Jazz Coasters perform regularly at private and public events throughout the region. Notable
                performances include Netflix&apos;s &quot;Say I Do&quot; Season 1: Ep. 5, opening act for Big Bad Voodoo
                Daddy at Memorial Hall, Cincinnati Music Hall, Cincinnati Art Museum, CincyHop, The Cincinnati Lindy
                Society, Belterra Park Casino, SwinGallery, Miami Oxford Swing Syndicate, Gem City Swing, and the Central
                Ohio Hot Jazz Society.
              </p>
              <p className="text-stone-200">
                You can find details for upcoming performances by visting our schedule{' '}
                <Link
                  href="/shows"
                  className="text-gold-200 underline decoration-gold-400/70 underline-offset-4 hover:text-white"
                >
                  here
                </Link>
              </p>
              <p className="text-stone-200">
                For information about booking for swing dances, private events, festivals, weddings, filming, and more,
                email{' '}
                <a
                  href="mailto:thejazzcoasters@gmail.com"
                  className="text-gold-200 underline decoration-gold-400/70 underline-offset-4 hover:text-white"
                >
                  thejazzcoasters@gmail.com
                </a>
                .
              </p>
            </div>
            <div className="gatsby-frame overflow-hidden rounded-lg lg:ml-auto lg:max-w-md">
              <Image
                src="/images/bio-band-photo-v2.jpg"
                alt="The Jazz Coasters performing live in an ornate ballroom"
                width={1600}
                height={1200}
                className="h-auto w-full object-cover"
                priority
              />
            </div>
          </div>
        </section>
      </div>

      <div className="mx-auto w-full max-w-[88rem]">
        <section className="space-y-4">
          <h2 className="text-2xl">Reviews</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {reviews.map((review) => (
              <blockquote key={review.quote} className="gatsby-panel rounded-lg p-5">
                <p className="whitespace-pre-line text-stone-100">&ldquo;{review.quote}&rdquo;</p>
                <footer className="mt-4 text-sm text-gold-200">- {review.attribution}</footer>
              </blockquote>
            ))}
          </div>
        </section>
      </div>

      <div className="mx-auto w-full max-w-5xl">
        <section className="gatsby-panel space-y-4 rounded-xl p-6 sm:p-8">
          <h2 className="text-2xl">Musical Influences</h2>
          <p className="text-stone-200">
            The Jazz Coasters are inspired by artists such as: Sidney Bechet, Fletcher Henderson, Benny Goodman, Count
            Basie, Duke Ellington, Postmodern Jukebox, Louis Prima, Ella Fitzgerald, Louis Armstrong, Preservation Hall
            Jazz Band, The Hot Sardines, Big Bad Voodoo Daddy, Jon-Erik Kellso, The EarRegulars, New Orleans Swamp
            Donkeys, Shotgun Jazz Band, Muggsy Spanier, Fats Waller
          </p>
        </section>
      </div>
    </main>
  );
}
