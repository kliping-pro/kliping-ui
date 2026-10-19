<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { Button } from '@/components/ui/button'

const filter = reactive({ type: 'all', sort: 'newest' })
const dangkal = ref(0)
const dalam = ref(0)

// Tanpa `deep`, mengubah isi objeknya tidak terdeteksi.
watch(() => filter, () => (dangkal.value += 1))
watch(filter, () => (dalam.value += 1), { deep: true })
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-6">
    <div class="flex flex-col gap-1 text-center">
      <h3 class="font-semibold text-base tracking-tight">
        Deep Watch
      </h3>
      <p class="text-muted-foreground text-sm">
        Only a deep watcher notices changes inside an object.
      </p>
    </div>

    <div class="flex flex-col gap-2">
      <div class="divide-y rounded-lg border bg-muted/40">
        <div class="flex items-center justify-between gap-4 px-4 py-3">
          <span class="font-mono text-muted-foreground text-sm">filter.type</span>
          <span class="font-mono text-sm">"{{ filter.type }}"</span>
        </div>
        <div class="flex items-center justify-between gap-4 px-4 py-3">
          <span class="font-mono text-muted-foreground text-sm">filter.sort</span>
          <span class="font-mono text-sm">"{{ filter.sort }}"</span>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-2">
        <div class="flex flex-col gap-1 rounded-lg border bg-muted/40 p-3">
          <span class="text-muted-foreground text-xs">Shallow watch</span>
          <span class="font-mono font-semibold text-2xl text-muted-foreground tabular-nums">{{ dangkal }}</span>
        </div>
        <div class="flex flex-col gap-1 rounded-lg border bg-muted/40 p-3">
          <span class="text-muted-foreground text-xs">Deep watch</span>
          <span class="font-mono font-semibold text-2xl tabular-nums">{{ dalam }}</span>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-2">
      <Button @click="filter.type = filter.type === 'all' ? 'active' : 'all'">
        Change type
      </Button>
      <Button variant="outline" @click="filter.sort = filter.sort === 'newest' ? 'oldest' : 'newest'">
        Change sort
      </Button>
    </div>

    <p class="text-center text-muted-foreground text-xs">
      Only <code class="rounded-sm bg-muted px-1.5 py-0.5 font-mono text-foreground">deep: true</code> sees changes inside the object.
    </p>
  </div>
</template>
