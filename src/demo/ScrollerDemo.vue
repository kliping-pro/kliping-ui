<script setup lang="ts">
import { Scroller } from '@/components/scroller'

const rows = Array.from({ length: 24 }, (_, i) => `Row ${i + 1}`)
const columns = Array.from({ length: 20 }, (_, i) => `Column ${i + 1}`)
</script>

<template>
  <div class="grid w-full gap-6 md:grid-cols-2">
    <Scroller class="h-48 rounded-md border p-3" hide-scrollbar>
      <div v-for="row in rows" :key="row" class="py-1 text-sm">
        {{ row }}
      </div>
    </Scroller>

    <Scroller class="rounded-md border p-3" orientation="horizontal" with-navigation>
      <div class="flex gap-2">
        <div v-for="column in columns" :key="column" class="shrink-0 rounded-md bg-muted px-4 py-6 text-sm">
          {{ column }}
        </div>
      </div>
    </Scroller>
  </div>
</template>
