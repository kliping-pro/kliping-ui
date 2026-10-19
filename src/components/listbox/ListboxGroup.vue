<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { ListboxGroup as ListboxGroupPrimitive } from 'reka-ui'
import { cn } from '@/lib/utils'

/** A group of options with its own heading. */
const props = defineProps<PrimitiveProps & {
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <ListboxGroupPrimitive
    :as="props.as"
    :as-child="props.asChild"
    :class="cn('flex flex-col gap-2', props.class)"
    data-slot="listbox-group"
  >
    <slot />
  </ListboxGroupPrimitive>
</template>
