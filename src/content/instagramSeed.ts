import type { InstagramMediaItem } from '@/src/types/instagram';

const placeholder = '/ig/placeholder.svg';

export const instagramSeed: InstagramMediaItem[] = Array.from({ length: 9 }).map((_, index) => ({
  id: `seed-${index + 1}`,
  media_type: 'IMAGE',
  media_url: placeholder,
  permalink: 'https://www.instagram.com/thejazzcoasters/',
  caption: 'Instagram feed placeholder'
}));
