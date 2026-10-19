import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export type { StackContext, StackItemSize, StackSide, StackState } from './context'
export { getStackState, injectStackContext, injectStackContextOptional, provideStackContext } from './context'

export { default as Stack } from './Stack.vue'
export { default as StackItem } from './StackItem.vue'
export { default as StackItemWrapper } from './StackItemWrapper.vue'

export const stackItemWrapperVariants = cva(
  'absolute w-full transition-all duration-300 ease-out',
  {
    variants: {
      side: {
        top: [
          'top-0 left-0 origin-top',
          'translate-y-[calc(var(--translate)*-1)] scale-[var(--item-scale)]',
          "after:absolute after:top-full after:left-0 after:w-full after:content-['']",
        ],
        bottom: [
          'bottom-0 left-0 origin-bottom',
          'translate-y-[var(--translate)] scale-[var(--item-scale)]',
          "after:absolute after:bottom-full after:left-0 after:w-full after:content-['']",
        ],
      },
      // Pseudo-elemen setinggi jaraknya menutup celah antar kartu saat
      // merenggang. Tanpa itu, tetikus yang bergerak dari satu kartu ke
      // kartu berikutnya melewati ruang kosong — dan tumpukannya menutup
      // di tengah jalan.
      isExpanded: {
        true: 'after:h-[calc(var(--gap)+1px)]',
        false: '',
      },
      isVisible: {
        true: '',
        false: 'pointer-events-none',
      },
    },
  },
)

export type StackItemWrapperVariants = VariantProps<typeof stackItemWrapperVariants>
