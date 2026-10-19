<script setup lang="ts">
import { ColorSwatch } from '@/components/color-swatch'

const colors = ['oklch(0.62 0.19 259)', '#16a34a', 'rgb(234 88 12 / 0.35)', 'transparent', '']
</script>

<template>
  <div class="flex flex-wrap items-center gap-3">
    <ColorSwatch v-for="(color, i) in colors" :key="i" :color="color" />
    <ColorSwatch color="#16a34a" size="sm" />
    <ColorSwatch color="#16a34a" size="lg" />
  </div>
</template>
