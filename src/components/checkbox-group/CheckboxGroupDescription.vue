<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { Primitive } from 'reka-ui'
import { cn } from '@/lib/utils'

/** Additional description below the group. */
const props = defineProps<PrimitiveProps & {
  /** Marks the description invalid and colors it with the destructive color. */
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
    data-slot="checkbox-group-description"
  >
    <slot />
  </Primitive>
</template>
