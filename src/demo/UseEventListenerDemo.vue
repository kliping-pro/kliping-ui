<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import { useEventListener } from '@/composables/use-event-listener'

const box = useTemplateRef<HTMLDivElement>('box')
const position = ref<{ x: number, y: number } | null>(null)
const clickCount = ref(0)
const isHovered = ref(false)

// Target berupa template ref: masih null saat setup berjalan, dan baru terisi
// setelah komponennya terpasang. Composable-nya yang menunggu, bukan pemanggilnya.
useEventListener('pointermove', (e: PointerEvent) => {
  const el = box.value
  if (!el)
    return
  const rect = el.getBoundingClientRect()
  position.value = { x: Math.round(e.clientX - rect.left), y: Math.round(e.clientY - rect.top) }
}, { target: box })

useEventListener('pointerenter', () => {
  isHovered.value = true
}, { target: box })

useEventListener('pointerleave', () => {
  isHovered.value = false
}, { target: box })

useEventListener('click', () => {
  clickCount.value += 1
}, { target: box })
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-6">
    <div class="flex flex-col gap-1 text-center">
      <h3 class="font-semibold text-base tracking-tight">
        Event Listener
      </h3>
      <p class="text-muted-foreground text-sm">
        Listens to pointer events on one element, cleaned up for you.
      </p>
    </div>

    <div
      ref="box"
      class="flex h-36 cursor-crosshair select-none items-center justify-center rounded-lg border border-dashed text-sm transition-colors"
      :class="isHovered ? 'border-primary bg-primary/5 text-foreground' : 'bg-muted/40 text-muted-foreground'"
    >
      {{ isHovered ? 'Now click inside' : 'Move your pointer here' }}
    </div>

    <div class="flex flex-col divide-y rounded-lg border bg-muted/40">
      <div class="flex items-center justify-between gap-4 px-4 py-3">
        <span class="text-muted-foreground text-sm">Position</span>
        <span class="font-medium font-mono text-sm tabular-nums">{{ position ? `${position.x} × ${position.y}` : '—' }}</span>
      </div>
      <div class="flex items-center justify-between gap-4 px-4 py-3">
        <span class="text-muted-foreground text-sm">Clicks</span>
        <span class="font-medium font-mono text-sm tabular-nums">{{ clickCount }}</span>
      </div>
    </div>

    <p class="text-center text-muted-foreground text-xs">
      The target is a template ref — listeners attach once it mounts.
    </p>
  </div>
</template>
