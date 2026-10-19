<script setup lang="ts">
import { Heart } from '@lucide/vue'
import { ref } from 'vue'
import { Rating, RatingItem } from '@/components/rating'

const rating = ref(3)
const halfRating = ref(3.5)
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="flex items-center gap-3">
      <Rating v-model="rating" clearable />
      <span class="text-muted-foreground text-sm">{{ rating }} out of 5</span>
    </div>

    <div class="flex items-center gap-3">
      <Rating v-model="halfRating" size="lg" :step="0.5" />
      <span class="text-muted-foreground text-sm">{{ halfRating }} out of 5</span>
    </div>

    <Rating :max="5" :model-value="4" readonly size="sm">
      <RatingItem v-for="i in 5" :key="i" class="text-rose-500" :item="i">
        <Heart />
      </RatingItem>
    </Rating>
  </div>
</template>
