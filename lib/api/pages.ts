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
  return get<ContactPageData>('/pages/contact/')
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
  return get<FaqPageData>('/pages/faq/')
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
  return get<HelpPageData>('/pages/help/')
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

// ============================================
// Combined Home Page
// ============================================
export interface HomePageData {
  hero: HeroData
  process: ProcessData
  testimonials: TestimonialsData
  features: FeaturesData
  gallery: GalleryData
}

export async function getHomePage(): Promise<HomePageData> {
  const [hero, process, testimonials, features, gallery] = await Promise.all([
    getHeroSection(),
    getProcessSection(),
    getTestimonialsSection(),
    getFeaturesSection(),
    getGallerySection(),
  ])

  return { hero, process, testimonials, features, gallery }
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
  FeaturePageData,
  LegalPageListItem,
  LegalPageData,
  LegalPageType,
} from './types'
