<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { Primitive } from 'reka-ui'
import { cn } from '@/lib/utils'
import { injectKeyValueContext } from './context'

/** The list of entries. The slot receives one entry per call. */
const props = withDefaults(defineProps<PrimitiveProps & {
  orientation?: 'vertical' | 'horizontal'
  class?: HTMLAttributes['class']
}>(), {
  orientation: 'vertical',
})

const { entries } = injectKeyValueContext('KeyValueList')
</script>

<template>
  <Primitive
    :as="props.as"
    :as-child="props.asChild"
    :class="cn('flex', props.orientation === 'vertical' ? 'flex-col gap-2' : 'flex-row gap-2', props.class)"
    data-slot="key-value-list"
  >
    <template v-for="entry in entries" :key="entry.id">
      <slot :entry="entry" />
    </template>
  </Primitive>
</template>
