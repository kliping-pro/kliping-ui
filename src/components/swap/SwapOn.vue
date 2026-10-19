<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { Primitive } from 'reka-ui'
import { cn } from '@/lib/utils'
import { getSwapState, injectSwapContext } from './context'

/**
 * Isi yang terlihat saat keadaannya `on`.
 *
 * Kedua sisi tetap tergambar; yang berganti cuma opasitas dan posisinya.
 * Melepas salah satunya dari DOM akan membatalkan animasi peralihan, dan
 * membuat tinggi wadahnya berkedut tiap kali bertukar.
 */
const props = defineProps<PrimitiveProps & {
  class?: HTMLAttributes['class']
}>()

const context = injectSwapContext('SwapOn')
</script>

<template>
  <Primitive
    :as="props.as"
    :as-child="props.asChild"
    :class="cn(
      'transition-all duration-300 data-[state=off]:absolute data-[state=off]:opacity-0 data-[state=on]:opacity-100 motion-reduce:transition-none',
      '[*[data-animation=rotate]_&]:data-[state=off]:rotate-180 [*[data-animation=rotate]_&]:data-[state=on]:rotate-0 motion-reduce:[*[data-animation=rotate]_&]:data-[state=off]:rotate-0',
      '[*[data-animation=flip]_&]:data-[state=off]:transform-[rotateY(180deg)] [*[data-animation=flip]_&]:data-[state=on]:transform-[rotateY(0deg)] motion-reduce:[*[data-animation=flip]_&]:data-[state=off]:transform-[rotateY(0deg)]',
      '[*[data-animation=scale]_&]:data-[state=off]:scale-0 [*[data-animation=scale]_&]:data-[state=on]:scale-100 motion-reduce:[*[data-animation=scale]_&]:data-[state=off]:scale-100',
      props.class,
    )"
    data-slot="swap-on"
    :data-state="getSwapState(context.swapped)"
  >
    <slot />
  </Primitive>
</template>
