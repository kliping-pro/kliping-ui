<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

/** A label for the input. */
const props = defineProps<{ class?: HTMLAttributes['class'] }>()
</script>

<template>
  <Label :class="cn('px-0.5 py-1.5 font-semibold text-sm', props.class)" data-slot="mention-label">
    <slot />
  </Label>
</template>
