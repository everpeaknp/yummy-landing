'use client'

import { Navbar, Footer } from '@/components/layout'
import { useTheme } from '@/hooks/useTheme'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import { useState, useEffect } from 'react'
import { FiPlus, FiMinus } from 'react-icons/fi'
import { faqCategories as fallbackFaqCategories } from '@/lib/data'
import { getFaqPage, type FaqPageData, type FaqCategory } from '@/lib/api/pages'
import { InlineHTMLContent } from '@/components/ui/HTMLContent'

const AccordionItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <div className="border-b" style={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : '#e2e8f0' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full py-6 text-left focus:outline-none"
      >
        <span className="text-lg font-medium" style={{ color: isDark ? '#f1f5f9' : '#1e293b' }}>
          {question}
        </span>
        <span className="ml-4 flex-shrink-0">
          {isOpen ? (
            <FiMinus className="text-primary" />
          ) : (
            <FiPlus className={isDark ? 'text-gray-500' : 'text-gray-400'} />
          )}
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pb-6 leading-relaxed" style={{ color: isDark ? '#94a3b8' : '#64748b' }}>
              <InlineHTMLContent html={answer} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Map fallback data to API format
const fallbackData: Partial<FaqPageData> = {
  title: 'Frequently Asked Questions',
  subtitle: "Everything you need to know about Yummy. Can't find the answer you're looking for?",
  contactPrompt: { text: '', linkText: 'Chat to our friendly team.', linkHref: '/contact' },
  categories: fallbackFaqCategories.map((cat, idx) => ({
    title: cat.title,
    order: idx + 1,
    questions: cat.questions.map((q, i) => ({
      question: q.q,
      answer: q.a,
      order: i + 1,
    })),
  })),
}

export function FaqClient() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [data, setData] = useState<Partial<FaqPageData>>(fallbackData)
  const [categories, setCategories] = useState<FaqCategory[]>(fallbackData.categories || [])

  useEffect(() => {
    async function fetchData() {
      try {
        const apiData = await getFaqPage()
        setData(apiData)
        if (apiData.categories) {
          setCategories(apiData.categories)
        }
      } catch (error) {
        console.error('Failed to fetch FAQ data:', error)
        // Keep fallback data
      }
    }
    fetchData()
  }, [])

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  const contactPrompt = data.contactPrompt || fallbackData.contactPrompt!

  return (
    <>
      <Navbar />
      <motion.main
        variants={container}
        initial="hidden"
        animate="show"
        className="min-h-screen pt-32 pb-20 px-6"
        style={{ backgroundColor: isDark ? '#0a0a0a' : '#ffffff' }}
      >
        <div className="max-w-4xl mx-auto px-6">
          <motion.div variants={item} className="text-center mb-16">
            <h1
              className="text-4xl md:text-5xl font-black font-display mb-6"
              style={{ color: isDark ? '#ffffff' : '#0f172a' }}
            >
              {data.title || 'Frequently Asked Questions'}
            </h1>
            <p
              className="text-xl max-w-2xl mx-auto"
              style={{ color: isDark ? '#a3a3a3' : '#64748b' }}
            >
              {data.subtitle ||
                "Everything you need to know about Yummy. Can't find the answer you're looking for?"}
              <a
                href={contactPrompt.linkHref}
                className="text-primary font-bold hover:underline ml-2"
              >
                {contactPrompt.linkText}
              </a>
            </p>
          </motion.div>

          <div className="space-y-12">
            {categories
              .sort((a, b) => a.order - b.order)
              .map((category, idx) => (
                <motion.div
                  variants={item}
                  key={idx}
                  className="bg-opacity-50 rounded-3xl p-8 shadow-sm"
                  style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.02)' : '#f8fafc' }}
                >
                  <h2
                    className="text-2xl font-bold mb-6"
                    style={{ color: isDark ? '#e2e8f0' : '#334155' }}
                  >
                    {category.title}
                  </h2>
                  <div className="space-y-2">
                    {category.questions
                      .sort((a, b) => a.order - b.order)
                      .map((q, i) => (
                        <AccordionItem key={i} question={q.question} answer={q.answer} />
                      ))}
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </motion.main>
      <Footer />
    </>
  )
}
