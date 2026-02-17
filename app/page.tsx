import type { Metadata } from 'next';

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
  title: 'Home',
  description: 'Live vintage jazz and swing entertainment for weddings, parties, dance nights, and festivals.',
  alternates: { canonical: '/' }
};

function ListSection({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="rounded-lg border border-gold-400/25 bg-black/40 p-5">
      <h2 className="mb-4 font-[var(--font-cinzel)] text-2xl">{title}</h2>
      <ul className="space-y-2 text-sm text-stone-200 sm:text-base">
        {items.map((item) => (
          <li key={item}>• {item}</li>
        ))}
      </ul>
    </section>
  );
}

export default function HomePage() {
  return (
    <main className="space-y-10">
      <section className="space-y-4">
        <h1 className="font-[var(--font-cinzel)] text-3xl sm:text-4xl">Cincinnati&apos;s Premiere Swing Dance Band</h1>
        <p className="max-w-3xl text-stone-200">
          Bringing high-energy vintage jazz to dance floors, festivals, weddings, and unforgettable private events.
        </p>
        <div className="overflow-hidden rounded-lg border border-gold-400/20">
          <div className="relative w-full pb-[56.25%]">
            <iframe
              className="absolute left-0 top-0 h-full w-full"
              src="https://www.youtube.com/embed/HKjwUuhrN5g"
              title="The Jazz Coasters video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>
      </section>
      <section className="grid gap-6 md:grid-cols-3">
        <ListSection title="Music Styles" items={musicStyles} />
        <ListSection title="Services" items={services} />
        <ListSection title="Past Clients" items={pastClients} />
      </section>
    </main>
  );
}
