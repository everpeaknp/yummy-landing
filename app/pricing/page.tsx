"use client";

import { Navbar, Footer } from "@/components/layout";
import { Pricing as PricingSection } from "@/components/sections";
import { useTheme } from "@/hooks/useTheme";

import { motion } from "framer-motion";

export default function PricingPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <>
      <Navbar />
      <motion.main 
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] }}
        className="pt-20" 
        style={{ backgroundColor: isDark ? '#0a0a0a' : '#ffffff' }}
      >
        <PricingSection />
      </motion.main>
      <Footer />
    </>
  );
}
