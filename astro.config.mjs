import { defineConfig } from 'astro/config';
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
  // Trigger new deployment (2)
  // image: {
  //   service: imageService({
  //     placeholder: "blurhash",
  //     layout:"constrained"
  //   }),
  // },
  // cc: https://docs.astro.build/en/reference/configuration-reference/#output
  integrations: [
    markdoc(), react(), icon(), 
    tailwind({
      applyBaseStyles: false,
    })
  ],
});

