<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes, VNode } from 'vue'
import type { AvatarGroupVariants } from '.'
import { Primitive } from 'reka-ui'
import { computed, Comment, Fragment, useSlots } from 'vue'
import { cn } from '@/lib/utils'
import { avatarGroupVariants } from '.'
import AvatarGroupItem from './AvatarGroupItem.vue'

/**
 * Deretan avatar yang saling menumpuk.
 *
 * Yang dihitung isi slotnya, bukan sebuah prop berisi array. Itu keputusan
 * yang dibawa dari sumbernya, dan tetap masuk akal di Vue: pemakainya menulis
 * avatar apa saja di dalamnya — gambar, inisial, ikon — dan komponen ini cuma
 * mengurus penumpukan dan pemotongannya.
 *
 * `max` memotong deretannya. Yang tersisa `max - 1` avatar ditambah satu
 * penghitung, bukan `max` avatar ditambah penghitung — kalau tidak, deretannya
 * jadi lebih panjang dari yang diminta.
 */
const props = withDefaults(defineProps<PrimitiveProps & {
  orientation?: 'horizontal' | 'vertical'
  dir?: 'ltr' | 'rtl'
  /** The side length of each avatar, in pixels. */
  size?: number
  /** How many to show before the rest is collapsed. */
  max?: number
  /** Stacks in the opposite direction: the first one is on top. */
  reverse?: boolean
  class?: HTMLAttributes['class']
}>(), {
  orientation: 'horizontal',
  dir: 'ltr',
  size: 40,
  reverse: false,
})

const slots = useSlots()

/**
 * Meratakan isi slot jadi daftar avatar.
 *
 * `v-for` di dalam slot menghasilkan satu VNode Fragment, bukan sekian VNode
 * berjajar. Tanpa diratakan, seluruh daftar terhitung sebagai satu avatar dan
 * `max` tidak pernah memotong apa pun.
 */
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

const truncated = computed(() => Boolean(props.max) && children.value.length > (props.max as number))
const visible = computed(() => (truncated.value ? children.value.slice(0, (props.max as number) - 1) : children.value))
const remaining = computed(() => (truncated.value ? children.value.length - ((props.max as number) - 1) : 0))
const renderedCount = computed(() => (truncated.value ? (props.max as number) : children.value.length))
</script>

<template>
  <Primitive
    :as="props.as"
    :as-child="props.asChild"
    :class="cn(avatarGroupVariants({
      orientation: props.orientation,
      dir: props.dir,
    } as AvatarGroupVariants), props.class)"
    :data-orientation="props.orientation"
    data-slot="avatar-group"
  >
    <AvatarGroupItem
      v-for="(child, i) in visible"
      :key="i"
      :dir="props.dir"
      :index="i"
      :item-count="renderedCount"
      :orientation="props.orientation"
      :reverse="props.reverse"
      :size="props.size"
    >
      <component :is="child" />
    </AvatarGroupItem>

    <AvatarGroupItem
      v-if="truncated"
      :dir="props.dir"
      :index="visible.length"
      :item-count="renderedCount"
      :orientation="props.orientation"
      :reverse="props.reverse"
      :size="props.size"
    >
      <slot :count="remaining" name="overflow">
        <div class="inline-flex size-full items-center justify-center rounded-full bg-muted font-medium text-muted-foreground text-xs">
          +{{ remaining }}
        </div>
      </slot>
    </AvatarGroupItem>
  </Primitive>
</template>
