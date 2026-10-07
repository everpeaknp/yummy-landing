import { getBlogPost } from '@/lib/api/pages'
import { Metadata } from 'next'
import { BlogPostClient } from '@/components/sections/BlogPostClient'
import { Navbar, Footer } from '@/components/layout'

type Props = {
  params: Promise<{ slug: string }>
}

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.yummyever.com'

function toAbsoluteUrl(url?: string): string {
  if (!url) return `${baseUrl}/images/Everacy_logo_withbg.png`
  if (url.startsWith('http://') || url.startsWith('https://')) return url
  return `${baseUrl}${url.startsWith('/') ? '' : '/'}${url}`
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params

  try {
    const post = await getBlogPost(slug)
    const absoluteImageUrl = toAbsoluteUrl(post.imageUrl)
    const imageAlt = `${post.title} - Yummy Manage Restaurant POS Software Nepal`

    return {
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt,
      keywords: post.keywords,
      openGraph: {
        title: post.metaTitle || post.title,
        description: post.metaDescription || post.excerpt,
        type: 'article',
        publishedTime: post.date,
        url: `${baseUrl}/blog/${slug}`,
        siteName: 'Yummy Manage',
        images: [
          {
            url: absoluteImageUrl,
            width: 1200,
            height: 630,
            alt: imageAlt,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: post.metaTitle || post.title,
        description: post.metaDescription || post.excerpt,
        images: [absoluteImageUrl],
      },
    }
  } catch (error) {
    return {
      title: 'Post Not Found | Yummy POS',
    }
  }
}

export default async function BlogPage({ params }: Props) {
  const { slug } = await params

  try {
    const post = await getBlogPost(slug)
    const absoluteImageUrl = toAbsoluteUrl(post.imageUrl)

    // Extract any images embedded inside CKEditor content for Google Image schema
    const contentImages: string[] = []
    if (post.content) {
      const imgRegex = /<img\b[^>]+src=["']([^"']+)["']/gi
      let match: RegExpExecArray | null
      while ((match = imgRegex.exec(post.content)) !== null) {
        if (match[1]) {
          contentImages.push(toAbsoluteUrl(match[1]))
        }
      }
    }

    const imageObjects = [
      {
        '@type': 'ImageObject',
        url: absoluteImageUrl,
        width: 1200,
        height: 630,
        caption: post.title,
        description: post.metaDescription || post.excerpt || post.title,
      },
      ...contentImages.map((imgUrl, idx) => ({
        '@type': 'ImageObject',
        url: imgUrl,
        caption: `${post.title} - Illustration ${idx + 1}`,
        description: `${post.title} cafe management workflow`,
      })),
    ]

    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      image: imageObjects,
      datePublished: post.date,
      dateModified: post.date,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${baseUrl}/blog/${slug}`,
      },
      description: post.metaDescription || post.excerpt,
      author: {
        '@type': 'Organization',
        name: 'Yummy Manage',
        url: baseUrl,
      },
      publisher: {
        '@type': 'Organization',
        name: 'Yummy Manage',
        url: baseUrl,
        logo: {
          '@type': 'ImageObject',
          url: `${baseUrl}/images/Everacy_logo_withbg.png`,
        },
      },
    }

    return <BlogPostClient post={post} jsonLd={jsonLd} slug={slug} />
  } catch (error) {
    return (
      <>
        <Navbar />
        <main className="pt-32 min-h-screen flex items-center justify-center bg-white dark:bg-black text-black dark:text-white">
          <h1 className="text-2xl font-bold">Post Not Found</h1>
        </main>
        <Footer />
      </>
    )
  }
}
