<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { X } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { injectKeyValueContext, injectKeyValueItemContext } from './context'

/** Button that removes its row. */
const props = defineProps<{ class?: HTMLAttributes['class'] }>()

const { state, remove } = injectKeyValueContext('KeyValueRemove')
const entry = injectKeyValueItemContext('KeyValueRemove')
</script>

<template>
  <Button
    aria-label="Remove row"
    :class="cn('size-9 shrink-0', props.class)"
    data-slot="key-value-remove"
    :disabled="state.disabled || state.readonly"
    size="icon"
    type="button"
    variant="ghost"
    @click="remove(entry.id)"
  >
    <slot>
      <X />
    </slot>
  </Button>
</template>
