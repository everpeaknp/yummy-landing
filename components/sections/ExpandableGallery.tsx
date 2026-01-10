"use client";

import { useTheme } from "@/hooks/useTheme";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Mousewheel } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

const images = [
  "/images/screen1.jpeg",
  "/images/screen2.jpeg",
  "/images/screen3.jpeg",
  "/images/screen4.jpeg",
  "/images/screen5.jpeg",
];

export function ExpandableGallery() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const bgImage = isDark ? '/images/ymybanner_dark.jpg' : '/images/ymybanner_light.jpg';

  return (
    <section 
      id="gallery"
      className="bg-fixed bg-bottom bg-cover relative"
      style={{ 
        backgroundImage: `url(${bgImage})`
      }}
    >
      <div className="min-h-screen flex flex-col justify-center items-center px-8 py-20 backdrop-blur-sm bg-zinc-900/30">
        <h2 
          className="text-4xl md:text-5xl font-black font-display mb-16 text-center drop-shadow-md"
          style={{ color: isDark ? '#ffffff' : '#0f172a' }}
        >
          What Yummy offers?
        </h2>
        
        {/* Desktop Accordion */}
        <ul className="hidden md:flex gap-6 h-[500px] md:h-[700px] w-full max-w-[95%] 2xl:max-w-[85%]">
          {images.map((image, index) => (
            <li 
              key={index} 
              className="flex-[5] hover:flex-[20] transition-all duration-700 ease-out overflow-hidden rounded-[2rem] cursor-pointer shadow-2xl relative group border-4 border-white/10"
            >
              <img 
                src={image} 
                alt={`Screen ${index + 1}`} 
                className="h-full w-full object-cover transition-transform duration-1000 ease-in-out group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
            </li>
          ))}
        </ul>

        {/* Mobile Swiper */}
        <div className="md:hidden w-full h-[500px]">
          <Swiper
            slidesPerView={1.2}
            spaceBetween={20}
            centeredSlides={true}
            loop={true}
            modules={[Pagination, Mousewheel]}
            mousewheel={true}
            pagination={{ clickable: true }}
            className="w-full h-full"
          >
            {images.map((image, index) => (
              <SwiperSlide key={index} className="h-full">
                <div className="h-full w-full overflow-hidden rounded-[2rem] shadow-2xl border-4 border-white/10 relative">
                   <img 
                    src={image} 
                    alt={`Screen ${index + 1}`} 
                    className="h-full w-full object-cover" 
                  />
                  {/* Reuse overlay if needed, but on mobile hover isn't primary. Keep it clear. */}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
