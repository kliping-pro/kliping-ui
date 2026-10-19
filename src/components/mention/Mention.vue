<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { CaretPosition } from './caret'
import { Primitive } from 'reka-ui'
import { computed, nextTick, ref } from 'vue'
import { cn } from '@/lib/utils'
import { getCaretPosition, readMention } from './caret'
import { provideMentionContext } from './context'

/**
 * Masukan yang membuka daftar saran begitu aksara pemicu diketik.
 *
 * Sumbernya membungkus paket React tersendiri, dan tidak ada padanan
 * Vue-nya — di Reka UI pun tidak. Jadi yang ini ditulis dari nol.
 *
 * Bagian yang paling tidak jelas dari luar: menaruh daftar saran tepat di
 * bawah kursor teks. Tidak ada API peramban yang memberi tahu di mana kursor
 * berada dalam sebuah `<textarea>`; caranya ada di `caret.ts`.
 *
 * Yang disimpan `v-model` teks utuhnya, bukan daftar sebutan yang terpilih.
 * Itu pilihan yang dibawa dari sumbernya dan tetap benar: sebutan hidup di
 * dalam kalimat, dan memisahkannya berarti pemakainya harus menyatukannya
 * kembali sendiri.
 */
const props = withDefaults(defineProps<PrimitiveProps & {
  /** The character that opens the suggestion list. */
  trigger?: string
  class?: HTMLAttributes['class']
}>(), {
  trigger: '@',
})

const model = defineModel<string>({ default: '' })

const emit = defineEmits<{ select: [value: string] }>()

const input = ref<HTMLInputElement | HTMLTextAreaElement>()
const query = ref('')
const mentionStart = ref(-1)
const open = ref(false)
const highlighted = ref<string | null>(null)
const position = ref<CaretPosition | null>(null)
const items = ref<string[]>([])

function registerItem(value: string) {
  if (!items.value.includes(value)) items.value = [...items.value, value]
  if (highlighted.value === null) highlighted.value = items.value[0] ?? null
}

function unregisterItem(value: string) {
  items.value = items.value.filter(i => i !== value)
  if (highlighted.value === value) highlighted.value = items.value[0] ?? null
}

function close() {
  open.value = false
  query.value = ''
  mentionStart.value = -1
  highlighted.value = null
}

/** Re-reads the mention state from the input's text and cursor position. */
function refresh() {
  const el = input.value
  if (!el) return

  const mention = readMention(el.value, el.selectionStart ?? 0, props.trigger)
  if (!mention) {
    close()
    return
  }

  query.value = mention.query
  mentionStart.value = mention.start
  position.value = getCaretPosition(el, mention.start)
  open.value = true
}

function select(value: string) {
  const el = input.value
  if (!el || mentionStart.value === -1) return

  const cursor = el.selectionStart ?? el.value.length
  const after = el.value.slice(cursor)
  const insertion = `${props.trigger}${value} `

  model.value = el.value.slice(0, mentionStart.value) + insertion + after
  emit('select', value)
  close()

  // Kursor dikembalikan ke belakang sisipan setelah Vue menulis nilainya —
  // menyetelnya sekarang akan tertimpa render berikutnya.
  nextTick(() => {
    const caret = mentionStart.value + insertion.length
    el.focus()
    el.setSelectionRange(caret, caret)
  })
}

provideMentionContext({
  state: computed(() => ({
    trigger: props.trigger,
    query: query.value,
    open: open.value,
    highlighted: highlighted.value,
    position: position.value,
  })),
  text: model,
  input,
  items,
  registerItem,
  unregisterItem,
  highlight: (value) => {
    highlighted.value = value
  },
  select,
  close,
  refresh,
  moveHighlight: (direction) => {
    if (!items.value.length) return
    const current = highlighted.value === null ? -1 : items.value.indexOf(highlighted.value)
    // Berputar di kedua ujung: dari yang terakhir turun kembali ke yang
    // pertama, dan sebaliknya.
    const next = (current + direction + items.value.length) % items.value.length
    highlighted.value = items.value[next] ?? null
  },
})
</script>

<template>
  <Primitive
    :as="props.as"
    :as-child="props.asChild"
    :class="cn(
      'relative **:data-tag:rounded **:data-tag:bg-blue-200 **:data-tag:py-px **:data-tag:text-blue-950 dark:**:data-tag:bg-blue-800 dark:**:data-tag:text-blue-50',
      props.class,
    )"
    data-slot="mention"
  >
    <slot />
  </Primitive>
</template>
