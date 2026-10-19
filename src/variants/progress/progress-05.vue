<script lang="ts">
export const description = "Isinya bergradasi biru muda ke nila."
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
  <Progress
    class="w-[60%] [&>div]:rounded-l-full [&>div]:bg-linear-to-r [&>div]:from-cyan-400 [&>div]:via-sky-500 [&>div]:to-indigo-500"
    :value="progress"
  />
</template>
