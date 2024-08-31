/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['drive.google.com'], // Allow Google Drive images
  },
}

module.exports = nextConfig
