<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

/** A divider between groups of buttons. */
const props = defineProps<{ class?: HTMLAttributes['class'] }>()
</script>

<template>
  <div :class="cn('mx-0.5 h-6 w-px bg-border', props.class)" data-slot="selection-toolbar-separator" />
</template>
