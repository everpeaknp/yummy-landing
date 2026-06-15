import { Metadata } from "next";
import { HelpClient } from "@/components/sections/HelpClient";

import { getPageSEO } from "@/lib/api/pages";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const seo = await getPageSEO("help");
    return {
      title: seo.metaTitle || "Help Center | Yummy POS",
      description: seo.metaDescription || "How can we help you today? Search the Yummy POS knowledge base.",
      keywords: seo.metaKeywords,
      openGraph: {
        title: seo.ogTitle || seo.metaTitle || "Help Center | Yummy POS",
        description: seo.ogDescription || seo.metaDescription || "How can we help you today? Search the Yummy POS knowledge base.",
        type: (seo.ogType as any) || "website",
        url: seo.canonicalUrl || "https://yummyever.com/help",
        images: seo.ogImage ? [{ url: seo.ogImage }] : [],
      },
      twitter: {
        card: (seo.twitterCardType as any) || "summary_large_image",
      },
    };
  } catch (error) {
    return {
      title: "Help Center | Yummy POS",
      description:
        "How can we help you today? Search the Yummy POS knowledge base, find answers to common questions, and get support.",
      openGraph: {
        title: "Help Center | Yummy POS",
        description:
          "How can we help you today? Search the Yummy POS knowledge base, find answers to common questions, and get support.",
        type: "website",
        url: "https://yummyever.com/help",
      },
    };
  }
}

export default async function HelpCenterPage() {
  let seo = null;
  try {
    seo = await getPageSEO("help");
  } catch (error) {}

  return (
    <>
      {seo?.jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(seo.jsonLd) }}
        />
      )}
      <HelpClient />
    </>
  );
}
