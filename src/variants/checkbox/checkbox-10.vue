<script lang="ts">
export const description = "Kartu yang bisa dipilih, ditandai lingkaran centang."
</script>

<script setup lang="ts">
import { CircleCheck } from '@lucide/vue'
import { cn } from "@/lib/utils"
import { CheckboxIndicator, CheckboxRoot } from 'reka-ui'

const colors = ["indigo", "rose", "sky", "green", "orange"]
</script>

<template>
  <div class="flex flex-wrap items-center gap-2">
    <CheckboxRoot v-for="color in colors"
      :class="cn('h-8 w-8 rounded-full', {
        'bg-indigo-500 text-indigo-500': color === 'indigo',
        'bg-rose-500 text-rose-500': color === 'rose',
        'bg-sky-500 text-sky-500': color === 'sky',
        'bg-green-500 text-green-500': color === 'green',
        'bg-orange-500 text-orange-500': color === 'orange',
      })"
      :default-checked="color === 'indigo'"
      :key="color"
    >
      <CheckboxIndicator class="flex h-full w-full items-center justify-center">
        <CircleCheck class="h-5 w-5 fill-white stroke-current" />
      </CheckboxIndicator>
    </CheckboxRoot>
  </div>
</template>
