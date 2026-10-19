<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { ComboboxContent as ComboboxContentPrimitive, ComboboxPortal, ComboboxViewport } from 'reka-ui'
import { cn } from '@/lib/utils'

/** The list of options floating below the input. */
const props = withDefaults(defineProps<PrimitiveProps & {
  /** Positioning mode: `popper` (default) floats next to the input, `inline` renders in place. */
  position?: 'inline' | 'popper'
  /** Preferred side of the input to place the list on (popper mode). */
  side?: 'top' | 'right' | 'bottom' | 'left'
  /** Distance in px between the input and the list (default 4). */
  sideOffset?: number
  /** Alignment of the list against the input along the chosen side. */
  align?: 'start' | 'center' | 'end'
  class?: HTMLAttributes['class']
}>(), {
  position: 'popper',
  sideOffset: 4,
})
</script>

<template>
  <ComboboxPortal>
    <ComboboxContentPrimitive
      :align="props.align"
      :as="props.as"
      :as-child="props.asChild"
      :class="cn(
        'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-fit min-w-(--reka-combobox-trigger-width) origin-(--reka-combobox-content-transform-origin) overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=closed]:animate-out data-[state=open]:animate-in',
        props.class,
      )"
      data-slot="combobox-content"
      :position="props.position"
      :side="props.side"
      :side-offset="props.sideOffset"
    >
      <ComboboxViewport>
        <slot />
      </ComboboxViewport>
    </ComboboxContentPrimitive>
  </ComboboxPortal>
</template>
