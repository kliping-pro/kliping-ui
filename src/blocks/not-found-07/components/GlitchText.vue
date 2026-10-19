<script setup lang="ts">
/**
 * Teks yang bergetar seperti sinyal rusak.
 *
 * Caranya: teks yang sama digambar tiga kali. Yang asli diam di tempat; dua
 * salinan lagi — `::before` dan `::after` — digeser sedikit ke kiri dan kanan,
 * diberi bayangan merah dan biru, lalu dipotong `clip-path` yang berpindah-pindah.
 *
 * Kedua salinan itu memakai durasi yang berbeda dan bukan kelipatan satu sama
 * lain, jadi potongannya tidak pernah bertemu di pola yang sama. Itu yang
 * membuatnya terlihat acak padahal keduanya animasi berulang biasa.
 *
 * Isinya diteruskan lewat prop `text`, bukan slot, karena `::before` dan
 * `::after` mengambil isinya dari `content: attr(data-text)` — dan atribut cuma
 * bisa memuat teks, bukan simpul.
 */
import type { CSSProperties, HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { cn } from '@/lib/utils'

const props = withDefaults(defineProps<{
  class?: HTMLAttributes['class']
  /** The text to glitch. */
  text: string
  /** Higher values make the glitch slower. */
  speed?: number
  /** Red and cyan shadows on both copies. */
  enableShadows?: boolean
  /** Stays still until the pointer hovers over it. */
  enableOnHover?: boolean
}>(), {
  speed: 0.5,
  enableShadows: true,
  enableOnHover: false,
})

const glitchStyle = computed<CSSProperties>(() => ({
  '--after-duration': `${props.speed * 3}s`,
  '--before-duration': `${props.speed * 2}s`,
  '--after-shadow': props.enableShadows ? '-5px 0 red' : 'none',
  '--before-shadow': props.enableShadows ? '5px 0 cyan' : 'none',
} as CSSProperties))

const baseClass = 'relative mx-auto cursor-pointer select-none text-[clamp(2rem,10vw,8rem)] font-black text-foreground'

const hoverClass = [
  "after:absolute after:left-[10px] after:top-0 after:overflow-hidden after:bg-muted/5 after:text-white after:opacity-0 after:content-[''] after:[clip-path:inset(0_0_0_0)]",
  "before:absolute before:left-[-10px] before:top-0 before:overflow-hidden before:bg-muted/5 before:text-white before:opacity-0 before:content-[''] before:[clip-path:inset(0_0_0_0)]",
  'hover:after:animate-glitch-after hover:after:opacity-100 hover:after:content-[attr(data-text)] hover:after:[text-shadow:var(--after-shadow)]',
  'hover:before:animate-glitch-before hover:before:opacity-100 hover:before:content-[attr(data-text)] hover:before:[text-shadow:var(--before-shadow)]',
].join(' ')

const alwaysClass = [
  'after:absolute after:left-[10px] after:top-0 after:animate-glitch-after after:overflow-hidden after:bg-muted/5 after:text-foreground after:content-[attr(data-text)] after:[clip-path:inset(0_0_0_0)] after:[text-shadow:var(--after-shadow)]',
  'before:absolute before:left-[-10px] before:top-0 before:animate-glitch-before before:overflow-hidden before:bg-muted/5 before:text-foreground before:content-[attr(data-text)] before:[clip-path:inset(0_0_0_0)] before:[text-shadow:var(--before-shadow)]',
].join(' ')
</script>

<template>
  <div
    :class="cn(baseClass, enableOnHover ? hoverClass : alwaysClass, props.class)"
    :data-text="text"
    :style="glitchStyle"
  >
    {{ text }}
  </div>
</template>
