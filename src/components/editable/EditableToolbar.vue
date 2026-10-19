<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { Primitive } from 'reka-ui'
import { cn } from '@/lib/utils'

/** A row of submit and cancel buttons. */
const props = withDefaults(defineProps<PrimitiveProps & {
  orientation?: 'horizontal' | 'vertical'
  class?: HTMLAttributes['class']
}>(), {
  orientation: 'horizontal',
})
</script>

<template>
  <Primitive
    :aria-orientation="props.orientation"
    :as="props.as"
    :as-child="props.asChild"
    :class="cn('flex items-center gap-2', props.orientation === 'vertical' && 'flex-col', props.class)"
    data-slot="editable-toolbar"
    role="toolbar"
  >
    <slot />
  </Primitive>
</template>
