<script setup lang="ts">
import type { SliderRootEmits, SliderRootProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { cva, type VariantProps } from 'class-variance-authority'
import { reactiveOmit } from '@vueuse/core'
import { SliderRange, SliderRoot, SliderThumb, SliderTrack, useForwardPropsEmits } from 'reka-ui'
import { cn } from '@/lib/utils'

/**
 * Slider yang tiap bagiannya bisa diberi kelas sendiri.
 *
 * Enam varian slider mengganti `Slider` bawaan dengan versinya masing-masing,
 * dan yang mereka ubah selalu hal yang sama: ukuran, warna jalur, warna
 * rentang, atau bentuk tuasnya. Di sini keenamnya dilayani satu komponen —
 * bagian yang berbeda diterima sebagai prop, bukan disalin ulang enam kali.
 */
const trackVariants = cva(
  'relative w-full grow overflow-hidden rounded-full bg-primary/20 data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5',
  {
    variants: {
      size: { base: 'h-1.5', medium: 'h-2', large: 'h-2.5' },
    },
    defaultVariants: { size: 'base' },
  },
)

const thumbVariants = cva(
  'block rounded-full border border-primary/50 bg-background shadow-sm transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      size: { base: 'h-4 w-4', medium: 'h-5 w-5', large: 'h-6 w-6' },
    },
    defaultVariants: { size: 'base' },
  },
)

const props = defineProps<SliderRootProps & {
  class?: HTMLAttributes['class']
  trackClass?: HTMLAttributes['class']
  rangeClass?: HTMLAttributes['class']
  thumbClass?: HTMLAttributes['class']
  size?: VariantProps<typeof trackVariants>['size']
  /** Accessible name for the thumbs (role="slider"). */
  ariaLabel?: string
  /** Accessible name per thumb, by index; overrides ariaLabel. */
  thumbLabels?: string[]
}>()
const emits = defineEmits<SliderRootEmits>()

const forwarded = useForwardPropsEmits(
  reactiveOmit(props, 'class', 'trackClass', 'rangeClass', 'thumbClass', 'size', 'ariaLabel', 'thumbLabels'),
  emits,
)
</script>

<template>
  <SliderRoot
    v-slot="{ modelValue }"
    v-bind="forwarded"
    :class="cn(
      'relative flex w-full touch-none select-none items-center data-[orientation=vertical]:flex-col',
      props.class,
    )"
  >
    <SliderTrack :class="cn(trackVariants({ size }), trackClass)">
      <SliderRange
        :class="cn('absolute h-full bg-primary data-[orientation=vertical]:w-full', rangeClass)"
      />
    </SliderTrack>
    <SliderThumb
      v-for="(_, index) in modelValue"
      :key="index"
      :aria-label="props.thumbLabels?.[index] ?? props.ariaLabel"
      :class="cn(thumbVariants({ size }), thumbClass)"
    />
  </SliderRoot>
</template>
