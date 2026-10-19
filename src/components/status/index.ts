import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export { default as Status } from './Status.vue'
export { default as StatusIndicator } from './StatusIndicator.vue'
export { default as StatusLabel } from './StatusLabel.vue'

// Teks memakai tingkat 700 di mode terang: tingkat 600 di atas latar tipisnya
// (warna yang sama 10%) hanya 3–4:1, di bawah ambang WCAG AA 4,5:1. Titik
// indikatornya bukan teks, jadi tetap 600.
export const statusVariants = cva(
  "inline-flex w-fit shrink-0 items-center gap-1.5 overflow-hidden whitespace-nowrap rounded-full border px-2.5 py-1 font-medium text-xs transition-colors",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-muted text-muted-foreground **:data-[slot=status-indicator]:bg-muted-foreground",
        success:
          "border-green-500/20 bg-green-500/10 text-green-700 **:data-[slot=status-indicator]:bg-green-600 dark:text-green-400 **:data-[slot=status-indicator]:dark:bg-green-400",
        error:
          "border-destructive/20 bg-destructive/10 text-red-700 **:data-[slot=status-indicator]:bg-destructive dark:text-destructive",
        warning:
          "border-orange-500/20 bg-orange-500/10 text-orange-700 **:data-[slot=status-indicator]:bg-orange-600 dark:text-orange-400 **:data-[slot=status-indicator]:dark:bg-orange-400",
        info: "border-blue-500/20 bg-blue-500/10 text-blue-700 **:data-[slot=status-indicator]:bg-blue-600 dark:text-blue-400 **:data-[slot=status-indicator]:dark:bg-blue-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export type StatusVariants = VariantProps<typeof statusVariants>
