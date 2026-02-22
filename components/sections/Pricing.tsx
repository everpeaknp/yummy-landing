'use client'

import Link from 'next/link'
import { siteConfig } from '@/lib/constants'
import { useTheme } from '@/hooks/useTheme'
import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import {
  getPricingPage,
  type PricingPageData,
  type PricingPlan,
  type PricingFaq,
  useRefetchOnFocus,
} from '@/lib/api'
import { InlineHTMLContent } from '@/components/ui/HTMLContent'
import { Icon } from '@/components/ui/Icon'

// Fallback plans data
const fallbackPlans: Array<Omit<PricingPlan, 'features'> & { features: string[] }> = [
  {
    name: 'Starter',
    priceMonthly: 'Free',
    priceYearly: 'Free',
    description: 'Perfect for small cafes and food trucks just getting started.',
    features: [
      'Single Outlet',
      'Cloud POS System',
      'Digital Menu (View Only)',
      'Basic Inventory',
      '5 Staff Accounts',
      'Email Support',
    ],
    ctaText: 'Get Started',
    ctaHref: siteConfig.links.app,
    isPopular: false,
    popularLabel: null,
    order: 1,
  },
  {
    name: 'Pro',
    priceMonthly: 'Rs. 1,500',
    priceYearly: 'Rs. 12,000',
    originalPriceMonthly: 'Rs. 2,000',
    originalPriceYearly: 'Rs. 20,000',
    description: 'Everything a growing restaurant needs to scale efficiently.',
    features: [
      'Unlimited Inventory Items',
      'Table Management & KOT',
      'Advanced Sales Reports',
      'Recipe Costing & Profit Analysis',
      'Customer Database (CRM)',
      'Staff Performance Tracking',
      'Waiter App Support',
      'Priority Email & Chat Support',
    ],
    ctaText: 'Start Free Trial',
    ctaHref: siteConfig.links.app,
    isPopular: true,
    popularLabel: 'Most Popular',
    order: 2,
  },
  {
    name: 'Enterprise',
    priceMonthly: 'Custom',
    priceYearly: 'Custom',
    description: 'For multi-location chains and large franchises.',
    features: [
      'Multi-location Management',
      'Central Kitchen Module',
      'Custom ERP Integrations',
      'API Access',
      'White-label Options',
      'Dedicated Account Manager',
      'SLA Support',
      'On-site Training',
    ],
    ctaText: 'Contact Sales',
    ctaHref: '/contact',
    isPopular: false,
    popularLabel: null,
    order: 3,
  },
]

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

const fallbackData: Partial<PricingPageData> = {
  title: 'Simple, Transparent Pricing',
  subtitle: 'Choose the plan that fits your business stage. No hidden fees, cancel anytime.',
  toggle: { monthlyLabel: 'Monthly', yearlyLabel: 'Yearly', savingsLabel: 'SAVE 33%' },
  promotionBanner: {
    icon: 'celebration',
    text: 'Free Installation valid until',
    highlightText: 'February!',
  },
}

