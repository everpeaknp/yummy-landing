"use client";

import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";

export function ThreeSteps() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section className="py-24 px-4 overflow-hidden relative" style={{ backgroundColor: isDark ? '#000000' : '#f8fafc' }}>
      <div className="max-w-7xl mx-auto">
        <h2 
          className="text-4xl md:text-5xl font-black font-display mb-20 text-center"
          style={{ color: isDark ? '#ffffff' : '#0f172a' }}
        >
          Launch and Scale
        </h2>

        <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start gap-16 lg:gap-24">
          
          {/* Phase 1 */}
          <div className="flex flex-col items-center w-full max-w-[512px]">
             <div className="text-center mb-10">
                <span className="inline-block px-4 py-1.5 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 font-bold text-sm mb-3 tracking-wider shadow-sm">
                  PHASE 1
                </span>
                <h3 className="text-4xl font-bold text-orange-600 dark:text-orange-500">Setup</h3>
             </div>
             <InteractiveWidget 
               cards={[
                 { 
                   title: "Create Profile", 
                   desc: "Sign up in seconds. No credit card needed.", 
                   img: "https://images.unsplash.com/photo-1556742049-09379e9c8502?q=80&w=1000&auto=format&fit=crop"
                 },
                 { 
                   title: "Digital Menu", 
                   desc: "Upload items, photos, and set prices.", 
                   img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop"
                 },
                 { 
                   title: "Floor Plan", 
                   desc: "Configure tables and staff roles.", 
                   img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000&auto=format&fit=crop" 
                 }
               ]}
            />
          </div>

          {/* Phase 2 */}
          <div className="flex flex-col items-center w-full max-w-[512px]">
             <div className="text-center mb-10">
                <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-bold text-sm mb-3 tracking-wider shadow-sm">
                  PHASE 2
                </span>
                <h3 className="text-4xl font-bold text-blue-600 dark:text-blue-500">Go Live</h3>
             </div>
             <InteractiveWidget 
               cards={[
                 { 
                   title: "Smart POS", 
                   desc: "Take orders and payments instantly.", 
                   img: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=1000&auto=format&fit=crop"
                 },
                 { 
                   title: "Kitchen Sync", 
                   desc: "Orders sent directly to chefs.", 
                   img: "https://images.unsplash.com/photo-1556910103-1c02745a30bf?q=80&w=1000&auto=format&fit=crop"
                 },
                 { 
                   title: "Live Stats", 
                   desc: "Monitor sales and stock in real-time.", 
                   img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop"
                 }
               ]}
            />
          </div>

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
  return (
    <div className="relative w-full max-w-[512px] aspect-[512/505] mx-auto overflow-hidden rounded-2xl shadow-2xl bg-white dark:bg-zinc-900 ring-1 ring-black/5">
      
      {/* Card 1 - Top (Expands Top-Left) */}
      <div 
        className="absolute top-0 left-0 w-full h-[59.4%] rounded-2xl z-[1] overflow-hidden bg-cover bg-center transition-all duration-500 ease-in-out hover:!h-full hover:!w-full hover:!top-0 hover:!left-0 hover:!z-10 hover:shadow-2xl group cursor-pointer"
        style={{ backgroundImage: `url('${cards[0].img}')` }}
      >
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-all duration-300 group-hover:pb-10">
          <div className="text-xl md:text-2xl font-bold mb-2 text-white drop-shadow-md">{cards[0].title}</div>
          <div className="text-xs md:text-sm opacity-0 max-h-0 transition-all duration-300 group-hover:opacity-100 group-hover:max-h-[100px] text-gray-100 font-medium">
             {cards[0].desc}
          </div>
        </div>
      </div>

      {/* Card 2 - Bottom Left (Expands Top-Left) */}
      <div 
        className="absolute top-[60.4%] left-0 w-[39.1%] h-[39.6%] rounded-2xl z-[1] overflow-hidden bg-cover bg-center transition-all duration-500 ease-in-out hover:!h-full hover:!w-full hover:!top-0 hover:!left-0 hover:!z-10 hover:shadow-2xl group cursor-pointer"
        style={{ backgroundImage: `url('${cards[1].img}')` }}
      >
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
         <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-all duration-300 group-hover:pb-10">
          <div className="text-lg md:text-xl font-bold mb-2 text-white drop-shadow-md">{cards[1].title}</div>
           <div className="text-xs md:text-sm opacity-0 max-h-0 transition-all duration-300 group-hover:opacity-100 group-hover:max-h-[100px] text-gray-100 font-medium">
             {cards[1].desc}
          </div>
        </div>
      </div>

      {/* Card 3 - Bottom Right (Expands Bottom-Right) */}
      <div 
        className="absolute bottom-0 right-0 w-[59.6%] h-[55.5%] rounded-2xl border-4 border-white dark:border-zinc-900 hover:border-0 z-[1] overflow-hidden bg-cover bg-center transition-all duration-500 ease-in-out hover:!h-full hover:!w-full hover:!bottom-0 hover:!right-0 hover:!z-10 hover:shadow-2xl group cursor-pointer"
        style={{ backgroundImage: `url('${cards[2].img}')` }}
      >
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
         <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-all duration-300 group-hover:pb-10">
          <div className="text-lg md:text-xl font-bold mb-2 text-white drop-shadow-md">{cards[2].title}</div>
           <div className="text-xs md:text-sm opacity-0 max-h-0 transition-all duration-300 group-hover:opacity-100 group-hover:max-h-[100px] text-gray-100 font-medium">
             {cards[2].desc}
          </div>
        </div>
      </div>

    </div>
  );
}
