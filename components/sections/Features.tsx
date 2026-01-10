"use client";

import { useTheme } from "@/hooks/useTheme";
import { motion, Variants } from "framer-motion";

export function Features() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.8, 
        ease: "easeOut" 
      } 
    }
  };

  return (
    <section
      id="features"
      className="py-32"
      style={{ 
        backgroundColor: isDark ? '#0a0a0a' : '#f8fafc'
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <div 
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4"
            style={{ 
              backgroundColor: isDark ? 'rgba(30, 58, 138, 0.3)' : '#dbeafe', 
              color: isDark ? '#93c5fd' : '#1d4ed8' 
            }}
          >
            <span className="material-symbols-outlined text-sm">bolt</span>
            <span>Powerful Features</span>
          </div>
          <h2 
            className="text-4xl sm:text-5xl font-black font-display mb-4"
            style={{ color: isDark ? '#ffffff' : '#0f172a' }}
          >
            Everything you need.
          </h2>
          <p className="text-lg" style={{ color: '#64748b' }}>
            From Smart Inventory to IRD Billing, we have covered it all.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-6 gap-6 auto-rows-[minmax(180px,auto)]"
        >
          {/* Feature 1: Inventory (Large) */}
          <motion.div 
            variants={item}
            whileHover={{ y: -5 }}
            className="group md:col-span-4 p-8 rounded-3xl bento-card flex flex-col justify-between overflow-hidden relative cursor-pointer"
            style={{ 
              backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#ffffff', 
              border: isDark ? '1px solid rgba(255,255,255,0.05)' : '1px solid #e2e8f0' 
            }}
          >
            <div className="relative z-10">
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ 
                  backgroundColor: isDark ? 'rgba(22, 163, 74, 0.3)' : '#dcfce7', 
                  color: '#16a34a' 
                }}
              >
                <span className="material-symbols-outlined">inventory_2</span>
              </div>
              <h3 className="text-2xl font-bold font-display mb-2" style={{ color: isDark ? '#ffffff' : '#0f172a' }}>
                Smart Inventory
              </h3>
              <p className="max-w-sm mb-24 sm:mb-0" style={{ color: isDark ? '#94a3b8' : '#475569' }}>
                Ingredients are deducted automatically as you sell. Get low
                stock alerts before you run out.
              </p>
            </div>
            
            {/* Background Blob - Animated on Hover */}
            <div className="absolute right-0 bottom-0 w-1/2 h-3/4 opacity-20 bg-green-500 blur-3xl rounded-full translate-x-12 translate-y-12 transition-all duration-700 group-hover:opacity-40 group-hover:scale-125 group-hover:blur-[80px]"></div>
            
            {/* Mock UI Element - Responsive & Animated */}
            <div 
              className="absolute bottom-6 right-6 p-4 rounded-xl shadow-lg text-xs font-mono transition-transform duration-500 group-hover:-translate-y-4 group-hover:shadow-2xl scale-90 sm:scale-100 origin-bottom-right"
              style={{ 
                backgroundColor: isDark ? '#000000' : '#ffffff', 
                border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid #f1f5f9' 
              }}
            >
              <div className="flex justify-between gap-8 mb-2">
                <span style={{ color: '#64748b' }}>Chicken</span>
                <span style={{ color: '#22c55e', fontWeight: 'bold' }}>12kg</span>
              </div>
              <div className="flex justify-between gap-8 mb-2">
                <span style={{ color: '#64748b' }}>Onions</span>
                <span style={{ color: '#eab308', fontWeight: 'bold' }}>4kg ⚠️</span>
              </div>
              <div className="flex justify-between gap-8">
                <span style={{ color: '#64748b' }}>Flour</span>
                <span style={{ color: '#ef4444', fontWeight: 'bold' }}>1kg 🚨</span>
              </div>
            </div>
          </motion.div>

          {/* Feature 2: IRD Billing (Tall) */}
          <motion.div 
            variants={item}
            className="md:col-span-2 md:row-span-2 p-8 rounded-3xl bento-card flex flex-col relative overflow-hidden"
            style={{ 
              backgroundColor: isDark ? '#ffffff' : '#0f172a', 
              color: isDark ? '#000000' : '#ffffff' 
            }}
          >
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
              style={{ backgroundColor: isDark ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.2)' }}
            >
              <span className="material-symbols-outlined">receipt_long</span>
            </div>
            <h3 className="text-2xl font-bold font-display mb-2">
              IRD Approved
            </h3>
            <p style={{ opacity: 0.8 }} className="mb-8">
              Fully compliant with Tax Rules of Nepal. Print VAT bills with
              confidence.
            </p>
            <div className="mt-auto flex justify-center">
              <span className="text-6xl material-symbols-outlined opacity-10 scale-[2.5]">
                verified
              </span>
            </div>
          </motion.div>

          {/* Feature 3: QR Menu */}
          <motion.div 
            variants={item}
            className="md:col-span-2 p-8 rounded-3xl bento-card"
            style={{ 
              backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#ffffff', 
              border: isDark ? '1px solid rgba(255,255,255,0.05)' : '1px solid #e2e8f0' 
            }}
          >
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
              style={{ 
                backgroundColor: isDark ? 'rgba(147, 51, 234, 0.3)' : '#f3e8ff', 
                color: '#9333ea' 
              }}
            >
              <span className="material-symbols-outlined">qr_code_2</span>
            </div>
            <h3 className="text-xl font-bold font-display mb-2" style={{ color: isDark ? '#ffffff' : '#0f172a' }}>
              Digital QR Menu
            </h3>
            <p className="text-sm" style={{ color: isDark ? '#94a3b8' : '#475569' }}>
              Let customers scan and view your menu instantly on their phones.
            </p>
          </motion.div>

          {/* Feature 4: Analytics */}
          <motion.div 
            variants={item}
            className="md:col-span-2 p-8 rounded-3xl bento-card"
            style={{ 
              backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#ffffff', 
              border: isDark ? '1px solid rgba(255,255,255,0.05)' : '1px solid #e2e8f0' 
            }}
          >
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
              style={{ 
                backgroundColor: isDark ? 'rgba(219, 39, 119, 0.3)' : '#fce7f3', 
                color: '#db2777' 
              }}
            >
              <span className="material-symbols-outlined">analytics</span>
            </div>
            <h3 className="text-xl font-bold font-display mb-2" style={{ color: isDark ? '#ffffff' : '#0f172a' }}>
              Real-time Reports
            </h3>
            <p className="text-sm" style={{ color: isDark ? '#94a3b8' : '#475569' }}>
              Track sales, staff performance, and peak hours from anywhere.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
