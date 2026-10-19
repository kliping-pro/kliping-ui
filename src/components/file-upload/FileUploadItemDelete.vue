<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { X } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { injectFileUploadItemContext, injectFileUploadContext } from './context'

/** Button that removes one file from the list. */
const props = defineProps<{ class?: HTMLAttributes['class'] }>()

const { state, remove } = injectFileUploadContext('FileUploadItemDelete')
const file = injectFileUploadItemContext('FileUploadItemDelete')
</script>

<template>
  <Button
    :aria-label="`Remove ${file.file.name}`"
    :class="cn('size-7 shrink-0', props.class)"
    data-slot="file-upload-item-delete"
    :disabled="state.disabled"
    size="icon"
    type="button"
    variant="ghost"
    @click="remove(file.id)"
  >
    <slot>
      <X />
    </slot>
  </Button>
</template>
