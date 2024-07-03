import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { compression } from 'vite-plugin-compression2';

// Determine if the current environment is production
const isProduction = process.env.NODE_ENV === 'production';

export default defineConfig({
  plugins: [react(), compression()],
  build: {
    // Disable sourcemaps in production for smaller build sizes
    sourcemap: !isProduction,
    manifest: isProduction ? "manifest.json" : undefined,
  },
  // Only include server configuration in development
  ...(isProduction ? {} : {
    server: {
      host: true,
      port: 9000,
      watch: {
        usePolling: true
      }
    }
  })
});