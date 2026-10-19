<script lang="ts">
export const description = "Tautan dan hak cipta di kiri, ikon pengaturan dan Select negara berbendera di kanan."
</script>

<script setup lang="ts">
import { SettingsIcon } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const YEAR = new Date().getFullYear()

const LINKS = [
  { title: "About Us", href: "#" },
  { title: "Contact Information", href: "#" },
  { title: "Privacy Policy", href: "#" },
]

const COUNTRIES = [
  { name: "United States", flag: "🇺🇸" },
  { name: "United Kingdom", flag: "🇬🇧" },
  { name: "Canada", flag: "🇨🇦" },
  { name: "Germany", flag: "🇩🇪" },
  { name: "France", flag: "🇫🇷" },
  { name: "Japan", flag: "🇯🇵" },
  { name: "Australia", flag: "🇦🇺" },
  { name: "Spain", flag: "🇪🇸" },
]
</script>

<template>
  <footer class="pt-16 pb-8">
    <div class="container mx-auto">
      <div class="flex flex-row flex-wrap items-start justify-center gap-4 md:justify-between">
        <div class="grid gap-3">
          <ul class="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <li v-for="({ title, href }, key) in LINKS" :key="key">
              <a
                :href="href"
                class="text-foreground hover:text-primary font-semibold"
              >
                {{ title }}
              </a>
            </li>
          </ul>
          <p class="text-foreground text-center text-sm font-medium md:text-left">
            All rights reserved. Copyright &copy; {{ YEAR }} Acme Inc.
          </p>
        </div>
        <div class="flex items-center gap-2">
          <Button aria-label="Settings" variant="ghost" size="icon">
            <SettingsIcon class="h-5 w-5" />
          </Button>
          <Select>
            <SelectTrigger aria-label="Country" class="w-64">

              <SelectValue placeholder="Select Country" />
            </SelectTrigger>
            <SelectContent class="max-h-72">
              <SelectItem v-for="{ name, flag } in COUNTRIES" :key="name" :value="name">
                <div class="flex items-center gap-2">
                  <span class="text-lg">{{ flag }}</span>
                  <span class="text-sm">{{ name }}</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  </footer>
</template>
