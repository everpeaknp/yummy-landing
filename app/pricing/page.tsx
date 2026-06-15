import { Metadata } from "next";
import { PricingClient } from "@/components/sections/PricingClient";

import { getPageSEO } from "@/lib/api/pages";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const seo = await getPageSEO("pricing");
    return {
      title: seo.metaTitle || "Simple, Transparent Pricing | Yummy POS",
      description: seo.metaDescription || "Choose the plan that fits your restaurant. No hidden fees, cancel anytime.",
      keywords: seo.metaKeywords,
      openGraph: {
        title: seo.ogTitle || seo.metaTitle || "Simple, Transparent Pricing | Yummy POS",
        description: seo.ogDescription || seo.metaDescription || "Choose the plan that fits your restaurant. No hidden fees, cancel anytime.",
        type: (seo.ogType as any) || "website",
        url: seo.canonicalUrl || "https://yummyever.com/pricing",
        images: seo.ogImage ? [{ url: seo.ogImage }] : [],
      },
      twitter: {
        card: (seo.twitterCardType as any) || "summary_large_image",
      },
    };
  } catch (error) {
    return {
      title: "Simple, Transparent Pricing | Yummy POS",
      description:
        "Choose the plan that fits your restaurant. No hidden fees, cancel anytime. Free installation valid until February!",
      openGraph: {
        title: "Simple, Transparent Pricing | Yummy POS",
        description:
          "Choose the plan that fits your restaurant. No hidden fees, cancel anytime. Free installation valid until February!",
        type: "website",
        url: "https://yummyever.com/pricing",
      },
    };
  }
}

export default async function PricingPage() {
  let seo = null;
  try {
    seo = await getPageSEO("pricing");
  } catch (error) {}

  return (
    <>
      {seo?.jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(seo.jsonLd) }}
        />
      )}
      <PricingClient />
    </>
  );
}
