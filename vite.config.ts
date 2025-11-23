import { defineConfig, type UserConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const getReplitPlugins = async () => {
  if (process.env.NODE_ENV !== "production" && process.env.REPL_ID !== undefined) {
    const [cartographerModule, devBannerModule] = await Promise.all([
      import("@replit/vite-plugin-cartographer"),
      import("@replit/vite-plugin-dev-banner"),
    ]);
    return [cartographerModule.cartographer(), devBannerModule.devBanner()];
  }
  return [];
};

export default defineConfig(async (): Promise<UserConfig> => {
  const replitPlugins = await getReplitPlugins();
  
  return {
    plugins: [
      react({
        jsxRuntime: 'automatic',
      }),
      runtimeErrorOverlay(),
      ...replitPlugins,
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "client", "src"),
        "@shared": path.resolve(__dirname, "shared"),
        "@assets": path.resolve(__dirname, "public"),
      },
    },
    root: path.resolve(__dirname, "client"),
    base: '/',
    build: {
      outDir: path.resolve(__dirname, "dist/public"),
      emptyOutDir: true,
      minify: 'esbuild',
      cssMinify: true,
      sourcemap: false,
      rollupOptions: {
        output: {
          assetFileNames: 'assets/[name]-[hash][extname]',
          chunkFileNames: 'assets/[name]-[hash].js',
          entryFileNames: 'assets/[name]-[hash].js',
        },
      },
      chunkSizeWarningLimit: 1000,
      target: 'es2015',
    },
    server: {
      fs: {
        strict: true,
        deny: ["**/.*"],
      },
    },
  };
});
