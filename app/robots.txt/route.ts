import { getGlobalSEO } from '@/lib/api/pages';

export async function GET() {
  try {
    const globalSEO = await getGlobalSEO();
    
    // If Django returns custom robots.txt content, serve it raw
    if (globalSEO?.robotsTxtContent) {
      return new Response(globalSEO.robotsTxtContent, {
        headers: {
          'Content-Type': 'text/plain',
          'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        },
      });
    }
  } catch (error) {
    console.error('Failed to fetch Global SEO for robots.txt:', error);
  }

  // Fallback if API fails
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://yummyever.com';
  const defaultRobots = `User-agent: *
Allow: /
Disallow: /private/

Sitemap: ${baseUrl}/sitemap.xml`;

  return new Response(defaultRobots, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
