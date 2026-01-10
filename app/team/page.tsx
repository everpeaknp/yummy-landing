"use client";

import { Navbar, Footer } from "@/components/layout";
import Image from "next/image";
import { useTheme } from "@/hooks/useTheme";
import { FiUsers, FiTarget, FiHeart } from "react-icons/fi";
import { motion, Variants } from "framer-motion";


export default function TeamPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50, damping: 20 } }
  };

  return (
    <>
      <Navbar />
      <motion.main 
        className="min-h-screen pt-32 pb-20 px-6"
        style={{ backgroundColor: isDark ? '#0a0a0a' : '#ffffff' }}
        variants={container}
        initial="hidden"
        animate="show"
      >
        <div className="max-w-6xl mx-auto text-center">
           <motion.div variants={item} className="inline-flex items-center justify-center p-4 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 mb-8">
              <FiUsers size={32} />
           </motion.div>
           <motion.h1 variants={item} className="text-4xl md:text-5xl font-black font-display mb-6" style={{ color: isDark ? '#ffffff' : '#0f172a' }}>
             Meet the Team
           </motion.h1>

           <motion.div variants={item} className="flex justify-center mb-10">
              <Image 
                src="/images/Everacy_logo_withbg.png" 
                alt="Everacy" 
                width={150} 
                height={150} 
                className="h-24 w-auto rounded-xl shadow-lg"
              />
           </motion.div>

           <motion.p variants={item} className="text-xl mb-16 max-w-2xl mx-auto" style={{ color: isDark ? '#a3a3a3' : '#64748b' }}>
             Yummy Ever is the flagship product of <span className="font-bold text-orange-500">Everacy</span>. We are a passionate group of foodies, engineers, and designers on a mission to revolutionize the restaurant industry.
           </motion.p>

           <motion.div variants={item} className="grid md:grid-cols-3 gap-8 text-left mb-20">
              {/* Value 1 */}
              <div className="p-8 rounded-3xl border transition-all hover:shadow-lg" style={{ borderColor: isDark ? '#262626' : '#e2e8f0', backgroundColor: isDark ? '#171717' : '#ffffff' }}>
                  <FiTarget className="mb-4 text-primary" size={28} />
                  <h3 className="text-xl font-bold mb-2" style={{ color: isDark ? '#ffffff' : '#0f172a' }}>Our Mission</h3>
                  <p style={{ color: isDark ? '#a3a3a3' : '#64748b' }}>To empower restaurant owners with world-class technology that simplifies operations and drives growth.</p>
              </div>
              {/* Value 2 */}
              <div className="p-8 rounded-3xl border transition-all hover:shadow-lg" style={{ borderColor: isDark ? '#262626' : '#e2e8f0', backgroundColor: isDark ? '#171717' : '#ffffff' }}>
                  <FiHeart className="mb-4 text-red-500" size={28} />
                  <h3 className="text-xl font-bold mb-2" style={{ color: isDark ? '#ffffff' : '#0f172a' }}>Customer First</h3>
                  <p style={{ color: isDark ? '#a3a3a3' : '#64748b' }}>We believe in building relationships, not just software. Your success is our success, and we're with you every step.</p>
              </div>
              {/* Value 3 */}
              <div className="p-8 rounded-3xl border transition-all hover:shadow-lg" style={{ borderColor: isDark ? '#262626' : '#e2e8f0', backgroundColor: isDark ? '#171717' : '#ffffff' }}>
                  <FiUsers className="mb-4 text-blue-500" size={28} />
                  <h3 className="text-xl font-bold mb-2" style={{ color: isDark ? '#ffffff' : '#0f172a' }}>Local Roots</h3>
                  <p style={{ color: isDark ? '#a3a3a3' : '#64748b' }}>Born in Nepal, for Nepal. We understand the unique challenges of the local market and build solutions that work here.</p>
              </div>
           </motion.div>

           {/* Join Us Section */}
           <motion.div variants={item} className="rounded-3xl p-12 relative overflow-hidden" style={{ backgroundColor: isDark ? '#171717' : '#f8fafc' }}>
               <div className="relative z-10">
                   <h2 className="text-3xl font-bold mb-4" style={{ color: isDark ? '#ffffff' : '#0f172a' }}>Want to join us?</h2>
                   <p className="mb-8 max-w-xl mx-auto" style={{ color: isDark ? '#a3a3a3' : '#64748b' }}>
                       We are always looking for talented individuals to join our growing team. Check out our open positions.
                   </p>
                   <a href="/careers" className="inline-block px-8 py-3 rounded-full bg-primary text-white font-bold hover:bg-orange-600 transition-colors">
                       View Careers
                   </a>
               </div>
           </motion.div>
        </div>
      </motion.main>
      <Footer />
    </>
  );
}
