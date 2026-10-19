<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

/** The group's label. */
const props = defineProps<{ class?: HTMLAttributes['class'] }>()
</script>

<template>
  <Label
    :class="cn('text-foreground/70 text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70', props.class)"
    data-slot="checkbox-group-label"
  >
    <slot />
  </Label>
</template>
