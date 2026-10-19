<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { XIcon } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { injectActionBarContext } from './context'

/** A button that closes the bar. */
const props = defineProps<{ class?: HTMLAttributes['class'] }>()

const context = injectActionBarContext('ActionBarClose')
</script>

<template>
  <Button
    aria-label="Close action bar"
    :class="cn('size-7 rounded-sm p-0', props.class)"
    data-slot="action-bar-close"
    size="icon"
    type="button"
    variant="ghost"
    @click="context.close()"
  >
    <slot>
      <XIcon />
    </slot>
  </Button>
</template>
