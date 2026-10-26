'use client'

import React, { useEffect, useRef, useState } from 'react'

interface Particle {
  x: number
  y: number
  w: number
  h: number
  color: string
  rotation: number
  rotationSpeed: number
  vx: number
  vy: number
  opacity: number
}

interface SoaringKite {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  angle: number
  size: number
  primaryColor: string
  secondaryColor: string
  tailColor: string
  swaySpeed: number
  swayAmount: number
  time: number
  status: 'flying' | 'dueling' | 'cut'
  duelPartnerId?: number
  duelTimer?: number
  cutVy?: number
}

const FESTIVE_COLORS = [
  '#FF6929', // Yummy Orange
  '#F59E0B', // Marigold Yellow
  '#EF4444', // Festive Red
  '#EC4899', // Pink
  '#A855F7', // Purple
  '#06B6D4', // Cyan
  '#10B981', // Green
]

const KITE_PAIRS = [
  { primary: '#FF6929', secondary: '#F59E0B', tail: '#FF6929' }, // Orange / Gold
  { primary: '#06B6D4', secondary: '#10B981', tail: '#06B6D4' }, // Cyan / Emerald
  { primary: '#EC4899', secondary: '#A855F7', tail: '#EC4899' }, // Pink / Purple
  { primary: '#EF4444', secondary: '#FBBF24', tail: '#EF4444' }, // Red / Amber
  { primary: '#8B5CF6', secondary: '#EC4899', tail: '#8B5CF6' }, // Violet / Pink
]

/**
 * Interactive Dashain Festive Effects:
 * 1. Precision Kite Cursor: -28deg tilt, zero-lag tracking, hides native cursor
 * 2. 4 Active Kites constantly soaring in the UI
 * 3. Graceful kite cutting & gentle paper-drift falling (NO text, NO harsh spinning)
 * 4. Celebratory confetti sprinkles
 */
