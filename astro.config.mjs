import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import compressor from "astro-compressor";
import starlight from "@astrojs/starlight";

const SERVER_PORT = 3000;
const LOCALHOST_URL = `http://localhost:${SERVER_PORT}`;
const LIVE_URL = "https://mario-guerra.github.io";
const SCRIPT = process.env.npm_lifecycle_script || "";
const isBuild = SCRIPT.includes("astro build");
let BASE_URL = LOCALHOST_URL;
if (isBuild) {
  BASE_URL = LIVE_URL;
}

export default defineConfig({
  vite: {
    publicDir: 'public',
    resolve: {
      alias: {
        '@data_files': './src/data_files',
      },
    },
  },
  content: {
    collections: {
      blog: './src/content/blog',
      guidelines: './src/content/guidelines',
    },
  },
  site: BASE_URL,
  prefetch: true,
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
            customCss: ["./src/assets/styles/starlight_main.css"],
        }),
        compressor({ brotli: true }),
    ],
    experimental: {
        clientPrerender: true,
        directRenderScript: true,
    },
    trailingSlash: 'never',
});
