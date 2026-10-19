import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export { default as Fps } from './Fps.vue'

export const fpsVariants = cva(
  'z-50 flex shrink-0 items-center gap-2 rounded-sm border bg-background/80 px-3 py-1.5 font-mono text-foreground text-sm backdrop-blur-sm',
  {
    variants: {
      strategy: {
        fixed: 'fixed',
        absolute: 'absolute',
      },
      position: {
        'top-left': 'top-4 left-4',
        'top-right': 'top-4 right-4',
        'bottom-left': 'bottom-4 left-4',
        'bottom-right': 'right-4 bottom-4',
      },
      status: {
        good: 'text-primary',
        warning: 'text-orange-500',
        error: 'text-destructive',
      },
    },
    defaultVariants: {
      strategy: 'fixed',
      position: 'top-right',
      status: 'good',
    },
  },
)

export type FpsVariants = VariantProps<typeof fpsVariants>
