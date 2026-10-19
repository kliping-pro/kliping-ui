<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes, VNode } from 'vue'
import type { StackItemSize, StackSide } from './context'
import { Primitive } from 'reka-ui'
import { Comment, computed, Fragment, ref, useSlots } from 'vue'
import { cn } from '@/lib/utils'
import { getStackState, provideStackContext } from './context'
import StackItemWrapper from './StackItemWrapper.vue'

/**
 * Tumpukan kartu yang merenggang saat disinggahi.
 *
 * Bentuk yang sama dipakai Sonner untuk menumpuk toast: yang paling depan
 * terbaca penuh, yang di belakangnya mengintip sedikit demi sedikit, dan
 * seluruhnya membuka begitu tetikus mendekat.
 *
 * `isInteracting` menahan tumpukan tetap terbuka selama jarinya masih
 * menekan. Tanpa itu, menyeret sesuatu di dalam kartu membuat tumpukannya
 * menutup begitu tetikus melewati tepinya — di tengah gerakan yang sedang
 * berjalan.
 */
const props = withDefaults(defineProps<PrimitiveProps & {
  /** Side toward which the cards behind the front one peek out and expand: top or bottom. */
  side?: StackSide
  /** How many cards are visible while collapsed. */
  itemCount?: number
  /** How many are visible while expanded. Defaults to all. */
  expandedItemCount?: number
  /** The gap between cards while expanded, in pixels. */
  gap?: number
  /** How much smaller each next card is drawn while collapsed. */
  scale?: number
  /** How far each next card peeks out while collapsed. */
  offset?: number
  /** Expands the stack while the pointer is over it, and keeps it open while pressed. */
  expandOnHover?: boolean
  class?: HTMLAttributes['class']
}>(), {
  side: 'bottom',
  itemCount: 3,
  gap: 8,
  scale: 0.05,
  offset: 10,
  expandOnHover: false,
})

const slots = useSlots()

const isExpanded = ref(false)
const isPressed = ref(false)
const sizes = ref<StackItemSize[]>([])

function flatten(nodes: VNode[]): VNode[] {
  const result: VNode[] = []
  for (const node of nodes) {
    if (node.type === Comment) continue
    if (node.type === Fragment && Array.isArray(node.children))
      result.push(...flatten(node.children as VNode[]))
    else result.push(node)
  }
  return result
}

const children = computed(() => flatten(slots.default?.() ?? []))

function onEnter() {
  if (props.expandOnHover) isExpanded.value = true
}

function onLeave() {
  if (props.expandOnHover && !isPressed.value) isExpanded.value = false
}

provideStackContext({
  state: computed(() => ({
    side: props.side,
    childrenCount: children.value.length,
    itemCount: props.itemCount,
    expandedItemCount: props.expandedItemCount ?? children.value.length,
    gap: props.gap,
    scale: props.scale,
    offset: props.offset,
    isExpanded: isExpanded.value,
  })),
  sizes,
})
</script>

<template>
  <Primitive
    :as="props.as"
    :as-child="props.asChild"
    :class="cn('relative w-full', props.class)"
    data-slot="stack"
    :data-state="getStackState(isExpanded)"
    :style="{
      '--gap': `${props.gap}px`,
      '--offset': `${props.offset}px`,
      '--scale': props.scale,
    }"
    @mouseenter="onEnter"
    @mouseleave="onLeave"
    @mousemove="onEnter"
    @pointerdown="isPressed = true"
    @pointerup="isPressed = false"
  >
    <StackItemWrapper v-for="(child, i) in children" :key="i" :index="i">
      <component :is="child" />
    </StackItemWrapper>
  </Primitive>
</template>
