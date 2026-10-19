<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { PopoverTrigger } from 'reka-ui'
import { cn } from '@/lib/utils'
import { injectColorPickerContext } from './context'
import ColorPickerSwatch from './ColorPickerSwatch.vue'

/**
 * Tombol yang membuka pemilihnya.
 *
 * Isinya bawaannya kotak warna dan teks nilainya, dan keduanya bisa diganti
 * lewat slot. Nilai warnanya tetap ditulis di `aria-label` apa pun isi
 * slotnya — pemakai pembaca layar tidak bisa melihat kotaknya.
 */
const props = defineProps<{ class?: HTMLAttributes['class'] }>()

const { state } = injectColorPickerContext('ColorPickerTrigger')
</script>

<template>
  <PopoverTrigger
    :aria-label="`Choose color, currently ${state.value}`"
    :class="cn(
      'flex h-9 w-full items-center gap-2 rounded-md border bg-transparent px-2 text-sm shadow-xs transition-[color,box-shadow] outline-none hover:bg-accent/40 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50',
      props.class,
    )"
    data-slot="color-picker-trigger"
    :disabled="state.disabled"
  >
    <slot :value="state.value">
      <ColorPickerSwatch class="size-5" />
      <span class="truncate font-mono text-xs">{{ state.value }}</span>
    </slot>
  </PopoverTrigger>
</template>
