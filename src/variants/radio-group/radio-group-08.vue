<script lang="ts">
export const description = "Kartu berikon, centang di pojok kanan atas."
</script>

<script setup lang="ts">
import { CircleCheck, CpuIcon } from '@lucide/vue'
import { cn } from "@/lib/utils"
import { RadioGroupItem, RadioGroupRoot } from 'reka-ui'

const options = [
  {
    value: "4-core",
    label: "4-core CPU",
    description: "32 GB RAM",
  },
  {
    value: "6-core",
    label: "6-core CPU",
    description: "32 GB RAM",
  },
  {
    value: "8-core",
    label: "8-core CPU",
    description: "32 GB RAM",
  },
]
</script>

<template>
  <RadioGroupRoot
    class="grid w-full max-w-md grid-cols-3 gap-4"
    :default-value="options[0].value"
  >
    <RadioGroupItem v-for="option in options"
      :class="cn(
        'group relative rounded-lg px-4 py-3 text-start ring-[1px] ring-border',
        'data-[state=checked]:ring-2 data-[state=checked]:ring-blue-500'
      )"
      :key="option.value"
      :value="option.value"
    >
      <CircleCheck class="absolute top-0 right-0 h-6 w-6 translate-x-1/2 -translate-y-1/2 fill-blue-500 stroke-white text-primary group-data-[state=unchecked]:hidden" />

      <CpuIcon class="mb-2.5 text-muted-foreground" />
      <span class="font-semibold tracking-tight">{{ option.label }}</span>
      <p class="text-xs">{{ option.description }}</p>
    </RadioGroupItem>
  </RadioGroupRoot>
</template>
