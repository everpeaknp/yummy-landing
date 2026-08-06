'use client'

import React from 'react'
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
  type PlanFeature
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

export function Pricing() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [isAnnual, setIsAnnual] = useState(true)
  const [activeTab, setActiveTab] = useState<'restaurant' | 'enterprise'>('restaurant')
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

  // Debug FAQ data
  if (process.env.NODE_ENV === 'development') {
    console.log('[Pricing] FAQ count:', faqs.length, faqs)
  }

  // Memoize derived data - only recalculate when data or isAnnual changes
  const plansToDisplay = useMemo(() => {
    // Use API plans if available, otherwise fall back to hardcoded normalPlans
    // Transform API data structure to match Plan type from pricingPlans.ts
    return (data.plans && data.plans.length > 0) 
      ? data.plans.map(apiPlan => {
          // Parse yearly price - extract only the first number before any slashes or text
          const yearlyMatch = apiPlan.priceYearly.match(/Rs\.\s*([\d,]+)/);
          const yearlyAmount = yearlyMatch ? parseInt(yearlyMatch[1].replace(/,/g, ''), 10) : 0;
          
          // Parse 6-month price - extract only the first number before any slashes or text
          const monthlyMatch = apiPlan.priceMonthly.match(/Rs\.\s*([\d,]+)/);
          const monthlyAmount = monthlyMatch ? parseInt(monthlyMatch[1].replace(/,/g, ''), 10) : 0;
          
          // Parse original prices if present
          const originalYearlyAmount = apiPlan.originalPriceYearly 
            ? parseInt(apiPlan.originalPriceYearly.replace(/[^0-9]/g, ''), 10)
            : undefined;
          const originalMonthlyAmount = apiPlan.originalPriceMonthly 
            ? parseInt(apiPlan.originalPriceMonthly.replace(/[^0-9]/g, ''), 10)
            : undefined;
          
          return {
            id: apiPlan.name.toLowerCase().replace(/\s+/g, '-') as any,
            name: apiPlan.name,
            // Strip HTML tags from description if present (e.g., <p></p>)
            description: apiPlan.description.replace(/<\/?[^>]+(>|$)/g, ''),
            prices: [
              {
                period: 'yearly' as BillingPeriod,
                amount: yearlyAmount,
                displayLabel: apiPlan.priceYearly,
                originalAmount: originalYearlyAmount,
              },
              {
                period: '6month' as BillingPeriod,
                amount: monthlyAmount,
                displayLabel: apiPlan.priceMonthly,
                originalAmount: originalMonthlyAmount,
              },
            ],
            features: apiPlan.features.map(f => ({ text: f.text, included: true })),
            isPopular: apiPlan.isPopular,
            ctaText: apiPlan.ctaText,
            ctaHref: apiPlan.ctaHref,
            order: apiPlan.order,
          };
        })
      : normalPlans;
  }, [data.plans]);

  // Memoize visiblePlans - only recalculate when plansToDisplay or isAnnual changes
  const visiblePlans = useMemo(() => {
    return plansToDisplay.map(plan => {
      const price = getPlanPrice(plan, isAnnual ? 'yearly' : '6month') || getPlanPrice(plan, 'yearly');
      return { ...plan, currentPrice: price };
    });
  }, [plansToDisplay, isAnnual]);

  // Memoize toggle handlers to prevent recreation on every render
  const handleRestaurantClick = useCallback(() => {
    console.time('Toggle to Restaurant')
    setActiveTab('restaurant')
    requestAnimationFrame(() => {
      setTimeout(() => console.timeEnd('Toggle to Restaurant'), 500)
    })
  }, [])

  const handleEnterpriseClick = useCallback(() => {
    console.time('Toggle to Enterprise')
    setActiveTab('enterprise')
    requestAnimationFrame(() => {
      setTimeout(() => console.timeEnd('Toggle to Enterprise'), 500)
    })
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

          {/* Toggle */}
          <div className="flex flex-col items-center gap-6 mb-16">
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
        </div>

        {/* SECTION 1: NORMAL PLANS */}
        <div className="mb-20">
          <h3 
            className="text-2xl font-bold mb-8"
            style={{ color: isDark ? '#ffffff' : '#0f172a' }}
          >
            Standard Plans
          </h3>
          
          {/* Plan Type Toggle Switcher */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-12"
          >
            <div 
              className="relative inline-flex p-1 rounded-full"
              style={{
                backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(226, 232, 240, 0.5)',
                border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(226, 232, 240, 0.8)',
              }}
            >
              {/* Sliding background indicator - uses translateX for smooth premium animation */}
              <motion.div
                className="absolute top-1 bottom-1 rounded-full"
                style={{
                  backgroundColor: isDark ? '#ffffff' : '#0f172a',
                  boxShadow: isDark 
                    ? '0 4px 12px rgba(255,255,255,0.15)'
                    : '0 4px 12px rgba(0,0,0,0.15)',
                  left: '4px',
                  width: 'calc(50% - 4px)',
                }}
                animate={{
                  x: activeTab === 'restaurant' ? 0 : 'calc(100% + 4px)',
                }}
                transition={{
                  duration: 0.35,
                  ease: [0.4, 0, 0.2, 1], // Premium cubic-bezier easing
                }}
              />
              
              {/* Restaurant Plans Button */}
              <button
                onClick={handleRestaurantClick}
                className="relative z-10 px-8 py-3 rounded-full font-semibold text-sm transition-colors duration-300"
                style={{
                  color: activeTab === 'restaurant' 
                    ? isDark ? '#0f172a' : '#ffffff'
                    : isDark ? '#a3a3a3' : '#64748b',
                  transition: 'color 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                Restaurant Plans
              </button>
              
              {/* Enterprise Button */}
              <button
                onClick={handleEnterpriseClick}
                className="relative z-10 px-8 py-3 rounded-full font-semibold text-sm transition-colors duration-300"
                style={{
                  color: activeTab === 'enterprise' 
                    ? isDark ? '#0f172a' : '#ffffff'
                    : isDark ? '#a3a3a3' : '#64748b',
                  transition: 'color 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                Enterprise
              </button>
            </div>
          </motion.div>

          {/* Trust Badge - Always visible for both tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-6 mb-12"
          >
            {/* Trust Badge Pill */}
            <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500">
                <Icon name="check" size={16} style={{ color: '#ffffff' }} />
              </div>
              <span 
                className="font-semibold text-sm"
                style={{ color: isDark ? '#86efac' : '#047857' }}
              >
                Trusted by 100+ Restaurants — Nationally & Internationally
              </span>
            </div>

            {/* Global Presence Marquee */}
            <div className="w-full max-w-5xl relative overflow-hidden">
              {/* Fade masks on edges */}
              <div 
                className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
                style={{
                  background: isDark 
                    ? 'linear-gradient(to right, rgba(255,255,255,0.02) 0%, transparent 100%)'
                    : 'linear-gradient(to right, #f8fafc 0%, transparent 100%)'
                }}
              />
              <div 
                className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
                style={{
                  background: isDark 
                    ? 'linear-gradient(to left, rgba(255,255,255,0.02) 0%, transparent 100%)'
                    : 'linear-gradient(to left, #f8fafc 0%, transparent 100%)'
                }}
              />

              {/* Scrolling container */}
              <div className="marquee-container">
                <div className="marquee-content">
                  {[...Array(2)].map((_, setIndex) => (
                    <div key={setIndex} className="flex gap-4 items-center">
                      {[
                        { code: 'au', name: 'Australia' },
                        { code: 'pk', name: 'Pakistan' },
                        { code: 'us', name: 'USA' },
                        { code: 'my', name: 'Malaysia' },
                        { code: 'mm', name: 'Myanmar' },
                        { code: 'jp', name: 'Japan' },
                        { code: 'it', name: 'Italy' },
                        { code: 'gb', name: 'UK' },
                        { code: 'in', name: 'India' },
                        { code: 'th', name: 'Thailand' },
                        { code: 'np', name: 'Nepal' },
                      ].map((country, idx) => (
                        <div
                          key={`${setIndex}-${idx}`}
                          className="flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap"
                          style={{
                            backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#ffffff',
                            border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid #e2e8f0',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                          }}
                        >
                          <span 
                            className={`fi fi-${country.code} fis`}
                            style={{ 
                              width: '20px', 
                              height: '15px',
                              borderRadius: '2px',
                              display: 'inline-block',
                              backgroundSize: 'cover',
                              flexShrink: 0
                            }}
                          />
                          <span 
                            className="text-xs font-medium"
                            style={{ color: isDark ? '#d4d4d4' : '#475569' }}
                          >
                            {country.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
          {/* Cards Container - shared by both states */}
          <div>
            <AnimatePresence mode="popLayout">
              {activeTab === 'restaurant' && (
                <motion.div 
                  key="restaurant-plans"
                  className="w-full grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-stretch"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  style={{ willChange: 'opacity' }}
                  onAnimationStart={() => console.log('[Restaurant] Animation started')}
                  onAnimationComplete={() => console.log('[Restaurant] Animation complete')}
                >
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
                </motion.div>
              )}

              {/* Enterprise Card - matching Restaurant Plans grid width */}
              {activeTab === 'enterprise' && (
                <motion.div
                  key="enterprise-plan"
                  className="w-full flex justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  style={{ willChange: 'opacity' }}
                  onAnimationStart={() => console.log('[Enterprise] Animation started')}
                  onAnimationComplete={() => console.log('[Enterprise] Animation complete')}
                >
                  <div className="w-full max-w-xl">
                    <EnterprisePlanCard isDark={isDark} data={data} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
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
  
  // Premium plan is yearly-only - force yearly price if no 6-month option exists
  const isPremiumPlan = plan.id === 'premium';
  const isYearlyOnly = isPremiumPlan || !getPlanPrice(plan, '6month');
  
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: animationDelay }}
      whileHover={{ y: -4 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="flex flex-col h-full p-8 rounded-2xl relative overflow-visible w-full"
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

      {/* Plan Header - fixed height for consistent alignment */}
      <div className="mb-6 mt-2">
        <h3
          className="font-bold text-2xl lg:text-3xl mb-3 lg:mb-4"
          style={{ color: isDark ? '#ffffff' : '#0f172a' }}
        >
          {plan.name}
        </h3>
        <div 
          className="flex items-start justify-center text-center"
          style={{ minHeight: '60px' }}
        >
          <p
            className="text-sm lg:text-base leading-relaxed"
            style={{ color: isDark ? '#a3a3a3' : '#64748b' }}
          >
            {plan.description}
          </p>
        </div>
      </div>

      {/* Price Box - Gray inset with fixed height and proper padding */}
      <div 
        className="mb-6 p-6 rounded-xl flex flex-col justify-center"
        style={{
          backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#F5F5F5',
          border: isDark ? '1px solid rgba(255,255,255,0.1)' : 'none',
          minHeight: '200px',
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
          {displayPrice?.amount > 0 ? (
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
                {displayPrice.period === 'yearly' ? '/yr' : displayPrice.period === '6month' ? '/6 months' : '/Forever'}
              </span>
            </div>
          ) : (
            <div className="flex items-baseline justify-center gap-1 flex-wrap">
              <span 
                className="text-2xl lg:text-3xl font-black"
                style={{ color: isDark ? '#ffffff' : '#000000' }}
              >
                Rs. 0
              </span>
              <span 
                className="text-base lg:text-lg font-medium"
                style={{ color: isDark ? '#94a3b8' : '#64748b' }}
              >
                /Forever
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
          displayPrice?.amount > 0 && (displayPrice.period === 'yearly' || displayPrice.period === '6month') && (
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

      {/* Feature List - left-aligned with improved readability */}
      <div className="flex-grow mb-6">
        <ul className="space-y-3">
          {plan.features.map((feature, idx) => {
            const isExcluded = !feature.included || 
                               feature.text.toLowerCase().includes('no ') ||
                               feature.text.toLowerCase().includes('not included');
            
            return (
              <li key={idx} className="flex items-start gap-3">
                <span
                  className="flex-shrink-0 flex items-center justify-center rounded-full"
                  style={{
                    width: '24px',
                    height: '24px',
                    backgroundColor: isExcluded 
                      ? (isDark ? 'rgba(239, 68, 68, 0.15)' : 'rgba(239, 68, 68, 0.1)')
                      : (isDark ? 'rgba(234, 88, 12, 0.15)' : 'rgba(234, 88, 12, 0.1)'),
                  }}
                >
                  <Icon
                    name={isExcluded ? 'close' : 'check'}
                    size={15}
                    style={{
                      color: isExcluded ? '#ef4444' : '#ea580c',
                    }}
                  />
                </span>
                <span
                  className={`text-sm lg:text-[15px] font-medium flex-1 text-left ${!feature.included ? 'line-through opacity-60' : ''}`}
                  style={{
                    color: isDark ? '#e5e7eb' : '#1f2937',
                    lineHeight: '1.6',
                  }}
                >
                  {feature.text}
                </span>
              </li>
            );
          })}
        </ul>
      </div>

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

// Enterprise Plan Card Component - Matching Restaurant Plan Card styling
function EnterprisePlanCard({ 
  isDark, 
  data 
}: { 
  isDark: boolean
  data: Partial<PricingPageData>
}) {
  const [isHovered, setIsHovered] = useState(false);

  const getBackground = () => {
    return isDark ? '#0f0f0f' : '#ffffff';
  };

  const getBorderColor = () => {
    // Premium gradient border for Enterprise
    return isDark ? 'rgba(255, 105, 41, 0.3)' : 'rgba(255, 105, 41, 0.2)';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0 }}
      whileHover={{ y: -4 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="flex flex-col h-full p-8 rounded-2xl relative overflow-visible w-full"
      style={{
        background: isDark 
          ? 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%)'
          : 'linear-gradient(135deg, #ffffff 0%, #fafafa 100%)',
        border: `2px solid ${getBorderColor()}`,
        boxShadow: isHovered
          ? (isDark ? '0 12px 32px -4px rgba(255, 105, 41, 0.25), 0 0 0 1px rgba(255, 105, 41, 0.1) inset' : '0 12px 32px -4px rgba(255, 105, 41, 0.15), 0 0 0 1px rgba(255, 105, 41, 0.08) inset')
          : (isDark ? '0 4px 12px -2px rgba(0,0,0,0.3)' : '0 4px 12px -2px rgba(0,0,0,0.08)'),
        transition: 'all 0.3s ease-out',
        boxSizing: 'border-box',
      }}
    >
      {/* Enterprise Badge - matching Most Popular style */}
      <div
        className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide"
        style={{
          background: isDark ? '#334155' : '#475569',
          color: '#ffffff',
          boxShadow: '0 4px 12px rgba(71, 85, 105, 0.4)',
          zIndex: 10,
        }}
      >
        Enterprise Grade
      </div>

      {/* Plan Header - matching other cards exactly */}
      <div className="mb-6 mt-2">
        <h3
          className="font-bold text-2xl lg:text-3xl mb-3 lg:mb-4"
          style={{ color: isDark ? '#ffffff' : '#0f172a' }}
        >
          Enterprise
        </h3>
        <div 
          className="flex items-start justify-center text-center"
          style={{ minHeight: '60px' }}
        >
          <p
            className="text-sm lg:text-base leading-relaxed"
            style={{ color: isDark ? '#a3a3a3' : '#64748b' }}
          >
            For hotels, resorts, and massive corporate operations needing heavy, specialized ERP tools.
          </p>
        </div>
      </div>

      {/* Price Box - premium styled with icon */}
      <div 
        className="mb-6 p-6 rounded-xl flex flex-col justify-center items-center relative overflow-hidden"
        style={{
          background: isDark 
            ? 'linear-gradient(135deg, rgba(255, 105, 41, 0.08) 0%, rgba(255, 105, 41, 0.03) 100%)'
            : 'linear-gradient(135deg, rgba(255, 105, 41, 0.06) 0%, rgba(255, 105, 41, 0.02) 100%)',
          border: `2px solid ${isDark ? 'rgba(255, 105, 41, 0.2)' : 'rgba(255, 105, 41, 0.15)'}`,
          minHeight: '200px',
        }}
      >
        {/* Enterprise icon */}
        <div 
          className="mb-4 flex items-center justify-center rounded-full"
          style={{
            width: '56px',
            height: '56px',
            backgroundColor: isDark ? 'rgba(255, 105, 41, 0.15)' : 'rgba(255, 105, 41, 0.1)',
          }}
        >
          <Icon
            name="building2"
            size={28}
            style={{ color: '#ff6929' }}
          />
        </div>
        <span
          className="text-2xl lg:text-3xl font-black mb-2"
          style={{ color: isDark ? '#ffffff' : '#0f172a' }}
        >
          {enterprisePlan.priceLabel}
        </span>
        <p className="text-xs lg:text-sm text-center font-medium" style={{ color: isDark ? '#94a3b8' : '#64748b' }}>
          Tailored pricing for your needs
        </p>
      </div>

      {/* Features - matching other cards exactly */}
      <div className="flex-grow mb-6">
        <ul className="space-y-3">
          {enterprisePlan.features.map((feature: PlanFeature, idx: number) => (
            <li 
              key={idx} 
              className="flex items-start gap-3"
            >
              <span
                className="flex-shrink-0 flex items-center justify-center rounded-full"
                style={{
                  width: '24px',
                  height: '24px',
                  backgroundColor: isDark ? 'rgba(255, 105, 41, 0.15)' : 'rgba(255, 105, 41, 0.1)',
                }}
              >
                <Icon
                  name="check"
                  size={15}
                  style={{ color: '#ff6929' }}
                />
              </span>
              <span
                className="text-sm lg:text-[15px] font-medium flex-1 text-left"
                style={{
                  color: isDark ? '#e5e7eb' : '#1f2937',
                  lineHeight: '1.6',
                }}
              >
                {feature.text}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Add-ons section */}
      <div 
        className="mb-6 p-5 rounded-xl"
        style={{
          backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#F5F5F5',
          border: isDark ? '1px solid rgba(255,255,255,0.1)' : 'none',
        }}
      >
        <p 
          className="text-xs font-bold mb-3 uppercase tracking-wide"
          style={{ color: isDark ? '#a3a3a3' : '#64748b' }}
        >
          Optional Add-ons
        </p>
        <div className="space-y-2">
          {enterprisePlan.addOns.map((addon, idx) => (
            <div 
              key={idx}
              className="flex justify-between items-center py-2"
              style={{ 
                borderBottom: idx < enterprisePlan.addOns.length - 1 
                  ? `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`
                  : 'none'
              }}
            >
              <span 
                className="font-medium text-sm"
                style={{ color: isDark ? '#e5e7eb' : '#1f2937' }}
              >
                {addon.name}
              </span>
              <span 
                className="font-bold text-sm"
                style={{ color: '#ff6929' }}
              >
                {addon.price}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Button - orange like Pro to signal premium tier */}
      <div className="mt-auto">
        <a
          href={enterprisePlan.ctaHref}
          className="block w-full py-3.5 px-6 rounded-xl font-bold text-center text-base transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
          style={{
            backgroundColor: '#ff6929',
            color: '#ffffff',
            border: '2px solid #ff6929',
          }}
        >
          {enterprisePlan.ctaText}
        </a>
      </div>
    </motion.div>
  );
}



