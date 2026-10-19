<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { QRCodeLevel } from './context'
import { Primitive } from 'reka-ui'
import { computed, nextTick, ref, watch } from 'vue'
import { cn } from '@/lib/utils'
import { provideQRCodeContext } from './context'

/**
 * Akar kode QR.
 *
 * Pustaka `qrcode` diimpor secara dinamis, dan itu bukan sekadar rapi:
 * pustakanya sekitar 50 KB terkompresi, dan halaman yang cuma memuat satu
 * kode QR di bagian bawah tidak seharusnya membayarnya di muat pertama.
 *
 * Tiga bentuk keluarannya dibuat sekaligus — data URL, teks SVG, dan gambar
 * di kanvas — karena ketiganya berasal dari satu perhitungan yang sama dan
 * bagian-bagiannya bebas memilih yang mana pun.
 */
const props = withDefaults(defineProps<PrimitiveProps & {
  /** The content to encode. */
  value: string
  /** Width and height of the code, in pixels. */
  size?: number
  /** Error correction level, from lowest to highest: 'L', 'M', 'Q', or 'H'. */
  level?: QRCodeLevel
  /** The width of the quiet zone around it, in modules. */
  margin?: number
  /** Deprecated, no effect: the data URL is PNG, which is lossless. Will be removed. @deprecated */
  quality?: number
  /** Color of the light modules and quiet zone, as a hex string. */
  backgroundColor?: string
  /** Color of the dark modules, as a hex string. */
  foregroundColor?: string
  class?: HTMLAttributes['class']
}>(), {
  size: 200,
  level: 'M',
  margin: 1,
  quality: 0.92,
  backgroundColor: '#ffffff',
  foregroundColor: '#000000',
})

const emit = defineEmits<{
  /** Generating the code failed. */
  error: [error: Error]
  /** The code was generated (canvas, data URL, and SVG). */
  generated: []
}>()

const dataUrl = ref<string | null>(null)
const svgString = ref<string | null>(null)
const isGenerating = ref(false)
const error = ref<Error | null>(null)
const canvas = ref<HTMLCanvasElement>()

const options = computed(() => ({
  errorCorrectionLevel: props.level,
  margin: props.margin,
  color: { dark: props.foregroundColor, light: props.backgroundColor },
  width: props.size,
}))

async function generate() {
  if (!props.value) return

  isGenerating.value = true
  error.value = null

  try {
    const QRCode = (await import('qrcode')).default

    // Data URL bisa gagal sendiri di lingkungan tanpa kanvas, dan itu tidak
    // boleh menggagalkan SVG-nya — dua bentuk keluaran yang berbeda tidak
    // saling bergantung.
    try {
      dataUrl.value = await QRCode.toDataURL(props.value, { ...options.value, type: 'image/png' })
    }
    catch {
      dataUrl.value = null
    }

    // Kanvasnya digambar setelah anaknya sempat terpasang; sebelum itu
    // ref-nya masih kosong dan gambarnya hilang tanpa keluhan.
    await nextTick()
    if (canvas.value) await QRCode.toCanvas(canvas.value, props.value, options.value)

    svgString.value = await QRCode.toString(props.value, { ...options.value, type: 'svg' })

    isGenerating.value = false
    emit('generated')
  }
  catch (cause) {
    const resolved = cause instanceof Error ? cause : new Error('Failed to generate the QR code.')
    error.value = resolved
    isGenerating.value = false
    emit('error', resolved)
  }
}

watch(
  () => [props.value, props.size, props.level, props.margin, props.foregroundColor, props.backgroundColor],
  generate,
  { immediate: true, flush: 'post' },
)

provideQRCodeContext({
  state: computed(() => ({
    value: props.value,
    size: props.size,
    margin: props.margin,
    level: props.level,
    backgroundColor: props.backgroundColor,
    foregroundColor: props.foregroundColor,
  })),
  result: { dataUrl, svgString, isGenerating, error, canvas },
})
</script>

<template>
  <Primitive
    :as="props.as"
    :as-child="props.asChild"
    :class="cn('relative flex flex-col items-center gap-2', props.class)"
    data-slot="qr-code"
    :style="{ '--qr-code-size': `${props.size}px` }"
  >
    <slot />
  </Primitive>
</template>
