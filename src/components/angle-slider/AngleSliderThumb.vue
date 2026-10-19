<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { injectAngleSliderContext } from './context'

/**
 * Gagang yang bisa ditarik.
 *
 * Panah menggesernya satu langkah, Shift+panah sepuluh, Home dan End ke
 * ujung — sama seperti penggeser lurus, karena yang berubah cuma bentuknya.
 */
const props = withDefaults(defineProps<{
  /** Which thumb this is, when there is more than one value. */
  index?: number
  class?: HTMLAttributes['class']
}>(), {
  index: 0,
})

const { state, setValue, getAngle, getPoint } = injectAngleSliderContext('AngleSliderThumb')

const value = computed(() => state.value.values[props.index] ?? state.value.min)

// Nama bawaan untuk pembaca layar; `aria-label` dari pemakai tetap menang
// (atribut yang diteruskan menimpa yang ditulis di sini).
const label = computed(() => state.value.values.length > 1
  ? (props.index === 0 ? 'Start angle' : 'End angle')
  : 'Angle')

const position = computed(() => {
  const t = getPoint(getAngle(value.value))
  return { left: `${t.x}px`, top: `${t.y}px` }
})

function onKeydown(event: KeyboardEvent) {
  const step = state.value.step * (event.shiftKey ? 10 : 1)

  const moves: Record<string, number | undefined> = {
    ArrowRight: step,
    ArrowUp: step,
    ArrowLeft: -step,
    ArrowDown: -step,
  }

  if (event.key === 'Home') {
    event.preventDefault()
    setValue(props.index, state.value.min)
    return
  }
  if (event.key === 'End') {
    event.preventDefault()
    setValue(props.index, state.value.max)
    return
  }

  const delta = moves[event.key]
  if (delta === undefined) return

  event.preventDefault()
  setValue(props.index, value.value + delta)
}
</script>

<template>
  <div
    :aria-disabled="state.disabled || undefined"
    :aria-label="label"
    :aria-valuemax="state.max"
    :aria-valuemin="state.min"
    :aria-valuenow="value"
    :class="cn(
      'absolute block size-4 shrink-0 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary bg-background shadow-sm ring-ring/50 transition-[color,box-shadow] hover:ring-4 focus-visible:outline-hidden focus-visible:ring-4',
      state.disabled && 'pointer-events-none opacity-50',
      props.class,
    )"
    :data-disabled="state.disabled ? '' : undefined"
    data-slot="angle-slider-thumb"
    role="slider"
    :style="position"
    :tabindex="state.disabled ? -1 : 0"
    @keydown="onKeydown"
  />
</template>
