<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { injectQRCodeContext } from './context'

/** The QR code as an `<img>` with a data URL — can be copied and dragged. */
const props = withDefaults(defineProps<{
  /** Alternative text for the QR code image. */
  alt?: string
  class?: HTMLAttributes['class']
}>(), {
  alt: 'QR code',
})

// Ref yang bersarang di dalam objek biasa tidak dibuka bungkusnya di templat
// — cuma ref yang jadi binding tingkat atas `<script setup>` yang dibuka.
// Tanpa baris ini, `dataUrl` di templat adalah wadahnya, bukan isinya.
const { state, result } = injectQRCodeContext('QRCodeImage')
const { dataUrl } = result
</script>

<template>
  <img
    v-if="dataUrl"
    :alt="props.alt"
    :class="cn('relative max-h-(--qr-code-size) max-w-(--qr-code-size)', props.class)"
    data-slot="qr-code-image"
    :height="state.size"
    :src="dataUrl"
    :width="state.size"
  >
</template>
