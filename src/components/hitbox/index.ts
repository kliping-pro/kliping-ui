import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export { default as Hitbox } from './Hitbox.vue'

/** Sizes with their own name. Anything else is treated as a CSS length. */
export const NAMED_SIZES = ['default', 'sm', 'lg'] as const

/**
 * Ukuran daerah sentuh.
 *
 * `(string & {})` menahan TypeScript agar tidak meruntuhkan tipe gabungan ini
 * jadi `string` — tanpa itu, saran otomatis untuk `default`, `sm`, dan `lg`
 * hilang, dan yang tersisa cuma "isi teks apa saja".
 */
export type HitboxSize = (typeof NAMED_SIZES)[number] | (string & {})

export const hitboxVariants = cva(
  "relative [--size-default:12px] [--size-lg:16px] [--size-sm:8px] after:absolute after:content-['']",
  {
    variants: {
      size: {
        'default': '[--size:var(--size-default)]',
        'sm': '[--size:var(--size-sm)]',
        'lg': '[--size:var(--size-lg)]',
        'dynamic': '[--size:var(--size)]',
      },
      position: {
        all: 'after:[inset:calc(-1*var(--size))]',
        top: 'after:[height:var(--size)] after:[left:0] after:[right:0] after:[top:calc(-1*var(--size))]',
        bottom: 'after:[bottom:calc(-1*var(--size))] after:[height:var(--size)] after:[left:0] after:[right:0]',
        left: 'after:[bottom:0] after:[left:calc(-1*var(--size))] after:[top:0] after:[width:var(--size)]',
        right: 'after:[bottom:0] after:[right:calc(-1*var(--size))] after:[top:0] after:[width:var(--size)]',
        vertical: 'after:[bottom:calc(-1*var(--size))] after:[left:0] after:[right:0] after:[top:calc(-1*var(--size))]',
        horizontal: 'after:[bottom:0] after:[left:calc(-1*var(--size))] after:[right:calc(-1*var(--size))] after:[top:0]',
      },
      radius: {
        none: '',
        sm: 'after:rounded-sm',
        md: 'after:rounded-md',
        lg: 'after:rounded-lg',
        full: 'after:rounded-full',
      },
      debug: {
        true: 'after:border after:border-red-500 after:border-dashed after:bg-red-500/20',
        false: '',
      },
    },
    defaultVariants: {
      size: 'default',
      position: 'all',
      radius: 'none',
      debug: false,
    },
  },
)

export type HitboxVariants = VariantProps<typeof hitboxVariants>
