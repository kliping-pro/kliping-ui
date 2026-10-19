<script setup lang="ts" generic="T">
import type { HTMLAttributes } from 'vue'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { cn } from '@/lib/utils'

/**
 * Deretan lencana yang cuma menampilkan sebanyak yang muat.
 *
 * Tidak ada cara menghitungnya tanpa mengukur: lebar sebuah lencana bergantung
 * pada panjang teksnya, fontnya, dan padding yang diberikan pemakainya. Jadi
 * seluruh lencananya digambar dulu di lapisan tak terlihat, lebarnya dicatat
 * satu per satu, lalu barulah diputuskan mana yang muat.
 *
 * Lapisan pengukur itu tetap ada seumur hidup komponennya, bukan dibuang
 * setelah sekali ukur. Teks lencananya bisa berubah, fontnya bisa selesai
 * dimuat belakangan, dan wadahnya bisa berubah lebar — ketiganya mengubah
 * jawabannya.
 */
const props = withDefaults(defineProps<{
  /** Items to render as badges; those that do not fit in `lineCount` lines collapse into a +N badge. */
  items: T[]
  /** Required when `items` holds objects; optional for plain strings. */
  getBadgeLabel?: (item: T) => string
  /** How many lines may be used before the rest is collapsed. */
  lineCount?: number
  class?: HTMLAttributes['class']
}>(), {
  lineCount: 1,
})

defineSlots<{
  /** A single badge. Called for each item, including while measuring. */
  badge: (props: { item: T, label: string }) => unknown
  /** The overflow indicator. Defaults to a built-in `+n` badge. */
  overflow?: (props: { count: number }) => unknown
}>()

const root = ref<HTMLElement>()
const measurer = ref<HTMLElement>()

const gap = ref(4)
const badgeHeight = ref(20)
const overflowWidth = ref(40)
const containerWidth = ref(0)
const widthByLabel = ref(new Map<string, number>())
const measured = ref(false)

function label(item: T): string {
  if (typeof item === 'object' && item !== null && !props.getBadgeLabel) {
    throw new TypeError('`getBadgeLabel` is required when `items` contains objects.')
  }
  return props.getBadgeLabel ? props.getBadgeLabel(item) : String(item)
}

function measure() {
  const el = root.value
  const measurerEl = measurer.value
  if (!el || !measurerEl) return

  const style = getComputedStyle(el)
  gap.value = Number.parseFloat(style.gap) || 4

  const paddingLeft = Number.parseFloat(style.paddingLeft) || 0
  const paddingRight = Number.parseFloat(style.paddingRight) || 0

  const widths = new Map<string, number>()
  const children = measurerEl.children

  for (let i = 0; i < props.items.length; i++) {
    const child = children[i] as HTMLElement | undefined
    if (child) widths.set(label(props.items[i] as T), child.offsetWidth)
  }
  widthByLabel.value = widths

  const first = children[0] as HTMLElement | undefined
  if (first) badgeHeight.value = first.offsetHeight || 20

  const overflowEl = children[props.items.length] as HTMLElement | undefined
  if (overflowEl) overflowWidth.value = overflowEl.offsetWidth || 40

  containerWidth.value = el.clientWidth - (paddingLeft + paddingRight)
  measured.value = true
}

let observer: ResizeObserver | undefined

onMounted(() => {
  measure()
  observer = new ResizeObserver(measure)
  if (root.value) observer.observe(root.value)
})

onBeforeUnmount(() => observer?.disconnect())

watch(() => props.items, measure, { deep: true, flush: 'post' })

const layout = computed(() => {
  if (!containerWidth.value || !props.items.length || !widthByLabel.value.size)
    return { visible: props.items, hidden: 0 }

  let lineWidth = 0
  let line = 1
  const visible: T[] = []

  for (let i = 0; i < props.items.length; i++) {
    const item = props.items[i] as T
    const width = widthByLabel.value.get(label(item))
    // Item yang belum sempat terukur dilewati, bukan dianggap nol lebar —
    // menganggapnya nol membuat seluruh sisanya ikut salah hitung.
    if (!width) continue

    const needed = width + gap.value
    const isLastLine = line === props.lineCount
    const hasMore = i < props.items.length - 1

    // Di baris terakhir, tempat untuk penanda sisa harus disisakan lebih dulu
    // — kalau tidak, lencana terakhir muat tapi penandanya tidak.
    const available = isLastLine && hasMore
      ? containerWidth.value - overflowWidth.value - gap.value
      : containerWidth.value

    if (lineWidth + needed <= available) {
      lineWidth += needed
      visible.push(item)
    }
    else if (line < props.lineCount) {
      line++
      lineWidth = needed
      visible.push(item)
    }
    else break
  }

  return { visible, hidden: Math.max(0, props.items.length - visible.length) }
})

/**
 * Tinggi cadangan sebelum pengukurannya selesai.
 *
 * Tanpa ini, halamannya melompat satu baris begitu ukurannya diketahui.
 */
const reservedHeight = computed(() =>
  badgeHeight.value * props.lineCount + gap.value * (props.lineCount - 1))

/** A rough guess at how many badges to render before measuring. */
const beforeMeasured = computed(() =>
  props.items.slice(0, Math.min(props.items.length, props.lineCount * 3 - (props.lineCount > 1 ? 1 : 0))))
</script>

<template>
  <div
    ref="measurer"
    aria-hidden="true"
    class="pointer-events-none invisible absolute flex flex-wrap"
    :style="{ gap: `${gap}px` }"
  >
    <!--
      Dibungkus `<template v-for>`, bukan `v-for` langsung di `<slot>`. Atribut
      yang ditulis di `<slot>` seluruhnya diteruskan sebagai prop slot — jadi
      `:key` di sana bukan kunci daftar, melainkan prop bernama `key` yang
      ikut sampai ke pemakainya.
    -->
    <template v-for="(item, i) in props.items" :key="i">
      <slot :item="item" :label="label(item)" name="badge" />
    </template>
    <slot :count="99" name="overflow">
      <div class="inline-flex h-5 shrink-0 items-center rounded-md border px-1.5 font-semibold text-xs">
        +99
      </div>
    </slot>
  </div>

  <div
    ref="root"
    :class="cn('flex flex-wrap', props.class)"
    data-slot="badge-overflow"
    :style="{
      gap: `${gap}px`,
      minHeight: measured ? undefined : `${reservedHeight}px`,
    }"
  >
    <template v-if="measured">
      <template v-for="(item, i) in layout.visible" :key="i">
        <slot :item="item" :label="label(item)" name="badge" />
      </template>
      <slot v-if="layout.hidden > 0" :count="layout.hidden" name="overflow">
        <div class="inline-flex h-5 shrink-0 items-center rounded-md border px-1.5 font-semibold text-xs">
          +{{ layout.hidden }}
        </div>
      </slot>
    </template>
    <template v-for="(item, i) in beforeMeasured" v-else :key="i">
      <slot :item="item" :label="label(item)" name="badge" />
    </template>
  </div>
</template>
