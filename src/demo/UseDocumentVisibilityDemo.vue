<script setup lang="ts">
import { EyeIcon, EyeOffIcon } from '@lucide/vue'
import { ref, watch } from 'vue'
import { useDocumentVisibility } from '@/composables/use-document-visibility'

const visibility = useDocumentVisibility()
const timesLeft = ref(0)
const lastReturned = ref('')

watch(visibility, (state) => {
  if (state === 'hidden')
    timesLeft.value += 1
  else
    lastReturned.value = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
})
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-6">
    <div class="flex flex-col gap-1 text-center">
      <h3 class="font-semibold text-base tracking-tight">
        Tab Visibility
      </h3>
      <p class="text-muted-foreground text-sm">
        Knows whether this tab is visible or in the background.
      </p>
    </div>

    <div class="flex flex-col items-center gap-3 rounded-lg border bg-muted/40 px-4 py-6">
      <div
        class="flex size-12 items-center justify-center rounded-full border bg-background transition-colors"
        :class="visibility === 'visible' ? 'border-primary text-primary' : 'text-muted-foreground'"
      >
        <EyeIcon v-if="visibility === 'visible'" class="size-5" />
        <EyeOffIcon v-else class="size-5" />
      </div>
      <span
        class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-medium font-mono text-xs transition-colors"
        :class="visibility === 'visible' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'"
      >
        <span class="size-1.5 rounded-full" :class="visibility === 'visible' ? 'bg-primary-foreground' : 'bg-muted-foreground'" />
        {{ visibility }}
      </span>
    </div>

    <div class="grid grid-cols-2 gap-2">
      <div class="flex flex-col gap-1 rounded-lg border bg-muted/40 p-3">
        <span class="text-muted-foreground text-xs">Times left</span>
        <span class="font-medium font-mono text-sm tabular-nums">{{ timesLeft }}</span>
      </div>
      <div class="flex flex-col gap-1 rounded-lg border bg-muted/40 p-3">
        <span class="text-muted-foreground text-xs">Last returned</span>
        <span class="font-medium font-mono text-sm tabular-nums">{{ lastReturned || '—' }}</span>
      </div>
    </div>

    <p class="text-center text-muted-foreground text-xs">
      Switch to another tab, then come back.
    </p>
  </div>
</template>
