'use client'

import { useTheme } from '@/hooks/useTheme'
import { useEffect, useState } from 'react'
import Image from 'next/image'
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

  const items = [...data.logos, ...data.logos, ...data.logos]

  return (
    <div className="pt-8 md:pt-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <h2
          className="text-2xl md:text-3xl font-bold font-display text-center"
          style={{ color: isDark ? '#ffffff' : '#0f172a' }}
        >
          {data.title || 'Our Customers'}
        </h2>
      </div>

      <div className="relative left-1/2 w-screen -translate-x-1/2 -mx-6 lg:-mx-8 overflow-hidden isolate">
        <div className="flex animate-logo-marquee gap-4 md:gap-6 px-6 min-w-full items-center">
          {items.map((item, idx) => (
              <div
                key={`${item.name}-${idx}`}
                className="shrink-0 px-4 md:px-6 py-3 flex items-center justify-center"
                style={{
                  backgroundColor: 'transparent',
                  borderColor: 'transparent',
                }}
              >
                <div className="h-12 md:h-16 w-auto flex items-center justify-center">
                  <Image
                    src={item.logoUrl || '/images/logo-placeholder.jpg'}
                    alt={item.name}
                    width={260}
                    height={64}
                    className="h-full w-auto max-w-[260px] object-contain bg-transparent block"
                  />
                </div>
              </div>
          ))}
        </div>
      </div>
    </div>
  )
}
