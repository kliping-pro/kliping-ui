<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { CompareSliderInteraction, CompareSliderOrientation } from './context'
import { unrefElement } from '@vueuse/core'
import { Primitive } from 'reka-ui'
import { computed, ref } from 'vue'
import { cn } from '@/lib/utils'
import { clamp, provideCompareSliderContext } from './context'

/**
 * Penggeser pembanding sebelum-sesudah.
 *
 * Kedua gambarnya bertumpuk penuh, dan yang berpindah cuma garis potongnya —
 * `clip-path` pada masing-masing lapisan. Menggeser lebar salah satunya akan
 * meregangkan gambarnya; memotongnya tidak.
 *
 * Bisa dikemudikan papan ketik sepenuhnya: panah menggeser satu langkah,
 * Shift+panah dan PageUp/PageDown sepuluh langkah, Home dan End ke ujung.
 * Itu bukan tambahan — elemennya `role="slider"`, dan penggeser yang tidak
 * bisa dikemudikan papan ketik bukan penggeser.
 */
const props = withDefaults(defineProps<PrimitiveProps & {
  /** The initial position when used without `v-model`. */
  defaultValue?: number
  /** How far one keyboard step moves. */
  step?: number
  /** `drag` must be dragged; `hover` follows the pointer without pressing. */
  interaction?: CompareSliderInteraction
  orientation?: CompareSliderOrientation
  class?: HTMLAttributes['class']
}>(), {
  defaultValue: 50,
  step: 1,
  interaction: 'drag',
  orientation: 'horizontal',
})

const model = defineModel<number | undefined>({ default: undefined })

const value = computed({
  get: () => clamp(model.value ?? props.defaultValue, 0, 100),
  set: (v) => {
    model.value = clamp(v, 0, 100)
  },
})

const rootRef = ref<HTMLElement>()
const isDragging = ref(false)

const isVertical = computed(() => props.orientation === 'vertical')

function onPointerMove(event: PointerEvent) {
  if (props.interaction === 'drag' && !isDragging.value) return

  const el = unrefElement(rootRef) as HTMLElement | undefined
  if (!el) return

  const rect = el.getBoundingClientRect()
  const position = isVertical.value ? event.clientY - rect.top : event.clientX - rect.left
  const size = isVertical.value ? rect.height : rect.width

  value.value = (position / size) * 100
}

function onPointerDown(event: PointerEvent) {
  if (props.interaction !== 'drag') return

  // Tanpa penangkapan pointer, menarik keluar dari elemennya membuat
  // penggeser berhenti mengikuti — dan jarinya tidak pernah tepat di garis.
  ;(event.currentTarget as HTMLElement).setPointerCapture(event.pointerId)
  isDragging.value = true
}

function onPointerUp(event: PointerEvent) {
  if (props.interaction !== 'drag') return
  ;(event.currentTarget as HTMLElement).releasePointerCapture(event.pointerId)
  isDragging.value = false
}

const PAGE_KEYS = ['PageUp', 'PageDown']
const ARROW_KEYS = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Home') {
    event.preventDefault()
    value.value = 0
    return
  }
  if (event.key === 'End') {
    event.preventDefault()
    value.value = 100
    return
  }
  if (![...PAGE_KEYS, ...ARROW_KEYS].includes(event.key)) return

  event.preventDefault()

  const isLargeStep = PAGE_KEYS.includes(event.key)
    || (event.shiftKey && ARROW_KEYS.includes(event.key))

  // Arah mengikuti tampilan: nilai = posisi pemisah dari kiri (horizontal) atau
  // dari atas (vertikal). Horizontal mengikuti pola slider WAI-ARIA (kanan/atas/
  // PageUp maju); vertikal, tombol yang menggeser pemisah ke atas mundur.
  const isBackward = isVertical.value
    ? ['ArrowUp', 'ArrowLeft', 'PageUp'].includes(event.key)
    : ['ArrowLeft', 'ArrowDown', 'PageDown'].includes(event.key)

  value.value += props.step * (isLargeStep ? 10 : 1) * (isBackward ? -1 : 1)
}

provideCompareSliderContext(computed(() => ({
  interaction: props.interaction,
  orientation: props.orientation,
  value: value.value,
})))
</script>

<template>
  <Primitive
    ref="rootRef"
    aria-label="Comparison position"
    :aria-orientation="props.orientation"
    :aria-valuemax="100"
    :aria-valuemin="0"
    :aria-valuenow="value"
    :as="props.as"
    :as-child="props.asChild"
    :class="cn(
      'relative isolate touch-none select-none overflow-hidden outline-none transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
      props.orientation === 'horizontal' ? 'w-full' : 'h-full',
      props.class,
    )"
    :data-orientation="props.orientation"
    data-slot="compare-slider"
    role="slider"
    :tabindex="0"
    @keydown="onKeydown"
    @pointercancel="onPointerUp"
    @pointerdown="onPointerDown"
    @pointermove="onPointerMove"
    @pointerup="onPointerUp"
  >
    <slot />
  </Primitive>
</template>
