<script lang="ts">
export const description = "Pilihan berikon, tersusun ke bawah."
</script>

<script setup lang="ts">
import { Beer, IceCreamBowl, Pizza, Sandwich } from '@lucide/vue'
import { Checkbox } from '@/components/ui/checkbox'

const options = [
  {
    name: "pizza",
    label: "Pizza",
    icon: Pizza,
    defaultChecked: true,
  },
  {
    name: "sandwich",
    label: "Sandwich",
    icon: Sandwich,
    defaultChecked: true,
  },
  {
    name: "beer",
    label: "Beer",
    icon: Beer,
  },
  {
    name: "ice-cream",
    label: "Ice Cream",
    icon: IceCreamBowl,
  },
]
</script>

<template>
  <div class="mt-2 flex flex-col items-start gap-4">
    <div v-for="{ name, label, icon: Icon, defaultChecked } in options" class="flex items-center gap-4" :key="name">
      <Checkbox :default-checked="defaultChecked" :id="`${name}-vertical`" />
      <label
        class="flex items-center gap-2 font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        :for="`${name}-vertical`"
      >
        <component :is="Icon" class="h-5 w-5" />
        {{ label }}
      </label>
    </div>
  </div>
</template>
