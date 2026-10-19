<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Plus } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { injectSpeedDialContext } from './context'

/** The main button. */
const props = defineProps<{ class?: HTMLAttributes['class'] }>()

const { state, toggle } = injectSpeedDialContext('SpeedDialTrigger')
</script>

<template>
  <!-- Isi bawaannya hanya ikon, jadi tombolnya diberi nama. `aria-label`
       dari pemakai menimpanya (atribut yang diteruskan menang). -->
  <Button
    aria-label="Actions"
    :aria-expanded="state.open"
    aria-haspopup="menu"
    :class="cn('size-11 rounded-full', props.class)"
    :data-state="state.open ? 'open' : 'closed'"
    data-slot="speed-dial-trigger"
    :disabled="state.disabled"
    size="icon"
    type="button"
    @click="state.activationMode === 'click' && toggle()"
  >
    <slot>
      <Plus :class="cn('transition-transform', state.open && 'rotate-45')" />
    </slot>
  </Button>
</template>
