/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  images: {
    domains: ["images.microcms-assets.io"],
  },
  experimental: {
    scrollRestoration: true,
    largePageDataBytes: 256 * 1000,
  },
  env: {
    NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
  }
};