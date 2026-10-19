<script setup lang="ts">
import type { ColorChannel, ColorSpace } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { ColorFieldInput, ColorFieldRoot } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { injectColorPickerContext } from './context'

/**
 * Masukan teks untuk warnanya.
 *
 * Tanpa `channel`, yang diketik warna utuh — hex, `rgb()`, `hsl()`, atau
 * `hsb()`, dan `ColorFieldRoot` yang mengurainya. Dengan `channel`, yang
 * diketik satu saluran saja: `channel="red"` memberi kotak angka merah yang
 * naik turun dengan panah dan roda.
 *
 * Nilai yang tidak sah tidak pernah sampai ke `v-model` akarnya — yang
 * diurungkan ke nilai sebelumnya saat kotaknya kehilangan fokus.
 */
const props = withDefaults(defineProps<{
  /** Edits a single channel as a number when set; otherwise the whole color is typed as text. */
  channel?: ColorChannel
  /** Color space that `channel` belongs to (default `rgb`). */
  colorSpace?: ColorSpace
  /** Placeholder text shown while the field is empty. */
  placeholder?: string
  /** Accessible name of the text field; defaults to the channel name or "Color". */
  ariaLabel?: string
  class?: HTMLAttributes['class']
}>(), {
  colorSpace: 'rgb',
})

const { state, setValue } = injectColorPickerContext('ColorPickerInput')

// Nama dipasang di `<input>`-nya sendiri, bukan di akar pembungkus — kotak
// teks tanpa label tidak bisa dikenali pembaca layar.
const label = computed(() => props.ariaLabel
  ?? (props.channel ? props.channel.charAt(0).toUpperCase() + props.channel.slice(1) : 'Color'))
</script>

<template>
  <ColorFieldRoot
    :channel="props.channel"
    :color-space="props.colorSpace"
    data-slot="color-picker-input"
    :disabled="state.disabled"
    :model-value="state.value"
    :placeholder="props.placeholder"
    @update:model-value="setValue"
  >
    <ColorFieldInput
      :aria-label="label"
      :class="cn(
        'h-8 w-full min-w-0 rounded-md border bg-transparent px-2 font-mono text-base shadow-xs transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        props.class,
      )"
    />
  </ColorFieldRoot>
</template>
