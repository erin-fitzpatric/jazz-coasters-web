import type { Metadata } from 'next';
import { musicVideos } from '@/src/content/musicVideos';

export const metadata: Metadata = {
  title: 'Music',
  description: 'Watch featured performance videos from The Jazz Coasters.',
  alternates: { canonical: '/music' }
};

export default function MusicPage() {
  return (
    <main className="space-y-6 !max-w-none">
      <div className="mx-auto w-full max-w-[88rem]">
        <div className="grid gap-6">
          <h1 className="sr-only">Music</h1>
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

