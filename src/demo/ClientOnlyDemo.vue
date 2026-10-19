<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ClientOnly } from '@/components/client-only'

const width = ref(0)

onMounted(() => {
  width.value = window.innerWidth
  window.addEventListener('resize', () => {
    width.value = window.innerWidth
  })
})
</script>

<template>
  <div class="flex flex-col gap-3">
    <ClientOnly>
      <div class="rounded-md border p-4 text-sm">
        Current viewport width: <strong>{{ width }}px</strong>
      </div>
      <template #fallback>
        <div class="h-14 w-full animate-pulse rounded-md bg-muted" />
      </template>
    </ClientOnly>

    <p class="text-muted-foreground text-sm">
      <code>window</code> doesn't exist during server rendering. The server renders
      the <code>fallback</code> slot instead, which swaps itself out after hydration.
    </p>
  </div>
</template>
