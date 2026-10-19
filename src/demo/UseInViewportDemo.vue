<script setup lang="ts">
import { EyeIcon, EyeOffIcon } from '@lucide/vue'
import { computed, useTemplateRef } from 'vue'
import { Progress } from '@/components/ui/progress'
import { useInViewport } from '@/composables/use-in-viewport'

const container = useTemplateRef<HTMLDivElement>('container')
const target = useTemplateRef<HTMLDivElement>('target')
const { inViewport, ratio } = useInViewport(target, {
  root: container,
  threshold: [0, 0.25, 0.5, 0.75, 1],
})

const percent = computed(() => Math.round((ratio.value ?? 0) * 100))
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-6">
    <div class="flex flex-col gap-1 text-center">
      <h3 class="font-semibold text-base tracking-tight">
        In Viewport
      </h3>
      <p class="text-muted-foreground text-sm">
        Watches how much of an element is visible.
      </p>
    </div>

    <div class="divide-y rounded-lg border bg-muted/40">
      <div class="flex items-center justify-between px-4 py-3">
        <span class="text-muted-foreground text-sm">Visible</span>
        <span
          class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-medium text-xs transition-colors"
          :class="inViewport ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'"
        >
          <span class="size-1.5 rounded-full" :class="inViewport ? 'bg-primary-foreground' : 'bg-muted-foreground'" />
          {{ inViewport === undefined ? 'Unknown' : inViewport ? 'True' : 'False' }}
        </span>
      </div>
      <div class="flex flex-col gap-2.5 px-4 py-3">
        <div class="flex items-center justify-between">
          <span class="text-muted-foreground text-sm">Ratio</span>
          <span class="font-medium font-mono text-sm tabular-nums">{{ ratio?.toFixed(2) ?? '—' }}</span>
        </div>
        <Progress :model-value="percent" class="h-1.5" />
      </div>
    </div>

    <div ref="container" class="h-44 overflow-y-auto overscroll-contain rounded-lg border">
      <div class="flex h-36 items-center justify-center text-muted-foreground text-sm">
        Scroll down ↓
      </div>
      <div
        ref="target"
        class="mx-4 flex h-20 items-center justify-center gap-2 rounded-lg border border-dashed text-sm transition-colors duration-200"
        :class="inViewport ? 'border-primary bg-primary/5 text-foreground' : 'bg-muted/40 text-muted-foreground'"
      >
        <EyeIcon v-if="inViewport" class="size-4" />
        <EyeOffIcon v-else class="size-4" />
        Watched element
      </div>
      <div class="flex h-36 items-center justify-center text-muted-foreground text-sm">
        Scroll up ↑
      </div>
    </div>

    <p class="text-center text-muted-foreground text-xs">
      Updates at every <code class="rounded-sm bg-muted px-1.5 py-0.5 font-mono text-foreground">0.25</code> step of visibility.
    </p>
  </div>
</template>
