<script lang="ts">
export const description = "Pemilih tema terang dan gelap."
</script>

<script setup lang="ts">
import { MoonIcon, SunIcon } from '@lucide/vue'
import { useDark } from '@vueuse/core'
import { computed } from 'vue'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

/**
 * Penyimpanannya disamakan dengan tema situsnya sendiri, jadi pilihan di sini
 * dan pengalih di bilah atas halaman menggerakkan hal yang sama.
 */
const isDark = useDark({
  storageKey: 'vitepress-theme-appearance',
  valueDark: 'dark',
  valueLight: 'light',
})

const theme = computed({
  get: () => (isDark.value ? 'dark' : 'light'),
  set: (value) => {
    isDark.value = value === 'dark'
  },
})
</script>

<template>
  <Select v-model="theme">
    <SelectTrigger class="w-[180px]">
      <SelectValue placeholder="Select a theme" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Themes</SelectLabel>
        <SelectItem value="light">
          <div class="flex items-center gap-2">
            <SunIcon class="h-4 w-4" />
            Light
          </div>
        </SelectItem>
        <SelectItem value="dark">
          <div class="flex items-center gap-2">
            <MoonIcon class="h-4 w-4" />
            Dark
          </div>
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>
