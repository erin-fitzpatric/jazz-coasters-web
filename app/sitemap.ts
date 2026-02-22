import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/src/lib/constants';

const routes: Array<{
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
}> = [
  { path: '/', priority: 1, changeFrequency: 'weekly' },
  { path: '/bio', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/music', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/shows', priority: 0.9, changeFrequency: 'daily' },
  { path: '/gallery', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/contact', priority: 0.8, changeFrequency: 'monthly' }
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return routes.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
    lastModified: now
  }));
}
