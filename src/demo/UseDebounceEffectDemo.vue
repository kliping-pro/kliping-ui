<script setup lang="ts">
import { SearchIcon } from '@lucide/vue'
import { ref, watch } from 'vue'
import { Input } from '@/components/ui/input'
import { useDebounceFn } from '@/composables/use-debounce-fn'

const query = ref('')
const searched = ref('')
const keystrokes = ref(0)
const searchCount = ref(0)
const isWaiting = ref(false)

// Efek yang tertunda = watch dirangkai dengan useDebounceFn.
const { run } = useDebounceFn(() => {
  searched.value = query.value
  searchCount.value += 1
  isWaiting.value = false
}, 600)

watch(query, () => {
  keystrokes.value += 1
  isWaiting.value = true
  run()
})
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-6">
    <div class="flex flex-col gap-1 text-center">
      <h3 class="font-semibold text-base tracking-tight">
        Debounced Search
      </h3>
      <p class="text-muted-foreground text-sm">
        The search runs once you stop typing, not on every key.
      </p>
    </div>

    <div class="relative">
      <SearchIcon class="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input v-model="query" class="pl-9" placeholder="Type quickly…" aria-label="Search" />
    </div>

    <div class="divide-y rounded-lg border bg-muted/40">
      <div class="flex items-center justify-between gap-4 px-4 py-3">
        <span class="text-muted-foreground text-sm">Status</span>
        <span
          class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-medium text-xs transition-colors"
          :class="isWaiting ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'"
        >
          <span class="size-1.5 rounded-full" :class="isWaiting ? 'animate-pulse bg-primary-foreground' : 'bg-muted-foreground'" />
          {{ isWaiting ? 'Waiting' : 'Idle' }}
        </span>
      </div>
      <div class="flex items-center justify-between gap-4 px-4 py-3">
        <span class="shrink-0 text-muted-foreground text-sm">Searched for</span>
        <span class="truncate font-mono text-sm">{{ searched ? `"${searched}"` : '—' }}</span>
      </div>
      <div class="flex items-center justify-between gap-4 px-4 py-3">
        <span class="text-muted-foreground text-sm">Keystrokes / searches</span>
        <span class="font-mono text-sm tabular-nums">{{ keystrokes }} / {{ searchCount }}</span>
      </div>
    </div>

    <p class="text-center text-muted-foreground text-xs">
      Fires <code class="rounded-sm bg-muted px-1.5 py-0.5 font-mono text-foreground">600ms</code> after the last change.
    </p>
  </div>
</template>
