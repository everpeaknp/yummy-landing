'use client'

import React, { useState, useEffect, useRef } from 'react'
import { calculateTimeLeft, type TimeUnits } from '@/lib/utils/countdown'
import { getTimerThemeColors, getTimerSizeConfig, getTimerLabelText } from './TimerStyles'

interface CountdownTimerProps {
  targetDate: string // ISO datetime string
  position?: 'top_left' | 'top_center' | 'top_right' | 'middle_left' | 'center' | 'middle_right' | 'bottom_left' | 'bottom_center' | 'bottom_right' | 'inline' | 'custom'
  customX?: number | null
  customY?: number | null
  timerStyle?: 'boxes' | 'compact' | 'digital'
  showDays?: boolean
  timerTheme?: 'brand_orange' | 'festive_red' | 'deep_navy' | 'custom'
  timerBgColor?: string
  timerBoxColor?: string
  timerNumberColor?: string
  timerLabelColor?: string
  timerSeparatorColor?: string
  timerSize?: 'small' | 'medium' | 'large'
  timerScalePercent?: number
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
  customX = null,
  customY = null,
  timerStyle = 'boxes',
  showDays = true,
  timerTheme = 'brand_orange',
  timerBgColor,
  timerBoxColor = '#F97316',
  timerNumberColor = '#FFFFFF',
  timerLabelColor = '#FFFFFF',
  timerSeparatorColor = '#FFFFFF',
  timerSize = 'medium',
  timerScalePercent = 100,
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

  const positionClasses: Record<string, string> = {
    top_left: 'absolute top-4 left-4',
    top_center: 'absolute top-4 left-1/2 -translate-x-1/2',
    top_right: 'absolute top-4 right-4',
    middle_left: 'absolute top-1/2 -translate-y-1/2 left-4',
    center: 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
    middle_right: 'absolute top-1/2 -translate-y-1/2 right-4',
    bottom_left: 'absolute bottom-4 left-4',
    bottom_center: 'absolute bottom-4 left-1/2 -translate-x-1/2',
    bottom_right: 'absolute bottom-4 right-4',
    inline: 'relative justify-center',
    custom: 'absolute',
  }

  const isCustom = position === 'custom' || (customX !== null && customY !== null)
  const scale = (timerScalePercent || 100) / 100
  const customCoordStyle: React.CSSProperties = isCustom && customX !== null && customY !== null
    ? {
        position: 'absolute',
        left: `${customX}%`,
        top: `${customY}%`,
        transform: `translate(-50%, -50%) scale(${scale})`,
        transformOrigin: 'center center',
      }
    : {
        transform: `scale(${scale})`,
        transformOrigin: 'center center',
      }

  // Determine effective background color
  const effectiveBgColor = timerBgColor !== undefined && timerBgColor !== '' ? timerBgColor : timerBoxColor
  const isTransparent =
    !effectiveBgColor ||
    ['transparent', 'none', ''].includes(effectiveBgColor.trim().toLowerCase())

  // Get theme colors
  const colors = getTimerThemeColors(
    timerTheme,
    effectiveBgColor,
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
          className={`flex flex-col items-center justify-center ${sizeConfig.boxPadding} ${sizeConfig.borderRadius} ${isTransparent ? '' : sizeConfig.shadow} ${isTransparent ? '' : 'backdrop-blur-sm'}`}
          style={{
            backgroundColor: isTransparent ? 'transparent' : colors.boxColor,
            border: isTransparent ? 'none' : `1.5px solid rgba(255, 255, 255, 0.25)`,
            boxShadow: isTransparent ? 'none' : `0 4px 12px rgba(0, 0, 0, 0.3)`,
            padding: isTransparent ? '0 4px' : undefined,
          }}
          aria-hidden="true"
        >
          <span className={`${sizeConfig.fontSize} font-black drop-shadow-sm leading-none`} style={{ color: colors.numberColor }}>
            {String(unit.value).padStart(2, '0')}
          </span>
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider mt-1 drop-shadow-sm opacity-95" style={{ color: colors.labelColor }}>
            {labelText}
          </span>
        </div>
      )
    } else if (timerStyle === 'compact') {
      return (
        <div 
          className={`flex items-center gap-1 px-2 py-1 rounded-md ${isTransparent ? '' : 'backdrop-blur-sm'}`}
          style={{
            backgroundColor: isTransparent ? 'transparent' : colors.boxColor,
            border: isTransparent ? 'none' : `1px solid rgba(255, 255, 255, 0.2)`,
            boxShadow: isTransparent ? 'none' : `0 2px 8px rgba(0, 0, 0, 0.2)`,
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
          className={`flex items-center gap-1 px-2 py-1 rounded-md ${isTransparent ? '' : 'backdrop-blur-sm'}`}
          style={{
            backgroundColor: isTransparent ? 'transparent' : colors.boxColor,
            border: isTransparent ? 'none' : `1px solid rgba(255, 255, 255, 0.2)`,
            fontFamily: 'monospace',
            boxShadow: isTransparent ? 'none' : `0 2px 8px rgba(0, 0, 0, 0.2)`,
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
      className={`${positionClasses[position] || 'relative'} z-10 flex flex-col items-center gap-1 text-white max-w-[95%]`}
      style={{
        maxWidth: '95%',
        ...(!isCustom && position !== 'inline' && position.includes('bottom') ? { marginBottom: '16px' } : {}),
        ...customCoordStyle,
      }}
      role="timer"
      aria-live="off"
      aria-label={`Offer ends in ${timeLeft.days} days, ${timeLeft.hours} hours, ${timeLeft.minutes} minutes, ${timeLeft.seconds} seconds`}
    >
      {/* Screen reader accessible text */}
      <span className="sr-only">
        Offer ends in {timeLeft.days} days, {timeLeft.hours} hours, {timeLeft.minutes} minutes, {timeLeft.seconds} seconds
      </span>

      {/* Offer Ends In Header */}
      <span 
        className="text-[10px] sm:text-xs font-black tracking-widest uppercase text-center drop-shadow-sm select-none mb-0.5"
        style={{ color: colors.labelColor }}
      >
        OFFER ENDS IN:
      </span>
      
      <div className="flex items-center gap-1 sm:gap-2">
        {timeUnits.map((unit, index) => (
          <React.Fragment key={unit.label}>
            {renderTimeUnit(unit)}
            {index < timeUnits.length - 1 && (
              <span 
                className="text-xl sm:text-2xl md:text-3xl font-black self-center pb-2 select-none"
                style={{ color: colors.separatorColor }}
                aria-hidden="true"
              >
                :
              </span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
