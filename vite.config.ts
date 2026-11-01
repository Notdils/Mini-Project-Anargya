import { defineConfig } from "vite";
import { resolve } from "node:path";

// Dua halaman: landing (/) dan toko (/shop)
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        shop: resolve(__dirname, "shop/index.html"),
      },
    },
  },
});
