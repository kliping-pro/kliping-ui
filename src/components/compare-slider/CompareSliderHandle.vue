<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, ChevronUpIcon } from '@lucide/vue'
import { Primitive } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { injectCompareSliderContext } from './context'

/** The divider line and its grip; fill the slot to replace them. */
const props = defineProps<PrimitiveProps & {
  class?: HTMLAttributes['class']
}>()

const context = injectCompareSliderContext('CompareSliderHandle')

const isVertical = computed(() => context.value.orientation === 'vertical')
</script>

<template>
  <Primitive
    aria-hidden="true"
    :as="props.as"
    :as-child="props.asChild"
    :class="cn(
      'absolute z-50 flex items-center justify-center',
      isVertical ? 'left-0 h-10 w-full -translate-y-1/2' : 'top-0 h-full w-10 -translate-x-1/2',
      context.interaction === 'drag' && 'cursor-grab active:cursor-grabbing',
      props.class,
    )"
    :data-orientation="context.orientation"
    data-slot="compare-slider-handle"
    role="presentation"
    :style="isVertical ? { top: `${context.value}%` } : { left: `${context.value}%` }"
  >
    <slot>
      <div :class="cn('absolute bg-background', isVertical ? 'top-1/2 h-1 w-full -translate-y-1/2' : 'left-1/2 h-full w-1 -translate-x-1/2')" />
      <div
        v-if="context.interaction === 'drag'"
        class="z-50 flex aspect-square size-11 shrink-0 items-center justify-center rounded-full bg-background p-2 [&_svg]:size-4 [&_svg]:select-none [&_svg]:stroke-3 [&_svg]:text-muted-foreground"
      >
        <div v-if="isVertical" class="flex flex-col items-center">
          <ChevronUpIcon />
          <ChevronDownIcon />
        </div>
        <div v-else class="flex items-center">
          <ChevronLeftIcon />
          <ChevronRightIcon />
        </div>
      </div>
    </slot>
  </Primitive>
</template>
