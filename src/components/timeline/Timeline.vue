<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { RegisteredItem, TimelineDirection, TimelineOrientation, TimelineVariant } from './context'
import { Primitive, useDirection } from 'reka-ui'
import { computed, ref } from 'vue'
import { cn } from '@/lib/utils'
import { timelineVariants } from '.'
import { provideTimelineContext } from './context'

/**
 * Akar garis waktu.
 *
 * Tiap simpul mendaftarkan dirinya ke sini, dan urutannya ditentukan letaknya
 * di dokumen — bukan urutan pendaftarannya. Bedanya nyata: simpul yang muncul
 * belakangan karena `v-if` akan terdaftar terakhir sekalipun letaknya di
 * tengah, dan garis penghubungnya akan menunjuk arah yang salah.
 *
 * `compareDocumentPosition` yang menjawabnya, dan itu satu-satunya cara yang
 * benar tanpa memaksa pemakainya menuliskan indeks sendiri.
 */
const props = withDefaults(defineProps<PrimitiveProps & {
  dir?: TimelineDirection
  orientation?: TimelineOrientation
  variant?: TimelineVariant
  /** The step in progress; earlier steps are `completed`, later ones `pending`. */
  activeIndex?: number
  class?: HTMLAttributes['class']
}>(), {
  orientation: 'vertical',
  variant: 'default',
})

const direction = useDirection(computed(() => props.dir))

const items = ref<RegisteredItem[]>([])

function register(id: string, getElement: () => HTMLElement | undefined) {
  if (!items.value.some(s => s.id === id)) items.value = [...items.value, { id, getElement }]
}

function unregister(id: string) {
  items.value = items.value.filter(s => s.id !== id)
}

const sorted = computed(() => [...items.value].sort((a, b) => {
  const left = a.getElement()
  const right = b.getElement()
  if (!left || !right) return 0

  const position = left.compareDocumentPosition(right)
  if (position & Node.DOCUMENT_POSITION_FOLLOWING) return -1
  if (position & Node.DOCUMENT_POSITION_PRECEDING) return 1
  return 0
}))

provideTimelineContext({
  state: computed(() => ({
    dir: direction.value,
    orientation: props.orientation,
    variant: props.variant,
    activeIndex: props.activeIndex,
  })),
  registry: {
    items,
    register,
    unregister,
    getIndex: (id: string) => sorted.value.findIndex(s => s.id === id),
  },
})
</script>

<template>
  <Primitive
    :as="props.as"
    :as-child="props.asChild"
    :class="cn(timelineVariants({ orientation: props.orientation, variant: props.variant }), props.class)"
    :data-orientation="props.orientation"
    data-slot="timeline"
    :data-variant="props.variant"
    :dir="direction"
    role="list"
  >
    <slot />
  </Primitive>
</template>
