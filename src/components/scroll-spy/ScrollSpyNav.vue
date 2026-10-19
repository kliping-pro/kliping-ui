<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { Primitive } from 'reka-ui'
import { cn } from '@/lib/utils'
import { injectScrollSpyContext } from './context'

/** The list of links. */
const props = withDefaults(defineProps<PrimitiveProps & {
  class?: HTMLAttributes['class']
}>(), {
  as: 'nav',
})

const { state } = injectScrollSpyContext('ScrollSpyNav')
</script>

<template>
  <Primitive
    :as="props.as"
    :as-child="props.asChild"
    :class="cn('flex gap-2', state.orientation === 'horizontal' ? 'flex-col' : 'flex-row', props.class)"
    :data-orientation="state.orientation"
    data-slot="scroll-spy-nav"
  >
    <slot />
  </Primitive>
</template>
