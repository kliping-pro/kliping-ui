<script lang="ts">
export const description = "Ujung bilahnya membulat."
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
  <Progress class="w-[60%] [&>div]:rounded-r-full" :value="progress" />
</template>
