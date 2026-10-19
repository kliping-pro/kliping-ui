<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { Primitive } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { timelineConnectorVariants } from '.'
import { getItemStatus, injectTimelineContext, injectTimelineItemContext } from './context'

/**
 * Garis yang menghubungkan satu simpul ke simpul berikutnya.
 *
 * Warnanya ditentukan status simpul BERIKUTNYA, bukan simpul ini. Itu terbaca
 * terbalik sampai dilihat gambarnya: garis yang keluar dari langkah yang sudah
 * selesai menuju langkah yang belum harus digambar sebagai belum tercapai.
 *
 * Simpul terakhir tidak menggambarnya sama sekali — garis yang menggantung ke
 * bawah tanpa tujuan terbaca sebagai daftar yang terpotong.
 */
const props = defineProps<PrimitiveProps & {
  /** Renders it even when this is the last item. */
  forceMount?: boolean
  class?: HTMLAttributes['class']
}>()

const { state, registry } = injectTimelineContext('TimelineConnector')
const item = injectTimelineItemContext('TimelineConnector')

const nextStatus = computed(() => {
  const index = registry.getIndex(item.value.id)
  if (index === -1 || index === registry.items.value.length - 1) return undefined
  return getItemStatus(index + 1, state.value.activeIndex)
})

const isLastItem = computed(() => nextStatus.value === undefined)

const isReached = computed(() =>
  nextStatus.value === 'completed' || nextStatus.value === 'active')
</script>

<template>
  <Primitive
    v-if="props.forceMount || !isLastItem"
    aria-hidden="true"
    :as="props.as"
    :as-child="props.asChild"
    :class="cn(timelineConnectorVariants({
      isCompleted: isReached,
      orientation: state.orientation,
      variant: state.variant,
      isAlternateRight: item.isAlternateRight,
    }), props.class)"
    :data-completed="isReached ? '' : undefined"
    :data-orientation="state.orientation"
    data-slot="timeline-connector"
    :data-status="item.status"
  >
    <slot />
  </Primitive>
</template>
