import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export type {
  SpeedDialActivationMode,
  SpeedDialContext,
  SpeedDialItemContext,
  SpeedDialSide,
  SpeedDialState,
} from './context'
export { injectSpeedDialContext, injectSpeedDialContextOptional, injectSpeedDialItemContext, injectSpeedDialItemContextOptional, provideSpeedDialContext, provideSpeedDialItemContext } from './context'

export { default as SpeedDial } from './SpeedDial.vue'
export { default as SpeedDialAction } from './SpeedDialAction.vue'
export { default as SpeedDialContent } from './SpeedDialContent.vue'
export { default as SpeedDialItem } from './SpeedDialItem.vue'
export { default as SpeedDialLabel } from './SpeedDialLabel.vue'
export { default as SpeedDialTrigger } from './SpeedDialTrigger.vue'

export const speedDialContentVariants = cva(
  'absolute z-50 flex gap-[var(--speed-dial-gap)] data-[state=closed]:pointer-events-none',
  {
    variants: {
      side: {
        top: 'flex-col-reverse items-end',
        bottom: 'flex-col items-end',
        left: 'flex-row-reverse items-center',
        right: 'flex-row items-center',
      },
    },
    defaultVariants: {
      side: 'top',
    },
  },
)

export const speedDialItemVariants = cva(
  'flex items-center gap-2 transition-all [transition-delay:var(--speed-dial-delay)] [transition-duration:var(--speed-dial-animation-duration)] data-[state=open]:translate-x-0 data-[state=open]:translate-y-0 data-[state=closed]:opacity-0 data-[state=open]:opacity-100',
  {
    variants: {
      side: {
        top: 'justify-end',
        bottom: 'justify-end',
        left: 'flex-row-reverse justify-start',
        right: 'justify-start',
      },
    },
    // Arah geser saat tertutup mengikuti arah mengembangnya — aksinya
    // menyusut ke arah tombol utamanya, bukan ke arah sembarang.
    compoundVariants: [
      { side: 'top', class: 'data-[state=closed]:translate-y-2' },
      { side: 'bottom', class: 'data-[state=closed]:-translate-y-2' },
      { side: 'left', class: 'data-[state=closed]:translate-x-2' },
      { side: 'right', class: 'data-[state=closed]:-translate-x-2' },
    ],
    defaultVariants: {
      side: 'top',
    },
  },
)

export type SpeedDialContentVariants = VariantProps<typeof speedDialContentVariants>
export type SpeedDialItemVariants = VariantProps<typeof speedDialItemVariants>
