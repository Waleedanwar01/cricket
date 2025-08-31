/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "web-staging-cc40.up.railway.app",
        pathname: "/**",
      },
      // when you go live, also add your main domain
      {
        protocol: "https",
        hostname: "yourdomain.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
