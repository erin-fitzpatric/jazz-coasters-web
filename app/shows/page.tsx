import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shows',
  description: 'View upcoming Jazz Coasters performances in agenda calendar format.',
  alternates: { canonical: '/shows' }
};

export default function ShowsPage() {
  return (
    <main className="space-y-6">
      <h1 className="font-[var(--font-cinzel)] text-3xl sm:text-4xl">Shows</h1>
      <div className="overflow-hidden rounded-lg border border-gold-400/30 bg-black/40">
        <iframe
          src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=America%2FNew_York&mode=AGENDA&showPrint=0&title=Jazz%20Coasters%20Schedule&src=dGhlamF6emNvYXN0ZXJzQGdtYWlsLmNvbQ&color=%23039be5"
          className="h-[70vh] min-h-[600px] w-full"
          title="Jazz Coasters schedule"
        />
      </div>
    </main>
  );
}
