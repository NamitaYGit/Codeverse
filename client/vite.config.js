import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Keep @ for src/
      "@lib": path.resolve(__dirname, "../client/lib"),
    },
  },
  optimizeDeps: {
    include: ["react-quill"],
  },
  server: {
    historyApiFallback: true,
  },
  build: {
    outDir: "dist",
  },
});
