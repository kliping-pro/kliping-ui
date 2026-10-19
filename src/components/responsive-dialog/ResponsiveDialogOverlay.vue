<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { DialogOverlay } from '@/components/ui/dialog'
import { DrawerOverlay } from '@/components/ui/drawer'
import { injectResponsiveDialogContext } from './context'

/** Forwards to the Dialog or Drawer counterpart, depending on screen width. */
const props = defineProps<{ class?: HTMLAttributes['class'] }>()

const context = injectResponsiveDialogContext('ResponsiveDialogOverlay')
</script>

<template>
  <DrawerOverlay v-if="context.isMobile" :class="props.class" data-slot="responsive-dialog-overlay">
    <slot />
  </DrawerOverlay>
  <DialogOverlay v-else :class="props.class" data-slot="responsive-dialog-overlay">
    <slot />
  </DialogOverlay>
</template>
