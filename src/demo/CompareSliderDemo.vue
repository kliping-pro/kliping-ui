<script setup lang="ts">
import { CompareSlider, CompareSliderAfter, CompareSliderBefore, CompareSliderHandle } from '@/components/compare-slider'
</script>

<template>
  <div class="flex w-full max-w-lg flex-col gap-3">
    <CompareSlider class="aspect-video overflow-hidden rounded-lg border">
      <CompareSliderBefore label="Before">
        <div class="size-full bg-gradient-to-br from-slate-700 to-slate-900" />
      </CompareSliderBefore>
      <CompareSliderAfter label="After">
        <div class="size-full bg-gradient-to-br from-sky-400 to-emerald-400" />
      </CompareSliderAfter>
      <CompareSliderHandle />
    </CompareSlider>

    <p class="text-muted-foreground text-sm">
      Drag it, or drive it from the keyboard: focus it, then press the
      arrow keys, Shift+arrow, or Home and End.
    </p>
  </div>
</template>
