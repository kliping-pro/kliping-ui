<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { SliderRange, SliderRoot, SliderThumb, SliderTrack } from 'reka-ui'
import { cn } from '@/lib/utils'
import { injectCropperContext } from './context'

/** Penggeser zum. */
const props = withDefaults(defineProps<{
  /** Smallest slider increment. The bounds come from the root. */
  step?: number
  class?: HTMLAttributes['class']
}>(), {
  step: 0.01,
})

const { state, setZoom, zoomLimits } = injectCropperContext('CropperZoomSlider')

function onUpdate(value: number[] | undefined) {
  if (value?.[0] !== undefined) setZoom(value[0])
}
</script>

<template>
  <SliderRoot
    :class="cn('relative flex w-full touch-none select-none items-center', props.class)"
    data-slot="cropper-zoom-slider"
    :disabled="state.disabled"
    :max="zoomLimits.max"
    :min="zoomLimits.min"
    :model-value="[state.zoom]"
    :step="props.step"
    @update:model-value="onUpdate"
  >
    <SliderTrack class="relative h-1.5 w-full grow overflow-hidden rounded-full bg-secondary">
      <SliderRange class="absolute h-full bg-primary" />
    </SliderTrack>
    <!-- Nama di gagang (role="slider"), bukan di akar `<span>` tanpa peran. -->
    <SliderThumb aria-label="Zoom" class="block size-4 rounded-full border border-primary/50 bg-background shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
  </SliderRoot>
</template>
