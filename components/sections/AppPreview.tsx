"use client";

import Image from "next/image";
import { useTheme } from "@/hooks/useTheme";
import ParticleRing from "@/components/ui/ParticleRing";

export function AppPreview() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section 
      className="py-24 overflow-hidden relative" 
      style={{ backgroundColor: isDark ? '#0a0a0a' : '#f8fafc' }}
    >
      {/* 3D Background - Covering entire section */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
         <ParticleRing />
      </div>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">
        {/* Phone Mockup */}
        <div className="order-2 lg:order-1 relative">
          <div className="phone-mockup shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500 relative z-10">
            <Image
              src="/images/screen-2.jpg"
              alt="POS Visual"
              width={280}
              height={607}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Content */}
        <div className="order-1 lg:order-2 text-center lg:text-left">
          <h2 
            className="text-4xl font-black font-display mb-6"
            style={{ color: isDark ? '#ffffff' : '#0f172a' }}
          >
            Designed for Speed.
          </h2>
          <p 
            className="text-lg leading-relaxed mb-8"
            style={{ color: isDark ? '#94a3b8' : '#475569' }}
          >
            Your staff will love it. The interface is intuitive, requiring zero
            training. Processing an order takes less than 3 taps.
          </p>

          {/* Stats */}
          <div className="flex gap-4 justify-center lg:justify-start">
            <div className="flex flex-col gap-1">
              <span 
                className="text-3xl font-black" 
                style={{ color: isDark ? '#ffffff' : '#0f172a' }}
              >
                0.5s
              </span>
              <span 
                className="text-sm uppercase font-bold tracking-wider"
                style={{ color: '#64748b' }}
              >
                Search Time
              </span>
            </div>
            <div 
              className="w-px" 
              style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : '#e2e8f0' }}
            ></div>
            <div className="flex flex-col gap-1">
              <span 
                className="text-3xl font-black" 
                style={{ color: isDark ? '#ffffff' : '#0f172a' }}
              >
                100%
              </span>
              <span 
                className="text-sm uppercase font-bold tracking-wider"
                style={{ color: '#64748b' }}
              >
                Uptime
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
