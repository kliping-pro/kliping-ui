<script setup lang="ts">
import type { StatusVariants } from '.'
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { statusVariants } from '.'
import { cn } from '@/lib/utils'
import { reactiveOmit } from '@vueuse/core'
import { Primitive } from 'reka-ui'

const props = withDefaults(defineProps<PrimitiveProps & {
  variant?: StatusVariants['variant']
  class?: HTMLAttributes['class']
}>(), {
  variant: 'default',
})

const delegatedProps = reactiveOmit(props, 'class', 'variant')
</script>

<template>
  <Primitive data-slot="status" :data-variant="variant" v-bind="delegatedProps" :class="cn(statusVariants({ variant }), props.class)">
    <slot />
  </Primitive>
</template>
