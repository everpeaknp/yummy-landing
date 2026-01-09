"use client";

import { Navbar, Footer } from "@/components/layout";
import { useTheme } from "@/hooks/useTheme";
import Link from "next/link";
import { motion } from "framer-motion";

const allFeatures = [
    { slug: "smart-inventory", title: "Smart Inventory", icon: "inventory_2", color: "text-green-500", bg: "bg-green-100 dark:bg-green-900/30", description: "Ingredients are deducted automatically as you sell." },
    { slug: "ird-billing", title: "IRD Approved Billing", icon: "receipt_long", color: "text-blue-500", bg: "bg-blue-100 dark:bg-blue-900/30", description: "Fully compliant with Tax Rules of Nepal." },
    { slug: "qr-menu", title: "Digital QR Menu", icon: "qr_code_2", color: "text-purple-500", bg: "bg-purple-100 dark:bg-purple-900/30", description: "Contactless ordering for superior guest experience." },
    { slug: "reports", title: "Real-time Reports", icon: "analytics", color: "text-pink-500", bg: "bg-pink-100 dark:bg-pink-900/30", description: "Track sales and performance from anywhere." },
];

export default function FeaturesIndexPage() {
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
                All Features
            </h1>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {allFeatures.map((feature, idx) => (
                    <Link href={`/features/${feature.slug}`} key={feature.slug}>
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.9, y: 30 }}
                          whileInView={{ opacity: 1, scale: 1, y: 0 }}
                          viewport={{ once: true, margin: "-50px" }}
                          transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
                          className="p-8 rounded-3xl h-full transition-transform hover:-translate-y-1" style={{ 
                            backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#f8fafc',
                            border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid #e2e8f0'
                        }}>
                             <div 
                                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${feature.bg} ${feature.color}`}
                            >
                                <span className="material-symbols-outlined">{feature.icon}</span>
                            </div>
                            <h3 className="text-2xl font-bold font-display mb-3" style={{ color: isDark ? '#ffffff' : '#0f172a' }}>
                                {feature.title}
                            </h3>
                             <p style={{ color: isDark ? '#94a3b8' : '#475569' }}>
                                {feature.description}
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
