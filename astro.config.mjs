import { defineConfig } from 'astro/config';
import icon from "astro-icon";
import markdoc from '@astrojs/markdoc';

import react from "@astrojs/react";

// https://astro.build/config
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: 'http://bagusmerta.com',
  output: "static",
  // cc: https://docs.astro.build/en/reference/configuration-reference/#output
  integrations: [markdoc(), react(), icon(), tailwind()]
});