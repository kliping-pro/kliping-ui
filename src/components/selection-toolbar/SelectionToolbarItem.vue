<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { injectSelectionToolbarContext } from './context'

/**
 * Satu tombol di bilahnya.
 *
 * `mousedown` dicegah supaya sorotannya tidak hilang saat tombolnya ditekan —
 * tanpa itu, aksi apa pun yang membutuhkan teks yang disorot menerima teks
 * kosong.
 */
const props = defineProps<{
  /** Keeps the toolbar open after this button is pressed. */
  keepOpen?: boolean
  class?: HTMLAttributes['class']
}>()

const emit = defineEmits<{ select: [text: string] }>()

const context = injectSelectionToolbarContext('SelectionToolbarItem')

function select() {
  emit('select', context.value.text)
  if (!props.keepOpen) context.value.close()
}
</script>

<template>
  <Button
    :class="cn('size-8', props.class)"
    data-slot="selection-toolbar-item"
    size="icon"
    type="button"
    variant="ghost"
    @click="select"
    @mousedown.prevent
  >
    <slot />
  </Button>
</template>
