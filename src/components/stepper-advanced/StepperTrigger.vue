<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { StepperTrigger as StepperTriggerPrimitive } from 'reka-ui'
import { cn } from '@/lib/utils'

/** The clickable part of a step: indicator, title, and description. */
const props = defineProps<PrimitiveProps & {
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <!-- Nama tombol diambil dari isinya (nomor langkah + judul), bukan dari
       judul saja lewat `aria-labelledby` bawaan Reka: teks yang terlihat harus
       termasuk dalam namanya (WCAG 2.5.3, Label in Name). -->
  <StepperTriggerPrimitive
    :aria-labelledby="undefined"
    :as="props.as"
    :as-child="props.asChild"
    :class="cn(
      `inline-flex items-center justify-center gap-3 rounded-md text-left outline-none transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0`,
      'not-has-data-[slot=stepper-description]:rounded-full not-has-data-[slot=stepper-title]:rounded-full',
      props.class,
    )"
    data-slot="stepper-trigger"
  >
    <slot />
  </StepperTriggerPrimitive>
</template>
