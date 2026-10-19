<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { LabelPosition } from './context'
import { cn } from '@/lib/utils'
import { injectMapMarkerContext } from './context'

/**
 * Teks yang selalu menempel di sisi penanda.
 *
 * Elemen penanda MapLibre sudah `position: absolute`, jadi label ini cukup
 * memosisikan dirinya terhadap elemen itu.
 */
const props = withDefaults(defineProps<{
  /** Side of the marker the label sits on: top, bottom, left, or right. */
  position?: LabelPosition
  class?: HTMLAttributes['class']
}>(), {
  position: 'top',
})

const { markerElement } = injectMapMarkerContext('MarkerLabel')

const positionClasses: Record<LabelPosition, string> = {
  top: '-top-8 left-1/2 -translate-x-1/2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
}
</script>

<template>
  <Teleport v-if="markerElement" :to="markerElement">
    <div
      :class="cn(
        'pointer-events-none absolute whitespace-nowrap rounded-md border border-border bg-background px-2 py-1 font-medium text-foreground text-xs shadow-sm',
        positionClasses[props.position],
        props.class,
      )"
      data-slot="marker-label"
    >
      <slot />
    </div>
  </Teleport>
</template>
