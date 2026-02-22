'use client'

import { useTheme } from '@/hooks/useTheme'
import { motion, Variants } from 'framer-motion'
import { useFeaturesData, type FeaturesData, type FeatureCard } from '@/lib/api'
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

const fallbackCards: FeatureCard[] = [
  {
    id: 'inventory',
    title: 'Smart Inventory',
    description:
      'Ingredients are deducted automatically as you sell. Get real-time alerts before you run out.',
    icon: 'inventory_2',
    iconColor: '#16a34a',
    gridSpan: 'md:col-span-8',
    order: 1,
    mockData: {
      stockItems: [
        {
          name: 'Chicken Breast',
          qty: '12kg',
          status: 'In Stock',
          barColor: 'bg-green-500',
          width: '80%',
        },
        {
          name: 'Red Onions',
          qty: '2kg',
          status: 'Low Stock',
          barColor: 'bg-yellow-500',
          width: '20%',
        },
        {
          name: 'Cooking Oil',
          qty: '1.5L',
          status: 'Critical',
          barColor: 'bg-red-500',
          width: '10%',
        },
        {
          name: 'Basmati Rice',
          qty: '45kg',
          status: 'In Stock',
          barColor: 'bg-green-500',
          width: '95%',
        },
      ],
    },
  },
  {
    id: 'billing',
    title: 'IRD Billing',
    description: 'Fully compliant with Nepal Tax Rules. Print with confidence.',
    icon: 'receipt_long',
    iconColor: '#ffffff',
    gridSpan: 'md:col-span-4',
    order: 2,
    mockData: {
      invoiceItems: [
        { name: '1. Momo Plater', price: '300' },
        { name: '2. Coke 500ml', price: '100' },
        { name: '3. Ch. Burger', price: '450' },
      ],
      subtotal: '850',
      tax: '110.5',
      total: 'Rs. 960.5',
    },
  },
  {
    id: 'menu',
    title: 'Digital QR Menu',
    description: 'Allow customers to order instantly from their phone.',
    icon: 'qr_code_2',
    iconColor: '#9333ea',
    gridSpan: 'md:col-span-6',
    order: 3,
    mockData: {},
  },
  {
    id: 'analytics',
    title: 'Analytics',
    description: 'Track sales, staff performance, and peak hours.',
    icon: 'bar_chart',
    iconColor: '#db2777',
    gridSpan: 'md:col-span-6',
    order: 4,
    mockData: {
      chartData: [30, 45, 25, 60, 40, 75, 55],
    },
  },
]

const fallbackData: Partial<FeaturesData> = {
  badge: { icon: 'bolt', text: 'Powerful Features' },
  title: 'Everything you need.',
  subtitle:
    "Run your restaurant like a pro. We've combined the most essential tools into one seamless platform.",
  cards: fallbackCards,
}

