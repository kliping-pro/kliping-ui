<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { KeyValueEntry } from './context'
import { Primitive } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { provideKeyValueItemContext } from './context'

/** A single row: the key field, the value field and its remove button. */
const props = defineProps<PrimitiveProps & {
  /** The entry this row edits; shared with its key, value, remove, and error parts. */
  entry: KeyValueEntry
  class?: HTMLAttributes['class']
}>()

provideKeyValueItemContext(computed(() => props.entry))
</script>

<template>
  <Primitive
    :as="props.as"
    :as-child="props.asChild"
    :class="cn('flex items-start gap-2', props.class)"
    :data-id="props.entry.id"
    data-slot="key-value-item"
  >
    <slot />
  </Primitive>
</template>
