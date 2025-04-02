/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  experimental: {
    outputFileTracingIncludes: {
      "/ide": ["./wasm/**/*"],
    },
  },
  webpack: (config) => {
    config.externals['@solana/web3.js'] = 'commonjs @solana/web3.js';
    return config;
  }
}

module.exports = nextConfig
