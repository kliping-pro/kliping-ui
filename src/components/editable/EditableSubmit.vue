<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { EditableSubmitTrigger } from 'reka-ui'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

/** A button that saves the edit. */
const props = defineProps<{ class?: HTMLAttributes['class'] }>()
</script>

<template>
  <EditableSubmitTrigger as-child>
    <Button :class="cn(props.class)" data-slot="editable-submit" size="sm" type="button" variant="default">
      <slot>Save</slot>
    </Button>
  </EditableSubmitTrigger>
</template>
