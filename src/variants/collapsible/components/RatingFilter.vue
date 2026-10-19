<script setup lang="ts">
import { Star } from '@lucide/vue'
import { ref } from 'vue'
import CollapsibleFilter from '@/variants/collapsible/components/CollapsibleFilter.vue'

const rating = ref<number | null>(null)
const hovered = ref<number | null>(null)

function isLit(star: number) {
  return hovered.value !== null
    ? hovered.value >= star
    : rating.value !== null && rating.value >= star
}
</script>

<template>
  <CollapsibleFilter :icon="Star" title="Rating">
    <div class="mb-1 flex space-x-1">
      <Star
        v-for="star in 5"
        :key="star"
        class="h-6 w-6 cursor-pointer"
        :class="isLit(star) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'"
        @click="rating = star === rating ? null : star"
        @mouseenter="hovered = star"
        @mouseleave="hovered = null"
      />
    </div>
  </CollapsibleFilter>
</template>
