import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.png", "privacy.html"],
      manifest: {
        name: "Bulls & Bears — Crypto Sentiment",
        short_name: "Bulls&Bears",
        description: "Live bull/bear sentiment voor Bitcoin, goud en de S&P 500 op basis van technische indicatoren.",
        lang: "nl",
        theme_color: "#08070a",
        background_color: "#08070a",
        display: "standalone",
        orientation: "portrait",
        start_url: "/",
        scope: "/",
       icons: [
          { src: "icon-192.png", sizes: "192x192", type: "image/png" },
          { src: "icon-512.png", sizes: "512x512", type: "image/png" },
          { src: "icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" }
        ]
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,png,webp,woff2}"],
        navigateFallback: "index.html",
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.origin === "https://api.binance.com" || url.origin === "https://api.allorigins.win",
            handler: "NetworkFirst",
            options: {
              cacheName: "market-data",
              networkTimeoutSeconds: 8,
              expiration: { maxEntries: 60, maxAgeSeconds: 300 }
            }
          },
          {
            urlPattern: ({ url }) => url.origin === "https://fonts.googleapis.com" || url.origin === "https://fonts.gstatic.com",
            handler: "CacheFirst",
            options: { cacheName: "google-fonts", expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 * 365 } }
          }
        ]
      }
    })
  ]
});
