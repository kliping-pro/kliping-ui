<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { unrefElement } from '@vueuse/core'
import { Primitive } from 'reka-ui'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { cn } from '@/lib/utils'
import { injectScrollSpyContext } from './context'

/** A single observed section. Its `value` becomes the element id. */
const props = defineProps<PrimitiveProps & {
  /** Unique section value, also used as the element id and the active model value. */
  value: string
  class?: HTMLAttributes['class']
}>()

const { state, register, unregister } = injectScrollSpyContext('ScrollSpySection')

const elementRef = ref<HTMLElement>()

onMounted(() => {
  const el = unrefElement(elementRef) as HTMLElement | undefined
  if (el) register(props.value, el)
})

onBeforeUnmount(() => unregister(props.value))
</script>

<template>
  <Primitive
    ref="elementRef"
    :as="props.as"
    :as-child="props.asChild"
    :class="cn(props.class)"
    :data-orientation="state.orientation"
    data-slot="scroll-spy-section"
    :id="props.value"
  >
    <slot />
  </Primitive>
</template>
