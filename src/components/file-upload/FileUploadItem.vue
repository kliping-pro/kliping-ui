<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { SelectedFile } from './context'
import { Primitive } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { provideFileUploadItemContext } from './context'

/** A single file row. */
const props = defineProps<PrimitiveProps & {
  /** The selected file with its upload state, shared with the item's preview, metadata, and actions. */
  file: SelectedFile
  class?: HTMLAttributes['class']
}>()

provideFileUploadItemContext(computed(() => props.file))
</script>

<template>
  <Primitive
    :as="props.as"
    :as-child="props.asChild"
    :class="cn('relative flex items-center gap-2.5 rounded-md border p-3', props.class)"
    data-slot="file-upload-item"
    :data-status="props.file.status"
  >
    <slot />
  </Primitive>
</template>
