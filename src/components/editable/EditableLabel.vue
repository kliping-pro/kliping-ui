<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

/** A label for the field. `required` adds an asterisk. */
const props = defineProps<{
  required?: boolean
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <Label
    :class="cn(
      `font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 data-required:after:ml-0.5 data-required:after:text-destructive data-required:after:content-['*']`,
      props.class,
    )"
    :data-required="props.required ? '' : undefined"
    data-slot="editable-label"
  >
    <slot />
  </Label>
</template>
