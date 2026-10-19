<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { unrefElement } from '@vueuse/core'
import { Primitive } from 'reka-ui'
import { computed, onBeforeUnmount, onMounted, ref, useId } from 'vue'
import { cn } from '@/lib/utils'
import { timelineItemVariants } from '.'
import { getItemStatus, injectTimelineContext, provideTimelineItemContext } from './context'

/** A single event on the timeline; it registers itself to learn its index. */
const props = defineProps<PrimitiveProps & {
  id?: string
  class?: HTMLAttributes['class']
}>()

const { state, registry } = injectTimelineContext('TimelineItem')

const defaultId = useId()
const itemId = computed(() => props.id ?? defaultId)

// `ref` pada komponen Reka UI menghasilkan instance komponennya, bukan elemen
// DOM-nya. `unrefElement` menerima keduanya dan selalu mengembalikan
// elemennya — dan tanpa itu `compareDocumentPosition` di akarnya akan
// dipanggil pada objek yang tidak punya metode itu.
const itemRef = ref<HTMLElement>()

onMounted(() => registry.register(itemId.value, () => unrefElement(itemRef) as HTMLElement | undefined))
onBeforeUnmount(() => registry.unregister(itemId.value))

const index = computed(() => registry.getIndex(itemId.value))
const status = computed(() => getItemStatus(index.value, state.value.activeIndex))

const isAlternateRight = computed(() =>
  state.value.variant === 'alternate' && index.value % 2 === 1)

provideTimelineItemContext(computed(() => ({
  id: itemId.value,
  status: status.value,
  isAlternateRight: isAlternateRight.value,
})))
</script>

<template>
  <Primitive
    ref="itemRef"
    :aria-current="status === 'active' ? 'step' : undefined"
    :as="props.as"
    :as-child="props.asChild"
    :class="cn(timelineItemVariants({
      orientation: state.orientation,
      variant: state.variant,
      isAlternateRight,
    }), props.class)"
    :data-alternate-right="isAlternateRight ? '' : undefined"
    :data-orientation="state.orientation"
    data-slot="timeline-item"
    :data-status="status"
    :dir="state.dir"
    :id="itemId"
    role="listitem"
  >
    <slot />
  </Primitive>
</template>
