'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { calculateTimeLeft, type TimeUnits } from '@/lib/utils/countdown'
import type { PromoBannerData } from '@/lib/api/types'

interface DashainPromoBannerProps {
  data: PromoBannerData
}

/**
 * Authentic, Fully-Dynamic Dashain Campaign Banner
 * - Full-width panoramic banner starting right below navbar with NO rounded corners
 * - Rich authentic Dashain "skyblue greenish vibe" with layered Himalayan peaks & rolling green hills
 * - Beautiful animated floating kites soaring within the banner with gentle parallax
 * - All visual components (Offer Details, POS Setup, Timer, Badges) dynamically positioned based on visual drag-and-drop coordinates from Django Admin
 * - Clean mobile-responsive fallback stacked view for phones and small screens
 * - 100% Dynamic from Django API: headlines, prices, features, countdown dates, custom positions
 */
export function DashainPromoBanner({ data }: DashainPromoBannerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeUnits | null>(null)
  const [isMounted, setIsMounted] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const bannerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    setIsMounted(true)
    setTimeLeft(calculateTimeLeft(data.ends_at))
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(data.ends_at))
    }, 1000)
    return () => clearInterval(timer)
  }, [data.ends_at])

  // Subtle interactive parallax for floating kites inside banner
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!bannerRef.current) return
    const rect = bannerRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setMousePos({ x, y })
  }

  // Dynamic values with sensible defaults
  const headline1Text = data.headline_line1 || 'BADA DASHAIN MEGA OFFER'
  const priceText = data.headline_line2 || '२४,९९९'
  const freeOfferText = data.features?.[0]?.text || '1 Thermal Printer & Paper Rolls'
  const hardwareLabel = data.features?.[1]?.text || 'Our Restaurant POS + Thermal Printer'
  const customDesktopBg =
    !data.use_default_image && data.image_url && !data.image_url.includes('Dashainoffer.png')
      ? data.image_url
      : null

  const customMobileBg =
    !data.use_default_image && data.mobile_image_url && !data.mobile_image_url.includes('Dashainoffer.png')
      ? data.mobile_image_url
      : customDesktopBg
  const posScreenImage = '/images/yummy-dashboard-live.png'

  // Dynamic coordinates from Django Admin (Desktop)
  const contentX = data.content_x_percent ?? 20.0
  const contentY = data.content_y_percent ?? 50.0
  const hardwareX = data.hardware_x_percent ?? 52.0
  const hardwareY = data.hardware_y_percent ?? 50.0
  const timerX = data.timer_x_percent ?? 82.0
  const timerY = data.timer_y_percent ?? 50.0

  // Dynamic coordinates from Django Admin (Mobile)
  const mobileContentX = data.mobile_content_x_percent ?? 50.0
  const mobileContentY = data.mobile_content_y_percent ?? 20.0
  const mobileHardwareX = data.mobile_hardware_x_percent ?? 50.0
  const mobileHardwareY = data.mobile_hardware_y_percent ?? 54.0
  const mobileTimerX = data.mobile_timer_x_percent ?? 50.0
  const mobileTimerY = data.mobile_timer_y_percent ?? 86.0

  // Split freeOfferText around '&' if present for clean two-line badge rendering
  const freeOfferParts = freeOfferText.includes('&')
    ? [
        freeOfferText.substring(0, freeOfferText.indexOf('&') + 1).trim(),
        freeOfferText.substring(freeOfferText.indexOf('&') + 1).trim(),
      ]
    : [freeOfferText, '']

  const timeUnits = timeLeft
    ? [
        { value: timeLeft.days, label: 'DAYS' },
        { value: timeLeft.hours, label: 'HOURS' },
        { value: timeLeft.minutes, label: 'MINS' },
        { value: timeLeft.seconds, label: 'SECS' },
      ]
    : [
        { value: 12, label: 'DAYS' },
        { value: 7, label: 'HOURS' },
        { value: 35, label: 'MINS' },
        { value: 14, label: 'SECS' },
      ]

  const filteredTimeUnits =
    data.show_days === false ? timeUnits.filter((u) => u.label !== 'DAYS') : timeUnits

  const isTimerTransparent =
    !data.timer_bg_color ||
    data.timer_bg_color.trim().toLowerCase() === 'transparent' ||
    data.timer_bg_color.trim().toLowerCase() === 'none' ||
    data.timer_bg_color.trim() === ''

  const timerBgColor = data.timer_bg_color || data.timer_box_color || 'transparent'
  const timerDigitColor = data.timer_number_color || '#ff6929'
  const timerLabelColor = data.timer_label_color || '#ffffff'

  /* ================= Sub-Components for Reuse between Desktop & Mobile ================= */

  // 1. Offer Details & Pricing Block
  const renderOfferDetails = (isDesktop = false) => (
    <div
      className={`flex flex-col ${
        isDesktop ? 'items-start text-left' : 'items-center text-center'
      } space-y-2.5 max-w-[340px] drop-shadow-md`}
    >
      {/* Authentic Dashain Crest */}
      <div className="relative w-44 sm:w-52 h-20 sm:h-22 drop-shadow-md">
        <Image
          src="/images/dashain-crest.png"
          alt="दशैंको शुभकामना - Yummy POS"
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Dynamic Headline 1 Badge */}
      {headline1Text && (
        <div
          className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full text-white text-xs sm:text-sm font-black shadow-md tracking-wider uppercase"
          style={{ backgroundColor: data.accent_color || '#ff6929' }}
        >
          <span>{headline1Text}</span>
        </div>
      )}

      {/* Offer Price Pill */}
      <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#ff6929] text-white text-xs sm:text-sm font-extrabold shadow-md tracking-wider uppercase">
        <span>OFFER PRICE</span>
      </div>

      {/* Dynamic Bold Price */}
      <div className="flex items-baseline gap-2">
        <span className="text-4xl sm:text-5xl xl:text-6xl font-black text-[#ff6929] tracking-tight drop-shadow-sm font-display">
          {priceText}
        </span>
        <span className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-200">/year</span>
      </div>

      {/* Dynamic Free Offer Badge */}
      <div className="flex items-center mt-1 drop-shadow-md hover:scale-105 transition-transform">
        <div className="relative flex items-center">
          <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-gradient-to-br from-red-500 via-orange-500 to-amber-500 flex items-center justify-center shadow-lg border-2 border-white ring-2 ring-orange-300 -rotate-12 z-10 shrink-0">
            <span className="text-white text-[11px] sm:text-xs font-black tracking-wider uppercase">
              FREE!
            </span>
          </div>
          <div className="flex flex-col gap-0.5 -ml-4 pl-7 pr-4 py-1.5 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl shadow-md border border-white/60 text-white text-xs sm:text-sm font-extrabold tracking-wide text-left">
            <span>{freeOfferParts[0]}</span>
            {freeOfferParts[1] && <span>{freeOfferParts[1]}</span>}
          </div>
        </div>
      </div>
    </div>
  )

  // 2. POS Terminal & Thermal Printer Setup Mockup
  const renderHardwareSetup = () => (
    <div className="flex flex-col items-center justify-center relative group">
      <div className="relative w-full max-w-[340px] sm:max-w-[370px]">
        {/* Sleek POS Tablet Display Frame with Real Dashboard Screenshot */}
        <div className="relative w-full bg-slate-900 rounded-2xl p-2.5 shadow-2xl border-2 border-slate-700 ring-4 ring-black/10">
          <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-slate-600 rounded-full" />

          {/* Screen displaying real dashboard */}
          <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
            <Image
              src={posScreenImage}
              alt="Yummy POS Operations Dashboard"
              fill
              className="object-cover object-top"
              priority
            />
          </div>

          {/* POS Stand Base */}
          <div className="absolute -bottom-3.5 left-1/2 -translate-x-1/2 w-24 h-3.5 bg-slate-800 rounded-b-xl border-t border-slate-700 shadow-md -z-10" />
        </div>

        {/* Thermal Receipt Printer accent beside POS */}
        <div className="absolute -bottom-2 -right-3 w-18 h-15 bg-slate-900 rounded-lg border border-slate-700 shadow-xl p-1 flex flex-col items-center justify-start hidden sm:flex">
          {/* Paper exit slot */}
          <div className="w-11 h-1 bg-black rounded-full mb-1" />
          {/* Receipt slip */}
          <div className="w-9 h-6 bg-white/90 rounded-sm shadow-inner px-1 py-0.5 flex flex-col gap-0.5 animate-pulse">
            <div className="w-5 h-0.5 bg-slate-400 rounded" />
            <div className="w-7 h-0.5 bg-slate-300 rounded" />
            <div className="w-4 h-0.5 bg-orange-400 rounded" />
          </div>
          <span className="text-[7px] font-bold text-slate-400 mt-0.5">PRINTER</span>
        </div>
      </div>

      {/* Clean Hardware Label Pill */}
      <div className="mt-3.5 px-4 py-1.5 rounded-full bg-white/90 dark:bg-black/80 backdrop-blur-md border border-slate-200/90 dark:border-white/10 text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 shadow-sm">
        <span>{hardwareLabel}</span>
      </div>
    </div>
  )

  // 3. Countdown Timer Block
  const renderTimer = () => (
    <div className="flex flex-col items-center text-center gap-1.5 drop-shadow-md">
      <span
        className="text-xs sm:text-sm font-black tracking-wider uppercase drop-shadow-sm text-center"
        style={{ color: timerLabelColor }}
      >
        OFFER ENDS IN:
      </span>
      <div
        className={`flex items-center justify-center gap-2 sm:gap-3 ${
          isTimerTransparent
            ? ''
            : 'backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 shadow-xl'
        }`}
        style={isTimerTransparent ? {} : { backgroundColor: timerBgColor }}
      >
        {filteredTimeUnits.map((unit, index) => (
          <React.Fragment key={unit.label}>
            <div className="flex flex-col items-center justify-center min-w-[34px] sm:min-w-[42px]">
              {/* Dynamic Digits Color */}
              <span
                className="text-2xl sm:text-3xl xl:text-4xl font-black tracking-tight font-mono leading-none drop-shadow-sm"
                style={{ color: timerDigitColor }}
              >
                {isMounted ? String(unit.value).padStart(2, '0') : '00'}
              </span>
              {/* Dynamic Sub-Label Color */}
              <span
                className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest mt-1 text-center"
                style={{ color: timerLabelColor }}
              >
                {unit.label}
              </span>
            </div>
            {index < filteredTimeUnits.length - 1 && (
              <span
                className="font-black text-xl sm:text-2xl select-none pb-2"
                style={{ color: timerDigitColor }}
              >
                :
              </span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  )

  return (
    <div
      ref={bannerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full overflow-hidden rounded-none border-b border-emerald-400/50 dark:border-white/10 bg-gradient-to-b from-[#38BDF8] via-[#7DD3FC] via-[#BAE6FD] via-[#D1FAE5] to-[#86EFAC] dark:from-sky-950 dark:via-slate-900 dark:via-zinc-900 dark:to-emerald-950 py-4 sm:py-6 lg:py-0 min-h-[580px] lg:min-h-[490px] xl:min-h-[520px] lg:aspect-[3/1] max-w-full flex items-center justify-center transition-colors duration-500"
    >
      {/* ================= 1. Scenic Himalayan Autumn Sky & Rolling Green Hills Background ================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        {/* Dynamic Uploaded Desktop Background */}
        {customDesktopBg && (
          <Image
            src={customDesktopBg}
            alt="Desktop Dashain Campaign Background"
            fill
            className="hidden lg:block object-cover object-center z-0"
            priority
          />
        )}

        {/* Dynamic Uploaded Mobile Background (falls back to desktop if not separately uploaded) */}
        {customMobileBg && (
          <Image
            src={customMobileBg}
            alt="Mobile Dashain Campaign Background"
            fill
            className="lg:hidden object-cover object-center z-0"
            priority
          />
        )}

        {/* Soft Fluffy Autumn Clouds */}
        <div className="absolute top-3 left-[15%] w-80 h-16 bg-white/50 rounded-full blur-2xl" />
        <div className="absolute top-5 right-[18%] w-96 h-20 bg-white/60 rounded-full blur-3xl" />
        <div className="absolute top-2 left-[55%] w-60 h-12 bg-white/40 rounded-full blur-xl" />

        {/* Distant Snow-Capped Himalayan Mountain Peaks Silhouette */}
        <svg
          className="absolute bottom-24 sm:bottom-28 w-full h-28 sm:h-36 text-white/50 dark:text-blue-900/20"
          preserveAspectRatio="none"
          viewBox="0 0 1400 120"
          fill="currentColor"
        >
          <path d="M0,120 L0,70 L140,25 L240,65 L380,10 L480,55 L620,18 L760,60 L920,8 L1060,50 L1220,20 L1340,65 L1400,35 L1400,120 Z" />
        </svg>

        {/* Rolling Lush Green Hills (Back Hill Layer) */}
        <svg
          className="absolute bottom-10 sm:bottom-12 w-full h-24 sm:h-32 text-emerald-300/60 dark:text-emerald-900/30"
          preserveAspectRatio="none"
          viewBox="0 0 1400 120"
          fill="currentColor"
        >
          <path d="M0,120 L0,75 Q320,25 650,65 T1400,45 L1400,120 Z" />
        </svg>

        {/* Rolling Lush Green Meadow Base (Front Hill Layer) */}
        <svg
          className="absolute bottom-0 w-full h-20 sm:h-28 text-[#4ade80]/70 dark:text-emerald-800/40"
          preserveAspectRatio="none"
          viewBox="0 0 1400 120"
          fill="currentColor"
        >
          <path d="M0,120 L0,60 Q380,100 800,45 T1400,65 L1400,120 Z" />
        </svg>

        {/* Deep Green Grass Gradient Base */}
        <div className="absolute bottom-0 inset-x-0 h-14 bg-gradient-to-t from-[#16a34a]/30 via-[#22c55e]/15 to-transparent" />

        {/* ================= Animated Floating Kites within Banner Sky ================= */}

        {/* Floating Kite 1: Soaring High on Left (Orange & Gold) */}
        <div
          className="absolute top-5 sm:top-7 left-8 sm:left-16 transition-transform duration-700 ease-out"
          style={{
            transform: `translate3d(${mousePos.x * 24}px, ${mousePos.y * 18}px, 0)`,
          }}
        >
          <div className="animate-festive-kite-1 drop-shadow-md">
            <svg width="34" height="52" viewBox="0 0 34 52" fill="none">
              <polygon points="17,2 32,17 2,17" fill="#FF6929" />
              <polygon points="2,17 32,17 17,34" fill="#F59E0B" />
              <line x1="17" y1="2" x2="17" y2="34" stroke="#FFFFFF" strokeWidth="1.2" />
              <path d="M 2 17 Q 17 8 32 17" stroke="#FFFFFF" strokeWidth="1.2" fill="none" />
              <path d="M 17 34 Q 10 40 18 45 Q 22 49 14 54" stroke="#FF6929" strokeWidth="1.6" fill="none" />
              <circle cx="18" cy="45" r="1.5" fill="#EF4444" />
            </svg>
          </div>
        </div>

        {/* Floating Kite 2: Bobbing near Center-Left (Cyan & Emerald) */}
        <div
          className="absolute top-12 left-[28%] hidden md:block transition-transform duration-700 ease-out"
          style={{
            transform: `translate3d(${mousePos.x * -18}px, ${mousePos.y * -14}px, 0)`,
          }}
        >
          <div className="animate-bounce drop-shadow" style={{ animationDuration: '3.5s' }}>
            <svg width="26" height="42" viewBox="0 0 34 52" fill="none">
              <polygon points="17,2 32,17 2,17" fill="#06B6D4" />
              <polygon points="2,17 32,17 17,34" fill="#10B981" />
              <line x1="17" y1="2" x2="17" y2="34" stroke="#FFFFFF" strokeWidth="1.2" />
              <path d="M 2 17 Q 17 8 32 17" stroke="#FFFFFF" strokeWidth="1.2" fill="none" />
              <path d="M 17 34 Q 12 40 19 45 Q 22 49 15 54" stroke="#06B6D4" strokeWidth="1.5" fill="none" />
            </svg>
          </div>
        </div>

        {/* Floating Kite 3: High Center-Right (Pink & Purple) */}
        <div
          className="absolute top-4 right-[36%] hidden lg:block transition-transform duration-700 ease-out"
          style={{
            transform: `translate3d(${mousePos.x * 20}px, ${mousePos.y * 15}px, 0)`,
          }}
        >
          <div className="animate-festive-kite-2 drop-shadow-md">
            <svg width="28" height="46" viewBox="0 0 34 52" fill="none">
              <polygon points="17,2 32,17 2,17" fill="#EC4899" />
              <polygon points="2,17 32,17 17,34" fill="#8B5CF6" />
              <line x1="17" y1="2" x2="17" y2="34" stroke="#FFFFFF" strokeWidth="1.2" />
              <path d="M 2 17 Q 17 8 32 17" stroke="#FFFFFF" strokeWidth="1.2" fill="none" />
              <path d="M 17 34 Q 11 40 19 45 Q 22 49 15 54" stroke="#EC4899" strokeWidth="1.5" fill="none" />
            </svg>
          </div>
        </div>

        {/* Floating Kite 4: High on Far Right (Amber & Red) */}
        <div
          className="absolute top-6 right-8 sm:right-14 transition-transform duration-700 ease-out"
          style={{
            transform: `translate3d(${mousePos.x * -22}px, ${mousePos.y * -16}px, 0)`,
          }}
        >
          <div className="animate-festive-kite-1 opacity-80 drop-shadow">
            <svg width="26" height="42" viewBox="0 0 34 52" fill="none">
              <polygon points="17,2 32,17 2,17" fill="#F59E0B" />
              <polygon points="2,17 32,17 17,34" fill="#EF4444" />
              <line x1="17" y1="2" x2="17" y2="34" stroke="#FFFFFF" strokeWidth="1.2" />
              <path d="M 2 17 Q 17 8 32 17" stroke="#FFFFFF" strokeWidth="1.2" fill="none" />
              <path d="M 17 34 Q 10 40 18 45 Q 22 49 14 54" stroke="#F59E0B" strokeWidth="1.5" fill="none" />
            </svg>
          </div>
        </div>
      </div>

      {/* ================= 2. DESKTOP VIEW: Placed Dynamically via Visual Drag & Drop Canvas ================= */}
      <div className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none z-20">
        <div className="relative w-full h-full max-w-[1920px] mx-auto">
          {/* Draggable Offer Details & Headlines Block (only when using dynamic background) */}
          {!customDesktopBg && (
            <div
              className="absolute pointer-events-auto transition-transform"
              style={{
                left: `${contentX}%`,
                top: `${contentY}%`,
                transform: `translate(-50%, -50%) scale(${(data.content_scale_percent || 100) / 100})`,
                transformOrigin: 'center center',
              }}
            >
              {renderOfferDetails(true)}
            </div>
          )}

          {/* Draggable POS Terminal & Printer Hardware Setup (only when using dynamic background) */}
          {!customDesktopBg && (
            <div
              className="absolute pointer-events-auto transition-transform"
              style={{
                left: `${hardwareX}%`,
                top: `${hardwareY}%`,
                transform: `translate(-50%, -50%) scale(${(data.hardware_scale_percent || 100) / 100})`,
                transformOrigin: 'center center',
              }}
            >
              {renderHardwareSetup()}
            </div>
          )}

          {/* Draggable Countdown Timer (only if show_timer is true) */}
          {data.show_timer !== false && (
            <div
              className="absolute pointer-events-auto transition-transform"
              style={{
                left: `${timerX}%`,
                top: `${timerY}%`,
                transform: `translate(-50%, -50%) scale(${(data.timer_scale_percent || 100) / 100})`,
                transformOrigin: 'center center',
              }}
            >
              {renderTimer()}
            </div>
          )}
        </div>
      </div>

      {/* ================= 3. MOBILE & TABLET VIEW: Positioned Dynamically via Drag & Drop Coordinates ================= */}
      <div className="lg:hidden relative z-20 w-full aspect-[9/14] min-h-[580px] max-w-[420px] mx-auto pointer-events-none">
        {/* Draggable Offer Details (only when using dynamic background) */}
        {!customMobileBg && (
          <div
            className="absolute pointer-events-auto transition-transform w-[90%] max-w-[320px]"
            style={{
              left: `${mobileContentX}%`,
              top: `${mobileContentY}%`,
              transform: `translate(-50%, -50%) scale(${(data.content_scale_percent || 100) / 100})`,
              transformOrigin: 'center center',
            }}
          >
            {renderOfferDetails(false)}
          </div>
        )}

        {/* Draggable POS Terminal & Printer Hardware Setup (only when using dynamic background) */}
        {!customMobileBg && (
          <div
            className="absolute pointer-events-auto transition-transform w-[90%] max-w-[320px]"
            style={{
              left: `${mobileHardwareX}%`,
              top: `${mobileHardwareY}%`,
              transform: `translate(-50%, -50%) scale(${(data.hardware_scale_percent || 100) / 100})`,
              transformOrigin: 'center center',
            }}
          >
            {renderHardwareSetup()}
          </div>
        )}

        {/* Draggable Countdown Timer (only if show_timer is true) */}
        {data.show_timer !== false && (
          <div
            className="absolute pointer-events-auto transition-transform"
            style={{
              left: `${mobileTimerX}%`,
              top: `${mobileTimerY}%`,
              transform: `translate(-50%, -50%) scale(${(data.timer_scale_percent || 100) / 100})`,
              transformOrigin: 'center center',
            }}
          >
            {renderTimer()}
          </div>
        )}
      </div>

      {/* ================= 4. Draggable Custom Text/Sticker Blocks ================= */}
      {data.text_blocks && data.text_blocks.length > 0 && (
        <div className="absolute inset-0 w-full h-full pointer-events-none z-30 overflow-hidden">
          {data.text_blocks
            .filter((block) => block.is_visible)
            .sort((a, b) => a.order - b.order)
            .map((block) => {
              const isCustom =
                block.position === 'custom' &&
                block.custom_x_percent !== null &&
                block.custom_y_percent !== null
              const scale = (block.scale_percent || 100) / 100
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
              const hasBg =
                block.background_color &&
                block.background_color.trim().toLowerCase() !== 'transparent' &&
                block.background_color.trim().toLowerCase() !== 'none'
              return (
                <div
                  key={block.id}
                  className="absolute pointer-events-auto flex flex-col items-center drop-shadow-lg"
                  style={{
                    ...style,
                    color: block.text_color || '#ffffff',
                    backgroundColor: hasBg ? block.background_color : 'transparent',
                    padding: hasBg ? '6px 14px' : '0',
                    borderRadius: hasBg ? '9999px' : '0',
                  }}
                >
                  {block.image_url && (
                    <img
                      src={block.image_url}
                      alt={block.text || 'Item'}
                      className="max-h-20 sm:max-h-28 md:max-h-36 w-auto object-contain select-none pointer-events-none drop-shadow-md"
                    />
                  )}
                  {block.text && (
                    <span className="text-xs sm:text-sm font-bold text-center">
                      {block.text}
                    </span>
                  )}
                </div>
              )
            })}
        </div>
      )}
    </div>
  )
}
