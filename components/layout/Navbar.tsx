"use client";

import React, { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FiArrowRight,
  FiBarChart2,
  FiChevronDown,
  FiHome,
  FiPieChart,
  FiMenu,
  FiX
} from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "@/hooks/useTheme";
import { siteConfig } from "@/lib/constants";

export function Navbar() {
  const { theme, toggleTheme, mounted } = useTheme();
  const isDark = theme === "dark";

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [mobileMenuOpen]);

  return (
    <>
    <nav 
      className="fixed top-0 w-full z-50 backdrop-blur-md transition-colors duration-300"
      style={{ 
        backgroundColor: isDark ? 'rgba(10, 10, 10, 0.8)' : 'rgba(255, 255, 255, 0.8)',
        borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : '#e2e8f0'}`
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
         {/* Logo */}
         <Link href="/" className="flex items-center gap-3 relative z-50">
           <Image
             src={isDark ? "/images/yummy_logo.png" : "/images/yummy_logo.png"}
             alt="Yummy Logo"
             width={50}
             height={50}
             className="h-8 w-auto"
           />
           <span 
             className="text-xl font-bold font-display tracking-tight leading-none"
             style={{ color: isDark ? '#ffffff' : '#0f172a' }}
           >
             Yummy
           </span>
         </Link>

         {/* Centered Shifting Tabs (Desktop) */}
         <div className="hidden md:flex justify-center flex-1">
             <Tabs isDark={isDark} />
         </div>

         {/* Actions (Desktop) */}
         <div className="hidden md:flex items-center gap-4">
            {/* Theme Toggle */}
            <button
                onClick={toggleTheme}
                className="p-2 transition-colors rounded-full"
                style={{ color: isDark ? '#94a3b8' : '#64748b' }}
                aria-label="Toggle theme"
            >
                {mounted && (
                    <span className="material-symbols-outlined text-[20px]">
                        {isDark ? "light_mode" : "dark_mode"}
                    </span>
                )}
            </button>

            {/* Login Button */}
            <Link
                href={siteConfig.links.app}
                target="_blank"
                className="px-6 py-2.5 rounded-full font-bold text-sm hover:opacity-90 transition-opacity"
                style={{ 
                    backgroundColor: isDark ? '#ffffff' : '#0f172a',
                    color: isDark ? '#0f172a' : '#ffffff'
                }}
            >
                Login
            </Link>
         </div>
         
         {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-4">
             <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 transition-colors relative z-50"
                style={{ color: isDark ? '#ffffff' : '#0f172a' }}
             >
                 {mobileMenuOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
             </button>
          </div>
      </div>
    </nav>

    {/* Mobile Menu Overlay */}
    <AnimatePresence>
      {mobileMenuOpen && (
        <motion.div
           initial={{ opacity: 0, y: -20 }}
           animate={{ opacity: 1, y: 0 }}
           exit={{ opacity: 0, y: -20 }}
           className="fixed inset-0 z-40 px-6 pt-24 pb-10 flex flex-col"
           style={{ backgroundColor: isDark ? '#0a0a0a' : '#ffffff' }}
        >
           <div className="flex flex-col gap-6 text-xl font-medium">
              {TABS.map((t) => (
                <div key={t.id} className="border-b pb-4" style={{ borderColor: isDark ? '#262626' : '#e2e8f0' }}>
                   <Link 
                      href={t.href} 
                      onClick={() => setMobileMenuOpen(false)}
                      className="block mb-2"
                      style={{ color: isDark ? '#fff' : '#0f172a' }}
                   >
                     {t.title}
                   </Link>
                   {/* Render simplified sub-links if needed, or just link to main sections */}
                </div>
              ))}
              
              <div className="mt-4 flex items-center justify-between">
                 <span style={{ color: isDark ? '#94a3b8' : '#64748b' }}>Appearance</span>
                 <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full border"
                    style={{ borderColor: isDark ? '#262626' : '#e2e8f0' }}
                >
                    {mounted && (
                        <span className="material-symbols-outlined text-[20px]" style={{ color: isDark ? '#fff' : '#0f172a' }}>
                            {isDark ? "light_mode" : "dark_mode"}
                        </span>
                    )}
                </button>
              </div>

               <Link
                href={siteConfig.links.app}
                target="_blank"
                className="mt-auto w-full py-4 text-center rounded-xl font-bold text-lg"
                style={{ 
                    backgroundColor: isDark ? '#ffffff' : '#0f172a',
                    color: isDark ? '#0f172a' : '#ffffff'
                }}
            >
                Login to Dashboard
            </Link>
           </div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}

const Tabs = ({ isDark }: { isDark: boolean }) => {
  const [selected, setSelected] = useState<number | null>(null);
  const [dir, setDir] = useState<null | "l" | "r">(null);

  const handleSetSelected = (val: number | null) => {
    if (typeof selected === "number" && typeof val === "number") {
      setDir(selected > val ? "r" : "l");
    } else if (val === null) {
      setDir(null);
    }

    setSelected(val);
  };

  return (
    <div
      onMouseLeave={() => handleSetSelected(null)}
      className="relative flex h-fit gap-2"
    >
      {TABS.map((t) => {
        return (
          <Tab
            key={t.id}
            selected={selected}
            handleSetSelected={handleSetSelected}
            tab={t.id}
            href={t.href}
            isDark={isDark}
          >
            {t.title}
          </Tab>
        );
      })}

      <AnimatePresence>
        {selected && <Content dir={dir} selected={selected} isDark={isDark} />}
      </AnimatePresence>
    </div>
  );
};

const Tab = ({
  children,
  tab,
  handleSetSelected,
  selected,
  href,
  isDark
}: {
  children: ReactNode;
  tab: number;
  handleSetSelected: (val: number | null) => void;
  selected: number | null;
  href: string;
  isDark: boolean;
}) => {
  return (
    <Link
      href={href}
      id={`shift-tab-${tab}`}
      onMouseEnter={() => handleSetSelected(tab)}
      onClick={() => handleSetSelected(null)} // Close dropdown on click
      className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-sm transition-colors`}
      style={{
          backgroundColor: selected === tab 
            ? (isDark ? 'rgba(255,255,255,0.1)' : '#f1f5f9')
            : 'transparent',
          color: selected === tab
            ? (isDark ? '#ffffff' : '#0f172a')
            : (isDark ? '#94a3b8' : '#64748b')
      }}
    >
      <span>{children}</span>
      <FiChevronDown
        className={`transition-transform ${
          selected === tab ? "rotate-180" : ""
        }`}
      />
    </Link>
  );
};

