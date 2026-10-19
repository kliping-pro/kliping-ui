<script lang="ts">
export const description = "Tebal busur dan tebal lingkarannya diatur terpisah."
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { Slider } from '@/components/ui/slider'
import CircularProgress from '@/variants/progress/components/CircularProgress.vue'

const progress = ref([13])

</script>

<template>
  <div class="mx-auto flex w-full max-w-xs flex-col items-center">
    <!--
      Tiga lingkaran 120px tidak muat di layar sempit; di bawah sm ketiganya
      berbagi lebar yang ada dan SVG-nya ikut mengecil.
    -->
    <div class="flex w-full items-center gap-1 *:min-w-0 *:flex-1 sm:w-max sm:*:flex-none [&_svg]:h-auto [&_svg]:max-w-full">
      <CircularProgress
        label-class="text-sm font-bold sm:text-xl"
        :render-label="(progress) => `${progress}%`"
        showLabel
        :size="120"
        :stroke-width="10"
        :value="progress[0]"
      />
      <CircularProgress
        :circle-stroke-width="12"
        label-class="text-sm font-bold sm:text-xl"
        :progress-stroke-width="6"
        :render-label="(progress) => `${progress}%`"
        showLabel
        :size="120"
        :value="progress[0]"
      />
      <CircularProgress
        :circle-stroke-width="6"
        label-class="text-sm font-bold sm:text-xl"
        :progress-stroke-width="10"
        :render-label="(progress) => `${progress}%`"
        showLabel
        :size="120"
        :value="progress[0]"
      />
    </div>
    <Slider
      class="mt-6"
      v-model="progress"
      :max="100"
      :step="1"
    />
  </div>
</template>
