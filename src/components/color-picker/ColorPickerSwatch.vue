<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { ColorSwatch } from 'reka-ui'
import { cn } from '@/lib/utils'
import { injectColorPickerContext } from './context'

/**
 * Kotak pratinjau warna yang sedang terpilih.
 *
 * Papan caturnya ada di lapisan bawah, warnanya digambar di atasnya — supaya
 * warna yang setengah tembus pandang terbaca sebagaimana adanya, bukan
 * bercampur dengan latar halaman yang kebetulan ada di belakangnya.
 */
const props = defineProps<{
  /** The color to draw. Falls back to the root's color when empty. */
  color?: string
  class?: HTMLAttributes['class']
}>()

const { state } = injectColorPickerContext('ColorPickerSwatch')
</script>

<template>
  <span
    :class="cn('relative inline-block size-8 shrink-0 overflow-hidden rounded-md border', props.class)"
    data-slot="color-picker-swatch"
    :style="{ backgroundImage: 'repeating-conic-gradient(#ccc 0% 25%, #fff 0% 50%)', backgroundSize: '8px 8px' }"
  >
    <ColorSwatch class="absolute inset-0 size-full" :color="props.color ?? state.value" />
  </span>
</template>
