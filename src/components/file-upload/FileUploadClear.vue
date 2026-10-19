<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { injectFileUploadContext } from './context'

/** Button that clears the whole list. */
const props = defineProps<{ class?: HTMLAttributes['class'] }>()

const { state, clear } = injectFileUploadContext('FileUploadClear')
</script>

<template>
  <Button
    v-if="state.files.length"
    :class="cn('w-fit', props.class)"
    data-slot="file-upload-clear"
    :disabled="state.disabled"
    size="sm"
    type="button"
    variant="ghost"
    @click="clear"
  >
    <slot>Clear all</slot>
  </Button>
</template>
