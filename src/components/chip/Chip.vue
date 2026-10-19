<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { ChipVariants } from '.'
import { reactiveOmit } from '@vueuse/core'
import { Primitive } from 'reka-ui'
import { cn } from '@/lib/utils'
import { chipVariants } from '.'

const props = withDefaults(defineProps<PrimitiveProps & {
  variant?: ChipVariants['variant']
  size?: ChipVariants['size']
  class?: HTMLAttributes['class']
}>(), {
  as: 'span',
})

const delegatedProps = reactiveOmit(props, 'class', 'variant', 'size')
</script>

<template>
  <Primitive
    data-slot="chip"
    :class="cn(chipVariants({ variant, size }), props.class)"
    v-bind="delegatedProps"
  >
    <slot />
  </Primitive>
</template>
