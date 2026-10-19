<script lang="ts">
export const description = "Gradasi yang bergerak terus, untuk kemajuan tanpa angka pasti."
</script>

<script setup lang="ts">
import { ProgressIndicator, ProgressRoot } from 'reka-ui'
import { onMounted, onScopeDispose, ref } from 'vue'

const progress = ref(13)

let timer: ReturnType<typeof setTimeout>

onMounted(() => {
  timer = setTimeout(() => {
    progress.value = 66
  }, 500)
})

onScopeDispose(() => clearTimeout(timer))
</script>

<template>
  <div class="w-[60%]">
    <ProgressRoot class="relative h-1 w-full overflow-hidden rounded-full bg-primary/20">
      <ProgressIndicator
        class="gradient-flow relative h-full w-full flex-1 transition-all"
        :style="{ transform: `translateX(-${100 - progress}%)` }"
      />
    </ProgressRoot>
  </div>
</template>

<style scoped>
@keyframes gradient-flow {
  0% {
    background-position: 100% 0%;
  }
  100% {
    background-position: -100% 0%;
  }
}

.gradient-flow {
  background: linear-gradient(
    90deg,
    var(--primary),
    color-mix(in oklch, var(--primary) 40%, transparent),
    var(--primary)
  );
  background-size: 200% 100%;
  animation: gradient-flow 2s linear infinite;
}
</style>
