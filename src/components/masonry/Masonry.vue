<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { useResizeObserver } from '@vueuse/core'
import { Primitive } from 'reka-ui'
import { computed, ref } from 'vue'
import { cn } from '@/lib/utils'
import { provideMasonryContext } from './context'
import { getColumnCount, layoutMasonry } from './layout'

/**
 * Tata letak batu bata.
 *
 * Bedanya dari `column-count` milik CSS: yang di sana mengisi kolom satu per
 * satu sampai penuh, jadi urutan bacanya jadi menurun-lalu-pindah-kolom.
 * Yang di sini menaruh tiap unsur di kolom yang saat itu paling pendek, dan
 * urutan bacanya tetap kiri ke kanan.
 *
 * Satu hal dari sumbernya sengaja tidak diangkut: virtualisasi. Yang di sana
 * memuat pemosisi lengkap dengan pohon interval dan jendela gulir — sekitar
 * seribu baris — supaya unsur di luar layar tidak digambar. Itu penting pada
 * daftar ribuan unsur, dan tidak terasa sama sekali pada puluhan.
 *
 * Menyalinnya berarti membawa seribu baris yang harus dijaga untuk kasus
 * yang belum ada di sini. Kalau kasus itu datang, yang benar
 * `@tanstack/vue-virtual` — bukan pemosisi yang ditulis ulang sendiri.
 */
const props = withDefaults(defineProps<PrimitiveProps & {
  /** The desired column width; the column count is derived from the container width. */
  columnWidth?: number
  /** A fixed column count, ignoring `columnWidth`. */
  columnCount?: number
  /** Upper limit on the column count derived from `columnWidth`; ignored when `columnCount` is set. */
  maxColumnCount?: number
  /** Space in px between items: one number for both axes, or separate `column` and `row` values. */
  gap?: number | { column: number, row: number }
  class?: HTMLAttributes['class']
}>(), {
  columnWidth: 240,
  gap: 16,
})

const rootRef = ref<HTMLElement>()
const containerWidth = ref(0)
const order = ref<string[]>([])
const heights = ref(new Map<string, number>())

useResizeObserver(rootRef, ([entry]) => {
  containerWidth.value = entry.contentRect.width
})

const gaps = computed(() => (typeof props.gap === 'number'
  ? { column: props.gap, row: props.gap }
  : props.gap))

const columns = computed(() => getColumnCount(containerWidth.value, {
  columnWidth: props.columnWidth,
  columnCount: props.columnCount,
  maxColumnCount: props.maxColumnCount,
  gap: gaps.value.column,
}))

// Lebar kolomnya dihitung ulang dari lebar wadah yang sebenarnya, bukan
// dipakai apa adanya dari prop — kalau tidak, ada sisa ruang menggantung di
// kanan yang besarnya berubah-ubah mengikuti lebar layar.
const columnWidth = computed(() => {
  if (columns.value <= 0 || containerWidth.value <= 0) return props.columnWidth
  return (containerWidth.value - gaps.value.column * (columns.value - 1)) / columns.value
})

const layout = computed(() => layoutMasonry(
  order.value.map(id => heights.value.get(id) ?? 0),
  {
    columns: columns.value,
    columnWidth: columnWidth.value,
    columnGap: gaps.value.column,
    rowGap: gaps.value.row,
  },
))

const ready = computed(() => containerWidth.value > 0 && order.value.every(id => heights.value.has(id)))

function register(id: string) {
  if (!order.value.includes(id)) order.value = [...order.value, id]
  return order.value.indexOf(id)
}

function unregister(id: string) {
  order.value = order.value.filter(u => u !== id)
  heights.value.delete(id)
}

function measure(id: string, height: number) {
  if (heights.value.get(id) === height) return
  // Map disalin, bukan disunting: `computed` yang membacanya melacak
  // identitas ref-nya, dan menyunting isi Map tidak menggantinya.
  const next = new Map(heights.value)
  next.set(id, height)
  heights.value = next
}

provideMasonryContext({
  state: computed(() => ({ positions: layout.value.positions, ready: ready.value })),
  register,
  unregister,
  measure,
  order,
})
</script>

<template>
  <Primitive
    ref="rootRef"
    :as="props.as"
    :as-child="props.asChild"
    :class="cn('relative w-full', props.class)"
    data-slot="masonry"
    :style="{ height: ready ? `${layout.height}px` : undefined }"
  >
    <slot />
  </Primitive>
</template>
