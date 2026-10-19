<script setup lang="ts">
import { Masonry, MasonryItem } from '@/components/masonry'

// Tinggi yang berbeda-beda tapi tetap, bukan acak: nilai acak menghasilkan
// susunan yang berbeda antara render server dan render klien, dan hidrasi
// mengeluh.
const cards = [
  { title: 'Release notes', height: 120 },
  { title: 'Quick start', height: 200 },
  { title: 'FAQ', height: 90 },
  { title: 'Roadmap', height: 160 },
  { title: 'Code samples', height: 240 },
  { title: 'API changes', height: 110 },
  { title: 'Migration', height: 180 },
  { title: 'Benchmarks', height: 140 },
]
</script>

<template>
  <Masonry :column-width="180" :gap="12">
    <MasonryItem v-for="card in cards" :key="card.title">
      <div
        class="flex flex-col justify-between rounded-lg border bg-card p-3"
        :style="{ height: `${card.height}px` }"
      >
        <h4 class="font-medium text-sm">
          {{ card.title }}
        </h4>
        <span class="text-muted-foreground text-xs">{{ card.height }}px</span>
      </div>
    </MasonryItem>
  </Masonry>
</template>
