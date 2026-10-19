<!-- example: 1. Controlled State -->
<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { CompareSlider, CompareSliderAfter, CompareSliderBefore, CompareSliderHandle } from '@/components/compare-slider'

const value = ref(30)
</script>

<template>
  <div class="flex w-full max-w-lg flex-col gap-3">
    <CompareSlider v-model="value" class="aspect-video overflow-hidden rounded-lg border">
      <CompareSliderBefore label="Original">
        <div class="size-full bg-gradient-to-br from-slate-700 to-slate-900" />
      </CompareSliderBefore>
      <CompareSliderAfter label="Enhanced">
        <div class="size-full bg-gradient-to-br from-sky-400 to-emerald-400" />
      </CompareSliderAfter>
      <CompareSliderHandle />
    </CompareSlider>
    <div class="flex items-center gap-2">
      <Button size="sm" variant="outline" @click="value = 0">
        Original
      </Button>
      <Button size="sm" variant="outline" @click="value = 50">
        Center
      </Button>
      <Button size="sm" variant="outline" @click="value = 100">
        Enhanced
      </Button>
      <span class="ml-auto text-sm text-muted-foreground tabular-nums">{{ Math.round(value) }}%</span>
    </div>
  </div>
</template>
