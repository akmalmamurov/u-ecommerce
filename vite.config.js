import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react"],
          "react-dom": ["react-dom"],
        },
      },
    },
  },
  server: {
    historyApiFallback: true,
  },
  resolve: {
    alias: {
      assets: "/src/assets",
      components: "/src/components",
      hooks: "/src/hooks",
      pages: "/src/pages",
      constants: "/src/constants",
      server: "/src/server",
      theme: "/src/theme",
      utils: "/src/utils",
      "@yandex/ymaps3": "@yandex/ymaps3-reactify",
    },
  },
});
