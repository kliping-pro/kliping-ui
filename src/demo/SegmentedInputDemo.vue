<script setup lang="ts">
import { ref } from 'vue'
import { SegmentedInput, SegmentedInputItem } from '@/components/segmented-input'

const day = ref('19')
const month = ref('08')
const year = ref('2026')
</script>

<template>
  <div class="flex flex-col gap-6">
    <SegmentedInput class="w-fit">
      <SegmentedInputItem v-model="day" aria-label="Day" class="w-14" inputmode="numeric" placeholder="DD" />
      <SegmentedInputItem v-model="month" aria-label="Month" class="w-14" inputmode="numeric" placeholder="MM" />
      <SegmentedInputItem v-model="year" aria-label="Year" class="w-20" inputmode="numeric" placeholder="YYYY" />
    </SegmentedInput>

    <SegmentedInput class="w-fit" size="sm">
      <SegmentedInputItem aria-label="Country code" class="w-16" placeholder="+1" />
      <SegmentedInputItem aria-label="Phone number" class="w-40" placeholder="555 123 4567" />
    </SegmentedInput>
  </div>
</template>
