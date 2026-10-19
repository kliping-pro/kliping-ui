import type { ComputedRef } from 'vue'
import { createContext } from '@/lib/create-context'

export type GaugeState = 'indeterminate' | 'complete' | 'loading'

export interface GaugeContext {
  value: number | null
  valueText: string | undefined
  max: number
  min: number
  state: GaugeState
  radius: number
  thickness: number
  size: number
  center: number
  percentage: number | null
  startAngle: number
  endAngle: number
  /** The arc length, in the same units as `stroke-dasharray`. */
  arcLength: number
  /** The arc's vertical midpoint, for placing the value text. */
  arcCenterY: number
  valueTextId: string
  labelId: string
  /** Registers a mounted GaugeLabel; returns the cleanup that unregisters it. */
  registerLabel: () => () => void
}

export const [provideGaugeContext, injectGaugeContext, injectGaugeContextOptional] = createContext<ComputedRef<GaugeContext>>('Gauge')

/** A percentage without the percent sign — the gauge renders its own unit. */
export function defaultGetValueText(value: number, min: number, max: number): string {
  const percent = max === min ? 100 : ((value - min) / (max - min)) * 100
  return Math.round(percent).toString()
}
