<script setup lang="ts">
import { RotateCcwIcon } from '@lucide/vue'
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { useClickAnyWhere } from '@/composables/use-click-any-where'

const count = ref(0)
const lastTag = ref('')

useClickAnyWhere((e) => {
  count.value += 1
  const el = e.target as Element | null
  lastTag.value = el?.tagName?.toLowerCase() ?? ''
})

function reset() {
  // Klik tombol ini juga ikut terhitung oleh pendengar di window (yang jalan
  // sesudahnya), jadi mulai dari -1 agar hasil akhirnya 0.
  count.value = -1
}
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-6">
    <div class="flex flex-col gap-1 text-center">
      <h3 class="font-semibold text-base tracking-tight">
        Click Anywhere
      </h3>
      <p class="text-muted-foreground text-sm">
        Counts every click on the page, even outside this preview.
      </p>
    </div>

    <div class="flex flex-col items-center gap-1 rounded-lg border bg-muted/40 px-4 py-6">
      <span class="font-semibold font-mono text-5xl tabular-nums tracking-tight">{{ Math.max(count, 0) }}</span>
      <span class="text-muted-foreground text-xs">{{ count === 1 ? 'click' : 'clicks' }}</span>
    </div>

    <div class="flex items-center justify-between gap-4 rounded-lg border bg-muted/40 px-4 py-3">
      <span class="text-muted-foreground text-sm">Last target</span>
      <code class="rounded-sm bg-muted px-1.5 py-0.5 font-mono text-foreground text-xs">{{ lastTag ? `<${lastTag}>` : '—' }}</code>
    </div>

    <Button variant="outline" class="w-full" @click="reset">
      <RotateCcwIcon />
      Reset count
    </Button>
  </div>
</template>
