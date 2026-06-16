import { MetadataRoute } from 'next';
import { getBlogPosts } from '@/lib/api/pages';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://yummyever.com';
  const currentDate = new Date();

  // Core pages
  const coreRoutes = [
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

  // Fetch all blog posts dynamically
  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const blogData = await getBlogPosts();
    if (blogData && blogData.posts) {
      blogRoutes = blogData.posts.map((post) => {
        // Attempt to parse the API date or fallback to current date
        const postDate = post.date ? new Date(post.date) : currentDate;
        return {
          url: `${baseUrl}/blog/${post.slug}`,
          lastModified: isNaN(postDate.getTime()) ? currentDate : postDate,
          changeFrequency: 'monthly' as const,
          priority: 0.7,
        };
      });
    }
  } catch (error) {
    console.error('Failed to fetch blog posts for sitemap:', error);
  }

  return [...coreRoutes, ...blogRoutes];
}
