<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { Primitive } from 'reka-ui'
import { cn } from '@/lib/utils'
import { injectQRCodeContext } from './context'

/** A button that downloads the QR code as PNG or SVG. */
const props = withDefaults(defineProps<PrimitiveProps & {
  /** Downloaded file name without extension; the extension follows the format. */
  filename?: string
  /** File type to download: 'png' or 'svg'. */
  format?: 'png' | 'svg'
  class?: HTMLAttributes['class']
}>(), {
  as: 'button',
  filename: 'qr-code',
  format: 'png',
})

const { result } = injectQRCodeContext('QRCodeDownload')

function download() {
  const link = document.createElement('a')

  if (props.format === 'png' && result.dataUrl.value) {
    link.href = result.dataUrl.value
    link.download = `${props.filename}.png`
  }
  else if (props.format === 'svg' && result.svgString.value) {
    link.href = URL.createObjectURL(new Blob([result.svgString.value], { type: 'image/svg+xml' }))
    link.download = `${props.filename}.svg`
  }
  else {
    // Belum ada yang bisa diunduh. Diam lebih baik daripada mengunduh berkas
    // kosong yang terlihat seperti berhasil.
    return
  }

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  if (props.format === 'svg') URL.revokeObjectURL(link.href)
}
</script>

<template>
  <Primitive
    :as="props.as"
    :as-child="props.asChild"
    :class="cn('max-w-(--qr-code-size)', props.class)"
    data-slot="qr-code-download"
    type="button"
    @click="download"
  >
    <slot>Download {{ props.format.toUpperCase() }}</slot>
  </Primitive>
</template>
