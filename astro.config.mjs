import { defineConfig } from 'astro/config';
;
import markdoc from '@astrojs/markdoc';

// https://astro.build/config
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: 'https://gusentanan.github.io',
  output: "static",
  // cc: https://docs.astro.build/en/reference/configuration-reference/#output
  integrations: [markdoc(), react()],
});