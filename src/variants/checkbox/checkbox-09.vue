<script lang="ts">
export const description = "Ikon pilihan sendiri menggantikan centangnya."
</script>

<script setup lang="ts">
import { BookmarkIcon, Heart, StarIcon } from '@lucide/vue'
import Checkbox from '@/variants/checkbox/components/Checkbox.vue'
</script>

<template>
  <div class="flex items-center space-x-3">
    <Checkbox default-value>
      <Heart />
      <template #checked>
        <Heart class="fill-rose-500 stroke-rose-500" />
      </template>
    </Checkbox>
    <Checkbox default-value>
      <BookmarkIcon />
      <template #checked>
        <BookmarkIcon class="fill-primary" />
      </template>
    </Checkbox>
    <Checkbox default-value>
      <StarIcon />
      <template #checked>
        <StarIcon class="fill-yellow-400 stroke-yellow-400" />
      </template>
    </Checkbox>
  </div>
</template>
