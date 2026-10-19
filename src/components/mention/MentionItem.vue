<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed, onBeforeUnmount, onMounted } from 'vue'
import { cn } from '@/lib/utils'
import { injectMentionContext } from './context'

/** A single suggestion; its value is inserted into the text when selected. */
const props = defineProps<{
  /** Text inserted after the trigger character when this suggestion is selected. */
  value: string
  disabled?: boolean
  class?: HTMLAttributes['class']
}>()

const { state, registerItem, unregisterItem, highlight, select } = injectMentionContext('MentionItem')

onMounted(() => {
  if (!props.disabled) registerItem(props.value)
})

onBeforeUnmount(() => unregisterItem(props.value))

const isHighlighted = computed(() => state.value.highlighted === props.value)
</script>

<template>
  <div
    :class="cn(
      'relative flex w-full cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden data-disabled:pointer-events-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-disabled:opacity-50',
      props.class,
    )"
    :data-disabled="props.disabled ? '' : undefined"
    :data-highlighted="isHighlighted ? '' : undefined"
    data-slot="mention-item"
    role="option"
    :aria-selected="isHighlighted"
    @click="!props.disabled && select(props.value)"
    @mousedown.prevent
    @mouseenter="!props.disabled && highlight(props.value)"
  >
    <slot />
  </div>
</template>
