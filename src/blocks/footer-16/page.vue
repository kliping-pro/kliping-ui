<script lang="ts">
export const description = "Pengumuman fitur baru dengan tombol Upgrade di kiri, tautan dan hak cipta di kanan."
</script>

<script setup lang="ts">
import { Button } from '@/components/ui/button'

const YEAR = new Date().getFullYear()

const LINKS = [
  { title: "About Us", href: "#" },
  { title: "Contact Information", href: "#" },
  { title: "Privacy Policy", href: "#" },
]
</script>

<template>
  <footer class="pt-20 pb-8">
    <div class="container mx-auto">
      <div class="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <div class="space-y-3">
          <p class="text-lg font-semibold">
            New Features available! Upgrade to v3.0.0
          </p>
          <Button size="default" class="w-full md:w-auto">
            Upgrade Now
          </Button>
        </div>
        <div class="flex flex-col gap-4 md:items-end">
          <ul class="flex flex-wrap items-center gap-x-8 gap-y-2">
            <li v-for="({ title, href }, key) in LINKS" :key="key">
              <a
                :href="href"
                class="text-muted-foreground hover:text-foreground transition-colors"
              >
                {{ title }}
              </a>
            </li>
          </ul>
          <p class="text-muted-foreground text-sm">
            &copy; {{ YEAR }} Acme Inc. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>
