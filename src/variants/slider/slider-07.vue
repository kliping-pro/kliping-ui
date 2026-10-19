<script lang="ts">
export const description = "Ikon pengaturan di dalam tuasnya."
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { Settings2 } from '@lucide/vue'
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

      <SliderThumb class="flex h-6 w-6 items-center justify-center rounded-full border border-primary/50 bg-background shadow-sm transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
        <Settings2 class="h-3.5 w-3.5" />
      </SliderThumb>
    </SliderRoot>
  </div>
</template>
