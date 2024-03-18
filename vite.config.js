import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true,
    manifest: "manifest.json"
  },
  server: {
    host: true,
    port: 9000,
    watch: {
      usePolling: true
    }
  }
});