export function Features() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const { data } = useFeaturesData(fallbackData)

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  }

  const item: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  const cards = data.cards || fallbackCards

  const inventory = cards.find((c) => c.id === 'inventory') || fallbackCards[0]
  const billing = cards.find((c) => c.id === 'billing') || fallbackCards[1]
  const menu = cards.find((c) => c.id === 'menu' || c.id === 'qr-menu') || fallbackCards[2]
  const analytics =
    cards.find((c) => c.id === 'analytics' || c.id === 'reports') || fallbackCards[3]

  // Helper to get bar color from percentage or status
  interface StockItem {
    name: string
    qty: string
    status: string
    barColor: string
    width: string
    percentage?: number
  }

  const getBarStyle = (item: Record<string, unknown>) => {
    if (item.barColor && item.width)
      return { barColor: item.barColor as string, width: item.width as string }
    const pct = (item.percentage as number) || 50
    let barColor = 'bg-green-500'
    if (pct <= 20) barColor = 'bg-red-500'
    else if (pct <= 40) barColor = 'bg-yellow-500'
    return { barColor, width: `${pct}%` }
  }

  // Handle API format (items) and fallback format (stockItems)
  const rawStockData = inventory.mockData?.items || inventory.mockData?.stockItems
  const rawStockItems = Array.isArray(rawStockData) ? rawStockData : []
  const stockItems: StockItem[] = rawStockItems.map((item: Record<string, unknown>) => ({
    name: String(item.name || ''),
    qty: String(item.qty || ''),
    status: String(item.status || 'In Stock'),
    ...getBarStyle(item),
  }))

  // Handle API format (receiptItems) and fallback format (invoiceItems)
  const rawInvoiceData = billing.mockData?.receiptItems || billing.mockData?.invoiceItems
  const rawInvoiceItems = Array.isArray(rawInvoiceData) ? rawInvoiceData : []
  const invoiceItems = rawInvoiceItems.map((item: Record<string, unknown>, idx: number) => ({
    name: `${idx + 1}. ${String(item.name || '').replace(/^\d+\.\s*/, '')}`,
    price: String(item.price || 0),
  }))

  // Calculate billing totals from API or fallback
  const billingSubtotal =
    billing.mockData?.subtotal ||
    rawInvoiceItems.reduce(
      (sum: number, i: Record<string, unknown>) => sum + Number(i.price || 0),
      0
    )
  const vatPercent = (billing.mockData?.vatPercent as number) || 13
  const billingVat =
    billing.mockData?.tax || ((Number(billingSubtotal) * vatPercent) / 100).toFixed(1)
  const billingTotal =
    billing.mockData?.total || `Rs. ${(Number(billingSubtotal) + Number(billingVat)).toFixed(1)}`

  const rawChartData = analytics.mockData?.chartData
  const chartData = Array.isArray(rawChartData) ? rawChartData : [30, 45, 25, 60, 40, 75, 55]

  return (
    <section
      id="features"
      className="py-32 bg-slate-50 dark:bg-[#0a0a0a] transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-24"
        >
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-900/30 transition-colors duration-300"
          >
            <Icon name={(data.badge as any)?.icon || 'bolt'} size={14} />
            <span>{(data.badge as any)?.text || 'Powerful Features'}</span>
          </div>
          <h2
            className="text-4xl sm:text-5xl font-black font-display mb-6 text-slate-900 dark:text-white transition-colors duration-300"
          >
            <InlineHTMLContent html={data.title || 'Everything you need.'} />
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto leading-relaxed text-slate-500 dark:text-slate-400 transition-colors duration-300"
          >
            <InlineHTMLContent
              html={
                data.subtitle ||
                "Run your restaurant like a pro. We've combined the most essential tools into one seamless platform."
              }
            />
          </p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-12 gap-6"
        >
          {/* Card 1: Smart Inventory (Wide) */}
          <motion.div
            variants={item}
            className="group md:col-span-8 relative h-[450px] rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:shadow-2xl hover:scale-[1.01] bg-white dark:bg-[#171717] border border-gray-200 dark:border-[#262626]"
          >
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-green-500/5 dark:bg-green-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 transition-all duration-700 group-hover:bg-green-500/10 dark:group-hover:bg-green-500/20"></div>

            {/* Content */}
            <div className="absolute top-0 left-0 p-10 z-20 max-w-md">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-sm ring-1 ring-black/5 dark:ring-white/10 bg-green-50 dark:bg-green-500/10 text-green-600 transition-colors duration-300"
              >
                <Icon
                  name={inventory.icon}
                  size={32}
                  style={{ color: getColorValue(inventory.iconColor || '#16a34a', isDark) }}
                />
              </div>
              <h3
                className="text-3xl font-bold font-display mb-3 text-slate-900 dark:text-white transition-colors duration-300"
              >
                {inventory.title}
              </h3>
              <p
                className="text-lg leading-relaxed text-slate-500 dark:text-[#a3a3a3] transition-colors duration-300"
              >
                <InlineHTMLContent html={inventory.description} />
              </p>
            </div>

            {/* Inner "Half Shown" Card */}
            <div className="absolute bottom-[-15%] right-[-5%] sm:right-[5%] w-[85%] sm:w-[60%] md:w-[50%] h-[75%] bg-white dark:bg-zinc-900 rounded-t-3xl border border-gray-200 dark:border-zinc-800 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] transform translate-y-[25%] group-hover:translate-y-[5%] transition-transform duration-500 ease-out z-10 p-6 flex flex-col gap-4">
              {/* Mock UI Header */}
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-white/5">
                <div className="flex items-center gap-2">
                  <Icon name="check_circle" size={24} className="-500" />
                  <span className="text-sm font-bold text-gray-700 dark:text-gray-200">
                    Stock Status
                  </span>
                </div>
                <span className="text-xs font-mono text-gray-400">Live Update</span>
              </div>

              {/* List Items */}
              <div className="flex flex-col gap-3">
                {stockItems.map((i, idx) => (
                  <motion.div
                    key={idx}
                    className="group/item"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.4 }}
                  >
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium dark:text-gray-300">{i.name}</span>
                      <span
                        className={`text-xs font-bold ${
                          i.status === 'Critical'
                            ? 'text-red-500'
                            : i.status === 'Low Stock'
                            ? 'text-yellow-500'
                            : 'text-green-600'
                        }`}
                      >
                        {i.qty}
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${i.barColor} opacity-80`}
                        initial={{ width: 0 }}
                        whileInView={{ width: i.width }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + idx * 0.15, duration: 0.8, ease: 'easeOut' }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Card 2: IRD Billing (Tall/Square) */}
          <motion.div
            variants={item}
            className="group md:col-span-4 relative h-[450px] rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] bg-slate-900 text-white"
          >
            {/* Background Verified Icon (Restored & Enhanced) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
              <Icon
                name="verified"
                size={24}
                className="/10 group-hover:/20 rotate-12 transition-all duration-700 select-none"
              />
            </div>

            <div className="absolute top-0 left-0 p-10 z-20">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-white/10 backdrop-blur-md ring-1 ring-white/20">
                <Icon
                  name={billing.icon}
                  size={32}
                  style={{ color: getColorValue(billing.iconColor || '#ffffff', isDark) }}
                />
              </div>
              <h3 className="text-3xl font-bold font-display mb-3">{billing.title}</h3>
              <p className="text-lg text-slate-300 leading-relaxed">
                <InlineHTMLContent html={billing.description} />
              </p>
            </div>

            {/* Receipt Card Animation */}
            <div className="absolute bottom-[-30%] left-1/2 -translate-x-1/2 w-[70%] bg-white text-black shadow-2xl transform translate-y-[20%] group-hover:translate-y-[-10%] transition-transform duration-500 ease-out font-mono text-xs overflow-hidden after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-4 after:bg-[linear-gradient(45deg,transparent_33.333%,#fff_33.333%,#fff_66.667%,transparent_66.667%),linear-gradient(-45deg,transparent_33.333%,#fff_33.333%,#fff_66.667%,transparent_66.667%)] after:bg-[length:20px_20px] after:rotate-180 z-20">
              <div className="p-5 pb-8">
                <div className="flex flex-col items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white font-bold text-lg mb-2">
                    Y
                  </div>
                  <span className="font-bold text-sm">TAX INVOICE</span>
                  <span className="text-gray-500 text-[10px]">PAN: 123-456-789</span>
                </div>
                <div className="w-full border-b border-dashed border-gray-300 mb-2"></div>
                <div className="space-y-2 mb-2">
                  {invoiceItems.map((item, id) => (
                    <div key={id} className="flex justify-between">
                      <span>{item.name}</span>
                      <span>{item.price}</span>
                    </div>
                  ))}
                </div>
                <div className="w-full border-b border-dashed border-gray-300 mb-2"></div>
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal</span>
                  <span>{(billing.mockData?.subtotal as string) || '850'}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>VAT (13%)</span>
                  <span>{(billing.mockData?.tax as string) || '110.5'}</span>
                </div>
                <div className="flex justify-between font-bold text-lg mt-2">
                  <span>Total</span>
                  <span>{(billing.mockData?.total as string) || 'Rs. 960.5'}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 3: QR Menu */}
          <motion.div
            variants={item}
            className="group md:col-span-6 relative h-[380px] rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:shadow-2xl hover:scale-[1.01]"
            style={{
              backgroundColor: isDark ? '#171717' : '#ffffff',
              border: isDark ? '1px solid #262626' : '1px solid #e5e7eb',
            }}
          >
            {/* Decor */}
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

            <div className="absolute top-0 left-0 p-10 z-20">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-sm ring-1 ring-black/5 dark:ring-white/10 bg-purple-50 dark:bg-purple-600/10 text-purple-600 transition-colors duration-300"
              >
                <Icon
                  name={menu.icon}
                  size={32}
                  style={{ color: getColorValue(menu.iconColor || '#9333ea', isDark) }}
                />
              </div>
              <h3
                className="text-2xl font-bold font-display mb-2 text-slate-900 dark:text-white transition-colors duration-300"
              >
                {menu.title}
              </h3>
              <p className="text-lg text-slate-500 dark:text-[#a3a3a3] transition-colors duration-300">
                <InlineHTMLContent html={menu.description} />
              </p>
            </div>

            {/* Phone Card Peeking Up */}
            <div className="absolute bottom-[-25%] right-8 w-44 h-72 bg-gray-900 rounded-[2.5rem] border-[6px] border-gray-800 shadow-2xl transform translate-y-[15%] rotate-[-12deg] group-hover:translate-y-[-5%] group-hover:rotate-[-5deg] transition-all duration-500 ease-out overflow-hidden z-10">
              {/* Dynamic Island */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-4 bg-black rounded-full z-20"></div>
              {/* Screen Content */}
              <div className="w-full h-full bg-white dark:bg-zinc-900 relative pt-8 px-3">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold text-gray-400">MENU</span>
                  <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 text-[10px]">
                    1
                  </div>
                </div>
                {/* Menu Items */}
                <div className="space-y-3">
                  {[1, 2, 3].map((_, i) => (
                    <div
                      key={i}
                      className="flex gap-2 items-center p-2 rounded-xl bg-gray-50 dark:bg-zinc-800 border border-gray-100 dark:border-white/5"
                    >
                      <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-zinc-700"></div>
                      <div className="flex-1">
                        <div className="h-2 w-16 bg-gray-200 dark:bg-zinc-600 rounded mb-1"></div>
                        <div className="h-1.5 w-10 bg-gray-100 dark:bg-zinc-700 rounded"></div>
                      </div>
                      <div className="w-4 h-4 rounded-full bg-orange-500 flex items-center justify-center text-white text-[10px]">
                        +
                      </div>
                    </div>
                  ))}
                </div>
                {/* Cart Button */}
                <div className="absolute bottom-4 left-3 right-3 h-8 bg-orange-500 rounded-lg shadow-lg shadow-orange-500/30 flex items-center justify-center text-white text-[10px] font-bold">
                  View Cart (1)
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 4: Reports */}
          <motion.div
            variants={item}
            className="group md:col-span-6 relative h-[380px] rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:shadow-2xl hover:scale-[1.01] bg-white dark:bg-[#171717] border border-gray-200 dark:border-[#262626]"
          >
            {/* Decor */}
            <div className="absolute top-1/2 right-1/2 w-[300px] h-[300px] bg-pink-500/5 dark:bg-pink-500/10 rounded-full blur-3xl"></div>

            <div className="absolute top-0 left-0 p-10 z-20">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-sm ring-1 ring-black/5 dark:ring-white/10 bg-pink-50 dark:bg-pink-600/10 text-pink-600 transition-colors duration-300"
              >
                <Icon
                  name={analytics.icon}
                  size={32}
                  style={{ color: getColorValue(analytics.iconColor || '#db2777', isDark) }}
                />
              </div>
              <h3
                className="text-2xl font-bold font-display mb-2 text-slate-900 dark:text-white transition-colors duration-300"
              >
                {analytics.title}
              </h3>
              <p className="text-lg text-slate-500 dark:text-[#a3a3a3] transition-colors duration-300">
                <InlineHTMLContent html={analytics.description} />
              </p>
            </div>

            {/* Chart Card */}
            <div className="absolute bottom-0 right-0 w-[65%] h-[65%] bg-white dark:bg-zinc-900 border-t border-l border-gray-200 dark:border-zinc-800 rounded-tl-[2.5rem] shadow-lg transform translate-y-[20%] group-hover:translate-y-[5%] transition-transform duration-500 ease-out p-6 flex flex-col justify-end">
              {/* Chart Visual */}
              <div className="flex items-end justify-between gap-2 h-[80%] px-2 pb-2 border-b border-l border-gray-100 dark:border-zinc-800">
                {chartData.map((h, i) => {
                  const colors = [
                    { bg: 'bg-cyan-100 dark:bg-cyan-900/20', fill: 'bg-cyan-500' },
                    { bg: 'bg-blue-100 dark:bg-blue-900/20', fill: 'bg-blue-500' },
                    { bg: 'bg-indigo-100 dark:bg-indigo-900/20', fill: 'bg-indigo-500' },
                    { bg: 'bg-violet-100 dark:bg-violet-900/20', fill: 'bg-violet-500' },
                    { bg: 'bg-fuchsia-100 dark:bg-fuchsia-900/20', fill: 'bg-fuchsia-500' },
                    { bg: 'bg-pink-100 dark:bg-pink-900/20', fill: 'bg-pink-500' },
                    { bg: 'bg-rose-100 dark:bg-rose-900/20', fill: 'bg-rose-500' },
                  ]
                  const color = colors[i] || colors[0]
                  return (
                    <div key={i} className="relative w-full group/bar" style={{ height: `${h}%` }}>
                      <div
                        className={`w-full h-full ${color.bg} rounded-t-sm relative overflow-hidden transition-all duration-700 ease-out`}
                      >
                        <div
                          className={`absolute bottom-0 w-full h-full ${color.fill} opacity-80 group-hover:opacity-100 group-hover:h-full transition-all duration-700`}
                          style={{ height: '50%' }}
                        ></div>
                      </div>
                      {/* Value tooltip */}
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] bg-gray-800 text-white px-1.5 py-0.5 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap z-10">
                        {h}k
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className="flex justify-between mt-2 px-1">
                <span className="text-[10px] text-gray-400">Mon</span>
                <span className="text-[10px] text-gray-400">Tue</span>
                <span className="text-[10px] text-gray-400">Wed</span>
                <span className="text-[10px] text-gray-400">Thu</span>
                <span className="text-[10px] text-gray-400">Fri</span>
                <span className="text-[10px] text-gray-400">Sat</span>
                <span className="text-[10px] text-gray-400">Sun</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
