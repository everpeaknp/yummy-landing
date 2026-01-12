"use client";

import { useTheme } from "@/hooks/useTheme";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const features = [
  {
    id: "track",
    title: "Track Every Order in Real Time",
    description: "Gain complete visibility over your restaurant's operations. Monitor active orders, view history, and track performance metrics live as they happen.",
    points: ["Active Orders Dashboard", "Order History Log", "Full Visibility"],
    icon: "dashboard",
    image: "/images/screen1.jpeg"
  },
  {
    id: "billing",
    title: "Fast Orders, Instant Billing",
    description: "Streamline your checkout process. Tap to add items, automatically calculate totals, and process payments instantly for a smoother customer experience.",
    points: ["Tap to Add", "Auto Total Calculation", "Smooth Checkout"],
    icon: "flash_on",
    image: "/images/screen2.jpeg"
  },
  {
    id: "tables",
    title: "Smart Table Management",
    description: "Manage your floor plan efficiently. See real-time status of every table—available, occupied, or reserved—at a single glance.",
    points: ["Available/Occupied Status", "Reserved Tables", "Floor Plan Overview"],
    icon: "table_restaurant",
    image: "/images/screen3.jpeg"
  },
  {
    id: "pos",
    title: "Your Complete Restaurant POS",
    description: "A comprehensive solution for all your needs. Handle orders, kitchen communication, billing, and analytics from one unified platform.",
    points: ["Order Management", "Kitchen Direct Sync", "Billing & Analytics"],
    icon: "point_of_sale",
    image: "/images/screen4.jpeg"
  },
  {
    id: "kot",
    title: "Never Miss an Order",
    description: "Ensure perfect coordination with the kitchen. Live KOT displays keep pending and ready statuses synchronized for faster service.",
    points: ["Live KOT Display", "Pending & Ready Status", "Faster Service Speed"],
    icon: "checklist",
    image: "/images/screen5.jpeg"
  }
];

