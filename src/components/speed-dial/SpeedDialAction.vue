<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { injectSpeedDialContext, injectSpeedDialItemContext } from './context'

/** A single action button. Closes the dial after it is pressed, unless `keepOpen`. */
const props = defineProps<{
  /** Keeps the dial open after this action is pressed. */
  keepOpen?: boolean
  class?: HTMLAttributes['class']
}>()

const emit = defineEmits<{ select: [] }>()

const { state, close } = injectSpeedDialContext('SpeedDialAction')
const item = injectSpeedDialItemContext('SpeedDialAction')

function select() {
  emit('select')
  if (!props.keepOpen) close()
}
</script>

<template>
  <Button
    :aria-labelledby="item.labelId"
    :class="cn('size-11 shrink-0 rounded-full bg-accent shadow-md', props.class)"
    data-slot="speed-dial-action"
    role="menuitem"
    size="icon"
    :tabindex="state.open ? 0 : -1"
    type="button"
    variant="secondary"
    @click="select"
  >
    <slot />
  </Button>
</template>
