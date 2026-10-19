<script lang="ts">
export const description = "Berikon panah dan silang, di kiri maupun di kanan."
</script>

<script setup lang="ts">
import { ArrowLeftIcon, ArrowRightIcon, XIcon } from '@lucide/vue'
import { Badge } from '@/components/ui/badge'
</script>

<template>
  <div class="flex flex-wrap items-center gap-3">
    <Badge>
      <ArrowLeftIcon class="h-4 w-4" />
      Left
    </Badge>
    <Badge>
      Right
      <ArrowRightIcon class="h-4 w-4" />
    </Badge>
    <Badge variant="destructive">
      Remove
      <XIcon class="h-4 w-4" />
    </Badge>
  </div>
</template>
