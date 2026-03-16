import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'url';

export default defineConfig({
  site: 'https://miefuso-web-admin.github.io',
  base: '/web',
  vite: {
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url))
      }
    }
  }
});
