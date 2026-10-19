<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { DialogTrigger } from '@/components/ui/dialog'
import { DrawerTrigger } from '@/components/ui/drawer'
import { injectResponsiveDialogContext } from './context'

/** Forwards to the Dialog or Drawer counterpart, depending on screen width. */
const props = defineProps<{ class?: HTMLAttributes['class'] }>()

const context = injectResponsiveDialogContext('ResponsiveDialogTrigger')
</script>

<template>
  <DrawerTrigger v-if="context.isMobile" :class="props.class" data-slot="responsive-dialog-trigger">
    <slot />
  </DrawerTrigger>
  <DialogTrigger v-else :class="props.class" data-slot="responsive-dialog-trigger">
    <slot />
  </DialogTrigger>
</template>
