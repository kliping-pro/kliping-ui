<script setup lang="ts">
import { Bell } from '@lucide/vue'
import { VisuallyHidden } from '@/components/visually-hidden'
import { Button } from '@/components/ui/button'
</script>

<template>
  <div class="flex flex-col items-start gap-3">
    <Button size="icon" variant="outline">
      <Bell />
      <VisuallyHidden>Open notifications</VisuallyHidden>
    </Button>

    <p class="text-muted-foreground text-sm">
      The button only shows an icon, but screen readers still announce it
      as “Open notifications”.
    </p>
  </div>
</template>
