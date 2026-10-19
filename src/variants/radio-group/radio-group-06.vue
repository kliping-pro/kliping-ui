<script lang="ts">
export const description = "Nada lembut: warnanya tetap, isinya lebih tipis."
</script>

<script setup lang="ts">
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
</script>

<template>
  <div class="flex justify-center">
    <RadioGroup class="flex items-center gap-3" defaultValue="default">
      <div class="flex items-center space-x-2">
        <RadioGroupItem
          class="border-indigo-500 data-checked:border-indigo-500 data-checked:bg-indigo-500 dark:data-checked:border-indigo-500 dark:data-checked:bg-indigo-500"
          id="variant-default"
          value="default"
        />
        <Label for="variant-default">Default</Label>
      </div>
      <div class="flex items-center space-x-2">
        <RadioGroupItem
          class="border-indigo-500 border-none bg-indigo-500/25 data-checked:bg-indigo-500/25 dark:bg-indigo-500/30 dark:data-checked:bg-indigo-500/30 [&_[data-slot=radio-group-indicator]_span]:bg-indigo-500"
          id="variant-soft"
          value="soft"
        />
        <Label for="variant-soft">Soft</Label>
      </div>
    </RadioGroup>
  </div>
</template>
