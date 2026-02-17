import type { Metadata } from 'next';
import { musicVideos } from '@/src/content/musicVideos';

export const metadata: Metadata = {
  title: 'Music',
  description: 'Watch featured performance videos from The Jazz Coasters.',
  alternates: { canonical: '/music' }
};

export default function MusicPage() {
  return (
    <main className="space-y-6">
      <h1 className="font-[var(--font-cinzel)] text-3xl sm:text-4xl">Music</h1>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {musicVideos.map((video) => (
          <article key={video.id} className="overflow-hidden rounded-lg border border-gold-400/30 bg-black/40">
            <div className="relative w-full pb-[56.25%]">
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
    </main>
  );
}
