'use client'

import { Noto_Sans_Devanagari } from 'next/font/google'
import { CountdownTimer } from './CountdownTimer'
import { Icon } from '@/components/ui/Icon'
import type { PromoBannerData } from '@/lib/api/types'

// Load Devanagari font scoped to this component
const notoDevanagari = Noto_Sans_Devanagari({
  subsets: ['latin', 'devanagari'],
  weight: ['400', '600', '700'],
  display: 'swap',
})

interface TextOverlayBannerProps {
  data: PromoBannerData
}

/**
 * Mode B: Text Overlay Banner
 * Background image with live text rendering on top
 */
export function TextOverlayBanner({ data }: TextOverlayBannerProps) {
  return (
    <div className="relative w-full overflow-hidden rounded-2xl shadow-lg" style={{ minHeight: '340px' }}>
      {/* Background Image */}
      <picture>
        <source 
          media="(max-width: 640px)" 
          srcSet={data.mobile_image_url || data.image_url} 
        />
        <img
          src={data.image_url}
          alt={`${data.festival} festival offer banner background`}
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />
      </picture>
      
      {/* Overlay Gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 100%)'
        }}
      />
      
      {/* Text Content */}
      <div className="relative z-10 flex flex-col justify-center items-start h-full p-8 md:p-12">
        {/* Headline Line 1 */}
        {data.headline_line1 && (
          <h2 
            className={`text-3xl md:text-5xl lg:text-6xl font-bold mb-2 ${notoDevanagari.className}`}
            style={{ color: data.text_color }}
          >
            {data.headline_line1}
          </h2>
        )}
        
        {/* Headline Line 2 (Highlighted) */}
        {data.headline_line2 && (
          <h3 
            className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-8 ${notoDevanagari.className}`}
            style={{ color: data.accent_color }}
          >
            {data.headline_line2}
          </h3>
        )}
        
        {/* Features */}
        {data.features && data.features.length > 0 && (
          <div className="flex flex-col gap-3 mb-6">
            {data.features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div 
                  className="flex items-center justify-center w-8 h-8 rounded-full"
                  style={{ 
                    backgroundColor: `${data.accent_color}20`,
                  }}
                >
                  <Icon 
                    name={feature.icon || 'check'} 
                    size={18} 
                    style={{ color: data.accent_color }}
                  />
                </div>
                <span 
                  className="text-lg md:text-xl font-semibold"
                  style={{ color: data.text_color }}
                >
                  {feature.text}
                </span>
              </div>
            ))}
          </div>
        )}
        
        {/* CTA Button */}
        {data.cta_text && data.cta_link && (
          <a
            href={data.cta_link}
            className="px-8 py-3 rounded-full font-bold text-white transition-transform hover:scale-105"
            style={{ 
              backgroundColor: data.accent_color,
              boxShadow: `0 4px 14px ${data.accent_color}40`,
            }}
          >
            {data.cta_text}
          </a>
        )}
      </div>
      
      {/* Countdown Timer */}
      <CountdownTimer
        targetDate={data.ends_at}
        position={data.timer_position}
        timerStyle={data.timer_style}
        showDays={data.show_days}
        timerTheme={data.timer_theme}
        timerBoxColor={data.timer_box_color}
        timerNumberColor={data.timer_number_color}
        timerLabelColor={data.timer_label_color}
        timerSeparatorColor={data.timer_separator_color}
        timerSize={data.timer_size}
        timerLabelStyle={data.timer_label_style}
      />
    </div>
  )
}
