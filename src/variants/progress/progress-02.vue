<script lang="ts">
export const description = "Angka persennya ditulis di samping bilahnya."
</script>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Progress } from '@/components/ui/progress'

const progress = ref(13)

function setProgress(value: typeof progress['value']) {
  progress.value = value
}

onMounted(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
})
</script>

<template>
  <div class="flex w-full items-center justify-center gap-3">
    <Progress class="w-[60%]" :value="progress" />
    <span class="text-sm">{{ progress }}%</span>
  </div>
</template>
