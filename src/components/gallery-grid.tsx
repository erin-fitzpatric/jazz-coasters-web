'use client';

import { useEffect, useState } from 'react';
import { instagramSeed } from '@/src/content/instagramSeed';
import type { InstagramMediaItem } from '@/src/types/instagram';

type InstagramResponse = {
  ok: boolean;
  items?: InstagramMediaItem[];
  error?: string;
};

export function GalleryGrid() {
  const [items, setItems] = useState<InstagramMediaItem[]>(instagramSeed);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadItems = async () => {
      try {
        const response = await fetch('/api/instagram');
        const data = (await response.json()) as InstagramResponse;

        if (response.ok && data.ok && data.items?.length) {
          setItems(data.items);
          setError(null);
          return;
        }
        setError(data.error ?? 'Instagram feed unavailable');
      } catch {
        setItems(instagramSeed);
        setError('Instagram feed unavailable');
      }
    };

    void loadItems();
  }, []);

  return (
    <>
      {error ? (
        <p className="mb-3 rounded border border-gold-400/40 bg-black/60 px-3 py-2 text-sm text-gold-200">
          Showing placeholders: {error}. Add `INSTAGRAM_ACCESS_TOKEN` in `.env.local` and restart `pnpm dev`.
        </p>
      ) : null}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {items.map((item) => {
          if (item.media_type === 'VIDEO') {
            return (
              <div key={item.id} className="gatsby-frame group overflow-hidden rounded-lg bg-black/40">
              <video
                src={item.media_url}
                poster={item.thumbnail_url}
                className="aspect-square h-full w-full object-cover transition group-hover:scale-105"
                controls
                muted
                loop
                playsInline
                preload="metadata"
                onMouseEnter={(event) => {
                  void event.currentTarget.play().catch(() => undefined);
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.pause();
                  event.currentTarget.currentTime = 0;
                }}
              />
                <a
                  href={item.permalink}
                  target="_blank"
                  rel="noreferrer"
                  className="block px-3 py-2 text-center text-xs uppercase tracking-[0.08em] text-gold-200 hover:text-white"
                >
                  Open on Instagram
                </a>
              </div>
            );
          }

          return (
            <a
              key={item.id}
              href={item.permalink}
              target="_blank"
              rel="noreferrer"
              className="gatsby-frame group overflow-hidden rounded-lg bg-black/40"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.thumbnail_url ?? item.media_url}
                alt={item.caption ?? 'Instagram post'}
                className="aspect-square h-full w-full object-cover transition group-hover:scale-105"
                loading="lazy"
              />
            </a>
          );
        })}
      </div>
    </>
  );
}
