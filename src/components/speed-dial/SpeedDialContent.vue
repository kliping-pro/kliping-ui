<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { Primitive } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { speedDialContentVariants } from '.'
import { injectSpeedDialContext } from './context'

/**
 * Wadah aksinya.
 *
 * Diletakkan mutlak di sisi yang diminta, dengan jarak sebesar ukuran tombol
 * utamanya ditambah celah — supaya aksi pertama tidak menindihnya.
 */
const props = withDefaults(defineProps<PrimitiveProps & {
  /** The gap between actions. */
  gap?: number
  /** How long one action takes to appear, in milliseconds. */
  duration?: number
  class?: HTMLAttributes['class']
}>(), {
  gap: 12,
  duration: 200,
})

const { state } = injectSpeedDialContext('SpeedDialContent')

const position = computed(() => {
  const offset = 'calc(2.75rem + var(--speed-dial-gap))'
  switch (state.value.side) {
    case 'bottom': return { top: offset, right: '0' }
    case 'left': return { right: offset, top: '0' }
    case 'right': return { left: offset, top: '0' }
    default: return { bottom: offset, right: '0' }
  }
})
</script>

<template>
  <Primitive
    :as="props.as"
    :as-child="props.asChild"
    :aria-hidden="!state.open"
    :class="cn(speedDialContentVariants({ side: state.side }), props.class)"
    data-slot="speed-dial-content"
    :data-state="state.open ? 'open' : 'closed'"
    role="menu"
    :style="{
      ...position,
      '--speed-dial-gap': `${props.gap}px`,
      '--speed-dial-animation-duration': `${props.duration}ms`,
    }"
  >
    <slot />
  </Primitive>
</template>
