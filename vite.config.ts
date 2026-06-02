import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import svgLoader from 'vite-svg-loader'

import AutoImport from 'unplugin-auto-import/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'

import { VitePWA } from "vite-plugin-pwa";
import { cloudflare } from "@cloudflare/vite-plugin";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), svgLoader({
    defaultImport: 'component'
  }), AutoImport({
    imports: [
      'vue',
      {
        'naive-ui': [
          'useDialog',
          'useMessage',
          'useNotification',
          'useLoadingBar'
        ]
      }
    ]
  }), Components({
    resolvers: [NaiveUiResolver()]
  }), VitePWA({
    registerType: "autoUpdate",
    workbox: {
      skipWaiting: true,
      clientsClaim: true,
      runtimeCaching: [
        {
          urlPattern: /(.*?)\.(js|css|woff2|woff|ttf)/, // js / css 静态资源缓存
          handler: "CacheFirst",
          options: {
            cacheName: "js-css-cache",
          },
        },
        {
          urlPattern: /(.*?)\.(png|jpe?g|svg|gif|bmp|psd|tiff|tga|eps)/, // 图片缓存
          handler: "CacheFirst",
          options: {
            cacheName: "image-cache",
          },
        },
      ],
      maximumFileSizeToCacheInBytes: 1024 * 1024 * 4
    },
    manifest: {
      name: 'Welcome to Sr6y20',
      short_name: 'Sr6y20',
      description: 'Sr6y20-Gsap',
      display: "standalone",
      start_url: "/",
      theme_color: "#424242",
      background_color: "#424242",
      icons: [
        {
          src: "/favicon.ico",
          sizes: "48x48",
          type: "image/png",
        },
        {
          src: "/favicon.ico",
          sizes: "72x72",
          type: "image/png",
        },
        {
          src: "/favicon.ico",
          sizes: "96x96",
          type: "image/png",
        },
        {
          src: "/favicon.ico",
          sizes: "128x128",
          type: "image/png",
        },
        {
          src: "/favicon.ico",
          sizes: "144x144",
          type: "image/png",
        },
        {
          src: "/favicon.ico",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "/favicon.ico",
          sizes: "512x512",
          type: "image/png",
        },
      ],
    },
  }), cloudflare()],
  css: {
    preprocessorOptions: {
      scss: {
        importers: [
          // ...
        ],
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})