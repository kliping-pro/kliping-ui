<script setup lang="ts">
/**
 * Barisan konten yang bergulir tanpa henti.
 *
 * Isinya digandakan beberapa kali (`repeat`) lalu digeser sejauh lebar satu
 * salinan. Begitu salinan pertama habis, salinan berikutnya sudah berada persis
 * di tempatnya — jadi sambungannya tidak terlihat, dan tidak ada satu pun
 * perhitungan posisi yang dijalankan di JavaScript.
 *
 * `--duration` dan `--gap` bisa ditimpa lewat `class`, misalnya
 * `[--duration:20s]`, karena keduanya dibaca keyframes-nya langsung.
 *
 * Hanya salinan pertama yang dibacakan pembaca layar; sisanya `aria-hidden`
 * dan `inert` — tautan/tombol di salinan tidak ikut urutan Tab.
 * Tanpa itu daftar logo yang sama dibacakan empat kali berturut-turut.
 */
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { cn } from '@/lib/utils'

const props = withDefaults(defineProps<{
  class?: HTMLAttributes['class']
  /** Reverses the scroll direction. */
  reverse?: boolean
  /** Pauses scrolling while the pointer is over it. */
  pauseOnHover?: boolean
  /** Scrolls vertically instead of horizontally. */
  vertical?: boolean
  /** How many times the content is repeated. Too few leaves a visible gap. */
  repeat?: number
}>(), {
  reverse: false,
  pauseOnHover: false,
  vertical: false,
  repeat: 4,
})

const copies = computed(() => Array.from({ length: props.repeat }, (_, i) => i))
</script>

<template>
  <div
    data-slot="marquee"
    :class="cn(
      'group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)]',
      vertical ? 'flex-col' : 'flex-row',
      props.class,
    )"
  >
    <div
      v-for="i in copies"
      :key="i"
      :aria-hidden="i > 0 ? 'true' : undefined"
      :inert="i > 0 || undefined"
      :class="cn(
        'flex shrink-0 justify-around [gap:var(--gap)]',
        vertical ? 'animate-marquee-vertical flex-col' : 'animate-marquee flex-row',
        pauseOnHover && 'group-hover:[animation-play-state:paused]',
        reverse && '[animation-direction:reverse]',
      )"
    >
      <slot />
    </div>
  </div>
</template>
