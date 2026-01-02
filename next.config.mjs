/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: '/admin',
        destination: '/admin/index.html',
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/about',
        destination: '/#about',
        permanent: true, // 301 redirect
      },
      {
        source: '/products',
        destination: '/#products',
        permanent: true,
      },
      {
        source: '/manufacturing',
        destination: '/#manufacturing',
        permanent: true,
      },
      {
        source: '/sustainability',
        destination: '/#sustainability',
        permanent: true,
      },
      {
        source: '/contact',
        destination: '/#contact',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
