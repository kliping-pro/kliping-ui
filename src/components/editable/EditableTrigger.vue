<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { EditableEditTrigger } from 'reka-ui'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

/** A button that starts editing. */
const props = defineProps<{ class?: HTMLAttributes['class'] }>()
</script>

<template>
  <EditableEditTrigger as-child>
    <Button :class="cn(props.class)" data-slot="editable-trigger" size="sm" type="button" variant="outline">
      <slot>Edit</slot>
    </Button>
  </EditableEditTrigger>
</template>
