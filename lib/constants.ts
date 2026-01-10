/**
 * Site configuration and constants
 */
export const siteConfig = {
  name: "Yummy POS",
  description:
    "Yummy is the best restaurant management software in Nepal. IRD approved billing, KOT, and Inventory management.",
  url: "https://yummypos.com",
  ogImage: "/images/og-image.png",
  links: {
    app: "https://app.yummyever.com/",
  },
} as const;

/**
 * Navigation links for the navbar
 */
export const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#process", label: "How it Works" },
  { href: "#pricing", label: "Pricing" },
] as const;

/**
 * Colors used throughout the application
 */
export const colors = {
  primary: "#ff6929",
  dark: "#0a0a0a",
  light: "#ffffff",
} as const;
