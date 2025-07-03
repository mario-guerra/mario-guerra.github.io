/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Base path for GitHub Pages
  basePath: '/portfolio-website',
  // Add trailing slash to match GitHub Pages behavior
  trailingSlash: true,
};

export default nextConfig;
