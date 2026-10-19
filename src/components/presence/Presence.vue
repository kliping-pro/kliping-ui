<script setup lang="ts">
import { Presence as PresencePrimitive } from 'reka-ui'

/**
 * Menahan sebuah elemen tetap ada sampai animasi keluarnya selesai.
 *
 * Tanpa ini, `v-if` melepas elemennya dari DOM begitu nilainya jadi `false`,
 * dan animasi keluar tidak pernah sempat tergambar. Yang ditunggu peristiwa
 * `animationend` — jadi transisi CSS murni tidak ikut ditunggu, dan itu
 * berlaku sama di Radix maupun Reka UI.
 */
defineProps<{
  /** Whether the content is shown; when false it unmounts after its exit animation ends. */
  present: boolean
  /** Keeps the content rendered regardless of `present`. */
  forceMount?: boolean
}>()
</script>

<template>
  <PresencePrimitive :force-mount="forceMount" :present="present">
    <slot />
  </PresencePrimitive>
</template>
