<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { Primitive } from 'reka-ui'
import { cn } from '@/lib/utils'
import { getSwapState, injectSwapContext } from './context'

/** The content shown in the `off` state. The counterpart of `SwapOn`. */
const props = defineProps<PrimitiveProps & {
  class?: HTMLAttributes['class']
}>()

const context = injectSwapContext('SwapOff')
</script>

<template>
  <Primitive
    :as="props.as"
    :as-child="props.asChild"
    :class="cn(
      'transition-all duration-300 data-[state=on]:absolute data-[state=off]:opacity-100 data-[state=on]:opacity-0 motion-reduce:transition-none',
      '[*[data-animation=rotate]_&]:data-[state=off]:rotate-0 [*[data-animation=rotate]_&]:data-[state=on]:rotate-180 motion-reduce:[*[data-animation=rotate]_&]:data-[state=on]:rotate-0',
      '[*[data-animation=flip]_&]:data-[state=off]:transform-[rotateY(0deg)] [*[data-animation=flip]_&]:data-[state=on]:transform-[rotateY(180deg)] motion-reduce:[*[data-animation=flip]_&]:data-[state=on]:transform-[rotateY(0deg)]',
      '[*[data-animation=scale]_&]:data-[state=off]:scale-100 [*[data-animation=scale]_&]:data-[state=on]:scale-0 motion-reduce:[*[data-animation=scale]_&]:data-[state=on]:scale-100',
      props.class,
    )"
    data-slot="swap-off"
    :data-state="getSwapState(context.swapped)"
  >
    <slot />
  </Primitive>
</template>
