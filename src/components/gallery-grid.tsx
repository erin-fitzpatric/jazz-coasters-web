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

  useEffect(() => {
    const loadItems = async () => {
      try {
        const response = await fetch('/api/instagram');
        const data = (await response.json()) as InstagramResponse;

        if (response.ok && data.ok && data.items?.length) {
          setItems(data.items);
        }
      } catch {
        setItems(instagramSeed);
      }
    };

    void loadItems();
  }, []);

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {items.map((item) => (
        <a
          key={item.id}
          href={item.permalink}
          target="_blank"
          rel="noreferrer"
          className="group overflow-hidden rounded-lg border border-gold-400/30 bg-black/30"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.thumbnail_url ?? item.media_url}
            alt={item.caption ?? 'Instagram post'}
            className="aspect-square h-full w-full object-cover transition group-hover:scale-105"
            loading="lazy"
          />
        </a>
      ))}
    </div>
  );
}
