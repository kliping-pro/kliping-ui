<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { Primitive } from 'reka-ui'
import { onBeforeUnmount, onMounted } from 'vue'
import { cn } from '@/lib/utils'
import { injectGaugeContext } from './context'

/** A caption below the arc; it also becomes the accessible name read by screen readers. */
const props = defineProps<PrimitiveProps & {
  class?: HTMLAttributes['class']
}>()

const context = injectGaugeContext('GaugeLabel')

let unregister: (() => void) | undefined
onMounted(() => {
  unregister = context.value.registerLabel()
})
onBeforeUnmount(() => unregister?.())
</script>

<template>
  <Primitive
    :as="props.as"
    :as-child="props.asChild"
    :class="cn('mt-2 font-medium text-muted-foreground text-sm', props.class)"
    :data-state="context.state"
    :id="context.labelId"
  >
    <slot />
  </Primitive>
</template>
