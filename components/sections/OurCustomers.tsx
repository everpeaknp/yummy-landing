'use client'

import { useTheme } from '@/hooks/useTheme'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { getCustomersSection, type CustomersSectionData } from '@/lib/api'

const fallbackData: CustomersSectionData = {
  title: 'Our Customers',
  logos: [],
}

export function OurCustomers() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [data, setData] = useState<CustomersSectionData>(fallbackData)

  useEffect(() => {
    async function fetchData() {
      try {
        const apiData = await getCustomersSection()
        const validLogos = (apiData?.logos || []).filter(
          (logo) => logo.logoUrl && !logo.logoUrl.includes('logo-placeholder')
        )
        if (validLogos.length > 0) {
          setData({
            title: apiData.title || fallbackData.title,
            logos: [...validLogos].sort((a, b) => (a.order || 0) - (b.order || 0)),
          })
        }
      } catch {
        // Keep fallback content silently
      }
    }
    fetchData()
  }, [])

  const validLogos = data.logos.filter(
    (logo) => logo.logoUrl && !logo.logoUrl.includes('logo-placeholder')
  )

  if (!validLogos || validLogos.length === 0) {
    return null
  }

  const items = [...validLogos, ...validLogos, ...validLogos]

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
                    src={item.logoUrl}
                    alt={`${item.name} - Restaurant powered by Yummy Manage POS`}
                    title={`${item.name} uses Yummy Manage`}
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
