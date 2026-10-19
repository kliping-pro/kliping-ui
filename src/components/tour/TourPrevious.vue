<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { injectTourContext } from './context'

// Dimatikan di langkah pertama, bukan disembunyikan — tombol yang hilang
// menggeser susunan kartunya tiap kali langkahnya berganti.
/** Previous-step button, disabled on the first step. */
const props = withDefaults(defineProps<{
  /** Button text when the slot is empty (default `Back`). */
  label?: string
  class?: HTMLAttributes['class']
}>(), {
  label: 'Back',
})

const { state, previous } = injectTourContext('TourPrevious')
</script>

<template>
  <Button
    :class="cn(props.class)"
    data-slot="tour-previous"
    :disabled="state.isFirst"
    size="sm"
    variant="ghost"
    @click="previous"
  >
    <slot>{{ props.label }}</slot>
  </Button>
</template>
