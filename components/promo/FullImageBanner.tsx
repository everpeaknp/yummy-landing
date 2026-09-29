'use client'

import { useState } from 'react'
import { CountdownTimer } from './CountdownTimer'
import type { PromoBannerData } from '@/lib/api/types'

interface FullImageBannerProps {
  data: PromoBannerData
}

/**
 * Mode A: Full Image Banner
 * Image contains all text/design, countdown timer overlaid on top
 * Text blocks can be overlaid on top for flexibility
 */
export function FullImageBanner({ data }: FullImageBannerProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const getPositionClasses = (block: any) => {
    const positions: Record<string, string> = {
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

    if (block.position === 'custom') {
      return ''
    }

    return positions[block.position] || 'center'
  }

  const getPositionStyle = (block: any) => {
    if (block.position === 'custom' && block.custom_x_percent !== null && block.custom_y_percent !== null) {
      return {
        left: `${block.custom_x_percent}%`,
        top: `${block.custom_y_percent}%`,
        transform: 'translate(-50%, -50%)',
      }
    }

    return {}
  }

  const getFontSize = (size: string) => {
    const sizes: Record<string, string> = {
      small: 'text-sm',
      medium: 'text-base',
      large: 'text-lg',
      xlarge: 'text-xl',
    }
    return sizes[size] || 'text-base'
  }

  const getFontWeight = (weight: string) => {
    const weights: Record<string, string> = {
      normal: 'font-normal',
      bold: 'font-bold',
      black: 'font-black',
    }
    return weights[weight] || 'font-bold'
  }

  const getAlignment = (align: string) => {
    const alignments: Record<string, string> = {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    }
    return alignments[align] || 'text-center'
  }

  return (
    <div className="relative w-full overflow-x-clip" style={!imageLoaded ? { aspectRatio: '3 / 1' } : {}}>
      {/* Desktop/Tablet Image */}
      <picture>
        <source
          media="(max-width: 640px)"
          srcSet={data.mobile_image_url || data.image_url}
        />
        <img
          src={data.image_url}
          alt={`${data.festival} festival offer banner`}
          className="h-auto"
          style={{ width: 'calc(100% + 2px)', maxWidth: 'none', display: 'block' }}
          loading="eager"
          onLoad={() => setImageLoaded(true)}
        />
      </picture>
      
      {/* Text Blocks Overlay */}
      {data.text_blocks && data.text_blocks.length > 0 && (
        <div className="absolute inset-0 w-full h-full">
          {data.text_blocks
            .filter((block) => block.is_visible)
            .sort((a, b) => a.order - b.order)
            .map((block) => (
              <div
                key={block.id}
                className={`absolute max-w-[90%] ${getFontSize(block.font_size)} ${getFontWeight(block.font_weight)} ${getAlignment(block.alignment)} ${getPositionClasses(block)}`}
                style={{
                  ...getPositionStyle(block),
                  color: block.text_color,
                  backgroundColor: block.background_color || 'transparent',
                  padding: block.background_color ? '8px 16px' : '0',
                  borderRadius: block.background_color ? '9999px' : '0',
                  wordWrap: 'break-word',
                  whiteSpace: 'pre-wrap',
                }}
              >
                {block.text}
              </div>
            ))}
        </div>
      )}
      
      {/* Countdown Timer Overlay */}
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
