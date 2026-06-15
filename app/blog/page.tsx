import { Metadata } from "next";
import { BlogClient } from "@/components/sections/BlogClient";

import { getPageSEO } from "@/lib/api/pages";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const seo = await getPageSEO("blog");
    return {
      title: seo.metaTitle || "Blog | Yummy POS",
      description: seo.metaDescription || "Read the latest news, tips, and trends in the restaurant industry.",
      keywords: seo.metaKeywords,
      openGraph: {
        title: seo.ogTitle || seo.metaTitle || "Blog | Yummy POS",
        description: seo.ogDescription || seo.metaDescription || "Read the latest news, tips, and trends in the restaurant industry.",
        type: (seo.ogType as any) || "website",
        url: seo.canonicalUrl || "https://yummyever.com/blog",
        images: seo.ogImage ? [{ url: seo.ogImage }] : [],
      },
      twitter: {
        card: (seo.twitterCardType as any) || "summary_large_image",
      },
    };
  } catch (error) {
    return {
      title: "Blog | Yummy POS",
      description:
        "Read the latest news, tips, and trends in the restaurant industry. Learn how to optimize your operations with Yummy POS.",
      openGraph: {
        title: "Blog | Yummy POS",
        description:
          "Read the latest news, tips, and trends in the restaurant industry. Learn how to optimize your operations with Yummy POS.",
        type: "website",
        url: "https://yummyever.com/blog",
      },
    };
  }
}

export default async function BlogIndexPage() {
  let seo = null;
  try {
    seo = await getPageSEO("blog");
  } catch (error) {}

  return (
    <>
      {seo?.jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(seo.jsonLd) }}
        />
      )}
      <BlogClient />
    </>
  );
}
