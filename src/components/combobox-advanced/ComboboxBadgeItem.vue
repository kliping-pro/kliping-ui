<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { X } from '@lucide/vue'
import { cn } from '@/lib/utils'

/** A badge for one selected value, with its remove button. */
const props = defineProps<{ class?: HTMLAttributes['class'] }>()

const emit = defineEmits<{
  /** The badge's remove button was clicked. */
  remove: []
}>()
</script>

<template>
  <span
    :class="cn('inline-flex items-center justify-between gap-1 rounded-sm bg-secondary px-2 py-0.5', props.class)"
    data-slot="combobox-badge-item"
  >
    <span class="truncate text-[13px] text-secondary-foreground">
      <slot />
    </span>
    <button
      aria-label="Remove selection"
      class="shrink-0 rounded p-0.5 opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
      data-slot="combobox-badge-item-delete"
      type="button"
      @click="emit('remove')"
    >
      <X class="size-3" />
    </button>
  </span>
</template>
