<script lang="ts">
export const description = "Kartu yang bisa dipilih, ditandai cincin biru."
</script>

<script setup lang="ts">
import { RadioGroupItem, RadioGroupRoot } from 'reka-ui'

const options = [
  {
    value: "4gb",
    label: "4GB + 64GB",
  },
  {
    value: "6gb",
    label: "6GB + 128GB",
  },
  {
    value: "8gb",
    label: "8GB + 128GB",
  },
]
</script>

<template>
  <RadioGroupRoot
    class="grid w-full max-w-md grid-cols-3 gap-3"
    :default-value="options[0].value"
  >
    <RadioGroupItem v-for="option in options"
      class="rounded-lg px-3 py-1 ring-[1px] ring-border data-[state=checked]:ring-2 data-[state=checked]:ring-blue-500"
      :key="option.value"
      :value="option.value"
    >
      <span class="font-semibold tracking-tight">{{ option.label }}</span>
    </RadioGroupItem>
  </RadioGroupRoot>
</template>
