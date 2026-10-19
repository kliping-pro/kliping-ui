<script setup lang="ts">
import type { TargetRect, TourStep } from './context'
import { defaultDocument, defaultWindow, useEventListener } from '@vueuse/core'
import { computed, nextTick, ref, watch } from 'vue'
import { provideTourContext } from './context'

/**
 * Tur berpandu yang menyorot elemen satu per satu.
 *
 * Sasaran tiap langkah disebut lewat pemilih CSS, bukan lewat ref. Itu
 * pilihan yang disengaja: tur biasanya menyorot barang-barang yang tersebar
 * di beberapa komponen sekaligus — tombol di bilah atas, panel di samping,
 * kartu di tengah — dan menuntut tiap pemiliknya meneruskan ref ke satu
 * tempat mengubah tur jadi urusan seluruh halaman.
 *
 * Kotak sasarannya disimpan dalam koordinat halaman, bukan koordinat layar.
 * Sorotannya sendiri elemen mutlak di dalam dokumen, jadi kalau yang disimpan
 * koordinat layar, sorotannya bergeser tiap kali halamannya tergulir.
 */
const props = withDefaults(defineProps<{
  /** Ordered steps of the tour, each with its target selector and card content. */
  steps: TourStep[]
  /** Scroll the target to the center of the viewport before highlighting it. */
  scrollIntoView?: boolean
  /** Close the tour when Escape is pressed. */
  closeOnEscape?: boolean
  /** Space around the highlight, in pixels. */
  padding?: number
}>(), {
  scrollIntoView: true,
  closeOnEscape: true,
  padding: 8,
})

const emit = defineEmits<{
  /** The tour was completed through the last step. */
  complete: []
  /** The tour was left before the last step. */
  skip: []
  /** The active step changed: its index and step. */
  stepChange: [index: number, step: TourStep]
}>()

const open = defineModel<boolean>('open', { default: false })
/** Zero-based index of the active step (v-model:step). */
const index = defineModel<number>('step', { default: 0 })

const rect = ref<TargetRect | null>(null)
const card = ref<HTMLElement>()

const current = computed(() => props.steps[index.value])

// Dipanggil setelah tiap perpindahan dan tiap kali halamannya bergeser.
// Langkah tanpa `target` sengaja meninggalkan kotaknya kosong — kartunya
// lalu ditempatkan di tengah layar, yang tepat untuk langkah pembuka dan
// penutup yang tidak menunjuk apa pun.
/** Re-measures the target rectangle of the active step. */
function measure() {
  const selector = current.value?.target
  if (!selector) {
    rect.value = null
    return
  }

  const element = document.querySelector(selector)
  if (!element) {
    rect.value = null
    return
  }

  const r = element.getBoundingClientRect()

  rect.value = {
    top: r.top + window.scrollY - props.padding,
    left: r.left + window.scrollX - props.padding,
    width: r.width + props.padding * 2,
    height: r.height + props.padding * 2,
  }
}

async function goTo(to: number) {
  index.value = to

  const step = props.steps[to]
  if (!step) return

  emit('stepChange', to, step)

  await nextTick()

  if (props.scrollIntoView && step.target) {
    document.querySelector(step.target)?.scrollIntoView({ behavior: 'smooth', block: 'center' })

    // Pengukurannya menunggu gulirannya reda. Tanpa jeda, yang terukur letak
    // sasaran sebelum digulirkan, dan sorotannya mendarat di tempat yang salah.
    await new Promise(resolve => setTimeout(resolve, 320))
  }

  measure()
}

function start(from = 0) {
  open.value = true
  goTo(from)
}

function complete() {
  open.value = false
  emit('complete')
}

function skip() {
  open.value = false
  emit('skip')
}

function next() {
  if (index.value >= props.steps.length - 1) complete()
  else goTo(index.value + 1)
}

function previous() {
  if (index.value > 0) goTo(index.value - 1)
}

watch(open, (isOpen) => {
  if (isOpen) goTo(index.value)
  else rect.value = null
})

useEventListener(defaultWindow, 'resize', () => {
  if (open.value) measure()
}, { passive: true })

useEventListener(defaultWindow, 'scroll', () => {
  if (open.value) measure()
}, { passive: true })

useEventListener(defaultDocument, 'keydown', (event: KeyboardEvent) => {
  if (!open.value) return

  if (event.key === 'Escape' && props.closeOnEscape) {
    event.preventDefault()
    skip()
  }
  else if (event.key === 'ArrowRight') {
    event.preventDefault()
    next()
  }
  else if (event.key === 'ArrowLeft') {
    event.preventDefault()
    previous()
  }
})

provideTourContext({
  state: computed(() => ({
    steps: props.steps,
    index: index.value,
    current: current.value,
    open: open.value,
    isFirst: index.value === 0,
    isLast: index.value === props.steps.length - 1,
    rect: rect.value,
  })),
  start,
  next,
  previous,
  goTo,
  complete,
  skip,
  card,
})

defineExpose({ start, complete, skip, next, previous })
</script>

<template>
  <slot :open="open" :index="index" :start="start" />
</template>
