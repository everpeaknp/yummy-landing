'use client'

import React from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { useTheme } from '@/hooks/useTheme'
import { useState, useEffect, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  getPricingPage,
  type PricingPageData,
  type PricingFaq,
  useRefetchOnFocus,
} from '@/lib/api'
import { InlineHTMLContent } from '@/components/ui/HTMLContent'
import { Icon } from '@/components/ui/Icon'
import { 
  normalPlans, 
  enterprisePlan, 
  getPlanPrice, 
  type Plan, 
  type BillingPeriod,
  type PlanFeature,
  type PlanTier
} from '@/lib/pricingPlans'

const fallbackFaqs: PricingFaq[] = [
  {
    question: 'Can I switch plans later?',
    answer:
      'Absolutely! You can upgrade or downgrade your plan at any time. If you upgrade, the prorated amount will be charged.',
    order: 1,
  },
  {
    question: 'Is there a setup fee?',
    answer:
      'No, there are no hidden setup fees. You can start with our Free plan and upgrade only when you need more features. Plus, installation is free if you subscribe before February!',
    order: 2,
  },
  {
    question: 'Do I need to buy specific hardware?',
    answer:
      'Not necessarily. Yummy works on any device with a browser – including iPads, Android tablets, and laptops. We do recommend thermal printers for KOTs.',
    order: 3,
  },
  {
    question: 'Is my data secure?',
    answer:
      'Yes, we use bank-grade encryption to protect your data. Your business information is backed up daily and stored securely on cloud servers.',
    order: 4,
  },
]

// ============================================
// SHARED COMPONENTS - Used by ALL cards
// ============================================

interface FeatureRowProps {
  icon: 'check' | 'close';
  text: string;
  included: boolean;
  isDark: boolean;
}

function FeatureRow({ icon, text, included, isDark }: FeatureRowProps) {
  return (
    <li className="flex items-center gap-3">
      <span
        className="flex-shrink-0 flex items-center justify-center rounded-full"
        style={{
          width: '20px',
          height: '20px',
          backgroundColor: included 
            ? (isDark ? 'rgba(34, 197, 94, 0.2)' : 'rgba(34, 197, 94, 0.15)')
            : (isDark ? 'rgba(239, 68, 68, 0.2)' : 'rgba(239, 68, 68, 0.15)'),
        }}
      >
        <Icon
          name={icon}
          size={14}
          style={{
            color: included ? '#22c55e' : '#ef4444',
          }}
        />
      </span>
      <span
        className={`text-sm text-left flex-1 ${!included ? 'line-through opacity-70' : ''}`}
        style={{
          color: isDark ? '#e2e8f0' : '#334155',
        }}
      >
        {text}
      </span>
    </li>
  );
}

interface PriceBlockProps {
  oldPrice?: number;
  newPrice: number;
  period: string;
  savePercent?: number;
  isDark: boolean;
  showLimitedOffer?: boolean; // New prop to control Limited Offer badge
  renewalPrice?: number; // Renewal price (e.g., 12000 for Pro)
  renewalDiscount?: number; // Renewal discount percentage (e.g., 40 for Pro)
}

