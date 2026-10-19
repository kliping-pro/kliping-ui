import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export { default as AvatarGroup } from './AvatarGroup.vue'
export { default as AvatarGroupItem } from './AvatarGroupItem.vue'

export const avatarGroupVariants = cva('flex items-center', {
  variants: {
    orientation: {
      horizontal: 'flex-row',
      vertical: 'flex-col',
    },
    dir: {
      ltr: '',
      rtl: '',
    },
  },
  compoundVariants: [
    { orientation: 'horizontal', dir: 'ltr', class: '-space-x-1' },
    { orientation: 'horizontal', dir: 'rtl', class: 'flex-row-reverse -space-x-1 space-x-reverse' },
    { orientation: 'vertical', dir: 'ltr', class: '-space-y-1' },
    { orientation: 'vertical', dir: 'rtl', class: 'flex-col-reverse -space-y-1 space-y-reverse' },
  ],
  defaultVariants: {
    orientation: 'horizontal',
    dir: 'ltr',
  },
})

export type AvatarGroupVariants = VariantProps<typeof avatarGroupVariants>
