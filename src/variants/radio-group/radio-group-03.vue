<script lang="ts">
export const description = "Salah satu pilihannya dimatikan."
</script>

<script setup lang="ts">
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
</script>

<template>
  <div class="flex justify-center">
    <RadioGroup defaultValue="comfortable" disabled>
      <div class="flex items-center space-x-2">
        <RadioGroupItem id="r1-disabled" value="default" />
        <Label for="r1-disabled">Default</Label>
      </div>
      <div class="flex items-center space-x-2">
        <RadioGroupItem id="r2-disabled" value="comfortable" />
        <Label for="r2-disabled">Comfortable</Label>
      </div>
      <div class="flex items-center space-x-2">
        <RadioGroupItem id="r3-disabled" value="compact" />
        <Label for="r3-disabled">Compact</Label>
      </div>
    </RadioGroup>
  </div>
</template>
