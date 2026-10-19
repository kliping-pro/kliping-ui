<script setup lang="ts">
import { TextCursorInputIcon } from '@lucide/vue'
import { computed, useTemplateRef } from 'vue'
import { useTextSelection } from '@/composables/use-text-selection'

const container = useTemplateRef<HTMLParagraphElement>('container')
const { text, rect } = useTextSelection(container)

const wordCount = computed(() => text.value.trim().split(/\s+/).filter(Boolean).length)
const formatNumber = (n: number) => (Number.isNaN(n) ? '—' : Math.round(n))
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-6">
    <div class="flex flex-col gap-1 text-center">
      <h3 class="font-semibold text-base tracking-tight">
        Text Selection
      </h3>
      <p class="text-muted-foreground text-sm">
        Reads what you highlight and where it sits on screen.
      </p>
    </div>

    <p
      ref="container"
      class="rounded-lg border border-dashed bg-muted/40 p-4 text-sm leading-relaxed transition-colors selection:bg-primary selection:text-primary-foreground"
      :class="text ? 'border-primary bg-primary/5' : ''"
    >
      Highlight part of this sentence by dragging the pointer across it. The selected
      text shows up below, along with its position on the screen.
    </p>

    <div class="flex min-h-11 items-start gap-2 rounded-lg border bg-muted/40 px-4 py-3 text-sm">
      <TextCursorInputIcon class="mt-0.5 size-4 shrink-0 text-muted-foreground" />
      <span v-if="text" class="line-clamp-2 break-words font-medium">“{{ text }}”</span>
      <span v-else class="text-muted-foreground">Nothing selected yet</span>
    </div>

    <div class="grid grid-cols-3 gap-2">
      <div class="flex flex-col gap-1 rounded-lg border bg-muted/40 p-3">
        <span class="text-muted-foreground text-xs">Chars</span>
        <span class="font-medium font-mono text-sm tabular-nums">{{ text.length }}</span>
      </div>
      <div class="flex flex-col gap-1 rounded-lg border bg-muted/40 p-3">
        <span class="text-muted-foreground text-xs">Words</span>
        <span class="font-medium font-mono text-sm tabular-nums">{{ wordCount }}</span>
      </div>
      <div class="flex flex-col gap-1 rounded-lg border bg-muted/40 p-3">
        <span class="text-muted-foreground text-xs">x, y</span>
        <span class="truncate font-medium font-mono text-sm tabular-nums">{{ formatNumber(rect.left) }}, {{ formatNumber(rect.top) }}</span>
      </div>
    </div>

    <p class="text-center text-muted-foreground text-xs">
      Only selections that start inside the box are counted.
    </p>
  </div>
</template>
