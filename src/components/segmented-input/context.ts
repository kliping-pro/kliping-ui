import type { ComputedRef } from 'vue'
import { createContext } from '@/lib/create-context'

export type SegmentedInputDirection = 'ltr' | 'rtl'
export type SegmentedInputOrientation = 'horizontal' | 'vertical'
export type SegmentedInputSize = 'default' | 'sm' | 'lg'

/** A box's position in the row, which decides which corners are rounded. */
export type SegmentedInputPosition = 'isolated' | 'first' | 'middle' | 'last'

export interface SegmentedInputContext {
  dir: SegmentedInputDirection
  orientation: SegmentedInputOrientation
  size: SegmentedInputSize
  disabled?: boolean
  invalid?: boolean
  required?: boolean
}

export const [provideSegmentedInputContext, injectSegmentedInputContext, injectSegmentedInputContextOptional]
  = createContext<ComputedRef<SegmentedInputContext>>('SegmentedInput')
