<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { KeyValueEntry } from './context'
import { Primitive } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { provideKeyValueContext } from './context'

/**
 * Masukan pasangan kunci-nilai yang tumbuh sendiri.
 *
 * Yang membuatnya berguna bukan barisnya, melainkan penempelannya: satu
 * tempelan dari berkas `.env`, potongan YAML, atau salinan spreadsheet
 * langsung terurai jadi beberapa baris. Pembacanya ada di `tempel.ts`.
 *
 * Validasi kuncinya diserahkan pemanggil lewat `validateKey`. Aturan yang
 * masuk akal berbeda-beda — nama variabel lingkungan, header HTTP, dan label
 * bebas punya batasan yang tidak sama — dan menanam salah satunya di sini
 * cuma akan salah untuk dua yang lain.
 */
const props = withDefaults(defineProps<PrimitiveProps & {
  /** Maximum number of rows; adding is disabled and pasted rows are cut off at this limit. */
  maxItems?: number
  /** Minimum number of rows (default 1); empty rows fill up to it and removing below it clears the row. */
  minItems?: number
  /** Placeholder of every key field (default `Key`). */
  keyPlaceholder?: string
  /** Placeholder of every value field (default `Value`). */
  valuePlaceholder?: string
  /** Allow keys that already exist. */
  allowDuplicateKeys?: boolean
  /** Splits multi-line text pasted into a key field into separate rows (default true). */
  enablePaste?: boolean
  /** Trims whitespace around pasted keys and values (default true). */
  trim?: boolean
  /** Removes quotes wrapping pasted values (default true). */
  stripQuotes?: boolean
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  /** Returns an error message, or nothing when the key is valid. */
  validateKey?: (key: string, entries: KeyValueEntry[]) => string | undefined
  class?: HTMLAttributes['class']
}>(), {
  minItems: 1,
  keyPlaceholder: 'Key',
  valuePlaceholder: 'Value',
  allowDuplicateKeys: false,
  enablePaste: true,
  trim: true,
  stripQuotes: true,
  disabled: false,
  readonly: false,
  required: false,
})

const model = defineModel<KeyValueEntry[]>({ default: () => [] })

const emit = defineEmits<{
  /** A new entry was added. */
  add: [entry: KeyValueEntry]
  /** An entry was removed. */
  remove: [entry: KeyValueEntry]
}>()

const newId = () => (globalThis.crypto?.randomUUID?.() ?? `kv-${Math.random().toString(36).slice(2)}`)

// Baris kosong disiapkan sampai `minItems` terpenuhi, supaya kolomnya tidak
// pernah terlihat sebagai daftar yang benar-benar kosong.
const entries = computed<KeyValueEntry[]>({
  get: () => {
    const list = [...model.value]
    while (list.length < props.minItems) list.push({ id: newId(), key: '', value: '' })
    return list
  },
  set: (value) => {
    model.value = value
  },
})

const full = computed(() => Boolean(props.maxItems) && entries.value.length >= (props.maxItems as number))

const errors = computed(() => {
  const result: Record<string, string | undefined> = {}

  for (const entry of entries.value) {
    if (!entry.key) continue

    const duplicate = !props.allowDuplicateKeys
      && entries.value.some(p => p.id !== entry.id && p.key === entry.key)

    result[entry.id] = duplicate
      ? 'This key is already in use.'
      : props.validateKey?.(entry.key, entries.value)
  }

  return result
})

function update(id: string, patch: Partial<Omit<KeyValueEntry, 'id'>>) {
  entries.value = entries.value.map(p => (p.id === id ? { ...p, ...patch } : p))
}

function add(after?: string) {
  if (full.value) return

  const created = { id: newId(), key: '', value: '' }
  const position = after ? entries.value.findIndex(p => p.id === after) + 1 : entries.value.length

  entries.value = [...entries.value.slice(0, position), created, ...entries.value.slice(position)]
  emit('add', created)
}

function remove(id: string) {
  const entry = entries.value.find(p => p.id === id)
  if (!entry) return
  if (entries.value.length <= props.minItems) {
    // Baris terakhir dikosongkan, bukan dihapus — daftar yang jadi
    // benar-benar kosong tidak menyisakan tempat untuk mengetik lagi.
    update(id, { key: '', value: '' })
    return
  }
  entries.value = entries.value.filter(p => p.id !== id)
  emit('remove', entry)
}

function insert(id: string, pairs: { key: string, value: string }[]) {
  const created = pairs.map(p => ({ id: newId(), ...p }))
  const position = entries.value.findIndex(p => p.id === id)
  const current = entries.value[position]

  // Baris yang masih kosong digantikan, bukan didahului — yang menempel ke
  // baris kosong bermaksud mengisinya.
  const empty = current && !current.key && !current.value

  entries.value = [
    ...entries.value.slice(0, position),
    ...created,
    ...entries.value.slice(position + (empty ? 1 : 0)),
  ].slice(0, props.maxItems ?? Number.POSITIVE_INFINITY)
}

provideKeyValueContext({
  state: computed(() => ({
    keyPlaceholder: props.keyPlaceholder,
    valuePlaceholder: props.valuePlaceholder,
    disabled: props.disabled,
    readonly: props.readonly,
    required: props.required,
    enablePaste: props.enablePaste,
    trim: props.trim,
    stripQuotes: props.stripQuotes,
    full: full.value,
    errors: errors.value,
  })),
  entries,
  update,
  add,
  remove,
  insert,
})
</script>

<template>
  <Primitive
    :as="props.as"
    :as-child="props.asChild"
    :class="cn('flex flex-col gap-2', props.class)"
    :data-disabled="props.disabled ? '' : undefined"
    data-slot="key-value"
  >
    <slot />
  </Primitive>
</template>
