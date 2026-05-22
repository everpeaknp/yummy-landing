'use client'

import Link from 'next/link'
import { siteConfig } from '@/lib/constants'
import { useTheme } from '@/hooks/useTheme'
import PaperPlaneButton from '@/components/ui/PaperPlaneButton'
import { useHeroData, type HeroData } from '@/lib/api'
import { InlineHTMLContent } from '@/components/ui/HTMLContent'
import { Icon } from '@/components/ui/Icon'

// Fallback data matching current UI exactly
const fallbackData: Partial<HeroData> = {
  badge: { icon: 'verified', text: 'Made for Nepal', emoji: '🇳🇵' },
  headline: {
    line1: 'Manage your',
    line2: 'Restaurant,',
    highlightWord: 'Effortlessly.',
    highlightColor: '#ff6929',
  },
  subheadline:
    'The #1 Restaurant OS in Nepal. IRD Approved Billing, Inventory, and KOT. Stop worrying about operations and focus on your food.',
  buttons: [
    {
      text: 'Start Free Trial',
      href: '/pricing',
      type: 'primary',
      icon: null,
      successText: 'Launching...',
      order: 1,
    },
    {
      text: 'How it Works',
      href: '#about',
      type: 'secondary',
      icon: 'arrow_forward',
      successText: '',
      order: 2,
    },
  ],
  badgeColors: {
    light: { background: '#ffedd5', text: '#c2410c' },
    dark: { background: 'rgba(124, 45, 18, 0.3)', text: '#fdba74' },
  },
}

export function Hero() {
  // Helper to render emoji or convert 2-letter country codes (e.g. 'np' -> 🇳🇵)
  function renderEmoji(e?: string | null) {
    if (!e) return ''
    // If it's a two-letter country code like 'np' or 'NP', convert to flag
    if (/^[A-Za-z]{2}$/.test(e)) {
      return e
        .toUpperCase()
        .split('')
        .map((ch) => String.fromCodePoint(127397 + ch.charCodeAt(0)))
        .join('')
    }
    return e
  }
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const { data } = useHeroData(fallbackData)

  const badge = data.badge || fallbackData.badge!
  const headline = data.headline || fallbackData.headline!
  const subheadline = data.subheadline || fallbackData.subheadline!
  const buttons = data.buttons || fallbackData.buttons!
  const badgeColors = data.badgeColors || fallbackData.badgeColors!

  const primaryButton = buttons.find((b) => b.type === 'primary') || buttons[0]
  const secondaryButton = buttons.find((b) => b.type === 'secondary') || buttons[1]

  return (
    <header className="pt-32 pb-12 lg:pt-48 lg:pb-20 text-center max-w-7xl mx-auto px-6">
      {/* Badge */}
      <div
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-8 transition-colors duration-300"
        style={{
          backgroundColor: isDark
            ? (badgeColors as any).dark?.background
            : (badgeColors as any).light?.background,
          color: isDark ? (badgeColors as any).dark?.text : (badgeColors as any).light?.text,
        }}
      >
        <Icon name={badge.icon} size={14} />
        <span>
          {badge.text}{' '}
          {renderEmoji(badge.emoji)}
        </span>
      </div>

      {/* Headline */}
      <h1
        className="text-5xl sm:text-7xl lg:text-8xl font-black font-display tracking-tight leading-[0.95] mb-8 text-slate-900 dark:text-white transition-colors duration-300"
      >
        {headline.line1} <br />
        {headline.line2}{' '}
        <span style={{ color: headline.highlightColor }}>{headline.highlightWord}</span>
      </h1>

      {/* Subheadline */}
      <p
        className="text-xl sm:text-2xl max-w-3xl mx-auto leading-relaxed mb-12 text-slate-600 dark:text-slate-400 transition-colors duration-300"
      >
        <InlineHTMLContent html={subheadline} />
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
        {primaryButton && (
          <PaperPlaneButton
            href={primaryButton.href}
            text={primaryButton.text}
            successText={primaryButton.successText || 'Launching...'}
          />
        )}

        {secondaryButton && (
          <Link
            href={secondaryButton.href}
            className="group flex items-center justify-center gap-2 rounded-[7px] border border-slate-200 bg-white px-6 py-3 min-w-[160px] font-semibold text-slate-600 transition-all hover:border-slate-300 hover:bg-slate-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800"
          >
            <span>{secondaryButton.text}</span>
            {secondaryButton.icon && (
              <Icon
                name={secondaryButton.icon}
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            )}
          </Link>
        )}
      </div>
    </header>
  )
}
