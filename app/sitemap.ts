import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://yummyever.com';
  const currentDate = new Date();

  // Core pages
  const routes = [
    '',
    '/features',
    '/pricing',
    '/contact',
    '/about',
    '/blog',
    '/faq',
    '/terms-and-conditions',
    '/privacy-policy',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  return routes;
}
