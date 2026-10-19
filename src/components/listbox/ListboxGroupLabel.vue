<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { ListboxGroupLabel as ListboxGroupLabelPrimitive } from 'reka-ui'
import { cn } from '@/lib/utils'

/** A group heading. */
const props = defineProps<PrimitiveProps & {
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <ListboxGroupLabelPrimitive
    :as="props.as"
    :as-child="props.asChild"
    :class="cn('px-2 pt-1 font-medium text-muted-foreground text-sm', props.class)"
    data-slot="listbox-group-label"
  >
    <slot />
  </ListboxGroupLabelPrimitive>
</template>
