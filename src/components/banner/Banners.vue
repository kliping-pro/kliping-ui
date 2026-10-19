<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { BannerSide, BannerStrategy, RegisteredBanner } from './context'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { cn } from '@/lib/utils'
import { ANIMATION_DURATION, provideBannersContext } from './context'

/**
 * Wadah antrean pita.
 *
 * Pitanya sendiri tidak digambar di sini. Tiap `<Banner>` mendaftarkan diri,
 * lalu memindahkan markupnya sendiri ke wadah ini lewat `<Teleport>`. Itu
 * berbeda dari sumbernya, yang menyimpan isi tiap pita sebagai `ReactNode` di
 * dalam store lalu menggambarnya dari sini.
 *
 * Cara React tidak bisa ditiru di Vue: isi slot bukan nilai yang bisa
 * disimpan dan digambar ulang komponen lain — ia terikat pada instance yang
 * mendeklarasikannya. Teleport menyelesaikannya dari arah sebaliknya:
 * pitanya tetap milik komponennya sendiri, cuma letak gambarnya yang
 * dipindahkan.
 *
 * Tingginya dianimasikan supaya isi halaman di bawahnya bergeser halus saat
 * pita datang dan pergi, bukan melompat.
 */
const props = withDefaults(defineProps<{
  /** How many banners are visible at once; the rest wait their turn. */
  maxVisible?: number
  /** Edge the banners attach to and slide in from: top or bottom. */
  side?: BannerSide
  /** Container positioning: fixed, static, sticky, or absolute; fixed and absolute are teleported. */
  strategy?: BannerStrategy
  /** The target container when the strategy is `fixed` or `absolute`. */
  container?: string | HTMLElement
  class?: HTMLAttributes['class']
}>(), {
  maxVisible: 1,
  side: 'top',
  strategy: 'fixed',
})

const items = ref<RegisteredBanner[]>([])
const containerRef = ref<HTMLElement>()
const isMounted = ref(false)

const closeTimers = new Map<string, ReturnType<typeof setTimeout>>()

onMounted(() => {
  isMounted.value = true
})

onBeforeUnmount(() => {
  for (const timer of closeTimers.values()) clearTimeout(timer)
  closeTimers.clear()
})

function register(id: string, priority: number) {
  if (items.value.some(b => b.id === id)) return

  const entry = { id, priority, height: 0, closing: false }

  // Prioritas tinggi menyalip yang rendah, tapi tidak menyalip yang sama —
  // di antara prioritas yang sama, yang datang duluan tetap di depan.
  const position = items.value.findIndex(b => b.priority < priority)
  items.value = position === -1
    ? [...items.value, entry]
    : [...items.value.slice(0, position), entry, ...items.value.slice(position)]
}

function unregister(id: string) {
  const timer = closeTimers.get(id)
  if (timer) {
    clearTimeout(timer)
    closeTimers.delete(id)
  }
  items.value = items.value.filter(b => b.id !== id)
}

function measure(id: string, height: number) {
  items.value = items.value.map(b => (b.id === id ? { ...b, height } : b))
}

function close(id: string) {
  if (closeTimers.has(id)) return

  items.value = items.value.map(b => (b.id === id ? { ...b, closing: true } : b))
  closeTimers.set(id, setTimeout(() => {
    closeTimers.delete(id)
    unregister(id)
  }, ANIMATION_DURATION))
}

const visible = computed(() => items.value.slice(0, props.maxVisible))

function getIndex(id: string) {
  return visible.value.findIndex(b => b.id === id)
}

function getOffset(id: string) {
  let total = 0
  for (const b of visible.value) {
    if (b.id === id) break
    total += b.height
  }
  return total
}

// Pita yang sedang menutup tidak lagi menyumbang tinggi, jadi wadahnya
// menyusut berbarengan dengan animasi keluarnya.
const totalHeight = computed(() =>
  visible.value.reduce((n, b) => n + (b.closing ? 0 : b.height), 0))

const isPortaled = computed(() => props.strategy === 'fixed' || props.strategy === 'absolute')

provideBannersContext({
  items,
  container: containerRef,
  side: computed(() => props.side),
  maxVisible: computed(() => props.maxVisible),
  register,
  unregister,
  measure,
  close,
  getIndex,
  getOffset,
})
</script>

<template>
  <Teleport :disabled="!isPortaled || !isMounted" :to="props.container ?? 'body'">
    <div
      ref="containerRef"
      :class="cn(
        'pointer-events-none right-0 left-0 isolate z-50',
        props.strategy === 'fixed' && 'fixed',
        props.strategy === 'static' && 'relative',
        props.strategy === 'sticky' && 'sticky',
        props.strategy === 'absolute' && 'absolute',
        props.side === 'top' ? 'top-0' : 'bottom-0',
        props.class,
      )"
      data-slot="banner-container"
      :data-side="props.side"
      :data-strategy="props.strategy"
      :style="{
        height: totalHeight > 0 ? `${totalHeight}px` : undefined,
        transition: `height ${ANIMATION_DURATION}ms cubic-bezier(0.32, 0.72, 0, 1)`,
      }"
    />
  </Teleport>

  <slot />
</template>
