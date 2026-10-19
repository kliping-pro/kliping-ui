<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { DialogClose } from '@/components/ui/dialog'
import { DrawerClose } from '@/components/ui/drawer'
import { injectResponsiveDialogContext } from './context'

/** Forwards to the Dialog or Drawer counterpart, depending on screen width. */
const props = defineProps<{ class?: HTMLAttributes['class'] }>()

const context = injectResponsiveDialogContext('ResponsiveDialogClose')
</script>

<template>
  <DrawerClose v-if="context.isMobile" :class="props.class" data-slot="responsive-dialog-close">
    <slot />
  </DrawerClose>
  <DialogClose v-else :class="props.class" data-slot="responsive-dialog-close">
    <slot />
  </DialogClose>
</template>
