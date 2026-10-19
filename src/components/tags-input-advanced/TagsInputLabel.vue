<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

/** A label for the tags input. */
const props = defineProps<{ class?: HTMLAttributes['class'] }>()
</script>

<template>
  <Label
    :class="cn('font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70', props.class)"
    data-slot="tags-input-label"
  >
    <slot />
  </Label>
</template>
