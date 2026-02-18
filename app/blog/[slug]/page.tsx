import { getBlogPost } from '@/lib/api/pages'
import { Metadata } from 'next'
import { BlogPostClient } from '@/components/sections/BlogPostClient'
import { Navbar, Footer } from '@/components/layout'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params

  try {
    const post = await getBlogPost(slug)

    return {
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt,
      keywords: post.keywords,
      openGraph: {
        title: post.metaTitle || post.title,
        description: post.metaDescription || post.excerpt,
        type: 'article',
        publishedTime: post.date,
        images: [
          {
            url: post.imageUrl,
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: post.metaTitle || post.title,
        description: post.metaDescription || post.excerpt,
        images: [post.imageUrl],
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

    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      image: [post.imageUrl],
      datePublished: post.date,
      description: post.metaDescription || post.excerpt,
      author: {
        '@type': 'Organization',
        name: 'Yummy POS',
        url: 'https://yummypos.com',
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
