<script setup lang="ts">
import type { PopoverContentEmits, PopoverContentProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { PopoverContent, PopoverPortal, useForwardPropsEmits } from 'reka-ui'
import { cn } from '@/lib/utils'

/**
 * Panel yang muncul saat pemicunya ditekan.
 *
 * Isinya bidang, penggeser, dan masukan — disusun sendiri oleh yang memakai,
 * karena tidak ada satu susunan yang benar untuk semua: sebagian butuh alpha,
 * sebagian butuh palet, dan sebagian cuma butuh bidang dan rona.
 */
defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<PopoverContentProps & { class?: HTMLAttributes['class'] }>(), {
  align: 'start',
  sideOffset: 4,
})
const emits = defineEmits<PopoverContentEmits>()

const forward = useForwardPropsEmits(reactiveOmit(props, 'class'), emits)
</script>

<template>
  <PopoverPortal>
    <PopoverContent
      v-bind="{ ...$attrs, ...forward }"
      :class="cn(
        'z-50 flex w-64 origin-(--reka-popover-content-transform-origin) flex-col gap-3 rounded-md border bg-popover p-3 text-popover-foreground shadow-md outline-hidden data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
        props.class,
      )"
      data-slot="color-picker-content"
    >
      <slot />
    </PopoverContent>
  </PopoverPortal>
</template>
