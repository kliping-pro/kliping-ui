<script setup lang="ts">
import { ref } from 'vue'
import { DirectionProvider } from '@/components/direction-provider'
import { SegmentedInput, SegmentedInputItem } from '@/components/segmented-input'
import { Button } from '@/components/ui/button'

const direction = ref<'ltr' | 'rtl'>('ltr')
</script>

<template>
  <div class="flex flex-col items-start gap-4">
    <Button variant="outline" @click="direction = direction === 'ltr' ? 'rtl' : 'ltr'">
      Direction: {{ direction.toUpperCase() }}
    </Button>

    <DirectionProvider :dir="direction">
      <SegmentedInput class="w-fit">
        <SegmentedInputItem class="w-16" placeholder="one" />
        <SegmentedInputItem class="w-16" placeholder="two" />
        <SegmentedInputItem class="w-16" placeholder="three" />
      </SegmentedInput>
    </DirectionProvider>
  </div>
</template>
