"use client";

import { Navbar, Footer } from "@/components/layout";
import { useTheme } from "@/hooks/useTheme";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const allPosts = [
    { slug: "restaurant-trends-2024", title: "Top 5 Restaurant Trends in 2024", date: "Jan 10, 2024", excerpt: "The restaurant industry is evolving rapidly. From AI-driven menus to sustainable sourcing..." },
    { slug: "optimize-inventory", title: "How to Optimize Your Inventory", date: "Dec 15, 2023", excerpt: "Food waste is a major profit killer. Learn how using a smart inventory system can help..." },
];

export default function BlogIndexPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <>
      <Navbar />
      <motion.main 
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] }}
        className="pt-32 pb-20 min-h-screen" 
        style={{ backgroundColor: isDark ? '#0a0a0a' : '#ffffff' }}
      >
         <div className="max-w-7xl mx-auto px-6">
            <h1 className="text-5xl md:text-7xl font-black font-display mb-16 text-center" style={{ color: isDark ? '#ffffff' : '#0f172a' }}>
                Latest Insights
            </h1>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {allPosts.map((post, idx) => (
                    <Link href={`/blog/${post.slug}`} key={post.slug} className="group">
                         <motion.div 
                          initial={{ opacity: 0, scale: 0.9, y: 30 }}
                          whileInView={{ opacity: 1, scale: 1, y: 0 }}
                          viewport={{ once: true, margin: "-50px" }}
                          transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
                         >
                            <div className="rounded-3xl overflow-hidden mb-6 aspect-video relative shadow-lg">
                                 <Image
                                    src="https://images.unsplash.com/photo-1542487354-feaf93476caa?q=80&w=2500&auto=format&fit=crop"
                                    alt="Blog Cover"
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                             <div className="mb-4">
                                <span className="text-xs font-bold uppercase tracking-wider text-primary">{post.date}</span>
                            </div>
                            <h3 className="text-2xl font-bold font-display mb-3 group-hover:text-primary transition-colors" style={{ color: isDark ? '#ffffff' : '#0f172a' }}>
                                {post.title}
                            </h3>
                             <p style={{ color: isDark ? '#94a3b8' : '#475569' }}>
                                {post.excerpt}
                            </p>
                        </motion.div>
                    </Link>
                ))}
            </div>
         </div>
      </motion.main>
      <Footer />
    </>
  );
}
