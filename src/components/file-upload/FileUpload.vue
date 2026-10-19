<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { SelectedFile } from './context'
import { Primitive, useDirection } from 'reka-ui'
import { computed, ref } from 'vue'
import { cn } from '@/lib/utils'
import { validateFiles } from './files'
import { provideFileUploadContext } from './context'

/**
 * Pengunggah berkas dengan seret-dan-lepas.
 *
 * `v-model` menyimpan `File[]`, bukan bentuk buatan sendiri. Yang dibutuhkan
 * saat mengirim ke server memang `File`, dan membungkusnya berarti tiap
 * pemakai harus membukanya kembali.
 *
 * Kemajuan dan galat per berkas disimpan terpisah, dikunci id yang stabil.
 * Objek `File` tidak bisa diberi properti tambahan tanpa mengubahnya, dan
 * mengubahnya akan menyulitkan penyamaan dengan berkas yang sama dari
 * sumber lain.
 */
const props = withDefaults(defineProps<PrimitiveProps & {
  /** Accepted types like `<input accept>` (`image/*`, `.pdf`, MIME); other files are rejected. */
  accept?: string
  /** Maximum total number of files; extra files are rejected. Ignored when `multiple` is false. */
  maxFiles?: number
  /** Maximum size per file, in bytes. */
  maxSize?: number
  /** Allows several files (default true); when false, a new file replaces the current one. */
  multiple?: boolean
  disabled?: boolean
  /** Marks the field invalid with `data-invalid`, giving the dropzone a destructive border. */
  invalid?: boolean
  required?: boolean
  name?: string
  dir?: 'ltr' | 'rtl'
  /** Uploads the files; call `onProgress`, `onSuccess` and `onError` to report their state. */
  onUpload?: (
    files: File[],
    report: {
      onProgress: (file: File, percent: number) => void
      onSuccess: (file: File) => void
      onError: (file: File, message: string) => void
    },
  ) => Promise<void> | void
  class?: HTMLAttributes['class']
}>(), {
  multiple: true,
  disabled: false,
  invalid: false,
})

const model = defineModel<File[]>({ default: () => [] })

const emit = defineEmits<{
  /** Files that passed validation were added, all at once. */
  fileAccept: [files: File[]]
  /** A file failed validation; once per file, with the reason. */
  fileReject: [file: File, message: string]
}>()

const direction = useDirection(computed(() => props.dir))

const inputEl = ref<HTMLInputElement>()
const dragging = ref(false)
const fileStates = ref<Record<string, { progress: number, status: SelectedFile['status'], error?: string }>>({})

const fileId = (f: File) => `${f.name}:${f.size}:${f.lastModified}`

const files = computed<SelectedFile[]>(() => model.value.map((file) => {
  const id = fileId(file)
  const s = fileStates.value[id]
  return { id, file, progress: s?.progress ?? 0, status: s?.status ?? 'idle', error: s?.error }
}))

function setFileState(file: File, patch: Partial<{ progress: number, status: SelectedFile['status'], error?: string }>) {
  const id = fileId(file)
  const previous = fileStates.value[id] ?? { progress: 0, status: 'idle' as const }
  fileStates.value = { ...fileStates.value, [id]: { ...previous, ...patch } }
}

function add(incoming: File[]) {
  if (props.disabled) return

  const result = validateFiles(incoming, model.value, {
    accept: props.accept,
    maxSize: props.maxSize,
    maxFiles: props.multiple ? props.maxFiles : 1,
  })

  for (const r of result.rejected) emit('fileReject', r.file, r.message)
  if (!result.accepted.length) return

  model.value = props.multiple ? [...model.value, ...result.accepted] : result.accepted.slice(0, 1)
  emit('fileAccept', result.accepted)

  if (!props.onUpload) return

  for (const f of result.accepted) setFileState(f, { status: 'uploading', progress: 0 })

  void props.onUpload(result.accepted, {
    onProgress: (f, percent) => setFileState(f, { status: 'uploading', progress: percent }),
    onSuccess: f => setFileState(f, { status: 'success', progress: 100 }),
    onError: (f, message) => setFileState(f, { status: 'error', error: message }),
  })
}

function remove(id: string) {
  model.value = model.value.filter(f => fileId(f) !== id)
  const rest = { ...fileStates.value }
  delete rest[id]
  fileStates.value = rest
}

function clear() {
  model.value = []
  fileStates.value = {}
}

function open() {
  if (!props.disabled) inputEl.value?.click()
}

function onChange(event: Event) {
  const el = event.target as HTMLInputElement
  add([...(el.files ?? [])])
  // Dikosongkan supaya memilih berkas yang sama dua kali berturut-turut tetap
  // memicu `change` — tanpa ini, yang kedua tidak menghasilkan apa pun.
  el.value = ''
}

provideFileUploadContext({
  state: computed(() => ({
    files: files.value,
    accept: props.accept,
    maxFiles: props.maxFiles,
    maxSize: props.maxSize,
    multiple: props.multiple,
    disabled: props.disabled,
    invalid: props.invalid,
    dragging: dragging.value,
    dir: direction.value,
  })),
  open,
  add,
  remove,
  clear,
  dragging,
})
</script>

<template>
  <Primitive
    :as="props.as"
    :as-child="props.asChild"
    :class="cn('relative flex flex-col gap-2', props.class)"
    :data-disabled="props.disabled ? '' : undefined"
    :data-invalid="props.invalid ? '' : undefined"
    data-slot="file-upload"
    :dir="direction"
  >
    <slot />
    <input
      ref="inputEl"
      :accept="props.accept"
      aria-label="Upload files"
      class="sr-only"
      :disabled="props.disabled"
      :multiple="props.multiple"
      :name="props.name"
      :required="props.required"
      tabindex="-1"
      type="file"
      @change="onChange"
    >
  </Primitive>
</template>
