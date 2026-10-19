<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { reactiveOmit } from '@vueuse/core'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <div data-slot="stat-value" :class="cn('font-semibold text-2xl tracking-tight', props.class)" v-bind="delegatedProps">
    <slot />
  </div>
</template>
