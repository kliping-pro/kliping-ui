<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { Primitive } from 'reka-ui'
import { cn } from '@/lib/utils'

/** The list of checkboxes. */
const props = withDefaults(defineProps<PrimitiveProps & {
  orientation?: 'horizontal' | 'vertical'
  class?: HTMLAttributes['class']
}>(), {
  orientation: 'vertical',
})
</script>

<template>
  <Primitive
    :as="props.as"
    :as-child="props.asChild"
    :class="cn('flex gap-3 data-[orientation=horizontal]:flex-row data-[orientation=vertical]:flex-col', props.class)"
    :data-orientation="props.orientation"
    data-slot="checkbox-group-list"
  >
    <slot />
  </Primitive>
</template>
