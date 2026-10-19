<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { ComboboxSeparator as ComboboxSeparatorPrimitive } from 'reka-ui'
import { cn } from '@/lib/utils'

/** A divider between groups. */
const props = defineProps<PrimitiveProps & {
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <ComboboxSeparatorPrimitive
    :as="props.as"
    :as-child="props.asChild"
    :class="cn('-mx-1 my-1 h-px bg-muted', props.class)"
    data-slot="combobox-separator"
  />
</template>
