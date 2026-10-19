import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export { default as Stat } from './Stat.vue'
export { default as StatDescription } from './StatDescription.vue'
export { default as StatIndicator } from './StatIndicator.vue'
export { default as StatLabel } from './StatLabel.vue'
export { default as StatSeparator } from './StatSeparator.vue'
export { default as StatTrend } from './StatTrend.vue'
export { default as StatValue } from './StatValue.vue'

export const statIndicatorVariants = cva(
  "flex shrink-0 items-center justify-center [&_svg]:pointer-events-none",
  {
    variants: {
      variant: {
        default: "text-muted-foreground [&_svg:not([class*='size-'])]:size-5",
        icon: "size-8 rounded-md border [&_svg:not([class*='size-'])]:size-3.5",
        badge:
          "h-6 min-w-6 rounded-sm border px-1.5 font-medium text-xs [&_svg:not([class*='size-'])]:size-3",
        action:
          "size-8 cursor-pointer rounded-md transition-colors hover:bg-muted/50 [&_svg:not([class*='size-'])]:size-4",
      },
      color: {
        default: "bg-muted text-muted-foreground",
        success:
          "border-green-500/20 bg-green-500/10 text-green-600 dark:text-green-400",
        info: "border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400",
        warning:
          "border-orange-500/20 bg-orange-500/10 text-orange-600 dark:text-orange-400",
        error: "border-destructive/20 bg-destructive/10 text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
      color: "default",
    },
  },
)

export type StatIndicatorVariants = VariantProps<typeof statIndicatorVariants>
