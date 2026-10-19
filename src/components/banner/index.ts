import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export type {
  BannerContext,
  BannersContext,
  BannerSide,
  BannerStrategy,
  BannerVariant,
  RegisteredBanner,
} from './context'
export { ANIMATION_DURATION, injectBannerContext, injectBannersContext, injectBannersContextOptional } from './context'

export { default as Banner } from './Banner.vue'
export { default as BannerActions } from './BannerActions.vue'
export { default as BannerClose } from './BannerClose.vue'
export { default as BannerContent } from './BannerContent.vue'
export { default as BannerDescription } from './BannerDescription.vue'
export { default as BannerIcon } from './BannerIcon.vue'
export { default as Banners } from './Banners.vue'
export { default as BannerTitle } from './BannerTitle.vue'

export const bannerVariants = cva(
  'pointer-events-auto relative flex w-full items-center gap-3 border-b px-4 py-3 text-sm motion-reduce:transition-none',
  {
    variants: {
      variant: {
        default: 'bg-card text-card-foreground',
        info: 'bg-blue-50 text-blue-900 dark:bg-blue-950 dark:text-blue-50',
        success: 'bg-green-50 text-green-900 dark:bg-green-950 dark:text-green-50',
        warning: 'bg-yellow-50 text-yellow-900 dark:bg-yellow-950 dark:text-yellow-50',
        destructive: 'bg-red-50 text-red-900 dark:bg-red-950 dark:text-red-50',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export type BannerVariants = VariantProps<typeof bannerVariants>
