import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { sites } from "@openai/sites-vite-plugin";

export default defineConfig(({ command }) => ({
  plugins: [react(), sites()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },
  optimizeDeps: {
    include: ["swiper/react", "swiper/modules"]
  },
  base: "/"
}));