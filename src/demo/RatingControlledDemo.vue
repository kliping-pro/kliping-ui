<!-- example: 2. Controlled State -->
<script setup lang="ts">
import { ref } from 'vue'
import { Rating } from '@/components/rating'
import { Button } from '@/components/ui/button'

const rating = ref(3)
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-col gap-2">
      <h4 class="text-sm font-medium">
        Controlled Rating
      </h4>
      <Rating v-model="rating" :step="0.5" />
      <p class="text-sm text-muted-foreground">
        Current rating: {{ rating }}
      </p>
    </div>
    <div class="flex gap-2">
      <Button variant="outline" size="sm" @click="rating = 0">
        Clear
      </Button>
      <Button variant="outline" size="sm" @click="rating = 5">
        Set to 5
      </Button>
      <Button variant="outline" size="sm" @click="rating = 2.5">
        Set to 2.5
      </Button>
    </div>
  </div>
</template>
