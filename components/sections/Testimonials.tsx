'use client'

import { motion, useTransform, useScroll } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { useTheme } from '@/hooks/useTheme'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Mousewheel } from 'swiper/modules'
import { cn } from '@/lib/utils'
import { useTestimonialsData, type TestimonialsData, type TestimonialCard } from '@/lib/api'
import { InlineHTMLContent } from '@/components/ui/HTMLContent'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'

const fallbackCards: TestimonialCard[] = [
  {
    imageUrl:
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000&auto=format&fit=crop',
    quote: 'Revolutionized our inventory management.',
    author: 'Baje Ko Sekuwa',
    order: 1,
  },
  {
    imageUrl:
      'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1000&auto=format&fit=crop',
    quote: 'Best POS system in Nepal, hands down.',
    author: 'Roadhouse Cafe',
    order: 2,
  },
  {
    imageUrl:
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1000&auto=format&fit=crop',
    quote: 'KOT printing is lightning fast.',
    author: 'Trisara',
    order: 3,
  },
  {
    imageUrl:
      'https://images.unsplash.com/photo-1550966871-3ed3c6227b3c?q=80&w=1000&auto=format&fit=crop',
    quote: 'Support team is always available.',
    author: 'Burger Shack',
    order: 4,
  },
  {
    imageUrl:
      'https://images.unsplash.com/photo-1466978913421-dad9375acb25?q=80&w=1000&auto=format&fit=crop',
    quote: 'IRD billing made simple.',
    author: 'Himalayan Java',
    order: 5,
  },
]

const fallbackData: Partial<TestimonialsData> = {
  title: 'Trusted by the Best',
  subtitle: 'Join 500+ restaurants growing with Yummy.',
  cards: fallbackCards,
}

export function Testimonials() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const targetRef = useRef<HTMLDivElement | null>(null)
  const contentRef = useRef<HTMLDivElement | null>(null)
  const [scrollRange, setScrollRange] = useState(0)
  const [totalHeight, setTotalHeight] = useState<string | undefined>(undefined)

  const { data } = useTestimonialsData(fallbackData)
  const cards = data.cards || fallbackCards

  useEffect(() => {
    const updateDimensions = () => {
      if (contentRef.current && targetRef.current) {
        const scrollWidth = contentRef.current.scrollWidth
        const viewportWidth = window.innerWidth
        const distance = scrollWidth - viewportWidth
        // Only scroll if content is wider than viewport
        const finalDist = distance > 0 ? distance : 0

        setScrollRange(finalDist)
        // Set height to be viewport + distance (1:1 scroll feel)
        if (window.innerWidth >= 768) {
          // Only apply for desktop logic
          setTotalHeight(`${finalDist + window.innerHeight}px`)
        } else {
          setTotalHeight(undefined) // Let CSS handle mobile
        }
      }
    }

    // Initial calculation
    // Need a slight delay to ensure content is rendered
    setTimeout(updateDimensions, 100)

    // Recalculate on resize
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [cards]) // Re-run when cards change

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  })

  const x = useTransform(scrollYProgress, [0, 1], ['0px', `-${scrollRange}px`])

  return (
    <section
      ref={targetRef}
      className="relative h-auto md:h-[300vh]"
      style={{
        backgroundColor: isDark ? '#0a0a0a' : '#f8fafc',
        height: totalHeight,
      }}
    >
      {/* Desktop View */}
      <div className="hidden md:flex sticky top-0 h-screen flex-col items-start justify-center overflow-hidden">
        <div className="w-full text-center mb-12 relative z-10 px-6">
          <h2
            className="text-4xl sm:text-5xl font-black font-display mb-4"
            style={{ color: isDark ? '#ffffff' : '#0f172a' }}
          >
            <InlineHTMLContent html={data.title || ''} />
          </h2>
          <p className="text-lg" style={{ color: '#64748b' }}>
            <InlineHTMLContent html={data.subtitle || ''} />
          </p>
        </div>

        <motion.div ref={contentRef} style={{ x }} className="flex gap-8 pl-[10vw] pr-[10vw]">
          {(cards || [])
            .sort((a, b) => (a?.order || 0) - (b?.order || 0))
            .map((card, idx) => {
              return <Card card={card} key={idx} isDark={isDark} />
            })}
        </motion.div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden py-16 flex flex-col items-center">
        <div className="w-full text-center mb-8 px-6">
          <h2
            className="text-3xl font-black font-display mb-2"
            style={{ color: isDark ? '#ffffff' : '#0f172a' }}
          >
            <InlineHTMLContent html={data.title || ''} />
          </h2>
          <p className="text-base" style={{ color: '#64748b' }}>
            <InlineHTMLContent html={data.subtitle || ''} />
          </p>
        </div>

        <Swiper
          slidesPerView={'auto'}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination, Mousewheel]}
          mousewheel={true}
          grabCursor={true}
          className="mySwiper w-full"
        >
          {(cards || [])
            .sort((a, b) => (a?.order || 0) - (b?.order || 0))
            .map((card, idx) => {
              return (
                <SwiperSlide
                  key={idx}
                  style={{ width: '80%' }}
                  className="flex justify-center items-center py-8"
                >
                  <Card card={card} isDark={isDark} className="w-full h-auto aspect-[7/8]" />
                </SwiperSlide>
              )
            })}
        </Swiper>
      </div>
    </section>
  )
}

const Card = ({
  card,
  isDark,
  className,
}: {
  card: TestimonialCard
  isDark: boolean
  className?: string
}) => {
  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-3xl flex-shrink-0 h-[400px] w-[350px] sm:h-[450px] sm:w-[450px]',
        className
      )}
      style={{
        backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'transparent',
        border: isDark ? '1px solid rgba(255,255,255,0.1)' : 'none',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      }}
    >
      <div
        style={{
          backgroundImage: `url(${card.imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        className="absolute inset-0 z-0 transition-transform duration-250 group-hover:scale-110 opacity-100"
      ></div>
      <div className="absolute inset-0 z-10 flex flex-col justify-end p-8 bg-gradient-to-t from-black via-black/40 to-transparent">
        <p className="text-2xl sm:text-3xl font-bold font-display text-white mb-4 leading-tight drop-shadow-lg">
          "<InlineHTMLContent html={card.quote} />"
        </p>
        <p className="text-white/90 font-bold uppercase tracking-wider text-sm drop-shadow-md">
          {card.author}
        </p>
      </div>
    </div>
  )
}
