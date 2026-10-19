<script lang="ts">
export const description = "Ikon matahari dan bulan bergantian di dalam tuasnya."
</script>

<script setup lang="ts">
import { MoonIcon, SunMediumIcon } from '@lucide/vue'
import { ref } from 'vue'
import Switch from '@/variants/switch/components/Switch.vue'

const isDarkMode = ref(false)
</script>

<template>
  <Switch
    v-model="isDarkMode"
    class="h-7 w-12"
    thumb-class="h-6 w-6 data-[state=checked]:translate-x-5"
  >
    <MoonIcon v-if="isDarkMode" class="h-4 w-4" />
    <SunMediumIcon v-else class="h-4 w-4" />
  </Switch>
</template>
