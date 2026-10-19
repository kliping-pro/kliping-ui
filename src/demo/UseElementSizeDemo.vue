<script setup lang="ts">
import { MoveDiagonal2Icon } from '@lucide/vue'
import { useTemplateRef } from 'vue'
import { useElementSize } from '@/composables/use-element-size'

const box = useTemplateRef<HTMLDivElement>('box')
const { width, height } = useElementSize(box)
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-6">
    <div class="flex flex-col gap-1 text-center">
      <h3 class="font-semibold text-base tracking-tight">
        Element Size
      </h3>
      <p class="text-muted-foreground text-sm">
        Reports an element's width and height as it changes.
      </p>
    </div>

    <div
      ref="box"
      class="flex h-32 min-h-16 w-full min-w-32 max-w-full resize items-center justify-center self-center overflow-hidden rounded-lg border border-dashed bg-muted/40 p-4 text-center text-muted-foreground text-sm transition-colors hover:border-primary hover:bg-primary/5"
    >
      <span class="inline-flex items-center gap-1.5">
        <MoveDiagonal2Icon class="size-4 shrink-0" />
        Drag the corner to resize
      </span>
    </div>

    <div class="grid grid-cols-2 gap-2">
      <div class="flex flex-col gap-1 rounded-lg border bg-muted/40 p-3">
        <span class="text-muted-foreground text-xs">Width</span>
        <span class="font-medium font-mono text-sm tabular-nums">{{ Math.round(width) }} px</span>
      </div>
      <div class="flex flex-col gap-1 rounded-lg border bg-muted/40 p-3">
        <span class="text-muted-foreground text-xs">Height</span>
        <span class="font-medium font-mono text-sm tabular-nums">{{ Math.round(height) }} px</span>
      </div>
    </div>

    <p class="text-center text-muted-foreground text-xs">
      Measured with <code class="rounded-sm bg-muted px-1.5 py-0.5 font-mono text-foreground">ResizeObserver</code> (content box).
    </p>
  </div>
</template>
