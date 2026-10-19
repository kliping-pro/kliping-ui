<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { ComponentPublicInstance, HTMLAttributes } from 'vue'
import { Primitive } from 'reka-ui'
import { onMounted, onUpdated, ref } from 'vue'
import { cn } from '@/lib/utils'
import { injectFileUploadContext } from './context'

/**
 * Daerah lepas berkas.
 *
 * `dragenter` dan `dragleave` dihitung, bukan sekadar disetel dan dilepas.
 * Keduanya menyala juga saat pointer berpindah antar elemen ANAK di dalam
 * dropzone, jadi tanpa penghitung, menggerakkan berkas melewati teks di
 * dalamnya sudah cukup untuk mematikan sorotannya.
 */
const props = defineProps<PrimitiveProps & {
  class?: HTMLAttributes['class']
}>()

const { state, open, add, dragging } = injectFileUploadContext('FileUploadDropzone')

let depth = 0

// Dropzone hanya menjadi tombol (role="button", bisa difokus) bila tidak memuat
// `FileUploadTrigger`. Bila ada, tombol itulah jalan keyboard-nya — kontrol
// interaktif di dalam role="button" tidak sah dan membingungkan pembaca layar.
let rootEl: Element | null = null
const hasTrigger = ref(false)
function setRoot(el: Element | ComponentPublicInstance | null) {
  rootEl = el && '$el' in el ? el.$el : el
}
function detectTrigger() {
  hasTrigger.value = !!rootEl?.querySelector?.('[data-slot="file-upload-trigger"]')
}
onMounted(detectTrigger)
onUpdated(detectTrigger)

function onDragEnter(event: DragEvent) {
  event.preventDefault()
  if (state.value.disabled) return
  depth += 1
  dragging.value = true
}

function onDragLeave(event: DragEvent) {
  event.preventDefault()
  depth = Math.max(0, depth - 1)
  if (depth === 0) dragging.value = false
}

function onDrop(event: DragEvent) {
  event.preventDefault()
  depth = 0
  dragging.value = false
  if (state.value.disabled) return
  add([...(event.dataTransfer?.files ?? [])])
}
</script>

<template>
  <Primitive
    :ref="setRoot"
    :as="props.as"
    :as-child="props.asChild"
    :class="cn(
      'relative flex select-none flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-6 outline-none transition-colors hover:bg-accent/30 focus-visible:border-ring/50 data-disabled:pointer-events-none data-[dragging]:border-primary/30 data-[invalid]:border-destructive data-[dragging]:bg-accent/30',
      props.class,
    )"
    :data-disabled="state.disabled ? '' : undefined"
    :data-dragging="state.dragging ? '' : undefined"
    :data-invalid="state.invalid ? '' : undefined"
    data-slot="file-upload-dropzone"
    :role="hasTrigger ? undefined : 'button'"
    :tabindex="hasTrigger ? undefined : state.disabled ? -1 : 0"
    @click="open"
    @dragenter="onDragEnter"
    @dragleave="onDragLeave"
    @dragover.prevent
    @drop="onDrop"
    @keydown.enter.self.prevent="open"
    @keydown.space.self.prevent="open"
  >
    <slot />
  </Primitive>
</template>
