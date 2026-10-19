<script setup lang="ts">
import type { AcceptableValue, PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { Check } from '@lucide/vue'
import { ComboboxItem as ComboboxItemPrimitive, ComboboxItemIndicator } from 'reka-ui'
import { cn } from '@/lib/utils'

/**
 * Satu pilihan.
 *
 * `outset` memindahkan tanda centangnya ke kanan. Yang default menyisakan
 * ruang di kiri untuk centang, jadi seluruh teks tetap sejajar entah
 * terpilih atau tidak.
 */
const props = defineProps<PrimitiveProps & {
  /** Value written to the model when this option is selected. */
  value: AcceptableValue
  disabled?: boolean
  /** Moves the check mark to the right edge instead of reserving space on the left. */
  outset?: boolean
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <ComboboxItemPrimitive
    :as="props.as"
    :as-child="props.asChild"
    :class="cn(
      'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 text-sm outline-hidden data-disabled:pointer-events-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-disabled:opacity-50',
      props.outset ? 'pr-8 pl-2' : 'pr-2 pl-8',
      props.class,
    )"
    data-slot="combobox-item"
    :disabled="props.disabled"
    :value="props.value"
  >
    <ComboboxItemIndicator :class="cn('absolute flex size-3.5 items-center justify-center', props.outset ? 'right-2' : 'left-2')">
      <Check class="size-4" />
    </ComboboxItemIndicator>
    <slot />
  </ComboboxItemPrimitive>
</template>