export function ExpandableGallery() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [activeIdx, setActiveIdx] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (isHovering) return;
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % features.length);
    }, 5000); 
    return () => clearInterval(interval);
  }, [isHovering]);

  return (
    <section
      id="gallery"
      className="py-24 lg:py-32 overflow-hidden"
      style={{ 
        backgroundColor: isDark ? '#0a0a0a' : '#fff'
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 
            className="text-4xl sm:text-6xl font-black font-display mb-6"
            style={{ color: isDark ? '#ffffff' : '#0f172a' }}
          >
            What Yummy offers?
          </h2>
          <p className="text-xl max-w-2xl mx-auto" style={{ color: isDark ? '#94a3b8' : '#64748b' }}>
            A comprehensive suite of tools designed to modernize every aspect of your restaurant.
          </p>
        </div>

        {/* Desktop View (Two Column) */}
        <div className="hidden lg:flex flex-row gap-20 items-stretch">
          
          {/* Left Side: Image */}
          <div className="w-1/2 relative min-h-[600px] rounded-3xl overflow-hidden shadow-2xl border border-gray-100 dark:border-white/10 order-1">
             <AnimatePresence mode="wait">
                <motion.div
                  key={features[activeIdx].id}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                   <Image 
                     src={features[activeIdx].image}
                     alt={features[activeIdx].title}
                     fill
                     className="object-cover"
                     priority
                     unoptimized
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                   <div className="absolute bottom-0 left-0 p-12">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 rounded-xl bg-white/20 backdrop-blur-md border border-white/10 text-white">
                             <span className="material-symbols-outlined text-3xl">
                               {features[activeIdx].icon}
                             </span>
                        </div>
                        <h3 className="text-3xl font-bold text-white font-display">
                            {features[activeIdx].title}
                        </h3>
                      </div>
                   </div>
                </motion.div>
             </AnimatePresence>
          </div>

          {/* Right Side: Content */}
          <div 
             className="w-1/2 flex flex-col justify-center order-2"
             onMouseEnter={() => setIsHovering(true)}
             onMouseLeave={() => setIsHovering(false)}
          >
            <div className="space-y-4">
              {features.map((feature, idx) => {
                const isActive = activeIdx === idx;
                return (
                  <div
                    key={feature.id}
                    onClick={() => setActiveIdx(idx)}
                    className={`
                       relative p-6 rounded-3xl cursor-pointer transition-all duration-300 border
                       ${isActive ? 'shadow-lg bg-gray-50 dark:bg-zinc-900 border-gray-200 dark:border-zinc-800' : 'hover:bg-gray-50 dark:hover:bg-white/5 border-transparent'}
                    `}
                  >
                    <div className="flex gap-6 items-start">
                       <div className="pt-1">
                           <div 
                             className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border transition-colors duration-300
                                ${isActive 
                                    ? 'bg-orange-500 border-orange-500 text-white' 
                                    : 'bg-transparent border-gray-300 dark:border-zinc-700 text-gray-400'
                                }
                             `}
                           >
                             {idx + 1}
                           </div>
                       </div>
                       <div className="flex-1">
                          <h3 
                            className={`text-xl font-bold font-display mb-2 transition-colors duration-300 ${isActive ? (isDark ? 'text-white' : 'text-slate-900') : (isDark ? 'text-slate-400' : 'text-slate-500')}`}
                          >
                             {feature.title}
                          </h3>
                          <motion.div
                            initial={false}
                            animate={{ 
                              height: isActive ? 'auto' : 0,
                              opacity: isActive ? 1 : 0
                            }}
                            className="overflow-hidden"
                          >
                             <p 
                               className="text-base leading-relaxed mb-4"
                               style={{ color: isDark ? '#94a3b8' : '#64748b' }}
                             >
                               {feature.description}
                             </p>
                             <div className="grid grid-cols-2 gap-2">
                                {feature.points.map((point, pIdx) => (
                                    <div key={pIdx} className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                                        <span className="text-sm font-medium" style={{ color: isDark ? '#cbd5e1' : '#475569' }}>{point}</span>
                                    </div>
                                ))}
                             </div>
                          </motion.div>
                       </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile View (Snap Swiper with Auto-Play) */}
        <div className="lg:hidden w-screen -ml-6 relative">
             <MobileAutoSlider features={features} />
        </div>
      </div>
    </section>
  );
}

function MobileAutoSlider({ features }: { features: any[] }) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            if (scrollRef.current) {
                const { scrollLeft, clientWidth, scrollWidth } = scrollRef.current;
                const isEnd = scrollLeft + clientWidth >= scrollWidth - 10; 
                
                scrollRef.current.scrollTo({
                    left: isEnd ? 0 : scrollLeft + clientWidth,
                    behavior: 'smooth'
                });
            }
        }, 3500);

        return () => clearInterval(interval);
    }, [isPaused]);

    return (
        <div 
            ref={scrollRef}
            className="flex w-full overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-smooth gap-4 px-6 pb-8"
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setTimeout(() => setIsPaused(false), 3000)}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {features.map((feature, idx) => (
                <div 
                    key={`${feature.id}-${idx}`} 
                    className="min-w-[85vw] h-[70vh] relative flex-shrink-0 snap-center rounded-3xl overflow-hidden border border-gray-200 dark:border-white/10"
                >
                     <MobileSlide feature={feature} index={idx} total={features.length} />
                </div>
            ))}
        </div>
    );
}

function MobileSlide({ feature, index, total }: { feature: any, index: number, total: number }) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div 
            className="w-full h-full relative bg-zinc-900"
            onClick={() => setIsExpanded(!isExpanded)}
        >
             {/* Image: Cover to fill gaps */}
             <div className="absolute inset-0"> 
                <Image 
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover object-top"
                    unoptimized
                />
             </div>

            {/* Content Overlay */}
            <div className={`absolute bottom-0 left-0 w-full z-10 transition-all duration-300 ${isExpanded ? 'bg-black/95 h-3/4 border-t border-white/10' : 'bg-gradient-to-t from-black via-black/90 to-transparent h-auto'}`}>
                <div className="p-6">
                    <div className="flex items-start justify-between mb-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold mb-3">
                            <span className="material-symbols-outlined text-sm">{feature.icon}</span>
                            <span className="opacity-80">0{index + 1}</span>
                        </div>
                        
                        <div className={`p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                            <span className="material-symbols-outlined text-xl">expand_less</span>
                        </div>
                    </div>

                    <h3 className="text-2xl font-bold font-display leading-tight mb-2 text-white">
                        {feature.title}
                    </h3>

                    <AnimatePresence>
                        {isExpanded && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                            >
                                <p className="text-gray-300 leading-relaxed mb-4 text-sm mt-2">
                                    {feature.description}
                                </p>
                                <div className="grid grid-cols-1 gap-2 pb-4">
                                    {feature.points.map((point: string, idx: number) => (
                                        <div key={idx} className="flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 flex-shrink-0"></span>
                                            <span className="text-xs font-medium text-gray-400">{point}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    
                    {!isExpanded && (
                        <p className="text-xs text-white/50 mt-1 font-medium tracking-wide uppercase">Tap to View Details</p>
                    )}
                </div>
            </div>
        </div>
    );
}
