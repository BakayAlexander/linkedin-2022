/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    dangerouslyAllowSVG: true,
    domains: ['rb.gy', 'images.app.goo.gl', 'unsplash.com'],
  },
};

module.exports = nextConfig;
