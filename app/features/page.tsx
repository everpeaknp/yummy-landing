import type { Metadata } from 'next'
import { getFeaturesList } from '@/lib/api/pages'
import { FeaturesIndexClient } from '@/components/sections/FeaturesIndexClient'

export const metadata: Metadata = {
  title: 'Features | Yummy Restaurant Management System',
  description:
    'Discover our comprehensive restaurant management features including smart inventory, IRD billing, QR menus, and real-time reports.',
  keywords: [
    'restaurant management',
    'POS system',
    'inventory management',
    'IRD billing',
    'QR menu',
    'restaurant software',
  ],
  openGraph: {
    title: 'Features | Yummy Restaurant Management System',
    description:
      'Discover our comprehensive restaurant management features including smart inventory, IRD billing, QR menus, and real-time reports.',
    type: 'website',
    url: 'https://yummy.com.np/features',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Features | Yummy Restaurant Management System',
    description:
      'Discover our comprehensive restaurant management features including smart inventory, IRD billing, QR menus, and real-time reports.',
  },
}

export default async function FeaturesIndexPage() {
  let initialFeatures = null
  try {
    initialFeatures = await getFeaturesList()
  } catch (error) {
    console.error('Failed to fetch features list:', error)
  }

  return <FeaturesIndexClient initialFeatures={initialFeatures} />
}