export function FestiveEffects() {
  const [isMounted, setIsMounted] = useState(false)
  const [enabled, setEnabled] = useState(true)

  // Direct DOM cursor element for zero latency tracking
  const kiteCursorEl = useRef<HTMLDivElement | null>(null)
  const [isClickable, setIsClickable] = useState(false)
  const [isClicking, setIsClicking] = useState(false)

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const animFrameRef = useRef<number | null>(null)

  useEffect(() => {
    setIsMounted(true)
    const saved = localStorage.getItem('dashain_festive_mode')
    if (saved !== null) {
      setEnabled(saved === 'true')
    }
  }, [])

  const toggleFestive = () => {
    setEnabled((prev) => {
      const next = !prev
      localStorage.setItem('dashain_festive_mode', String(next))
      return next
    })
  }

  // Manage body class to hide/restore default mouse cursor
  useEffect(() => {
    if (!isMounted) return

    if (enabled) {
      document.body.classList.add('festive-cursor-active')
    } else {
      document.body.classList.remove('festive-cursor-active')
    }

    return () => {
      document.body.classList.remove('festive-cursor-active')
    }
  }, [isMounted, enabled])

  // Precision Kite Cursor: Zero-latency tracking with -28deg tilt
  useEffect(() => {
    if (!isMounted || !enabled) return

    const handleMouseMove = (e: MouseEvent) => {
      if (kiteCursorEl.current) {
        kiteCursorEl.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
        kiteCursorEl.current.style.opacity = '1'
      }

      const clickable =
        e.target instanceof Element &&
        e.target.closest('a, button, input, select, textarea, [role="button"]') !== null
      setIsClickable(!!clickable)
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    const handleMouseLeave = () => {
      if (kiteCursorEl.current) {
        kiteCursorEl.current.style.opacity = '0'
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [isMounted, enabled])

  // Canvas Layer: 4 Free-Soaring Kites + Graceful Kite Cut Drifting + Confetti Sprinkles
  useEffect(() => {
    if (!isMounted || !enabled) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    // 1. Confetti Sprinkles
    const particleCount = 38
    const particles: Particle[] = []
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        w: Math.random() * 6 + 3,
        h: Math.random() * 4 + 2,
        color: FESTIVE_COLORS[Math.floor(Math.random() * FESTIVE_COLORS.length)],
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.04,
        vx: (Math.random() - 0.5) * 0.6,
        vy: Math.random() * 0.9 + 0.5,
        opacity: Math.random() * 0.45 + 0.3,
      })
    }

    // 2. Kites generator
    let nextKiteId = 1
    const createNewKite = (x?: number, y?: number, vx?: number): SoaringKite => {
      const pair = KITE_PAIRS[Math.floor(Math.random() * KITE_PAIRS.length)]
      const isLeft = vx !== undefined ? vx > 0 : Math.random() > 0.5
      return {
        id: nextKiteId++,
        x: x ?? (isLeft ? 80 : width - 80),
        // Always spawn safely below navbar (minimum 160px from top)
        y: y ?? Math.max(160, Math.random() * (height * 0.25) + 160),
        vx: vx ?? (isLeft ? Math.random() * 0.4 + 0.6 : -(Math.random() * 0.4 + 0.6)),
        vy: (Math.random() - 0.5) * 0.3,
        angle: isLeft ? 8 : -8,
        size: Math.random() * 6 + 30,
        primaryColor: pair.primary,
        secondaryColor: pair.secondary,
        tailColor: pair.tail,
        swaySpeed: Math.random() * 0.01 + 0.015,
        swayAmount: Math.random() * 4 + 6,
        time: Math.random() * 100,
        status: 'flying',
      }
    }

    // Initialize 4 active kites safely below navbar (navbar is 80px; kites stay at 160px+)
    const kites: SoaringKite[] = [
      createNewKite(width * 0.18, Math.max(160, height * 0.2), 0.8),
      createNewKite(width * 0.82, Math.max(170, height * 0.22), -0.75),
      createNewKite(width * 0.38, Math.max(220, height * 0.36), -0.65),
      createNewKite(width * 0.68, Math.max(240, height * 0.42), 0.7),
    ]

    let lastBattleTime = Date.now()
    let isDocumentVisible = !document.hidden
    const handleVisibilityChange = () => {
      isDocumentVisible = !document.hidden
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    const render = () => {
      if (!isDocumentVisible) {
        animFrameRef.current = requestAnimationFrame(render)
        return
      }

      ctx.clearRect(0, 0, width, height)

      // 1. Render Confetti / Sprinkles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        p.rotation += p.rotationSpeed

        if (p.y > height + 20) {
          p.y = -20
          p.x = Math.random() * width
        }

        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rotation)
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.opacity
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h)
        ctx.restore()
      }

      // 2. Kite Battles & Cutting Trigger (Every ~18s)
      const now = Date.now()
      if (now - lastBattleTime > 18000) {
        const activeFlying = kites.filter((k) => k.status === 'flying')
        if (activeFlying.length >= 2) {
          const k1 = activeFlying[0]
          const k2 = activeFlying[1]
          k1.status = 'dueling'
          k2.status = 'dueling'
          k1.duelPartnerId = k2.id
          k2.duelPartnerId = k1.id
          k1.duelTimer = 90
          k2.duelTimer = 90
          lastBattleTime = now
        }
      }

      // 3. Render and update Kites
      const marginX = 55
      const marginYTop = 150 // Strict clearance: navbar is 80px tall, kites stay >= 150px
      const marginYBot = Math.min(height * 0.62, 580)

      for (let i = kites.length - 1; i >= 0; i--) {
        const kite = kites[i]
        kite.time += 1

        if (kite.status === 'cut') {
          // Graceful paper-drift flutter: floats down gently with wind sway, NO violent spinning
          kite.cutVy = Math.min(1.2, (kite.cutVy || 0.4) + 0.015)
          kite.y += kite.cutVy

          const windSway = Math.sin(kite.time * 0.04) * 1.8
          kite.x += kite.vx * 0.4 + windSway

          // Soft pendulum tilt (rocking smoothly side to side like a real kite in autumn air)
          const rockAngle = Math.sin(kite.time * 0.045) * 26 + (kite.vx > 0 ? 8 : -8)
          kite.angle += (rockAngle - kite.angle) * 0.08

          drawAuthenticSoaringKite(
            ctx,
            kite.x,
            kite.y,
            kite.size,
            kite.angle,
            kite.primaryColor,
            kite.secondaryColor,
            kite.tailColor,
            kite.time,
            true // isCut
          )

          // Once it gently floats past the bottom, replace it with a fresh soaring kite
          if (kite.y > height + 80) {
            kites.splice(i, 1)
            kites.push(createNewKite())
          }
          continue
        }

        if (kite.status === 'dueling') {
          const partner = kites.find((k) => k.id === kite.duelPartnerId)
          if (partner && partner.status === 'dueling') {
            const dx = partner.x - kite.x
            const dy = partner.y - kite.y
            kite.vx += dx * 0.003
            kite.vy += dy * 0.003

            // Subtle crossing kite line
            ctx.save()
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)'
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(kite.x, kite.y)
            ctx.lineTo(partner.x, partner.y)
            ctx.stroke()
            ctx.restore()

            if (kite.duelTimer !== undefined) {
              kite.duelTimer -= 1
              if (kite.duelTimer <= 0) {
                // Determine duel loser & winner (NO TEXT POPUP)
                const loser = Math.random() > 0.5 ? kite : partner
                const winner = loser === kite ? partner : kite

                loser.status = 'cut'
                loser.cutVy = 0.5

                winner.status = 'flying'
                winner.duelPartnerId = undefined
                winner.duelTimer = undefined
              }
            }
          } else {
            kite.status = 'flying'
          }
        }

        // Boundary steering
        if (kite.x < marginX) {
          kite.vx += 0.045
        } else if (kite.x > width - marginX) {
          kite.vx -= 0.045
        }

        if (kite.y < marginYTop + 25) {
          kite.vy += 0.05
        } else if (kite.y > marginYBot - 25) {
          kite.vy -= 0.05
        }

        kite.vx = Math.max(-1.4, Math.min(1.4, kite.vx))
        kite.vy = Math.max(-0.55, Math.min(0.55, kite.vy))

        const draftX = Math.sin(kite.time * 0.02) * 0.25
        const draftY = Math.cos(kite.time * 0.025) * 0.15

        kite.x += kite.vx + draftX
        kite.y += kite.vy + draftY

        // Strict Navbar hard boundary: kite diamond & tail can NEVER enter navbar (y >= marginYTop)
        if (kite.y < marginYTop) {
          kite.y = marginYTop
          kite.vy = Math.abs(kite.vy) + 0.35 // bounce downwards away from navbar
        } else if (kite.y > marginYBot) {
          kite.y = marginYBot
          kite.vy = -Math.abs(kite.vy) - 0.2
        }

        const targetAngle = kite.vx * 16 + Math.sin(kite.time * kite.swaySpeed) * kite.swayAmount
        kite.angle += (targetAngle - kite.angle) * 0.08

        drawAuthenticSoaringKite(
          ctx,
          kite.x,
          kite.y,
          kite.size,
          kite.angle,
          kite.primaryColor,
          kite.secondaryColor,
          kite.tailColor,
          kite.time,
          false
        )
      }

      animFrameRef.current = requestAnimationFrame(render)
    }

    animFrameRef.current = requestAnimationFrame(render)

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [isMounted, enabled])

  if (!isMounted) return null

  if (!enabled) {
    return (
      <button
        onClick={toggleFestive}
        title="Turn on Dashain Festive Mode"
        className="fixed bottom-3 right-3 z-40 px-3 py-1 rounded-full bg-white/80 dark:bg-black/70 backdrop-blur shadow text-xs font-medium text-slate-500 hover:text-orange-600 border border-slate-200 dark:border-white/10 transition-all flex items-center gap-1.5 opacity-70 hover:opacity-100"
      >
        <span>Festive Mode</span>
      </button>
    )
  }

  return (
    <>
      {/* 1. Canvas Layer: Confetti Sprinkles + 4 Kites + Graceful Drifts */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-20 w-full h-full"
      />

      {/* 2. Precision Kite Cursor: -28deg tilt pointing up-left with zero-lag hardware tracking */}
      <div
        ref={kiteCursorEl}
        className="fixed top-0 left-0 pointer-events-none z-[99999] select-none will-change-transform opacity-0"
        style={{
          transform: 'translate3d(-200px, -200px, 0)',
        }}
      >
        <div
          className="relative transition-transform duration-75"
          style={{
            transformOrigin: '0px 0px',
            transform: `rotate(-28deg) scale(${isClicking ? 0.85 : isClickable ? 1.15 : 1})`,
            filter: isClickable
              ? 'drop-shadow(0 0 6px rgba(255,105,41,0.7)) drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
              : 'drop-shadow(0 2px 5px rgba(0,0,0,0.25))',
          }}
        >
          <svg width="24" height="38" viewBox="0 0 24 38" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Top Wing */}
            <polygon points="12,0 23,12 1,12" fill="#FF6929" />
            {/* Bottom Wing */}
            <polygon points="1,12 23,12 12,24" fill="#F59E0B" />
            {/* Shading */}
            <polygon points="1,12 12,12 12,24" fill="rgba(0,0,0,0.15)" />

            {/* Bamboo Spine & Bow */}
            <line x1="12" y1="0" x2="12" y2="24" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" />
            <path d="M 1 12 Q 12 5 23 12" stroke="#FFFFFF" strokeWidth="1" fill="none" strokeLinecap="round" />

            {/* Tail Bow */}
            <polygon points="12,24 9,27 15,27" fill="#FF6929" />

            {/* Fluttering Ribbon Tail */}
            <path
              d="M 12 27 Q 7 31 13 34 Q 17 37 11 41"
              stroke="#FF6929"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
            <circle cx="10" cy="32" r="1.5" fill="#EF4444" />
            <circle cx="14" cy="38" r="1.5" fill="#06B6D4" />
          </svg>
        </div>
      </div>

      {/* 3. Subtle bottom-right control button */}
      <button
        onClick={toggleFestive}
        title="Toggle Dashain Festive Mode"
        className="fixed bottom-3 right-3 z-40 px-3 py-1.5 rounded-full bg-white/90 dark:bg-zinc-900/90 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-500/20 shadow-sm text-xs font-semibold backdrop-blur transition-all hover:scale-105 flex items-center gap-1.5 opacity-80 hover:opacity-100"
      >
        <span>Dashain Mode</span>
      </button>
    </>
  )
}

