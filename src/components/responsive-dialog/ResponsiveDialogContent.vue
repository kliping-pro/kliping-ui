<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { DialogContent } from '@/components/ui/dialog'
import { DrawerContent } from '@/components/ui/drawer'
import { injectResponsiveDialogContext } from './context'

/** Forwards to the Dialog or Drawer counterpart, depending on screen width. */
const props = defineProps<{ class?: HTMLAttributes['class'] }>()

const context = injectResponsiveDialogContext('ResponsiveDialogContent')
</script>

<template>
  <DrawerContent v-if="context.isMobile" :class="props.class" data-slot="responsive-dialog-content">
    <slot />
  </DrawerContent>
  <DialogContent v-else :class="props.class" data-slot="responsive-dialog-content">
    <slot />
  </DialogContent>
</template>
