"use client";

import { Navbar, Footer } from "@/components/layout";
import { useTheme } from "@/hooks/useTheme";
import { useParams } from "next/navigation";
import Image from "next/image";

const blogData: Record<string, { title: string; date: string; content: string }> = {
  "restaurant-trends-2024": {
    title: "Top 5 Restaurant Trends in 2024",
    date: "Jan 10, 2024",
    content: "The restaurant industry is evolving rapidly. From AI-driven menus to sustainable sourcing, here are the top trends you need to watch out for..."
  },
  "optimize-inventory": {
    title: "How to Optimize Your Inventory",
    date: "Dec 15, 2023",
    content: "Food waste is a major profit killer. Learn how using a smart inventory system can help you track every gram of ingredient and save thousands..."
  }
};

export default function BlogPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const params = useParams();
  const slug = params.slug as string;
  const post = blogData[slug];

   if (!post) {
      return (
       <>
        <Navbar />
        <main className="pt-32 min-h-screen flex items-center justify-center" style={{ backgroundColor: isDark ? '#0a0a0a' : '#ffffff', color: isDark? '#fff' : '#000' }}>
          <h1 className="text-2xl font-bold">Post Not Found</h1>
        </main>
        <Footer />
      </>
      )
  }

  return (
    <>
      <Navbar />
      <article className="pt-32 pb-20 min-h-screen" style={{ backgroundColor: isDark ? '#0a0a0a' : '#ffffff' }}>
         <div className="max-w-3xl mx-auto px-6">
            <div className="mb-8">
                <span className="text-sm font-bold uppercase tracking-wider text-primary">{post.date}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black font-display mb-8" style={{ color: isDark ? '#ffffff' : '#0f172a' }}>
                {post.title}
            </h1>
            
            <div className="w-full h-64 md:h-96 rounded-3xl mb-12 overflow-hidden shadow-xl relative">
               <Image
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2500&auto=format&fit=crop"
                  alt="Blog Cover"
                  fill
                  className="object-cover"
               />
            </div>

            <div className="prose prose-lg leading-relaxed" style={{ 
                color: isDark ? '#d4d4d4' : '#334155'
            }}>
                <p>{post.content}</p>
                 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                 <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
         </div>
      </article>
      <Footer />
    </>
  );
}
