/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Generate static files inside the "out" folder
  output: "export",

  // Recommended when using next/image with static export
  images: {
    unoptimized: true,
  },

  // Generates routes as folders, for example:
  // /about/index.html instead of /about.html
  trailingSlash: true,
};

module.exports = nextConfig;