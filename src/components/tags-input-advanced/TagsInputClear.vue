<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { TagsInputClear as TagsInputClearPrimitive } from 'reka-ui'
import { cn } from '@/lib/utils'

/** A button that clears all tags. */
const props = defineProps<{ class?: HTMLAttributes['class'] }>()
</script>

<template>
  <TagsInputClearPrimitive :class="cn(props.class)" data-slot="tags-input-clear">
    <slot />
  </TagsInputClearPrimitive>
</template>
