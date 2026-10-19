<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { Primitive } from 'reka-ui'
import { cn } from '@/lib/utils'
import { injectFileUploadContext } from './context'

/** The list of selected files. The slot receives one file per call. */
const props = withDefaults(defineProps<PrimitiveProps & {
  orientation?: 'vertical' | 'horizontal'
  class?: HTMLAttributes['class']
}>(), {
  orientation: 'vertical',
})

const { state } = injectFileUploadContext('FileUploadList')
</script>

<template>
  <Primitive
    v-if="state.files.length"
    :as="props.as"
    :as-child="props.asChild"
    :class="cn(
      'fade-in-0 slide-in-from-top-2 flex animate-in flex-col gap-2',
      props.orientation === 'horizontal' && 'flex-row overflow-x-auto p-1.5',
      props.class,
    )"
    :data-orientation="props.orientation"
    data-slot="file-upload-list"
  >
    <template v-for="b in state.files" :key="b.id">
      <slot :file="b" />
    </template>
  </Primitive>
</template>
