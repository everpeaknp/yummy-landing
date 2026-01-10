"use client";

import { Navbar, Footer } from "@/components/layout";
import { useTheme } from "@/hooks/useTheme";
import { FiCode, FiCpu, FiDatabase } from "react-icons/fi";

export default function DevelopersPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <>
      <Navbar />
      <main 
        className="min-h-screen pt-32 pb-20 px-6"
        style={{ backgroundColor: isDark ? '#0a0a0a' : '#ffffff' }}
      >
        <div className="max-w-4xl mx-auto text-center">
           <div className="inline-flex items-center justify-center p-4 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mb-8">
              <FiCode size={32} />
           </div>
           <h1 className="text-4xl md:text-5xl font-black font-display mb-6" style={{ color: isDark ? '#ffffff' : '#0f172a' }}>
             Yummy for Developers
           </h1>
           <p className="text-xl mb-12 max-w-2xl mx-auto" style={{ color: isDark ? '#a3a3a3' : '#64748b' }}>
             Build powerful integrations with our robust API. Documentation and SDKs are coming soon properly.
           </p>

           <div className="grid md:grid-cols-3 gap-8 text-left">
              <div className="p-8 rounded-3xl border transition-all hover:shadow-lg" style={{ borderColor: isDark ? '#262626' : '#e2e8f0', backgroundColor: isDark ? '#171717' : '#ffffff' }}>
                  <FiDatabase className="mb-4 text-orange-500" size={28} />
                  <h3 className="text-xl font-bold mb-2" style={{ color: isDark ? '#ffffff' : '#0f172a' }}>Rest API</h3>
                  <p style={{ color: isDark ? '#a3a3a3' : '#64748b' }}>Comprehensive endpoints for menu, inventory, and order management.</p>
              </div>
              <div className="p-8 rounded-3xl border transition-all hover:shadow-lg" style={{ borderColor: isDark ? '#262626' : '#e2e8f0', backgroundColor: isDark ? '#171717' : '#ffffff' }}>
                  <FiCpu className="mb-4 text-purple-500" size={28} />
                  <h3 className="text-xl font-bold mb-2" style={{ color: isDark ? '#ffffff' : '#0f172a' }}>Webhooks</h3>
                  <p style={{ color: isDark ? '#a3a3a3' : '#64748b' }}>Real-time event notifications for order status changes and sync.</p>
              </div>
              <div className="p-8 rounded-3xl border transition-all hover:shadow-lg" style={{ borderColor: isDark ? '#262626' : '#e2e8f0', backgroundColor: isDark ? '#171717' : '#ffffff' }}>
                  <FiCode className="mb-4 text-green-500" size={28} />
                  <h3 className="text-xl font-bold mb-2" style={{ color: isDark ? '#ffffff' : '#0f172a' }}>SDKs</h3>
                  <p style={{ color: isDark ? '#a3a3a3' : '#64748b' }}>Official libraries for Node.js, Python, and PHP to speed up development.</p>
              </div>
           </div>
           
           <div className="mt-16">
               <button className="px-8 py-4 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold hover:opacity-90 transition-opacity">
                   Request Early Access
               </button>
           </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
