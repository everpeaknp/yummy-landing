 'use client'

import React, { ReactNode, useEffect, useState, useCallback } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { useTheme } from '@/hooks/useTheme'
import { siteConfig } from '@/lib/constants'
import { getNavbar, type NavbarData, type NavItem, useRefetchOnFocus } from '@/lib/api'
import { Icon } from '@/components/ui/Icon'

const fallbackData: Partial<NavbarData> = {
  logo: {
    lightModeSrc: '/images/yummy_logo_orange.png',
    darkModeSrc: '/images/yummy_logo.png',
    text: 'Yummyever',
    href: '/',
  },
  themeToggle: {
    visible: true,
    lightModeIcon: 'light_mode',
    darkModeIcon: 'dark_mode',
  },
  loginButton: {
    text: 'Login',
    href: siteConfig.links.app,
    visible: true,
    lightBackground: '#0f172a',
    lightText: '#ffffff',
    darkBackground: '#ffffff',
    darkText: '#0f172a',
  },
  items: [
    { title: 'Features', href: '/features', hasMegaMenu: true, megaMenuType: 'features', order: 1 },
    { title: 'Pricing', href: '/pricing', hasMegaMenu: false, order: 2 },
    { title: 'Company', href: '/team', hasMegaMenu: true, megaMenuType: 'company', order: 3 },
    { title: 'Careers', href: '/careers', hasMegaMenu: false, order: 4 },
    { title: 'Blog', href: '/blog', hasMegaMenu: true, megaMenuType: 'blog', order: 5 },
  ],
  buttons: [],
}

