<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { DialogDescription } from '@/components/ui/dialog'
import { DrawerDescription } from '@/components/ui/drawer'
import { injectResponsiveDialogContext } from './context'

/** Forwards to the Dialog or Drawer counterpart, depending on screen width. */
const props = defineProps<{ class?: HTMLAttributes['class'] }>()

const context = injectResponsiveDialogContext('ResponsiveDialogDescription')
</script>

<template>
  <DrawerDescription v-if="context.isMobile" :class="props.class" data-slot="responsive-dialog-description">
    <slot />
  </DrawerDescription>
  <DialogDescription v-else :class="props.class" data-slot="responsive-dialog-description">
    <slot />
  </DialogDescription>
</template>
