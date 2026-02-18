import { getFeatureDetail } from '@/lib/api/pages'
import type { Metadata } from 'next'
import { FeaturePageClient } from '@/components/sections/FeaturePageClient'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params

  try {
    const feature = await getFeatureDetail(slug)

    return {
      title: `${feature.title} | Yummy Restaurant Management System`,
      description: feature.description,
      keywords: feature.keywords,
      openGraph: {
        title: feature.title,
        description: feature.description,
        type: 'article',
        url: `https://yummy.com.np/features/${slug}`,
        images: feature.ogImage
          ? [
              {
                url: feature.ogImage,
                width: 1200,
                height: 630,
                alt: feature.title,
              },
            ]
          : [],
      },
      twitter: {
        card: 'summary_large_image',
        title: feature.title,
        description: feature.description,
        images: feature.ogImage ? [feature.ogImage] : [],
      },
    }
  } catch (error) {
    return {
      title: 'Feature | Yummy Restaurant Management System',
      description: 'Discover powerful restaurant management features.',
    }
  }
}

export default async function FeaturePage({ params }: Props) {
  const { slug } = await params

  let featureData = null
  try {
    featureData = await getFeatureDetail(slug)
  } catch (error) {
    console.error(`Failed to fetch feature detail for ${slug}:`, error)
  }

  return <FeaturePageClient featureData={featureData} slug={slug} />
}
