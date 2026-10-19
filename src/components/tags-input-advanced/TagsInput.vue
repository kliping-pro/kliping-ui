<script setup lang="ts">
import type { AcceptableInputValue, PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { TagsInputRoot } from 'reka-ui'
import { cn } from '@/lib/utils'

/**
 * Masukan tag.
 *
 * Sumbernya membungkus paket React tersendiri, yang tidak punya
 * padanan Vue. Yang menggantikannya di sini `TagsInputRoot` milik Reka UI —
 * bukan bungkus tipis di atas pustaka asing, melainkan pustaka yang memang
 * ditulis untuk Vue, dengan perilaku yang setara: penambahan lewat Enter,
 * penghapusan lewat Backspace, penyuntingan tag lewat klik ganda, penyaringan
 * duplikat, dan batas jumlah.
 */
const props = defineProps<PrimitiveProps & {
  defaultValue?: AcceptableInputValue[]
  /** Whether duplicate tags are allowed. */
  duplicate?: boolean
  disabled?: boolean
  /** The maximum number of tags. Zero means unlimited. */
  max?: number
  required?: boolean
  name?: string
  id?: string
  /** Adds tags from pasted text. */
  addOnPaste?: boolean
  /** Character that commits the typed text as a tag and splits pasted text into tags. */
  delimiter?: string
  class?: HTMLAttributes['class']
}>()

const model = defineModel<AcceptableInputValue[]>({ default: () => [] })

const emit = defineEmits<{
  /** A tag was rejected by validation, with its value. */
  invalid: [value: AcceptableInputValue]
}>()
</script>

<template>
  <TagsInputRoot
    v-model="model"
    :add-on-paste="props.addOnPaste"
    :as="props.as"
    :as-child="props.asChild"
    :class="cn('flex w-full flex-col gap-2', props.class)"
    data-slot="tags-input"
    :default-value="props.defaultValue"
    :delimiter="props.delimiter"
    :disabled="props.disabled"
    :duplicate="props.duplicate"
    :id="props.id"
    :max="props.max"
    :name="props.name"
    :required="props.required"
    @invalid="emit('invalid', $event)"
  >
    <slot />
  </TagsInputRoot>
</template>
