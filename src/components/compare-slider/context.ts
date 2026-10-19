import type { ComputedRef } from 'vue'
import { createContext } from '@/lib/create-context'

export type CompareSliderInteraction = 'hover' | 'drag'
export type CompareSliderOrientation = 'horizontal' | 'vertical'

export interface CompareSliderContext {
  interaction: CompareSliderInteraction
  orientation: CompareSliderOrientation
  /** The divider position, from 0 to 100. */
  value: number
}

export const [provideCompareSliderContext, injectCompareSliderContext, injectCompareSliderContextOptional]
  = createContext<ComputedRef<CompareSliderContext>>('CompareSlider')

export const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max)
