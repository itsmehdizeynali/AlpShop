import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  turbopack: {}, // مهم برای ساکت کردن warning
  images:{
    remotePatterns:[
      {
        protocol:'https',
        hostname:'dummyimage.com'
      }
    ]
  }
}

export default nextConfig
