<!-- example: 3. Customization -->
<script setup lang="ts">
import { CompareSlider, CompareSliderAfter, CompareSliderBefore, CompareSliderHandle } from '@/components/compare-slider'
</script>

<template>
  <div class="w-full max-w-lg">
    <CompareSlider :default-value="50" class="h-72 overflow-hidden rounded-lg border">
      <CompareSliderBefore class="flex size-full items-center justify-center bg-muted text-center">
        <div class="text-2xl font-bold">
          Kickflip
        </div>
      </CompareSliderBefore>
      <CompareSliderAfter class="flex size-full items-center justify-center bg-primary text-center text-primary-foreground">
        <div class="text-2xl font-bold">
          Heelflip
        </div>
      </CompareSliderAfter>
      <CompareSliderHandle>
        <div class="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg ring-2 ring-background">
          <span class="text-xs font-bold">VS</span>
        </div>
      </CompareSliderHandle>
    </CompareSlider>
  </div>
</template>
