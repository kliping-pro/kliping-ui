<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { RovingFocusItem } from 'reka-ui'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { injectActionBarContext } from './context'

/**
 * Satu tombol aksi.
 *
 * Setelah dipilih, bilahnya menutup sendiri — kecuali `keepOpen`. Aksi yang
 * mengubah pilihan tanpa mengakhirinya (mengubah label, misalnya) memakai
 * itu; yang mengakhirinya (menghapus) tidak.
 */
const props = defineProps<{
  disabled?: boolean
  /** Keeps the bar open after this action is selected. */
  keepOpen?: boolean
  class?: HTMLAttributes['class']
}>()

const emit = defineEmits<{ select: [] }>()

const context = injectActionBarContext('ActionBarItem')

function select() {
  if (props.disabled) return
  emit('select')
  if (!props.keepOpen) context.value.close()
}
</script>

<template>
  <RovingFocusItem as-child :focusable="!props.disabled">
    <Button
      :class="cn(context.orientation === 'vertical' && 'w-full', props.class)"
      data-slot="action-bar-item"
      :disabled="props.disabled"
      size="sm"
      type="button"
      variant="secondary"
      @click="select"
    >
      <slot />
    </Button>
  </RovingFocusItem>
</template>
