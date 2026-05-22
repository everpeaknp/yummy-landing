/**
 * Page Data API Functions
 * Fetching functions for all page endpoints
 */

import { get } from './client'
import type {
  TeamPageData,
  ContactPageData,
  PricingPageData,
  FaqPageData,
  CareersPageData,
  HelpPageData,
  BlogListData,
  BlogPostDetail,
  HeroData,
  ProcessData,
  TestimonialsData,
  FeaturesData,
  GalleryData,
  CustomersSectionData,
  FeaturePageData,
  LegalPageData,
  LegalPageListItem,
  LegalPageType,
} from './types'

// ============================================
// Team Page
// ============================================
export async function getTeamPage(): Promise<TeamPageData> {
  return get<TeamPageData>('/pages/team/')
}

// ============================================
// Contact Page
// ============================================
export async function getContactPage(): Promise<ContactPageData> {
  interface ContactApiResponse {
    config?: Partial<ContactPageData>
    categories?: Array<{ name?: string } | string>
  }
  const response = await get<ContactApiResponse>('/pages/contact/')
  return {
    ...(response.config || {}),
    formCategories: (response.categories || []).map((c) => (typeof c === 'string' ? c : (c.name || ''))).filter(Boolean),
  } as ContactPageData
}

// ============================================
// Pricing Page
// ============================================
export async function getPricingPage(): Promise<PricingPageData> {
  return get<PricingPageData>('/pages/pricing/')
}

// ============================================
// FAQ Page
// ============================================
export async function getFaqPage(): Promise<FaqPageData> {
  interface FaqApiResponse {
    config?: Partial<FaqPageData>
    categories?: FaqPageData['categories']
  }
  const response = await get<FaqApiResponse>('/pages/faq/')
  return {
    ...(response.config || {}),
    categories: response.categories || [],
  } as FaqPageData
}

// ============================================
// Careers Page
// ============================================
interface CareersApiResponse {
  config: CareersPageData
  categories?: string[]
}

export async function getCareersPage(): Promise<CareersPageData> {
  const response = await get<CareersApiResponse>('/pages/careers/')
  // API returns {config: {...}, categories: [...]} - unwrap and merge
  return {
    ...response.config,
    categories: response.categories || response.config.categories,
  }
}

// ============================================
// Help Page
// ============================================
export async function getHelpPage(): Promise<HelpPageData> {
  interface HelpApiResponse {
    config?: Partial<HelpPageData>
    linkColumns?: HelpPageData['linkColumns']
  }
  const response = await get<HelpApiResponse>('/pages/help/')
  return {
    ...(response.config || {}),
    linkColumns: response.linkColumns || [],
  } as HelpPageData
}

// ============================================
// Blog
// ============================================
export async function getBlogPosts(): Promise<BlogListData> {
  return get<BlogListData>('/blog/')
}

export async function getBlogPost(slug: string): Promise<BlogPostDetail> {
  return get<BlogPostDetail>(`/blog/${slug}/`)
}

// ============================================
// Features Page
// ============================================
export async function getFeaturesList(): Promise<FeaturePageData[]> {
  return get<FeaturePageData[]>('/pages/features/')
}

export async function getFeatureDetail(slug: string): Promise<FeaturePageData> {
  return get<FeaturePageData>(`/pages/features/${slug}/`)
}

// ============================================
// Home Page Sections
// ============================================
export async function getHeroSection(): Promise<HeroData> {
  return get<HeroData>('/pages/home/hero/')
}

export async function getProcessSection(): Promise<ProcessData> {
  return get<ProcessData>('/pages/home/process/')
}

export async function getTestimonialsSection(): Promise<TestimonialsData> {
  return get<TestimonialsData>('/pages/home/testimonials/')
}

export async function getFeaturesSection(): Promise<FeaturesData> {
  return get<FeaturesData>('/pages/home/features/')
}

export async function getGallerySection(): Promise<GalleryData> {
  return get<GalleryData>('/pages/home/gallery/')
}

export async function getCustomersSection(): Promise<CustomersSectionData> {
  return get<CustomersSectionData>('/pages/home/customers/')
}

// ============================================
// Combined Home Page
// ============================================
export interface HomePageData {
  hero: HeroData
  process: ProcessData
  testimonials: TestimonialsData
  features: FeaturesData
  gallery: GalleryData
  customers: CustomersSectionData
}

export async function getHomePage(): Promise<HomePageData> {
  const [hero, process, testimonials, features, gallery, customers] = await Promise.all([
    getHeroSection(),
    getProcessSection(),
    getTestimonialsSection(),
    getFeaturesSection(),
    getGallerySection(),
    getCustomersSection(),
  ])

  return { hero, process, testimonials, features, gallery, customers }
}

// ============================================
// Legal Pages
// ============================================
export async function getLegalPages(): Promise<LegalPageListItem[]> {
  return get<LegalPageListItem[]>('/pages/legal/')
}

export async function getLegalPage(type: LegalPageType): Promise<LegalPageData> {
  return get<LegalPageData>(`/pages/legal/${type}/`)
}

// Re-export types for server components to import
export type {
  TeamPageData,
  ContactPageData,
  PricingPageData,
  FaqPageData,
  FaqCategory,
  CareersPageData,
  JobPosition,
  HelpPageData,
  BlogListData,
  BlogPostDetail,
  HeroData,
  ProcessData,
  TestimonialsData,
  FeaturesData,
  GalleryData,
  CustomersSectionData,
  FeaturePageData,
  LegalPageListItem,
  LegalPageData,
  LegalPageType,
} from './types'
