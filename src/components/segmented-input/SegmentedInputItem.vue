<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { SegmentedInputPosition } from './context'
import { computed } from 'vue'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { segmentedInputItemVariants } from '.'
import { injectSegmentedInputContext } from './context'

/**
 * Satu kotak dalam deretannya.
 *
 * `disabled` dan `required` boleh disetel per kotak, dan yang disetel di sini
 * menang atas yang disetel di akarnya — supaya satu kotak bisa dinonaktifkan
 * tanpa mematikan seluruh deretan.
 */
const props = defineProps<{
  /** Place in the row (`first`, `middle`, `last`, `isolated`) for corner rounding; set by the parent if omitted. */
  position?: SegmentedInputPosition
  disabled?: boolean
  required?: boolean
  class?: HTMLAttributes['class']
}>()

const context = injectSegmentedInputContext('SegmentedInputItem')

const isDisabled = computed(() => props.disabled ?? context.value.disabled)
const isRequired = computed(() => props.required ?? context.value.required)
</script>

<template>
  <Input
    :aria-invalid="context.invalid"
    :aria-required="isRequired"
    :class="cn(segmentedInputItemVariants({
      position: props.position,
      orientation: context.orientation,
      size: context.size,
    }), props.class)"
    :data-disabled="isDisabled ? '' : undefined"
    :data-invalid="context.invalid ? '' : undefined"
    :data-orientation="context.orientation"
    :data-position="props.position"
    :data-required="isRequired ? '' : undefined"
    data-slot="segmented-input-item"
    :disabled="isDisabled"
    :required="isRequired"
  />
</template>
