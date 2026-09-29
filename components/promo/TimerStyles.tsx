/**
 * Timer Styles - Shared theme and color logic for countdown timer
 * Used by Boxes, Compact, and Digital timer styles
 */

export interface TimerThemeColors {
  boxColor: string
  numberColor: string
  labelColor: string
  separatorColor: string
}

export interface TimerStyleConfig {
  fontSize: string
  boxPadding: string
  borderRadius: string
  shadow: string
  border: string
}

/**
 * Get timer theme colors based on theme selection
 * Uses preset colors for predefined themes, custom colors for custom theme
 */
export function getTimerThemeColors(
  theme: 'brand_orange' | 'festive_red' | 'deep_navy' | 'custom',
  customBoxColor: string,
  customNumberColor: string,
  customLabelColor: string,
  customSeparatorColor: string
): TimerThemeColors {
  const presets: Record<string, TimerThemeColors> = {
    brand_orange: {
      boxColor: '#F97316',
      numberColor: '#FFFFFF',
      labelColor: '#FFFFFF',
      separatorColor: '#FFFFFF',
    },
    festive_red: {
      boxColor: '#ED1C24',
      numberColor: '#FFFFFF',
      labelColor: '#FFFFFF',
      separatorColor: '#FFFFFF',
    },
    deep_navy: {
      boxColor: '#0F172A',
      numberColor: '#FFFFFF',
      labelColor: '#FFFFFF',
      separatorColor: '#FFFFFF',
    },
  }

  if (theme !== 'custom' && presets[theme]) {
    return presets[theme]
  }

  // Use custom colors when theme is custom
  return {
    boxColor: customBoxColor,
    numberColor: customNumberColor,
    labelColor: customLabelColor,
    separatorColor: customSeparatorColor,
  }
}

/**
 * Get timer style configuration based on size selection
 */
export function getTimerSizeConfig(size: 'small' | 'medium' | 'large'): Omit<TimerStyleConfig, 'colors'> {
  const configs: Record<string, Omit<TimerStyleConfig, 'colors'>> = {
    small: {
      fontSize: 'text-sm',
      boxPadding: 'px-2 py-1',
      borderRadius: 'rounded-md',
      shadow: 'shadow-md',
      border: 'border-2 border-white/20',
    },
    medium: {
      fontSize: 'text-xl md:text-2xl',
      boxPadding: 'px-3 py-2',
      borderRadius: 'rounded-lg',
      shadow: 'shadow-lg',
      border: 'border-2 border-white/30',
    },
    large: {
      fontSize: 'text-2xl md:text-3xl',
      boxPadding: 'px-4 py-3',
      borderRadius: 'rounded-xl',
      shadow: 'shadow-xl',
      border: 'border-2 border-white/40',
    },
  }

  return configs[size] || configs.medium
}

/**
 * Get label text based on label style
 */
export function getTimerLabelText(
  label: string,
  style: 'full' | 'short'
): string {
  const labels: Record<string, { full: string; short: string }> = {
    days: { full: 'Days', short: 'D' },
    hours: { full: 'Hours', short: 'H' },
    minutes: { full: 'Minutes', short: 'M' },
    seconds: { full: 'Seconds', short: 'S' },
  }

  const labelConfig = labels[label.toLowerCase()] || { full: label, short: label[0] }
  return style === 'full' ? labelConfig.full : labelConfig.short
}
