<script lang="ts">
export const description = "Lencana sebagai tautan, lengkap dengan foto profilnya."
</script>

<script setup lang="ts">
import { Badge } from '@/components/ui/badge'
</script>

<template>
  <Badge as-child class="h-7 gap-1.5 pl-0.75" variant="outline">
    <a href="https://github.com/shadcn" target="_blank">
      <img loading="lazy"
        alt=""
        class="h-5 w-5 rounded-full"
        :height="20"
        src="/samples/avatars/avatar-16.svg"
        :width="20"
      />
      shadcn
    </a>
  </Badge>
</template>
