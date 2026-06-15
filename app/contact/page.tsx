import { Metadata } from "next";
import { ContactClient } from "@/components/sections/ContactClient";

import { getPageSEO } from "@/lib/api/pages";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const seo = await getPageSEO("contact");
    return {
      title: seo.metaTitle || "Contact Us | Yummy POS",
      description: seo.metaDescription || "Get in touch with the Yummy POS team.",
      keywords: seo.metaKeywords,
      openGraph: {
        title: seo.ogTitle || seo.metaTitle || "Contact Us | Yummy POS",
        description: seo.ogDescription || seo.metaDescription || "Get in touch with the Yummy POS team.",
        type: (seo.ogType as any) || "website",
        url: seo.canonicalUrl || "https://yummyever.com/contact",
        images: seo.ogImage ? [{ url: seo.ogImage }] : [],
      },
      twitter: {
        card: (seo.twitterCardType as any) || "summary_large_image",
      },
    };
  } catch (error) {
    return {
      title: "Contact Us | Yummy POS",
      description:
        "Get in touch with the Yummy POS team. Have questions about pricing, features, or need a custom demo? We'd love to hear from you.",
      openGraph: {
        title: "Contact Us | Yummy POS",
        description:
          "Get in touch with the Yummy POS team. Have questions about pricing, features, or need a custom demo? We'd love to hear from you.",
        type: "website",
        url: "https://yummyever.com/contact",
      },
    };
  }
}

export default async function ContactPage() {
  let seo = null;
  try {
    seo = await getPageSEO("contact");
  } catch (error) {}

  return (
    <>
      {seo?.jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(seo.jsonLd) }}
        />
      )}
      <ContactClient />
    </>
  );
}
