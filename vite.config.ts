import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  base: "/",
  plugins: [vue()],
  server: {
    host: true,
    port: 8000,
  },
  define: {
    __COMMIT_HASH__: JSON.stringify(process.env.COMMIT_HASH || "dev"),
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern",
      },
    },
  },
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: "main.js",
      },
    },
  },
  root: "src",
  publicDir: "../public",
  cacheDir: "/tmp/.vite",
});
