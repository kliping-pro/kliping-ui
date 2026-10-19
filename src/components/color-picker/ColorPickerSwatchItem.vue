<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { CheckIcon } from '@lucide/vue'
import { ColorSwatchPickerItem, ColorSwatchPickerItemIndicator, ColorSwatchPickerItemSwatch } from 'reka-ui'
import { cn } from '@/lib/utils'

/**
 * Satu warna di dalam palet.
 *
 * Tanda centangnya digambar di atas warnanya dengan bayangan, bukan dengan
 * warna yang dihitung dari terangnya latar — centang putih berbayang terbaca
 * di atas kuning maupun di atas biru tua, dan tidak menuntut perhitungan
 * kontras yang tetap saja meleset di warna-warna tengah.
 */
const props = defineProps<{
  /** Color this swatch shows and selects, as a CSS color string. */
  value: string
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <ColorSwatchPickerItem
    :class="cn(
      'relative size-6 cursor-pointer overflow-hidden rounded-md border outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',
      props.class,
    )"
    data-slot="color-picker-swatch-item"
    :value="props.value"
  >
    <ColorSwatchPickerItemSwatch class="absolute inset-0 size-full" />
    <ColorSwatchPickerItemIndicator class="absolute inset-0 flex items-center justify-center">
      <CheckIcon class="size-3.5 text-white drop-shadow-[0_1px_1px_rgb(0_0_0/0.7)]" />
    </ColorSwatchPickerItemIndicator>
  </ColorSwatchPickerItem>
</template>
