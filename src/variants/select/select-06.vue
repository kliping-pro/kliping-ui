<script lang="ts">
export const description = "Tiap pilihannya berikon."
</script>

<script setup lang="ts">
import { ref } from 'vue'
import {
  AppleIcon,
  BananaIcon,
  CherryIcon,
  CitrusIcon,
  GrapeIcon,
} from '@lucide/vue'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const fruits = [
  { value: "apple", label: "Apple", icon: AppleIcon },
  { value: "banana", label: "Banana", icon: BananaIcon },
  { value: "cherry", label: "Cherry", icon: CherryIcon },
  { value: "grapes", label: "Grapes", icon: GrapeIcon },
  { value: "citrus", label: "Citrus", icon: CitrusIcon },
]

const value = ref("apple")

</script>

<template>
  <Select v-model="value">
    <SelectTrigger class="w-[180px]">
      <div class="flex items-center gap-2 [&_svg]:h-4 [&_svg]:w-4">
        <SelectValue placeholder="Select a fruit" />
      </div>
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Fruits</SelectLabel>
        <SelectItem v-for="fruit in fruits" :key="fruit.value" :value="fruit.value">
          <div class="flex items-center gap-2">
            <component :is="fruit.icon" class="h-4 w-4" /> {{ fruit.label }}
          </div>
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>
