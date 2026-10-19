<script setup lang="ts">
import { MoveHorizontalIcon } from '@lucide/vue'
import { reactive, ref, watch } from 'vue'
import { Button } from '@/components/ui/button'

const box = reactive({ width: 40 })
const order = ref<string[]>([])

watch(box, () => order.value.push('sync'), { deep: true, flush: 'sync' })
watch(box, () => order.value.push('pre'), { deep: true })
watch(box, () => order.value.push('post'), { deep: true, flush: 'post' })

function changeWidth() {
  order.value = []
  box.width = box.width === 40 ? 85 : 40
}

const phases = ['sync', 'pre', 'post'] as const
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-6">
    <div class="flex flex-col gap-1 text-center">
      <h3 class="font-semibold text-base tracking-tight">
        Flush Timing
      </h3>
      <p class="text-muted-foreground text-sm">
        Three deep watchers on one object, each with a different flush.
      </p>
    </div>

    <div class="flex flex-col gap-2">
      <div class="rounded-lg border bg-muted/40 p-3">
        <div
          class="flex h-8 items-center justify-end rounded-md bg-primary px-2 font-mono text-primary-foreground text-xs tabular-nums transition-[width] duration-300"
          :style="{ width: `${box.width}%` }"
        >
          {{ box.width }}%
        </div>
      </div>
      <div class="grid grid-cols-3 gap-2">
        <div
          v-for="phase in phases"
          :key="phase"
          class="flex flex-col gap-1 rounded-lg border p-3 transition-colors"
          :class="order.includes(phase) ? 'border-primary bg-primary/5' : 'bg-muted/40'"
        >
          <span class="font-mono text-muted-foreground text-xs">{{ phase }}</span>
          <span class="font-mono font-semibold text-2xl tabular-nums" :class="!order.includes(phase) && 'text-muted-foreground'">
            {{ order.includes(phase) ? `#${order.indexOf(phase) + 1}` : '—' }}
          </span>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-2">
      <Button class="col-span-2" @click="changeWidth">
        <MoveHorizontalIcon />
        Change width
      </Button>
    </div>

    <p class="text-center text-muted-foreground text-xs">
      <code class="rounded-sm bg-muted px-1.5 py-0.5 font-mono text-foreground">flush: 'sync'</code> runs instantly, before Vue gets to render.
    </p>
  </div>
</template>
