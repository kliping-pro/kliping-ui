<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { Primitive } from 'reka-ui'
import { cn } from '@/lib/utils'
import { injectCircularProgressContext } from './context'

/** The text in the center of the circle. Leave the slot empty to use the default percentage. */
const props = withDefaults(defineProps<PrimitiveProps & {
  class?: HTMLAttributes['class']
}>(), {
  as: 'span',
})

const context = injectCircularProgressContext('CircularProgressValueText')
</script>

<template>
  <Primitive
    :as="props.as"
    :as-child="props.asChild"
    :class="cn('absolute inset-0 flex items-center justify-center font-medium text-sm', props.class)"
    :data-state="context.state"
    :id="context.valueTextId"
  >
    <slot>{{ context.valueText }}</slot>
  </Primitive>
</template>
