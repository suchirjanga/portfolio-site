import type { MetadataRoute } from 'next';
import { getSettings } from '@/lib/settings';

export default function robots(): MetadataRoute.Robots {
  const { siteUrl } = getSettings();

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/api/'],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
