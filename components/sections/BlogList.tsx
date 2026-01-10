"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar, Footer } from "@/components/layout";
import { useTheme } from "@/hooks/useTheme";
import { motion } from "framer-motion";
import { blogList } from "@/lib/blog-data";

const blogs = blogList; // Alias for minimal code change below

export function BlogList() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

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
            style={{ color: isDark ? '#ffffff' : '#0f172a' }}
          >
            Yummyever Blogs
          </h1>
          <p className="text-lg text-center lg:w-1/2 md:w-10/12 w-11/12" style={{ color: isDark ? '#94a3b8' : '#64748b' }}>
            Latest insights, tips, and trends from the restaurant industry.
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
                <BlogCard blog={blogs[0]} />
              </motion.div>
              <motion.div 
                 initial={{ opacity: 0, x: -30 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.6, delay: 0.2 }}
                 className="sm:w-1/2 relative"
              >
                <BlogCard blog={blogs[1]} />
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
              <BlogCard blog={blogs[2]} isLarge />
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
              <BlogCard blog={blogs[3]} isLarge />
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
                  <BlogCard blog={blogs[4]} />
              </motion.div>
              <motion.div 
                 initial={{ opacity: 0, x: 30 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.6, delay: 0.4 }}
                 className="relative w-full"
              >
                  <BlogCard blog={blogs[5]} />
              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function BlogCard({ blog, isLarge = false }: { blog: typeof blogs[0], isLarge?: boolean }) {
  // Use a generic placeholder if image fails (using simple styling fallback)
  return (
    <div className={`group relative overflow-hidden rounded-xl shadow-lg w-full bg-zinc-900 ${isLarge ? "aspect-[4/3] sm:aspect-[2/1]" : "aspect-[4/3] sm:aspect-[3/2]"}`}>
      {/* Date Badge */}
      <div className="absolute top-0 right-0 p-4 z-20">
        <p className="bg-black/50 backdrop-blur-md px-3 py-1 text-xs font-bold text-white uppercase tracking-wider rounded-full">
            {blog.date}
        </p>
      </div>

      {/* Content Overlay */}
      <div className="absolute bottom-0 left-0 p-6 z-20 w-full bg-gradient-to-t from-black/90 via-black/50 to-transparent">
        <Link href={`/blog/${blog.slug}`} className="block">
            <h2 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                {blog.title}
            </h2>
            <p className="text-sm text-gray-200 mt-2 line-clamp-2">
                {blog.excerpt}
            </p>
        </Link>
        <Link href={`/blog/${blog.slug}`} className="inline-flex items-center mt-4 text-white hover:text-primary transition-colors text-sm font-bold">
             Read More
             <svg className="ml-2 w-4 h-4 fill-current" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.75 12.5L10.25 8L5.75 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
             </svg>
        </Link>
      </div>
      
      {/* Image */}
      <div className="w-full h-full relative">
         <img 
            src={blog.image} 
            alt={blog.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
         />
      </div>
    </div>
  );
}
