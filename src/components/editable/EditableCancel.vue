<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { EditableCancelTrigger } from 'reka-ui'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

/** A button that cancels the edit. */
const props = defineProps<{ class?: HTMLAttributes['class'] }>()
</script>

<template>
  <EditableCancelTrigger as-child>
    <Button :class="cn(props.class)" data-slot="editable-cancel" size="sm" type="button" variant="ghost">
      <slot>Cancel</slot>
    </Button>
  </EditableCancelTrigger>
</template>
