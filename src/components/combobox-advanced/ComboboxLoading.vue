<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { Primitive } from 'reka-ui'
import { cn } from '@/lib/utils'

/** Indicates that the list is loading. */
const props = defineProps<PrimitiveProps & {
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <Primitive
    :as="props.as"
    :as-child="props.asChild"
    :class="cn('py-6 text-center text-sm', props.class)"
    data-slot="combobox-loading"
    role="status"
  >
    <slot>Loading…</slot>
  </Primitive>
</template>
