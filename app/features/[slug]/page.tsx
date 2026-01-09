"use client";

import { Navbar, Footer } from "@/components/layout";
import { useTheme } from "@/hooks/useTheme";
import { useParams } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";

const featuresData: Record<string, { title: string; description: string; content: string; image: string }> = {
  "smart-inventory": {
    title: "Smart Inventory",
    description: "Ingredients are deducted automatically as you sell.",
    content: "Get low stock alerts, manage vendors, and track food costs in real-time. Our smart inventory system integrates directly with your POS, so you never have to manually update stock counts again. Predict your ordering needs and reduce waste by up to 30%.",
    image: "https://images.unsplash.com/photo-1556740758-90de29cf1374?q=80&w=2500&auto=format&fit=crop"
  },
  "ird-billing": {
    title: "IRD Approved Billing",
    description: "Fully compliant with Tax Rules of Nepal.",
    content: "Print VAT bills with confidence. We are certified by the Inland Revenue Department of Nepal to provide electronic billing solutions. Generate sales reports, VAT returns, and audit trails automatically.",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2500&auto=format&fit=crop"
  },
  "qr-menu": {
    title: "Digital QR Menu",
    description: "Let customers scan and view your menu instantly.",
    content: "Contactless ordering has never been easier. Update your pricing and items in real-time without re-printing paper menus. Support multiple languages and dietary filters to provide a superior guest experience.",
    image: "https://images.unsplash.com/photo-1595079676339-1534801fafde?q=80&w=2500&auto=format&fit=crop"
  },
  "reports": {
    title: "Real-time Reports",
    description: "Track sales, staff performance, and peak hours.",
    content: "Access your dashboard from anywhere. Visualize your data with beautiful charts and export detailed reports for your accounting needs. Understand what sells best and when.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2500&auto=format&fit=crop"
  }
};

export default function FeaturePage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const params = useParams();
  const slug = params.slug as string;
  const feature = featuresData[slug];

  if (!feature) {
    return (
       <>
      <Navbar />
      <motion.main 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }}
        className="pt-32 min-h-screen flex items-center justify-center" 
        style={{ backgroundColor: isDark ? '#0a0a0a' : '#ffffff', color: isDark? '#fff' : '#000' }}
      >
        <h1 className="text-2xl font-bold">Feature Not Found</h1>
      </motion.main>
      <Footer />
    </>
    )
  }

  return (
    <>
      <Navbar />
      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="pt-32 pb-20 min-h-screen" 
        style={{ backgroundColor: isDark ? '#0a0a0a' : '#ffffff' }}
      >
         <div className="max-w-4xl mx-auto px-6">
            <h1 className="text-5xl md:text-7xl font-black font-display mb-8" style={{ color: isDark ? '#ffffff' : '#0f172a' }}>
                {feature.title}
            </h1>
            <p className="text-xl md:text-2xl mb-12" style={{ color: isDark ? '#94a3b8' : '#475569' }}>
                {feature.description}
            </p>
            
            <div className="prose prose-lg px-8 py-8 rounded-3xl mb-12" style={{ 
                backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#f8fafc',
                color: isDark ? '#d4d4d4' : '#334155'
            }}>
                <p className="leading-relaxed">{feature.content}</p>
            </div>
            
             <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="aspect-video w-full rounded-3xl overflow-hidden shadow-2xl relative"
             >
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-cover"
                />
            </motion.div>
         </div>
      </motion.main>
      <Footer />
    </>
  );
}