function PriceBlock({ oldPrice, newPrice, period, savePercent, isDark, showLimitedOffer = true, renewalPrice, renewalDiscount }: PriceBlockProps) {
  // Determine if we need smaller font for large numbers (5+ digits)
  const isLargeNumber = newPrice >= 10000;
  
  return (
    <div className="mb-6" style={{ minHeight: '200px' }}>
      {/* Limited Offer Badge - only show if showLimitedOffer is true */}
      <div style={{ minHeight: '26px' }} className="mb-2 flex justify-center">
        {showLimitedOffer && (
          <div
            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide"
            style={{
              background: 'linear-gradient(135deg, #ff6929 0%, #e55e24 100%)',
              color: '#ffffff',
              boxShadow: '0 2px 8px rgba(255, 105, 41, 0.3)',
            }}
          >
            ⚡ Limited Offer
          </div>
        )}
      </div>

      {/* Old price with arrow */}
      <div style={{ minHeight: '32px' }} className="mb-2">
        {oldPrice && (
          <div className="flex items-center gap-2 justify-center">
            <span 
              className="text-xl font-bold line-through"
              style={{ color: isDark ? '#ef4444' : '#dc2626' }}
            >
              Rs. {oldPrice.toLocaleString()}
            </span>
            <Icon name="trending-down" size={20} style={{ color: '#22c55e' }} />
          </div>
        )}
      </div>

      {/* Current price */}
      <div className="mb-3">
        {newPrice > 0 ? (
          <div className="flex items-baseline justify-center flex-nowrap">
            <span 
              className={`${isLargeNumber ? 'text-3xl' : 'text-4xl'} font-black whitespace-nowrap`}
              style={{ color: isDark ? '#ffffff' : '#0f172a' }}
            >
              Rs. {newPrice.toLocaleString()}
            </span>
            <span 
              className="text-sm font-semibold ml-1 whitespace-nowrap"
              style={{ color: isDark ? '#a3a3a3' : '#64748b' }}
            >
              {period}
            </span>
          </div>
        ) : (
          <div className="flex items-baseline justify-center flex-nowrap">
            <span 
              className="text-4xl font-black whitespace-nowrap"
              style={{ color: isDark ? '#ffffff' : '#0f172a' }}
            >
              Rs. 0
            </span>
            <span 
              className="text-sm font-semibold ml-1 whitespace-nowrap"
              style={{ color: isDark ? '#a3a3a3' : '#64748b' }}
            >
              /Forever
            </span>
          </div>
        )}
      </div>

      {/* Next renewal line - only show for Pro and Premium */}
      {renewalPrice && renewalDiscount && (
        <div className="mb-2 flex justify-between items-center px-2">
          <span 
            className="text-sm font-medium"
            style={{ color: isDark ? '#94a3b8' : '#64748b' }}
          >
            Next renewal: Rs. {renewalPrice.toLocaleString()}/yr
          </span>
          <span 
            className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold"
            style={{
              background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
              color: '#ffffff',
            }}
          >
            {renewalDiscount}% OFF
          </span>
        </div>
      )}

      {/* Save badge */}
      <div style={{ minHeight: '44px' }} className="flex justify-center">
        {savePercent && (
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg shadow-lg"
            style={{
              background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
              minWidth: '140px',
            }}
            animate={{
              boxShadow: [
                '0 4px 14px 0 rgba(34, 197, 94, 0.39)',
                '0 6px 20px 0 rgba(34, 197, 94, 0.5)',
                '0 4px 14px 0 rgba(34, 197, 94, 0.39)',
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <Icon name="arrow-down" size={16} style={{ color: '#ffffff' }} />
            <span className="text-base font-bold text-white uppercase tracking-wide">
              SAVE {savePercent}%
            </span>
          </motion.div>
        )}
      </div>
    </div>
  );
}

const fallbackData: Partial<PricingPageData> = {
  title: 'Simple, Transparent Pricing',
  subtitle: 'Choose the plan that fits your business stage. No hidden fees, cancel anytime.',
  toggle: { monthlyLabel: 'Monthly', yearlyLabel: 'Yearly', savingsLabel: 'SAVE 33%' },
  promotionBanner: {
    icon: 'celebration',
    text: 'Get a POS Printer Free At Just',
    highlightText: 'Rs. 24,999/year',
  },
}

function parsePrice(value: string | null | undefined, field: string, plan: string): number {
  if (!value || /^(free|custom)$/i.test(value.trim())) return 0

  const amount = value.replace(/,/g, '').match(/-?\d+(?:\.\d+)?/)
  if (!amount) throw new Error(`Invalid ${field} for pricing plan "${plan}": ${value}`)
  return Number(amount[0])
}

export function Pricing() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [isAnnual, setIsAnnual] = useState(true)
  const [activeTab, setActiveTab] = useState<'restaurant' | 'enterprise'>('restaurant')
  const [renderTab, setRenderTab] = useState<'restaurant' | 'enterprise'>('restaurant')

  useEffect(() => {
    const timer = setTimeout(() => {
      setRenderTab(activeTab)
    }, 250)
    return () => clearTimeout(timer)
  }, [activeTab])

  const [data, setData] = useState<Partial<PricingPageData>>(fallbackData)
  const [faqs, setFaqs] = useState(fallbackFaqs)

  const fetchData = useCallback(async () => {
    try {
      const apiData = await getPricingPage()
      setData(apiData)

      if (apiData.faqs) {
        setFaqs(apiData.faqs)
      }
    } catch (error) {
      // Silently use fallback data - error already logged by API client
      if (process.env.NODE_ENV === 'development') {
        console.log('[Pricing] Using fallback data due to API unavailability')
      }
      // Keep fallback data
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  // Note: Removed useRefetchOnFocus to prevent excessive API calls

  const toggle = data.toggle || fallbackData.toggle!
  const promo = data.promotionBanner || fallbackData.promotionBanner!
  const countries = [
    ['au', 'Australia'], ['pk', 'Pakistan'], ['us', 'USA'], ['my', 'Malaysia'],
    ['mm', 'Myanmar'], ['jp', 'Japan'], ['it', 'Italy'], ['gb', 'UK'],
    ['in', 'India'], ['th', 'Thailand'], ['np', 'Nepal'],
  ] as const

  // Memoize derived data - only recalculate when data or isAnnual changes
  const plansToDisplay = useMemo(() => {
    // Use API plans if available, otherwise fall back to hardcoded normalPlans
    // Transform API data structure to match Plan type from pricingPlans.ts
    return (data.plans && data.plans.length > 0) 
      ? data.plans.filter(apiPlan => apiPlan.planType === 'standard').map(apiPlan => {
          const yearlyAmount = parsePrice(apiPlan.priceYearly, 'yearly price', apiPlan.name)
          const monthlyAmount = parsePrice(apiPlan.priceMonthly, 'monthly price', apiPlan.name)
          const originalYearlyAmount = apiPlan.originalPriceYearly
            ? parsePrice(apiPlan.originalPriceYearly, 'original yearly price', apiPlan.name)
            : undefined
          const originalMonthlyAmount = apiPlan.originalPriceMonthly
            ? parsePrice(apiPlan.originalPriceMonthly, 'original monthly price', apiPlan.name)
            : undefined
          
          // Format display labels with "Rs." prefix
          const formatPrice = (value: string, amount: number) => {
            if (/^(free|custom)$/i.test(value.trim())) return value
            if (amount === 0) return 'Rs. 0';
            return `Rs. ${amount.toLocaleString('en-NP', { maximumFractionDigits: 0 })}`;
          };
          
          // Match plan by name to get hardcoded features from pricingPlans.ts
          const planId = apiPlan.name.toLowerCase().replace(/\s+/g, '-') as PlanTier;
          const hardcodedPlan = normalPlans.find(p => p.id === planId);
          
          return {
            id: planId,
            name: apiPlan.name,
            // Strip HTML tags from description if present (e.g., <p></p>)
            description: apiPlan.description?.replace(/<\/?[^>]+(>|$)/g, '') || '',
            prices: [
              {
                period: 'yearly' as BillingPeriod,
                amount: yearlyAmount,
                displayLabel: formatPrice(apiPlan.priceYearly, yearlyAmount),
                originalAmount: originalYearlyAmount,
              },
              {
                period: 'monthly' as BillingPeriod,
                amount: monthlyAmount,
                displayLabel: formatPrice(apiPlan.priceMonthly, monthlyAmount),
                originalAmount: originalMonthlyAmount,
              },
            ],
            // Use detailed hardcoded features from pricingPlans.ts as source of truth
            // Fall back to API features only if no hardcoded plan is found
            features: hardcodedPlan?.features || apiPlan.features?.map(f => ({ text: f.text, included: true })) || [],
            isPopular: apiPlan.isPopular || false,
            ctaText: apiPlan.ctaText || 'Get Started',
            ctaHref: apiPlan.ctaHref || 'https://app.yummyever.com/',
            order: apiPlan.order || 0,
          };
        })
      : normalPlans;
  }, [data.plans]);

  // Memoize visiblePlans - only recalculate when plansToDisplay or isAnnual changes
  const visiblePlans = useMemo(() => {
    return plansToDisplay
      .map(plan => {
        const price = isAnnual
          ? getPlanPrice(plan, 'yearly')
          : getPlanPrice(plan, 'monthly') || getPlanPrice(plan, '6month') || getPlanPrice(plan, 'yearly')
        return { ...plan, currentPrice: price };
      });
  }, [plansToDisplay, isAnnual]);

  // Memoize toggle handlers to prevent recreation on every render
  const handleRestaurantClick = useCallback(() => {
    setActiveTab('restaurant')
  }, [])

  const handleEnterpriseClick = useCallback(() => {
    setActiveTab('enterprise')
  }, [])

  return (
    <section
      id="pricing"
      className="py-24 relative overflow-hidden"
      style={{
        backgroundColor: isDark ? 'rgba(255,255,255,0.02)' : '#f8fafc',
        borderTop: isDark ? '1px solid rgba(255,255,255,0.05)' : '1px solid #e2e8f0',
      }}
    >
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div
          className={`absolute -top-[20%] -right-[10%] w-[600px] h-[600px] rounded-full blur-3xl opacity-5 ${
            isDark ? 'bg-orange-500' : 'bg-orange-300'
          }`}
        />
        <div
          className={`absolute top-[40%] -left-[10%] w-[500px] h-[500px] rounded-full blur-3xl opacity-5 ${
            isDark ? 'bg-blue-500' : 'bg-blue-300'
          }`}
        />
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Header */}
        <div className="mb-12">
          <h2
            className="text-4xl sm:text-5xl font-black font-display mb-6"
            style={{ color: isDark ? '#ffffff' : '#0f172a' }}
          >
            <InlineHTMLContent html={data.title || 'Simple, Transparent Pricing'} />
          </h2>
          <p
            className="text-xl mb-8 max-w-2xl mx-auto"
            style={{ color: isDark ? '#a3a3a3' : '#64748b' }}
          >
            <InlineHTMLContent
              html={
                data.subtitle ||
                'Choose the plan that fits your business stage. No hidden fees, cancel anytime.'
              }
            />
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 max-w-5xl mx-auto mb-8 overflow-hidden">
              <div className="flex-shrink-0 text-sm font-medium text-slate-500 dark:text-slate-400">
                Trusted by 100+ restaurants worldwide
              </div>
              <div className="hidden sm:block h-6 w-px flex-shrink-0 bg-slate-200 dark:bg-slate-700" />
              <div className="marquee-container min-w-0 overflow-hidden">
                <div className="marquee-content">
                  {[...Array(2)].map((_, setIndex) => (
                    <div key={setIndex} className="flex items-center gap-4">
                      {countries.map(([code, name]) => (
                        <div key={`${setIndex}-${code}`} className="flex items-center gap-2 px-3 py-1.5 rounded-full whitespace-nowrap text-xs font-medium text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                          <img src={`https://flagcdn.com/w40/${code}.png`} alt={`${name} flag`} width="20" height="15" className="flex-shrink-0 rounded-sm" />
                          <span>{name}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
          </div>

          {/* Plan Type Toggle Switcher */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-12"
          >
            <div className="inline-flex gap-8 border-b border-slate-200 dark:border-white/10">
              <button
                onClick={handleRestaurantClick}
                aria-pressed={activeTab === 'restaurant'}
                className={`px-2 pb-3 text-sm font-semibold border-b-2 -mb-px transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ea580c] ${activeTab === 'restaurant' ? 'text-[#ea580c] border-[#ea580c]' : 'text-slate-500 dark:text-slate-400 border-transparent hover:text-slate-900 dark:hover:text-white'}`}
              >
                Standard
              </button>
              <button
                onClick={handleEnterpriseClick}
                aria-pressed={activeTab === 'enterprise'}
                className={`px-2 pb-3 text-sm font-semibold border-b-2 -mb-px transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ea580c] ${activeTab === 'enterprise' ? 'text-[#ea580c] border-[#ea580c]' : 'text-slate-500 dark:text-slate-400 border-transparent hover:text-slate-900 dark:hover:text-white'}`}
              >
                Enterprise
              </button>
            </div>
          </motion.div>

          {/* Standard plan controls */}
          {activeTab === 'restaurant' && (
          <div className="flex flex-col items-center justify-center gap-4 mb-10">
            <div className="flex items-center justify-center gap-4">
              <span
                className={`text-sm font-medium ${
                  !isAnnual
                    ? isDark
                      ? 'text-white'
                      : 'text-slate-900'
                    : isDark
                    ? 'text-neutral-500'
                    : 'text-slate-500'
                }`}
              >
                {toggle.monthlyLabel}
              </span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className="relative w-16 h-8 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                style={{ backgroundColor: isAnnual ? '#ff6929' : isDark ? '#404040' : '#cbd5e1' }}
                aria-label="Toggle pricing period"
              >
                <motion.div
                  className="absolute top-1 left-1 w-6 h-6 rounded-full bg-white shadow-sm"
                  animate={{ x: isAnnual ? 32 : 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              </button>
              <div className="flex items-center gap-2">
                <span
                  className={`text-sm font-medium ${
                    isAnnual
                      ? isDark
                        ? 'text-white'
                        : 'text-slate-900'
                      : isDark
                      ? 'text-neutral-500'
                      : 'text-slate-500'
                  }`}
                >
                  {toggle.yearlyLabel}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400">
                  {toggle.savingsLabel}
                </span>
              </div>
            </div>

            {/* Installation Offer Badge - flat matte finish */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="relative cursor-default"
            >
              <div className="relative px-6 py-2.5 bg-white dark:bg-[#0a0a0a] ring-1 ring-gray-200 dark:ring-white/10 rounded-full flex items-center gap-3 shadow-sm">
                <span 
                  className="flex items-center justify-center w-6 h-6 rounded-full" 
                  style={{ 
                    backgroundColor: isDark ? 'rgba(255, 105, 41, 0.2)' : 'rgba(255, 105, 41, 0.1)',
                    color: '#ff6929'
                  }}
                >
                  <Icon name={promo.icon} size={24} />
                </span>
                <span
                  className="text-sm font-medium"
                  style={{ color: isDark ? '#e5e5e5' : '#334155' }}
                >
                  {promo.text}{' '}
                  <span className="font-bold" style={{ color: '#ff6929' }}>
                    {promo.highlightText}
                  </span>
                </span>
              </div>
            </motion.div>
          </div>
          )}
        </div>

        {/* SECTION 1: NORMAL PLANS */}
        <div className="flex flex-col mb-20">
          {/* Cards Container - shared by both states */}
          <div className="order-1 relative w-full grid grid-cols-1 grid-rows-1 items-stretch" style={{ minHeight: '600px' }}>
            {/* Restaurant Plans (Business) */}
            <div
              className="w-full"
              style={{
                gridArea: '1 / 1 / 2 / 2',
                opacity: activeTab === 'restaurant' ? 1 : 0,
                pointerEvents: activeTab === 'restaurant' ? 'auto' : 'none',
                transform: `translateY(${activeTab === 'restaurant' ? '0px' : '8px'})`,
                transition: 'opacity 250ms ease-in-out, transform 250ms ease-in-out',
                zIndex: activeTab === 'restaurant' ? 1 : 0,
                visibility: activeTab === 'restaurant' ? 'visible' : 'hidden',
              }}
            >
              <div className="w-full max-w-[1548px] mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-stretch">
                {visiblePlans.map((plan) => (
                  <PlanCard
                    key={plan.id}
                    plan={plan}
                    currentPrice={plan.currentPrice!}
                    isAnnual={isAnnual}
                    isDark={isDark}
                    data={data}
                  />
                ))}
              </div>
            </div>

            {/* Enterprise Card - matching Restaurant Plans grid width */}
            <div
              className="w-full"
              style={{
                gridArea: '1 / 1 / 2 / 2',
                opacity: activeTab === 'enterprise' ? 1 : 0,
                pointerEvents: activeTab === 'enterprise' ? 'auto' : 'none',
                transform: `translateY(${activeTab === 'enterprise' ? '0px' : '8px'})`,
                transition: 'opacity 250ms ease-in-out, transform 250ms ease-in-out',
                zIndex: activeTab === 'enterprise' ? 1 : 0,
                visibility: activeTab === 'enterprise' ? 'visible' : 'hidden',
                maxWidth: '64rem',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              <EnterprisePlanCard isDark={isDark} data={data} />
            </div>
          </div>
        </div>

        {/* Remove old separate Enterprise section */}
        
        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="text-3xl font-bold mb-4"
              style={{ color: isDark ? '#ffffff' : '#0f172a' }}
            >
              Frequently Asked Questions
            </h2>
            <p style={{ color: isDark ? '#a3a3a3' : '#64748b' }}>
              Have questions? We&apos;re here to help.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 text-left">
            {faqs.length > 0 ? (
              faqs
                .sort((a, b) => a.order - b.order)
                .map((faq, i) => (
                  <div key={i} className="group">
                    <h4
                      className="flex items-start gap-3 text-lg font-bold mb-3"
                      style={{
                        color: isDark
                          ? (data.faqColors as any)?.questionDark || '#f1f5f9'
                          : (data.faqColors as any)?.questionLight || '#1e293b',
                      }}
                    >
                      <Icon
                        name="help"
                        size={20}
                        className="mt-0.5 transition-opacity cursor-help"
                        style={{
                          color: (data.faqColors as any)?.iconColorDefault || '#9ca3af',
                        }}
                      />
                      {faq.question}
                    </h4>
                    <div
                      className="pl-8 text-base leading-relaxed"
                      style={{
                        color: isDark
                          ? (data.faqColors as any)?.answerDark || '#94a3b8'
                          : (data.faqColors as any)?.answerLight || '#64748b',
                      }}
                    >
                      <InlineHTMLContent html={faq.answer} />
                    </div>
                  </div>
                ))
            ) : (
              <div className="col-span-2 text-center py-8" style={{ color: isDark ? '#94a3b8' : '#64748b' }}>
                No FAQs available
              </div>
            )}
          </div>

          <div className="mt-12 text-center relative z-50">
            <button
              onClick={() => {
                const plane = document.getElementById('flying-plane')
                if (plane) {
                  plane.style.display = 'block'
                  plane.style.animation = 'flyAcross 1.5s ease-in-out forwards'
                  setTimeout(() => {
                    window.location.href = '/faq'
                  }, 1200)
                }
              }}
              className="group relative inline-flex items-center gap-2 px-8 py-3 rounded-full bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 hover:border-orange-500 dark:hover:border-orange-500 transition-colors shadow-sm"
            >
              <span className="font-bold text-gray-700 dark:text-gray-200">View more FAQs</span>
              <Icon
                name="arrow_forward"
                size={24}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>

            <div
              id="flying-plane"
              className="fixed top-1/2 left-[-100px] z-[9999] pointer-events-none hidden"
              style={{ fontSize: '4rem' }}
            >
              ✈️
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Plan Card Component - REBUILT with shared components
function PlanCard({ 
  plan, 
  currentPrice, 
  isAnnual, 
  isDark, 
  data,
  animationDelay = 0
}: { 
  plan: Plan & { currentPrice?: any }
  currentPrice: any
  isAnnual: boolean
  isDark: boolean
  data: Partial<PricingPageData>
  animationDelay?: number
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Premium plan is yearly-only - force yearly price if no shorter option exists
  const isPremiumPlan = plan.id === 'premium';
  const isYearlyOnly = isPremiumPlan || (!getPlanPrice(plan, 'monthly') && !getPlanPrice(plan, '6month'));
  
  // Use yearly price for Premium even when toggle is on 6-month
  const displayPrice = (isYearlyOnly && !isAnnual) 
    ? getPlanPrice(plan, 'yearly') 
    : currentPrice;
  
  const hasDiscount = displayPrice?.originalAmount && displayPrice.originalAmount > displayPrice.amount;

  const getBorderColor = () => {
    if (plan.isPopular) {
      return isDark ? '#ea580c' : '#ea580c';
    }
    return isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)';
  };

  const getBackground = () => {
    return isDark ? '#0f0f0f' : '#ffffff';
  };

  // Calculate save percentage
  const savePercent = hasDiscount 
    ? Math.round(((displayPrice.originalAmount - displayPrice.amount) / displayPrice.originalAmount) * 100)
    : undefined;

  // Filter to only included features (hide excluded ones)
  const includedFeatures = plan.features.filter(feature => 
    feature.included && 
    !feature.text.toLowerCase().includes('no ') &&
    !feature.text.toLowerCase().includes('not included')
  );
  const visibleFeatures = includedFeatures.slice(0, 8);
  const remainingCount = includedFeatures.length - visibleFeatures.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: animationDelay }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="flex flex-col h-full p-8 rounded-[2rem] relative overflow-visible w-full"
      style={{
        background: getBackground(),
        border: `2px solid ${getBorderColor()}`,
        boxShadow: isHovered
          ? (plan.isPopular 
              ? '0 20px 40px -8px rgba(234, 88, 12, 0.25)' 
              : (isDark ? '0 12px 32px -4px rgba(0,0,0,0.5)' : '0 12px 32px -4px rgba(0,0,0,0.12)'))
          : (plan.isPopular
              ? '0 10px 24px -4px rgba(234, 88, 12, 0.15)'
              : (isDark ? '0 4px 12px -2px rgba(0,0,0,0.3)' : '0 4px 12px -2px rgba(0,0,0,0.08)')),
        transition: 'all 0.3s ease-out',
        boxSizing: 'border-box',
      }}
    >
      {/* Most Popular Badge - overlapping top border */}
      {plan.isPopular && (
        <div
          className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide"
          style={{
            background: '#ea580c',
            color: '#ffffff',
            boxShadow: '0 4px 12px rgba(234, 88, 12, 0.3)',
            zIndex: 10,
          }}
        >
          Most Popular
        </div>
      )}

      <div className="mb-8">
        <h3
          className="font-bold text-2xl mb-2"
          style={{ color: isDark ? '#ffffff' : '#0f172a' }}
        >
          {plan.name}
        </h3>
        <div className="flex items-start justify-center text-center">
          <p
            className="text-sm leading-relaxed min-h-[40px]"
            style={{ color: isDark ? '#a3a3a3' : '#64748b' }}
          >
            {plan.description}
          </p>
        </div>
      </div>

      <div 
        className="mb-8 p-6 -mx-2 rounded-2xl flex flex-col justify-center"
        style={{
          backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#F5F5F5',
          border: isDark ? '1px solid rgba(255,255,255,0.1)' : 'none',
        }}
      >
        {/* Struck-through original price */}
        {displayPrice?.originalAmount && (
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-sm line-through decoration-orange-500 text-orange-500 font-bold">
              Rs. {displayPrice.originalAmount.toLocaleString()}
            </span>
          </div>
        )}

        {/* Main price - moderate font size that fits cleanly */}
        <div className="mb-3">
          {displayPrice?.amount && displayPrice.amount > 0 ? (
            <div className="flex items-baseline justify-center gap-1 flex-wrap">
              <span 
                className="text-2xl lg:text-3xl font-black"
                style={{ color: isDark ? '#ffffff' : '#000000' }}
              >
                Rs. {displayPrice.amount.toLocaleString()}
              </span>
              <span 
                className="text-base lg:text-lg font-medium"
                style={{ color: isDark ? '#94a3b8' : '#64748b' }}
              >
                {displayPrice?.period === 'yearly' ? '/yr' : displayPrice?.period === 'monthly' ? '/month' : displayPrice?.period === '6month' ? '/6 months' : '/Forever'}
              </span>
            </div>
          ) : (
            <div className="flex items-baseline justify-center gap-1 flex-wrap">
              <span 
                className="text-2xl lg:text-3xl font-black"
                style={{ color: isDark ? '#ffffff' : '#000000' }}
              >
                {displayPrice?.displayLabel || 'Rs. 0'}
              </span>
              <span 
                className="text-base lg:text-lg font-medium"
                style={{ color: isDark ? '#94a3b8' : '#64748b' }}
              >
                {displayPrice?.displayLabel.toLowerCase() === 'free' ? '' : '/Forever'}
              </span>
            </div>
          )}
        </div>

        {/* Billing and renewal information */}
        {isYearlyOnly && !isAnnual ? (
          // Show "Yearly plan only" note when toggle is on 6-month but plan is yearly-only
          <p className="text-xs text-center mt-2 font-medium" style={{ color: isDark ? '#94a3b8' : '#64748b' }}>
            Yearly plan only
          </p>
        ) : (
          // Show renewal info based on plan and period
          displayPrice?.amount && displayPrice.amount > 0 && displayPrice.period && (
            <div className="text-center mt-2">
              {displayPrice.period === 'yearly' ? (
                // YEARLY VIEW LOGIC
                displayPrice.renewalAmount && displayPrice.renewalAmount !== displayPrice.amount ? (
                  // Has renewal discount (Pro & Premium)
                  <div className="flex items-center justify-center gap-2 flex-wrap">
                    <p className="text-xs font-semibold" style={{ color: isDark ? '#94a3b8' : '#64748b' }}>
                      Renews at Rs. {displayPrice.renewalAmount.toLocaleString()}/yr
                    </p>
                    <span 
                      className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold whitespace-nowrap"
                      style={{
                        background: '#22c55e',
                        color: '#ffffff',
                      }}
                    >
                      {Math.round(((displayPrice.amount - displayPrice.renewalAmount) / displayPrice.amount) * 100)}% OFF
                    </span>
                  </div>
                ) : (
                  // Flat renewal rate (Basic)
                  <p className="text-xs text-green-600 dark:text-green-400 font-semibold">
                    Flat renewal rate
                  </p>
                )
              ) : (
                // 6-MONTH VIEW LOGIC - all are flat rates
                <p className="text-xs font-semibold" style={{ color: isDark ? '#94a3b8' : '#64748b' }}>
                  Flat rate, no renewal discount
                </p>
              )}
            </div>
          )
        )}
      </div>

      <div className="flex-grow mb-8">
        <ul className="space-y-4">
          {visibleFeatures.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span
                className="flex-shrink-0 flex items-center justify-center rounded-full"
                style={{
                  width: '20px',
                  height: '20px',
                  backgroundColor: isDark ? 'rgba(234, 88, 12, 0.15)' : 'rgba(234, 88, 12, 0.1)',
                }}
              >
                <Icon
                  name="check"
                  size={13}
                  style={{
                    color: '#ea580c',
                  }}
                />
              </span>
              <span
                className="text-sm flex-1 text-left"
                style={{
                  color: isDark ? '#e5e7eb' : '#1f2937',
                  lineHeight: '1.5',
                }}
              >
                {feature.text}
              </span>
            </li>
          ))}
        </ul>
        {remainingCount > 0 && (
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="mt-4 text-sm font-semibold hover:underline"
            style={{ color: '#ea580c' }}
          >
            +{remainingCount} more included capabilities
          </button>
        )}
      </div>

      {isModalOpen && (
        <FeatureModal
          planName={plan.name}
          features={includedFeatures}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      {/* CTA Button - pinned to bottom */}
      <div className="mt-auto">
        <a
          href={plan.ctaHref}
          className="block w-full py-3.5 px-6 rounded-xl font-bold text-center text-base transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
          style={
            plan.isPopular
              ? {
                  backgroundColor: '#ff6929',
                  color: '#ffffff',
                  border: '2px solid #ff6929',
                }
              : {
                  backgroundColor: isDark ? '#ffffff' : '#0f172a',
                  color: isDark ? '#0f172a' : '#ffffff',
                  border: 'none',
                }
          }
        >
          {plan.ctaText}
        </a>
      </div>
    </motion.div>
  );
}

// Enterprise Plan Card Component - Redesigned as a two-column panel
function EnterprisePlanCard({ 
  isDark, 
  data 
}: { 
  isDark: boolean
  data: Partial<PricingPageData>
}) {
  const [isHovered, setIsHovered] = useState(false);

  const getBorderColor = () => {
    return isDark ? 'rgba(255, 255, 255, 0.08)' : '#e2e8f0';
  };

  const apiEnterprisePlan = data.plans?.find(plan => plan.planType === 'enterprise');
  
  // Use API features if available, otherwise fall back to static config
  const featuresList = (apiEnterprisePlan?.features && apiEnterprisePlan.features.length > 0)
    ? apiEnterprisePlan.features.map(f => f.text)
    : enterprisePlan.features.map(f => f.text);

  const featureMidpoint = Math.ceil(featuresList.length / 2);
  const featureColumns = [featuresList.slice(0, featureMidpoint), featuresList.slice(featureMidpoint)];


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="flex flex-col max-w-5xl mx-auto p-8 md:p-10 rounded-2xl relative w-full text-left"
      style={{
        backgroundColor: isDark ? '#0f0f0f' : '#ffffff',
        border: `1px solid ${getBorderColor()}`,
        boxShadow: isHovered
          ? (isDark ? '0 12px 32px -4px rgba(0, 0, 0, 0.3)' : '0 12px 32px -4px rgba(0, 0, 0, 0.06)')
          : (isDark ? '0 4px 20px -2px rgba(0,0,0,0.3)' : '0 4px 20px -2px rgba(0,0,0,0.03)'),
        transition: 'all 0.3s ease-out',
        boxSizing: 'border-box',
      }}
    >
      <div className="flex flex-col md:flex-row md:items-center gap-6">
        <div className="flex items-center gap-4 min-w-0 flex-1">
          <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-2xl" style={{ backgroundColor: 'rgba(234, 88, 12, 0.12)' }}>
            <Icon name="building" size={32} style={{ color: '#ea580c' }} />
          </div>
          <div className="min-w-0">
            <h3 className="font-bold text-3xl font-display" style={{ color: isDark ? '#ffffff' : '#0f172a' }}>
              {apiEnterprisePlan?.name || enterprisePlan.name}
            </h3>
            <p className="mt-1 text-sm font-semibold" style={{ color: '#ea580c' }}>
              {apiEnterprisePlan?.enterpriseSubheading || 'For multi-location chains and large franchises'}
            </p>
          </div>
        </div>
        <a
          href={apiEnterprisePlan?.ctaHref || enterprisePlan.ctaHref}
          className="flex-shrink-0 inline-block py-3 px-8 rounded-xl font-bold text-center transition-all duration-200 hover:scale-[1.01] hover:shadow-md"
          style={{
            backgroundColor: isDark ? '#ffffff' : '#000000',
            color: isDark ? '#000000' : '#ffffff',
          }}
        >
          {apiEnterprisePlan?.ctaText || enterprisePlan.ctaText}
        </a>
      </div>

      <div className="mt-6 text-sm md:text-base leading-relaxed max-w-3xl" style={{ color: isDark ? '#a3a3a3' : '#64748b' }}>
        <InlineHTMLContent html={apiEnterprisePlan?.description || enterprisePlan.description} />
      </div>

      <div className="h-px my-8 bg-slate-200 dark:bg-white/10" />

      <div className="grid sm:grid-cols-2 gap-x-12 gap-y-4">
        {featureColumns.map((column, columnIndex) => (
          <ul key={columnIndex} className="space-y-4">
            {column.map((text) => (
              <li key={text} className="flex items-center gap-3">
                <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full" style={{ backgroundColor: 'rgba(234, 88, 12, 0.12)' }}>
                  <Icon name="check" size={14} style={{ color: '#ea580c' }} />
                </span>
                <span className="text-sm md:text-base" style={{ color: isDark ? '#e5e7eb' : '#334155' }}>
                  {text}
                </span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </motion.div>
  );
}

function FeatureModal({
  planName,
  features,
  onClose,
}: {
  planName: string
  features: PlanFeature[]
  onClose: () => void
}) {
  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => event.key === 'Escape' && onClose()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [onClose])

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="feature-modal-title"
        className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-8 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 mb-8">
          <h3 id="feature-modal-title" className="text-2xl font-bold text-slate-900">
            {planName} features
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close feature list"
            className="flex items-center justify-center w-9 h-9 rounded-full text-slate-600 hover:bg-slate-100"
          >
            <Icon name="close" size={20} />
          </button>
        </div>
        <ul className="grid sm:grid-cols-2 gap-x-10 gap-y-4">
          {features.map((feature) => (
            <li key={feature.text} className="flex items-start gap-3 text-sm text-slate-700">
              <span className="flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-orange-50">
                <Icon name="check" size={13} style={{ color: '#ea580c' }} />
              </span>
              {feature.text}
            </li>
          ))}
        </ul>
      </div>
    </div>,
    document.body,
  )
}
