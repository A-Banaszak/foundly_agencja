// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://foundly.pl',
  devToolbar: {
    enabled: false
  },
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [react(), sitemap({
    filter: (page) => 
      !page.includes('/panel-foundly') && 
      !page.includes('/panel-klienta') && 
      !page.includes('/polityka-prywatnosci') && 
      !page.includes('/regulamin')
  })]
});