"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@/hooks/useTheme";
import { motion } from "framer-motion";
import { blogList as fallbackBlogList, BlogPost as LocalBlogPost } from "@/lib/blog-data";
import { getBlogPosts, useRefetchOnFocus, type BlogPost, type BlogListData } from "@/lib/api";
import { InlineHTMLContent } from "@/components/ui/HTMLContent";

// Map local blog data to API format for fallback
const fallbackBlogs = fallbackBlogList.map((b, idx) => ({
  slug: b.slug,
  title: b.title,
  excerpt: b.excerpt,
  imageUrl: b.image,
  date: b.date,
  order: idx + 1,
}));

const fallbackData: Partial<BlogListData> = {
  title: "Yummyever Blogs",
  subtitle: "Latest insights, tips, and trends from the restaurant industry.",
};

type BlogDisplay = {
  slug: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  date: string;
  order: number;
  category?: { name: string; slug: string };
  cardTextColor?: string;
  cardTextColorDark?: string;
  cardOverlayOpacity?: number;
};

export function BlogList() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [data, setData] = useState<Partial<BlogListData>>(fallbackData);
  const [blogs, setBlogs] = useState<BlogDisplay[]>(fallbackBlogs);

  const fetchData = useCallback(async () => {
    try {
      const apiData = await getBlogPosts();
      setData(apiData);
      if (apiData.posts) {
        const mapped = apiData.posts.map((p, idx) => ({
          slug: p.slug,
          title: p.title,
          excerpt: p.excerpt,
          imageUrl: p.imageUrl,
          date: p.date,
          order: p.order || idx + 1,
          category: p.category,
          cardTextColor: p.cardTextColor,
          cardTextColorDark: p.cardTextColorDark,
          cardOverlayOpacity: p.cardOverlayOpacity,
        }));
        setBlogs(mapped);
      }
    } catch (error) {
      console.error("Failed to fetch blog data:", error);
      // Keep fallback data
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Auto-refetch on window focus
  useRefetchOnFocus(fetchData);

  // Ensure we have at least 6 blogs for the layout, but keep all if more
  const displayBlogs = blogs.length >= 6 ? blogs : [...blogs, ...fallbackBlogs.slice(blogs.length, 6)];

  return (
    <div className="flex justify-center items-center">
      <div className="2xl:mx-auto 2xl:container lg:px-20 lg:py-16 md:py-12 md:px-6 py-9 px-4 w-96 sm:w-auto">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          role="main" 
          className="flex flex-col items-center justify-center mb-16"
        >
          <h1 
            className="text-4xl sm:text-5xl font-black font-display mb-4 text-center"
            style={{ color: data.pageColors ? (isDark ? data.pageColors.dark?.titleColor : data.pageColors.light?.titleColor) : (isDark ? '#ffffff' : '#0f172a') }}
          >
            <InlineHTMLContent html={data.title || "Yummyever Blogs"} />
          </h1>
          <p 
            className="text-lg text-center lg:w-1/2 md:w-10/12 w-11/12" 
            style={{ color: data.pageColors ? (isDark ? data.pageColors.dark?.subtitleColor : data.pageColors.light?.subtitleColor) : (isDark ? '#94a3b8' : '#64748b') }}
          >
            <InlineHTMLContent html={data.subtitle || "Latest insights, tips, and trends from the restaurant industry."} />
          </p>
        </motion.div>

        {/* Grid Layout */}
        <div className="lg:flex items-stretch md:mt-12 mt-8">
          
          {/* Left Column */}
          <div className="lg:w-1/2">
            {/* Top Row: 2 Small Cards */}
            <div className="sm:flex items-center justify-between xl:gap-x-8 gap-x-6">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="sm:w-1/2 relative mb-4 sm:mb-0"
              >
                <BlogCard blog={displayBlogs[0]} />
              </motion.div>
              <motion.div 
                 initial={{ opacity: 0, x: -30 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.6, delay: 0.2 }}
                 className="sm:w-1/2 relative"
              >
                <BlogCard blog={displayBlogs[1]} />
              </motion.div>
            </div>
            
            {/* Bottom Row: 1 Large Card */}
            <motion.div 
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.6, delay: 0.3 }}
               className="relative mt-4 md:mt-6"
            >
              <BlogCard blog={displayBlogs[2]} isLarge />
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="lg:w-1/2 xl:ml-8 lg:ml-4 lg:mt-0 md:mt-6 mt-4 lg:flex flex-col justify-between">
            {/* Top Row: 1 Large Card */}
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative mb-4 md:mb-6"
            >
              <BlogCard blog={displayBlogs[3]} isLarge />
            </motion.div>

            {/* Bottom Row: 2 Small Cards */}
            <div className="sm:flex items-center justify-between xl:gap-x-8 gap-x-6">
               <motion.div 
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="relative w-full mb-4 sm:mb-0"
               >
                  <BlogCard blog={displayBlogs[4]} />
              </motion.div>
              <motion.div 
                 initial={{ opacity: 0, x: 30 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.6, delay: 0.4 }}
                 className="relative w-full"
              >
                  <BlogCard blog={displayBlogs[5]} />
              </motion.div>
            </div>
          </div>

        </div>

        {/* Standard Grid Layout for remaining blogs (> 6) */}
        {displayBlogs.length > 6 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 xl:gap-8 mt-4 md:mt-6 lg:mt-8">
            {displayBlogs.slice(6).map((blog, idx) => (
              <motion.div
                key={blog.slug || idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="w-full"
              >
                <BlogCard blog={blog} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function BlogCard({ blog, isLarge = false }: { blog: BlogDisplay, isLarge?: boolean }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  // Get text color from API or use default white
  const textColor = isDark 
    ? (blog.cardTextColorDark || blog.cardTextColor || "#ffffff")
    : (blog.cardTextColor || "#ffffff");
  
  // Get overlay opacity from API or use default
  const overlayOpacity = blog.cardOverlayOpacity ?? 0.5;
  
  return (
    <div className={`group relative overflow-hidden rounded-xl shadow-lg w-full bg-zinc-900 ${isLarge ? "aspect-[4/3] sm:aspect-[2/1]" : "aspect-[4/3] sm:aspect-[3/2]"}`}>
      {/* Category Badge */}
      {blog.category && (
        <div className="absolute top-0 left-0 p-4 z-20">
          <span className="bg-primary/80 backdrop-blur-md px-3 py-1 text-xs font-bold text-white uppercase tracking-wider rounded-full">
            {blog.category.name}
          </span>
        </div>
      )}
      
      {/* Date Badge */}
      <div className="absolute top-0 right-0 p-4 z-20">
        <p className="bg-black/50 backdrop-blur-md px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full" style={{ color: textColor }}>
            {blog.date}
        </p>
      </div>

      {/* Content Overlay */}
      <div 
        className="absolute bottom-0 left-0 p-6 z-20 w-full"
        style={{ background: `linear-gradient(to top, rgba(0,0,0,${overlayOpacity * 1.2}), rgba(0,0,0,${overlayOpacity * 0.6}), transparent)` }}
      >
        <Link href={`/blog/${blog.slug}`} className="block">
            <h2 className="text-xl font-bold group-hover:text-primary transition-colors" style={{ color: textColor }}>
                {blog.title}
            </h2>
            <p className="text-sm mt-2 line-clamp-2" style={{ color: textColor, opacity: 0.85 }}>
                <InlineHTMLContent html={blog.excerpt} />
            </p>
        </Link>
        <Link href={`/blog/${blog.slug}`} className="inline-flex items-center mt-4 hover:text-primary transition-colors text-sm font-bold" style={{ color: textColor }}>
             Read More
             <svg className="ml-2 w-4 h-4 fill-current" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.75 12.5L10.25 8L5.75 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
             </svg>
        </Link>
      </div>
      
      {/* Image */}
      <div className="w-full h-full relative">
         <Image 
            src={blog.imageUrl} 
            alt={blog.title} 
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
         />
      </div>
    </div>
  );
}

