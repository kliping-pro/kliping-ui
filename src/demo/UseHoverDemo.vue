<script setup lang="ts">
import { MousePointer2Icon } from '@lucide/vue'
import { ref, useTemplateRef } from 'vue'
import { useHover } from '@/composables/use-hover'

const box = useTemplateRef<HTMLDivElement>('box')
const enterCount = ref(0)
const isHovering = useHover(box, { onEnter: () => enterCount.value++ })
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-6">
    <div class="flex flex-col gap-1 text-center">
      <h3 class="font-semibold text-base tracking-tight">
        Hover Zone
      </h3>
      <p class="text-muted-foreground text-sm">
        Tracks whether the pointer is over an element.
      </p>
    </div>

    <div
      ref="box"
      class="flex h-32 flex-col items-center justify-center gap-2 rounded-lg border border-dashed text-sm transition-colors duration-200"
      :class="isHovering ? 'border-primary bg-primary/5 text-foreground' : 'bg-muted/40 text-muted-foreground'"
    >
      <MousePointer2Icon class="size-5 transition-transform duration-200" :class="isHovering ? 'scale-110 text-primary' : ''" />
      {{ isHovering ? 'Pointer is here' : 'Move your pointer here' }}
    </div>

    <div class="divide-y rounded-lg border bg-muted/40">
      <div class="flex items-center justify-between px-4 py-3">
        <span class="text-muted-foreground text-sm">Hovering</span>
        <span
          class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-medium text-xs transition-colors"
          :class="isHovering ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'"
        >
          <span class="size-1.5 rounded-full" :class="isHovering ? 'bg-primary-foreground' : 'bg-muted-foreground'" />
          {{ isHovering ? 'True' : 'False' }}
        </span>
      </div>
      <div class="flex items-center justify-between px-4 py-3">
        <span class="text-muted-foreground text-sm">Times entered</span>
        <span class="font-medium font-mono text-sm tabular-nums">{{ enterCount }}</span>
      </div>
    </div>

    <p class="text-center text-muted-foreground text-xs">
      Counted with the <code class="rounded-sm bg-muted px-1.5 py-0.5 font-mono text-foreground">onEnter</code> callback.
    </p>
  </div>
</template>
