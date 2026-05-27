"use client";

import { useTheme } from "@/hooks/useTheme";
import { Icon } from "@/components/ui/Icon";

export function SpeedGrid() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section 
      className="py-24 overflow-hidden relative"
      style={{ backgroundColor: isDark ? '#000000' : '#f8fafc' }}
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-black font-display mb-6" style={{ color: isDark ? '#ffffff' : '#0f172a' }}>
            Powerful Features, <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">Beautifully Simple</span>
          </h2>
          <p className="text-xl max-w-2xl mx-auto" style={{ color: isDark ? '#a3a3a3' : '#64748b' }}>
            A powerful suite of tools designed to streamline operations, delight customers, and boost your bottom line.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          
          {/* Card 1: Large Left */}
          <div className="md:col-span-2 md:row-span-2 rounded-[2rem] p-8 md:p-12 relative overflow-hidden group flex flex-col justify-between min-h-[450px]"
               style={{ 
                 backgroundColor: isDark ? '#18181b' : '#ffffff',
                 border: `1px solid ${isDark ? '#27272a' : '#e2e8f0'}`,
                 boxShadow: isDark ? '0 10px 40px -10px rgba(0,0,0,0.5)' : '0 10px 40px -10px rgba(0,0,0,0.05)'
               }}>
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10 mb-8 max-w-md">
              <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 flex items-center justify-center mb-6">
                <Icon name="point_of_sale" size={24} />
              </div>
              <h3 className="text-3xl font-bold font-display mb-4" style={{ color: isDark ? '#ffffff' : '#0f172a' }}>
                Lightning Fast POS
              </h3>
              <p className="text-lg leading-relaxed" style={{ color: isDark ? '#a1a1aa' : '#64748b' }}>
                Process orders in seconds, handle complex splits, and keep your line moving. Our intuitive interface requires zero training for your staff.
              </p>
            </div>
            {/* Visual Element: Custom POS Mockup */}
            <div className="relative w-full h-56 md:h-72 mt-auto rounded-t-2xl overflow-hidden border-t border-x shadow-[0_-10px_40px_-10px_rgba(0,0,0,0.1)] flex"
                 style={{ borderColor: isDark ? '#27272a' : '#e2e8f0', backgroundColor: isDark ? '#111111' : '#f8fafc' }}>
               {/* Left Menu Grid */}
               <div className="w-2/3 p-4 grid grid-cols-3 gap-3">
                 {[...Array(6)].map((_, i) => (
                   <div key={i} className="rounded-xl flex flex-col justify-end p-2 opacity-80"
                        style={{ backgroundColor: isDark ? '#1f2937' : '#ffffff', border: `1px solid ${isDark ? '#374151' : '#e2e8f0'}` }}>
                     <div className="w-full h-12 rounded-lg bg-orange-100 dark:bg-orange-900/30 mb-2"></div>
                     <div className="h-2 w-3/4 rounded bg-gray-200 dark:bg-gray-700 mb-1"></div>
                     <div className="h-2 w-1/2 rounded bg-orange-200 dark:bg-orange-800"></div>
                   </div>
                 ))}
               </div>
               {/* Right Receipt Panel */}
               <div className="w-1/3 border-l p-4 flex flex-col"
                    style={{ borderColor: isDark ? '#27272a' : '#e2e8f0', backgroundColor: isDark ? '#18181b' : '#ffffff' }}>
                 <div className="h-4 w-1/2 rounded bg-gray-300 dark:bg-gray-600 mb-4"></div>
                 <div className="space-y-3 flex-1">
                   {[...Array(3)].map((_, i) => (
                     <div key={i} className="flex justify-between items-center">
                       <div className="h-2 w-1/2 rounded bg-gray-200 dark:bg-gray-700"></div>
                       <div className="h-2 w-4 rounded bg-gray-300 dark:bg-gray-600"></div>
                     </div>
                   ))}
                 </div>
                 <div className="pt-3 border-t mt-auto" style={{ borderColor: isDark ? '#27272a' : '#e2e8f0' }}>
                   <div className="w-full h-8 rounded-lg bg-orange-500"></div>
                 </div>
               </div>
            </div>
          </div>

          {/* Card 2: Top Right */}
          <div className="rounded-[2rem] p-8 relative overflow-hidden group min-h-[280px] flex flex-col justify-center"
               style={{ 
                 backgroundColor: isDark ? '#18181b' : '#ffffff',
                 border: `1px solid ${isDark ? '#27272a' : '#e2e8f0'}`,
                 boxShadow: isDark ? '0 10px 40px -10px rgba(0,0,0,0.5)' : '0 10px 40px -10px rgba(0,0,0,0.05)'
               }}>
            <div className="absolute inset-0 bg-gradient-to-bl from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-6">
                <Icon name="table_restaurant" size={24} />
              </div>
              <h3 className="text-2xl font-bold font-display mb-3" style={{ color: isDark ? '#ffffff' : '#0f172a' }}>
                Smart Tables
              </h3>
              <p className="text-base" style={{ color: isDark ? '#a1a1aa' : '#64748b' }}>
                Visual floor plans. Know exactly which tables are free, occupied, or waiting for food.
              </p>
            </div>
          </div>

          {/* Card 3: Bottom Right */}
          <div className="rounded-[2rem] p-8 relative overflow-hidden group min-h-[280px] flex flex-col justify-center"
               style={{ 
                 backgroundColor: isDark ? '#18181b' : '#ffffff',
                 border: `1px solid ${isDark ? '#27272a' : '#e2e8f0'}`,
                 boxShadow: isDark ? '0 10px 40px -10px rgba(0,0,0,0.5)' : '0 10px 40px -10px rgba(0,0,0,0.05)'
               }}>
            <div className="absolute inset-0 bg-gradient-to-tl from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center mb-6">
                <Icon name="monitoring" size={24} />
              </div>
              <h3 className="text-2xl font-bold font-display mb-3" style={{ color: isDark ? '#ffffff' : '#0f172a' }}>
                Real-Time Analytics
              </h3>
              <p className="text-base" style={{ color: isDark ? '#a1a1aa' : '#64748b' }}>
                Track sales, popular items, and staff performance live from anywhere.
              </p>
            </div>
          </div>

          {/* Card 4: Bottom Full Width */}
          <div className="md:col-span-3 rounded-[2rem] p-8 md:p-12 relative overflow-hidden group flex flex-col md:flex-row items-center gap-8"
               style={{ 
                 backgroundColor: isDark ? '#18181b' : '#ffffff',
                 border: `1px solid ${isDark ? '#27272a' : '#e2e8f0'}`,
                 boxShadow: isDark ? '0 10px 40px -10px rgba(0,0,0,0.5)' : '0 10px 40px -10px rgba(0,0,0,0.05)'
               }}>
            <div className="absolute inset-0 bg-gradient-to-t from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="md:w-1/2 relative z-10">
              <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-6">
                <Icon name="receipt_long" size={24} />
              </div>
              <h3 className="text-3xl font-bold font-display mb-4" style={{ color: isDark ? '#ffffff' : '#0f172a' }}>
                Seamless Kitchen Sync
              </h3>
              <p className="text-lg leading-relaxed mb-6" style={{ color: isDark ? '#a1a1aa' : '#64748b' }}>
                Orders flow instantly from the table to the kitchen display or printer. Eliminate miscommunications and serve food faster than ever before.
              </p>
              <ul className="space-y-2">
                {['Direct to Kitchen', 'Digital Displays', 'Status Tracking'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm font-medium" style={{ color: isDark ? '#d4d4d8' : '#475569' }}>
                    <Icon name="check_circle" size={18} className="text-purple-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:w-1/2 w-full h-64 md:h-80 relative flex items-center justify-center">
               {/* Decorative background circle */}
               <div className="absolute inset-0 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-3xl transform group-hover:scale-110 transition-transform duration-700"></div>
               
               {/* KOT Ticket UI Mockup */}
               <div className="relative w-64 bg-yellow-50 dark:bg-zinc-800 rounded-lg shadow-xl border border-yellow-100 dark:border-zinc-700 transform rotate-[-2deg] group-hover:rotate-0 transition-all duration-500 flex flex-col">
                 <div className="h-2 w-full bg-gradient-to-r from-purple-400 to-purple-500 rounded-t-lg"></div>
                 <div className="p-5">
                   <div className="flex justify-between items-center mb-4 border-b border-yellow-200 dark:border-zinc-600 pb-3">
                     <div>
                       <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Table 12</div>
                       <div className="font-mono font-bold text-lg" style={{ color: isDark ? '#f8fafc' : '#0f172a' }}>#8429</div>
                     </div>
                     <div className="px-2 py-1 rounded bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 text-xs font-bold">
                       04:22
                     </div>
                   </div>
                   <div className="space-y-4">
                     {[
                       { qty: '1', item: 'Truffle Burger', mods: 'No Onions, Medium Rare' },
                       { qty: '2', item: 'Sweet Potato Fries', mods: 'Extra Crispy' }
                     ].map((order, i) => (
                       <div key={i} className="flex gap-3">
                         <div className="font-mono font-bold text-gray-500">{order.qty}</div>
                         <div>
                           <div className="font-bold text-sm mb-1" style={{ color: isDark ? '#e2e8f0' : '#334155' }}>{order.item}</div>
                           <div className="text-xs text-red-500 dark:text-red-400 font-medium">{order.mods}</div>
                         </div>
                       </div>
                     ))}
                   </div>
                 </div>
                 {/* Ticket jagged edge at bottom */}
                 <div className="h-3 w-full relative overflow-hidden mt-auto">
                   <div className="absolute inset-0" style={{
                     backgroundSize: '12px 12px',
                     backgroundImage: `radial-gradient(circle at 6px 12px, transparent 6px, ${isDark ? '#27272a' : '#f8fafc'} 7px)`
                   }}></div>
                 </div>
               </div>
               
               {/* Floating confirmation badge */}
               <div className="absolute -bottom-4 -right-4 bg-white dark:bg-zinc-800 rounded-full shadow-lg border border-gray-100 dark:border-zinc-700 p-3 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                 <Icon name="done_all" size={24} className="text-green-500" />
               </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
