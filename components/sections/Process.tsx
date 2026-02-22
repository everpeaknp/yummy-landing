'use client'

import { useTheme } from '@/hooks/useTheme'
import { motion } from 'framer-motion'
import { useProcessData, type ProcessData, type ProcessStep } from '@/lib/api'
import { InlineHTMLContent } from '@/components/ui/HTMLContent'
import { Icon } from '@/components/ui/Icon'

// Color mapping utility
const getColorValue = (colorString: string, isDark: boolean): string => {
  // Handle Tailwind color classes
  const tailwindColors: Record<string, string> = {
    'red-500': '#ef4444',
    'blue-500': '#3b82f6',
    'green-500': '#10b981',
    'yellow-500': '#f59e0b',
    'purple-500': '#8b5cf6',
    'pink-500': '#ec4899',
    'indigo-500': '#6366f1',
    'gray-500': '#6b7280',
    'orange-500': '#f97316',
  }

  // Handle theme colors
  const themeColors: Record<string, string> = {
    primary: '#ff6929',
    secondary: isDark ? '#a3a3a3' : '#64748b',
    accent: '#f97316',
  }

  // Return mapped color or original if it's already a valid color (hex, rgb, etc.)
  return tailwindColors[colorString] || themeColors[colorString] || colorString
}

const fallbackSteps: ProcessStep[] = [
  {
    number: '01',
    icon: 'person_add',
    title: 'Create Account',
    description: 'Sign up instantly with your email. No credit card required for the trial.',
    isHighlighted: false,
    iconColor: '#ff6929', // Orange
    order: 1,
  },
  {
    number: '02',
    icon: 'restaurant_menu',
    title: 'Setup Menu',
    description: 'Add your categories, items, and tables. Configure your floor plan easily.',
    isHighlighted: false,
    iconColor: '#3b82f6', // Blue
    order: 2,
  },
  {
    number: '03',
    icon: 'point_of_sale',
    title: 'Start Selling',
    description: 'Take orders, print KOTs, and manage billing instantly. Watch your business grow.',
    isHighlighted: true,
    iconColor: '#ffffff',
    order: 3,
  },
]

const fallbackData: Partial<ProcessData> = {
  badgeText: 'Easy Start',
  title: 'Start in 3 Simple Steps',
  subtitle:
    'The fastest setup in the industry. Go live within minutes using our intuitive onboarding process.',
  steps: fallbackSteps,
}

export function Process() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const { data } = useProcessData(fallbackData)

  const steps = data.steps || fallbackSteps

  return (
    <section
      id="process"
      className="py-32 relative overflow-hidden bg-white dark:bg-[#050505] transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-24"
        >
          <div className="inline-block mb-4">
            <span className="py-2 px-4 rounded-full text-xs font-bold tracking-widest uppercase bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800">
              {data.badgeText}
            </span>
          </div>
          <h2
            className="text-4xl md:text-5xl font-black font-display mb-6 text-slate-900 dark:text-white transition-colors duration-300"
          >
            <InlineHTMLContent html={data.title || ''} />
          </h2>
          <p
            className="text-xl max-w-2xl mx-auto text-slate-500 dark:text-slate-400 transition-colors duration-300"
          >
            <InlineHTMLContent html={data.subtitle || fallbackData.subtitle || ''} />
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {(steps || [])
            .sort((a, b) => (a?.order || 0) - (b?.order || 0))
            .map((step, idx) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                whileHover={{ y: -8 }}
                className={`
                 relative p-8 rounded-[2rem] overflow-hidden group flex flex-col justify-start h-full transition-colors duration-300
                 ${
                   step.isHighlighted
                     ? 'shadow-2xl shadow-blue-900/20 bg-blue-600 dark:bg-slate-900 border-none'
                     : 'shadow-lg hover:shadow-xl bg-white dark:bg-[#111] border border-slate-100 dark:border-[#222]'
                 }
              `}
              >
                {/* Number - Top Right, Fully Visible */}
                <div
                  className={`absolute top-8 right-8 text-5xl font-black opacity-100 transition-colors duration-300 z-0 ${
                    step.isHighlighted 
                      ? 'text-white/20' 
                      : 'text-slate-200 dark:text-[#333]'
                  }`}
                >
                  {step.number}
                </div>

                {/* Icon */}
                <div
                  className={`relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center mb-12 text-3xl shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 ${
                    step.isHighlighted 
                      ? 'bg-white/20 text-white' 
                      : 'bg-slate-50 dark:bg-[#1a1a1a]'
                  }`}
                  style={!step.isHighlighted ? { color: getColorValue(step.iconColor, isDark) } : {}}
                >
                  <Icon name={step.icon} size={24} />
                </div>

                {/* Content */}
                <div className="relative z-10 mt-auto">
                  <h3
                    className={`text-2xl font-bold font-display mb-3 transition-colors duration-300 ${
                      step.isHighlighted ? 'text-white' : 'text-slate-900 dark:text-white'
                    }`}
                  >
                    {step.title}
                  </h3>
                  <p
                    className={`leading-relaxed text-base transition-colors duration-300 ${
                      step.isHighlighted ? 'text-white/80' : 'text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    <InlineHTMLContent html={step.description} />
                  </p>
                </div>

                {/* Hover Line */}
                {!step.isHighlighted && (
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                )}
              </motion.div>
            ))}
        </div>
      </div>
    </section>
  )
}
