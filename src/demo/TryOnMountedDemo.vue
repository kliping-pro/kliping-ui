<script setup lang="ts">
import { ref } from 'vue'
import { tryOnMounted } from '@/lib/try-on-mounted'

const ranAt = ref<string>()

tryOnMounted(() => {
  ranAt.value = new Date().toLocaleTimeString('en-US', { hour12: false })
})
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-6">
    <div class="flex flex-col gap-1 text-center">
      <h3 class="font-semibold text-base tracking-tight">
        Try On Mounted
      </h3>
      <p class="text-muted-foreground text-sm">
        Runs on mount inside a component, immediately anywhere else.
      </p>
    </div>

    <div class="divide-y rounded-lg border bg-muted/40">
      <div class="flex items-center justify-between px-4 py-3">
        <span class="text-muted-foreground text-sm">Status</span>
        <span
          class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-medium text-xs transition-colors"
          :class="ranAt ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'"
        >
          <span class="size-1.5 rounded-full" :class="ranAt ? 'bg-primary-foreground' : 'bg-muted-foreground'" />
          {{ ranAt ? 'Ran' : 'Not yet' }}
        </span>
      </div>
      <div class="flex items-center justify-between px-4 py-3">
        <span class="text-muted-foreground text-sm">Ran at</span>
        <span class="font-mono text-sm tabular-nums">{{ ranAt ?? '—' }}</span>
      </div>
    </div>

    <p class="text-center text-muted-foreground text-xs">
      Here it uses <code class="rounded-sm bg-muted px-1.5 py-0.5 font-mono text-foreground">onMounted</code>.
      In a detached <code class="rounded-sm bg-muted px-1.5 py-0.5 font-mono text-foreground">effectScope()</code>
      it runs at once, without warnings — and never on the server.
    </p>
  </div>
</template>
