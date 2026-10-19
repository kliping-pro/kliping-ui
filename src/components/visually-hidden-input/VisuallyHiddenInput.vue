<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'

/**
 * Masukan tersembunyi yang tetap ikut terkirim bersama formulir.
 *
 * Komponen berperilaku yang menggambar tampilannya sendiri — rating, pemilih
 * warna, masukan tag — tidak punya elemen formulir asli, jadi nilainya tidak
 * pernah sampai ke `FormData`. Yang di sini menutup lubang itu: satu `<input>`
 * yang tidak terlihat, ikut terkirim, dan tetap terbaca teknologi bantu.
 *
 * Ada satu bagian yang tampak berlebihan tapi bukan: nilainya disetel lewat
 * setter bawaan `HTMLInputElement`, bukan lewat pengikatan biasa. Pustaka
 * formulir menyimak peristiwa `input`/`click` asli dari elemennya, dan
 * peristiwa itu cuma terpicu kalau nilainya berubah lewat jalur DOM yang
 * sebenarnya. Menyetel `.value` lewat Vue tidak membangkitkan peristiwa apa
 * pun, dan formulirnya diam-diam tidak pernah tahu nilainya berganti.
 */
const props = withDefaults(defineProps<{
  /** The submitted value. Arrays are serialized as JSON. */
  value?: string | string[]
  /** Used when `type` is a checkable type. */
  checked?: boolean
  // Ukurannya disalin ke masukan tersembunyi supaya pesan validasi bawaan
  // peramban muncul di tempat yang benar, bukan di pojok kiri atas halaman.
  /** The element whose visuals stand in for this input. */
  control?: HTMLElement | null
  /** Whether dispatched events bubble up. */
  bubbles?: boolean
  /** Input type (default `hidden`); `checkbox`, `radio`, or `switch` submit `checked` instead of `value`. */
  type?: string
  name?: string
  required?: boolean
  disabled?: boolean
}>(), {
  bubbles: true,
  type: 'hidden',
  control: null,
})

const inputRef = ref<HTMLInputElement>()
const size = ref<{ width?: number, height?: number }>({})

const isCheckable = computed(() => ['checkbox', 'radio', 'switch'].includes(props.type))
const currentValue = computed(() => (isCheckable.value ? props.checked : props.value))

let observer: ResizeObserver | undefined

watch(() => props.control, (control) => {
  observer?.disconnect()
  observer = undefined

  if (!control) {
    size.value = {}
    return
  }

  size.value = { width: control.offsetWidth, height: control.offsetHeight }

  observer = new ResizeObserver((entries) => {
    const entry = entries[0]
    if (!entry) return

    const box = Array.isArray(entry.borderBoxSize) ? entry.borderBoxSize[0] : entry.borderBoxSize
    size.value = box
      ? { width: box.inlineSize, height: box.blockSize }
      : { width: control.offsetWidth, height: control.offsetHeight }
  })
  observer.observe(control, { box: 'border-box' })
}, { immediate: true })

onBeforeUnmount(() => observer?.disconnect())

watch(currentValue, (next, prev) => {
  const input = inputRef.value
  if (!input || next === prev) return

  const key = isCheckable.value ? 'checked' : 'value'
  const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, key)?.set
  if (!setter) return

  setter.call(input, typeof next === 'object' && next !== null ? JSON.stringify(next) : next)
  input.dispatchEvent(new Event(isCheckable.value ? 'click' : 'input', { bubbles: props.bubbles }))
})

const style = computed(() => ({
  ...(size.value.width !== undefined && size.value.height !== undefined ? size.value : {}),
  border: 0,
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: '1px',
  margin: '-1px',
  overflow: 'hidden',
  padding: 0,
  position: 'absolute' as const,
  whiteSpace: 'nowrap' as const,
  width: '1px',
}))
</script>

<template>
  <input
    ref="inputRef"
    :aria-hidden="isCheckable || undefined"
    :checked="isCheckable ? props.checked : undefined"
    :disabled="props.disabled"
    :name="props.name"
    :required="props.required"
    :style="style"
    tabindex="-1"
    :type="props.type"
  >
</template>
