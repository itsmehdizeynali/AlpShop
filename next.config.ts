import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  turbopack: {}, // مهم برای ساکت کردن warning
  images:{
    remotePatterns:[
      {
        protocol:'https',
        hostname:'dummyimage.com'
      },
      {
        protocol:'https',
        hostname:'images.unsplash.com'
      },
    ]
  }
}

export default nextConfig
