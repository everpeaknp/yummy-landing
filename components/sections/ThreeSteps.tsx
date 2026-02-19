"use client";

import { useTheme } from "@/hooks/useTheme";
import { useState, useEffect, useCallback } from "react";
import { get } from "@/lib/api/client";
import { useRefetchOnFocus } from "@/lib/api";
import { InlineHTMLContent } from "@/components/ui/HTMLContent";

interface LaunchCard {
  title: string;
  description: string;
  imageUrl: string;
  order: number;
}

interface LaunchPhase {
  label: string;
  title: string;
  color: string;
  order: number;
  cards: LaunchCard[];
  badgeColors?: {
    light?: { background: string; text: string };
    dark?: { background: string; text: string };
  };
}

interface LaunchPhasesData {
  title: string;
  phases: LaunchPhase[];
}

const fallbackData: LaunchPhasesData = {
  title: "Launch and Scale",
  phases: [
    {
      label: "PHASE 1",
      title: "Setup",
      color: "orange",
      order: 1,
      cards: [
        { title: "Create Profile", description: "Sign up in seconds. No credit card needed.", imageUrl: "https://images.unsplash.com/photo-1556742049-09379e9c8502?q=80&w=1000&auto=format&fit=crop", order: 1 },
        { title: "Digital Menu", description: "Upload items, photos, and set prices.", imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop", order: 2 },
        { title: "Floor Plan", description: "Configure tables and staff roles.", imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000&auto=format&fit=crop", order: 3 }
      ]
    },
    {
      label: "PHASE 2",
      title: "Go Live",
      color: "blue",
      order: 2,
      cards: [
        { title: "Smart POS", description: "Take orders and payments instantly.", imageUrl: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=1000&auto=format&fit=crop", order: 1 },
        { title: "Kitchen Sync", description: "Orders sent directly to chefs.", imageUrl: "https://images.unsplash.com/photo-1556910103-1c02745a30bf?q=80&w=1000&auto=format&fit=crop", order: 2 },
        { title: "Live Stats", description: "Monitor sales and stock in real-time.", imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop", order: 3 }
      ]
    }
  ]
};

export function ThreeSteps() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [data, setData] = useState<LaunchPhasesData>(fallbackData);

  const fetchData = useCallback(async () => {
    try {
      const apiData = await get<LaunchPhasesData>('/pages/home/launch-phases/');
      setData(apiData);
    } catch (error) {
      console.error("Failed to fetch launch phases:", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useRefetchOnFocus(fetchData);

  const getColorClasses = (color: string, isDark: boolean) => {
    const colors: Record<string, { badge: string; title: string }> = {
      orange: {
        badge: isDark ? 'bg-orange-900/30 text-orange-400' : 'bg-orange-100 text-orange-600',
        title: isDark ? 'text-orange-500' : 'text-orange-600'
      },
      blue: {
        badge: isDark ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-600',
        title: isDark ? 'text-blue-500' : 'text-blue-600'
      },
      green: {
        badge: isDark ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-600',
        title: isDark ? 'text-green-500' : 'text-green-600'
      },
      purple: {
        badge: isDark ? 'bg-purple-900/30 text-purple-400' : 'bg-purple-100 text-purple-600',
        title: isDark ? 'text-purple-500' : 'text-purple-600'
      }
    };
    return colors[color] || colors.orange;
  };

  const phases = (data.phases || []).sort((a, b) => a.order - b.order);

  return (
    <section className="py-24 px-4 overflow-hidden relative" style={{ backgroundColor: isDark ? '#000000' : '#f8fafc' }}>
      <div className="max-w-7xl mx-auto">
        <h2 
          className="text-4xl md:text-5xl font-black font-display mb-20 text-center"
          style={{ color: isDark ? '#ffffff' : '#0f172a' }}
        >
          {data.title}
        </h2>

        <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start gap-16 lg:gap-24">
          {phases.map((phase) => {
            const colorClasses = getColorClasses(phase.color, isDark);
            const sortedCards = (phase.cards || []).sort((a, b) => a.order - b.order);
            
            return (
              <div key={phase.order} className="flex flex-col items-center w-full max-w-[512px]">
                <div className="text-center mb-10">
                  <span className={`inline-block px-4 py-1.5 rounded-full font-bold text-sm mb-3 tracking-wider shadow-sm ${colorClasses.badge}`}>
                    {phase.label}
                  </span>
                  <h3 className={`text-4xl font-bold ${colorClasses.title}`}>{phase.title}</h3>
                </div>
                <InteractiveWidget 
                  cards={sortedCards.map(card => ({
                    title: card.title,
                    desc: card.description,
                    img: card.imageUrl
                  }))}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

interface CardData {
  title: string;
  desc: string;
  img: string;
}

function InteractiveWidget({ cards }: { cards: CardData[] }) {
  // Ensure we have at least 3 cards for the layout
  const safeCards = [
    cards[0] || { title: '', desc: '', img: '' },
    cards[1] || { title: '', desc: '', img: '' },
    cards[2] || { title: '', desc: '', img: '' }
  ];

  return (
    <div className="relative w-full max-w-[512px] aspect-[512/505] mx-auto overflow-hidden rounded-2xl shadow-2xl bg-white dark:bg-zinc-900 ring-1 ring-black/5">
      
      {/* Card 1 - Top (Expands Top-Left) */}
      <div 
        className="absolute top-0 left-0 w-full h-[59.4%] rounded-2xl z-[1] overflow-hidden bg-cover bg-center transition-all duration-500 ease-in-out hover:!h-full hover:!w-full hover:!top-0 hover:!left-0 hover:!z-10 hover:shadow-2xl group cursor-pointer"
        style={{ backgroundImage: `url('${safeCards[0].img}')` }}
      >
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-all duration-300 group-hover:pb-10">
          <div className="text-xl md:text-2xl font-bold mb-2 text-white drop-shadow-md">{safeCards[0].title}</div>
          <div className="text-xs md:text-sm opacity-0 max-h-0 transition-all duration-300 group-hover:opacity-100 group-hover:max-h-[100px] text-gray-100 font-medium">
             <InlineHTMLContent html={safeCards[0].desc} />
          </div>
        </div>
      </div>

      {/* Card 2 - Bottom Left (Expands Top-Left) */}
      <div 
        className="absolute top-[60.4%] left-0 w-[39.1%] h-[39.6%] rounded-2xl z-[1] overflow-hidden bg-cover bg-center transition-all duration-500 ease-in-out hover:!h-full hover:!w-full hover:!top-0 hover:!left-0 hover:!z-10 hover:shadow-2xl group cursor-pointer"
        style={{ backgroundImage: `url('${safeCards[1].img}')` }}
      >
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
         <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-all duration-300 group-hover:pb-10">
          <div className="text-lg md:text-xl font-bold mb-2 text-white drop-shadow-md">{safeCards[1].title}</div>
           <div className="text-xs md:text-sm opacity-0 max-h-0 transition-all duration-300 group-hover:opacity-100 group-hover:max-h-[100px] text-gray-100 font-medium">
              <InlineHTMLContent html={safeCards[1].desc} />
           </div>
        </div>
      </div>

      {/* Card 3 - Bottom Right (Expands Bottom-Right) */}
      <div 
        className="absolute bottom-0 right-0 w-[59.6%] h-[55.5%] rounded-2xl border-4 border-white dark:border-zinc-900 hover:border-0 z-[1] overflow-hidden bg-cover bg-center transition-all duration-500 ease-in-out hover:!h-full hover:!w-full hover:!bottom-0 hover:!right-0 hover:!z-10 hover:shadow-2xl group cursor-pointer"
        style={{ backgroundImage: `url('${safeCards[2].img}')` }}
      >
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
         <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-all duration-300 group-hover:pb-10">
          <div className="text-lg md:text-xl font-bold mb-2 text-white drop-shadow-md">{safeCards[2].title}</div>
           <div className="text-xs md:text-sm opacity-0 max-h-0 transition-all duration-300 group-hover:opacity-100 group-hover:max-h-[100px] text-gray-100 font-medium">
              <InlineHTMLContent html={safeCards[2].desc} />
           </div>
        </div>
      </div>

    </div>
  );
}
