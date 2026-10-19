<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { reactiveOmit } from '@vueuse/core'
import { Primitive } from 'reka-ui'

const props = withDefaults(defineProps<PrimitiveProps & {
  class?: HTMLAttributes['class']
}>(), {
  as: 'time',
})

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <Primitive data-slot="timeline-time" v-bind="delegatedProps" :class="cn('text-muted-foreground text-xs', props.class)">
    <slot />
  </Primitive>
</template>
