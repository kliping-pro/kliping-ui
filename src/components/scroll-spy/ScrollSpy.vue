<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { ScrollSpyOrientation } from './context'
import { Primitive, useDirection } from 'reka-ui'
import { computed, onBeforeUnmount, watch } from 'vue'
import { cn } from '@/lib/utils'
import { provideScrollSpyContext } from './context'

/**
 * Navigasi yang menyorot bagian yang sedang terlihat.
 *
 * `IntersectionObserver` yang menjawabnya, bukan pendengar `scroll`. Bedanya
 * bukan gaya: pendengar `scroll` menyala puluhan kali per detik dan setiap
 * kalinya harus mengukur ulang tiap bagian, sedangkan pengamat cuma
 * memberitahu saat perpotongannya benar-benar berubah — dan pengukurannya
 * dilakukan peramban di luar main thread.
 *
 * `rootMargin` bawaannya menyempitkan daerah pengamatan jadi 30% teratas
 * layar. Tanpa penyempitan itu, bagian yang cuma menyembul sedikit di bawah
 * sudah dianggap aktif, dan sorotannya melompat mendahului pembacanya.
 *
 * Selama guliran yang dipicu klik, pengamatnya diabaikan. Kalau tidak,
 * bagian-bagian yang terlewati di tengah perjalanan akan menyorot dirinya
 * satu per satu sampai gulirannya berhenti.
 */
const props = withDefaults(defineProps<PrimitiveProps & {
  defaultValue?: string
  /** The observed area. Empty means the top 30% of the viewport. */
  rootMargin?: string
  /** IntersectionObserver threshold: visible fraction (0 to 1) a section needs to count (default 0.1). */
  threshold?: number | number[]
  /** The distance from the top edge when scrolling to a section. */
  offset?: number
  /** Scroll behavior when a link is clicked: `smooth` (default), `instant`, or `auto`. */
  scrollBehavior?: ScrollBehavior
  /** The scrolled container. Empty means the window. */
  scrollContainer?: HTMLElement | null
  dir?: 'ltr' | 'rtl'
  orientation?: ScrollSpyOrientation
  class?: HTMLAttributes['class']
}>(), {
  threshold: 0.1,
  offset: 0,
  scrollBehavior: 'smooth',
  orientation: 'horizontal',
})

const model = defineModel<string>({ default: '' })

const direction = useDirection(computed(() => props.dir))

const sections = new Map<string, HTMLElement>()
let observer: IntersectionObserver | undefined
let isScrolling = false
let scrollTimer: ReturnType<typeof setTimeout> | undefined

function setupObserver() {
  observer?.disconnect()
  if (!sections.size) return

  observer = new IntersectionObserver((entries) => {
    if (isScrolling) return

    const visible = entries.filter(c => c.isIntersecting)
    if (!visible.length) return

    // Yang paling atas yang menang. Beberapa bagian bisa terlihat sekaligus,
    // dan yang teratas yang sedang dibaca.
    const topmost = visible.reduce((a, b) =>
      (b.boundingClientRect.top < a.boundingClientRect.top ? b : a))

    const id = topmost.target.id
    if (id && sections.has(id)) model.value = id
  }, {
    root: props.scrollContainer ?? null,
    rootMargin: props.rootMargin ?? `${-props.offset}px 0px -70% 0px`,
    threshold: props.threshold,
  })

  for (const el of sections.values()) observer.observe(el)
}

function register(value: string, el: HTMLElement) {
  sections.set(value, el)
  if (!model.value) model.value = value
  setupObserver()
}

function unregister(value: string) {
  sections.delete(value)
  setupObserver()
}

function scrollToSection(value: string) {
  const el = sections.get(value)
  if (!el) return

  model.value = value
  isScrolling = true

  const container = props.scrollContainer
  const top = container
    ? el.offsetTop - props.offset
    : el.getBoundingClientRect().top + window.scrollY - props.offset

  ;(container ?? window).scrollTo({ top, behavior: props.scrollBehavior })

  // Tidak ada peristiwa "guliran selesai" yang bisa diandalkan lintas
  // peramban, jadi yang dipakai jendela waktu. Kepanjangan berarti sorotannya
  // telat menyusul; kependekan berarti bagian yang terlewati sempat menyorot
  // dirinya di tengah jalan.
  clearTimeout(scrollTimer)
  scrollTimer = setTimeout(() => {
    isScrolling = false
  }, 600)
}

watch(() => [props.rootMargin, props.threshold, props.offset, props.scrollContainer], setupObserver)

onBeforeUnmount(() => {
  observer?.disconnect()
  clearTimeout(scrollTimer)
})

provideScrollSpyContext({
  state: computed(() => ({
    dir: direction.value,
    orientation: props.orientation,
    activeValue: model.value,
  })),
  register,
  unregister,
  scrollToSection,
})
</script>

<template>
  <Primitive
    :as="props.as"
    :as-child="props.asChild"
    :class="cn('flex', props.orientation === 'horizontal' ? 'flex-row' : 'flex-col', props.class)"
    :data-orientation="props.orientation"
    data-slot="scroll-spy"
    :dir="direction"
  >
    <slot />
  </Primitive>
</template>
