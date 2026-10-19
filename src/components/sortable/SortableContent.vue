<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { Primitive } from 'reka-ui'
import { cn } from '@/lib/utils'
import { injectSortableContext } from './context'

/** The list container. Its layout direction follows the root orientation. */
const props = defineProps<PrimitiveProps & {
  class?: HTMLAttributes['class']
}>()

const context = injectSortableContext('SortableContent')
</script>

<template>
  <Primitive
    :as="props.as"
    :as-child="props.asChild"
    :class="cn(
      'flex gap-2',
      context.orientation === 'horizontal' ? 'flex-row' : context.orientation === 'mixed' ? 'flex-wrap' : 'flex-col',
      props.class,
    )"
    :data-orientation="context.orientation"
    data-slot="sortable-content"
  >
    <slot />
  </Primitive>
</template>
