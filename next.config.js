/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // use stripe images
  images: {
    domains: ['files.stripe.com']
  }
}

module.exports = nextConfig
