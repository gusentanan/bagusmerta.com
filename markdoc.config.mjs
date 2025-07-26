import { defineMarkdocConfig, component } from '@astrojs/markdoc/config';
import shiki from '@astrojs/markdoc/shiki';

/**
 * cc: https://docs.astro.build/en/guides/integrations-guide/markdoc/#syntax-highlighting
 */
export default defineMarkdocConfig({
  extends: [
    shiki({
      // Using one-dark-pro theme for better dark integration
      // https://github.com/shikijs/shiki/blob/main/docs/themes.md
      theme: 'one-dark-pro',
      // Disable word wrap to allow horizontal scrolling
      // Default: false
      wrap: false,
      // Pass custom languages
      // Note: Shiki has countless langs built-in, including `.astro`!
      // https://github.com/shikijs/shiki/blob/main/docs/languages.md
    }),
  ],
});