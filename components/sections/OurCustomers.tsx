'use client'

import { useTheme } from '@/hooks/useTheme'
import { useEffect, useState } from 'react'
import { getCustomersSection, type CustomersSectionData } from '@/lib/api'

const fallbackData: CustomersSectionData = {
  title: 'Our Customers',
  logos: [
    { name: 'Hotel Barahi', logoUrl: '/images/logo-placeholder.jpg', order: 1 },
    { name: 'Moondance', logoUrl: '/images/logo-placeholder.jpg', order: 2 },
    { name: 'Roadhouse', logoUrl: '/images/logo-placeholder.jpg', order: 3 },
    { name: 'OR2K', logoUrl: '/images/logo-placeholder.jpg', order: 4 },
    { name: 'Third Eye', logoUrl: '/images/logo-placeholder.jpg', order: 5 },
  ],
}

export function OurCustomers() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [data, setData] = useState<CustomersSectionData>(fallbackData)

  useEffect(() => {
    async function fetchData() {
      try {
        const apiData = await getCustomersSection()
        if (apiData?.logos?.length) {
          setData({
            title: apiData.title || fallbackData.title,
            logos: [...apiData.logos].sort((a, b) => (a.order || 0) - (b.order || 0)),
          })
        }
      } catch {
        // Keep fallback content silently
      }
    }
    fetchData()
  }, [])

  const items = [...data.logos, ...data.logos]

  return (
    <section
      className="py-12 md:py-16 overflow-hidden border-y"
      style={{
        backgroundColor: isDark ? '#050505' : '#fffaf4',
        borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(15,23,42,0.08)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <h2
          className="text-4xl md:text-5xl font-black font-display text-center"
          style={{ color: isDark ? '#ffffff' : '#0f172a' }}
        >
          {data.title || 'Our Customers'}
        </h2>
      </div>

      <div className="relative w-full">
        <div className="flex w-max animate-logo-marquee gap-4 md:gap-6 px-6">
          {items.map((item, idx) => (
            <div
              key={`${item.name}-${idx}`}
              className="shrink-0 rounded-full border p-2 md:p-3 flex items-center justify-center"
              style={{
                backgroundColor: isDark ? '#111111' : '#ffffff',
                borderColor: isDark ? 'rgba(255,255,255,0.12)' : 'rgba(15,23,42,0.12)',
              }}
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-white flex items-center justify-center">
                <img
                  src={item.logoUrl || '/images/logo-placeholder.jpg'}
                  alt={item.name}
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
