<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { XIcon } from '@lucide/vue'
import { cn } from '@/lib/utils'
import { injectTourContext } from './context'

// Sama seperti melewati, cuma tanpa tulisan.
/** Close button in the corner of the card. */
const props = defineProps<{ class?: HTMLAttributes['class'] }>()

const { skip } = injectTourContext('TourClose')
</script>

<template>
  <button
    aria-label="Close tour"
    :class="cn(
      'absolute top-3 right-3 rounded-sm opacity-70 outline-none transition-opacity hover:opacity-100 focus-visible:ring-2 focus-visible:ring-ring [&_svg]:size-4 [&_svg]:shrink-0',
      props.class,
    )"
    data-slot="tour-close"
    type="button"
    @click="skip"
  >
    <slot>
      <XIcon />
    </slot>
  </button>
</template>
