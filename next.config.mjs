/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ensure we can load HTML files from the public directory
  webpack: (config) => {
    config.module.rules.push({
      test: /\.html$/,
      use: 'raw-loader',
    })
    return config
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
