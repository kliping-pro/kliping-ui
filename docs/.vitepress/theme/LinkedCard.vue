<script setup lang="ts">
import { withBase } from 'vitepress'
import { cn } from '@/lib/utils'

/**
 * Kartu tautan untuk petak pilihan di halaman Instalasi, Mode Gelap, Form, dan
 * Direktori Registry.
 *
 * Di Nuxt Content ini sebuah komponen MDC bernama `<linked-card>`. Skrip
 * konversi dulu meratakannya jadi tautan markdown biasa, dan hasilnya pecah:
 * logo SVG di dalamnya hilang, lalu sisa teksnya terurai jadi blok kode.
 * Dipulihkan sebagai komponen supaya isinya — termasuk SVG — tetap utuh.
 */
const props = defineProps<{ href: string, class?: string }>()
</script>

<template>
  <a
    data-slot="linked-card"
    :href="withBase(props.href)"
    :class="cn(
      'kliping-card text-card-foreground flex w-full flex-col items-center p-6 no-underline! sm:p-10',
      props.class,
    )"
  >
    <slot />
  </a>
</template>
