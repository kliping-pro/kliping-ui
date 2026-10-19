<script setup lang="ts">
import type { Color, ColorChannel, ColorSpace } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { ColorAreaArea, ColorAreaRoot, ColorAreaThumb } from 'reka-ui'
import { cn } from '@/lib/utils'
import { injectColorPickerContext, toColorString } from './context'

/**
 * Bidang saturasi dan kecerahan.
 *
 * Sumbu bawaannya saturasi mendatar dan kecerahan menegak — susunan yang
 * dipakai hampir semua pemilih warna, dan yang paling terbaca karena rona
 * dipisahkan ke penggesernya sendiri.
 */
const props = withDefaults(defineProps<{
  /** Color space the area's two channels belong to (default `hsb`). */
  colorSpace?: ColorSpace
  /** Channel mapped to the horizontal axis (default `saturation`). */
  xChannel?: ColorChannel
  /** Channel mapped to the vertical axis (default `brightness`). */
  yChannel?: ColorChannel
  class?: HTMLAttributes['class']
}>(), {
  colorSpace: 'hsb',
  xChannel: 'saturation',
  yChannel: 'brightness',
})

const { state, setValue } = injectColorPickerContext('ColorPickerArea')

function forward(color: string | Color) {
  setValue(toColorString(color, state.value.format))
}
</script>

<template>
  <ColorAreaRoot
    :class="cn('relative h-40 w-full overflow-hidden rounded-md border', props.class)"
    :color-space="props.colorSpace"
    data-slot="color-picker-area"
    :disabled="state.disabled"
    :model-value="state.value"
    :x-channel="props.xChannel"
    :y-channel="props.yChannel"
    @update:model-value="forward"
  >
    <ColorAreaArea class="size-full">
      <ColorAreaThumb class="size-4 rounded-full border-2 border-white shadow-md ring-1 ring-black/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
    </ColorAreaArea>
  </ColorAreaRoot>
</template>
