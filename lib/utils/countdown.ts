/**
 * Pure countdown calculation utility
 * Calculates time remaining from target date to now in Asia/Kathmandu timezone
 */

export interface TimeUnits {
  days: number
  hours: number
  minutes: number
  seconds: number
}

/**
 * Calculate time remaining until target date
 * @param targetDate - ISO datetime string of the target date
 * @returns TimeUnits object or null if expired
 */
export function calculateTimeLeft(targetDate: string): TimeUnits | null {
  try {
    // Parse target date and get current time in NPT
    const target = new Date(targetDate)
    const now = new Date()
    
    // Convert to Asia/Kathmandu timezone (UTC+5:45)
    const nptOffset = 5.75 * 60 * 60 * 1000 // 5 hours 45 minutes in ms
    const nowNPT = new Date(now.getTime() + (now.getTimezoneOffset() * 60 * 1000) + nptOffset)
    const targetNPT = new Date(target.getTime() + (target.getTimezoneOffset() * 60 * 1000) + nptOffset)
    
    const difference = targetNPT.getTime() - nowNPT.getTime()
    
    if (difference <= 0) {
      return null // Expired
    }
    
    const days = Math.floor(difference / (1000 * 60 * 60 * 24))
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((difference % (1000 * 60)) / 1000)
    
    return { days, hours, minutes, seconds }
  } catch (error) {
    console.error('Error calculating countdown:', error)
    return null
  }
}
