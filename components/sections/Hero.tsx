"use client";

import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/constants";
import { useTheme } from "@/hooks/useTheme";
import PaperPlaneButton from "@/components/ui/PaperPlaneButton";

export function Hero() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <header className="pt-32 pb-20 lg:pt-48 lg:pb-32 text-center max-w-7xl mx-auto px-6">
      {/* Badge */}
      <div 
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-8"
        style={{ 
          backgroundColor: isDark ? 'rgba(124, 45, 18, 0.3)' : '#ffedd5', 
          color: isDark ? '#fdba74' : '#c2410c' 
        }}
      >
        <span className="material-symbols-outlined text-sm">verified</span>
        <span>Made for Nepal 🇳🇵</span>
      </div>

      {/* Headline */}
      <h1 
        className="text-5xl sm:text-7xl lg:text-8xl font-black font-display tracking-tight leading-[0.95] mb-8"
        style={{ color: isDark ? '#ffffff' : '#0f172a' }}
      >
        Manage your <br />
        Restaurant, <span style={{ color: '#ff6929' }}>Effortlessly.</span>
      </h1>

      {/* Subheadline */}
      <p 
        className="text-xl sm:text-2xl max-w-3xl mx-auto leading-relaxed mb-12"
        style={{ color: isDark ? '#94a3b8' : '#475569' }}
      >
        The #1 Restaurant OS in Nepal. IRD Approved Billing, Inventory, and
        KOT.
        <br className="hidden sm:block" />
        Stop worrying about operations and focus on your food.
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
        <PaperPlaneButton 
          href="/pricing"
          text="Start Free Trial"
          successText="Launching..."
        />
        
        <Link
          href="#about"
          className="group flex items-center gap-2 rounded-full border border-slate-200 bg-white px-8 py-4 font-semibold text-slate-600 transition-all hover:border-slate-300 hover:bg-slate-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800"
        >
          <span>How it Works</span>
          <span className="material-symbols-outlined text-lg transition-transform group-hover:translate-x-1">
            arrow_forward
          </span>
        </Link>
      </div>
    </header>
  );
}
