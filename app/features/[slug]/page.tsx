"use client";

import { Navbar, Footer } from "@/components/layout";
import { useTheme } from "@/hooks/useTheme";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { TextParallaxContent } from "@/components/ui/TextParallaxContent";
import Link from "next/link";
import { FiArrowRight, FiCheck } from "react-icons/fi";
import React from "react";

// Type definition for a feature section
type FeatureSection = {
  subheading: string;
  heading: string;
  image: string;
  content: React.ReactNode;
  quote?: { text: string; author: string }; // Added quote
};

// Helper component for consistent content styling
const FeatureContent = ({ 
  title, 
  description, 
  features, 
  cta = false,
  quote
}: { 
  title: string; 
  description: string; 
  features?: string[]; 
  cta?: boolean;
  quote?: { text: string; author: string };
}) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
      <h2 className="col-span-1 text-3xl font-bold md:col-span-4" style={{ color: isDark ? '#fff' : '#0f172a' }}>
        {title}
      </h2>
      <div className="col-span-1 md:col-span-8">
        <p className="mb-8 text-xl leading-relaxed" style={{ color: isDark ? '#a3a3a3' : '#475569' }}>
          {description}
        </p>
        
        {features && (
           <ul className="mb-8 space-y-3">
              {features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2">
                       <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <FiCheck size={14} />
                       </span>
                       <span className="text-lg" style={{ color: isDark ? '#d4d4d4' : '#334155' }}>{f}</span>
                  </li>
              ))}
           </ul>
        )}

        {quote && (
           <blockquote className="mb-10 rounded-2xl p-6 border-l-4 border-primary bg-gray-50 dark:bg-zinc-900/50">
               <p className="text-lg italic mb-4" style={{ color: isDark ? '#d4d4d4' : '#334155' }}>"{quote.text}"</p>
               <footer className="text-sm font-bold text-primary flex items-center gap-2">
                   <span className="w-8 h-[2px] bg-primary"></span>
                   {quote.author}
               </footer>
           </blockquote>
        )}

        {cta && (
          <Link 
            href="/pricing"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-white hover:bg-orange-600 transition-colors font-bold shadow-lg shadow-orange-500/20"
          >
            Get Started <FiArrowRight />
          </Link>
        )}
      </div>
    </div>
  );
};

