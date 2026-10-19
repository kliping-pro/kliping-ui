<script lang="ts">
export const description = "Tiga ukuran, dari kecil sampai besar."
</script>

<script setup lang="ts">
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
</script>

<template>
  <div class="flex justify-center">
    <RadioGroup class="flex items-center gap-3" defaultValue="default">
      <div class="flex items-center space-x-2">
        <RadioGroupItem id="size-default" value="default" />
        <Label for="size-default">Default</Label>
      </div>
      <div class="flex items-center space-x-2">
        <RadioGroupItem
          class="h-5 w-5 [&_[data-slot=radio-group-indicator]_span]:size-2.5"
          id="size-medium"
          value="medium"
        />
        <Label for="size-medium">Medium</Label>
      </div>
      <div class="flex items-center space-x-2">
        <RadioGroupItem
          class="h-6 w-6 [&_[data-slot=radio-group-indicator]_span]:size-3"
          id="size-large"
          value="big"
        />
        <Label for="size-large">Large</Label>
      </div>
    </RadioGroup>
  </div>
</template>
