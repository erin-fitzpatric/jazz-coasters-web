import type { Metadata } from 'next';

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
      'I hired The Jazz Coasters to play at the reception for my Mother’s funeral. Yes, you read that right. She loved music and we’re a music family so I wanted something special to give her a proper send off. The Jazz Coasters totally delivered with New Orleans second line songs, gospel, Dixieland and traditional jazz with soulful energy and respect that the day called for. It set the perfect tone for what we wanted.\nI knew Erin “got it” as for what I was looking for when we connected and he was in NOLA gigging on vacation- that says a lot! I highly recommend them for their talent, versatility and the joy of the music they hold as a high standard for their trade. 100% would hire them again.',
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
    <main className="space-y-10">
      <section className="space-y-4">
        <h1 className="font-[var(--font-cinzel)] text-3xl sm:text-4xl">Biography</h1>
        <p className="whitespace-pre-line text-stone-200">
          {`The Jazz Coasters is Cincinnati's premiere swing dance band, comprised of some of the most in demand musicians in the Tri-State. They bring the party to the dance floor with a blend of vintage swing, New Orleans Jazz, and pop covers.
The Jazz Coasters perform regularly at private and public events throughout the region. Notable performances include Netflix's "Say I Do" Season 1: Ep. 5, opening act for Big Bad Voodoo Daddy at Memorial Hall, Hotel Covington Christmas and Repeal Prohibition Party, CincyHop 2017, 2018, 2019, The Cincinnati Lindy Society, Roaring 20's NYE at Belterra Park Casino, SwinGallery,  Jingle Bal 2017, Miami Oxford Swing Syndicate, Gem City Swing, NAMI Southwest Ohio "Jazz, Joy, and a Starry Night", Molly Malones Covington's Repeal Day Party, and the Greenhills Summer Concert Series.
The band performs monthly at Japps OTR from 7-10pm. You can find details for upcoming performances here: https://www.thejazzcoasters.com/shows
For information about booking for swing dances, private events, festivals, weddings, filming, and more, e mail thejazzcoasters@gmail.com.`}
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-[var(--font-cinzel)] text-2xl">Reviews</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {reviews.map((review) => (
            <blockquote key={review.quote} className="rounded-lg border border-gold-400/30 bg-black/40 p-5">
              <p className="whitespace-pre-line text-stone-100">“{review.quote}”</p>
              <footer className="mt-4 text-sm text-gold-200">— {review.attribution}</footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-[var(--font-cinzel)] text-2xl">Musical Influences</h2>
        <p className="text-stone-200">
          The Jazz Coasters are inspired by artists such as: Sidney Bechet, Fletcher Henderson, Benny Goodman, Count
          Basie, Duke Ellington, Postmodern Jukebox, Louis Prima, Ella Fitzgerald, Louis Armstrong, Preservation Hall
          Jazz Band, The Hot Sardines, Big Bad Voodoo Daddy, Jon-Erik Kellso, The EarRegulars, New Orleans Swamp
          Donkeys, Shotgun Jazz Band, Muggsy Spanier, Fats Waller
        </p>
      </section>
    </main>
  );
}
