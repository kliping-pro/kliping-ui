import type { ComputedRef } from 'vue'
import { createContext } from '@/lib/create-context'

export type RatingSize = 'sm' | 'default' | 'lg'

export interface RatingContext {
  size: RatingSize
}

export const [provideRatingContext, injectRatingContext, injectRatingContextOptional] = createContext<ComputedRef<RatingContext>>('Rating')

export const RATING_SIZES: Record<RatingSize, string> = {
  sm: 'size-4',
  default: 'size-5',
  lg: 'size-6',
}
