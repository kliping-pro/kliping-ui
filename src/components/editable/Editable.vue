<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { EditableRoot } from 'reka-ui'
import { cn } from '@/lib/utils'

/**
 * Teks yang disunting di tempat.
 *
 * Ditulis di atas `EditableRoot` milik Reka UI. Yang dibawanya sudah lengkap:
 * peralihan pratinjau-ke-masukan, pemilihan teks saat difokus, Escape untuk
 * batal, Enter untuk kirim, pelebaran otomatis, dan batas panjang.
 *
 * Nama propnya sedikit berbeda dari sumbernya karena mengikuti Reka UI —
 * `activationMode` menggantikan `triggerMode`, dan `autoResize` menggantikan
 * `autosize`. Menyamarkannya dengan pembungkus akan menyembunyikan
 * dokumentasi Reka UI dari pemakainya, dan itu merugikan lebih dari yang
 * dihemat.
 */
const props = defineProps<PrimitiveProps & {
  defaultValue?: string
  /** Text shown when empty: one string, or separate `edit` and `preview` strings. */
  placeholder?: string | { edit: string, preview: string }
  dir?: 'ltr' | 'rtl'
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  name?: string
  id?: string
  /** What starts editing: `focus`, `dblclick`, or `none`. */
  activationMode?: 'focus' | 'dblclick' | 'none'
  /** What ends editing: `blur`, `enter`, `both`, or `none`. */
  submitMode?: 'blur' | 'enter' | 'both' | 'none'
  /** Selects the whole text when the input receives focus. */
  selectOnFocus?: boolean
  /** Renders in edit mode on mount instead of preview. */
  startWithEditMode?: boolean
  /** Maximum number of characters the value may have. */
  maxLength?: number
  /** Grows the input's width to fit its content while editing. */
  autoResize?: boolean
  class?: HTMLAttributes['class']
}>()

const model = defineModel<string>({ default: '' })

const emit = defineEmits<{
  /** The edit was confirmed (Enter or blur), with the new value. */
  submit: [value: string | null | undefined]
}>()
</script>

<template>
  <EditableRoot
    v-model="model"
    :activation-mode="props.activationMode"
    :as="props.as"
    :as-child="props.asChild"
    :auto-resize="props.autoResize"
    :class="cn('flex min-w-0 flex-col gap-2', props.class)"
    data-slot="editable"
    :default-value="props.defaultValue"
    :dir="props.dir"
    :disabled="props.disabled"
    :id="props.id"
    :max-length="props.maxLength"
    :name="props.name"
    :placeholder="props.placeholder"
    :readonly="props.readonly"
    :required="props.required"
    :select-on-focus="props.selectOnFocus"
    :start-with-edit-mode="props.startWithEditMode"
    :submit-mode="props.submitMode"
    @submit="emit('submit', $event)"
  >
    <slot />
  </EditableRoot>
</template>
