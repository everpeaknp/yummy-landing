import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  skipTrailingSlashRedirect: true,
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      {
        protocol: 'https',
        hostname: 'yummymedia2026ram.blob.core.windows.net',
      },
      {
        protocol: 'https',
        hostname: 'yummy-backend-api-f3eycscsaqcbcugy.southeastasia-01.azurewebsites.net',
      },
      {
        protocol: 'https',
        hostname: 'yummylanding.yummyever.com',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
      },
    ],
  },
  async rewrites() {
    const apiUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api').replace(/\/+$/, '')
    const backendUrl = apiUrl.replace(/\/api$/, '')
      
    return [
      {
        source: '/api/:path*',
        destination: `${apiUrl}/:path*/`,
      },
      // Proxy /media/ requests to Django backend
      {
        source: '/media/:path*',
        destination: `${backendUrl}/media/:path*`,
      },
    ]
  },
}

export default nextConfig
