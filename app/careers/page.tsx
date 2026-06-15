import { Metadata } from "next";
import { CareersClient } from "@/components/sections/CareersClient";

import { getPageSEO } from "@/lib/api/pages";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const seo = await getPageSEO("careers");
    return {
      title: seo.metaTitle || "Careers | Join Yummy POS",
      description: seo.metaDescription || "Join the revolution. Help us build the operating system for modern restaurants in Nepal.",
      keywords: seo.metaKeywords,
      openGraph: {
        title: seo.ogTitle || seo.metaTitle || "Careers | Join Yummy POS",
        description: seo.ogDescription || seo.metaDescription || "Join the revolution. Help us build the operating system for modern restaurants in Nepal.",
        type: (seo.ogType as any) || "website",
        url: seo.canonicalUrl || "https://yummyever.com/careers",
        images: seo.ogImage ? [{ url: seo.ogImage }] : [],
      },
      twitter: {
        card: (seo.twitterCardType as any) || "summary_large_image",
      },
    };
  } catch (error) {
    return {
      title: "Careers | Join Yummy POS",
      description:
        "Join the revolution. Help us build the operating system for modern restaurants in Nepal. Explore open roles in engineering, design, and more.",
      openGraph: {
        title: "Careers | Join Yummy POS",
        description:
          "Join the revolution. Help us build the operating system for modern restaurants in Nepal. Explore open roles in engineering, design, and more.",
        type: "website",
        url: "https://yummyever.com/careers",
      },
    };
  }
}

export default async function CareersPage() {
  let seo = null;
  try {
    seo = await getPageSEO("careers");
  } catch (error) {}

  return (
    <>
      {seo?.jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(seo.jsonLd) }}
        />
      )}
      <CareersClient />
    </>
  );
}
