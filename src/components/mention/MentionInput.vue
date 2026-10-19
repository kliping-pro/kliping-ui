<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { injectMentionContext } from './context'

/**
 * Tempat mengetiknya.
 *
 * `as="textarea"` untuk masukan berbaris banyak — bentuk yang paling sering
 * dipakai untuk sebutan, karena sebutan hidup di dalam kalimat.
 */
const props = withDefaults(defineProps<{
  /** Element to render: `textarea` for multi-line text or `input` for a single line. */
  as?: 'input' | 'textarea'
  /** Hint text shown while the field is empty. */
  placeholder?: string
  /** Visible text rows; only applies when `as` is `textarea`. */
  rows?: number
  disabled?: boolean
  class?: HTMLAttributes['class']
}>(), {
  as: 'textarea',
  rows: 3,
})

// The element ref is passed as `context.input` (not destructured) so the template
// binds the Ref itself and the type checker can see it is used.
const context = injectMentionContext('MentionInput')
const { state, text, select, close, refresh, moveHighlight } = context

/**
 * Menutup daftarnya saat fokus berpindah — tapi tidak lewat `blur` langsung.
 *
 * Mengklik sebuah saran membuat masukannya kehilangan fokus lebih dulu, dan
 * `blur` yang menutup seketika akan melepas item itu dari DOM sebelum
 * `click`-nya sempat jalan. Itulah sebabnya `MentionItem` mencegah
 * `mousedown`-nya; penundaan di sini penjaga kedua, untuk jalur yang tidak
 * lewat tetikus sama sekali.
 */
function onBlur() {
  setTimeout(close, 120)
}

function onKeydown(event: KeyboardEvent) {
  if (!state.value.open) return

  if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
    event.preventDefault()
    moveHighlight(event.key === 'ArrowDown' ? 1 : -1)
    return
  }

  if (event.key === 'Escape') {
    event.preventDefault()
    close()
    return
  }

  if (event.key === 'Enter' || event.key === 'Tab') {
    if (!state.value.highlighted) return
    // Enter di sini memilih saran, bukan menambah baris baru. Itu benar
    // selama daftarnya terbuka, dan cuma selama itu.
    event.preventDefault()
    select(state.value.highlighted)
  }
}
</script>

<template>
  <component
    :is="props.as"
    :ref="context.input"
    v-model="text"
    :class="cn(
      'flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
      props.class,
    )"
    data-slot="mention-input"
    :disabled="props.disabled"
    :placeholder="props.placeholder"
    :rows="props.as === 'textarea' ? props.rows : undefined"
    @blur="onBlur"
    @click="refresh"
    @input="refresh"
    @keydown="onKeydown"
    @keyup="refresh"
  />
</template>
