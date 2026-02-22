"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import { useTheme } from "@/hooks/useTheme";
import { getFooter, type FooterData, useRefetchOnFocus } from "@/lib/api";

const fallbackData: Partial<FooterData> = {
  brand: {
    logoLight: "/images/yummy_logo_orange.png",
    logoDark: "/images/yummy_logo.png",
    name: "Yummy Ever",
    tagline: "Building innovative restaurant solutions for the modern world."
  },
  socialLinks: [
    { platform: "Facebook", url: "#", icon: "facebook" },
    { platform: "Twitter", url: "#", icon: "twitter" },
    { platform: "Instagram", url: "#", icon: "instagram" },
  ],
  columns: [
    {
      title: "Quick Links",
      order: 1,
      links: [
        { label: "Home", href: "/", order: 1 },
        { label: "Features", href: "/features", order: 2 },
        { label: "Pricing", href: "/pricing", order: 3 },
        { label: "Blog", href: "/blog", order: 4 },
        { label: "FAQ", href: "/faq", order: 5 },
        { label: "Help Center", href: "/help", order: 6 },
      ]
    },
    {
      title: "Product",
      order: 2,
      links: [
        { label: "Smart Inventory", href: "/features/smart-inventory", order: 1 },
        { label: "IRD Billing", href: "/features/ird-billing", order: 2 },
        { label: "Digital QR Menu", href: "/features/qr-menu", order: 3 },
        { label: "Analytics", href: "/features/reports", order: 4 },
        { label: "Cloud POS", href: "#", order: 5 },
      ]
    }
  ],
  contact: {
    title: "Contact Us",
    address: "Chhorepatan, Pokhara",
    email: "yummyever.np@gmail.com",
    phone: "+977 9807134097"
  },
  copyright: {
    text: "© 2024 Yummy Ever. All rights reserved.",
    poweredBy: { text: "By Everacy", href: "https://everacy.com" }
  },
  legalLinks: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms-and-conditions" },
    { label: "Cookies", href: "/cookies" },
  ]
};

// Social Icons Map
const SocialIcon = ({ name }: { name: string }) => {
  if (name === "Facebook") return <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>;
  if (name === "Twitter") return <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>;
  if (name === "Instagram") return <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.416 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>;
  return null;
}

export function Footer() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [data, setData] = useState<Partial<FooterData>>(fallbackData);

  const fetchData = useCallback(async () => {
    try {
      const apiData = await getFooter();
      setData(apiData);
    } catch (error) {
      console.error("Failed to fetch footer data:", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useRefetchOnFocus(fetchData);

  const brand = data.brand || fallbackData.brand!;
  const columns = data.columns || fallbackData.columns!;
  const contact = data.contact || fallbackData.contact!;
  const copyright = data.copyright || fallbackData.copyright!;
  const legalLinks = data.legalLinks || fallbackData.legalLinks!;
  const socialLinks = data.socialLinks || fallbackData.socialLinks!;

  return (

      <footer 
        className="pt-16 pb-12 transition-colors duration-300 border-t bg-white dark:bg-[#0a0a0a] text-slate-600 dark:text-[#d4d4d4] border-slate-200 dark:border-[#171717]"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Image
                  src={isDark ? brand.logoDark : brand.logoLight}
                  alt={brand.name}
                  width={40}
                  height={40}
                  className="h-10 w-auto"
                />
                <span className="text-xl font-bold text-slate-900 dark:text-white transition-colors duration-300">{brand.name}</span>
              </div>
              <p className="leading-relaxed">{brand.tagline}</p>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a key={social.platform} href={social.url} className="hover:text-[#ff6929] transition-colors">
                    <span className="sr-only">{social.platform}</span>
                    <SocialIcon name={social.platform} />
                  </a>
                ))}
              </div>
            </div>

            {/* Link Columns */}
            {columns.map((col, idx) => (
              <div key={idx} className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white transition-colors duration-300">{col.title}</h3>
                <ul className="space-y-2">
                  {col.links.map((link, i) => (
                    <li key={i}>
                      <Link href={link.href} className="hover:text-[#ff6929] transition-colors">{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Contact */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white transition-colors duration-300">{contact.title}</h3>
              <address className="not-italic">
                <p>{contact.address}</p>
                <p className="mt-2">Email: <a href={`mailto:${contact.email}`} className="hover:text-[#ff6929] transition-colors">{contact.email}</a></p>
                <p>Phone: <a href={`tel:${contact.phone}`} className="hover:text-[#ff6929] transition-colors">{contact.phone}</a></p>
              </address>
            </div>
          </div>

          <div 
            className="pt-6 flex flex-col md:flex-row justify-between items-center gap-4 border-t border-slate-200 dark:border-[#171717] transition-colors duration-300"
          >
            <div className="flex flex-col md:flex-row items-center gap-4">
                <p className="text-sm">{copyright.text.replace('2024', new Date().getFullYear().toString())}</p>
                {copyright.poweredBy && (
                  <div className="flex items-center gap-2 text-base font-semibold opacity-80">
                      <a href={copyright.poweredBy.href} target="_blank" rel="noopener noreferrer">{copyright.poweredBy.text}</a>
                      <Image src={copyright.poweredBy.logoUrl || "/images/Everacy_logo_withbg.png"} width={32} height={32} alt="Everacy" className="h-8 w-auto rounded-md" />
                  </div>
                )}
            </div>
            
            <div className="flex space-x-6">
              {legalLinks.map((item, idx) => (
                <Link key={idx} href={item.href} className="hover:text-[#ff6929] text-sm transition-colors">{item.label}</Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
  );
}
