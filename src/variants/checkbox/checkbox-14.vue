<script lang="ts">
export const description = "Daftar panjang di dalam area yang bisa digulir."
</script>

<script setup lang="ts">
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Checkbox } from '@/components/ui/checkbox'

const countries = [
  { label: "United States", value: "us", flag: "🇺🇸" },
  { label: "Canada", value: "ca", flag: "🇨🇦" },
  { label: "United Kingdom", value: "uk", flag: "🇬🇧" },
  { label: "Germany", value: "de", flag: "🇩🇪" },
  { label: "France", value: "fr", flag: "🇫🇷" },
  { label: "Japan", value: "jp", flag: "🇯🇵" },
  { label: "Australia", value: "au", flag: "🇦🇺" },
  { label: "Brazil", value: "br", flag: "🇧🇷" },
  { label: "India", value: "in", flag: "🇮🇳" },
  { label: "China", value: "cn", flag: "🇨🇳" },
  { label: "South Korea", value: "kr", flag: "🇰🇷" },
  { label: "Italy", value: "it", flag: "🇮🇹" },
  { label: "Spain", value: "es", flag: "🇪🇸" },
  { label: "Netherlands", value: "nl", flag: "🇳🇱" },
  { label: "Sweden", value: "se", flag: "🇸🇪" },
  { label: "Norway", value: "no", flag: "🇳🇴" },
  { label: "Switzerland", value: "ch", flag: "🇨🇭" },
  { label: "Mexico", value: "mx", flag: "🇲🇽" },
  { label: "Argentina", value: "ar", flag: "🇦🇷" },
  { label: "South Africa", value: "za", flag: "🇿🇦" },
]
</script>

<template>
  <div>
    <Label class="ps-1 font-medium">Countries</Label>
    <div class="mt-2.5 rounded-lg border bg-muted/30">
      <ScrollArea class="h-60">
        <div class="space-y-2 p-4">
          <label v-for="(country, index) in countries"
            class="flex items-center justify-between gap-6"
            :for="country.value"
            :key="country.value"
          >
            <span class="text-sm">
              {{ country.flag }}&nbsp;&nbsp;{{ country.label }}
            </span>
            <Checkbox
              class="bg-background"
              :default-checked="index < 3"
              :id="country.value"
              :value="country.value"
            />
          </label>
        </div>
      </ScrollArea>
    </div>
  </div>
</template>
