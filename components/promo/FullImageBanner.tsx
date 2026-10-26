'use client'

import React, { useState } from 'react'
import { CountdownTimer } from './CountdownTimer'
import type { PromoBannerData, PromoBannerTextBlock } from '@/lib/api/types'

interface FullImageBannerProps {
  data: PromoBannerData
}

/**
 * Full Image Banner
 * Supports separate high-definition desktop (3:1) and mobile (9:14 portrait) posters
 * Overlays countdown timer at viewport-specific coordinates with dynamic colors and scales
 */
export function FullImageBanner({ data }: FullImageBannerProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [cacheBust] = useState(() => Date.now())

  // Cache-busted image URLs to prevent browser from showing stale cached images
  const desktopImageUrl = data.image_url
    ? data.image_url.includes('?')
      ? data.image_url
      : `${data.image_url}?v=${cacheBust}`
    : ''
  const mobileImageUrl = (data.mobile_image_url || data.image_url)
    ? (data.mobile_image_url || data.image_url).includes('?')
      ? (data.mobile_image_url || data.image_url)
      : `${data.mobile_image_url || data.image_url}?v=${cacheBust}`
    : ''

  // Coordinates
  const desktopTimerX = data.timer_x_percent !== null && data.timer_x_percent !== undefined ? data.timer_x_percent : 80
  const desktopTimerY = data.timer_y_percent !== null && data.timer_y_percent !== undefined ? data.timer_y_percent : 57
  const mobileTimerX = data.mobile_timer_x_percent !== null && data.mobile_timer_x_percent !== undefined ? data.mobile_timer_x_percent : 50
  const mobileTimerY = data.mobile_timer_y_percent !== null && data.mobile_timer_y_percent !== undefined ? data.mobile_timer_y_percent : 83

  const timerScale = data.timer_scale_percent || 100
  const showTimer = data.show_timer !== false

  const renderTextBlocks = () => {
    if (!data.text_blocks || data.text_blocks.length === 0) return null

    return (
      <div className="absolute inset-0 w-full h-full pointer-events-none z-20">
        {data.text_blocks
          .filter((block) => block.is_visible)
          .sort((a, b) => a.order - b.order)
          .map((block) => {
            const isCustom = block.position === 'custom' && block.custom_x_percent !== null && block.custom_y_percent !== null
            const scale = (block.scale_percent || 100) / 100
            const hasBg = block.background_color && !['transparent', 'none', ''].includes(block.background_color.trim().toLowerCase())

            const style: React.CSSProperties = isCustom
              ? {
                  position: 'absolute',
                  left: `${block.custom_x_percent}%`,
                  top: `${block.custom_y_percent}%`,
                  transform: `translate(-50%, -50%) scale(${scale})`,
                  transformOrigin: 'center center',
                }
              : {
                  transform: `scale(${scale})`,
                  transformOrigin: 'center center',
                }

            return (
              <div
                key={block.id}
                className="absolute pointer-events-auto flex flex-col items-center drop-shadow-md"
                style={{
                  ...style,
                  color: block.text_color || '#ffffff',
                  backgroundColor: hasBg ? block.background_color : 'transparent',
                  padding: hasBg ? '6px 14px' : '0',
                  borderRadius: hasBg ? '9999px' : '0',
                  border: hasBg ? '1.5px solid rgba(255,255,255,0.6)' : 'none',
                }}
              >
                {block.image_url && (
                  <img
                    src={block.image_url}
                    alt={block.text || 'Promo sticker'}
                    className="max-h-16 sm:max-h-24 md:max-h-32 w-auto object-contain drop-shadow-md select-none pointer-events-none"
                  />
                )}
                {block.text && (
                  <span className="text-xs sm:text-sm font-bold text-center mt-1">
                    {block.text}
                  </span>
                )}
              </div>
            )
          })}
      </div>
    )
  }

  return (
    <div className="w-full flex flex-col items-center justify-center">
      {/* ================= 1. PC / DESKTOP BANNER (3:1 Panoramic Widescreen) ================= */}
      <div
        className="hidden lg:block relative w-full overflow-hidden bg-slate-950"
        style={{ aspectRatio: '3 / 1', minHeight: '320px', maxHeight: '560px' }}
      >
        <img
          src={desktopImageUrl}
          alt={`${data.festival} festival offer desktop banner`}
          className="w-full h-full object-cover object-center block"
          loading="eager"
          onLoad={() => setImageLoaded(true)}
        />

        {/* Text Blocks Overlay */}
        {renderTextBlocks()}

        {/* Live Countdown Timer Overlay (Desktop Coordinates) */}
        {showTimer && (
          <CountdownTimer
            targetDate={data.ends_at}
            position="custom"
            customX={desktopTimerX}
            customY={desktopTimerY}
            timerStyle={data.timer_style}
            showDays={data.show_days}
            timerTheme={data.timer_theme}
            timerBgColor={data.timer_bg_color}
            timerBoxColor={data.timer_box_color}
            timerNumberColor={data.timer_number_color}
            timerLabelColor={data.timer_label_color}
            timerSeparatorColor={data.timer_separator_color}
            timerSize={data.timer_size}
            timerScalePercent={timerScale}
            timerLabelStyle={data.timer_label_style}
          />
        )}
      </div>

      {/* ================= 2. MOBILE / PHONE BANNER (9:14 Portrait Poster) ================= */}
      <div
        className="block lg:hidden relative w-full overflow-hidden bg-slate-950 shadow-md"
        style={{ aspectRatio: '9 / 14', minHeight: '520px', maxWidth: '420px', margin: '0 auto' }}
      >
        <img
          src={mobileImageUrl}
          alt={`${data.festival} festival offer mobile banner`}
          className="w-full h-full object-cover object-center block"
          loading="eager"
        />

        {/* Text Blocks Overlay */}
        {renderTextBlocks()}

        {/* Live Countdown Timer Overlay (Mobile Lower Meadow Coordinates) */}
        {showTimer && (
          <CountdownTimer
            targetDate={data.ends_at}
            position="custom"
            customX={mobileTimerX}
            customY={mobileTimerY}
            timerStyle={data.timer_style}
            showDays={data.show_days}
            timerTheme={data.timer_theme}
            timerBgColor={data.timer_bg_color}
            timerBoxColor={data.timer_box_color}
            timerNumberColor={data.timer_number_color}
            timerLabelColor={data.timer_label_color}
            timerSeparatorColor={data.timer_separator_color}
            timerSize={data.timer_size}
            timerScalePercent={timerScale}
            timerLabelStyle={data.timer_label_style}
          />
        )}
      </div>
    </div>
  )
}
