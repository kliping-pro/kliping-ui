<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { DialogTitle } from '@/components/ui/dialog'
import { DrawerTitle } from '@/components/ui/drawer'
import { injectResponsiveDialogContext } from './context'

/** Forwards to the Dialog or Drawer counterpart, depending on screen width. */
const props = defineProps<{ class?: HTMLAttributes['class'] }>()

const context = injectResponsiveDialogContext('ResponsiveDialogTitle')
</script>

<template>
  <DrawerTitle v-if="context.isMobile" :class="props.class" data-slot="responsive-dialog-title">
    <slot />
  </DrawerTitle>
  <DialogTitle v-else :class="props.class" data-slot="responsive-dialog-title">
    <slot />
  </DialogTitle>
</template>
