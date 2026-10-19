<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { Primitive } from 'reka-ui'
import { cn } from '@/lib/utils'

/** A validation message. Its color changes when `invalid`. */
const props = defineProps<PrimitiveProps & {
  /** Marks the message invalid and colors it with the destructive color. */
  invalid?: boolean
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <Primitive
    :as="props.as"
    :as-child="props.asChild"
    :class="cn('text-[0.8rem] text-muted-foreground leading-none data-[invalid]:text-destructive', props.class)"
    :data-invalid="props.invalid ? '' : undefined"
    data-slot="checkbox-group-message"
  >
    <slot />
  </Primitive>
</template>
