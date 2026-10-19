<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { Primitive } from 'reka-ui'
import { cn } from '@/lib/utils'
import { injectFileUploadContext } from './context'

/** Button that opens the file picker dialog. */
const props = withDefaults(defineProps<PrimitiveProps & {
  class?: HTMLAttributes['class']
}>(), {
  asChild: true,
})

const { state, open } = injectFileUploadContext('FileUploadTrigger')
</script>

<template>
  <Primitive
    :as="props.as"
    :as-child="props.asChild"
    :class="cn(props.class)"
    data-slot="file-upload-trigger"
    :disabled="state.disabled"
    @click.stop="open"
  >
    <slot />
  </Primitive>
</template>
