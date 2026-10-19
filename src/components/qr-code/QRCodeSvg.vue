<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { injectQRCodeContext } from './context'

/**
 * Kode QR sebagai SVG — tajam di ukuran berapa pun.
 *
 * SVG-nya disisipkan sebagai HTML mentah, dan itu aman di sini karena
 * sumbernya bukan masukan pemakai melainkan keluaran pustaka `qrcode`
 * sendiri. Isi yang dikodekan tidak pernah sampai ke markup: ia jadi petak
 * hitam-putih, bukan teks.
 */
const props = defineProps<{ class?: HTMLAttributes['class'] }>()

const { state, result } = injectQRCodeContext('QRCodeSvg')
const { svgString } = result
</script>

<template>
  <!-- eslint-disable-next-line vue/no-v-html -->
  <div
    v-if="svgString"
    :class="cn('relative max-h-(--qr-code-size) max-w-(--qr-code-size)', props.class)"
    data-slot="qr-code-svg"
    :style="{ width: `${state.size}px`, height: `${state.size}px` }"
    v-html="svgString"
  />
</template>
