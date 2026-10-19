<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { Primitive } from 'reka-ui'
import { cn } from '@/lib/utils'
import { injectSpeedDialItemContext } from './context'

/** The action's name, next to its button. Also used as the accessible name. */
const props = defineProps<PrimitiveProps & {
  class?: HTMLAttributes['class']
}>()

const item = injectSpeedDialItemContext('SpeedDialLabel')
</script>

<template>
  <Primitive
    :as="props.as"
    :as-child="props.asChild"
    :class="cn('pointer-events-none whitespace-nowrap rounded-md bg-popover px-2 py-1 text-popover-foreground text-sm shadow-md', props.class)"
    data-slot="speed-dial-label"
    :id="item.labelId"
  >
    <slot />
  </Primitive>
</template>
