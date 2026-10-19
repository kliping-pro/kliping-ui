<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { ZoomInIcon, ZoomOutIcon } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { injectCropperContext } from './context'

/** Button that zooms in or out by one step. */
const props = withDefaults(defineProps<{
  /** Whether each press zooms 'in' or 'out'. */
  direction?: 'in' | 'out'
  /** Size of one step. Falls back to the root zoom step. */
  step?: number
  class?: HTMLAttributes['class']
}>(), {
  direction: 'in',
})

const { state, setZoom, zoomLimits } = injectCropperContext('CropperZoom')

function zoom() {
  const sign = props.direction === 'in' ? 1 : -1
  setZoom(state.value.zoom + sign * (props.step ?? zoomLimits.value.step))
}
</script>

<template>
  <Button
    :aria-label="props.direction === 'in' ? 'Zoom in' : 'Zoom out'"
    :class="cn(props.class)"
    data-slot="cropper-zoom"
    :disabled="state.disabled"
    size="icon"
    variant="outline"
    @click="zoom"
  >
    <slot>
      <ZoomInIcon v-if="props.direction === 'in'" />
      <ZoomOutIcon v-else />
    </slot>
  </Button>
</template>
