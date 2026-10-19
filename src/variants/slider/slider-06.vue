<script lang="ts">
export const description = "Angkanya ditulis di samping, ikut berubah saat digeser."
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { Slider } from '@/components/ui/slider'

const progress = ref([30])

</script>

<template>
  <div class="flex w-full max-w-sm items-center gap-2">
    <Slider :max="100" :step="1" v-model="progress" />
    <span class="w-[5ch]">{{ progress[0] }}%</span>
  </div>
</template>
