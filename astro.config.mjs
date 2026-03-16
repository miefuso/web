import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'url';

export default defineConfig({
  vite: {
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url))
      }
    }
  }
});
