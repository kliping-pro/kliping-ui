<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { injectKeyValueContext, injectKeyValueItemContext } from './context'
import { parsePaste } from './paste'

/**
 * Kolom kuncinya.
 *
 * Tempelan berbaris banyak ditangkap di sini, bukan di kolom nilainya —
 * karena yang ditempel selalu dimulai dari kuncinya.
 */
const props = defineProps<{ class?: HTMLAttributes['class'] }>()

const { state, update, insert } = injectKeyValueContext('KeyValueKeyInput')
const entry = injectKeyValueItemContext('KeyValueKeyInput')

const error = computed(() => state.value.errors[entry.value.id])

function onPaste(event: ClipboardEvent) {
  if (!state.value.enablePaste) return

  const text = event.clipboardData?.getData('text') ?? ''
  if (!text.includes('\n')) return

  const pairs = parsePaste(text, {
    trim: state.value.trim,
    stripQuotes: state.value.stripQuotes,
  })
  if (!pairs.length) return

  event.preventDefault()
  insert(entry.value.id, pairs)
}
</script>

<template>
  <Input
    :aria-invalid="error ? 'true' : undefined"
    :class="cn('flex-1', props.class)"
    data-slot="key-value-key-input"
    :disabled="state.disabled"
    :model-value="entry.key"
    :placeholder="state.keyPlaceholder"
    :readonly="state.readonly"
    :required="state.required"
    @paste="onPaste"
    @update:model-value="v => update(entry.id, { key: String(v) })"
  />
</template>