const Content = ({
  selected,
  dir,
  isDark
}: {
  selected: number | null;
  dir: null | "l" | "r";
  isDark: boolean;
}) => {
  return (
    <motion.div
      id="overlay-content"
      initial={{
        opacity: 0,
        y: 8,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: 8,
      }}
      className="absolute left-0 top-[calc(100%_+_24px)] w-96 rounded-lg p-4 border shadow-xl"
      style={{
          backgroundColor: isDark ? '#171717' : '#ffffff',
          borderColor: isDark ? '#262626' : '#e2e8f0'
      }}
    >
      <Bridge />
      <Nub selected={selected} isDark={isDark} />

      {TABS.map((t) => {
        return (
          <div className="overflow-hidden" key={t.id}>
            {selected === t.id && (
              <motion.div
                initial={{
                  opacity: 0,
                  x: dir === "l" ? 100 : dir === "r" ? -100 : 0,
                }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
              >
                <t.Component isDark={isDark} />
              </motion.div>
            )}
          </div>
        );
      })}
    </motion.div>
  );
};

const Bridge = () => (
  <div className="absolute -top-[24px] left-0 right-0 h-[24px]" />
);

const Nub = ({ selected, isDark }: { selected: number | null, isDark: boolean }) => {
  const [left, setLeft] = useState(0);

  useEffect(() => {
    moveNub();
  }, [selected]);

  const moveNub = () => {
    if (selected) {
      const hoveredTab = document.getElementById(`shift-tab-${selected}`);
      const overlayContent = document.getElementById("overlay-content");

      if (!hoveredTab || !overlayContent) return;

      const tabRect = hoveredTab.getBoundingClientRect();
      const { left: contentLeft } = overlayContent.getBoundingClientRect();

      const tabCenter = tabRect.left + tabRect.width / 2 - contentLeft;

      setLeft(tabCenter);
    }
  };

  return (
    <motion.span
      style={{
        clipPath: "polygon(0 0, 100% 0, 50% 50%, 0% 100%)",
        backgroundColor: isDark ? '#171717' : '#ffffff',
        borderColor: isDark ? '#262626' : '#e2e8f0',
      }}
      animate={{ left }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-tl border-t border-l"
    />
  );
};

const Products = ({ isDark }: { isDark: boolean }) => {
  return (
    <div>
      <div className="flex gap-4">
        <div>
          <h3 className="mb-2 text-sm font-medium" style={{ color: isDark ? '#fff' : '#0f172a' }}>Core</h3>
          <Link href="/features/smart-inventory" className="mb-1 block text-sm transition-colors hover:text-primary" style={{ color: isDark ? '#a3a3a3' : '#64748b' }}>
            Smart Inventory
          </Link>
          <Link href="/features/ird-billing" className="block text-sm transition-colors hover:text-primary" style={{ color: isDark ? '#a3a3a3' : '#64748b' }}>
            IRD Approved Billing
          </Link>
        </div>
        <div>
          <h3 className="mb-2 text-sm font-medium" style={{ color: isDark ? '#fff' : '#0f172a' }}>Growth</h3>
          <Link href="/features/qr-menu" className="mb-1 block text-sm transition-colors hover:text-primary" style={{ color: isDark ? '#a3a3a3' : '#64748b' }}>
            Digital QR Menu
          </Link>
          <Link href="/features/reports" className="mb-1 block text-sm transition-colors hover:text-primary" style={{ color: isDark ? '#a3a3a3' : '#64748b' }}>
            Real-time Reports
          </Link>
        </div>
      </div>

      <Link href="/features" className="ml-auto mt-4 flex items-center gap-1 text-sm text-primary w-fit hover:underline">
        <span>View all features</span>
        <FiArrowRight />
      </Link>
    </div>
  );
};

const Pricing = ({ isDark }: { isDark: boolean }) => {
  return (
    <div className={`grid grid-cols-3 gap-4 divide-x ${isDark ? 'divide-neutral-700' : 'divide-slate-200'}`}>
      <Link
        href="/pricing"
        className={`flex w-full flex-col items-center justify-center py-2 transition-colors ${isDark ? 'text-neutral-400 hover:text-neutral-50' : 'text-slate-500 hover:text-slate-900'}`}
      >
        <FiHome className="mb-2 text-xl text-primary" />
        <span className="text-xs">Startup</span>
      </Link>
      <Link
        href="/pricing"
        className={`flex w-full flex-col items-center justify-center py-2 transition-colors ${isDark ? 'text-neutral-400 hover:text-neutral-50' : 'text-slate-500 hover:text-slate-900'}`}
      >
        <FiBarChart2 className="mb-2 text-xl text-primary" />
        <span className="text-xs">Scaleup</span>
      </Link>
      <Link
        href="/pricing"
        className={`flex w-full flex-col items-center justify-center py-2 transition-colors ${isDark ? 'text-neutral-400 hover:text-neutral-50' : 'text-slate-500 hover:text-slate-900'}`}
      >
        <FiPieChart className="mb-2 text-xl text-primary" />
        <span className="text-xs">Enterprise</span>
      </Link>
    </div>
  );
};

const Blog = ({ isDark }: { isDark: boolean }) => {
  return (
    <div>
      <div className="grid grid-cols-2 gap-2">
        <Link href="/blog/restaurant-trends-2024">
          <div className="mb-2 h-14 w-full rounded bg-slate-200 dark:bg-slate-800 flex items-center justify-center overflow-hidden relative">
             <Image 
                src="https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=600&auto=format&fit=crop"
                alt="Trends"
                fill
                className="object-cover opacity-80 hover:opacity-100 transition-opacity"
             />
          </div>
          <h4 className={`mb-0.5 text-sm font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>Restaurant Trends 2024</h4>
          <p className={`text-xs ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
            Top 5 trends shaping the food industry in Nepal.
          </p>
        </Link>
        <Link href="/blog/optimize-inventory">
            <div className="mb-2 h-14 w-full rounded bg-slate-200 dark:bg-slate-800 flex items-center justify-center overflow-hidden relative">
               <Image 
                  src="https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=600&auto=format&fit=crop"
                  alt="Inventory"
                  fill
                  className="object-cover opacity-80 hover:opacity-100 transition-opacity"
               />
            </div>
          <h4 className={`mb-0.5 text-sm font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>Optimize Inventory</h4>
          <p className={`text-xs ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
            How to reduce waste and increase profit.
          </p>
        </Link>
      </div>
      <Link href="/blog" className="ml-auto mt-4 flex items-center gap-1 text-sm text-primary w-fit hover:underline">
        <span>View all posts</span>
        <FiArrowRight />
      </Link>
    </div>
  );
};

const TABS = [
  {
    title: "Features",
    href: "/features",
    Component: Products,
  },
  {
    title: "Pricing",
    href: "/pricing",
    Component: Pricing,
  },
  {
    title: "Blog",
    href: "/blog",
    Component: Blog,
  },
].map((n, idx) => ({ ...n, id: idx + 1 }));
