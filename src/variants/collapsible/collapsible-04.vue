<script lang="ts">
export const description = "Panel penyaring toko: rentang harga, kategori, dan bintang."
</script>

<script setup lang="ts">
import PriceRangeFilter from '@/variants/collapsible/components/PriceRangeFilter.vue'
import CategoryFilter from '@/variants/collapsible/components/CategoryFilter.vue'
import RatingFilter from '@/variants/collapsible/components/RatingFilter.vue'
</script>

<template>
  <div class="w-full max-w-xs divide-y">
    <PriceRangeFilter />
    <CategoryFilter />
    <RatingFilter />
  </div>
</template>
