<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { Point } from './crop'
import { useEventListener } from '@vueuse/core'
import { cn } from '@/lib/utils'
import { injectCropperContext } from './context'

/**
 * Kotak tempat medianya terlihat dan diseret.
 *
 * Semua penanganan tetikus dan papan ketik ada di sini, bukan di akarnya:
 * yang ditadah seretannya kotak ini, dan pendengar yang dipasang di akar akan
 * ikut menangkap seretan pada penggeser zum yang kebetulan juga ada di
 * dalamnya.
 */
const props = withDefaults(defineProps<{
  /** Zoom with the mouse wheel. */
  wheelZoom?: boolean
  class?: HTMLAttributes['class']
}>(), {
  wheelZoom: true,
})

const { state, setOffset, setZoom, setDragging, zoomLimits, container } = injectCropperContext('CropperViewport')

let pointerStart: Point | null = null
let offsetStart: Point = { x: 0, y: 0 }

function onPointerDown(event: PointerEvent) {
  if (state.value.disabled) return

  pointerStart = { x: event.clientX, y: event.clientY }
  offsetStart = { ...state.value.offset }
  setDragging(true)

  // Penangkapan penunjuk membuat seretan tetap terlacak walaupun tetikusnya
  // keluar dari kotaknya — tanpa ini, menyeret cepat ke tepi melepaskan
  // gambarnya di tengah jalan.
  ;(event.currentTarget as HTMLElement).setPointerCapture(event.pointerId)
}

function onPointerMove(event: PointerEvent) {
  if (!pointerStart) return

  setOffset({
    x: offsetStart.x + (event.clientX - pointerStart.x),
    y: offsetStart.y + (event.clientY - pointerStart.y),
  })
}

function onPointerUp() {
  pointerStart = null
  setDragging(false)
}

// Roda didaftarkan sendiri, bukan lewat `@wheel`, karena Vue memasangnya
// pasif dan `preventDefault` di pendengar pasif diabaikan — halamannya ikut
// tergulir tiap kali gambar dizum.
useEventListener(container, 'wheel', (event: WheelEvent) => {
  if (!props.wheelZoom || state.value.disabled) return

  event.preventDefault()
  setZoom(state.value.zoom - Math.sign(event.deltaY) * zoomLimits.value.step)
}, { passive: false })

function onKeydown(event: KeyboardEvent) {
  if (state.value.disabled) return

  const step = event.shiftKey ? 20 : 5
  const directions: Record<string, Point> = {
    ArrowUp: { x: 0, y: step },
    ArrowDown: { x: 0, y: -step },
    ArrowLeft: { x: step, y: 0 },
    ArrowRight: { x: -step, y: 0 },
  }

  const delta = directions[event.key]
  if (!delta) return

  event.preventDefault()
  setOffset({ x: state.value.offset.x + delta.x, y: state.value.offset.y + delta.y })
}
</script>

<template>
  <div
    ref="container"
    :aria-disabled="state.disabled || undefined"
    aria-label="Drag to move the image, scroll to zoom"
    :class="cn(
      'relative aspect-video w-full touch-none select-none overflow-hidden rounded-lg bg-neutral-900 outline-none focus-visible:ring-2 focus-visible:ring-ring',
      state.disabled ? 'cursor-not-allowed' : 'cursor-grab active:cursor-grabbing',
      props.class,
    )"
    data-slot="cropper-viewport"
    role="application"
    tabindex="0"
    @keydown="onKeydown"
    @pointercancel="onPointerUp"
    @pointerdown="onPointerDown"
    @pointermove="onPointerMove"
    @pointerup="onPointerUp"
  >
    <slot />
  </div>
</template>
