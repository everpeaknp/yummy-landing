/**
 * API Type Definitions
 * TypeScript interfaces matching new_api.md spec
 */

// ============================================
// Common Types
// ============================================

export interface ColorPair {
  light: string
  dark: string
}

export interface IconColors {
  light: { background: string; icon: string }
  dark: { background: string; icon: string }
}

// ============================================
// Team Page Types
// ============================================

export interface TeamValue {
  icon: string
  iconColor: string
  title: string
  description: string
  order: number
}

export interface TeamMember {
  name: string
  role: string
  photoUrl: string
  bio: string
  order: number
}

export interface TeamJoinSection {
  title: string
  description: string
  ctaText: string
  ctaHref: string
}

export interface TeamPageData {
  title: string
  subtitle: string
  companyHighlight: string
  companyDescription: string
  companyLogo?: string
  headerIcon?: string
  values: TeamValue[]
  members: TeamMember[]
  joinSection: TeamJoinSection
  valueCardColors?: Record<string, unknown>
}

// ============================================
// Contact Page Types
// ============================================

export interface ContactItem {
  icon: string
  title: string
  content?: string
  emails?: string[]
  phone?: string
  hours?: string
  iconColors: IconColors
}

export interface ContactPageData {
  title: string
  subtitle: string
  formTitle: string
  submitButtonText: string
  mapEmbedUrl: string
  contactItems: ContactItem[]
  formCategories: string[]
  formColors?: Record<string, unknown>
}

// ============================================
// Pricing Page Types
// ============================================

export interface PricingFeature {
  text: string
  order: number
}

export interface PricingPlan {
  name: string
  priceMonthly: string
  priceYearly: string
  description: string
  features: PricingFeature[]
  ctaText: string
  ctaHref: string
  isPopular: boolean
  popularLabel: string | null
  order: number
}

export interface PricingFaq {
  question: string
  answer: string
  order: number
}

export interface PricingPageData {
  title: string
  subtitle: string
  toggle: {
    monthlyLabel: string
    yearlyLabel: string
    savingsLabel: string
  }
  annualSavingsLabel: string
  savingsPercentage: number
  promotionBanner: {
    icon: string
    text: string
    highlightText: string
  }
  plans: PricingPlan[]
  faqs: PricingFaq[]
  cardColors?: Record<string, unknown>
  faqColors?: Record<string, unknown>
}

// ============================================
// FAQ Page Types
// ============================================

export interface FaqQuestion {
  question: string
  answer: string
  order: number
}

export interface FaqCategory {
  title: string
  order: number
  questions: FaqQuestion[]
}

export interface FaqPageData {
  title: string
  subtitle: string
  contactPrompt: {
    text: string
    linkText: string
    linkHref: string
  }
  categories: FaqCategory[]
  accordionColors?: Record<string, unknown>
}

// ============================================
// Careers Page Types
// ============================================

export interface JobPosition {
  title: string
  department: string
  type: string
  location: string
  description: string
  isActive: boolean
  order: number
}

export interface CareersPageData {
  badge: string
  title: string
  subtitle: string
  searchPlaceholder: string
  applicationEmail: string
  emptyState: {
    title: string
    message: string
  }
  categories: string[]
  jobs: JobPosition[]
  categoryButtonColors?: Record<string, unknown>
  jobCardColors?: Record<string, unknown>
}

// ============================================
// Help Page Types
// ============================================

export interface HelpLink {
  label: string
  href: string
  order: number
}

export interface HelpLinkColumn {
  order: number
  links: HelpLink[]
}

export interface HelpPageData {
  title: string
  subtitle: string
  searchPlaceholder: string
  linkColumns: HelpLinkColumn[]
  noResultsText: string
  searchColors?: Record<string, unknown>
  linkColors?: Record<string, unknown>
}

// ============================================
// Blog Types
// ============================================

export interface BlogAuthor {
  name: string
  photoUrl: string
  bio: string
}

export interface BlogCategory {
  name: string
  slug: string
}

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  imageUrl: string
  date: string
  author?: BlogAuthor
  category?: BlogCategory
  metaTitle?: string
  metaDescription?: string
  keywords?: string
  order: number
  // Per-post card styling (depends on cover image)
  cardTextColor?: string
  cardTextColorDark?: string
  cardOverlayOpacity?: number
}

export interface BlogPostDetail extends BlogPost {
  content: string
  postPageColors?: Record<string, unknown>
}

export interface BlogPageColors {
  light: {
    titleColor: string
    subtitleColor: string
  }
  dark: {
    titleColor: string
    subtitleColor: string
  }
}

export interface BlogListData {
  title: string
  subtitle: string
  posts: BlogPost[]
  categories?: BlogCategory[]
  pageColors?: BlogPageColors
  cardColors?: Record<string, unknown>
}

