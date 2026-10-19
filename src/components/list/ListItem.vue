<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { Primitive } from 'reka-ui'
import { cn } from '@/lib/utils'

/**
 * Satu baris daftar. `selected` dan `disabled` cuma penanda tampilan — keadaan
 * pilihannya dipegang pemakai, jadi daftar ini bisa jadi menu, pilihan tunggal,
 * atau pilihan ganda tanpa mengubah komponennya.
 */
const props = withDefaults(defineProps<PrimitiveProps & {
  /** Applies the selected highlight and `data-selected`; visual only, selection state is yours to manage. */
  selected?: boolean
  disabled?: boolean
  class?: HTMLAttributes['class']
}>(), {
  as: 'li',
})

const delegatedProps = reactiveOmit(props, 'class', 'selected', 'disabled')
</script>

<template>
  <Primitive
    data-slot="list-item"
    :data-selected="selected"
    :data-disabled="disabled"
    :class="cn(
      'flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors',
      'hover:bg-accent hover:text-accent-foreground',
      'focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
      selected && 'bg-accent text-accent-foreground',
      disabled && 'pointer-events-none opacity-50',
      props.class,
    )"
    v-bind="delegatedProps"
  >
    <slot />
  </Primitive>
</template>
