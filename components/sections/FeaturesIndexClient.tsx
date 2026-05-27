'use client'

import { Navbar, Footer } from '@/components/layout'
import { useTheme } from '@/hooks/useTheme'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState, useEffect, useCallback } from 'react'
import { getFeaturesList, type FeaturePageData, useRefetchOnFocus } from '@/lib/api'
import { Icon } from '@/components/ui/Icon'
import { InlineHTMLContent } from '@/components/ui/HTMLContent'

const colorPalette = [
  { color: 'text-green-500', bg: 'bg-green-100 dark:bg-green-900/30' },
  { color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/30' },
  { color: 'text-purple-500', bg: 'bg-purple-100 dark:bg-purple-900/30' },
  { color: 'text-pink-500', bg: 'bg-pink-100 dark:bg-pink-900/30' },
  { color: 'text-orange-500', bg: 'bg-orange-100 dark:bg-orange-900/30' },
  { color: 'text-red-500', bg: 'bg-red-100 dark:bg-red-900/30' },
]

// Fallback data
const fallbackFeatures: Partial<FeaturePageData>[] = [
  {
    slug: 'smart-inventory',
    title: 'Smart Inventory',
    icon: 'inventory_2',
    subtitle: 'Ingredients are deducted automatically as you sell.',
  },
  {
    slug: 'ird-billing',
    title: 'IRD Approved Billing',
    icon: 'receipt_long',
    subtitle: 'Fully compliant with Tax Rules of Nepal.',
  },
  {
    slug: 'qr-menu',
    title: 'Digital QR Menu',
    icon: 'qr_code_2',
    subtitle: 'Contactless ordering for superior guest experience.',
  },
  {
    slug: 'reports',
    title: 'Real-time Reports',
    icon: 'analytics',
    subtitle: 'Track sales and performance from anywhere.',
  },
]

interface FeaturesIndexClientProps {
  initialFeatures: Partial<FeaturePageData>[] | null
}

export function FeaturesIndexClient({ initialFeatures }: FeaturesIndexClientProps) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [features, setFeatures] = useState<Partial<FeaturePageData>[]>(
    initialFeatures || fallbackFeatures
  )

  const fetchData = useCallback(async () => {
    try {
      const apiData = await getFeaturesList()
      if (apiData && apiData.length > 0) {
        setFeatures(apiData)
      }
    } catch (error) {
      console.error('Failed to fetch features list:', error)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  useRefetchOnFocus(fetchData)

  return (
    <>
      <Navbar />
      <main
        style={{
          backgroundColor: isDark ? '#0a0a0a' : '#ffffff',
          color: isDark ? '#ffffff' : '#000000',
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative px-4 py-24 mx-auto max-w-6xl"
        >
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Powerful{' '}
              <span className="bg-gradient-to-r from-primary via-orange-500 to-red-500 bg-clip-text text-transparent">
                Features
              </span>
            </h1>
            <p
              className="text-xl md:text-2xl max-w-3xl mx-auto"
              style={{ color: isDark ? '#a3a3a3' : '#475569' }}
            >
              Everything you need to run a modern restaurant. From inventory management to customer
              engagement, we've got every aspect of your business covered.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const colors = colorPalette[index % colorPalette.length]

              return (
                <Link key={feature.slug} href={`/features/${feature.slug}`} className="group">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative overflow-hidden rounded-3xl border border-gray-200 dark:border-gray-800 p-8 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1"
                    style={{
                      background: isDark
                        ? 'linear-gradient(135deg, rgba(30, 30, 30, 0.8) 0%, rgba(20, 20, 20, 0.9) 100%)'
                        : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.8) 100%)',
                    }}
                  >
                    {/* Icon */}
                    <div
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${colors.bg} mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon
                        name={feature.icon || 'help_center'}
                        className={`w-8 h-8 ${colors.color}`}
                      />
                    </div>

                    {/* Content */}
                    <div>
                      <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                        {feature.title}
                      </h3>
                      <div
                        className="text-lg leading-relaxed"
                        style={{ color: isDark ? '#d4d4d4' : '#334155' }}
                      >
                        <InlineHTMLContent html={feature.subtitle || ''} />
                      </div>
                    </div>

                    {/* Hover Arrow */}
                    <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Icon name="arrow_forward" className="w-6 h-6 text-primary" />
                    </div>

                    {/* Background Pattern */}
                    <div
                      className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-300"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f97316' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                      }}
                    />
                  </motion.div>
                </Link>
              )
            })}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Link
                href="/pricing"
                className="inline-flex items-center gap-3 bg-primary hover:bg-orange-600 text-white px-8 py-4 rounded-full text-lg font-bold transition-colors shadow-lg shadow-primary/20"
              >
                Start Free Trial
                <Icon name="arrow_forward" className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </main>
      <Footer />
    </>
  )
}
