<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { StepperOrientation } from './context'
import { StepperRoot } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { provideStepperContext } from './context'

/**
 * Penuntun proses berlangkah.
 *
 * `StepperRoot` milik Reka UI membawa yang paling melelahkan untuk ditulis
 * sendiri: fokus berputar antar langkah, penanganan panah dan Home/End,
 * penghitungan langkah mana yang sudah lewat, dan penguncian urutan lewat
 * `linear`.
 *
 * `linear` menahan pemakainya melompat ke langkah yang belum boleh — dan
 * kalau prosesnya memang tidak berurutan, mematikannya lebih jujur daripada
 * membiarkan langkah yang tidak bisa diklik tanpa penjelasan.
 */
const props = withDefaults(defineProps<PrimitiveProps & {
  defaultValue?: number
  orientation?: StepperOrientation
  dir?: 'ltr' | 'rtl'
  /** Steps must be completed in order. */
  linear?: boolean
  class?: HTMLAttributes['class']
}>(), {
  orientation: 'horizontal',
})

const model = defineModel<number>({ default: 1 })

provideStepperContext(computed(() => ({ orientation: props.orientation })))
</script>

<template>
  <StepperRoot
    v-model="model"
    :as="props.as"
    :as-child="props.asChild"
    :class="cn('flex gap-6', props.orientation === 'horizontal' ? 'w-full flex-col' : 'flex-row', props.class)"
    data-slot="stepper"
    :default-value="props.defaultValue"
    :dir="props.dir"
    :linear="props.linear"
    :orientation="props.orientation"
  >
    <slot />
  </StepperRoot>
</template>
