import { Metadata } from "next";
import { FaqClient } from "@/components/sections/FaqClient";

import { getPageSEO } from "@/lib/api/pages";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const seo = await getPageSEO("faq");
    return {
      title: seo.metaTitle || "Frequently Asked Questions | Yummy POS",
      description: seo.metaDescription || "Everything you need to know about Yummy POS.",
      keywords: seo.metaKeywords,
      openGraph: {
        title: seo.ogTitle || seo.metaTitle || "Frequently Asked Questions | Yummy POS",
        description: seo.ogDescription || seo.metaDescription || "Everything you need to know about Yummy POS.",
        type: (seo.ogType as any) || "website",
        url: seo.canonicalUrl || "https://yummyever.com/faq",
        images: seo.ogImage ? [{ url: seo.ogImage }] : [],
      },
      twitter: {
        card: (seo.twitterCardType as any) || "summary_large_image",
      },
    };
  } catch (error) {
    return {
      title: "Frequently Asked Questions | Yummy POS",
      description:
        "Everything you need to know about Yummy POS. Find answers to common questions about pricing, features, setup, and more.",
      openGraph: {
        title: "Frequently Asked Questions | Yummy POS",
        description:
          "Everything you need to know about Yummy POS. Find answers to common questions about pricing, features, setup, and more.",
        type: "website",
        url: "https://yummyever.com/faq",
      },
    };
  }
}

export default async function FAQPage() {
  let seo = null;
  try {
    seo = await getPageSEO("faq");
  } catch (error) {}

  return (
    <>
      {seo?.jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(seo.jsonLd) }}
        />
      )}
      <FaqClient />
    </>
  );
}
