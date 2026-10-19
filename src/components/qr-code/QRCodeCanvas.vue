<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { onMounted, ref } from 'vue'
import { cn } from '@/lib/utils'
import { injectQRCodeContext } from './context'

/** The QR code drawn to a canvas. The lightest form to download as a PNG. */
const props = defineProps<{ class?: HTMLAttributes['class'] }>()

const { state, result } = injectQRCodeContext('QRCodeCanvas')
const { svgString } = result

// `ref="elemen"` bukan ungkapan — atribut `ref` berupa teks adalah NAMA
// ref, jadi yang tercatat `$refs['hasil.kanvas']` dan kanvasnya tidak pernah
// sampai ke akarnya. Yang benar ref lokal yang diteruskan setelah terpasang.
const canvasEl = ref<HTMLCanvasElement>()

onMounted(() => {
  result.canvas.value = canvasEl.value
})
</script>

<template>
  <canvas
    ref="canvasEl"
    :class="cn(
      'relative max-h-(--qr-code-size) max-w-(--qr-code-size)',
      !svgString && 'invisible',
      props.class,
    )"
    data-slot="qr-code-canvas"
    :height="state.size"
    :width="state.size"
  />
</template>
