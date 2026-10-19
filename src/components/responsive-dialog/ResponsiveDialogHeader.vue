<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { DialogHeader } from '@/components/ui/dialog'
import { DrawerHeader } from '@/components/ui/drawer'
import { injectResponsiveDialogContext } from './context'

/** Forwards to the Dialog or Drawer counterpart, depending on screen width. */
const props = defineProps<{ class?: HTMLAttributes['class'] }>()

const context = injectResponsiveDialogContext('ResponsiveDialogHeader')
</script>

<template>
  <DrawerHeader v-if="context.isMobile" :class="props.class" data-slot="responsive-dialog-header">
    <slot />
  </DrawerHeader>
  <DialogHeader v-else :class="props.class" data-slot="responsive-dialog-header">
    <slot />
  </DialogHeader>
</template>
