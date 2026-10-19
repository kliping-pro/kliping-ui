<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes, VNode } from 'vue'
import type { SegmentedInputDirection, SegmentedInputOrientation, SegmentedInputPosition, SegmentedInputSize } from './context'
import { Primitive, useDirection } from 'reka-ui'
import { cloneVNode, Comment, computed, Fragment, useSlots } from 'vue'
import { cn } from '@/lib/utils'
import { provideSegmentedInputContext } from './context'

/**
 * Beberapa kotak masukan yang tampak menyatu jadi satu.
 *
 * Yang membuat deretannya terlihat menyatu bukan wadahnya, melainkan sudut
 * yang dibulatkan dan tepi yang ditiadakan pada tiap kotaknya — dan itu
 * bergantung pada letak masing-masing dalam deretan. Karena letak itu tidak
 * bisa diketahui kotaknya sendiri, komponen ini yang menghitungnya lalu
 * menitipkannya lewat prop `position`.
 *
 * Yang menuliskan `position` sendiri tidak ditimpa. Itu jalan keluar untuk
 * susunan yang tidak berjajar rapi — misalnya kotak yang disembunyikan
 * bersyarat, yang membuat urutan indeksnya tidak lagi mewakili urutan yang
 * terlihat.
 */
const props = withDefaults(defineProps<PrimitiveProps & {
  dir?: SegmentedInputDirection
  orientation?: SegmentedInputOrientation
  size?: SegmentedInputSize
  disabled?: boolean
  /** Marks every box invalid (`aria-invalid` and `data-invalid`). */
  invalid?: boolean
  required?: boolean
  class?: HTMLAttributes['class']
}>(), {
  orientation: 'horizontal',
  size: 'default',
})

const slots = useSlots()

const direction = useDirection(computed(() => props.dir))

provideSegmentedInputContext(computed(() => ({
  dir: direction.value,
  orientation: props.orientation,
  size: props.size,
  disabled: props.disabled,
  invalid: props.invalid,
  required: props.required,
})))

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

const children = computed(() => {
  const nodes = flatten(slots.default?.() ?? [])

  return nodes.map((node, i) => {
    if (node.props?.position) return node

    let position: SegmentedInputPosition
    if (nodes.length === 1) position = 'isolated'
    else if (i === 0) position = 'first'
    else if (i === nodes.length - 1) position = 'last'
    else position = 'middle'

    return cloneVNode(node, { position })
  })
})
</script>

<template>
  <Primitive
    :as="props.as"
    :as-child="props.asChild"
    :class="cn('flex', props.orientation === 'horizontal' ? 'flex-row' : 'flex-col', props.class)"
    :data-disabled="props.disabled ? '' : undefined"
    :data-invalid="props.invalid ? '' : undefined"
    :data-orientation="props.orientation"
    :data-required="props.required ? '' : undefined"
    data-slot="segmented-input"
    :dir="direction"
    role="group"
  >
    <component :is="child" v-for="(child, i) in children" :key="i" />
  </Primitive>
</template>
