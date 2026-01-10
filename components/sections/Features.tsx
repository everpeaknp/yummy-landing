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
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6, 
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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-24"
        >
          <div 
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border"
            style={{ 
              backgroundColor: isDark ? 'rgba(30, 58, 138, 0.2)' : '#eff6ff', 
              color: isDark ? '#60a5fa' : '#2563eb',
              borderColor: isDark ? 'rgba(30, 58, 138, 0.3)' : '#bfdbfe'
            }}
          >
            <span className="material-symbols-outlined text-sm">bolt</span>
            <span>Powerful Features</span>
          </div>
          <h2 
            className="text-4xl sm:text-5xl font-black font-display mb-6"
            style={{ color: isDark ? '#ffffff' : '#0f172a' }}
          >
            Everything you need.
          </h2>
          <p className="text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: isDark ? '#94a3b8' : '#64748b' }}>
            Run your restaurant like a pro. We've combined the most essential tools into one seamless platform.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-12 gap-6"
        >
          {/* Card 1: Smart Inventory (Wide) */}
          <motion.div 
            variants={item}
            className="group md:col-span-8 relative h-[450px] rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:shadow-2xl hover:scale-[1.01]"
            style={{ 
              backgroundColor: isDark ? '#171717' : '#ffffff',
              border: isDark ? '1px solid #262626' : '1px solid #e5e7eb'
            }}
          >
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-green-500/5 dark:bg-green-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 transition-all duration-700 group-hover:bg-green-500/10 dark:group-hover:bg-green-500/20"></div>

            {/* Content */}
            <div className="absolute top-0 left-0 p-10 z-20 max-w-md">
              <div 
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-sm ring-1 ring-black/5 dark:ring-white/10"
                style={{ 
                   backgroundColor: isDark ? 'rgba(34, 197, 94, 0.1)' : '#f0fdf4', 
                   color: '#16a34a' 
                }}
              >
                <span className="material-symbols-outlined text-3xl">inventory_2</span>
              </div>
              <h3 className="text-3xl font-bold font-display mb-3" style={{ color: isDark ? '#fff' : '#0f172a' }}>
                Smart Inventory
              </h3>
              <p className="text-lg leading-relaxed" style={{ color: isDark ? '#a3a3a3' : '#64748b' }}>
                Ingredients are deducted automatically as you sell. Get real-time alerts before you run out.
              </p>
            </div>

            {/* Inner "Half Shown" Card */}
            <div className="absolute bottom-[-15%] right-[-5%] sm:right-[5%] w-[85%] sm:w-[60%] md:w-[50%] h-[75%] bg-white dark:bg-zinc-900 rounded-t-3xl border border-gray-200 dark:border-zinc-800 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] transform translate-y-[25%] group-hover:translate-y-[5%] transition-transform duration-500 ease-out z-10 p-6 flex flex-col gap-4">
               {/* Mock UI Header */}
               <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-white/5">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-green-500 text-lg">check_circle</span>
                    <span className="text-sm font-bold text-gray-700 dark:text-gray-200">Stock Status</span>
                  </div>
                  <span className="text-xs font-mono text-gray-400">Live Update</span>
               </div>
               
               {/* List Items */}
               <div className="flex flex-col gap-3">
                 {[
                   { name: "Chicken Breast", qty: "12kg", status: "In Stock", bar: "w-[80%] bg-green-500" },
                   { name: "Red Onions", qty: "2kg", status: "Low Stock", bar: "w-[20%] bg-yellow-500" },
                   { name: "Cooking Oil", qty: "1.5L", status: "Critical", bar: "w-[10%] bg-red-500" },
                   { name: "Basmati Rice", qty: "45kg", status: "In Stock", bar: "w-[95%] bg-green-500" },
                 ].map((i, idx) => (
                    <div key={idx} className="group/item">
                        <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium dark:text-gray-300">{i.name}</span>
                            <span className={`text-xs font-bold ${i.status === 'Critical' ? 'text-red-500' : i.status === 'Low Stock' ? 'text-yellow-500' : 'text-green-600'}`}>{i.qty}</span>
                        </div>
                        <div className="h-1.5 w-full bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${i.bar} transition-all duration-1000 group-hover:w-full opacity-80`}></div>
                        </div>
                    </div>
                 ))}
               </div>
            </div>
          </motion.div>

          {/* Card 2: IRD Billing (Tall/Square) */}
          <motion.div 
            variants={item}
            className="group md:col-span-4 relative h-[450px] rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] bg-slate-900 text-white"
          >
             {/* Background Verified Icon (Restored & Enhanced) */}
             <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
                 <span className="material-symbols-outlined text-[350px] text-white/10 group-hover:text-white/20 rotate-12 transition-all duration-700 select-none">verified</span>
             </div>

             <div className="absolute top-0 left-0 p-10 z-20">
              <div 
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-white/10 backdrop-blur-md ring-1 ring-white/20"
              >
                <span className="material-symbols-outlined text-3xl">receipt_long</span>
              </div>
              <h3 className="text-3xl font-bold font-display mb-3">
                IRD Billing
              </h3>
              <p className="text-lg text-slate-300 leading-relaxed">
                 Fully compliant with Nepal Tax Rules. Print with confidence.
              </p>
            </div>

            {/* Receipt Card Animation */}
            <div className="absolute bottom-[-30%] left-1/2 -translate-x-1/2 w-[70%] bg-white text-black shadow-2xl transform translate-y-[20%] group-hover:translate-y-[-10%] transition-transform duration-500 ease-out font-mono text-xs overflow-hidden after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-4 after:bg-[linear-gradient(45deg,transparent_33.333%,#fff_33.333%,#fff_66.667%,transparent_66.667%),linear-gradient(-45deg,transparent_33.333%,#fff_33.333%,#fff_66.667%,transparent_66.667%)] after:bg-[length:20px_20px] after:rotate-180 z-20">
                <div className="p-5 pb-8">
                    <div className="flex flex-col items-center mb-4">
                        <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white font-bold text-lg mb-2">Y</div>
                        <span className="font-bold text-sm">TAX INVOICE</span>
                        <span className="text-gray-500 text-[10px]">PAN: 123-456-789</span>
                    </div>
                    <div className="w-full border-b border-dashed border-gray-300 mb-2"></div>
                    <div className="space-y-2 mb-2">
                        <div className="flex justify-between"><span>1. Momo Plater</span><span>300</span></div>
                        <div className="flex justify-between"><span>2. Coke 500ml</span><span>100</span></div>
                        <div className="flex justify-between"><span>3. Ch. Burger</span><span>450</span></div>
                    </div>
                    <div className="w-full border-b border-dashed border-gray-300 mb-2"></div>
                    <div className="flex justify-between text-gray-500"><span>Subtotal</span><span>850</span></div>
                    <div className="flex justify-between text-gray-500"><span>VAT (13%)</span><span>110.5</span></div>
                    <div className="flex justify-between font-bold text-lg mt-2"><span>Total</span><span>Rs. 960.5</span></div>
                </div>
            </div>
          </motion.div>

          {/* Card 3: QR Menu */}
          <motion.div 
            variants={item}
            className="group md:col-span-6 relative h-[380px] rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:shadow-2xl hover:scale-[1.01]"
            style={{ 
              backgroundColor: isDark ? '#171717' : '#ffffff',
              border: isDark ? '1px solid #262626' : '1px solid #e5e7eb'
            }}
          >
             {/* Decor */}
             <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

             <div className="absolute top-0 left-0 p-10 z-20">
               <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-sm ring-1 ring-black/5 dark:ring-white/10" style={{ backgroundColor: isDark ? 'rgba(147, 51, 234, 0.1)' : '#faf5ff', color: '#9333ea' }}>
                  <span className="material-symbols-outlined text-3xl">qr_code_2</span>
               </div>
               <h3 className="text-2xl font-bold font-display mb-2" style={{ color: isDark ? '#fff' : '#0f172a' }}>
                Digital QR Menu
              </h3>
               <p className="text-lg" style={{ color: isDark ? '#a3a3a3' : '#64748b' }}>Allow customers to order instantly from their phone.</p>
             </div>

             {/* Phone Card Peeking Up */}
             <div className="absolute bottom-[-25%] right-8 w-44 h-72 bg-gray-900 rounded-[2.5rem] border-[6px] border-gray-800 shadow-2xl transform translate-y-[15%] rotate-[-12deg] group-hover:translate-y-[-5%] group-hover:rotate-[-5deg] transition-all duration-500 ease-out overflow-hidden z-10">
                {/* Dynamic Island */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-4 bg-black rounded-full z-20"></div>
                {/* Screen Content */}
                <div className="w-full h-full bg-white dark:bg-zinc-900 relative pt-8 px-3">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-[10px] font-bold text-gray-400">MENU</span>
                        <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 text-[10px]">1</div>
                    </div>
                    {/* Menu Items */}
                    <div className="space-y-3">
                        {[1, 2, 3].map((_, i) => (
                           <div key={i} className="flex gap-2 items-center p-2 rounded-xl bg-gray-50 dark:bg-zinc-800 border border-gray-100 dark:border-white/5">
                               <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-zinc-700"></div>
                               <div className="flex-1">
                                   <div className="h-2 w-16 bg-gray-200 dark:bg-zinc-600 rounded mb-1"></div>
                                   <div className="h-1.5 w-10 bg-gray-100 dark:bg-zinc-700 rounded"></div>
                               </div>
                               <div className="w-4 h-4 rounded-full bg-orange-500 flex items-center justify-center text-white text-[10px]">+</div>
                           </div>
                        ))}
                    </div>
                    {/* Cart Button */}
                    <div className="absolute bottom-4 left-3 right-3 h-8 bg-orange-500 rounded-lg shadow-lg shadow-orange-500/30 flex items-center justify-center text-white text-[10px] font-bold">
                        View Cart (1)
                    </div>
                </div>
             </div>
          </motion.div>

          {/* Card 4: Reports */}
          <motion.div 
            variants={item}
            className="group md:col-span-6 relative h-[380px] rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:shadow-2xl hover:scale-[1.01]"
            style={{ 
              backgroundColor: isDark ? '#171717' : '#ffffff',
              border: isDark ? '1px solid #262626' : '1px solid #e5e7eb'
            }}
          >
             {/* Decor */}
             <div className="absolute top-1/2 right-1/2 w-[300px] h-[300px] bg-pink-500/5 dark:bg-pink-500/10 rounded-full blur-3xl"></div>

             <div className="absolute top-0 left-0 p-10 z-20">
               <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-sm ring-1 ring-black/5 dark:ring-white/10" style={{ backgroundColor: isDark ? 'rgba(219, 39, 119, 0.1)' : '#fce7f3', color: '#db2777' }}>
                  <span className="material-symbols-outlined text-3xl">bar_chart</span>
               </div>
               <h3 className="text-2xl font-bold font-display mb-2" style={{ color: isDark ? '#fff' : '#0f172a' }}>
                Analytics
              </h3>
               <p className="text-lg" style={{ color: isDark ? '#a3a3a3' : '#64748b' }}>Track sales, staff performance, and peak hours.</p>
             </div>

             {/* Chart Card */}
             <div className="absolute bottom-0 right-0 w-[65%] h-[65%] bg-white dark:bg-zinc-900 border-t border-l border-gray-200 dark:border-zinc-800 rounded-tl-[2.5rem] shadow-lg transform translate-y-[20%] group-hover:translate-y-[5%] transition-transform duration-500 ease-out p-6 flex flex-col justify-end">
                 {/* Chart Visual */}
                 <div className="flex items-end justify-between gap-2 h-[80%] px-2 pb-2 border-b border-l border-gray-100 dark:border-zinc-800">
                     {[30, 45, 25, 60, 40, 75, 55].map((h, i) => {
                         const colors = [
                             { bg: 'bg-cyan-100 dark:bg-cyan-900/20', fill: 'bg-cyan-500' },
                             { bg: 'bg-blue-100 dark:bg-blue-900/20', fill: 'bg-blue-500' },
                             { bg: 'bg-indigo-100 dark:bg-indigo-900/20', fill: 'bg-indigo-500' },
                             { bg: 'bg-violet-100 dark:bg-violet-900/20', fill: 'bg-violet-500' },
                             { bg: 'bg-fuchsia-100 dark:bg-fuchsia-900/20', fill: 'bg-fuchsia-500' },
                             { bg: 'bg-pink-100 dark:bg-pink-900/20', fill: 'bg-pink-500' },
                             { bg: 'bg-rose-100 dark:bg-rose-900/20', fill: 'bg-rose-500' },
                         ];
                         const color = colors[i] || colors[0];
                         return (
                             <div key={i} className="relative w-full group/bar" style={{ height: `${h}%` }}>
                                <div 
                                    className={`w-full h-full ${color.bg} rounded-t-sm relative overflow-hidden transition-all duration-700 ease-out`}
                                >
                                    <div className={`absolute bottom-0 w-full h-full ${color.fill} opacity-80 group-hover:opacity-100 group-hover:h-full transition-all duration-700`} style={{ height: '50%' }}></div>
                                </div>
                                {/* Value tooltip */}
                                <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] bg-gray-800 text-white px-1.5 py-0.5 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap z-10">
                                    {h}k
                                </div>
                             </div>
                         );
                     })}
                 </div>
                 <div className="flex justify-between mt-2 px-1">
                     <span className="text-[10px] text-gray-400">Mon</span>
                     <span className="text-[10px] text-gray-400">Tue</span>
                     <span className="text-[10px] text-gray-400">Wed</span>
                     <span className="text-[10px] text-gray-400">Thu</span>
                     <span className="text-[10px] text-gray-400">Fri</span>
                     <span className="text-[10px] text-gray-400">Sat</span>
                     <span className="text-[10px] text-gray-400">Sun</span>
                 </div>
             </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
