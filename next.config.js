// next.config.js
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'web-staging-cc40.up.railway.app',
        port: '',
        pathname: '/media/**',
      },
    ],
  },
}
