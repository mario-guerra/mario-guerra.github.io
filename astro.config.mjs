import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import compressor from "astro-compressor";
import starlight from "@astrojs/starlight";
import transformLinks from "./vite-plugin-transform-links.mjs"

const SERVER_PORT = 3000;
// the url to access your blog during local development
const LOCALHOST_URL = `http://localhost:${SERVER_PORT}`;
// the url to access your blog after deploying it somewhere (Eg. Netlify)
const LIVE_URL = "https://mario-guerra.github.io"; // Add protocol to make it a valid URL
// this is the astro command your npm script runs
const SCRIPT = process.env.npm_lifecycle_script || "";
const isBuild = SCRIPT.includes("astro build");
let BASE_URL = LOCALHOST_URL;
// When you're building your site in local or in CI, you could just set your URL manually
if (isBuild) {
  BASE_URL = LIVE_URL;
}

export default defineConfig({
  content: {
    collections: {
      blog: './src/content/blog',  // Path to your blog posts
    },
  },
  site: BASE_URL,
  prefetch: true,
  vite: {
      plugins: [transformLinks()]
  },
  prefetch: true,
    integrations: [
        tailwind(),
        sitemap(),
        starlight({
            title: "Mario Guerra",
            social: {
              github: "https://github.com/mario-guerra/",
            },
            disable404Route: true,
            favicon: "/mario-initial.svg",
            customCss: ["./src/assets/styles/starlight.css"],
        }),
        compressor({ brotli: true }),
    ],
    experimental: {
        clientPrerender: true,
        directRenderScript: true,
    },
    trailingSlash: 'never',
});