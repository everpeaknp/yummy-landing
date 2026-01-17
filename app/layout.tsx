import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";

// Font configuration
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

// SEO Metadata
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://yummyever.com"
  ),
  title: {
    default: "Yummy POS – Nepal's #1 Restaurant POS",
    template: "%s | Yummy POS",
  },
  applicationName: "Yummy POS",
  description:
    "Yummy is the best restaurant management software in Nepal. IRD approved billing, KOT, and Inventory management.",
  keywords: [
    "restaurant POS",
    "Nepal",
    "IRD billing",
    "KOT",
    "inventory management",
    "restaurant software",
    "restaurant billing software",
    "best POS Nepal",
    "restaurant management system",
  ],
  authors: [{ name: "Everacy" }],
  icons: {
    icon: "/images/yummy_logo.png",
    apple: "/images/yummy_logo.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: {
      default: "Yummy POS – Nepal's #1 Restaurant POS",
      template: "%s | Yummy POS",
    },
    description:
      "The best restaurant management software in Nepal. IRD approved billing, KOT, and Inventory management.",
    type: "website",
    locale: "en_US",
    siteName: "Yummy POS",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Yummy POS Banner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: {
      default: "Yummy POS – Nepal's #1 Restaurant POS",
      template: "%s | Yummy POS",
    },
    description:
      "The best restaurant management software in Nepal. IRD approved billing, KOT, and Inventory management.",
    images: ["/images/og-image.png"],
  },
  alternates: {
    canonical: "/",
  },
};

// Inline script to prevent FOUC and set theme
const themeScript = `
  (function() {
    try {
      var theme = localStorage.getItem('theme');
      if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (e) {}
  })();
`;

// Tailwind config script (same as original HTML)
const tailwindConfigScript = `
  tailwind.config = {
    darkMode: "class",
    theme: {
      extend: {
        colors: {
          primary: "#ff6929",
          dark: "#0a0a0a",
          light: "#ffffff",
        },
        fontFamily: {
          display: ["Outfit", "sans-serif"],
          body: ["Inter", "sans-serif"],
        },
      },
    },
  };
`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Yummy POS",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web, Android, iOS",
  description:
    "Yummy is the best restaurant management software in Nepal. IRD approved billing, KOT, and Inventory management.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "NPR",
  },
  author: {
    "@type": "Organization",
    name: "Everacy",
    url: "https://everacy.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Tailwind CSS CDN - Guaranteed to work like original HTML */}
        <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries" />
        <script dangerouslySetInnerHTML={{ __html: tailwindConfigScript }} />

        {/* Theme script */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Material Symbols for icons */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
          rel="stylesheet"
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${outfit.variable} bg-slate-50 dark:bg-dark text-slate-900 dark:text-slate-100 font-body antialiased transition-colors duration-300`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
