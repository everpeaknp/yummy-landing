'use client'

import { useTheme } from '@/hooks/useTheme'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { useGalleryData, type GalleryData, type GalleryFeature } from '@/lib/api'
import { InlineHTMLContent } from '@/components/ui/HTMLContent'
import { Icon } from '@/components/ui/Icon'

const fallbackFeatures: GalleryFeature[] = [
  {
    id: 'track',
    title: 'Track Every Order in Real Time',
    description:
      "Gain complete visibility over your restaurant's operations. Monitor active orders, view history, and track performance metrics live as they happen.",
    bulletPoints: ['Active Orders Dashboard', 'Order History Log', 'Full Visibility'],
    icon: 'dashboard',
    imageUrl: '/images/screen1.jpeg',
    order: 1,
  },
  {
    id: 'billing',
    title: 'Fast Orders, Instant Billing',
    description:
      'Streamline your checkout process. Tap to add items, automatically calculate totals, and process payments instantly for a smoother customer experience.',
    bulletPoints: ['Tap to Add', 'Auto Total Calculation', 'Smooth Checkout'],
    icon: 'flash_on',
    imageUrl: '/images/screen2.jpeg',
    order: 2,
  },
  {
    id: 'tables',
    title: 'Smart Table Management',
    description:
      'Manage your floor plan efficiently. See real-time status of every table—available, occupied, or reserved—at a single glance.',
    bulletPoints: ['Available/Occupied Status', 'Reserved Tables', 'Floor Plan Overview'],
    icon: 'table_restaurant',
    imageUrl: '/images/screen3.jpeg',
    order: 3,
  },
  {
    id: 'pos',
    title: 'Your Complete Restaurant POS',
    description:
      'A comprehensive solution for all your needs. Handle orders, kitchen communication, billing, and analytics from one unified platform.',
    bulletPoints: ['Order Management', 'Kitchen Direct Sync', 'Billing & Analytics'],
    icon: 'point_of_sale',
    imageUrl: '/images/screen4.jpeg',
    order: 4,
  },
  {
    id: 'kot',
    title: 'Never Miss an Order',
    description:
      'Ensure perfect coordination with the kitchen. Live KOT displays keep pending and ready statuses synchronized for faster service.',
    bulletPoints: ['Live KOT Display', 'Pending & Ready Status', 'Faster Service Speed'],
    icon: 'checklist',
    imageUrl: '/images/screen5.jpeg',
    order: 5,
  },
]

const fallbackData: Partial<GalleryData> = {
  title: 'What Yummy offers?',
  subtitle: 'A comprehensive suite of tools designed to modernize every aspect of your restaurant.',
  features: fallbackFeatures,
}

