<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Plus } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { injectKeyValueContext } from './context'

/** Button that appends an empty row. */
const props = defineProps<{ class?: HTMLAttributes['class'] }>()

const { state, add } = injectKeyValueContext('KeyValueAdd')
</script>

<template>
  <Button
    :class="cn('w-fit', props.class)"
    data-slot="key-value-add"
    :disabled="state.disabled || state.readonly || state.full"
    size="sm"
    type="button"
    variant="outline"
    @click="add()"
  >
    <slot>
      <Plus /> Add
    </slot>
  </Button>
</template>
