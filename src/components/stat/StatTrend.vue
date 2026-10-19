<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { reactiveOmit } from '@vueuse/core'

const props = defineProps<{
  /** Trend direction that sets the text color: up (green), down (red), or neutral (muted). */
  trend?: "up" | "down" | "neutral"
  class?: HTMLAttributes['class']
}>()

const delegatedProps = reactiveOmit(props, 'class', 'trend')
</script>

<template>
  <div data-slot="stat-trend" :data-trend="trend" :class="cn(`inline-flex items-center gap-1 font-medium text-xs [&_svg:not([class*='size-'])]:size-3 [&_svg]:pointer-events-none [&_svg]:shrink-0`, { 'text-green-600 dark:text-green-400': trend === 'up', 'text-red-600 dark:text-red-400': trend === 'down', 'text-muted-foreground': trend === 'neutral' || !trend}, props.class)" v-bind="delegatedProps">
    <slot />
  </div>
</template>
