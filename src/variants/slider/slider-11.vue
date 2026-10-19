<script lang="ts">
export const description = "Nilainya baru muncul saat kursor menyentuh tuasnya."
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { Badge } from '@/components/ui/badge'
import { SliderRange, SliderRoot, SliderThumb, SliderTrack } from 'reka-ui'

const progress = ref([30])

</script>

<template>
  <div class="relative flex w-full max-w-sm flex-col items-center">
    <SliderRoot
      class="relative flex w-full touch-none select-none items-center"
      v-model="progress"
      :max="100"
      :step="1"
    >
      <SliderTrack class="relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20">
        <SliderRange class="absolute h-full bg-primary" />
      </SliderTrack>

      <SliderThumb class="group block h-4 w-4 rounded-full border border-primary/50 bg-background shadow-sm transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
        <!-- Sticky label -->
        <Badge class="absolute -top-4 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-0 transition-transform group-hover:scale-100">
          {{ progress[0] }}%
        </Badge>
      </SliderThumb>
    </SliderRoot>
  </div>
</template>
