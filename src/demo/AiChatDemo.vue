<script setup lang="ts">
import { ClientOnly } from '@/components/client-only'
import AiChatEcho from './AiChatEcho.vue'
</script>

<template>
  <ClientOnly>
    <AiChatEcho />
    <template #fallback>
      <div class="h-[32rem] w-full animate-pulse rounded-lg bg-muted" />
    </template>
  </ClientOnly>
</template>
