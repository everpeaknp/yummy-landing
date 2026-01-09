"use client";

import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";
import { useTheme } from "@/hooks/useTheme";

const cards = [
  {
    url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000&auto=format&fit=crop",
    title: "Revolutionized our inventory management.",
    author: "Baje Ko Sekuwa",
    id: 1,
  },
  {
    url: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1000&auto=format&fit=crop",
    title: "Best POS system in Nepal, hands down.",
    author: "Roadhouse Cafe",
    id: 2,
  },
  {
    url: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1000&auto=format&fit=crop",
    title: "KOT printing is lightning fast.",
    author: "Trisara",
    id: 3,
  },
  {
    url: "https://images.unsplash.com/photo-1550966871-3ed3c6227b3c?q=80&w=1000&auto=format&fit=crop",
    title: "Support team is always available.",
    author: "Burger Shack",
    id: 4,
  },
  {
    url: "https://images.unsplash.com/photo-1466978913421-dad9375acb25?q=80&w=1000&auto=format&fit=crop",
    title: "IRD billing made simple.",
    author: "Himalayan Java",
    id: 5,
  },
];

export function Testimonials() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

  return (
    <section 
      ref={targetRef} 
      className="relative h-[300vh]" 
      style={{ backgroundColor: isDark ? '#0a0a0a' : '#f8fafc' }}
    >
      <div className="sticky top-0 flex h-screen flex-col items-start justify-center overflow-hidden">
        {/* Header - Centered */}
        <div className="w-full text-center mb-12 relative z-10 px-6">
           <h2 
            className="text-4xl sm:text-5xl font-black font-display mb-4"
            style={{ color: isDark ? '#ffffff' : '#0f172a' }}
          >
            Trusted by the Best
          </h2>
          <p className="text-lg" style={{ color: '#64748b' }}>
            Join 500+ restaurants growing with Yummy.
          </p>
        </div>
        
        {/* Cards - Centered Horizontal Scroll */}
        <motion.div style={{ x }} className="flex gap-8 pl-[10vw]">
          {cards.map((card) => {
            return <Card card={card} key={card.id} isDark={isDark} />;
          })}
        </motion.div>
      </div>
    </section>
  );
}

const Card = ({ card, isDark }: { card: typeof cards[0], isDark: boolean }) => {
  return (
    <div
      key={card.id}
      className="group relative h-[400px] w-[350px] sm:h-[450px] sm:w-[450px] overflow-hidden rounded-3xl flex-shrink-0"
      style={{ 
        backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'transparent', // Transparent in light mode to avoid overlay
        border: isDark ? '1px solid rgba(255,255,255,0.1)' : 'none', // No border in light mode if not needed
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
      }}
    >
      <div
        style={{
          backgroundImage: `url(${card.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="absolute inset-0 z-0 transition-transform duration-500 group-hover:scale-110 opacity-100" 
      ></div>
      <div className="absolute inset-0 z-10 flex flex-col justify-end p-8 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
        <p className="text-2xl sm:text-3xl font-bold font-display text-white mb-4 leading-tight">
          "{card.title}"
        </p>
        <p className="text-primary font-bold uppercase tracking-wider text-sm">
          {card.author}
        </p>
      </div>
    </div>
  );
};
