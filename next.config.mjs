/** @type {import('next').NextConfig} */

// Extract basePath from GitHub Actions variables if deployed to a subpath
const isGithubActions = process.env.GITHUB_ACTIONS || false;
let repo = '';
if (isGithubActions && process.env.GITHUB_REPOSITORY) {
  repo = process.env.GITHUB_REPOSITORY.replace(/.*?\//, '');
}

// Fallback to NEXT_PUBLIC_BASE_PATH or the repo name, unless the repo IS the primary github.io domain
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || (repo && repo !== 'mario-guerra.github.io' ? `/${repo}` : '');

const nextConfig = {
  output: 'export',
  basePath,
  assetPrefix: basePath,
  images: {
    unoptimized: true,
  },
  // Add trailing slash to match GitHub Pages behavior
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  }
};

export default nextConfig;
