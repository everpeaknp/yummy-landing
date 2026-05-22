/**
 * API Module Index
 * Central export for all API functions and types
 */

// Client
export { apiClient, get, post, ApiError, API_BASE_URL } from './client';

// Types
export * from './types';

// Page Data
export {
  getTeamPage,
  getContactPage,
  getPricingPage,
  getFaqPage,
  getCareersPage,
  getHelpPage,
  getBlogPosts,
  getBlogPost,
  getHeroSection,
  getProcessSection,
  getTestimonialsSection,
  getFeaturesSection,

  getGallerySection,
  getCustomersSection,
  getHomePage,
  getFeaturesList,
  getFeatureDetail,
  getLegalPages,
  getLegalPage,
} from './pages';

export {
  getNavbar,
  getFooter,
  getLayoutData,
} from './navigation';

// Hooks for client components
export {
  useHeroData,
  useProcessData,
  useFeaturesData,
  useTestimonialsData,
  useGalleryData,
  useRefetchOnFocus,
} from './hooks';