export function Navbar() {
  const { theme, toggleTheme, mounted } = useTheme()
  const isDark = theme === 'dark'
  const [data, setData] = useState<Partial<NavbarData>>(fallbackData)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const fetchData = useCallback(async () => {
    try {
      const apiData = await getNavbar()
      setData(apiData)
    } catch (error) {
      console.error('[Navbar] Failed to fetch navbar data:', error)
      // Keep fallback data
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  useRefetchOnFocus(fetchData)

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [mobileMenuOpen])

  // Construct TABS based on API data order, but keep component mapping static for simplicity
  const items = (data.items || fallbackData.items!).sort((a, b) => a.order - b.order)

  // Maps for dynamic data to components
  // We need to rebuild TABS array with dynamic titles/hrefs but keep the component association
  const dynamicCols = items.map((item, idx) => {
    let Component = null
    if (item.megaMenuType === 'features') Component = FeaturesMenu
    if (item.megaMenuType === 'company') Component = CompanyMenu
    if (item.megaMenuType === 'blog') Component = Blog

    return {
      id: idx + 1,
      title: item.title,
      href: item.href,
      originalId: item.megaMenuType,
      Component,
    }
  })

  const logo = data.logo || fallbackData.logo!
  const loginBtn = data.loginButton || fallbackData.loginButton!
  const themeToggleConfig = data.themeToggle || fallbackData.themeToggle!

  const pathname = usePathname()
  const router = useRouter()

  const handleLogoClick = (e: React.MouseEvent) => {
    // If already on the homepage, just scroll to top smoothly
    if (!pathname || pathname === '/') {
      e.preventDefault()
      if (typeof window !== 'undefined') {
        const el = document.scrollingElement || document.documentElement || document.body
        try {
          el.scrollTo({ top: 0, behavior: 'smooth' })
        } catch (_) {
          el.scrollTop = 0
        }
      }
      return
    }

    // If on another page, navigate to root
    e.preventDefault()
    router.push('/')
  }

  return (
    <>
      <nav
        className="fixed top-0 w-full z-[100] backdrop-blur-md transition-colors duration-300"
        style={{
          backgroundColor: isDark ? 'rgba(10, 10, 10, 0.8)' : 'rgba(255, 255, 255, 0.8)',
          borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : '#e2e8f0'}`,
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href={logo.href} onClick={handleLogoClick} className="flex items-center gap-3 relative z-50">
            <Image
              src={isDark ? logo.darkModeSrc : logo.lightModeSrc}
              alt={logo.text}
              width={50}
              height={50}
              className="h-8 w-auto"
            />
            <span
              className="text-xl font-bold font-display tracking-tight leading-none"
              style={{ color: isDark ? '#ffffff' : '#0f172a' }}
            >
              {logo.text}
            </span>
          </Link>

          {/* Centered Shifting Tabs (Desktop) */}
          <div className="hidden md:flex justify-center flex-1">
            <Tabs tabs={dynamicCols} isDark={isDark} />
          </div>

          {/* Actions (Desktop) */}
          <div className="hidden md:flex items-center gap-4">
            {/* Theme Toggle */}
            {themeToggleConfig.visible && (
              <button
                onClick={toggleTheme}
                className="p-2 transition-colors rounded-full"
                style={{ color: isDark ? '#94a3b8' : '#64748b' }}
                aria-label="Toggle theme"
              >
                {mounted && (
                  <Icon
                    name={isDark ? themeToggleConfig.darkModeIcon : themeToggleConfig.lightModeIcon}
                    size={20}
                  />
                )}
              </button>
            )}

            {/* Login Button */}
            {loginBtn.visible !== false && (
              <Link
                href={loginBtn.href}
                target="_blank"
                className="px-6 py-2.5 rounded-full font-bold text-sm hover:opacity-90 transition-opacity"
                style={{
                  backgroundColor: isDark
                    ? loginBtn.darkBackground || '#ffffff'
                    : loginBtn.lightBackground || '#0f172a',
                  color: isDark ? loginBtn.darkText || '#0f172a' : loginBtn.lightText || '#ffffff',
                }}
              >
                {loginBtn.text}
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 transition-colors relative z-50"
              style={{ color: isDark ? '#ffffff' : '#0f172a' }}
            >
              {mobileMenuOpen ? <Icon name="close" size={24} /> : <Icon name="menu" size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 px-6 pt-24 pb-10 flex flex-col"
            style={{ backgroundColor: isDark ? '#0a0a0a' : '#ffffff' }}
          >
            <div className="flex flex-col gap-6 text-xl font-medium">
              {dynamicCols.map((t) => (
                <div
                  key={t.id}
                  className="border-b pb-4"
                  style={{ borderColor: isDark ? '#262626' : '#e2e8f0' }}
                >
                  <Link
                    href={t.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block mb-2"
                    style={{ color: isDark ? '#fff' : '#0f172a' }}
                  >
                    {t.title}
                  </Link>
                </div>
              ))}

              <div className="mt-4 flex items-center justify-between">
                <span style={{ color: isDark ? '#94a3b8' : '#64748b' }}>Appearance</span>
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-full border"
                  style={{ borderColor: isDark ? '#262626' : '#e2e8f0' }}
                >
                  {mounted && (
                    <Icon
                      name={isDark ? 'light_mode' : 'dark_mode'}
                      size={24}
                      style={{ color: isDark ? '#fff' : '#0f172a' }}
                    />
                  )}
                </button>
              </div>

              <Link
                href={loginBtn.href}
                target="_blank"
                className="mt-auto w-full py-4 text-center rounded-xl font-bold text-lg"
                style={{
                  backgroundColor: isDark
                    ? loginBtn.darkBackground || '#ffffff'
                    : loginBtn.lightBackground || '#0f172a',
                  color: isDark ? loginBtn.darkText || '#0f172a' : loginBtn.lightText || '#ffffff',
                }}
              >
                Login to Dashboard
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

const Tabs = ({ tabs, isDark }: { tabs: any[]; isDark: boolean }) => {
  const [selected, setSelected] = useState<number | null>(null)
  const [dir, setDir] = useState<null | 'l' | 'r'>(null)

  const handleSetSelected = (val: number | null) => {
    if (typeof selected === 'number' && typeof val === 'number') {
      setDir(selected > val ? 'r' : 'l')
    } else if (val === null) {
      setDir(null)
    }

    setSelected(val)
  }

  return (
    <div onMouseLeave={() => handleSetSelected(null)} className="relative flex h-fit gap-2">
      {tabs.map((t) => {
        if (!t.Component) {
          return (
            <Link
              key={t.id}
              href={t.href}
              className="flex items-center gap-1 rounded-full px-3 py-1.5 text-sm transition-colors"
              style={{
                color: isDark ? '#94a3b8' : '#64748b',
              }}
              onMouseEnter={() => handleSetSelected(null)}
            >
              {t.title}
            </Link>
          )
        }
        return (
          <Tab
            key={t.id}
            selected={selected}
            handleSetSelected={handleSetSelected}
            tab={t.id}
            href={t.href}
            isDark={isDark}
          >
            {t.title}
          </Tab>
        )
      })}

      <AnimatePresence>
        {selected && <Content tabs={tabs} dir={dir} selected={selected} isDark={isDark} />}
      </AnimatePresence>
    </div>
  )
}

const Tab = ({
  children,
  tab,
  handleSetSelected,
  selected,
  href,
  isDark,
}: {
  children: ReactNode
  tab: number
  handleSetSelected: (val: number | null) => void
  selected: number | null
  href: string
  isDark: boolean
}) => {
  return (
    <Link
      href={href}
      id={`shift-tab-${tab}`}
      onMouseEnter={() => handleSetSelected(tab)}
      onClick={() => handleSetSelected(null)}
      className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-sm transition-colors`}
      style={{
        backgroundColor:
          selected === tab ? (isDark ? 'rgba(255,255,255,0.1)' : '#f1f5f9') : 'transparent',
        color: selected === tab ? (isDark ? '#ffffff' : '#0f172a') : isDark ? '#94a3b8' : '#64748b',
      }}
    >
      <span>{children}</span>
      <Icon
        name="expand_more"
        size={16}
        className={`transition-transform ${selected === tab ? 'rotate-180' : ''}`}
      />
    </Link>
  )
}

const Content = ({
  selected,
  dir,
  isDark,
  tabs,
}: {
  selected: number | null
  dir: null | 'l' | 'r'
  isDark: boolean
  tabs: any[]
}) => {
  const [left, setLeft] = useState(0)

  useEffect(() => {
    if (selected) {
      const el = document.getElementById(`shift-tab-${selected}`)
      if (el) {
        setLeft(el.offsetLeft + el.offsetWidth / 2)
      }
    }
  }, [selected])

  return (
    <motion.div
      id="overlay-content"
      initial={{
        opacity: 0,
        y: 8,
      }}
      animate={{
        opacity: 1,
        y: 0,
        left,
      }}
      exit={{
        opacity: 0,
        y: 8,
      }}
      className="absolute top-[calc(100%_+_24px)] w-96 rounded-lg p-4 border shadow-xl -translate-x-1/2"
      style={{
        backgroundColor: isDark ? '#171717' : '#ffffff',
        borderColor: isDark ? '#262626' : '#e2e8f0',
      }}
    >
      <Bridge />
      <Nub isDark={isDark} />

      {tabs.map((t) => {
        if (!t.Component) return null
        return (
          <div className="overflow-hidden" key={t.id}>
            {selected === t.id && (
              <motion.div
                initial={{
                  opacity: 0,
                  x: dir === 'l' ? 100 : dir === 'r' ? -100 : 0,
                }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
              >
                <t.Component isDark={isDark} />
              </motion.div>
            )}
          </div>
        )
      })}
    </motion.div>
  )
}

const Bridge = () => <div className="absolute -top-[24px] left-0 right-0 h-[24px]" />

const Nub = ({ isDark }: { isDark: boolean }) => {
  return (
    <span
      style={{
        clipPath: 'polygon(0 0, 100% 0, 50% 50%, 0% 100%)',
        backgroundColor: isDark ? '#171717' : '#ffffff',
        borderColor: isDark ? '#262626' : '#e2e8f0',
      }}
      className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-tl border-t border-l"
    />
  )
}

const FeaturesMenu = ({ isDark }: { isDark: boolean }) => {
  const items = [
    { name: 'Smart Inventory', href: '/features/smart-inventory', icon: 'inventory_2' },
    { name: 'IRD Billing', href: '/features/ird-billing', icon: 'receipt_long' },
    { name: 'Digital QR Menu', href: '/features/qr-menu', icon: 'qr_code_2' },
    { name: 'Real-time Reports', href: '/features/reports', icon: 'bar_chart' },
  ]

  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group flex flex-col gap-1 p-2 rounded-lg transition-colors hover:bg-slate-100 dark:hover:bg-white/5"
          >
            <div className="flex items-center gap-2">
              <Icon
                name={item.icon}
                size={18}
                className="text-gray-400 group-hover:text-primary transition-colors"
              />
              <span
                className="text-sm font-medium"
                style={{ color: isDark ? '#e5e5e5' : '#1e293b' }}
              >
                {item.name}
              </span>
            </div>
          </Link>
        ))}
      </div>

      <Link
        href="/features"
        className="ml-auto mt-4 flex items-center gap-1 text-sm text-primary w-fit hover:underline pt-2 border-t border-dashed border-gray-200 dark:border-gray-800"
      >
        <span>View all features</span>
        <Icon name="arrow_forward" size={16} />
      </Link>
    </div>
  )
}

