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
        // Filter out current post and get up to 3 recent ones
        const filtered = allPostsData.posts.filter(p => p.slug !== slug).slice(0, 3)
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
        type=" application/ld+json\
