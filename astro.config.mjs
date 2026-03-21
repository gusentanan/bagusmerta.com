import { defineConfig, passthroughImageService } from 'astro/config';
import icon from "astro-icon";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  site: 'https://bagusmerta.com',
  output: "static",
  image: {
    service: passthroughImageService(),
  },
  integrations: [
    react(), icon(),
    tailwind({
      applyBaseStyles: false,
    })
  ],
});

