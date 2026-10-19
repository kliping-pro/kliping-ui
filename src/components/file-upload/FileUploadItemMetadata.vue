<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { formatFileSize } from './files'
import { injectFileUploadItemContext } from './context'

/** The file name, size and error message. */
const props = withDefaults(defineProps<{
  size?: 'default' | 'sm'
  class?: HTMLAttributes['class']
}>(), {
  size: 'default',
})

const file = injectFileUploadItemContext('FileUploadItemMetadata')
</script>

<template>
  <div :class="cn('flex min-w-0 flex-1 flex-col', props.class)" data-slot="file-upload-item-metadata">
    <slot>
      <span :class="cn('truncate font-medium text-sm', props.size === 'sm' && 'font-normal text-[13px] leading-snug')">
        {{ file.file.name }}
      </span>
      <span :class="cn('truncate text-muted-foreground text-xs', props.size === 'sm' && 'text-[11px] leading-snug')">
        {{ formatFileSize(file.file.size) }}
      </span>
      <span v-if="file.error" class="text-destructive text-xs">{{ file.error }}</span>
    </slot>
  </div>
</template>
