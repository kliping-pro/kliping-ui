<script setup lang="ts">
import type { AcceptableValue } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'

/**
 * Satu kotak centang beserta labelnya.
 *
 * Dibungkus `<label>` supaya teksnya ikut jadi daerah klik. Yang menandai
 * keadaan tidak sah `data-invalid` di kotaknya, dan warnanya merambat ke
 * labelnya lewat `has-data-invalid` — bukan lewat prop yang harus diteruskan
 * dua kali.
 */
const props = defineProps<{
  /** Value added to the group's model while this checkbox is checked. */
  value: AcceptableValue
  disabled?: boolean
  /** Marks the checkbox and its label invalid with the destructive color. */
  invalid?: boolean
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <label class="flex w-fit select-none items-center gap-2 text-sm leading-none has-data-disabled:cursor-not-allowed has-data-invalid:text-destructive has-data-disabled:opacity-50">
    <Checkbox
      :class="cn('data-[invalid]:border-destructive', props.class)"
      :data-invalid="props.invalid ? '' : undefined"
      data-slot="checkbox-group-item"
      :disabled="props.disabled"
      :value="props.value"
    />
    <slot />
  </label>
</template>
