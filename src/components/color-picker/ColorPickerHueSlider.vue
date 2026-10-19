<script setup lang="ts">
import type { Color } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { ColorSliderRoot, ColorSliderThumb, ColorSliderTrack } from 'reka-ui'
import { cn } from '@/lib/utils'
import { injectColorPickerContext, toColorString } from './context'

/** The hue slider. */
const props = defineProps<{ class?: HTMLAttributes['class'] }>()

const { state, setValue } = injectColorPickerContext('ColorPickerHueSlider')

function forward(color: string | Color) {
  setValue(toColorString(color, state.value.format))
}
</script>

<template>
  <ColorSliderRoot
    channel="hue"
    :class="cn('relative flex h-4 w-full items-center', props.class)"
    color-space="hsb"
    data-slot="color-picker-hue-slider"
    :disabled="state.disabled"
    :model-value="state.value"
    @update:model-value="forward"
  >
    <ColorSliderTrack class="h-3 w-full rounded-full border">
      <ColorSliderThumb class="size-4 rounded-full border-2 border-white shadow-md ring-1 ring-black/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
    </ColorSliderTrack>
  </ColorSliderRoot>
</template>
