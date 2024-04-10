/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  experimental: {
    nftTracing: true
  }
}

module.exports = nextConfig
