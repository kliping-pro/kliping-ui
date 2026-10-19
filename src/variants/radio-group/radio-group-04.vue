<script lang="ts">
export const description = "Tiga warna berbeda saat terpilih."
</script>

<script setup lang="ts">
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
</script>

<template>
  <div class="flex justify-center">
    <RadioGroup class="flex items-center gap-3" defaultValue="indigo">
      <div class="flex items-center space-x-2">
        <RadioGroupItem
          class="border-green-500 data-checked:border-green-500 data-checked:bg-green-500 dark:data-checked:border-green-500 dark:data-checked:bg-green-500"
          id="color-green"
          value="green"
        />
        <Label for="color-green">Green</Label>
      </div>
      <div class="flex items-center space-x-2">
        <RadioGroupItem
          class="border-indigo-500 data-checked:border-indigo-500 data-checked:bg-indigo-500 dark:data-checked:border-indigo-500 dark:data-checked:bg-indigo-500"
          id="color-indigo"
          value="indigo"
        />
        <Label for="color-indigo">Indigo</Label>
      </div>
      <div class="flex items-center space-x-2">
        <RadioGroupItem
          class="border-rose-500 data-checked:border-rose-500 data-checked:bg-rose-500 dark:data-checked:border-rose-500 dark:data-checked:bg-rose-500"
          id="color-rose"
          value="rose"
        />
        <Label for="color-rose">Rose</Label>
      </div>
    </RadioGroup>
  </div>
</template>
