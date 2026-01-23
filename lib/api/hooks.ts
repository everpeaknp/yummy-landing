/**
 * API Hooks for frontend components
 * These hooks fetch data from the API with fallbacks to existing hardcoded data
 */

import { useEffect, useState } from 'react';
import { 
  getHeroSection, 
  getProcessSection, 
  getFeaturesSection, 
  getTestimonialsSection,
  getGallerySection,
  type HeroData,
  type ProcessData,
  type TestimonialsData,
  type FeaturesData,
  type GalleryData,
} from './index';

// Generic hook factory
function useApiData<T>(
  fetcher: () => Promise<T>,
  fallback: T
): { data: T; loading: boolean; error: Error | null } {
  const [data, setData] = useState<T>(fallback);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;
    
    async function fetchData() {
      try {
        const result = await fetcher();
        if (mounted) {
          setData(result);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err : new Error('Unknown error'));
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }
    
    fetchData();

    // Auto-refetch on window focus
    const onFocus = () => {
      fetchData();
    };

    window.addEventListener('focus', onFocus);
    
    return () => {
      mounted = false;
      window.removeEventListener('focus', onFocus);
    };
  }, []);

  return { data, loading, error };
}

// Helper hook for components not using useApiData
export function useRefetchOnFocus(refetch: () => void) {
  useEffect(() => {
    const onFocus = () => {
      refetch();
    };

    window.addEventListener('focus', onFocus);

    return () => {
      window.removeEventListener('focus', onFocus);
    };
  }, [refetch]);
}

// Hero hook
export function useHeroData(fallback: Partial<HeroData>) {
  return useApiData<Partial<HeroData>>(
    () => getHeroSection().catch(() => fallback),
    fallback
  );
}

// Process hook
export function useProcessData(fallback: Partial<ProcessData>) {
  return useApiData<Partial<ProcessData>>(
    () => getProcessSection().catch(() => fallback),
    fallback
  );
}

// Features hook
export function useFeaturesData(fallback: Partial<FeaturesData>) {
  return useApiData<Partial<FeaturesData>>(
    () => getFeaturesSection().catch(() => fallback),
    fallback
  );
}

// Testimonials hook
export function useTestimonialsData(fallback: Partial<TestimonialsData>) {
  return useApiData<Partial<TestimonialsData>>(
    () => getTestimonialsSection().catch(() => fallback),
    fallback
  );
}

// Gallery hook
export function useGalleryData(fallback: Partial<GalleryData>) {
  return useApiData<Partial<GalleryData>>(
    () => getGallerySection().catch(() => fallback),
    fallback
  );
}
