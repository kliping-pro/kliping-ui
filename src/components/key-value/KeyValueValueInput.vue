<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { injectKeyValueContext, injectKeyValueItemContext } from './context'

/** The value field. */
const props = defineProps<{ class?: HTMLAttributes['class'] }>()

const { state, update } = injectKeyValueContext('KeyValueValueInput')
const entry = injectKeyValueItemContext('KeyValueValueInput')
</script>

<template>
  <Input
    :class="cn('flex-1', props.class)"
    data-slot="key-value-value-input"
    :disabled="state.disabled"
    :model-value="entry.value"
    :placeholder="state.valuePlaceholder"
    :readonly="state.readonly"
    @update:model-value="v => update(entry.id, { value: String(v) })"
  />
</template>
