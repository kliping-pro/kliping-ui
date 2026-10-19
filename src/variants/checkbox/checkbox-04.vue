<script lang="ts">
export const description = "Beberapa pilihan berjajar mendatar di bawah satu judul."
</script>

<script setup lang="ts">
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

const technologies = [
  {
    name: "react",
    label: "React",
  },
  {
    name: "next",
    label: "Next",
  },
  {
    name: "node",
    label: "Node",
  },
  {
    name: "remix",
    label: "Remix",
  },
]
</script>

<template>
  <div>
    <Label class="font-semibold">Technologies</Label>
    <div class="mt-4 flex flex-wrap items-center gap-4">
      <div v-for="{ name, label } in technologies" class="flex items-center gap-2" :key="name">
        <Checkbox :id="name" />
        <label
          class="font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          :for="name"
        >
          {{ label }}
        </label>
      </div>
    </div>
  </div>
</template>
