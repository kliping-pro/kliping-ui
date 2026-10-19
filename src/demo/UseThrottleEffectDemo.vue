<script setup lang="ts">
import { ref, watch } from 'vue'
import { Slider } from '@/components/ui/slider'
import { useThrottleFn } from '@/composables/use-throttle-fn'

const value = ref([20])
const saved = ref(20)
const saveCount = ref(0)
const changeCount = ref(0)

const { run } = useThrottleFn(() => {
  saved.value = value.value[0]
  saveCount.value += 1
}, 700)

watch(value, () => {
  changeCount.value += 1
  run()
}, { deep: true })
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-6">
    <div class="flex flex-col gap-1 text-center">
      <h3 class="font-semibold text-base tracking-tight">
        Throttled Slider
      </h3>
      <p class="text-muted-foreground text-sm">
        Drag freely — the value is saved at most every 700ms.
      </p>
    </div>

    <div class="rounded-lg border bg-muted/40 px-4 py-5">
      <Slider v-model="value" :max="100" :step="1" aria-label="Value" />
    </div>

    <div class="flex flex-col gap-2">
      <div class="grid grid-cols-2 gap-2">
        <div class="flex flex-col gap-1 rounded-lg border bg-muted/40 p-3">
          <span class="text-muted-foreground text-xs">Live value</span>
          <span class="font-mono font-semibold text-2xl tabular-nums">{{ value[0] }}</span>
        </div>
        <div class="flex flex-col gap-1 rounded-lg border bg-muted/40 p-3">
          <span class="text-muted-foreground text-xs">Saved value</span>
          <span class="font-mono font-semibold text-2xl tabular-nums">{{ saved }}</span>
        </div>
      </div>
      <div class="flex items-center justify-between rounded-lg border bg-muted/40 px-4 py-3">
        <span class="text-muted-foreground text-sm">Changes / saves</span>
        <span class="font-mono text-sm tabular-nums">{{ changeCount }} / {{ saveCount }}</span>
      </div>
    </div>
  </div>
</template>
