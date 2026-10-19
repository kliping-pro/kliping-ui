<script lang="ts">
export const description = "Petak kartu bergaris putus-putus, centangnya di pojok kanan atas."
</script>

<script setup lang="ts">
import { CircleCheck, Ruler, Smile, SwatchBook } from '@lucide/vue'
import { CheckboxIndicator, CheckboxRoot } from 'reka-ui'

const options = [
  {
    label: "Colors",
    value: "colors",
    icon: SwatchBook,
    defaultChecked: true,
  },
  {
    label: "Emojis",
    value: "emojis",
    icon: Smile,
  },
  {
    label: "Spacing",
    value: "spacing",
    icon: Ruler,
  },
]
</script>

<template>
  <div class="grid w-full max-w-sm grid-cols-3 gap-3">
    <CheckboxRoot v-for="option in options"
      class="relative rounded-lg border border-dashed px-4 py-3 text-start text-muted-foreground data-[state=checked]:border-primary data-[state=checked]:border-solid data-[state=checked]:bg-primary/4 data-[state=checked]:text-primary data-[state=checked]:ring dark:data-[state=checked]:ring-transparent"
      :default-checked="option.defaultChecked"
      :key="option.value"
    >
      <component :is="option.icon" class="mb-3" />
      <span class="font-medium tracking-tight">{{ option.label }}</span>

      <CheckboxIndicator class="absolute top-2 right-2">
        <CircleCheck class="fill-primary text-primary-foreground" />
      </CheckboxIndicator>
    </CheckboxRoot>
  </div>
</template>
