<script setup lang="ts">
/**
 * Satu ubin ikon berbingkai, dengan empat garis putus-putus yang menjulur
 * keluar dari tiap sisinya lalu memudar.
 *
 * Di sumbernya keempat garis itu ditulis ulang utuh di tiap ubin — empat kali,
 * dua puluh baris yang sama persis. Di sini ditulis sekali. Tidak ada perilaku
 * yang berubah; yang berubah cuma berapa banyak tempat yang harus disunting
 * kalau salah satu garisnya perlu digeser.
 */
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{ class?: HTMLAttributes['class'] }>()
</script>

<template>
  <div
    :class="cn(
      'relative flex size-20 items-center justify-center border border-white/40 bg-white/10 max-md:hidden',
      props.class,
    )"
  >
    <slot />
    <div class="absolute -inset-y-12 -left-px border-s border-dashed border-white/60 mask-y-from-75%" />
    <div class="absolute -inset-y-12 -right-px border-e border-dashed border-white/60 mask-y-from-75%" />
    <div class="absolute -inset-x-12 -top-px border-t border-dashed border-white/80 mask-x-from-75%" />
    <div class="absolute -inset-x-12 -bottom-px border-b border-dashed border-white/80 mask-x-from-75%" />
  </div>
</template>
