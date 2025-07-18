import { defineConfig,  passthroughImageService } from 'astro/config';
import icon from "astro-icon";
import markdoc from '@astrojs/markdoc';
import { imageService } from "@unpic/astro/service";
import react from "@astrojs/react";

// https://astro.build/config
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: 'https://bagusmerta.com',
  output: "static",
  image: {
    service: passthroughImageService(),
  },
  integrations: [
    markdoc(), react(), icon(), 
    tailwind({
      applyBaseStyles: false,
    })
  ],
});

