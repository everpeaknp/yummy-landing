"use client";

import { Navbar, Footer } from "@/components/layout";
import { useTheme } from "@/hooks/useTheme";
import { FiSearch, FiArrowRight } from "react-icons/fi";
import Link from "next/link";
import { useState } from "react";
import { faqCategories, helpLinks } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";

export default function HelpCenterPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [query, setQuery] = useState("");

  // Flatten FAQs for search
  const allFaqs = faqCategories.flatMap(cat => 
    cat.questions.map(q => ({
      type: 'FAQ',
      label: q.q,
      href: '/faq', // Ideally anchor link
      desc: q.a
    }))
  );

  const allLinks = helpLinks.map(link => ({
    type: 'Page',
    label: link.label,
    href: link.href,
    desc: `Navigate to ${link.label}`
  }));

  const allSearchable = [...allLinks, ...allFaqs];

  const results = query 
    ? allSearchable.filter(item => 
        item.label.toLowerCase().includes(query.toLowerCase()) || 
        item.desc.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5)
    : [];

  const linkGroups = [
    {
      col1: [
        { label: "Billing", href: "/faq" },
        { label: "Support", href: "/contact" },
        { label: "Terms", href: "/terms" },
      ],
      col2: [
        { label: "Features", href: "/features/smart-inventory" },
        { label: "Contact us", href: "/contact" },
        { label: "Blog", href: "/blog" },
      ],
      col3: [
        { label: "Enterprise", href: "/pricing" },
        { label: "Privacy", href: "/privacy" },
        { label: "Team", href: "/team" },
      ]
    }
  ];

  return (
    <>
      <Navbar />
      <main 
        className="min-h-screen pt-32 pb-20 px-6 animate-pop-in flex flex-col items-center"
        style={{ 
            backgroundColor: isDark ? '#0a0a0a' : '#ffffff',
            color: isDark ? '#f3f4f6' : '#1f2937'
        }}
      >
        <section className="w-full max-w-6xl px-4 md:p-8">
            <div className="container flex flex-col items-center p-4 mx-auto md:p-8 rounded-3xl relative" style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : '#f3f4f6' }}>
                
                <h1 className="text-3xl font-bold leading-none text-center sm:text-4xl mb-2">Help Center</h1>
                <p className="mb-8 opacity-70">How can we help you today?</p>
                
                <div className="relative mt-2 mb-12 w-full max-w-lg z-50">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                        <FiSearch className="w-5 h-5 opacity-50" />
                    </span>
                    <input 
                        type="search" 
                        name="Search" 
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search for answers..." 
                        className="w-full py-4 pl-12 text-sm rounded-full focus:outline-none shadow-sm transition-shadow focus:shadow-md"
                        style={{ 
                            backgroundColor: isDark ? '#171717' : '#ffffff',
                            color: isDark ? '#ffffff' : '#0f172a'
                        }} 
                    />

                    {/* Search Results Dropdown */}
                    <AnimatePresence>
                        {query && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="absolute top-full left-0 right-0 mt-2 rounded-2xl shadow-xl overflow-hidden border"
                                style={{ 
                                    backgroundColor: isDark ? '#171717' : '#ffffff',
                                    borderColor: isDark ? '#262626' : '#e2e8f0'
                                }}
                            >
                                {results.length > 0 ? (
                                    <ul>
                                        {results.map((result, idx) => (
                                            <li key={idx} className="border-b last:border-0" style={{ borderColor: isDark ? '#262626' : '#f1f5f9' }}>
                                                <Link href={result.href} className="flex flex-col px-6 py-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                                    <span className="font-semibold text-sm flex items-center justify-between" style={{ color: isDark ? '#f1f5f9' : '#0f172a' }}>
                                                        {result.label}
                                                        <span className="text-xs opacity-50 uppercase tracking-widest">{result.type}</span>
                                                    </span>
                                                    <span className="text-xs truncate mt-1 opacity-70" style={{ color: isDark ? '#a3a3a3' : '#64748b' }}>
                                                        {result.desc}
                                                    </span>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <div className="p-6 text-center text-sm opacity-60">
                                        No results found for "{query}"
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="flex flex-col w-full divide-y sm:flex-row sm:divide-y-0 sm:divide-x sm:px-8 lg:px-12 xl:px-32 relative z-10" style={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : '#d1d5db' }}>
                    <div className="flex flex-col w-full divide-y" style={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : '#d1d5db' }}>
                        {linkGroups[0].col1.map((link, i) => (
                            <Link key={i} href={link.href} className="flex items-center justify-center p-4 sm:py-8 lg:py-12 hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                                {link.label}
                            </Link>
                        ))}
                    </div>
                    <div className="flex flex-col w-full divide-y" style={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : '#d1d5db' }}>
                        {linkGroups[0].col2.map((link, i) => (
                             <Link key={i} href={link.href} className="flex items-center justify-center p-4 sm:py-8 lg:py-12 hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                                {link.label}
                            </Link>
                        ))}
                    </div>
                    <div className="flex flex-col w-full divide-y" style={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : '#d1d5db' }}>
                        {linkGroups[0].col3.map((link, i) => (
                             <Link key={i} href={link.href} className="flex items-center justify-center p-4 sm:py-8 lg:py-12 hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
