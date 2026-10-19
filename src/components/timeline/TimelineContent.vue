<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { Primitive } from 'reka-ui'
import { cn } from '@/lib/utils'
import { timelineContentVariants } from '.'
import { injectTimelineContext, injectTimelineItemContext } from './context'

/** The content of an item — title, description, anything. */
const props = defineProps<PrimitiveProps & {
  class?: HTMLAttributes['class']
}>()

const { state } = injectTimelineContext('TimelineContent')
const item = injectTimelineItemContext('TimelineContent')
</script>

<template>
  <Primitive
    :as="props.as"
    :as-child="props.asChild"
    :class="cn(timelineContentVariants({
      orientation: state.orientation,
      variant: state.variant,
      isAlternateRight: item.isAlternateRight,
    }), props.class)"
    data-slot="timeline-content"
    :data-status="item.status"
  >
    <slot />
  </Primitive>
</template>
