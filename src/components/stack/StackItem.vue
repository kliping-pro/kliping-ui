<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { Primitive } from 'reka-ui'
import { cn } from '@/lib/utils'

/** The default card for stack content. Can be replaced with anything. */
const props = defineProps<PrimitiveProps & {
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <Primitive
    :as="props.as"
    :as-child="props.asChild"
    :class="cn('rounded-lg border bg-card p-4 shadow-sm transition-shadow duration-200 hover:shadow-md', props.class)"
    data-slot="stack-item"
  >
    <slot />
  </Primitive>
</template>
