import { defineConfig } from "npm:vite";
import vue from "npm:@vitejs/plugin-vue";
import { Env } from "https://deno.land/x/env@v2.2.0/env.js";

const env = new Env();

export default defineConfig({
  base: "/",
  plugins: [vue()],
  server: {
    host: true,
    port: 8000,
  },
  define: {
    __COMMIT_HASH__: JSON.stringify(env.get("COMMIT_HASH", "dev")),
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
});
