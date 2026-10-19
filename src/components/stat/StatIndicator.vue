<script setup lang="ts">
import type { StatIndicatorVariants } from '.'
import type { HTMLAttributes } from 'vue'
import { statIndicatorVariants } from '.'
import { cn } from '@/lib/utils'
import { reactiveOmit } from '@vueuse/core'

const props = withDefaults(defineProps<{
  variant?: StatIndicatorVariants['variant']
  /** Color tone: default, success, info, warning, or error. */
  color?: StatIndicatorVariants['color']
  class?: HTMLAttributes['class']
}>(), {
  variant: 'default',
  color: 'default',
})

const delegatedProps = reactiveOmit(props, 'class', 'variant', 'color')
</script>

<template>
  <div data-slot="stat-indicator" :data-variant="variant" :data-color="color" :class="cn(statIndicatorVariants({ variant, color, class: props.class }))" v-bind="delegatedProps">
    <slot />
  </div>
</template>
