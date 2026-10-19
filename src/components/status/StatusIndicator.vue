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
  <div data-slot="status-indicator" v-bind="delegatedProps" :class="cn('relative flex size-2 shrink-0 rounded-full', 'before:absolute before:inset-0 before:animate-ping before:rounded-full before:bg-inherit', 'after:absolute after:inset-[2px] after:rounded-full after:bg-inherit', props.class)">
    <slot />
  </div>
</template>
