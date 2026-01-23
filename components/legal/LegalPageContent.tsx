"use client";

import { useState, useEffect, useCallback, ReactNode } from "react";
import { Navbar, Footer } from "@/components/layout";
import { getLegalPage, useRefetchOnFocus, LegalPageType, LegalPageData, ApiError } from "@/lib/api";

interface LegalPageContentProps {
  pageType: LegalPageType;
  fallbackTitle: string;
  fallbackSubtitle: string;
  fallbackLastUpdated: string;
  fallbackContent: ReactNode;
}

export function LegalPageContent({
  pageType,
  fallbackTitle,
  fallbackSubtitle,
  fallbackLastUpdated,
  fallbackContent,
}: LegalPageContentProps) {
  const [data, setData] = useState<LegalPageData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const result = await getLegalPage(pageType);
      setData(result);
    } catch (error) {
      // Only log if it's not a 404 (expected when backend endpoint doesn't exist yet)
      if (error instanceof ApiError && error.status === 404) {
        // Silent fallback - endpoint not implemented yet
      } else {
        console.error(`Failed to fetch ${pageType} page:`, error);
      }
      // Keep data as null to use fallback
    } finally {
      setLoading(false);
    }
  }, [pageType]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Auto-refetch on window focus
  useRefetchOnFocus(fetchData);

  // Determine what to display
  const title = data?.title ?? fallbackTitle;
  const lastUpdated = data?.lastUpdated ?? fallbackLastUpdated;
  const useApiContent = data?.content != null;

  return (
    <>
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 py-32">
        <div className="bg-white dark:bg-slate-800 shadow rounded-2xl p-8 space-y-6 dark:shadow-none">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-wide text-primary font-bold mb-1">
                {title}
              </p>
              <h1 className="text-3xl font-black text-slate-900 dark:text-white">
                {fallbackSubtitle}
              </h1>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Last updated: {lastUpdated}
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : useApiContent ? (
            <div 
              className="legal-content prose prose-slate dark:prose-invert max-w-none
                prose-headings:text-slate-900 dark:prose-headings:text-white
                prose-p:text-slate-600 dark:prose-p:text-slate-300
                prose-li:text-slate-600 dark:prose-li:text-slate-300
                prose-a:text-primary prose-a:font-semibold"
              dangerouslySetInnerHTML={{ __html: data!.content }}
            />
          ) : (
            fallbackContent
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
