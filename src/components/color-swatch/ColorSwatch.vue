<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { ColorSwatchVariants } from '.'
import { Primitive } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { colorSwatchVariants, hasAlpha, isValidCssColor } from '.'

/**
 * Petak warna, dengan papan catur di belakangnya untuk warna tembus pandang.
 *
 * Tanpa papan catur itu, `rgb(255 0 0 / 0.1)` dan `rgb(255 0 0 / 0.9)`
 * terlihat nyaris sama di atas latar terang — dan yang dilihat pemakai bukan
 * yang dipilihnya.
 */
const props = withDefaults(defineProps<PrimitiveProps & {
  /** CSS color to display; empty shows a diagonal line, an invalid color renders transparent. */
  color?: string
  size?: ColorSwatchVariants['size']
  disabled?: boolean
  /** Draws the color flat, without the checkerboard, even when it is transparent. */
  withoutTransparency?: boolean
  class?: HTMLAttributes['class']
}>(), {
  size: 'default',
  disabled: false,
  withoutTransparency: false,
})

const color = computed(() => props.color?.trim())

const background = computed(() => {
  if (!color.value) {
    // Tidak adanya warna digambar sebagai garis miring, bukan petak kosong —
    // petak kosong tidak bisa dibedakan dari putih.
    return {
      background: 'linear-gradient(to bottom right, transparent calc(50% - 1px), var(--destructive) calc(50% - 1px) calc(50% + 1px), transparent calc(50% + 1px)) no-repeat',
    }
  }

  if (!isValidCssColor(color.value)) return { backgroundColor: 'transparent' }

  if (!props.withoutTransparency && hasAlpha(color.value)) {
    return {
      background: `linear-gradient(${color.value}, ${color.value}), repeating-conic-gradient(#ccc 0% 25%, #fff 0% 50%) 0% 50% / 10px 10px`,
    }
  }

  return { backgroundColor: color.value }
})

const label = computed(() => (color.value ? `Color: ${color.value}` : 'No color selected'))
</script>

<template>
  <Primitive
    :aria-disabled="props.disabled || undefined"
    :aria-label="label"
    :as="props.as"
    :as-child="props.asChild"
    :class="cn(colorSwatchVariants({ size: props.size }), props.class)"
    :data-disabled="props.disabled ? '' : undefined"
    data-slot="color-swatch"
    role="img"
    :style="{ ...background, forcedColorAdjust: 'none' }"
  />
</template>
