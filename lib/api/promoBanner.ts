import { get } from './client'
import type { PromoBannerData } from './types'

/**
 * Get the currently active promo banner
 * Returns null if no active campaign
 */
export async function getActivePromoBanner(): Promise<PromoBannerData | null> {
  try {
    const data = await get<PromoBannerData | null>('/promo-banner/active/')
    return data
  } catch (error) {
    console.warn('Error fetching active promo banner:', error)
    return null
  }
}
