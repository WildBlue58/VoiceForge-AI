import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@services": path.resolve(__dirname, "./src/services"),
      "@contexts": path.resolve(__dirname, "./src/contexts"),
    },
  },
  build: {
    // 代码分割策略
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          transformers: ["@xenova/transformers"],
        },
      },
    },
    // 优化chunk大小警告阈值
    chunkSizeWarningLimit: 1000,
  },
  // 优化开发服务器
  server: {
    host: true,
    open: true,
  },
});
