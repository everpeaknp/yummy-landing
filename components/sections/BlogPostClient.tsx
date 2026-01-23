"use client";

import { Navbar, Footer } from "@/components/layout";
import { useTheme } from "@/hooks/useTheme";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { getBlogPost, useRefetchOnFocus, type BlogPostDetail } from "@/lib/api";
import { type BlogPost as LocalBlogPost } from "@/lib/blog-data";
import { InlineHTMLContent } from "@/components/ui/HTMLContent";

// Single-line class strings for prose styling - prevents hydration mismatch
const proseClasses = "max-w-none [&_h2]:text-3xl md:[&_h2]:text-4xl [&_h2]:font-black [&_h2]:font-display [&_h2]:mt-12 [&_h2]:mb-6 [&_h2]:leading-tight [&_h3]:text-2xl [&_h3]:font-bold [&_h3]:font-display [&_h3]:mt-10 [&_h3]:mb-4 [&_p]:text-lg [&_p]:leading-8 [&_p]:mb-8 [&_p]:text-gray-700 dark:[&_p]:text-gray-300 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-8 [&_li]:mb-3 [&_li]:leading-relaxed [&_li]:text-gray-700 dark:[&_li]:text-gray-300 [&_strong]:text-primary [&_strong]:font-bold [&_a]:text-primary [&_a]:underline [&_a]:font-medium [&_a]:decoration-2 [&_a]:underline-offset-4";

// Internal type used for display
interface DisplayPost {
  slug: string;
  title: string;
  date: string;
  image: string;
  content: string;
  keywords: string[];
}

interface BlogPostClientProps {
  post: LocalBlogPost;
  jsonLd: any;
  slug: string;
}

export function BlogPostClient({ post: initialPost, jsonLd, slug }: BlogPostClientProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  // Convert initial local blog post to display format
  const [post, setPost] = useState<DisplayPost>({
    slug: initialPost.slug,
    title: initialPost.title,
    date: initialPost.date,
    image: initialPost.image,
    content: initialPost.content,
    keywords: initialPost.keywords || [],
  });

  const fetchData = useCallback(async () => {
    try {
      const apiPost: BlogPostDetail = await getBlogPost(slug);
      // Map API response (BlogPostDetail) to DisplayPost format
      // API uses imageUrl, keywords as string (comma-separated)
      setPost({
        slug: apiPost.slug,
        title: apiPost.title,
        date: apiPost.date,
        image: apiPost.imageUrl || initialPost.image,
        content: apiPost.content,
        keywords: apiPost.keywords 
          ? (typeof apiPost.keywords === 'string' 
              ? apiPost.keywords.split(',').map(k => k.trim()) 
              : [])
          : initialPost.keywords || [],
      });
    } catch (error) {
      // Keep initial/fallback post on error - silent for 404s
      console.debug("Blog API not available, using fallback:", error);
    }
  }, [slug, initialPost]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Auto-refetch on window focus
  useRefetchOnFocus(fetchData);

  return (
    <>
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="pt-32 pb-20 min-h-screen" style={{ backgroundColor: isDark ? '#0a0a0a' : '#ffffff' }}>
         <div className="max-w-3xl mx-auto px-6">
            <div className="mb-8">
                <span className="text-sm font-bold uppercase tracking-wider text-primary">{post.date}</span>
                {post.keywords && post.keywords.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                        {post.keywords.map(tag => (
                            <span key={tag} className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-400">
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>
            <h1 className="text-3xl md:text-5xl font-black font-display mb-8 leading-tight" style={{ color: isDark ? '#ffffff' : '#0f172a' }}>
                <InlineHTMLContent html={post.title} />
            </h1>
            
            <div className="w-full h-64 md:h-96 rounded-3xl mb-12 overflow-hidden shadow-xl relative">
               <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
               />
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
  );
}
