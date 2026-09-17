'use client'

import { Navbar, Footer } from '@/components/layout'
import { useTheme } from '@/hooks/useTheme'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect, useCallback } from 'react'
import { getBlogPost, getBlogPosts, useRefetchOnFocus, type BlogPostDetail, type BlogPost } from '@/lib/api'
import { HTMLContent, InlineHTMLContent } from '@/components/ui/HTMLContent'

// Single-line class strings for prose styling - prevents hydration mismatch
const proseClasses =
  'max-w-none [&_h1]:text-4xl md:[&_h1]:text-5xl [&_h1]:font-black [&_h1]:font-display [&_h1]:mt-12 [&_h1]:mb-6 [&_h1]:leading-tight [&_h2]:text-3xl md:[&_h2]:text-4xl [&_h2]:font-black [&_h2]:font-display [&_h2]:mt-12 [&_h2]:mb-6 [&_h2]:leading-tight [&_h3]:text-2xl [&_h3]:font-bold [&_h3]:font-display [&_h3]:mt-10 [&_h3]:mb-4 [&_p]:text-lg [&_p]:leading-8 [&_p]:mb-8 [&_p]:text-gray-700 dark:[&_p]:text-gray-300 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-8 [&_li]:mb-3 [&_li]:leading-relaxed [&_li]:text-gray-700 dark:[&_li]:text-gray-300 [&_strong]:text-gray-900 dark:[&_strong]:text-white [&_strong]:font-bold [&_b]:text-gray-900 dark:[&_b]:text-white [&_b]:font-bold [&_a]:text-primary [&_a]:underline [&_a]:font-medium [&_a]:decoration-2 [&_a]:underline-offset-4'

// Internal type used for display
interface DisplayPost {
  slug: string
  title: string
  date: string
  image: string
  content: string
  keywords: string[]
}

interface BlogPostClientProps {
  post: BlogPostDetail
  jsonLd: any
  slug: string
}

export function BlogPostClient({ post: initialPost, jsonLd, slug }: BlogPostClientProps) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  // Convert BlogPostDetail to display format
  const [post, setPost] = useState<DisplayPost>({
    slug: initialPost.slug,
    title: initialPost.title,
    date: initialPost.date,
    image: initialPost.imageUrl,
    content: initialPost.content,
    keywords: initialPost.keywords 
      ? typeof initialPost.keywords === 'string'
        ? initialPost.keywords.split(',').map((k) => k.trim())
        : []
      : [],
  })

  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([])

  const fetchData = useCallback(async () => {
    try {
      const [apiPost, allPostsData] = await Promise.all([
        getBlogPost(slug),
        getBlogPosts()
      ])
      
      // Map API response (BlogPostDetail) to DisplayPost format
      setPost({
        slug: apiPost.slug,
        title: apiPost.title,
        date: apiPost.date,
        image: apiPost.imageUrl || initialPost.imageUrl,
        content: apiPost.content,
        keywords: apiPost.keywords
          ? typeof apiPost.keywords === 'string'
            ? apiPost.keywords.split(',').map((k) => k.trim())
            : apiPost.keywords
          : initialPost.keywords 
            ? typeof initialPost.keywords === 'string'
              ? initialPost.keywords.split(',').map((k) => k.trim())
              : initialPost.keywords
            : [],
      })

      if (allPostsData?.posts) {
        // Filter out current post and get up to 8 recent ones
        const filtered = allPostsData.posts.filter(p => p.slug !== slug).slice(0, 8)
        setRecentPosts(filtered)
      }
    } catch (error) {
      // Keep initial/fallback post on error - silent for 404s
      console.debug('Blog API not available, using fallback:', error)
    }
  }, [slug, initialPost])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  // Auto-refetch on window focus
  useRefetchOnFocus(fetchData)

  return (
    <>
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article
        className="pt-32 pb-20 min-h-screen"
        style={{ backgroundColor: isDark ? '#0a0a0a' : '#ffffff' }}
      >
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <span className="text-sm font-bold uppercase tracking-wider text-primary">
                {post.date}
              </span>
              {post.keywords && post.keywords.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {post.keywords.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-400"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <h1
              className="text-3xl md:text-5xl font-black font-display mb-8 leading-tight"
              style={{ color: isDark ? '#ffffff' : '#0f172a' }}
            >
              <InlineHTMLContent html={post.title} />
            </h1>

            <div className="w-full h-64 md:h-[450px] rounded-3xl mb-12 overflow-hidden shadow-xl relative">
              <Image src={post.image} alt={post.title} fill className="object-cover" priority />
            </div>

            <HTMLContent
              as="div"
              html={post.content}
              className={proseClasses}
              style={{ color: isDark ? '#e5e5e5' : '#334155' }}
            />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <aside className="sticky top-32 space-y-12 pb-10">
            {/* About Widget */}
            <div className="p-6 rounded-2xl bg-gray-50 dark:bg-zinc-900/50 border border-gray-100 dark:border-zinc-800">
              <h3 className="text-xl font-bold font-display mb-4" style={{ color: isDark ? '#ffffff' : '#0f172a' }}>
                About Yummy POS
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                Yummy Manage is Nepal's top-rated cloud restaurant management software. We help cafes, restaurants, and chains streamline their billing, KOT, and inventory.
              </p>
              <Link
                href="/pricing"
                className="block w-full py-3 px-4 bg-primary text-white text-center font-bold rounded-xl hover:bg-orange-600 transition-colors"
              >
                Start Free Trial
              </Link>
            </div>

            {/* Recommended Posts */}
            {recentPosts.length > 0 && (
              <div>
                <h3 className="text-xl font-bold font-display mb-6" style={{ color: isDark ? '#ffffff' : '#0f172a' }}>
                  Recommended Reading
                </h3>
                <div className="space-y-6">
                  {recentPosts.map((rp) => (
                    <Link href={`/blog/${rp.slug}`} key={rp.slug} className="group block">
                      <div className="relative w-full h-40 rounded-xl overflow-hidden mb-3">
                        <Image
                          src={rp.imageUrl}
                          alt={rp.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <h4 className="font-bold text-lg leading-snug group-hover:text-primary transition-colors line-clamp-2" style={{ color: isDark ? '#ffffff' : '#0f172a' }}>
                        {rp.title}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                        {rp.date}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
            </aside>
          </div>

        </div>
      </article>
      <Footer />
    </>
  )
}
