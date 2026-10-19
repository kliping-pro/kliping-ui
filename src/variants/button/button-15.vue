<script lang="ts">
export const description = "Tombol suka yang berubah warna saat ditekan."
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { Heart } from '@lucide/vue'
import { cn } from "@/lib/utils"
import { Button } from '@/components/ui/button'

const isLiked = ref(false)

function setIsLiked(value: typeof isLiked['value']) {
  isLiked.value = value
}
</script>

<template>
  <Button
    :class="cn('h-10 w-10 rounded-full', {
      'bg-rose-100 hover:bg-rose-100 focus:bg-rose-100': isLiked,
    })"
    @click="setIsLiked(!isLiked)"
    size="icon"
    variant="secondary"
  >
    <Heart
      :class="cn('h-5! w-5!', {
        'fill-rose-600 stroke-rose-600': isLiked,
      })"
    />
  </Button>
</template>
