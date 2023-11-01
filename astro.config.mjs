import { defineConfig } from 'astro/config';

// https://astro.build/config
import markdoc from "@astrojs/markdoc";

// https://astro.build/config
export default defineConfig({
  site: 'https://gusentanan.github.io',
  integrations: [markdoc()],
  experimental: { assets: true },
});