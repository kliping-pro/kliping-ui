<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { injectTourContext } from './context'

/**
 * Tombol maju.
 *
 * Di langkah terakhir tulisannya berganti sendiri jadi penutup, dan yang
 * ditekan menyelesaikan tur alih-alih memajukannya. Tombol "Berikutnya" di
 * langkah terakhir menjanjikan langkah yang tidak ada.
 */
const props = withDefaults(defineProps<{
  /** Label on regular steps. */
  label?: string
  /** Label on the last step. */
  finishLabel?: string
  class?: HTMLAttributes['class']
}>(), {
  label: 'Next',
  finishLabel: 'Finish',
})

const { state, next } = injectTourContext('TourNext')
</script>

<template>
  <Button
    :class="cn(props.class)"
    data-slot="tour-next"
    size="sm"
    @click="next"
  >
    <slot :is-last="state.isLast">
      {{ state.isLast ? props.finishLabel : props.label }}
    </slot>
  </Button>
</template>
