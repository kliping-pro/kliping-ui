<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { injectTourContext } from './context'

/**
 * Penanda langkah ke berapa dari berapa.
 *
 * Bentuk bawaannya titik-titik, dan tiap titik tombol yang melompat ke
 * langkahnya. Yang mau angka saja — "2 dari 5" — mengisi slotnya, dan slot
 * itu menerima nomor dan jumlahnya.
 */
const props = withDefaults(defineProps<{
  /** Whether the dots can be clicked to jump to a step. */
  interactive?: boolean
  class?: HTMLAttributes['class']
}>(), {
  interactive: true,
})

const { state, goTo } = injectTourContext('TourProgress')
</script>

<template>
  <div
    :class="cn('flex items-center gap-1.5', props.class)"
    data-slot="tour-progress"
  >
    <slot :index="state.index" :total="state.steps.length">
      <button
        v-for="(l, i) in state.steps"
        :key="l.id"
        :aria-current="i === state.index ? 'step' : undefined"
        :aria-label="`Step ${i + 1} of ${state.steps.length}`"
        class="size-1.5 rounded-full transition-all disabled:cursor-default"
        :class="i === state.index ? 'w-4 bg-primary' : 'bg-muted-foreground/30 hover:bg-muted-foreground/60'"
        :disabled="!props.interactive"
        type="button"
        @click="goTo(i)"
      />
    </slot>
  </div>
</template>
