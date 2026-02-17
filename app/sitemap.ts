import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/src/lib/constants';

const routes = ['/', '/bio', '/music', '/shows', '/gallery', '/contact'];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    changeFrequency: 'monthly',
    priority: route === '/' ? 1 : 0.8
  }));
}
