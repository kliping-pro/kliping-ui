<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { TagsInputInput as TagsInputInputPrimitive } from 'reka-ui'
import { cn } from '@/lib/utils'

/** Where new tags are typed. */
const props = defineProps<{
  /** Hint text shown while the input is empty. */
  placeholder?: string
  /** Focuses the input when it mounts. */
  autoFocus?: boolean
  /** Maximum number of characters a single typed tag may have. */
  maxLength?: number
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <TagsInputInputPrimitive
    :auto-focus="props.autoFocus"
    :class="cn(
      // Di bawah md teksnya 16px (mencegah zoom otomatis Safari iOS), yang ikut
      // melebarkan lebar bawaan <input>. w-56 (dipakai flex lewat basis-auto)
      // dan leading-5 menyamai lebar dan tingginya dulu di 14px, dan min-w-0
      // membolehkannya menyusut sampai muat di dalam kotak.
      'flex-1 bg-transparent text-base leading-5 outline-hidden placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 md:text-sm max-md:w-56 max-md:min-w-0 max-md:basis-auto',
      props.class,
    )"
    data-slot="tags-input-input"
    :max-length="props.maxLength"
    :placeholder="props.placeholder"
  />
</template>
