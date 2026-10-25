import { MetadataRoute } from 'next';
import { getBlogPosts } from '@/lib/api/pages';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://yummyever.com';
  const currentDate = new Date();

  // Core pages
  const coreRoutes: MetadataRoute.Sitemap = [
    { route: '', img: `${baseUrl}/images/screen-2.jpg`, priority: 1.0 },
    { route: '/features', img: `${baseUrl}/images/screen-2.jpg`, priority: 0.9 },
    { route: '/pricing', img: `${baseUrl}/images/Everacy_logo_withbg.png`, priority: 0.9 },
    { route: '/contact', img: `${baseUrl}/images/Everacy_logo_withbg.png`, priority: 0.8 },
    { route: '/about', img: `${baseUrl}/images/Everacy_logo_withbg.png`, priority: 0.8 },
    { route: '/blog', img: `${baseUrl}/images/Everacy_logo_withbg.png`, priority: 0.8 },
    { route: '/faq', img: undefined, priority: 0.7 },
    { route: '/terms-and-conditions', img: undefined, priority: 0.5 },
    { route: '/privacy-policy', img: undefined, priority: 0.5 },
  ].map(({ route, img, priority }) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority,
    ...(img ? { images: [img] } : {}),
  }));

  // Fetch all blog posts dynamically
  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const blogData = await getBlogPosts();
    if (blogData && blogData.posts) {
      blogRoutes = blogData.posts.map((post) => {
        // Attempt to parse the API date or fallback to current date
        const postDate = post.date ? new Date(post.date) : currentDate;
        const absImg = post.imageUrl
          ? (post.imageUrl.startsWith('http')
              ? post.imageUrl
              : `${baseUrl}${post.imageUrl.startsWith('/') ? '' : '/'}${post.imageUrl}`)
          : undefined;

        return {
          url: `${baseUrl}/blog/${post.slug}`,
          lastModified: isNaN(postDate.getTime()) ? currentDate : postDate,
          changeFrequency: 'monthly' as const,
          priority: 0.8,
          ...(absImg ? { images: [absImg] } : {}),
        };
      });
    }
  } catch (error) {
    console.error('Failed to fetch blog posts for sitemap:', error);
  }

  return [...coreRoutes, ...blogRoutes];
}
