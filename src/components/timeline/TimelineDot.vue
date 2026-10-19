<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { Primitive } from 'reka-ui'
import { cn } from '@/lib/utils'
import { timelineDotVariants } from '.'
import { injectTimelineContext, injectTimelineItemContext } from './context'

/** The marker dot on the timeline; its color follows the item's status. */
const props = defineProps<PrimitiveProps & {
  class?: HTMLAttributes['class']
}>()

const { state } = injectTimelineContext('TimelineDot')
const item = injectTimelineItemContext('TimelineDot')
</script>

<template>
  <Primitive
    :as="props.as"
    :as-child="props.asChild"
    :class="cn(timelineDotVariants({
      status: item.status,
      orientation: state.orientation,
      variant: state.variant,
      isAlternateRight: item.isAlternateRight,
    }), props.class)"
    :data-orientation="state.orientation"
    data-slot="timeline-dot"
    :data-status="item.status"
  >
    <slot />
  </Primitive>
</template>
