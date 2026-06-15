import { Navbar, Footer } from "@/components/layout";
import {
  Hero,
  Process,
  Features,
  SpeedGrid,
  ExpandableGallery,
  // ThreeSteps,
  Pricing,
  Testimonials,
  About,
} from "@/components/sections";

import { Metadata } from "next";
import { getPageSEO } from "@/lib/api/pages";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const seo = await getPageSEO("home");
    return {
      title: seo.metaTitle || "Yummy POS – Nepal's #1 Restaurant POS",
      description: seo.metaDescription || "Yummy is the best restaurant management software in Nepal.",
      keywords: seo.metaKeywords || "restaurant POS Nepal, IRD billing",
      openGraph: {
        title: seo.ogTitle || seo.metaTitle || "Yummy POS – Nepal's #1 Restaurant POS",
        description: seo.ogDescription || seo.metaDescription || "Yummy is the best restaurant management software in Nepal.",
        type: (seo.ogType as any) || "website",
        url: seo.canonicalUrl || "https://yummyever.com",
        images: seo.ogImage ? [{ url: seo.ogImage }] : [],
      },
      twitter: {
        card: (seo.twitterCardType as any) || "summary_large_image",
      },
    };
  } catch (error) {
    return {
      title: "Yummy POS – Nepal's #1 Restaurant POS",
      description:
        "Yummy is the best restaurant management software in Nepal. Streamline your operations with IRD approved billing, Seamless Kitchen Sync (KOT), and Smart Inventory management.",
      openGraph: {
        title: "Yummy POS – Nepal's #1 Restaurant POS",
        description:
          "Yummy is the best restaurant management software in Nepal. Streamline your operations with IRD approved billing, Seamless Kitchen Sync (KOT), and Smart Inventory management.",
        type: "website",
        url: "https://yummyever.com",
      },
    };
  }
}

export default async function Home() {
  let seo = null;
  try {
    seo = await getPageSEO("home");
  } catch (error) {}

  return (
    <>
      {seo?.jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(seo.jsonLd) }}
        />
      )}
      <Navbar />
      <main>
        <Hero />
        <About />
        <Process />
        {/* <Testimonials /> */}
        <Features />
        <SpeedGrid />
        <ExpandableGallery />
        {/* <ThreeSteps /> */}
        <Pricing />
      </main>
      <Footer />
    </>
  );
}