const Blog = ({ isDark }: { isDark: boolean }) => {
  return (
    <div>
      <div className="grid grid-cols-2 gap-2">
        <Link href="/blog/restaurant-trends-2024">
          <div className="mb-2 h-14 w-full rounded bg-slate-200 dark:bg-slate-800 flex items-center justify-center overflow-hidden relative">
            <Image
              src="https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=600&auto=format&fit=crop"
              alt="Trends"
              fill
              className="object-cover opacity-80 hover:opacity-100 transition-opacity"
            />
          </div>
          <h4 className={`mb-0.5 text-sm font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Restaurant Trends 2024
          </h4>
          <p className={`text-xs ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
            Top 5 trends shaping the food industry in Nepal.
          </p>
        </Link>
        <Link href="/blog/optimize-inventory">
          <div className="mb-2 h-14 w-full rounded bg-slate-200 dark:bg-slate-800 flex items-center justify-center overflow-hidden relative">
            <Image
              src="https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=600&auto=format&fit=crop"
              alt="Inventory"
              fill
              className="object-cover opacity-80 hover:opacity-100 transition-opacity"
            />
          </div>
          <h4 className={`mb-0.5 text-sm font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Optimize Inventory
          </h4>
          <p className={`text-xs ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
            How to reduce waste and increase profit.
          </p>
        </Link>
      </div>
      <Link
        href="/blog"
        className="ml-auto mt-4 flex items-center gap-1 text-sm text-primary w-fit hover:underline"
      >
        <span>View all posts</span>
        <Icon name="arrow_forward" size={16} />
      </Link>
    </div>
  )
}

const CompanyMenu = ({ isDark }: { isDark: boolean }) => {
  const items = [
    { name: 'Team', href: '/team', icon: 'group', desc: 'Meet the people behind Yummy' },
    { name: 'Help Center', href: '/help', icon: 'help', desc: 'Get support and assistance' },
    { name: 'FAQ', href: '/faq', icon: 'quiz', desc: 'Common questions answered' },
  ]

  return (
    <div className="w-[340px]">
      <div className="grid gap-2">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group flex items-start gap-3 p-3 rounded-lg transition-colors hover:bg-slate-100 dark:hover:bg-white/5"
          >
            <div className="mt-1 flex items-center justify-center h-8 w-8 rounded-full bg-slate-50 dark:bg-white/5 group-hover:bg-white dark:group-hover:bg-white/10 shrink-0">
              <Icon
                name={item.icon}
                size={20}
                className="text-gray-500 group-hover:text-primary transition-colors"
              />
            </div>
            <div>
              <span
                className="block text-sm font-semibold mb-0.5"
                style={{ color: isDark ? '#e5e5e5' : '#1e293b' }}
              >
                {item.name}
              </span>
              <span className="block text-xs" style={{ color: isDark ? '#a3a3a3' : '#64748b' }}>
                {item.desc}
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div
        className="mt-4 pt-3 flex items-center gap-6 border-t border-dashed"
        style={{ borderColor: isDark ? '#262626' : '#e2e8f0' }}
      >
        <Link
          href="/privacy-policy"
          className="text-xs hover:text-primary transition-colors"
          style={{ color: isDark ? '#a3a3a3' : '#64748b' }}
        >
          Privacy Policy
        </Link>
        <Link
          href="/terms-and-conditions"
          className="text-xs hover:text-primary transition-colors"
          style={{ color: isDark ? '#a3a3a3' : '#64748b' }}
        >
          Terms of Service
        </Link>
        <Link
          href="/delete-account"
          className="text-xs hover:text-primary transition-colors"
          style={{ color: isDark ? '#a3a3a3' : '#64748b' }}
        >
          Delete Account
        </Link>
      </div>
    </div>
  )
}
