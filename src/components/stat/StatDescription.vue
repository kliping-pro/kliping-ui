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
  <div data-slot="stat-description" :class="cn('text-muted-foreground text-xs', props.class)" v-bind="delegatedProps">
    <slot />
  </div>
</template>
