<script lang="ts">
export const description = "Nilainya melayang di dalam gelembung berekor."
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

      <SliderThumb class="block h-4 w-4 rounded-full border border-primary/50 bg-background shadow-sm transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
        <!-- Sticky label -->
        <Badge class="absolute -top-5 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible">
          <span>{{ progress[0] }}%</span>
          <!-- Arrow -->
          <div class="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-primary" />
        </Badge>
      </SliderThumb>
    </SliderRoot>
  </div>
</template>
