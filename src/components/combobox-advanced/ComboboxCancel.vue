<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { X } from '@lucide/vue'
import { ComboboxCancel as ComboboxCancelPrimitive } from 'reka-ui'
import { cn } from '@/lib/utils'

/** A button that clears the typed text. */
const props = defineProps<PrimitiveProps & {
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <ComboboxCancelPrimitive
    :as="props.as"
    :as-child="props.asChild"
    :class="cn(
      'flex size-6 items-center justify-center rounded-sm bg-background opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none',
      props.class,
    )"
    data-slot="combobox-cancel"
  >
    <slot>
      <X class="size-3.5" />
    </slot>
  </ComboboxCancelPrimitive>
</template>
