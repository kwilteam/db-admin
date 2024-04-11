/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  experimental: {
    outputFileTracingIncludes: {
      '/ide': ['./wasm/*']
    }
  }
}

module.exports = nextConfig
