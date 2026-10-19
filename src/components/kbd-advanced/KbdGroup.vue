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
  <kbd data-slot="kbd-group" :class="cn('inline-flex items-center gap-1', props.class)" v-bind="delegatedProps">
    <slot />
  </kbd>
</template>