export function ExpandableGallery() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const { data } = useGalleryData(fallbackData)

  const features = data.features || fallbackFeatures
  const [activeIdx, setActiveIdx] = useState(0)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    if (isHovering) return
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % features.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [isHovering, features.length])

  return (
    <section
      id="gallery"
      className="py-12 lg:py-16 overflow-hidden"
      style={{
        backgroundColor: isDark ? '#0a0a0a' : '#f8fafc',
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2
            className="text-4xl sm:text-6xl font-black font-display mb-6"
            style={{ color: isDark ? '#ffffff' : '#0f172a' }}
          >
            <InlineHTMLContent html={data.title || ''} />
          </h2>
          <p
            className="text-xl max-w-2xl mx-auto"
            style={{ color: isDark ? '#94a3b8' : '#64748b' }}
          >
            <InlineHTMLContent html={data.subtitle || ''} />
          </p>
        </div>

        {/* Desktop View (Two Column) */}
        <div className="hidden lg:flex flex-row gap-16 xl:gap-24 items-center">
          {/* Left Side: Image */}
          <div className="relative w-[360px] xl:w-[440px] aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-gray-200 dark:border-white/10 order-1 shrink-0 bg-white dark:bg-zinc-900">
            <AnimatePresence mode="wait">
              <motion.div
                key={features[activeIdx]?.id || 'loading'}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                {features[activeIdx] && (
                  <>
                    <Image
                      src={features[activeIdx].imageUrl}
                      alt={features[activeIdx].title}
                      fill
                      className="object-cover object-center"
                      priority
                      unoptimized
                    />
                    <div className="absolute inset-0 dark:bg-gradient-to-t dark:from-black/95 dark:via-black/30 dark:to-transparent pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 p-8 w-full z-10">
                      <div className="flex items-center gap-4 mb-2">
                        <div className="p-3 rounded-2xl bg-black/5 dark:bg-white/20 backdrop-blur-md border border-black/10 dark:border-white/20 text-slate-900 dark:text-white shadow-xl">
                          <Icon name={features[activeIdx].icon} size={28} />
                        </div>
                        <h3 className="text-2xl xl:text-3xl font-bold text-slate-900 dark:text-white font-display leading-tight drop-shadow-lg">
                          <InlineHTMLContent html={features[activeIdx].title} />
                        </h3>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Side: Content */}
          <div
            className="flex-1 flex flex-col justify-center order-2"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className="space-y-4">
              {features.map((feature, idx) => {
                const isActive = activeIdx === idx
                return (
                  <div
                    key={feature.id}
                    onClick={() => setActiveIdx(idx)}
                    className={`
                       relative p-6 rounded-3xl cursor-pointer transition-all duration-300 border
                       ${
                         isActive
                           ? 'shadow-lg bg-gray-50 dark:bg-zinc-900 border-gray-200 dark:border-zinc-800'
                           : 'hover:bg-gray-50 dark:hover:bg-white/5 border-transparent'
                       }
                    `}
                  >
                    <div className="flex gap-6 items-start">
                      <div className="pt-1">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border transition-colors duration-300
                                ${
                                  isActive
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
                          className={`text-xl font-bold font-display mb-2 transition-colors duration-300 ${
                            isActive
                              ? isDark
                                ? 'text-white'
                                : 'text-slate-900'
                              : isDark
                              ? 'text-slate-400'
                              : 'text-slate-500'
                          }`}
                        >
                          <InlineHTMLContent html={feature.title} />
                        </h3>
                        <motion.div
                          initial={false}
                          animate={{
                            height: isActive ? 'auto' : 0,
                            opacity: isActive ? 1 : 0,
                          }}
                          className="overflow-hidden"
                        >
                          <p
                            className="text-base leading-relaxed mb-4"
                            style={{ color: isDark ? '#94a3b8' : '#64748b' }}
                          >
                            <InlineHTMLContent html={feature.description} />
                          </p>
                          <div className="grid grid-cols-2 gap-2">
                            {(feature.bulletPoints || []).map((point, pIdx) => (
                              <div key={pIdx} className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                                <span
                                  className="text-sm font-medium"
                                  style={{ color: isDark ? '#cbd5e1' : '#475569' }}
                                >
                                  {point}
                                </span>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                )
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
  )
}

function MobileAutoSlider({ features }: { features: GalleryFeature[] }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, clientWidth, scrollWidth } = scrollRef.current
        const isEnd = scrollLeft + clientWidth >= scrollWidth - 10

        scrollRef.current.scrollTo({
          left: isEnd ? 0 : scrollLeft + clientWidth,
          behavior: 'smooth',
        })
      }
    }, 3500)

    return () => clearInterval(interval)
  }, [isPaused])

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
          className="min-w-[85vw] h-[65vh] relative flex-shrink-0 snap-center rounded-3xl overflow-hidden border border-gray-200 dark:border-white/10"
        >
          <MobileSlide feature={feature} index={idx} total={features.length} />
        </div>
      ))}
    </div>
  )
}

function MobileSlide({
  feature,
  index,
  total,
}: {
  feature: GalleryFeature
  index: number
  total: number
}) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="w-full h-full relative bg-white dark:bg-zinc-900" onClick={() => setIsExpanded(!isExpanded)}>
      {/* Image: Cover to fill gaps */}
      <div className="absolute inset-0">
        <Image
          src={feature.imageUrl}
          alt={feature.title}
          fill
          className="object-cover object-top"
          unoptimized
        />
      </div>

      {/* Content Overlay */}
      <div
        className={`absolute bottom-0 left-0 w-full z-10 transition-all duration-300 ${
          isExpanded
            ? 'bg-white/95 dark:bg-black/95 h-3/4 border-t border-black/10 dark:border-white/10'
            : 'dark:bg-gradient-to-t dark:from-black dark:via-black/90 dark:to-transparent h-auto'
        }`}
      >
        <div className="p-6">
          <div className="flex items-start justify-between mb-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 dark:bg-white/10 backdrop-blur-md border border-black/10 dark:border-white/20 text-xs font-bold mb-3 text-slate-800 dark:text-white">
              <Icon name={feature.icon} size={14} />
              <span className="opacity-80">0{index + 1}</span>
            </div>

            <div
              className={`p-2 rounded-full bg-black/5 dark:bg-white/10 backdrop-blur-md border border-black/10 dark:border-white/20 text-slate-800 dark:text-white transition-transform duration-300 ${
                isExpanded ? 'rotate-180' : ''
              }`}
            >
              <Icon name="expand_less" size={20} />
            </div>
          </div>

          <h3 className="text-2xl font-bold font-display leading-tight mb-2 text-slate-900 dark:text-white">
            <InlineHTMLContent html={feature.title} />
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
                <p className="text-slate-600 dark:text-gray-300 leading-relaxed mb-4 text-sm mt-2">
                  <InlineHTMLContent html={feature.description} />
                </p>
                <div className="grid grid-cols-1 gap-2 pb-4">
                  {(feature.bulletPoints || []).map((point: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-500 flex-shrink-0"></span>
                      <span className="text-xs font-medium text-slate-500 dark:text-gray-400">{point}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {!isExpanded && (
            <p className="text-xs text-slate-500 dark:text-white/50 mt-1 font-medium tracking-wide uppercase">
              Tap to View Details
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
