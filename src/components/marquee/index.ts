import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export type { MarqueeContext, MarqueeDirection, MarqueeOrientation, MarqueeSide, MarqueeState } from './context'
export { injectMarqueeContext, injectMarqueeContextOptional, provideMarqueeContext } from './context'

export { default as Marquee } from './Marquee.vue'
export { default as MarqueeContent } from './MarqueeContent.vue'
export { default as MarqueeEdge } from './MarqueeEdge.vue'
export { default as MarqueeItem } from './MarqueeItem.vue'

export const marqueeContentVariants = cva(
  'flex min-w-full shrink-0 gap-(--marquee-gap)',
  {
    variants: {
      side: {
        left: 'animate-marquee-left',
        right: 'animate-marquee-right',
        top: 'min-h-full min-w-auto animate-marquee-up flex-col',
        bottom: 'min-h-full min-w-auto animate-marquee-down flex-col',
      },
      dir: {
        ltr: '',
        rtl: '',
      },
      pauseOnHover: {
        true: 'group-hover:[animation-play-state:paused]',
        false: '',
      },
      reverse: {
        true: '[animation-direction:reverse]',
        false: '',
      },
    },
    // Arah baca kanan-ke-kiri membalik sumbu geraknya, jadi animasinya pun
    // harus animasi yang lain — bukan animasi yang sama dibalik arahnya, yang
    // akan bertabrakan dengan `reverse`.
    compoundVariants: [
      { side: 'left', dir: 'rtl', class: 'animate-marquee-left-rtl' },
      { side: 'right', dir: 'rtl', class: 'animate-marquee-right-rtl' },
    ],
    defaultVariants: {
      side: 'left',
      dir: 'ltr',
      pauseOnHover: false,
      reverse: false,
    },
  },
)

export const marqueeEdgeVariants = cva('pointer-events-none absolute z-10', {
  variants: {
    side: {
      left: 'top-0 left-0 h-full bg-gradient-to-r from-background to-transparent',
      right: 'top-0 right-0 h-full bg-gradient-to-l from-background to-transparent',
      top: 'top-0 left-0 w-full bg-gradient-to-b from-background to-transparent',
      bottom: 'bottom-0 left-0 w-full bg-gradient-to-t from-background to-transparent',
    },
    size: {
      default: '',
      sm: '',
      lg: '',
    },
  },
  compoundVariants: [
    { side: ['left', 'right'], size: 'default', class: 'w-1/4' },
    { side: ['left', 'right'], size: 'sm', class: 'w-1/6' },
    { side: ['left', 'right'], size: 'lg', class: 'w-1/3' },
    { side: ['top', 'bottom'], size: 'default', class: 'h-1/4' },
    { side: ['top', 'bottom'], size: 'sm', class: 'h-1/6' },
    { side: ['top', 'bottom'], size: 'lg', class: 'h-1/3' },
  ],
  defaultVariants: {
    size: 'default',
  },
})

export type MarqueeContentVariants = VariantProps<typeof marqueeContentVariants>
export type MarqueeEdgeVariants = VariantProps<typeof marqueeEdgeVariants>
