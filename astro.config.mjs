// @ts-check
import react from "@astrojs/react";
import { storyblok } from "@storyblok/astro";
import tailwindcss from "@tailwindcss/vite";
import basicSsl from "@vitejs/plugin-basic-ssl";
import { defineConfig } from "astro/config";
import icon from "astro-icon";
import { loadEnv } from "vite";

import sitemap from "@astrojs/sitemap";

const env = loadEnv("", process.cwd(), "STORYBLOK");

// https://astro.build/config
export default defineConfig({
  site: "https://devondwalker.com",
  integrations: [
    react(),
    icon(),
    sitemap(),
    storyblok({
      accessToken: env.STORYBLOK_ACCESS_TOKEN,
      components: {
        page: "storyblok/Page",
        grid: "storyblok/Grid",
        hero: "storyblok/Hero",
        teaser: "storyblok/Teaser",
        feature: "storyblok/Feature",
      },
      apiOptions: {
        region: "eu",
      },
    }),
  ],
  vite: {
    plugins: [basicSsl(), tailwindcss()],
    // server: { https: true },
  },
});
