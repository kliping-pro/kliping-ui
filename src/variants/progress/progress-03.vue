<script lang="ts">
export const description = "Tiga warna: hijau, nila, dan merah muda."
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
  <div class="flex w-full flex-col items-center gap-6">
    <Progress class="w-[60%] [&>div]:bg-green-500" :value="progress" />
    <Progress class="w-[60%] [&>div]:bg-indigo-500" :value="progress" />
    <Progress class="w-[60%] [&>div]:bg-rose-500" :value="progress" />
  </div>
</template>
