<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { useResizeObserver } from '@vueuse/core'
import { Primitive } from 'reka-ui'
import { computed, onBeforeUnmount, onMounted, ref, useId } from 'vue'
import { cn } from '@/lib/utils'
import { injectMasonryContext } from './context'

/**
 * Satu unsur dalam susunannya.
 *
 * Tingginya diukur terus, bukan sekali. Gambar yang baru selesai dimuat
 * mengubah tinggi unsurnya, dan susunan yang tidak ikut berubah akan
 * meninggalkan tumpang tindih yang tidak pernah pulih sendiri.
 */
const props = defineProps<PrimitiveProps & {
  class?: HTMLAttributes['class']
}>()

const { state, register, unregister, measure, order } = injectMasonryContext('MasonryItem')

const id = useId()
const itemRef = ref<HTMLElement>()

onMounted(() => register(id))
onBeforeUnmount(() => unregister(id))

useResizeObserver(itemRef, ([entry]) => {
  measure(id, entry.contentRect.height)
})

const index = computed(() => order.value.indexOf(id))
const position = computed(() => state.value.positions[index.value])
</script>

<template>
  <Primitive
    ref="itemRef"
    :as="props.as"
    :as-child="props.asChild"
    :class="cn('absolute top-0 left-0', props.class)"
    data-slot="masonry-item"
    :style="{
      width: position ? `${position.width}px` : undefined,
      transform: position ? `translate3d(${position.x}px, ${position.y}px, 0)` : undefined,
      // Sebelum terukur, unsurnya digambar tapi tidak terlihat — mengukur
      // sesuatu yang `display: none` selalu menghasilkan nol.
      opacity: state.ready ? 1 : 0,
      transition: state.ready ? 'transform 200ms ease, opacity 150ms ease' : undefined,
    }"
  >
    <slot />
  </Primitive>
</template>
