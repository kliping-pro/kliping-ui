import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export type { ScrollDirection, ScrollOrientation, ScrollTriggerMode } from './context'

export { default as Scroller } from './Scroller.vue'
export { default as ScrollButton } from './ScrollButton.vue'

export const scrollerVariants = cva('', {
  variants: {
    orientation: {
      vertical: [
        'overflow-y-auto',
        'data-[top-scroll=true]:[mask-image:linear-gradient(0deg,#000_calc(100%_-_var(--scroll-shadow-size)),transparent)]',
        'data-[bottom-scroll=true]:[mask-image:linear-gradient(180deg,#000_calc(100%_-_var(--scroll-shadow-size)),transparent)]',
        'data-[top-bottom-scroll=true]:[mask-image:linear-gradient(#000,#000,transparent_0,#000_var(--scroll-shadow-size),#000_calc(100%_-_var(--scroll-shadow-size)),transparent)]',
      ],
      horizontal: [
        'overflow-x-auto',
        'data-[left-scroll=true]:[mask-image:linear-gradient(270deg,#000_calc(100%_-_var(--scroll-shadow-size)),transparent)]',
        'data-[right-scroll=true]:[mask-image:linear-gradient(90deg,#000_calc(100%_-_var(--scroll-shadow-size)),transparent)]',
        'data-[left-right-scroll=true]:[mask-image:linear-gradient(to_right,#000,#000,transparent_0,#000_var(--scroll-shadow-size),#000_calc(100%_-_var(--scroll-shadow-size)),transparent)]',
      ],
    },
    hideScrollbar: {
      true: '[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
      false: '',
    },
  },
  defaultVariants: {
    orientation: 'vertical',
    hideScrollbar: false,
  },
})

export const scrollButtonVariants = cva(
  'absolute z-10 transition-opacity [&>svg]:size-4 [&>svg]:opacity-80 hover:[&>svg]:opacity-100',
  {
    variants: {
      direction: {
        up: 'top-2 left-1/2 -translate-x-1/2',
        down: 'bottom-2 left-1/2 -translate-x-1/2',
        left: 'top-1/2 left-2 -translate-y-1/2',
        right: 'top-1/2 right-2 -translate-y-1/2',
      },
    },
    defaultVariants: {
      direction: 'up',
    },
  },
)

export type ScrollerVariants = VariantProps<typeof scrollerVariants>
export type ScrollButtonVariants = VariantProps<typeof scrollButtonVariants>
