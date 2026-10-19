<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { DialogFooter } from '@/components/ui/dialog'
import { DrawerFooter } from '@/components/ui/drawer'
import { injectResponsiveDialogContext } from './context'

/** Forwards to the Dialog or Drawer counterpart, depending on screen width. */
const props = defineProps<{ class?: HTMLAttributes['class'] }>()

const context = injectResponsiveDialogContext('ResponsiveDialogFooter')
</script>

<template>
  <DrawerFooter v-if="context.isMobile" :class="props.class" data-slot="responsive-dialog-footer">
    <slot />
  </DrawerFooter>
  <DialogFooter v-else :class="props.class" data-slot="responsive-dialog-footer">
    <slot />
  </DialogFooter>
</template>