export function Pricing() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [isAnnual, setIsAnnual] = useState(true)
  const [data, setData] = useState<Partial<PricingPageData>>(fallbackData)
  const [plans, setPlans] = useState(fallbackPlans)
  const [faqs, setFaqs] = useState(fallbackFaqs)

  const fetchData = useCallback(async () => {
    try {
      const apiData = await getPricingPage()
      console.log("Fetched Pricing Data from API:", apiData); // Temporary debug log
      setData(apiData)

      // Map API plans to component format
      if (apiData.plans) {
        const mappedPlans = apiData.plans.map((p) => ({
          ...p,
          features: p.features.map((f) => (typeof f === 'string' ? f : f.text)),
        }))
        setPlans(mappedPlans as Array<Omit<PricingPlan, 'features'> & { features: string[] }>)
      }

      if (apiData.faqs) {
        setFaqs(apiData.faqs)
      }
    } catch (error) {
      console.error('Failed to fetch pricing data:', error)
      // Keep fallback data
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  useRefetchOnFocus(fetchData)

  const toggle = data.toggle || fallbackData.toggle!
  const promo = data.promotionBanner || fallbackData.promotionBanner!

  return (
    <section
      id="pricing"
      className="py-24 relative overflow-hidden bg-slate-50 dark:bg-white/5 border-t border-slate-200 dark:border-white/5"
    >
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] rounded-full blur-3xl opacity-5 bg-orange-300 dark:bg-orange-500" />
        <div className="absolute top-[40%] -left-[10%] w-[500px] h-[500px] rounded-full blur-3xl opacity-5 bg-blue-300 dark:bg-blue-500" />
      </div>

      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-4xl sm:text-5xl font-black font-display mb-6 text-slate-900 dark:text-white">
            <InlineHTMLContent html={data.title || 'Simple, Transparent Pricing'} />
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-slate-500 dark:text-neutral-400">
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
                  !isAnnual ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-neutral-500'
                }`}
              >
                {toggle.monthlyLabel}
              </span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className={`relative w-16 h-8 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                  isAnnual ? 'bg-orange-500' : 'bg-slate-300 dark:bg-neutral-700'
                }`}
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
                    isAnnual ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-neutral-500'
                  }`}
                >
                  {toggle.yearlyLabel}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                  {toggle.savingsLabel}
                </span>
              </div>
            </div>

            {/* Installation Offer Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="relative group cursor-default"
            >
              {/* Glowing background blur */}
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-amber-500 rounded-full blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>

              {/* Badge Content */}
              <div className="relative px-6 py-2.5 bg-white dark:bg-[#0a0a0a] ring-1 ring-gray-900/5 dark:ring-white/10 rounded-full flex items-center gap-3 shadow-sm">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400">
                  <Icon name={promo.icon} size={24} />
                </span>
                <span className="text-sm font-medium text-slate-700 dark:text-neutral-200">
                  {promo.text}{' '}
                  <span className="font-bold text-orange-600 dark:text-orange-500">
                    {promo.highlightText}
                  </span>
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto mb-32">
          {(plans || [])
            .sort((a, b) => (a?.order || 0) - (b?.order || 0))
            .map((plan) => (
              <div
                key={plan.name}
                className={`p-8 rounded-[2rem] relative flex flex-col transition-all duration-300 ${
                  plan.isPopular
                    ? 'shadow-2xl ring-2 ring-orange-500 bg-white dark:bg-neutral-900 scale-[1.02]'
                    : 'hover:shadow-xl bg-white dark:bg-neutral-950 border border-slate-200 dark:border-white/10'
                }`}
              >
                {/* Popular Badge */}
                {plan.isPopular && (
                  <div className="absolute -top-5 inset-x-0 flex justify-center">
                    <span className="text-xs uppercase font-bold px-4 py-1.5 rounded-full shadow-lg bg-gradient-to-br from-orange-500 to-orange-600 text-white">
                      {plan.popularLabel || 'Most Popular'}
                    </span>
                  </div>
                )}

                <div className="mb-8">
                  <h3 className={`font-bold text-2xl mb-2 ${plan.isPopular ? 'text-orange-500' : 'text-slate-900 dark:text-white'}`}>
                    {plan.name}
                  </h3>
                  <p className="text-sm min-h-[40px] text-slate-500 dark:text-neutral-400">
                    <InlineHTMLContent html={plan.description} />
                  </p>
                </div>

                <div className="mb-8 p-6 -mx-2 rounded-2xl bg-slate-100 dark:bg-white/5">
                  <div className="flex flex-col items-center justify-center">
                    {/* Optional Strikethrough Original Price */}
                    {(isAnnual && plan.originalPriceYearly) || (!isAnnual && plan.originalPriceMonthly) ? (
                      <div className="flex items-center gap-1.5 text-orange-500 dark:text-orange-400 text-sm font-semibold mb-1 opacity-90">
                        <span className="line-through decoration-orange-500/50 dark:decoration-orange-400/50 decoration-2">
                          {isAnnual ? plan.originalPriceYearly : plan.originalPriceMonthly}
                        </span>
                      </div>
                    ) : null}
                    
                    {/* Active Price */}
                    <div className="flex items-baseline justify-center gap-1">
                      {plan.priceMonthly !== 'Custom' && plan.priceMonthly !== 'Free' && (
                        <span className="text-lg font-medium text-gray-400">Rs.</span>
                      )}

                      <span
                        className={`font-black tracking-tight text-slate-900 dark:text-white ${
                          plan.name === 'Pro' ? 'text-4xl' : 'text-3xl'
                        }`}
                      >
                        {isAnnual
                          ? plan.priceYearly.replace('Rs. ', '')
                          : plan.priceMonthly.replace('Rs. ', '')}
                      </span>

                      {plan.priceMonthly !== 'Custom' && plan.priceMonthly !== 'Free' && (
                        <span className="text-sm text-gray-500">{isAnnual ? '/yr' : '/mo'}</span>
                      )}
                    </div>
                  </div>
                  {isAnnual && plan.priceMonthly !== 'Custom' && plan.priceMonthly !== 'Free' && (
                    <p className="text-xs text-center mt-2 text-green-600 dark:text-green-400 font-medium">
                      Billed Annually (Save Rs. 6000/yr)
                    </p>
                  )}
                </div>

                {/* Features */}
                <div className="flex-grow mb-8">
                  <p className="sr-only">Features:</p>
                  <ul className="space-y-4 text-sm text-left">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex gap-3 items-start">
                        <span
                          className={`flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full mt-0.5 ${
                            plan.isPopular ? 'bg-orange-500/10' : 'bg-slate-200 dark:bg-white/10'
                          }`}
                        >
                          <Icon
                            name="check"
                            size={16}
                            className={
                              plan.isPopular
                                ? 'text-orange-500'
                                : 'text-slate-600 dark:text-white'
                            }
                          />
                        </span>
                        <span className="text-slate-600 dark:text-neutral-300">
                          {typeof feature === 'string' ? feature : feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                {plan.ctaText && plan.ctaHref && (
                  <Link
                    href={plan.ctaHref}
                    className={`block w-full py-4 rounded-xl font-bold transition-all duration-300 text-center ${
                      plan.isPopular
                        ? 'hover:shadow-lg hover:shadow-orange-500/20 bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-[0_4px_14px_0_rgba(249,115,22,0.39)]'
                        : 'hover:opacity-90 bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                    }`}
                  >
                    {plan.ctaText}
                  </Link>
                )}
              </div>
            ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-500 dark:text-neutral-400">
              Have questions? We&apos;re here to help.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 text-left">
            {faqs
              .sort((a, b) => a.order - b.order)
              .map((faq, i) => (
                <div key={i} className="group">
                  <h4 className="flex items-start gap-3 text-lg font-bold mb-3 text-slate-800 dark:text-neutral-200">
                    <Icon
                      name="help"
                      size={20}
                      className="mt-0.5 opacity-60 group-hover:opacity-100 transition-opacity cursor-help"
                    />
                    {faq.question}
                  </h4>
                  <p className="pl-8 text-base leading-relaxed text-slate-500 dark:text-neutral-400">
                    {faq.answer}
                  </p>
                </div>
              ))}
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
                className="-500 group-hover:translate-x-1 transition-transform"
              />
            </button>

            {/* Hidden Plane for Animation */}
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
