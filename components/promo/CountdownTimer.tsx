'use client'

import React, { useState, useEffect, useRef } from 'react'
import { calculateTimeLeft, type TimeUnits } from '@/lib/utils/countdown'
import { getTimerThemeColors, getTimerSizeConfig, getTimerLabelText } from './TimerStyles'

interface CountdownTimerProps {
  targetDate: string // ISO datetime string
  position?: 'top_left' | 'top_center' | 'top_right' | 'middle_left' | 'center' | 'middle_right' | 'bottom_left' | 'bottom_center' | 'bottom_right'
  timerStyle?: 'boxes' | 'compact' | 'digital'
  showDays?: boolean
  timerTheme?: 'brand_orange' | 'festive_red' | 'deep_navy' | 'custom'
  timerBoxColor?: string
  timerNumberColor?: string
  timerLabelColor?: string
  timerSeparatorColor?: string
  timerSize?: 'small' | 'medium' | 'large'
  timerLabelStyle?: 'full' | 'short'
}

/**
 * Countdown timer with live ticking in Asia/Kathmandu timezone
 * Calculates from target timestamp to avoid drift after tab sleep
 * Features enhanced visual styling with theme colors, size options, and label styles
 */
export function CountdownTimer({ 
  targetDate, 
  position = 'bottom_right',
  timerStyle = 'boxes',
  showDays = true,
  timerTheme = 'brand_orange',
  timerBoxColor = '#F97316',
  timerNumberColor = '#FFFFFF',
  timerLabelColor = '#FFFFFF',
  timerSeparatorColor = '#FFFFFF',
  timerSize = 'medium',
  timerLabelStyle = 'full'
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeUnits | null>(null)
  const [isMounted, setIsMounted] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    setIsMounted(true)
    
    // Initial calculation
    setTimeLeft(calculateTimeLeft(targetDate))
    
    // Update every second
    intervalRef.current = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate))
    }, 1000)
    
    // Cleanup interval on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [targetDate])

  // Avoid hydration mismatch - only render on client
  if (!isMounted || !timeLeft) {
    return null
  }

  const positionClasses = {
    top_left: 'top-4 left-4',
    top_center: 'top-4 left-1/2 -translate-x-1/2',
    top_right: 'top-4 right-4',
    middle_left: 'top-1/2 -translate-y-1/2 left-4',
    center: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
    middle_right: 'top-1/2 -translate-y-1/2 right-4',
    bottom_left: 'bottom-4 left-4',
    bottom_center: 'bottom-4 left-1/2 -translate-x-1/2',
    bottom_right: 'bottom-4 right-4',
  }

  // Get theme colors
  const colors = getTimerThemeColors(
    timerTheme,
    timerBoxColor,
    timerNumberColor,
    timerLabelColor,
    timerSeparatorColor
  )

  // Get size configuration
  const sizeConfig = getTimerSizeConfig(timerSize)

  // Filter time units based on showDays
  const timeUnits = showDays 
    ? [
        { value: timeLeft.days, label: 'days' },
        { value: timeLeft.hours, label: 'hours' },
        { value: timeLeft.minutes, label: 'minutes' },
        { value: timeLeft.seconds, label: 'seconds' },
      ]
    : [
        { value: timeLeft.hours, label: 'hours' },
        { value: timeLeft.minutes, label: 'minutes' },
        { value: timeLeft.seconds, label: 'seconds' },
      ]

  // Render based on timer style - all styles now use theme colors
  const renderTimeUnit = (unit: { value: number; label: string }) => {
    const labelText = getTimerLabelText(unit.label, timerLabelStyle)

    if (timerStyle === 'boxes') {
      return (
        <div 
          className={`flex flex-col items-center justify-center ${sizeConfig.boxPadding} ${sizeConfig.borderRadius} ${sizeConfig.shadow} backdrop-blur-sm`}
          style={{
            backgroundColor: colors.boxColor,
            border: `2px solid rgba(255, 255, 255, 0.3)`,
            boxShadow: `0 4px 12px rgba(0, 0, 0, 0.3)`,
          }}
          aria-hidden="true"
        >
          <span className={`${sizeConfig.fontSize} font-black`} style={{ color: colors.numberColor }}>
            {String(unit.value).padStart(2, '0')}
          </span>
          <span className="text-xs font-semibold opacity-90" style={{ color: colors.labelColor }}>
            {labelText}
          </span>
        </div>
      )
    } else if (timerStyle === 'compact') {
      return (
        <div 
          className={`flex items-center gap-1 px-2 py-1 rounded-md backdrop-blur-sm`}
          style={{
            backgroundColor: colors.boxColor,
            border: `1px solid rgba(255, 255, 255, 0.2)`,
            boxShadow: `0 2px 8px rgba(0, 0, 0, 0.2)`,
          }}
          aria-hidden="true"
        >
          <span className="text-lg font-bold" style={{ color: colors.numberColor }}>
            {String(unit.value).padStart(2, '0')}
          </span>
          <span className="text-[10px] font-semibold opacity-90" style={{ color: colors.labelColor }}>
            {labelText}
          </span>
        </div>
      )
    } else if (timerStyle === 'digital') {
      return (
        <div 
          className="flex items-center gap-1 px-2 py-1 rounded-md backdrop-blur-sm"
          style={{
            backgroundColor: colors.boxColor,
            border: `1px solid rgba(255, 255, 255, 0.2)`,
            fontFamily: 'monospace',
            boxShadow: `0 2px 8px rgba(0, 0, 0, 0.2)`,
          }}
          aria-hidden="true"
        >
          <span className="text-lg font-bold" style={{ color: colors.numberColor }}>
            {String(unit.value).padStart(2, '0')}
          </span>
          <span className="text-[10px] font-semibold opacity-90" style={{ color: colors.labelColor }}>
            {labelText}
          </span>
        </div>
      )
    }
  }

  return (
    <div 
      className={`absolute ${positionClasses[position]} z-10 flex gap-2 text-white max-w-[95%]`}
      style={{
        maxWidth: '95%',
        // Ensure timer doesn't overlap with poster text by adding bottom margin for certain positions
        ...(position.includes('bottom') ? { marginBottom: '16px' } : {}),
      }}
      role="timer"
      aria-live="off"
      aria-label={`Offer ends in ${timeLeft.days} days, ${timeLeft.hours} hours, ${timeLeft.minutes} minutes, ${timeLeft.seconds} seconds`}
    >
      {/* Screen reader accessible text */}
      <span className="sr-only">
        Offer ends in {timeLeft.days} days, {timeLeft.hours} hours, {timeLeft.minutes} minutes, {timeLeft.seconds} seconds
      </span>
      
      {timeUnits.map((unit, index) => (
        <React.Fragment key={unit.label}>
          {renderTimeUnit(unit)}
          {index < timeUnits.length - 1 && (
            <span 
              className="text-2xl md:text-3xl font-bold self-center"
              style={{ color: colors.separatorColor }}
              aria-hidden="true"
            >
              :
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  )
}
