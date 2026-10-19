<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed, onMounted, ref } from 'vue'
import { cn } from '@/lib/utils'
import { stackItemWrapperVariants } from '.'
import { injectStackContext } from './context'

/**
 * Pembungkus satu kartu dalam tumpukan.
 *
 * Yang dihitung di sini dua hal: seberapa jauh kartunya digeser dan seberapa
 * kecil ia digambar. Saat merapat keduanya cuma bergantung pada urutannya —
 * kartu ke-n digeser `n × offset` dan diperkecil `n × scale`. Saat merenggang,
 * pergeserannya harus sejauh jumlah tinggi seluruh kartu di atasnya, dan itu
 * angka yang cuma bisa diketahui setelah kartunya tergambar.
 *
 * Tinggi yang diukur adalah tinggi setelah diperkecil, jadi ia dibagi
 * skalanya kembali untuk mendapat tinggi aslinya. Tanpa pembagian itu,
 * kartu-kartu di bawah akan saling menindih sedikit demi sedikit.
 */
const props = defineProps<{
  /** Position in the stack, 0 being the front card; drives offset, scale, and visibility. */
  index: number
  class?: HTMLAttributes['class']
}>()

const { state, sizes } = injectStackContext('StackItemWrapper')

const elementRef = ref<HTMLElement>()

onMounted(() => {
  const el = elementRef.value
  if (!el) return

  const currentScale = 1 - props.index * state.value.scale
  const naturalHeight = el.getBoundingClientRect().height / currentScale

  if (!sizes.value.some(u => u.itemId === props.index))
    sizes.value = [...sizes.value, { itemId: props.index, size: naturalHeight }]
})

const isVisible = computed(() => (state.value.isExpanded
  ? props.index < state.value.expandedItemCount
  : props.index < state.value.itemCount))

const isFront = computed(() => props.index === 0)

const precedingHeight = computed(() =>
  sizes.value.reduce((sum, u) => (u.itemId >= props.index ? sum : sum + u.size), 0))

const itemScale = computed(() =>
  (state.value.isExpanded ? 1 : 1 - props.index * state.value.scale))

const translate = computed(() => (state.value.isExpanded
  ? props.index * state.value.gap + precedingHeight.value
  : props.index * state.value.offset))

const opacity = computed(() => {
  if (!isVisible.value) return 0
  return state.value.isExpanded ? 1 : 1 - props.index * 0.15
})
</script>

<template>
  <div
    ref="elementRef"
    :class="cn(stackItemWrapperVariants({
      side: state.side,
      isExpanded: state.isExpanded,
      isVisible,
    }), props.class)"
    :data-expanded="state.isExpanded"
    :data-front="isFront"
    :data-index="props.index"
    data-slot="stack-item-wrapper"
    :data-visible="isVisible"
    :style="{
      '--translate': `${translate}px`,
      '--item-scale': itemScale,
      zIndex: state.childrenCount - props.index,
      opacity,
    }"
  >
    <slot />
  </div>
</template>
