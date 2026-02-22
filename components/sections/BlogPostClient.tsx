'use client'

import { Navbar, Footer } from '@/components/layout'
import { useTheme } from '@/hooks/useTheme'
import Image from 'next/image'
import { useState, useEffect, useCallback } from 'react'
import { getBlogPost, useRefetchOnFocus, type BlogPostDetail } from '@/lib/api'
import { InlineHTMLContent } from '@/components/ui/HTMLContent'

// Leverage Tailwind Typography plugin for consistent HTML rendering logic
const proseClasses = 
  'prose prose-slate dark:prose-invert prose-lg max-w-none prose-headings:font-display prose-headings:font-black prose-a:text-primary prose-a:no-underline hover:prose-a:underline'

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

  const fetchData = useCallback(async () => {
    try {
      const apiPost: BlogPostDetail = await getBlogPost(slug)
      // Map API response (BlogPostDetail) to DisplayPost format
      // API uses imageUrl, keywords as string (comma-separated)
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
        <div className="max-w-3xl mx-auto px-6">
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

          <div className="w-full h-64 md:h-96 rounded-3xl mb-12 overflow-hidden shadow-xl relative">
            <Image src={post.image} alt={post.title} fill className="object-cover" priority />
          </div>

          <div
            className={proseClasses}
            style={{ color: isDark ? '#e5e5e5' : '#334155' }}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </article>
      <Footer />
    </>
  )
}
