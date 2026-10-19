<script setup lang="ts">
import { SearchIcon } from '@lucide/vue'
import { computed, ref } from 'vue'
import { Input } from '@/components/ui/input'
import { useDebounce } from '@/composables/use-debounce'

const query = ref('')
const debouncedQuery = useDebounce(query, 500)
const isWaiting = computed(() => query.value !== debouncedQuery.value)
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-6">
    <div class="flex flex-col gap-1 text-center">
      <h3 class="font-semibold text-base tracking-tight">
        Debounced Search
      </h3>
      <p class="text-muted-foreground text-sm">
        Settles 500 ms after you stop typing.
      </p>
    </div>

    <div class="relative">
      <SearchIcon class="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input v-model="query" class="pl-9" placeholder="Type something…" aria-label="Search" />
    </div>

    <div class="divide-y rounded-lg border bg-muted/40">
      <div class="flex items-center justify-between gap-4 px-4 py-3">
        <span class="shrink-0 text-muted-foreground text-sm">Live</span>
        <span class="truncate font-mono text-sm">{{ query || '—' }}</span>
      </div>
      <div class="flex items-center justify-between gap-4 px-4 py-3">
        <span class="shrink-0 text-muted-foreground text-sm">Debounced</span>
        <span class="truncate font-mono text-sm">{{ debouncedQuery || '—' }}</span>
      </div>
      <div class="flex items-center justify-between px-4 py-3">
        <span class="text-muted-foreground text-sm">Status</span>
        <span
          class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-medium text-xs transition-colors"
          :class="isWaiting ? 'bg-muted text-muted-foreground' : 'bg-primary text-primary-foreground'"
        >
          <span class="size-1.5 rounded-full" :class="isWaiting ? 'animate-pulse bg-muted-foreground' : 'bg-primary-foreground'" />
          {{ isWaiting ? 'Waiting' : 'Settled' }}
        </span>
      </div>
    </div>

    <p class="text-center text-muted-foreground text-xs">
      Delay: <code class="rounded-sm bg-muted px-1.5 py-0.5 font-mono text-foreground">500ms</code>
    </p>
  </div>
</template>
