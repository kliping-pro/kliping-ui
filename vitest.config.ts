import path from 'node:path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vitest/config'

/**
 * Konfigurasi uji, terpisah dari `vite.config.ts`.
 *
 * Dipisah supaya konfigurasi aplikasi tidak perlu memuat tipe Vitest, dan
 * supaya Tailwind tidak ikut dijalankan — uji di sini tidak memeriksa gaya.
 *
 * `jsdom`, bukan `node`: composable di sini memasang pendengar ke `window` dan
 * elemen, dan yang paling perlu dibuktikan justru bahwa pendengarnya benar-benar
 * dilepas. Tanpa DOM, uji yang membuktikannya tidak bisa ditulis.
 *
 * Plugin Vue-nya semula sengaja tidak dimuat: saat itu semua yang diuji berkas
 * `.ts`, dan composable tidak punya template. Sekarang ada primitif yang isinya
 * justru template — `marquee`, `border-beam`, `dot-pattern`, `particles`,
 * `animated-grid-pattern` — dan yang perlu dibuktikan darinya (jumlah salinan,
 * hitungan delay, pembersihan `requestAnimationFrame`) cuma bisa diperiksa
 * setelah komponennya benar-benar dipasang.
 */
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
  test: {
    environment: 'jsdom',
    include: ['src/**/*.test.ts'],
  },
})