/**
 * Canvas renderer for authentic soaring & severed drifting kites
 */
function drawAuthenticSoaringKite(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  angleDeg: number,
  primaryColor: string,
  secondaryColor: string,
  tailColor: string,
  time: number,
  isCut: boolean = false
) {
  ctx.save()
  ctx.translate(x, y)
  ctx.rotate((angleDeg * Math.PI) / 180)
  ctx.globalAlpha = isCut ? 0.75 : 0.88

  const halfW = size * 0.45
  const topH = size * 0.4
  const botH = size * 0.45

  // 1. Top Diamond Wing
  ctx.fillStyle = primaryColor
  ctx.beginPath()
  ctx.moveTo(0, -topH)
  ctx.lineTo(halfW, 0)
  ctx.lineTo(-halfW, 0)
  ctx.closePath()
  ctx.fill()

  // 2. Bottom Diamond Wing
  ctx.fillStyle = secondaryColor
  ctx.beginPath()
  ctx.moveTo(-halfW, 0)
  ctx.lineTo(halfW, 0)
  ctx.lineTo(0, botH)
  ctx.closePath()
  ctx.fill()

  // 3. Subtle 3D Fold Shading
  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
  ctx.beginPath()
  ctx.moveTo(-halfW, 0)
  ctx.lineTo(0, 0)
  ctx.lineTo(0, botH)
  ctx.closePath()
  ctx.fill()

  // 4. White Bamboo Spine & Bow
  ctx.strokeStyle = '#FFFFFF'
  ctx.lineWidth = 1.2
  ctx.beginPath()
  ctx.moveTo(0, -topH)
  ctx.lineTo(0, botH)
  ctx.stroke()

  ctx.beginPath()
  ctx.moveTo(-halfW, 0)
  ctx.quadraticCurveTo(0, -topH * 0.35, halfW, 0)
  ctx.stroke()

  // 5. Tail Bow & Multi-Wave Fluttering Ribbon Tail
  ctx.fillStyle = primaryColor
  ctx.beginPath()
  ctx.moveTo(0, botH)
  ctx.lineTo(-3, botH + 4)
  ctx.lineTo(3, botH + 4)
  ctx.closePath()
  ctx.fill()

  ctx.strokeStyle = tailColor
  ctx.lineWidth = 1.6
  ctx.beginPath()
  ctx.moveTo(0, botH + 4)
  const speed = isCut ? 0.05 : 0.08
  const wave1 = Math.sin(time * speed) * (isCut ? 10 : 7)
  const wave2 = Math.cos(time * speed) * (isCut ? 12 : 9)
  const wave3 = Math.sin(time * (speed * 0.9)) * (isCut ? 14 : 11)
  ctx.quadraticCurveTo(wave1, botH + 16, wave2, botH + 28)
  ctx.quadraticCurveTo(wave3, botH + 38, wave1, botH + 48)
  ctx.stroke()

  // Mini decorative tail ribbons
  ctx.fillStyle = '#F59E0B'
  ctx.beginPath()
  ctx.arc(wave2, botH + 26, 2, 0, Math.PI * 2)
  ctx.fill()

  ctx.fillStyle = '#EF4444'
  ctx.beginPath()
  ctx.arc(wave3, botH + 38, 2, 0, Math.PI * 2)
  ctx.fill()

  ctx.restore()
}
