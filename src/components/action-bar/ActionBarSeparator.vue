<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { injectActionBarContext } from './context'

/** A divider between groups, perpendicular to the bar. */
const props = defineProps<{ class?: HTMLAttributes['class'] }>()

const context = injectActionBarContext('ActionBarSeparator')

const direction = computed(() =>
  (context.value.orientation === 'horizontal' ? 'vertical' : 'horizontal'))
</script>

<template>
  <Separator
    :class="cn(direction === 'vertical' ? 'h-6' : 'w-full', props.class)"
    data-slot="action-bar-separator"
    :orientation="direction"
  />
</template>
