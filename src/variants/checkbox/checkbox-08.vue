<script lang="ts">
export const description = "Tiga ukuran, dari kecil sampai besar."
</script>

<script setup lang="ts">
import { Checkbox } from '@/components/ui/checkbox'
</script>

<template>
  <div class="flex items-center space-x-2">
    <Checkbox defaultChecked />
    <Checkbox
      class="h-5 w-5 data-[state=checked]:border-destructive data-[state=checked]:bg-destructive dark:text-foreground"
      defaultChecked
    />
    <Checkbox
      class="h-6 w-6 data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 dark:text-foreground"
      defaultChecked
    />
    <Checkbox
      class="h-7 w-7 data-[state=checked]:border-emerald-600 data-[state=checked]:bg-emerald-600 dark:text-foreground"
      defaultChecked
    />
  </div>
</template>
