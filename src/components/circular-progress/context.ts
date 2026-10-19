import type { ComputedRef } from 'vue'
import { createContext } from '@/lib/create-context'

export type CircularProgressState = 'indeterminate' | 'complete' | 'loading'

export interface CircularProgressContext {
  value: number | null
  valueText: string | undefined
  max: number
  min: number
  state: CircularProgressState
  /** The circle's radius, already reduced by half the stroke width. */
  radius: number
  thickness: number
  size: number
  center: number
  circumference: number
  /** The filled fraction, from 0 to 1. `null` when indeterminate. */
  percentage: number | null
  valueTextId: string
}

export const [provideCircularProgressContext, injectCircularProgressContext, injectCircularProgressContextOptional]
  = createContext<ComputedRef<CircularProgressContext>>('CircularProgress')

/** A real finite number — `NaN` and `Infinity` are excluded. */
export function isValidNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value)
}

/** The percentage as text, used when the caller does not provide its own. */
export function defaultGetValueText(value: number, min: number, max: number): string {
  const percent = max === min ? 100 : ((value - min) / (max - min)) * 100
  return `${Math.round(percent)}%`
}
