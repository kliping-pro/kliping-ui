<script setup lang="ts">
import { BatteryChargingIcon, BatteryIcon, BatteryWarningIcon } from '@lucide/vue'
import { computed } from 'vue'
import { Progress } from '@/components/ui/progress'
import { useBattery } from '@/composables/use-battery'

const { isSupported, charging, chargingTime, dischargingTime, level } = useBattery()

const percent = computed(() => Math.round(level.value * 100))

function formatDuration(seconds: number) {
  if (!Number.isFinite(seconds) || seconds <= 0)
    return '—'
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.round((seconds % 3600) / 60)
  return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`
}
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-6">
    <div class="flex flex-col gap-1 text-center">
      <h3 class="font-semibold text-base tracking-tight">
        Battery Status
      </h3>
      <p class="text-muted-foreground text-sm">
        Level and charging state of the device battery.
      </p>
    </div>

    <div
      v-if="!isSupported"
      class="flex flex-col items-center gap-2 rounded-lg border border-dashed bg-muted/40 px-4 py-6 text-center"
    >
      <BatteryWarningIcon class="size-5 text-muted-foreground" />
      <p class="font-medium text-sm">
        Not supported in this browser
      </p>
      <p class="text-muted-foreground text-xs">
        Firefox and Safari have removed the Battery Status API.
      </p>
    </div>

    <template v-else>
      <div class="flex flex-col gap-3 rounded-lg border bg-muted/40 px-4 py-4">
        <div class="flex items-center justify-between gap-4">
          <span class="font-semibold font-mono text-4xl tabular-nums tracking-tight">{{ percent }}%</span>
          <span
            class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-medium text-xs transition-colors"
            :class="charging ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'"
          >
            <component :is="charging ? BatteryChargingIcon : BatteryIcon" class="size-3.5" />
            {{ charging ? 'Charging' : 'On battery' }}
          </span>
        </div>
        <Progress :model-value="percent" />
      </div>

      <div class="grid grid-cols-2 gap-2">
        <div class="flex flex-col gap-1 rounded-lg border bg-muted/40 p-3">
          <span class="text-muted-foreground text-xs">Time to full</span>
          <span class="font-medium font-mono text-sm tabular-nums">{{ charging ? formatDuration(chargingTime) : '—' }}</span>
        </div>
        <div class="flex flex-col gap-1 rounded-lg border bg-muted/40 p-3">
          <span class="text-muted-foreground text-xs">Time remaining</span>
          <span class="font-medium font-mono text-sm tabular-nums">{{ charging ? '—' : formatDuration(dischargingTime) }}</span>
        </div>
      </div>
    </template>

    <p class="text-center text-muted-foreground text-xs">
      Reads <code class="rounded-sm bg-muted px-1.5 py-0.5 font-mono text-foreground">navigator.getBattery()</code> and stays in sync.
    </p>
  </div>
</template>
