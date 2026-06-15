import { Metadata } from "next";
import { TeamClient } from "@/components/sections/TeamClient";

import { getPageSEO } from "@/lib/api/pages";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const seo = await getPageSEO("team");
    return {
      title: seo.metaTitle || "Meet the Team | Yummy POS",
      description: seo.metaDescription || "Yummy Ever is the flagship product of Everacy.",
      keywords: seo.metaKeywords,
      openGraph: {
        title: seo.ogTitle || seo.metaTitle || "Meet the Team | Yummy POS",
        description: seo.ogDescription || seo.metaDescription || "Yummy Ever is the flagship product of Everacy.",
        type: (seo.ogType as any) || "website",
        url: seo.canonicalUrl || "https://yummyever.com/team",
        images: seo.ogImage ? [{ url: seo.ogImage }] : [],
      },
      twitter: {
        card: (seo.twitterCardType as any) || "summary_large_image",
      },
    };
  } catch (error) {
    return {
      title: "Meet the Team | Yummy POS",
      description:
        "Yummy Ever is the flagship product of Everacy. We are a passionate group of foodies, engineers, and designers on a mission to revolutionize the restaurant industry in Nepal.",
      openGraph: {
        title: "Meet the Team | Yummy POS",
        description:
          "Yummy Ever is the flagship product of Everacy. We are a passionate group of foodies, engineers, and designers on a mission to revolutionize the restaurant industry in Nepal.",
        type: "website",
        url: "https://yummyever.com/team",
      },
    };
  }
}

export default async function TeamPage() {
  let seo = null;
  try {
    seo = await getPageSEO("team");
  } catch (error) {}

  return (
    <>
      {seo?.jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(seo.jsonLd) }}
        />
      )}
      <TeamClient />
    </>
  );
}
