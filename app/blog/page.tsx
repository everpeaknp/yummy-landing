"use client";

import { Navbar, Footer } from "@/components/layout";
import { useTheme } from "@/hooks/useTheme";
import { BlogList } from "@/components/sections/BlogList";

export default function BlogIndexPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <>
      <Navbar />
      <main 
        className="pt-24 pb-20 min-h-screen" 
        style={{ backgroundColor: isDark ? '#0a0a0a' : '#ffffff' }}
      >
        <BlogList />
      </main>
      <Footer />
    </>
  );
}