const featuresData: Record<string, FeatureSection[]> = {
  "smart-inventory": [
    {
      subheading: "Smart Inventory",
      heading: "Precision Control.",
      image: "https://images.unsplash.com/photo-1556740758-90de29cf1374?q=80&w=2500&auto=format&fit=crop", 
      content: (
        <FeatureContent
          title="Real-time Tracking"
          description="Never guess what's in your pantry again. Our system deducts ingredients automatically as soon as an order is placed on the POS. View live stock levels from anywhere in the world and prevent theft or wastage before it happens."
          features={[
            "Live deduction of ingredients per dish",
            "Automatic low-stock alerts",
            "Multi-location support"
          ]}
        />
      )
    },
    {
      subheading: "Automated",
      heading: "Vendor Management.",
      image: "https://images.unsplash.com/photo-1615897577741-9257d0796371?q=80&w=2500&auto=format&fit=crop", 
      quote: { text: "We cut our food waste by 15% in the first month using Yummy's vendor tools.", author: "Head Chef, Kathmandu Kitchen" },
      content: (
        <FeatureContent
          title="Streamlined Ordering"
          description="Manage all your suppliers in one place. Generate purchase orders automatically based on par levels and send them via email or WhatsApp directly from the dashboard."
          features={[
            "One-click Purchase Orders",
            "Supplier price history",
            "Digital GRN (Goods Received Note)"
          ]}
          quote={{ text: "We cut our food waste by 15% in the first month using Yummy's vendor tools.", author: "Head Chef, Kathmandu Kitchen" }}
        />
      )
    },
    {
      subheading: "Profitable",
      heading: "Cost Analysis.",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2500&auto=format&fit=crop", 
      content: (
        <FeatureContent
          title="Optimize Your Menu"
          description="Know exactly how much each dish costs to make. Our recipe costing engine accounts for every gram of ingredient, helping you price your menu for maximum profitability."
          features={[
            "Recipe costing cards",
            "Variance reports (Ideal vs Actual usage)",
            "Menu engineering insights"
          ]}
          cta={true}
        />
      )
    }
  ],
  "ird-billing": [
    {
      subheading: "IRD Approved",
      heading: "Fully Compliant.",
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2500&auto=format&fit=crop", 
      content: (
        <FeatureContent
          title="Peace of Mind"
          description="We are officially certified by the Inland Revenue Department of Nepal. Our billing system adheres strictly to all electronic billing procedures, ensuring you are always audit-ready without the stress."
          features={[
            "Real-time data sync with IRD servers",
            "Standardized VAT & PAN invoices",
            "Secure audit log trail"
          ]}
        />
      )
    },
    {
      subheading: "Seamless",
      heading: "Integrated POS.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=2500&auto=format&fit=crop", 
      quote: { text: "Billing used to be a headache. Now it's just one click.", author: "Owner, Cafe Himalayan" },
      content: (
        <FeatureContent
          title="Fast & Reliable"
          description="Print bills instantly from any device. Whether you're using a desktop, tablet, or handheld terminal, our flexible billing solution adapts to your hardware."
          features={[
            "Thermal printer support",
            "Split billing & table transfers",
            "Digital e-bills via SMS/Email"
          ]}
          quote={{ text: "Billing used to be a headache. Now it's just one click.", author: "Owner, Cafe Himalayan" }}
          cta={true}
        />
      )
    }
  ],
  "qr-menu": [
     {
      subheading: "Digital Menu",
      heading: "Contactless Ordering.",
      image: "https://images.unsplash.com/photo-1595079676339-1534801fafde?q=80&w=2500&auto=format&fit=crop", 
      quote: { text: "Customers love scanning the QR. It feels modern and hygienic.", author: "Manager, Burger House" },
      content: (
        <FeatureContent
          title="Scan & Order"
          description="Empower your guests to order directly from their smartphones. Reduce wait times and free up your staff to focus on hospitality rather than order taking."
          features={[
            "No app download required",
            "Direct integration with KOT",
            "Secure online payments"
          ]}
          quote={{ text: "Customers love scanning the QR. It feels modern and hygienic.", author: "Manager, Burger House" }}
        />
      )
    },
    {
      subheading: "Dynamic",
      heading: "Smart Up-selling.",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2500&auto=format&fit=crop", 
      content: (
        <FeatureContent
          title="Increase Ticket Size"
          description="Our digital menu suggests pairings and add-ons automatically. Use high-quality photos to tempt customers and drive higher average order values."
          features={[
            "Visual menu with rich imagery",
            "Recommended items engine",
            "Instant menu updates (no re-printing)"
          ]}
          cta={true}
        />
      )
    }
  ],
  "reports": [
    {
      subheading: "Analytics",
      heading: "Data Driven.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2500&auto=format&fit=crop", 
      content: (
        <FeatureContent
          title="360° Business View"
          description="Access your restaurant's performance metrics from anywhere in the world. Our cloud-based dashboard gives you real-time insights into sales, expenses, and profitability."
          features={[
            "Daily sales summaries",
            "Hourly sales heatmaps",
            "Category-wise breakdown"
          ]}
        />
      )
    },
    {
      subheading: "Performance",
      heading: "Staff & Operations.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2500&auto=format&fit=crop", 
      content: (
        <FeatureContent
          title="Optimize Operations"
          description="Identify your top-performing staff and busiest hours. Use data to create smarter schedules and incentivize your team effectively."
          features={[
            "Staff sales performance",
            "Table turnover rates",
            "Customer feedback tracking"
          ]}
          cta={true}
        />
      )
    }
  ]
};

export default function FeaturePage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const params = useParams();
  const slug = params.slug as string;
  const sections = featuresData[slug];

  if (!sections) {
    return (
       <>
      <Navbar />
      <motion.main 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }}
        className="pt-32 min-h-screen flex items-center justify-center" 
        style={{ backgroundColor: isDark ? '#0a0a0a' : '#ffffff', color: isDark? '#fff' : '#000' }}
      >
        <h1 className="text-2xl font-bold">Feature Not Found</h1>
      </motion.main>
      <Footer />
    </>
    )
  }

  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: isDark ? '#0a0a0a' : '#ffffff' }}>
          {sections.map((section, idx) => (
             <TextParallaxContent
                key={idx}
                heading={section.heading}
                subheading={section.subheading}
                imgUrl={section.image}
             >
                {section.content}
             </TextParallaxContent>
          ))}
      </main>
      <Footer />
    </>
  );
}
