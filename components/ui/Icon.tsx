import * as LucideIcons from 'lucide-react'
import { LucideIcon } from 'lucide-react'
import React from 'react'

interface IconProps {
  name: string
  className?: string
  size?: number
  color?: string
  style?: React.CSSProperties
}

/**
 * Universal Icon component that handles any Lucide icon dynamically
 */
export function Icon({ name, className = '', size = 24, color, style, ...props }: IconProps) {
  // Normalize the icon name and try different variations
  const normalizedName = normalizeIconName(name)

  // Try to find the icon in multiple formats
  const getIconComponent = (iconName: string): LucideIcon | null => {
    if (!iconName) return null

    const variations = [
      iconName,
      iconName.charAt(0).toUpperCase() + iconName.slice(1), // capitalize first
      iconName
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(''), // kebab to PascalCase
      iconName
        .split('_')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(''), // snake to PascalCase
      // Additional common patterns
      iconName.replace(/[-_]/g, ''), // remove all separators
      iconName.replace(/[-_]/g, '').charAt(0).toUpperCase() +
        iconName.replace(/[-_]/g, '').slice(1),
    ]

    for (const variant of variations) {
      try {
        const iconsRecord = LucideIcons as Record<string, unknown>
        const icon = iconsRecord[variant]
        // Lucide icons are objects/components, not functions
        if (icon && typeof icon === 'object' && icon !== null) {
          return icon as LucideIcon
        }
      } catch {
        // Continue to next variation
      }
    }

    return null
  }

  // Legacy mappings for Material Symbols to Lucide
  const legacyMappings: Record<string, string> = {
    // Material Symbols to Lucide mappings
    inventory_2: 'Package',
    receipt_long: 'Receipt',
    receipt: 'Receipt',
    'receipt-swiss-franc': 'Receipt',
    bar_chart: 'BarChart',
    qr_code_2: 'QrCode',
    restaurant_menu: 'Utensils',
    person_add: 'UserPlus',
    point_of_sale: 'CreditCard',
    show_chart: 'TrendingUp',
    attach_money: 'DollarSign',
    location_on: 'MapPin',
    contact_mail: 'Mail',
    arrow_forward: 'ArrowRight',
    expand_less: 'ChevronUp',
    expand_more: 'ChevronDown',
    chevron_left: 'ChevronLeft',
    chevron_right: 'ChevronRight',
    calendar_today: 'Calendar',
    help_outline: 'HelpCircle',
    light_mode: 'Sun',
    dark_mode: 'Moon',
    emoji_events: 'Award',
    auto_awesome: 'Sparkles',
    favorite: 'Heart',
    groups: 'Users',
    person: 'User',
    work: 'Briefcase',
    public: 'Globe',
    security: 'Shield',
    business: 'Building',
    bolt: 'Zap',
    target: 'Target',
    flag: 'Flag',
    utensils: 'Utensils',
    users: 'Users',
    user: 'User',
    // Additional common icons from error log
    menu: 'Menu',
    close: 'X',
    check: 'Check',
    check_circle: 'CheckCircle',
    help: 'HelpCircle',
    info: 'Info',
    verified: 'BadgeCheck',
    dashboard: 'LayoutDashboard',
    flash_on: 'Zap',
    table_restaurant: 'UtensilsCrossed',
    checklist: 'ListChecks',
    celebration: 'PartyPopper',
    'cloud-lightning': 'CloudLightning',
    moon: 'Moon',
    sun: 'Sun',
    star: 'Star',
    home: 'Home',
    mail: 'Mail',
    phone: 'Phone',
    search: 'Search',
    settings: 'Settings',
    tune: 'Sliders',
    build: 'Wrench',
    schedule: 'Clock',
    people: 'Users',
    team: 'Users',
    staff: 'Users',
    employee: 'User',
    chart: 'BarChart',
    graph: 'TrendingUp',
    analytics: 'BarChart3',
    insights: 'TrendingUp',
    notifications: 'Bell',
    notification: 'Bell',
    alarm: 'AlarmClock',
    timer: 'Timer',
    download: 'Download',
    upload: 'Upload',
    share: 'Share',
    copy: 'Copy',
    delete: 'Trash2',
    edit: 'Edit',
    save: 'Save',
    add: 'Plus',
    remove: 'Minus',
    filter: 'Filter',
    sort: 'ArrowUpDown',
    refresh: 'RefreshCw',
    sync: 'RotateCcw',
    logout: 'LogOut',
    login: 'LogIn',
    account: 'User',
    profile: 'User',
    avatar: 'UserCircle',
    image: 'Image',
    photo: 'Camera',
    video: 'Video',
    audio: 'Volume2',
    music: 'Music',
    file: 'FileText',
    folder: 'Folder',
    link: 'Link',
    external_link: 'ExternalLink',
    print: 'Printer',
    download_done: 'CheckCircle',
    upload_done: 'CheckCircle',
    error: 'AlertCircle',
    warning: 'AlertTriangle',
    success: 'CheckCircle',
    shopping_cart: 'ShoppingCart',
    payment: 'CreditCard',
    money: 'DollarSign',
    wallet: 'Wallet',
    credit_card: 'CreditCard',
    gift: 'Gift',
    tag: 'Tag',
    bookmark: 'Bookmark',
    heart: 'Heart',
    like: 'ThumbsUp',
    dislike: 'ThumbsDown',
    comment: 'MessageCircle',
    chat: 'MessageSquare',
    message: 'Mail',
    send: 'Send',
    reply: 'Reply',
    forward: 'Forward',
    visibility: 'Eye',
    visibility_off: 'EyeOff',
    lock: 'Lock',
    unlock: 'Unlock',
    key: 'Key',
    vpn: 'Shield',
    wifi: 'Wifi',
    signal_cellular: 'Signal',
    battery: 'Battery',
    power: 'Power',
    volume: 'Volume2',
    brightness: 'Sun',
    contrast: 'Contrast',
    palette: 'Palette',
    color: 'Palette',
    brush: 'Paintbrush',
    draw: 'PenTool',
    text: 'Type',
    font: 'Type',
    format: 'AlignLeft',
    bold: 'Bold',
    italic: 'Italic',
    underline: 'Underline',
    list: 'List',
    numbered_list: 'ListOrdered',
    bullet_list: 'List',
    indent: 'Indent',
    outdent: 'Outdent',
    undo: 'Undo',
    redo: 'Redo',
    cut: 'Scissors',
    paste: 'Clipboard',
    select_all: 'MousePointer',
    zoom_in: 'ZoomIn',
    zoom_out: 'ZoomOut',
    fullscreen: 'Maximize',
    fullscreen_exit: 'Minimize',
    play: 'Play',
    pause: 'Pause',
    stop: 'Square',
    skip_next: 'SkipForward',
    skip_previous: 'SkipBack',
    fast_forward: 'FastForward',
    rewind: 'Rewind',
    shuffle: 'Shuffle',
    repeat: 'Repeat',
    volume_up: 'VolumeX',
    volume_down: 'VolumeX',
    volume_off: 'VolumeX',
    mic: 'Mic',
    mic_off: 'MicOff',
    headphones: 'Headphones',
    speaker: 'Speaker',
    radio: 'Radio',
    tv: 'Tv',
    computer: 'Monitor',
    laptop: 'Laptop',
    tablet: 'Tablet',
    smartphone: 'Smartphone',
    watch: 'Watch',
    keyboard: 'Keyboard',
    mouse: 'Mouse',
    gamepad: 'Gamepad2',
    controller: 'Gamepad2',
    joystick: 'Gamepad2',
    usb: 'Usb',
    bluetooth: 'Bluetooth',
    wifi_off: 'WifiOff',
    airplane: 'Plane',
    car: 'Car',
    bike: 'Bike',
    bus: 'Bus',
    train: 'Train',
    subway: 'Train',
    taxi: 'Car',
    truck: 'Truck',
    ship: 'Ship',
    boat: 'Ship',
    anchor: 'Anchor',
    flight: 'Plane',
    hotel: 'Building2',
    restaurant: 'UtensilsCrossed',
    cafe: 'Coffee',
    bar: 'Wine',
    shopping: 'ShoppingBag',
    store: 'Store',
    market: 'ShoppingCart',
    bank: 'Building2',
    hospital: 'Building2',
    school: 'GraduationCap',
    university: 'GraduationCap',
    library: 'BookOpen',
    book: 'Book',
    newspaper: 'Newspaper',
    magazine: 'BookOpen',
    article: 'FileText',
    document: 'FileText',
    pdf: 'FileText',
    word: 'FileText',
    excel: 'FileSpreadsheet',
    powerpoint: 'Presentation',
    zip: 'Archive',
    code: 'Code',
    terminal: 'Terminal',
    console: 'Terminal',
    bug: 'Bug',
    debug: 'Bug',
    api: 'Webhook',
    database: 'Database',
    server: 'Server',
    cloud: 'Cloud',
    storage: 'HardDrive',
    backup: 'Archive',
    restore: 'RotateCcw',
    update: 'RefreshCw',
    upgrade: 'TrendingUp',
    version: 'GitBranch',
    branch: 'GitBranch',
    merge: 'GitMerge',
    commit: 'GitCommit',
    pull: 'GitPullRequest',
    push: 'Upload',
    clone: 'Copy',
    fork: 'GitFork',
    star_outline: 'Star',
    github: 'Github',
    gitlab: 'GitBranch',
    bitbucket: 'GitBranch',
    git: 'Git',
    npm: 'Package',
    yarn: 'Package',
    docker: 'Box',
    kubernetes: 'Boxes',
    aws: 'Cloud',
    azure: 'Cloud',
    google: 'Chrome',
    firebase: 'Flame',
    react: 'Atom',
    vue: 'Triangle',
    angular: 'Triangle',
    nodejs: 'Hexagon',
    python: 'Code',
    javascript: 'Code',
    typescript: 'Code',
    html: 'Code',
    css: 'Palette',
    sass: 'Palette',
    less: 'Palette',
    tailwind: 'Palette',
    bootstrap: 'Grid3X3',
    jquery: 'Code',
    php: 'Code',
    java: 'Coffee',
    kotlin: 'Code',
    swift: 'Code',
    go: 'Code',
    rust: 'Code',
    cpp: 'Code',
    csharp: 'Code',
    ruby: 'Gem',
    rails: 'Gem',
    laravel: 'Code',
    symfony: 'Code',
    django: 'Code',
    flask: 'Code',
    express: 'Code',
    nestjs: 'Code',
    nextjs: 'Code',
    nuxtjs: 'Code',
    gatsby: 'Code',
    svelte: 'Code',
    wordpress: 'Code',
    drupal: 'Code',
    joomla: 'Code',
    magento: 'ShoppingCart',
    shopify: 'ShoppingBag',
    woocommerce: 'ShoppingCart',
    prestashop: 'ShoppingCart',
    opencart: 'ShoppingCart',
    stripe: 'CreditCard',
    paypal: 'CreditCard',
    visa: 'CreditCard',
    mastercard: 'CreditCard',
    amex: 'CreditCard',
    discover: 'CreditCard',
    apple_pay: 'CreditCard',
    google_pay: 'CreditCard',
    samsung_pay: 'CreditCard',
    facebook: 'Facebook',
    twitter: 'Twitter',
    instagram: 'Instagram',
    linkedin: 'Linkedin',
    youtube: 'Youtube',
    tiktok: 'Music',
    snapchat: 'Camera',
    pinterest: 'Image',
    reddit: 'MessageCircle',
    discord: 'MessageSquare',
    slack: 'MessageSquare',
    teams: 'Users',
    zoom: 'Video',
    skype: 'Video',
    whatsapp: 'MessageCircle',
    telegram: 'Send',
    signal: 'Shield',
    messenger: 'MessageCircle',
    viber: 'Phone',
    wechat: 'MessageCircle',
    line: 'MessageCircle',
    kakaotalk: 'MessageCircle',
    twitch: 'Tv',
    spotify: 'Music',
    soundcloud: 'Music',
    apple_music: 'Music',
    amazon_music: 'Music',
    pandora: 'Radio',
    netflix: 'Tv',
    hulu: 'Tv',
    disney_plus: 'Tv',
    amazon_prime: 'Tv',
    hbo: 'Tv',
    paramount_plus: 'Tv',
    peacock: 'Tv',
    crunchyroll: 'Tv',
    funimation: 'Tv',
    steam: 'Gamepad2',
    epic_games: 'Gamepad2',
    origin: 'Gamepad2',
    uplay: 'Gamepad2',
    battlenet: 'Gamepad2',
    playstation: 'Gamepad2',
    xbox: 'Gamepad2',
    nintendo: 'Gamepad2',
    switch: 'Gamepad2',
    '3ds': 'Gamepad2',
    vita: 'Gamepad2',
    psp: 'Gamepad2',
    gameboy: 'Gamepad2',
    android: 'Smartphone',
    ios: 'Smartphone',
    windows: 'Monitor',
    macos: 'Monitor',
    linux: 'Terminal',
    ubuntu: 'Terminal',
    centos: 'Terminal',
    debian: 'Terminal',
    fedora: 'Terminal',
    arch: 'Terminal',
    manjaro: 'Terminal',
    opensuse: 'Terminal',
    redhat: 'Terminal',
    chrome: 'Chrome',
    firefox: 'Firefox',
    safari: 'Globe',
    edge: 'Globe',
    opera: 'Globe',
    brave: 'Shield',
    tor: 'Shield',
    vivaldi: 'Globe',
    photoshop: 'Image',
    illustrator: 'PenTool',
    indesign: 'FileText',
    after_effects: 'Film',
    premiere: 'Film',
    lightroom: 'Camera',
    xd: 'PenTool',
    sketch: 'PenTool',
    figma: 'PenTool',
    framer: 'PenTool',
    invision: 'PenTool',
    zeplin: 'PenTool',
    canva: 'Image',
    gimp: 'Image',
    inkscape: 'PenTool',
    blender: 'Box',
    unity: 'Gamepad2',
    unreal: 'Gamepad2',
    godot: 'Gamepad2',
    construct: 'Gamepad2',
    gamemaker: 'Gamepad2',
    clickteam: 'Gamepad2',
    rpg_maker: 'Gamepad2',
    twine: 'BookOpen',
    renpy: 'BookOpen',
    visual_novel: 'BookOpen',
  }

  // First try direct lookup
  let IconComponent = getIconComponent(normalizedName)
  let mappedName: string | undefined

  // If not found, try legacy mappings
  if (!IconComponent) {
    mappedName = legacyMappings[normalizedName]
    if (mappedName) {
      IconComponent = getIconComponent(mappedName)
    }
  }

  // Final fallback
  if (!IconComponent) {
    IconComponent = LucideIcons.HelpCircle

    if (process.env.NODE_ENV === 'development') {
      console.warn(
        `[Icon] Could not find icon: "${name}" -> normalized: "${normalizedName}" -> mapped: "${
          mappedName || 'none'
        }"`
      )
    }
  }

  // Use React.createElement to avoid component creation during render issue
  return React.createElement(IconComponent, { size, className, color, style, ...props })
}

/**
 * Normalizes icon names from various sources
 */
function normalizeIconName(name: string): string {
  if (!name) return 'help-circle'

  let normalized = name.toLowerCase().trim()

  // Remove common prefixes
  normalized = normalized.replace(/^(lucide-|material-|icon-|fa-|feather-)/, '')

  return normalized
}

export default Icon
