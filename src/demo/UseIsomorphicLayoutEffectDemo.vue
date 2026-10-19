<script setup lang="ts">
import { RulerIcon } from '@lucide/vue'
import { onMounted, ref } from 'vue'
import { Button } from '@/components/ui/button'

const width = ref<number | null>(null)

function measure() {
  width.value = window.innerWidth
}

// `onMounted` tidak pernah berjalan di server, jadi tidak ada yang perlu
// dipilih antara efek layout dan efek biasa.
onMounted(measure)
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-6">
    <div class="flex flex-col gap-1 text-center">
      <h3 class="font-semibold text-base tracking-tight">
        Window Width
      </h3>
      <p class="text-muted-foreground text-sm">
        Measured after mount — never on the server.
      </p>
    </div>

    <div class="flex flex-col items-center gap-3 rounded-lg border bg-muted/40 px-4 py-6">
      <span
        class="font-mono font-semibold tabular-nums tracking-tight"
        :class="width === null ? 'text-2xl text-muted-foreground' : 'text-5xl'"
      >
        {{ width ?? 'not measured' }}<span v-if="width !== null" class="text-2xl text-muted-foreground">px</span>
      </span>
      <span
        class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-medium text-xs transition-colors"
        :class="width !== null ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'"
      >
        <span class="size-1.5 rounded-full" :class="width !== null ? 'bg-primary-foreground' : 'bg-muted-foreground'" />
        {{ width !== null ? 'Client' : 'Server' }}
      </span>
    </div>

    <div class="grid grid-cols-2 gap-2">
      <Button variant="outline" class="col-span-2" @click="measure">
        <RulerIcon />
        Measure again
      </Button>
    </div>

    <p class="text-center text-muted-foreground text-xs">
      Server HTML shows <code class="rounded-sm bg-muted px-1.5 py-0.5 font-mono text-foreground">not measured</code> — the honest answer.
    </p>
  </div>
</template>
