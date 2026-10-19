import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export type {
  SegmentedInputContext,
  SegmentedInputDirection,
  SegmentedInputOrientation,
  SegmentedInputPosition,
  SegmentedInputSize,
} from './context'
export { injectSegmentedInputContext, injectSegmentedInputContextOptional, provideSegmentedInputContext } from './context'

export { default as SegmentedInput } from './SegmentedInput.vue'
export { default as SegmentedInputItem } from './SegmentedInputItem.vue'

export const segmentedInputItemVariants = cva('', {
  variants: {
    position: {
      isolated: '',
      first: 'rounded-e-none',
      middle: '-ms-px rounded-none border-l-0',
      last: '-ms-px rounded-s-none border-l-0',
    },
    orientation: {
      horizontal: '',
      vertical: '',
    },
    size: {
      // Tanpa text-xs: ukuran teks ikut Input (text-base md:text-sm) supaya
      // Safari iOS tidak memperbesar halaman saat kolom kecil difokuskan.
      sm: 'h-8 px-2',
      default: 'h-9 px-3',
      lg: 'h-11 px-4',
    },
  },
  compoundVariants: [
    { position: 'first', orientation: 'vertical', class: 'ms-0 rounded-e-md rounded-b-none border-l' },
    { position: 'middle', orientation: 'vertical', class: 'ms-0 -mt-px rounded-none border-t-0 border-l' },
    { position: 'last', orientation: 'vertical', class: 'ms-0 -mt-px rounded-s-md rounded-t-none border-t-0 border-l' },
  ],
  defaultVariants: {
    position: 'isolated',
    orientation: 'horizontal',
    size: 'default',
  },
})

export type SegmentedInputItemVariants = VariantProps<typeof segmentedInputItemVariants>
