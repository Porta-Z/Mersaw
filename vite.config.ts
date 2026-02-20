import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: "/Mersaw/",
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Production optimizations
  build: {
    // Generate source maps for debugging (set to false for smaller bundles)
    sourcemap: false,
    // Minify using esbuild (fastest)
    minify: "esbuild",
    // Chunk size warning limit
    chunkSizeWarningLimit: 1000,
    // Rollup options for better splitting
    rollupOptions: {
      output: {
        // Manual chunks to split vendor libraries
        manualChunks: {
          // React and related
          "vendor-react": ["react", "react-dom", "react-router-dom"],
          // Radix UI components
          "vendor-radix": [
            "@radix-ui/react-dialog",
            "@radix-ui/react-dropdown-menu",
            "@radix-ui/react-tooltip",
            "@radix-ui/react-tabs",
            "@radix-ui/react-accordion",
            "@radix-ui/react-select",
          ],
          // Animation libraries
          "vendor-motion": ["framer-motion"],
          // UI utilities
          "vendor-ui": ["clsx", "tailwind-merge", "class-variance-authority"],
        },
      },
    },
    // CSS code splitting
    cssCodeSplit: true,
    // Enable tree shaking
    treeShaking: true,
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ["react", "react-dom", "react-router-dom"],
  },
  // Compress the build output
  compressHTML: true,
}));
