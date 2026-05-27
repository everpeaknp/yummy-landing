'use client'

import { Navbar, Footer } from '@/components/layout'
import Image from 'next/image'
import { useTheme } from '@/hooks/useTheme'
import { motion, Variants } from 'framer-motion'
import { Icon } from '@/components/ui/Icon'
import { useEffect, useState, useCallback } from 'react'
import { getTeamPage, type TeamPageData, type TeamValue, useRefetchOnFocus } from '@/lib/api'
import { InlineHTMLContent } from '@/components/ui/HTMLContent'

// Color mapping utility
const getColorValue = (colorString: string, isDark: boolean): string => {
  // Handle Tailwind color classes
  const tailwindColors: Record<string, string> = {
    'red-500': '#ef4444',
    'blue-500': '#3b82f6',
    'green-500': '#10b981',
    'yellow-500': '#f59e0b',
    'purple-500': '#8b5cf6',
    'pink-500': '#ec4899',
    'indigo-500': '#6366f1',
    'gray-500': '#6b7280',
    'orange-500': '#f97316',
  }

  // Handle theme colors
  const themeColors: Record<string, string> = {
    primary: '#ff6929',
    secondary: isDark ? '#a3a3a3' : '#64748b',
    accent: '#f97316',
  }

  // Return mapped color or original if it's already a valid color (hex, rgb, etc.)
  return tailwindColors[colorString] || themeColors[colorString] || colorString
}

// Fallback data in case API fails
const fallbackValues: TeamValue[] = [
  {
    icon: 'target',
    iconColor: '#ff6929',
    title: 'Our Mission',
    description:
      'To empower restaurant owners with world-class technology that simplifies operations and drives growth.',
    order: 1,
  },
  {
    icon: 'favorite',
    iconColor: '#ef4444',
    title: 'Customer First',
    description:
      "We believe in building relationships, not just software. Your success is our success, and we're with you every step.",
    order: 2,
  },
  {
    icon: 'group',
    iconColor: '#3b82f6',
    title: 'Local Roots',
    description:
      'Born in Nepal, for Nepal. We understand the unique challenges of the local market and build solutions that work here.',
    order: 3,
  },
]

const fallbackData: Partial<TeamPageData> = {
  title: 'Meet the Team',
  subtitle:
    'Yummy Ever is the flagship product of Everacy. We are a passionate group of foodies, engineers, and designers on a mission to revolutionize the restaurant industry.',
  companyHighlight: 'Everacy',
  values: fallbackValues,
  joinSection: {
    title: 'Want to join us?',
    description:
      'We are always looking for talented individuals to join our growing team. Check out our open positions.',
    ctaText: 'View Careers',
    ctaHref: '/careers',
  },
}

export default function TeamPage() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [data, setData] = useState<Partial<TeamPageData>>(fallbackData)
  const [loading, setLoading] = useState(true)

  const fetchData = useCallback(async () => {
    try {
      const apiData = await getTeamPage()
      setData(apiData)
    } catch (error) {
      console.error('Failed to fetch team page data:', error)
      // Keep fallback data
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  useRefetchOnFocus(fetchData)

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  }

  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 50, damping: 20 } },
  }

  const values = data.values || fallbackValues
  const joinSection = data.joinSection || fallbackData.joinSection!

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
          <motion.div
            variants={item}
            className="inline-flex items-center justify-center p-4 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 mb-8"
          >
            <Icon name={data.headerIcon || 'users'} size={32} />
          </motion.div>
          <motion.h1
            variants={item}
            className="text-4xl md:text-5xl font-black font-display mb-6"
            style={{ color: isDark ? '#ffffff' : '#0f172a' }}
          >
            {data.title || 'Meet the Team'}
          </motion.h1>

          <motion.div variants={item} className="flex justify-center mb-10">
            <Image
              src={data.companyLogo || '/images/Everacy_logo_withbg.png'}
              alt={data.companyHighlight || 'Everacy'}
              width={150}
              height={150}
              className="h-24 w-auto rounded-xl shadow-lg"
            />
          </motion.div>

          <motion.div
            variants={item}
            className="text-xl mb-16 max-w-2xl mx-auto"
            style={{ color: isDark ? '#a3a3a3' : '#64748b' }}
          >
            {data.subtitle ? (
              <InlineHTMLContent html={data.subtitle} />
            ) : (
              <div>
                Yummy Ever is the flagship product of{' '}
                <span className="font-bold text-orange-500">Everacy</span>. We are a passionate
                group of foodies, engineers, and designers on a mission to revolutionize the
                restaurant industry.
              </div>
            )}
          </motion.div>

          {/* Loading skeleton */}
          {loading ? (
            <motion.div variants={item} className="grid md:grid-cols-3 gap-8 text-left mb-20">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="p-8 rounded-3xl border animate-pulse"
                  style={{
                    borderColor: isDark ? '#262626' : '#e2e8f0',
                    backgroundColor: isDark ? '#171717' : '#ffffff',
                  }}
                >
                  <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700 mb-4" />
                  <div className="h-6 w-32 bg-gray-300 dark:bg-gray-700 rounded mb-2" />
                  <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded" />
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div variants={item} className="grid md:grid-cols-3 gap-8 text-left mb-20">
              {values
                .sort((a, b) => a.order - b.order)
                .map((value, idx) => (
                  <div
                    key={idx}
                    className="p-8 rounded-3xl border transition-all hover:shadow-lg"
                    style={{
                      borderColor: isDark ? '#262626' : '#e2e8f0',
                      backgroundColor: isDark ? '#171717' : '#ffffff',
                    }}
                  >
                    <Icon
                      name={value.icon}
                      size={32}
                      style={{ color: getColorValue(value.iconColor, isDark) }}
                      className="mb-4 block"
                    />
                    <h3
                      className="text-xl font-bold mb-2"
                      style={{ color: isDark ? '#ffffff' : '#0f172a' }}
                    >
                      {value.title}
                    </h3>
                    <div style={{ color: isDark ? '#a3a3a3' : '#64748b' }}>
                      <InlineHTMLContent html={value.description} />
                    </div>
                  </div>
                ))}
            </motion.div>
          )}

          {/* Join Us Section */}
          <motion.div
            variants={item}
            className="rounded-3xl p-12 relative overflow-hidden"
            style={{ backgroundColor: isDark ? '#171717' : '#f8fafc' }}
          >
            <div className="relative z-10">
              <h2
                className="text-3xl font-bold mb-4"
                style={{ color: isDark ? '#ffffff' : '#0f172a' }}
              >
                {joinSection.title}
              </h2>
              <div
                className="mb-8 max-w-xl mx-auto"
                style={{ color: isDark ? '#a3a3a3' : '#64748b' }}
              >
                <InlineHTMLContent html={joinSection.description} />
              </div>
              <a
                href={joinSection.ctaHref}
                className="inline-block px-8 py-3 rounded-full bg-primary text-white font-bold hover:bg-orange-600 transition-colors"
              >
                {joinSection.ctaText}
              </a>
            </div>
          </motion.div>
        </div>
      </motion.main>
      <Footer />
    </>
  )
}
