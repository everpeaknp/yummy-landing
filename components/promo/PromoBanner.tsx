'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getActivePromoBanner } from '@/lib/api/promoBanner'
import { FullImageBanner } from './FullImageBanner'
import { TextOverlayBanner } from './TextOverlayBanner'
import type { PromoBannerData } from '@/lib/api/types'

/**
 * Main Promo Banner Component
 * Fetches and displays the active campaign banner
 * Renders nothing if no active campaign or on error
 */
export function PromoBanner({ onBannerExists }: { onBannerExists?: (exists: boolean) => void }) {
  const [banner, setBanner] = useState<PromoBannerData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const data = await getActivePromoBanner()
        setBanner(data)
        if (onBannerExists) {
          onBannerExists(!!data)
        }
      } catch (err) {
        console.error('Failed to fetch promo banner:', err)
        setError(true)
        if (onBannerExists) {
          onBannerExists(false)
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchBanner()
  }, [onBannerExists])

  // Don't render anything while loading, on error, or if no banner
  if (isLoading || error || !banner) {
    // Loading placeholder to prevent layout jump (aspect ratio 1774/563 ≈ 3.15:1)
    if (isLoading) {
      return (
        <div
          className="w-full"
          style={{ aspectRatio: '3 / 1' }}
          aria-hidden="true"
        />
      )
    }
    return null
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.4 }}
        className="w-full"
      >
        {banner.mode === 'full_image' ? (
          <FullImageBanner data={banner} />
        ) : (
          <TextOverlayBanner data={banner} />
        )}
      </motion.div>
    </AnimatePresence>
  )
}
