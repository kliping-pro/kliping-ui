<script lang="ts">
export const description = "Berjajar mendatar."
</script>

<script setup lang="ts">
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
</script>

<template>
  <div class="flex justify-center">
    <RadioGroup
      class="flex items-center gap-3"
      defaultValue="comfortable"
    >
      <div class="flex items-center space-x-2">
        <RadioGroupItem id="r1-horizontal" value="default" />
        <Label for="r1-horizontal">Default</Label>
      </div>
      <div class="flex items-center space-x-2">
        <RadioGroupItem id="r2-horizontal" value="comfortable" />
        <Label for="r2-horizontal">Comfortable</Label>
      </div>
      <div class="flex items-center space-x-2">
        <RadioGroupItem id="r3-horizontal" value="compact" />
        <Label for="r3-horizontal">Compact</Label>
      </div>
    </RadioGroup>
  </div>
</template>
