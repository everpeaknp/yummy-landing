'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getActivePromoBanner } from '@/lib/api/promoBanner'
import { FullImageBanner } from './FullImageBanner'
import { TextOverlayBanner } from './TextOverlayBanner'
import { DashainPromoBanner } from './DashainPromoBanner'
import type { PromoBannerData } from '@/lib/api/types'

/**
 * Main Promo Banner Component
 * Fetches and displays the active campaign banner
 * Renders nothing if no active campaign or on error
 */
export function PromoBanner({ 
  onBannerExists,
  isPricingPage = true,
}: { 
  onBannerExists?: (exists: boolean) => void
  isPricingPage?: boolean
}) {
  const [banner, setBanner] = useState<PromoBannerData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const data = await getActivePromoBanner()
        const shouldShow = !!data && (!isPricingPage || data.show_on_pricing_page !== false)
        setBanner(shouldShow ? data : null)
        if (onBannerExists) {
          onBannerExists(shouldShow)
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
  }, [onBannerExists, isPricingPage])

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

  // Check if a real custom image was uploaded by the user
  const hasCustomUploadedImage =
    Boolean(banner.image_url) &&
    !banner.image_url.includes('Dashainoffer.png') &&
    banner.image_url.includes('/media/') &&
    !banner.use_default_image

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.4 }}
        className="w-full"
      >
        {hasCustomUploadedImage ? (
          <FullImageBanner data={banner} />
        ) : banner.festival === 'dashain' ? (
          <DashainPromoBanner data={banner} />
        ) : banner.mode === 'full_image' ? (
          <FullImageBanner data={banner} />
        ) : (
          <TextOverlayBanner data={banner} />
        )}
      </motion.div>
    </AnimatePresence>
  )
}
