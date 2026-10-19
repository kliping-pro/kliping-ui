<script lang="ts">
export const description = "Footer ringkas dengan hak cipta, badge versi, dan tombol ikon pengaturan."
</script>

<script setup lang="ts">
import { SettingsIcon } from '@lucide/vue'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const YEAR = new Date().getFullYear()
</script>

<template>
  <footer class="pt-20 pb-8">
    <div class="container mx-auto">
      <div class="flex flex-col items-center justify-between gap-6 md:flex-row">
        <p class="text-muted-foreground text-center text-sm md:text-left">
          &copy; {{ YEAR }} Acme Inc. All rights reserved.
        </p>
        <div class="flex items-center gap-3">
          <Badge variant="secondary" class="px-3 py-1">
            v3.0.0
          </Badge>
          <Button variant="ghost" size="icon" aria-label="Settings">
            <SettingsIcon class="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  </footer>
</template>
