import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export { default as RelativeTimeCard } from './RelativeTimeCard.vue'
export { default as TimezoneCard } from './TimezoneCard.vue'
export { formatRelativeTime, getBrowserLocale } from './time'

export const relativeTimeTriggerVariants = cva(
  'inline-flex w-fit items-center justify-center text-foreground/70 text-sm transition-colors hover:text-foreground/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        default: '',
        // Token redup, bukan foreground/50: setengah opasitas hanya ± 3,9:1
        // di atas latar putih (WCAG AA butuh 4,5:1).
        muted: 'text-muted-foreground hover:text-foreground',
        ghost: 'hover:underline',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export type RelativeTimeTriggerVariants = VariantProps<typeof relativeTimeTriggerVariants>
