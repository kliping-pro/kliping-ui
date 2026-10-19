<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { RefreshCwIcon } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { injectCropperContext } from './context'

/** Resets zoom, rotation and offset to their initial state. */
const props = defineProps<{ class?: HTMLAttributes['class'] }>()

const { state, reset } = injectCropperContext('CropperReset')
</script>

<template>
  <Button
    aria-label="Reset"
    :class="cn(props.class)"
    data-slot="cropper-reset"
    :disabled="state.disabled"
    size="icon"
    variant="outline"
    @click="reset"
  >
    <slot>
      <RefreshCwIcon />
    </slot>
  </Button>
</template>
