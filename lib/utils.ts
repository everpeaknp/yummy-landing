import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Utility function to merge Tailwind CSS classes
 * Combines clsx and tailwind-merge for optimal class merging
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Normalizes icon names for Lucide icons
 * Maps Material Symbols names to Lucide equivalents
 */
export function normalizeIconName(name: string): string {
  if (!name) return 'help-circle'

  const n = name.toLowerCase().trim()

  const aliases: Record<string, string> = {
    // UK to US spellings
    favourite: 'heart',
    colour: 'palette',
    centre: 'target',
    calender: 'calendar',

    // Material Symbols to Lucide mappings
    favorite: 'heart',
    group: 'users',
    groups: 'users-2',
    person: 'user',
    bar_chart: 'bar-chart',
    show_chart: 'trending-up',
    receipt_long: 'receipt',
    qr_code_2: 'qr-code',
    inventory_2: 'package',
    location_on: 'map-pin',
    arrow_forward: 'arrow-right',
    expand_less: 'chevron-up',
    expand_more: 'chevron-down',
    chevron_left: 'chevron-left',
    chevron_right: 'chevron-right',
    attach_money: 'dollar-sign',
    contact_mail: 'mail',
    calendar_today: 'calendar',
    auto_awesome: 'sparkles',
    emoji_events: 'award',
    help: 'help-circle',
    quiz: 'help-circle',
    analytics: 'bar-chart',
    dashboard: 'home',

    // Common aliases
    users: 'users',
    people: 'users',
    user: 'user',
    team: 'users-2',
    staff: 'users-2',
    employee: 'badge',
    chart: 'bar-chart',
    graph: 'trending-up',
    stats: 'bar-chart',

    setting: 'settings',
    gear: 'settings',
    config: 'settings',

    money: 'dollar-sign',
    cash: 'dollar-sign',
    bill: 'receipt',
    invoice: 'receipt',

    phone: 'phone',
    call: 'phone',
    mobile: 'smartphone',
    email: 'mail',

    food: 'utensils',
    drink: 'coffee',
    cafe: 'coffee',
    coffee: 'coffee',
  }

  return aliases[n] || n
}
