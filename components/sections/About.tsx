'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { useScroll, useTransform, motion } from 'framer-motion'
import { useTheme } from '@/hooks/useTheme'
import { get } from '@/lib/api/client'
import { useRefetchOnFocus } from '@/lib/api'
import { InlineHTMLContent } from '@/components/ui/HTMLContent'
import { Icon } from '@/components/ui/Icon'

interface AboutData {
  title: {
    prefix: string
    highlight: string
    suffix: string
  }
  description: string
  videoUrl: string
  thumbnailUrl?: string
  videoCardShadow?: {
    light: string
    dark: string
  }
}

const fallbackData: AboutData = {
  title: { prefix: 'What is', highlight: 'Yummy', suffix: '?' },
  description:
    'Discover Yummy through this presentation video which will show you its innovative functioning and how it can transform your experience.',
  videoUrl: 'https://cruip-tutorials.vercel.app/modal-video/video.mp4',
  thumbnailUrl: undefined,
  videoCardShadow: {
    light: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
    dark: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
  },
}

export function About() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [soundEnabled, setSoundEnabled] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)
  const [tempIcon, setTempIcon] = useState<'play' | 'pause' | null>(null)
  const [previewLoaded, setPreviewLoaded] = useState(false)
  const previewVideoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const togglePlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    if (previewVideoRef.current) {
      if (isPlaying) {
        previewVideoRef.current.pause()
        setIsPlaying(false)
        showActionIcon('pause')
      } else {
        previewVideoRef.current.play()
        setIsPlaying(true)
        showActionIcon('play')
      }
    }
  }

  const showActionIcon = (icon: 'play' | 'pause') => {
    setTempIcon(icon)
    setTimeout(() => {
      setTempIcon(null)
    }, 600)
  }
  const [data, setData] = useState<AboutData>(fallbackData)

  // Fetch data from API
  const fetchData = useCallback(async () => {
    try {
      const apiData = await get<AboutData>('/pages/home/about/')
      setData(apiData)
    } catch (error) {
      console.error('Failed to fetch about data:', error)
    }
  }, [])

  // Fetch data from API
  useEffect(() => {
    fetchData()
  }, [fetchData])

  useRefetchOnFocus(fetchData)

  // Scroll animation for the video card
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  // Toned down the extreme scaling to prevent video decode stuttering during scroll
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.05, 0.9])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1, 0.6])



  // Throttled sound toggle for better performance
  useEffect(() => {
    const updateSound = () => {
      if (previewVideoRef.current) {
        previewVideoRef.current.muted = !soundEnabled
      }
    }

    // Small delay to batch updates
    const timeoutId = setTimeout(updateSound, 10)
    return () => clearTimeout(timeoutId)
  }, [soundEnabled])

  // Text scroll animation
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, -100])

  const title = data.title || fallbackData.title
  const description = data.description || fallbackData.description
  // Handle video URL - if it's a broken /media/https%3A... URL, use the actual URL
  let videoUrl = data.videoUrl || fallbackData.videoUrl
  if (videoUrl.includes('%3A') || videoUrl.includes('https%3A')) {
    // Decode and extract the actual URL
    try {
      const decoded = decodeURIComponent(videoUrl.replace('/media/', ''))
      if (decoded.startsWith('http')) {
        videoUrl = decoded
      }
    } catch {
      videoUrl = fallbackData.videoUrl
    }
  }
  const shadow = data.videoCardShadow || fallbackData.videoCardShadow!

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative isolate overflow-hidden py-24 sm:py-32 bg-slate-50 dark:bg-[#050505]"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Animated Text Container */}
        <motion.div style={{ y: textY }} className="text-center mb-16 relative z-10">
          <h2 className="text-4xl md:text-5xl font-black font-display mb-4 text-slate-900 dark:text-white">
            <InlineHTMLContent html={title.prefix} />{' '}
            <span className="text-orange-500">
              <InlineHTMLContent html={title.highlight} />
            </span>{' '}
            <InlineHTMLContent html={title.suffix} />
          </h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed text-slate-600 dark:text-slate-400">
            <InlineHTMLContent html={description} />
          </p>
        </motion.div>

        {/* Enhanced 3D Video Component */}
        <div>
          <motion.div
            style={{ scale, opacity }}
            className="max-w-5xl mx-auto perspective-1000 px-4 sm:px-0"
          >
            <div
              className="w-full h-full relative group cursor-pointer rounded-3xl overflow-hidden shadow-2xl shadow-slate-300/50 dark:shadow-black/50 video-card-wrapper bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/50"
              onClick={togglePlay}
              role="button"
              tabIndex={0}
              aria-label="Watch presentation video"
              style={{
                transformStyle: 'preserve-3d',
                transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              {/* Autoplay Video Loop acting as thumbnail to avoid play button overlay requirement */}
              <div className="relative aspect-video w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/50 overflow-hidden rounded-2xl group-hover:border-orange-500/50 dark:group-hover:border-orange-500/30 transition-colors duration-500">
                <video
                  ref={previewVideoRef}
                  key={videoUrl}
                  muted={!soundEnabled}
                  loop
                  autoPlay
                  playsInline
                  preload="auto"
                  poster={data.thumbnailUrl}
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                  onLoadedData={() => setPreviewLoaded(true)}
                  onError={(e) => console.log('Preview video error:', e)}
                >
                  <source src={videoUrl} type="video/mp4" />
                  <source src={videoUrl.replace('.mp4', '.webm')} type="video/webm" />
                </video>
                {/* Loading indicator for video */}
                {!previewLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-100 dark:bg-slate-900">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-8 h-8 border-2 border-orange-500/20 border-t-orange-500 rounded-full animate-spin"></div>
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-medium tracking-wide">LOADING PREVIEW</span>
                    </div>
                  </div>
                )}

                {/* Temporary Action Icon (Play/Pause) */}
                {tempIcon && (
                  <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1.5 }}
                      exit={{ opacity: 0, scale: 2 }}
                      transition={{ duration: 0.4 }}
                      className="w-20 h-20 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white"
                    >
                      <Icon name={tempIcon} size={40} />
                    </motion.div>
                  </div>
                )}

                {/* Sound Toggle (Icon Only) */}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setSoundEnabled(!soundEnabled)
                  }}
                  className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-30 flex items-center justify-center p-2.5 sm:p-3 bg-black/60 hover:bg-black/80 backdrop-blur-sm shadow-lg border border-white/10 rounded-full text-white transition-all hover:scale-105"
                  aria-label={soundEnabled ? 'Mute video' : 'Unmute video'}
                >
                  <Icon name={soundEnabled ? 'volume-2' : 'volume-x'} size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
