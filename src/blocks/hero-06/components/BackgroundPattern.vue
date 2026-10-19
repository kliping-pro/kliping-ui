<script setup lang="ts">
/**
 * Latar hero-06: titik-titik statis, ditumpuk partikel yang menghindari kursor.
 *
 * Warna partikelnya harus ikut berganti saat tema berganti — putih di atas
 * gelap, hitam di atas terang — dan itu satu-satunya alasan komponen ini perlu
 * tahu tema yang sedang aktif.
 *
 * Sumbernya membaca tema lewat pustaka tema bawaan framework-nya. Di sini yang
 * dibaca adalah kelas `.dark` di elemen `<html>` — sumber kebenaran yang sama
 * yang dipakai seluruh Tailwind di project ini, dan yang dipasang oleh apa pun
 * yang mengatur tema: VitePress, `useColorMode`, Nuxt Color Mode, atau tombol
 * buatan sendiri. Jadi block ini ikut tema pemakainya tanpa memaksa satu pun
 * pustaka tema tertentu ikut terpasang.
 *
 * Dibaca lewat `MutationObserver`, bukan sekali di `onMounted`: pembaca yang
 * mengganti tema selagi melihat block ini harus melihat partikelnya ikut
 * berganti, bukan tetap hitam di atas latar yang sudah gelap.
 */
import { onMounted, onScopeDispose, ref } from 'vue'
import { DotPattern } from '@/components/ui/dot-pattern'
import { Particles } from '@/components/ui/particles'
import { cn } from '@/lib/utils'

const isDark = ref(false)

onMounted(() => {
  const root = document.documentElement
  const readTheme = () => {
    isDark.value = root.classList.contains('dark')
  }

  readTheme()

  const observer = new MutationObserver(readTheme)
  observer.observe(root, { attributes: true, attributeFilter: ['class'] })
  onScopeDispose(() => observer.disconnect())
})
</script>

<template>
  <DotPattern
    :class="cn(
      'mask-[radial-gradient(ellipse,rgba(0,0,0,0.3)_30%,black_50%)]',
      'dark:fill-slate-700',
    )"
    :cr="1"
    :cx="1"
    :cy="1"
    :height="20"
    :width="20"
  />
  <Particles
    class="absolute inset-0"
    :color="isDark ? '#fff' : '#000'"
    :ease="80"
    :quantity="100"
  />
</template>
