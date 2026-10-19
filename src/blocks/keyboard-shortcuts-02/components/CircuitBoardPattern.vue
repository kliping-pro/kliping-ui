<script setup lang="ts">
/**
 * Pola papan sirkuit samar di belakang kartu keyboard-shortcuts-02: kisi garis
 * tipis tiap 20px dengan titik di persilangannya.
 *
 * `class` dari pemanggil digabung lewat `cn`, bukan menimpa — kelas posisinya
 * (`absolute inset-0 …`) harus tetap ada, kalau tidak polanya ikut mengalir
 * di dalam kartu dan mendorong isinya ke bawah.
 */
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{ class?: HTMLAttributes['class'] }>()
</script>

<template>
  <div
    :class="cn(
      'pointer-events-none absolute inset-0 -top-px z-0 opacity-40 dark:opacity-100',
      props.class,
    )"
    :style="{
      backgroundImage: `
        repeating-linear-gradient(0deg, transparent, transparent 19px, rgba(75, 85, 99, 0.08) 19px, rgba(75, 85, 99, 0.08) 20px, transparent 20px, transparent 39px, rgba(75, 85, 99, 0.08) 39px, rgba(75, 85, 99, 0.08) 40px),
        repeating-linear-gradient(90deg, transparent, transparent 19px, rgba(75, 85, 99, 0.08) 19px, rgba(75, 85, 99, 0.08) 20px, transparent 20px, transparent 39px, rgba(75, 85, 99, 0.08) 39px, rgba(75, 85, 99, 0.08) 40px),
        radial-gradient(circle at 20px 20px, rgba(55, 65, 81, 0.12) 2px, transparent 2px),
        radial-gradient(circle at 40px 40px, rgba(55, 65, 81, 0.12) 2px, transparent 2px)
      `,
      backgroundSize: '40px 40px, 40px 40px, 40px 40px, 40px 40px',
    }"
  />
</template>