// ============================================
// Navigation Types
// ============================================

export interface NavMegaMenuItem {
  name: string
  href: string
  icon: string
  description: string
  order: number
}

export interface NavItem {
  title: string
  href: string
  hasMegaMenu: boolean
  megaMenuType?: string
  order: number
  megaMenuItems?: NavMegaMenuItem[]
}

export interface NavButton {
  text: string
  href: string
  variant: string
  isExternal: boolean
}

export interface NavbarData {
  logo?: {
    lightModeSrc: string
    darkModeSrc: string
    text: string
    href: string
  }
  items: NavItem[]
  buttons?: NavButton[]
  colors?: Record<string, unknown>
  megaMenuColors?: Record<string, unknown>
  themeToggle: {
    visible: boolean
    lightModeIcon: string
    darkModeIcon: string
  }
  loginButton: {
    text: string
    href: string
    visible?: boolean
    lightBackground: string
    lightText: string
    darkBackground: string
    darkText: string
  }
}

export interface FooterColumn {
  title: string
  order: number
  links: { label: string; href: string; order: number }[]
}

export interface FooterData {
  brand: {
    logoLight: string
    logoDark: string
    name: string
    tagline: string
  }
  columns: FooterColumn[]
  contact: {
    title: string
    address: string
    email: string
    phone: string
  }
  socialLinks: { platform: string; url: string; icon: string; order?: number }[]
  copyright: {
    text: string
    poweredBy: { text: string; href: string; logoUrl?: string }
  }
  legalLinks: { label: string; href: string; order?: number }[]
  colors?: Record<string, unknown>
}

// ============================================
// Home Page Types
// ============================================

export interface HeroData {
  badge: { icon: string; text: string; emoji: string }
  headline: { line1: string; line2: string; highlightWord: string; highlightColor: string }
  subheadline: string
  buttons: {
    text: string
    href: string
    type: string
    icon: string | null
    successText: string
    order: number
  }[]
  badgeColors?: Record<string, unknown>
}

export interface AboutData {
  title: {
    prefix: string
    highlight: string
    suffix: string
  }
  description: string
  videoUrl: string
  thumbnailUrl?: string
  videoCardShadow?: {
    light: string
    dark: string
  }
}

export interface ProcessStep {
  number: string
  icon: string
  iconColor: string
  title: string
  description: string
  isHighlighted: boolean
  order: number
}

export interface ProcessData {
  badgeText: string
  title: string
  subtitle: string
  steps: ProcessStep[]
  badgeColors?: Record<string, unknown>
  normalCardColors?: Record<string, unknown>
  highlightedCardColors?: Record<string, unknown>
}

export interface TestimonialCard {
  imageUrl: string
  quote: string
  author: string
  order: number
}

export interface TestimonialsData {
  title: string
  subtitle: string
  cards: TestimonialCard[]
  cardColors?: Record<string, unknown>
}

export interface FeatureCard {
  id: string
  title: string
  description: string
  icon: string
  iconColor: string
  gridSpan: string
  mockData?: Record<string, unknown>
  order: number
  iconColors?: IconColors
}

export interface FeaturesData {
  badge: { icon: string; text: string }
  title: string
  subtitle: string
  cards: FeatureCard[]
  cardColors?: Record<string, unknown>
}

export interface GalleryFeature {
  id: string
  title: string
  description: string
  icon: string
  imageUrl: string
  bulletPoints: string[]
  order: number
}

export interface GalleryData {
  title: string
  subtitle: string
  features: GalleryFeature[]
  accordionColors?: Record<string, unknown>
  stepIndicatorColors?: Record<string, unknown>
}

export interface FeatureSectionCta {
  visible: boolean
  text?: string
  href?: string
}

export interface FeatureSectionContent {
  title: string
  description: string
  features: string[]
  cta: boolean | FeatureSectionCta
}

export interface FeatureSectionQuote {
  text: string
  author: string
}

export interface FeatureSection {
  subheading: string
  heading: string
  image: string | null
  content: FeatureSectionContent
  quote: FeatureSectionQuote | null
}

export interface FeaturePageData {
  slug: string
  title: string
  subtitle: string
  description: string
  keywords: string[]
  ogImage: string | null
  icon: string
  hero_image: string | null
  meta_title?: string
  meta_description?: string
  order: number
  sections: FeatureSection[]
}

// Legal Pages
export type LegalPageType = 'privacy-policy' | 'terms-and-conditions' | 'cookies'

export interface LegalPageListItem {
  type: LegalPageType
  title: string
  lastUpdated: string
}

export interface LegalPageData {
  type: LegalPageType
  title: string
  content: string // HTML content
  lastUpdated: string
  metaTitle?: string
  metaDescription?: string
}
