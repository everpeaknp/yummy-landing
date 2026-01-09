"use client";

import { useState, useRef, useEffect } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { useTheme } from "@/hooks/useTheme";

export function About() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [modalOpen, setModalOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll animation for the video card
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1.35, 0.6]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.4, 1, 0.4]);

  useEffect(() => {
    if (videoRef.current) {
      if (modalOpen) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [modalOpen]);

  // Text scroll animation
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);
  // Removed textOpacity as requested

  return (
    <section 
      id="about" 
      ref={containerRef}
      className="relative isolate overflow-hidden py-24 sm:py-32"
      style={{ backgroundColor: isDark ? '#050505' : '#f8fafc' }}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Animated Text Container */}
        <motion.div 
          style={{ y: textY }}
          className="text-center mb-16 relative z-10"
        >
          <h2 
            className="text-4xl md:text-5xl font-black font-display mb-4"
            style={{ color: isDark ? '#ffffff' : '#0f172a' }}
          >
            What is <span style={{ 
              color: '#ff6929'
            }}>Yummy</span> ?
          </h2>
          <p 
            className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
            style={{ color: isDark ? '#94a3b8' : '#475569' }}
          >
           Discover Yummy through this presentation video which will show you its innovative functioning and how it can transform your experience.
          </p>
        </motion.div>

        {/* Enhanced 3D Video Component */}
        <div>
          <motion.div 
            style={{ scale, opacity }}
            className="max-w-5xl mx-auto perspective-1000 px-4 sm:px-0"
          >
            <div 
              className="w-full h-full relative group cursor-pointer rounded-3xl overflow-hidden shadow-2xl video-card-wrapper" 
              onClick={() => setModalOpen(true)}
              role="button"
              tabIndex={0}
              aria-label="Watch presentation video"
              style={{
                boxShadow: isDark ? '0 25px 50px -12px rgba(0, 0, 0, 0.5)' : '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
                transformStyle: 'preserve-3d',
                transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              {/* Autoplay Video Loop acting as thumbnail to avoid play button overlay requirement */}
              <div className="relative aspect-video w-full bg-slate-900">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                >
                    <source src="https://cruip-tutorials.vercel.app/modal-video/video.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </motion.div>

          {/* Modal Backdrop */}
          {modalOpen && (
            <div
              className="fixed inset-0 z-[99999] bg-black/90 backdrop-blur-sm transition-opacity"
              onClick={() => setModalOpen(false)}
              aria-hidden="true"
            ></div>
          )}

          {/* Modal Dialog */}
          {modalOpen && (
            <div
              className="fixed inset-0 z-[99999] flex px-4 md:px-6 py-6 items-center justify-center pointer-events-none"
              role="dialog"
              aria-modal="true"
            >
              <div className="max-w-6xl mx-auto w-full h-full flex items-center justify-center pointer-events-auto">
                <div className="w-full relative aspect-video bg-black rounded-2xl shadow-2xl overflow-hidden">
                    <button 
                        onClick={() => setModalOpen(false)}
                        className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
                        aria-label="Close video"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                    <video 
                        ref={videoRef}
                        width="1920" 
                        height="1080" 
                        controls
                        autoPlay
                        className="w-full h-full object-contain"
                    >
                        <source src="https://cruip-tutorials.vercel.app/modal-video/video.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
