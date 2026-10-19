<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { defaultDocument, defaultWindow, useEventListener } from '@vueuse/core'
import { computed, onMounted, ref } from 'vue'
import { cn } from '@/lib/utils'
import { provideSelectionToolbarContext } from './context'

/**
 * Bilah alat yang muncul di atas teks yang sedang disorot.
 *
 * Posisinya dihitung langsung dari kotak sorotannya, bukan lewat Popover
 * milik Reka UI. Alasannya bukan menghindari ketergantungan: Popover
 * mengurung fokus di dalam isinya, dan fokus yang berpindah membatalkan
 * sorotan teks — yang justru satu-satunya alasan bilah ini ada.
 *
 * Yang dibutuhkan pun sedikit. Sorotan teks selalu punya satu kotak, bilahnya
 * selalu di atas atau di bawahnya, dan satu-satunya tabrakan yang mungkin
 * tepi layar. Tujuh middleware Floating UI yang dirakit sumbernya menjawab
 * pertanyaan yang tidak muncul di sini.
 */
const props = withDefaults(defineProps<{
  /** The element whose selections are tracked. Defaults to the whole document. */
  container?: HTMLElement | null
  /** `bottom` places it below the selection, any other value above; flips when it does not fit. */
  side?: 'top' | 'right' | 'bottom' | 'left'
  /** Distance in px between the selected text and the toolbar. */
  sideOffset?: number
  /** Horizontal alignment against the selection: `start`, `center`, or `end`. */
  align?: 'start' | 'center' | 'end'
  /** Horizontal shift in px applied after alignment. */
  alignOffset?: number
  /** Clamps the toolbar horizontally so it stays inside the viewport. */
  avoidCollisions?: boolean
  /** Minimum distance in px kept from the viewport edges. */
  collisionPadding?: number
  /** Hides it when the selected text scrolls out of view. */
  hideWhenDetached?: boolean
  class?: HTMLAttributes['class']
}>(), {
  side: 'top',
  sideOffset: 8,
  align: 'center',
  alignOffset: 0,
  avoidCollisions: true,
  collisionPadding: 8,
  hideWhenDetached: true,
})

const open = defineModel<boolean>('open', { default: false })

const emit = defineEmits<{
  /** The selected text changed, with the new text. */
  selectionChange: [text: string]
}>()

const text = ref('')
const rect = ref<DOMRect | null>(null)

const toolbar = ref<HTMLElement>()

/**
 * Menunda `<Teleport>` sampai terpasang.
 *
 * Render server tidak punya `body` untuk dituju, jadi isinya disimpan ke
 * penampung terpisah dan tidak pernah ikut terbit — sementara klien mencari
 * jangkar teleport-nya di HTML yang terbit itu dan tidak menemukannya.
 * Keluhan hidrasinya muncul jauh dari sini, di komponen mana pun yang
 * kebetulan tergambar setelahnya.
 *
 * Bilahnya sendiri memang tidak pernah tergambar di server — sorotan teks
 * baru ada setelah ada yang menyorot. Yang perlu ditunda jangkar teleport-nya,
 * bukan isinya.
 */
const mounted = ref(false)

onMounted(() => {
  mounted.value = true
})

/**
 * Letak bilahnya dalam koordinat layar.
 *
 * Dijepit ke dalam layar di kedua sumbu, dan berbalik ke sisi seberang kalau
 * sisi yang diminta tidak muat — itu seluruh penanganan tabrakan yang
 * diperlukan bilah yang selalu menempel pada satu kotak.
 */
const position = computed(() => {
  const k = rect.value
  if (!k) return undefined

  const toolbarWidth = toolbar.value?.offsetWidth ?? 0
  const toolbarHeight = toolbar.value?.offsetHeight ?? 0

  const isAbove = props.side !== 'bottom'
  const fits = isAbove
    ? k.top - toolbarHeight - props.sideOffset >= props.collisionPadding
    : k.bottom + toolbarHeight + props.sideOffset <= window.innerHeight - props.collisionPadding

  const top = (isAbove === fits)
    ? k.top - toolbarHeight - props.sideOffset
    : k.bottom + props.sideOffset

  const aligned = props.align === 'start'
    ? k.left
    : props.align === 'end'
      ? k.right - toolbarWidth
      : k.left + k.width / 2 - toolbarWidth / 2

  const left = props.avoidCollisions
    ? Math.min(
        Math.max(aligned + props.alignOffset, props.collisionPadding),
        window.innerWidth - toolbarWidth - props.collisionPadding,
      )
    : aligned + props.alignOffset

  return { top: `${top}px`, left: `${left}px` }
})

/** The selection rect has scrolled fully out of view. */
const isDetached = computed(() => {
  const k = rect.value
  if (!k || !props.hideWhenDetached) return false
  return k.bottom < 0 || k.top > window.innerHeight
})

function close() {
  open.value = false
  text.value = ''
  rect.value = null
}

function readSelection() {
  const selection = window.getSelection()
  const content = selection?.toString().trim() ?? ''

  if (!selection || selection.rangeCount === 0 || !content) {
    close()
    return
  }

  // Sorotan yang berada di luar wadah yang diminta diabaikan — halaman bisa
  // punya beberapa bilah sekaligus, masing-masing untuk daerahnya sendiri.
  if (props.container) {
    const node = selection.anchorNode
    if (!node || !props.container.contains(node)) {
      close()
      return
    }
  }

  rect.value = selection.getRangeAt(0).getBoundingClientRect()
  text.value = content
  open.value = true
  emit('selectionChange', content)
}

// `selectionchange` menyala di tengah penyeretan juga, jadi bilahnya sudah
// mengikuti sebelum tetikusnya dilepas.
useEventListener(defaultDocument, 'selectionchange', readSelection)
useEventListener(defaultWindow, 'scroll', () => {
  if (open.value) readSelection()
}, { passive: true })

provideSelectionToolbarContext(computed(() => ({
  text: text.value,
  open: open.value,
  close: () => {
    window.getSelection()?.removeAllRanges()
    close()
  },
})))
</script>

<template>
  <Teleport v-if="mounted" to="body">
    <div
      v-if="open && position && !isDetached"
      ref="toolbar"
      :class="cn(
        'fade-in-0 zoom-in-95 fixed z-50 flex animate-in items-center gap-1 rounded-lg border bg-card px-1.5 py-1.5 shadow-lg outline-none duration-200 [animation-timing-function:cubic-bezier(0.16,1,0.3,1)]',
        'motion-reduce:animate-none motion-reduce:transition-none',
        props.class,
      )"
      data-slot="selection-toolbar"
      role="toolbar"
      :style="position"
    >
      <slot :text="text" />
    </div>
  </Teleport>
</template>
