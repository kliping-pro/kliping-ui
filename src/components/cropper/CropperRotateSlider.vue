<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { SliderRange, SliderRoot, SliderThumb, SliderTrack } from 'reka-ui'
import { cn } from '@/lib/utils'
import { injectCropperContext } from './context'

/** Rotation slider, in degrees. */
const props = withDefaults(defineProps<{
  /** Lowest rotation the slider can set, in degrees. */
  min?: number
  /** Highest rotation the slider can set, in degrees. */
  max?: number
  /** Slider increment, in degrees. */
  step?: number
  class?: HTMLAttributes['class']
}>(), {
  min: -180,
  max: 180,
  step: 1,
})

const { state, setRotation } = injectCropperContext('CropperRotateSlider')

function onUpdate(value: number[] | undefined) {
  if (value?.[0] !== undefined) setRotation(value[0])
}
</script>

<template>
  <SliderRoot
    :class="cn('relative flex w-full touch-none select-none items-center', props.class)"
    data-slot="cropper-rotate-slider"
    :disabled="state.disabled"
    :max="props.max"
    :min="props.min"
    :model-value="[state.rotation]"
    :step="props.step"
    @update:model-value="onUpdate"
  >
    <SliderTrack class="relative h-1.5 w-full grow overflow-hidden rounded-full bg-secondary">
      <SliderRange class="absolute h-full bg-primary" />
    </SliderTrack>
    <!-- Nama di gagang (role="slider"), bukan di akar `<span>` tanpa peran. -->
    <SliderThumb aria-label="Rotation" class="block size-4 rounded-full border border-primary/50 bg-background shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
  </SliderRoot>
</template>
