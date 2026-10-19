<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { Primitive } from 'reka-ui'
import { cn } from '@/lib/utils'

/** A counter showing how many items are selected. */
const props = defineProps<PrimitiveProps & {
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <Primitive
    :as="props.as"
    :as-child="props.asChild"
    :class="cn('flex items-center gap-1 rounded-sm border px-2 py-1 font-medium text-sm tabular-nums', props.class)"
    data-slot="action-bar-selection"
  >
    <slot />
  </Primitive>
</template>
